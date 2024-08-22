import { createHash } from "crypto";
import { Keys } from "../config/Keys";
import { data } from "../config/data";
import { ErrorHandler } from "../helper/errorHandling";

export class Args {
  private createHash = createHash; // Importing the createHash function from the crypto module
  private keys = new Keys(); // Creating an instance of the Keys class
  private data = data; // Importing the data object from the config folder
  private error = new ErrorHandler(); // Creating an instance of the ErrorHandler class

  constructor() {
    this.createHash = this.createHash.bind(this); // Binding the createHash function to the current instance of Args
    this.keys = this.keys; // Assigning the keys instance to itself (no effect)
    this.data = this.data; // Assigning the data object to itself (no effect)
    this.error = this.error; // Assigning the error instance to itself (no effect
  }

  /**
   * Extracts the first 'number' characters from the provided string 'arg'.
   * @param arg - The string from which to extract characters.
   * @param number - The number of characters to extract from the beginning.
   * @returns The substring consisting of the first 'number' characters.
   */
  private getFirstArg(arg: string, number: number): string {
    return arg.substring(0, number); // Returns the first 'number' characters of the 'arg' string
  }

  /**
   * Extracts the last 'number' characters from the provided string 'arg'.
   * @param arg - The string from which to extract characters.
   * @param number - The number of characters to extract from the end.
   * @returns The substring consisting of the last 'number' characters.
   */
  private getLastArg(arg: string, number: number): string {
    return arg.slice(-number); // Returns the last 'number' characters of the 'arg' string
  }

  /**
   * Generates a formatted string by hashing the concatenation of various components including the ESP and JFP keys, salt, level, and password.
   * @param esp - The ESP key to include in the hash.
   * @param jfp - The JFP key to include in the hash.
   * @param password - The password to hash.
   * @returns A formatted string combining the hashed password with other data.
   */
  private logic(esp: string, jfp: string, password: string): string {
    const cEsp = this.getFirstArg(esp, this.data.esp); // Extracts the first 'this.data.esp' characters from 'esp'
    const cJfp = this.getLastArg(jfp, this.data.jfp); // Extracts the last 'this.data.jfp' characters from 'jfp'
    const cSalt = this.data.salt; // Retrieves the 'salt' value from the data object
    const lvl = this.data.level; // Retrieves the 'level' value from the data object
    const shaFix =
      this.data.fix[Math.floor(Math.random() * this.data.fix.length)];

    const hash = this.createHash("sha256"); // Creates a hash object using the SHA-256 algorithm
    hash.update(cEsp); // Updates the hash with 'cEsp'
    hash.update(cJfp); // Updates the hash with 'cJfp'
    hash.update(cSalt); // Updates the hash with 'cSalt'
    hash.update(lvl.toString()); // Updates the hash with the string representation of 'lvl'
    hash.update(password); // Updates the hash with 'password'
    hash.update(this.data.embed); // Updates the hash with the 'embed' value from the data object
    const bindPassword = hash.digest("hex"); // Generates the hexadecimal representation of the hash

    return `$${this.data.esp}$${lvl}#${bindPassword}$${this.data.jfp}${shaFix}`; // Constructs and returns a formatted string
  }

  /**
   * Encrypts the provided password using generated ESP and JFP keys, then returns the resulting formatted string.
   * @param password - The password to encrypt.
   * @returns The formatted string containing the encrypted password.
   */
  crypt(password: string): string {
    if (!this.error.status(this.data.salt, this.data.embed, this.data.fix)) {
      throw new Error("Invalid configuration data"); // Throws an error if the configuration data is invalid
    }

    return this.logic(
      this.keys.generateEspKey(), // Generates a key using the Keys class and passes it as 'esp'
      this.keys.generateJfpKey(), // Generates a key using the Keys class and passes it as 'jfp'
      password
    );
  }

  /**
   * Compares the provided password with the database password by generating all possible candidate passwords and checking for a match.
   * @param password - The password to compare.
   * @param dbPassword - The password stored in the database for comparison.
   * @returns True if a match is found, otherwise false.
   */
  compare(password: string, dbPassword: string): boolean {
    if (!this.error.status(this.data.salt, this.data.embed, this.data.fix)) {
      throw new Error("Invalid configuration data"); // Throws an error if the configuration data is invalid
    }

    const keys = this.keys.swapKeys(); // Retrieves an array of swapped keys using the Keys class
    const espKeys = new Set<string>(); // Creates a Set to store ESP keys
    const jfpKeys = new Set<string>(); // Creates a Set to store JFP keys

    for (const key of keys) {
      if (key.startsWith("ESP:")) {
        const cleanEsp = key.replace("ESP:", ""); // Removes the "ESP:" prefix from the key
        const esp = this.getFirstArg(cleanEsp, this.data.esp); // Extracts the first 'this.data.esp' characters from 'cleanEsp'
        espKeys.add(esp); // Adds the ESP key to the Set
      } else if (key.startsWith("JFP:")) {
        const cleanJfp = key.replace("JFP:", ""); // Removes the "JFP:" prefix from the key
        const jfp = this.getLastArg(cleanJfp, this.data.jfp); // Extracts the last 'this.data.jfp' characters from 'cleanJfp'
        jfpKeys.add(jfp); // Adds the JFP key to the Set
      }
    }

    const salt = this.data.salt; // Retrieves the 'salt' value from the data object
    const lvl = this.data.level; // Retrieves the 'level' value from the data object
    const shaFix = this.data.fix.find((fixItem) =>
      fixItem.includes(dbPassword.slice(-10))
    ); // Retrieves a fix string based on the last 10 characters of the database password

    for (const esp of espKeys) {
      for (const jfp of jfpKeys) {
        const hash = this.createHash("sha256"); // Creates a hash object using the SHA-256 algorithm
        hash.update(esp); // Updates the hash with 'esp'
        hash.update(jfp); // Updates the hash with 'jfp'
        hash.update(salt); // Updates the hash with 'salt'
        hash.update(lvl.toString()); // Updates the hash with the string representation of 'lvl'
        hash.update(password); // Updates the hash with 'password'
        hash.update(this.data.embed); // Updates the hash with the 'embed' value from the data object
        const bindPassword = hash.digest("hex"); // Generates the hexadecimal representation of the hash

        const candidate = `$${this.data.esp}$${lvl}#${bindPassword}$${this.data.jfp}${shaFix}`; // Constructs a candidate password string
        if (candidate === dbPassword) {
          return true; // Returns true if the candidate password matches the provided database password
        }
      }
    }

    return false; // Returns false if no matching password is found
  }
}
