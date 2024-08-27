import crypto, { createHash } from "crypto";
import { Uuid_key } from "../config/Uuid_key";
import { Uuid_data } from "../config/Uuid_data";

/**
 * Formats a UUID by inserting specific separators and adding randomly generated characters.
 *
 * @param {string} uuid - The UUID string to be formatted.
 * @returns {string} The formatted UUID string.
 */
function formatToken(uuid: string): string {
  // Generate random bytes and convert them to hexadecimal string
  const _bytes32 = crypto.randomBytes(32).toString("hex");
  const butes32 = _bytes32.slice(4, 8); // Extract a portion of the random bytes

  const _bytes16 = crypto.randomBytes(16).toString("hex");
  const butes16 = _bytes16.slice(9, 12); // Extract a portion of the random bytes

  // Extract different parts from the original TOKEN
  const part1 = uuid.slice(0, 6); // First 8 characters
  const part2 = uuid.slice(-9); // Last 10 characters
  const part3 = uuid.slice(10, 18); // Characters from position 8 to 13

  // Generate random characters from the original TOKEN
  const randomChars = Array.from({ length: 4 })
    .map(() => uuid[Math.floor(Math.random() * uuid.length)])
    .join("");

  // Construct the formatted TOKEN string
  const token = `${part1}${part2}${part3}${randomChars}${butes32}${butes16}`;
  return createHash("sha256").update(token).digest("hex");
}

/**
 * Generates a TOKEN using the Uuid_key class and formats it using the formatUuid function.
 *
 * @returns {string} Generated and formatted TOKEN string.
 */
export function generateToken(): string {
  const UUID = new Uuid_key(
    Uuid_data.u,
    Uuid_data.id,
    Uuid_data.closure,
    Uuid_data.xF,
    Uuid_data.bTrust,
    Uuid_data.httu,
    Uuid_data.sql,
    Uuid_data.random
  );

  const token = UUID.uuids;
  return formatToken(token[0]);
}
