// Importing the Args class from the Args.ts file in the sys/utility folder
import { Args } from "./sys/utility/Args";

// Creating an instance of the Args class
const hashche = new Args();

// Importing the UUID_KEY constant from the Uuid.ts file in the sys/utility folder
import { generateUuid } from "./sys/utility/Uuid";

// Importing the TOKEN_KEY constant from the Token.ts file in the sys/utility folder
import { generateToken } from "./sys/utility/Token";

// Exporting the 'hashche' instance so it can be used by external modules
export { hashche as hash, generateUuid as uuid, generateToken as token };
