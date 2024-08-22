interface DataConfig {
  esp: number;
  jfp: number;
  salt: string;
  level: number;
  embed: string;
  fix: string[];
}

export const data: DataConfig = {
  // Number of characters to use from the start of the ESP key
  esp: 24,

  // Number of characters to use from the end of the JFP key
  jfp: 17,

  // Salt value used in hashing for added security
  salt: "7KwDuIIdGwKbQkC@aNYxjpj3wMsmx1KMvvghK8nkr",

  // Level value used in hashing or encryption processes
  level: 12,

  // Embed value used in hashing or encryption processes
  embed: "0xUUID760093jdjvd44995HGJ9380KMDM9JJJklk03i5Jx2",

  // Array of fix strings used in the final hash or encryption
  fix: [
    "/0x5FF0Ko9",
    "/0x8HBg49I",
    "/0x9IBhd6R",
    "/0xLpb75gW",
    "/0xpL5j9Q",
    "/0xJ4h7Ye2",
    "/0xLfrP5jV",
    "/0x7hf4P3J",
    "/0xN4uJ3O0",
    "/0xNC6tGE9",
    "/0xPN630J7",
    "/xjIW83Pc",
  ],
};
