import crypto from "crypto";
import { userRequest } from "./UserRequest";
import { Uuid_data } from "./Uuid_data";

/**
 * Class for generating and managing UUIDs based on various parameters.
 */
export class Uuid_key {
  private uuid: string[];

  private u: string;
  private id: string;
  private closure: string;
  private xF: string[];
  private bTrust: string;
  private httu: string[];
  private sql: string;
  private random: string[];

  /**
   * Creates an instance of Uuid_key with specified parameters.
   *
   * @param u - String value for 'u' parameter.
   * @param id - String value for 'id' parameter.
   * @param closure - String value for 'closure' parameter.
   * @param xF - Array of strings for 'xF' parameter.
   * @param bTrust - String value for 'bTrust' parameter.
   * @param httu - Array of strings for 'httu' parameter.
   * @param sql - String value for 'sql' parameter.
   * @param random - Array of strings for 'random' parameter.
   */
  constructor(
    u: string,
    id: string,
    closure: string,
    xF: string[],
    bTrust: string,
    httu: string[],
    sql: string,
    random: string[]
  ) {
    this.uuid = [];

    this.u = u;
    this.id = id;
    this.closure = closure;
    this.xF = xF;
    this.bTrust = bTrust;
    this.httu = httu;
    this.sql = sql;
    this.random = random;

    this.asLogic("");
  }

  /**
   * Gets the generated UUIDs.
   *
   * @returns {string[]} Array of UUID strings.
   */
  get uuids(): string[] {
    return this.uuid;
  }

  /**
   * Randomly selects a length from a predefined set of lengths.
   *
   * @returns {number} The randomly selected length.
   */
  private getLength(): number {
    const lengths = [
      9, 12, 15, 16, 18, 22, 29, 31, 32, 37, 45, 58, 60, 63, 68, 69, 72, 74, 79,
      81, 88, 91, 93, 95, 97, 101, 103, 107, 111, 118, 124, 128,
    ];
    return lengths[Math.floor(Math.random() * lengths.length)];
  }

  /**
   * Generates a random key of the specified length.
   *
   * @param {number} length - The length of the key to be generated.
   * @returns {string} The generated random key in hexadecimal format.
   */
  private randomKey(length: number): string {
    return crypto.randomBytes(length).toString("hex");
  }

  /**
   * Hashes the given string using SHA-256 algorithm.
   *
   * @param {string} id - The string to be hashed.
   * @returns {string} The SHA-256 hash of the input string in hexadecimal format.
   * @throws {Error} Throws an error if hashing fails.
   */
  private hashUuid(id: string): string {
    try {
      const hash = crypto.createHash("sha256");
      hash.update(id);
      return hash.digest("hex");
    } catch (error) {
      console.error("Error hashing key:", error);
      throw new Error("Failed to hash key");
    }
  }

  /**
   * Generates a UUID based on various parameters and random values.
   *
   * @param {string} string - An optional input string (not used in the current implementation).
   */
  private asLogic(string: string): void {
    // Generate random keys
    const _u = this.randomKey(this.getLength());
    const _id = this.randomKey(this.getLength());
    const _closure = this.randomKey(this.getLength());
    const _xF = this.randomKey(this.getLength());
    const _bTrust = this.randomKey(this.getLength());
    const _httu = this.randomKey(this.getLength());
    const _sql = this.randomKey(this.getLength());
    const _random = this.randomKey(this.getLength());

    // Hash the provided values
    const u = this.hashUuid(this.u);
    const id = this.hashUuid(this.id);
    const closure = this.hashUuid(this.closure);
    const xF = this.hashUuid(
      this.xF[Math.floor(Math.random() * this.xF.length)]
    );
    const bTrust = this.hashUuid(this.bTrust);
    const httu = this.hashUuid(
      this.httu[Math.floor(Math.random() * this.httu.length)]
    );
    const sql = this.hashUuid(this.sql);
    const random = this.hashUuid(
      this.random[Math.floor(Math.random() * this.random.length)]
    );

    // Create a SHA-256 hash by combining various inputs
    const hash = crypto.createHash("sha256");
    hash.update(sql);
    hash.update(crypto.randomBytes(16));
    hash.update(userRequest.currentTimestampIso);
    hash.update(_u);
    hash.update(userRequest.currentTimestamp.toString());
    hash.update(u);
    hash.update(crypto.randomBytes(32));
    hash.update(userRequest.currentTimestampLocale);
    hash.update(_id);
    hash.update(userRequest.currentTimestampUtc);
    hash.update(random);
    hash.update(userRequest.currentTimestampDate.toString());
    hash.update(id);
    hash.update(crypto.randomBytes(64));
    hash.update(crypto.randomBytes(8));
    hash.update(userRequest.currentTimestampDay.toString());
    hash.update(_closure);

    // Update hash with variables from Uuid_data
    Uuid_data.var.forEach((v) => hash.update(v));
    hash.update(userRequest.currentTimestampFullYear.toString());
    hash.update(closure);
    hash.update(crypto.randomBytes(8));
    hash.update(_random);
    hash.update(userRequest.currentTimestampHours.toString());
    hash.update(_xF);

    // Update hash with additional variables from Uuid_data
    Uuid_data.www.forEach((w) => hash.update(this.hashUuid(w)));
    hash.update(userRequest.timestamp);
    hash.update(xF);
    hash.update(userRequest.randomPart);
    hash.update(_bTrust);
    hash.update(bTrust);
    Uuid_data.var.forEach((v) => hash.update(this.hashUuid(v)));
    Uuid_data.www.forEach((w) => hash.update(this.hashUuid(w)));
    hash.update(userRequest.fxTimestamp.toString());
    hash.update(_httu);
    hash.update(_sql);
    hash.update(httu);
    hash.update(crypto.randomBytes(8));

    // Push the final hashed UUID to the array
    this.uuid.push(hash.digest("hex"));
  }
}
