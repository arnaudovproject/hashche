import { createHash } from "crypto";

export class Keys {
  private createHash = createHash;
  private swap: string[] = [];
  private Esp: string[] = [
    // Array of ESP keys
    "0x37408379",
    "0x82084929",
    "0x96402759",
    "0x10293847",
    "0x62864773",
    "0x92758439",
    "0x89322901",
    "0x90749385",
    "0x74492295",
    "0x39569385",
    "0x83957830",
    "0x20438572",
    "0x305t8928",
    "0x23058284",
    "0x20959284",
    "0x02389572",
    "0x85648593",
    "0x93489572",
    "0x29347857",
    "0x29582824",
    "0x96823694",
    "0x10984572",
    "0x97483923",
    "0x03496823",
    "0x39692396",
    "0x77692378",
    "0x08827562",
    "0x06648262",
  ];
  private Jfp: string[] = [
    // Array of JFP keys
    "0x78a1f4b2",
    "0x91c7d3e9",
    "0x59a2b9c3",
    "0x40e7c2f6",
    "0x1d9b3a7e",
    "0x7a3c8d5e",
    "0x5f6b2e91",
    "0x6c4d7e30",
    "0x39f8b2c4",
    "0x8d4a3f1b",
    "0x4b7c2d8e",
    "0x62e5f1a3",
    "0xa1b9d3e7",
    "0xc4f7b2a9",
    "0x7f3d2a5e",
    "0x6a9b3f8c",
    "0x4e5c1d7a",
    "0x1b7f6e3c",
    "0xd3e8a4b9",
    "0x8f2b7c5e",
    "0x5e9a1b7d",
    "0xa7f6c2d4",
    "0x3b8e5a1c",
    "0x9c7a3f6b",
    "0x6d4e2f8a",
    "0x1c5b7a9e",
    "0xe7f9a3b6",
    "0x8c2d4e7a",
  ];

  constructor() {
    this.Esp = this.Esp;
    this.Jfp = this.Jfp;
  }

  /**
   * Randomly selects an element from the given array.
   * @param key - The array from which a random element is selected.
   * @returns A randomly selected element from the array.
   */
  private randomKey(key: string[]): string {
    return key[Math.floor(Math.random() * key.length)];
  }

  /**
   * Generates a SHA-256 hash of a randomly selected ESP key.
   * @returns The hashed ESP key as a hexadecimal string.
   */
  generateEspKey(): string {
    const hash = this.createHash("sha256"); // Create a SHA-256 hash instance
    hash.update(this.randomKey(this.Esp)); // Update the hash with a random ESP key
    return hash.digest("hex"); // Return the hexadecimal representation of the hash
  }

  /**
   * Generates a SHA-256 hash of a randomly selected JFP key.
   * @returns The hashed JFP key as a hexadecimal string.
   */
  generateJfpKey(): string {
    const hash = this.createHash("sha256"); // Create a SHA-256 hash instance
    hash.update(this.randomKey(this.Jfp)); // Create a SHA-256 hash instance
    return hash.digest("hex"); // Return the hexadecimal representation of the hash
  }

  /**
   * Hashes all ESP and JFP keys and prepares a list of swapped keys.
   * Each key is hashed and prefixed with "ESP:" or "JFP:" before being added to the swap list.
   * @returns An array of swapped keys with "ESP:" and "JFP:" prefixes.
   */
  swapKeys(): string[] {
    // Hash each ESP key and add to the swap list with "ESP:" prefix
    this.Esp.forEach((key) => {
      const hash = this.createHash("sha256");
      hash.update(key);
      this.swap.push(`ESP:${hash.digest("hex")}`);
    });

    // Hash each JFP key and add to the swap list with "JFP:" prefix
    this.Jfp.forEach((key) => {
      const hash = this.createHash("sha256");
      hash.update(key);
      this.swap.push(`JFP:${hash.digest("hex")}`);
    });

    return this.swap; // Return the list of swapped keys
  }
}
