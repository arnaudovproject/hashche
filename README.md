
# HASHCHE

A JavaScript/TypeScript library that lets you quickly and easily encrypt your passwords before saving them to the database and then comparing them during authentication.




## Authors

- [@arnaudovproject](https://github.com/arnaudovproject)


## Installation

Install hashche with npm

```bash
  npm install hashche
```
    
## Usage/Examples - Generate Password

JavaScript Example
```javascript
const hashche = require("hashche").hashche;

let password = "myPassword1234";

const crypt = hashche.crypt(password);

console.log(crypt);
// $24$12#c502f1babe02e100c53a12414961a2218e9b1f2eb9882d3160cd441eaf719fc4$17/0x7hf4P3J
```

TypeScript Example
```typescript
import { hashche } from "hashche";

let password = "myPassword1234";

const crypt = hashche.crypt(password);

console.log(crypt);
// $24$12#10ef99c89a43da3d65e615b120d95d76abd36c2d6c4b15e161ee4fb41505565a$17/0xPN630J7
```

## Usage/Examples - Compare Password

JavaScript Example
```javascript
const hashche = require("hashche").hashche;

let password = "myPassword1234";
let dbPassword =
  "$24$12#c502f1babe02e100c53a12414961a2218e9b1f2eb9882d3160cd441eaf719fc4$17/0x7hf4P3J";

const compare = hashche.compare(password, dbPassword);

console.log(compare);
// true OR false
```

TypeScript Example
```typescript
import { hashche } from "hashche";

let password = "myPassword1234";
const dbPassword =
  "$24$12#10ef99c89a43da3d65e615b120d95d76abd36c2d6c4b15e161ee4fb41505565a$17/0xPN630J7";

const compare = hashche.compare(password, dbPassword);

console.log(compare);
// true OR false
```

The library is designed to be secure and reliable. Many variations and hashes are created, which are changed every time a new password is generated. But if the correct one is entered, the mechanism recognizes it and works. Fast and easy to use and at the same time reliable and secure.

Enjoy



## License

[MIT](https://choosealicense.com/licenses/mit/)

