import crypto from "crypto";

/**
 * Generates a random hexadecimal string of a given length.
 *
 * @param length - The length of the random byte string to generate, in bytes.
 * @returns A hexadecimal string representation of the random bytes.
 */
function generateRandomKey(length: number): string {
  return crypto.randomBytes(length).toString("hex");
}

/**
 * Contains various randomly generated keys and predefined values used for UUID generation and other purposes.
 */
export const Uuid_data = {
  /**
   * Randomly generated 16-byte key.
   * Example: "f8c5d5a8e84a2b9e6f02b2d021d10a54"
   */
  u: crypto.randomBytes(16).toString("hex"),

  /**
   * Randomly generated 32-byte key.
   * Example: "c23e8d618e8d1c27a572a9b3cf1a18e0"
   */
  id: crypto.randomBytes(32).toString("hex"),

  /**
   * Randomly generated 16-byte key.
   * Example: "d6a8e2f4f95b5d1c"
   */
  closure: generateRandomKey(16),

  /**
   * Array of 11 randomly generated keys of varying lengths.
   * Includes a mix of 16-byte and 32-byte keys.
   */
  xF: [
    generateRandomKey(32), // Example: "f3b8e6c4853d5e45678d33c1"
    generateRandomKey(32), // Example: "2a8c98a24c75e3b7fc9d4821"
    generateRandomKey(16), // Example: "a8c7e3b12d8f4e67"
    generateRandomKey(32), // Example: "a12d34b5e6f78c90d2e3f4a5"
    generateRandomKey(32), // Example: "6d5e4a3c8b9d0a1e2f3b4c5d"
    generateRandomKey(16), // Example: "e2f4b6c7a8d9e0f1"
    crypto.randomBytes(16).toString("hex"), // Example: "c9d6e1b8f4a0b2c3"
    generateRandomKey(16), // Example: "d6a9f3b1e8c2d4e5"
    crypto.randomBytes(16).toString("hex"), // Example: "a1b2c3d4e5f67890"
    generateRandomKey(16), // Example: "b2d3e4f5a67890c1"
    generateRandomKey(32), // Example: "8d7a9c0e1f2b3a4c5d6e7f8g"
  ],

  /**
   * Randomly generated 32-byte key.
   * Example: "a7b8c9d0e1f234567890abcd"
   */
  bTrust: crypto.randomBytes(32).toString("hex"),

  /**
   * Array of 9 randomly generated keys of varying lengths.
   * Includes a mix of 16-byte and 32-byte keys.
   */
  httu: [
    generateRandomKey(16), // Example: "4d6f7e8c9a0b1c2d"
    crypto.randomBytes(16).toString("hex"), // Example: "9a8b7c6d5e4f3a2b"
    generateRandomKey(32), // Example: "2b3c4d5e6f7a8b9c0d1e2f3"
    crypto.randomBytes(16).toString("hex"), // Example: "f4a5b6c7d8e9f0a1"
    crypto.randomBytes(32).toString("hex"), // Example: "1a2b3c4d5e6f7890abcdef"
    generateRandomKey(32), // Example: "9f8e7d6c5b4a3e2f"
    generateRandomKey(16), // Example: "a8c7e3b1d9f0a2b3"
    crypto.randomBytes(32).toString("hex"), // Example: "abcdef0123456789abcdef"
    crypto.randomBytes(16).toString("hex"), // Example: "0123456789abcdef"
  ],

  /**
   * Randomly generated 64-byte key.
   * Example: "b2d3c4e5f67890abcdef0123456789"
   */
  sql: generateRandomKey(64),

  /**
   * Array of 13 randomly generated keys of varying lengths.
   * Includes a mix of 16-byte and 32-byte keys.
   */
  random: [
    generateRandomKey(32), // Example: "a2b3c4d5e6f7g8h9"
    crypto.randomBytes(16).toString("hex"), // Example: "c9d8e7f6a5b4c3d2"
    generateRandomKey(16), // Example: "9a8b7c6d5e4f3g2h"
    crypto.randomBytes(16).toString("hex"), // Example: "a1b2c3d4e5f67890"
    generateRandomKey(16), // Example: "e5f6a7b8c9d0a1b2"
    crypto.randomBytes(32).toString("hex"), // Example: "9f8e7d6c5b4a3e2f"
    generateRandomKey(16), // Example: "2b3c4d5e6f7a8b9c"
    generateRandomKey(16), // Example: "d4e5f6a7b8c9d0e1"
    crypto.randomBytes(16).toString("hex"), // Example: "f8a9b0c1d2e3f4g5"
    generateRandomKey(32), // Example: "0a1b2c3d4e5f6789"
    generateRandomKey(16), // Example: "9c8d7e6f5a4b3c2d"
    crypto.randomBytes(16).toString("hex"), // Example: "b2c3d4e5f6a7b8c9"
    crypto.randomBytes(32).toString("hex"), // Example: "a1b2c3d4e5f67890"
  ],

  /**
   * Array of predefined hexadecimal string values.
   * These values might represent some constant or predefined identifiers.
   */
  var: [
    "0x7492958295",
    "0x9682756824",
    "0x9678275678",
    "0x3876827526",
    "0x6276827928",
    "0x3682767256",
    "0x9625671275",
    "0x3385682366",
    "0x2357835625",
    "0x7928682662",
    "0x0258275625",
    "0x7792865256",
    "0x8825726562",
    "0x1696828672",
    "0x4376927623",
    "0x5276927562",
    "0x7827657262",
    "0x5728769276",
    "0x3682376826",
    "0x8276827698",
    "0x7739865825",
    "0x8825826692",
    "0x5627568365",
    "0x2692896267",
    "0x6928672762",
    "0x6932868276",
    "0x8286721657",
  ],

  /**
   * Array of predefined string values, possibly used as identifiers or tokens.
   */
  www: [
    "@%23456@56v242fNHU",
    "&22%JJHJDjdj362LKf",
    "hFHHkf@$^84782hjf$",
    "jfhjdhfj@#%$%$%$%$",
    "^%SDMFGJ#rtjvHJF43",
    "HFJ38HFH@$%$jfj4$J",
    "FJhjfjh93JF8@rf8#F",
    "DJHJ@289cjoiDFK@Ff",
    "hjh@f29f%dsiHIFUIH",
    "8324DFGDFGj239@%!c",
    "dj@#%%^jjsd@fjdfJI",
    "@$%%^DJIG@#$JOfjk#",
  ],
};
