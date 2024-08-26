// Importing the Args class from the Args.ts file in the sys/utility folder
import { Args } from "./sys/utility/Args";

// Importing the UUID_KEY constant from the Uuid.ts file in the sys/utility folder
import { UUID_KEY } from "./sys/utility/Uuid";

// Creating an instance of the Args class
const hashche = new Args();

// Exporting the 'hashche' instance so it can be used by external modules
export { hashche, UUID_KEY as uuid };
