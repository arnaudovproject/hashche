import crypto from "crypto";
import { Uuid_key } from "../config/Uuid_key";
import { Uuid_data } from "../config/Uuid_data";

/**
 * Formats a UUID by inserting specific separators and adding randomly generated characters.
 *
 * @param {string} uuid - The UUID string to be formatted.
 * @returns {string} The formatted UUID string.
 */
function formatUuid(uuid: string): string {
  // Generate random bytes and convert them to hexadecimal string
  const _bytes32 = crypto.randomBytes(32).toString("hex");
  const butes32 = _bytes32.slice(4, 8); // Extract a portion of the random bytes

  const _bytes16 = crypto.randomBytes(16).toString("hex");
  const butes16 = _bytes16.slice(9, 12); // Extract a portion of the random bytes

  // Extract different parts from the original UUID
  const part1 = uuid.slice(0, 8); // First 8 characters
  const part2 = uuid.slice(-10); // Last 10 characters
  const part3 = uuid.slice(8, 13); // Characters from position 8 to 13

  // Generate random characters from the original UUID
  const randomChars = Array.from({ length: 8 })
    .map(() => uuid[Math.floor(Math.random() * uuid.length)])
    .join("");

  // Construct the formatted UUID string
  return `${part1}-${part2}-${part3}-${randomChars}-${butes32}${butes16}`;
}

// Create an instance of Uuid_key using data from Uuid_data
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

// Retrieve the generated UUID values
const uuid = UUID.uuids;

// Format the first UUID
const UUID_KEY = formatUuid(uuid[0]);

// Export the formatted UUID and the original UUID array
export { UUID_KEY, uuid };
