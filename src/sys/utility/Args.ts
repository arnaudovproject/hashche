import { createHash } from "crypto";
import { Keys } from "../config/Keys";
import { data } from "../config/data";
import { ErrorHandler } from "../helper/errorHandling";

export class Args {
  private createHash = createHash;
  private keys = new Keys();
  private data = data;
  private error = new ErrorHandler();

  private getFirstArg(arg: string, number: number): string {
    return arg.substring(0, number);
  }

  private getLastArg(arg: string, number: number): string {
    return arg.slice(-number);
  }

  private logic(
    esp: string,
    jfp: string,
    password: string,
    salt: string
  ): string {
    const cEsp = this.getFirstArg(esp, this.data.esp);
    const cJfp = this.getLastArg(jfp, this.data.jfp);
    const cSalt = this.data.salt;
    const lvl = this.data.level;
    const shaFix =
      this.data.fix[Math.floor(Math.random() * this.data.fix.length)];

    try {
      const hash = this.createHash("sha256");
      hash.update(cEsp);
      hash.update(cJfp);
      hash.update(cSalt);
      hash.update(lvl.toString());
      hash.update(password);
      hash.update(salt);
      hash.update(this.data.embed);
      const bindPassword = hash.digest("hex");

      return `$${this.data.esp}$${lvl}#${bindPassword}$${this.data.jfp}${shaFix}`;
    } catch (error) {
      console.error("Error in hash generation:", error);
      throw new Error("Failed to generate hash");
    }
  }

  crypt(password: string, salt: string = this.data.DL_SALT): string {
    if (!this.error.status(this.data.salt, this.data.embed, this.data.fix)) {
      throw new Error("Invalid configuration data");
    }

    return this.logic(
      this.keys.generateEspKey(),
      this.keys.generateJfpKey(),
      password,
      salt
    );
  }

  compare(
    password: string,
    dbPassword: string,
    userSalt: string = this.data.DL_SALT
  ): boolean {
    if (!this.error.status(this.data.salt, this.data.embed, this.data.fix)) {
      throw new Error("Invalid configuration data");
    }

    const keys = this.keys.swapKeys();
    const espKeys = new Set<string>();
    const jfpKeys = new Set<string>();

    for (const key of keys) {
      if (key.startsWith("ESP:")) {
        const cleanEsp = key.replace("ESP:", "");
        const esp = this.getFirstArg(cleanEsp, this.data.esp);
        espKeys.add(esp);
      } else if (key.startsWith("JFP:")) {
        const cleanJfp = key.replace("JFP:", "");
        const jfp = this.getLastArg(cleanJfp, this.data.jfp);
        jfpKeys.add(jfp);
      }
    }

    const salt = this.data.salt;
    const lvl = this.data.level;
    const shaFix = this.data.fix.find((fixItem) =>
      fixItem.includes(dbPassword.slice(-7))
    );

    for (const esp of espKeys) {
      for (const jfp of jfpKeys) {
        try {
          const hash = this.createHash("sha256");
          hash.update(esp);
          hash.update(jfp);
          hash.update(salt);
          hash.update(lvl.toString());
          hash.update(password);
          hash.update(userSalt);
          hash.update(this.data.embed);
          const bindPassword = hash.digest("hex");

          const candidate = `$${this.data.esp}$${lvl}#${bindPassword}$${this.data.jfp}${shaFix}`;
          if (candidate === dbPassword) {
            return true;
          }
        } catch (error) {
          console.error("Error in password comparison:", error);
          throw new Error("Failed to compare passwords");
        }
      }
    }

    return false;
  }
}
