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

let salt = "081395d4448bc815a8c2e6817904e86e3a11bc3a13ecb68a34e3f02c51b8180e"; // Optional
let password = "myPassword1234";

const crypt = hashche.crypt(password, salt);

console.log(crypt);
// $24$12#c502f1babe02e100c53a12414961a2218e9b1f2eb9882d3160cd441eaf719fc4$17/0x7hf4P3J
```

TypeScript Example

```typescript
import { hashche } from "hashche";

let salt = "081395d4448bc815a8c2e6817904e86e3a11bc3a13ecb68a34e3f02c51b8180e"; // Optional
let password = "myPassword1234";

const crypt = hashche.crypt(password, salt);

console.log(crypt);
// $24$12#10ef99c89a43da3d65e615b120d95d76abd36c2d6c4b15e161ee4fb41505565a$17/0xPN630J7
```

## Usage/Examples - Compare Password

JavaScript Example

```javascript
const hashche = require("hashche").hashche;

let salt = "081395d4448bc815a8c2e6817904e86e3a11bc3a13ecb68a34e3f02c51b8180e"; // Optional
let password = "myPassword1234";
let dbPassword =
  "$24$12#c502f1babe02e100c53a12414961a2218e9b1f2eb9882d3160cd441eaf719fc4$17/0x7hf4P3J";

const compare = hashche.compare(password, dbPassword, salt);

console.log(compare);
// true OR false
```

TypeScript Example

```typescript
import { hashche } from "hashche";

let salt = "081395d4448bc815a8c2e6817904e86e3a11bc3a13ecb68a34e3f02c51b8180e"; // Optional
let password = "myPassword1234";
const dbPassword =
  "$24$12#10ef99c89a43da3d65e615b120d95d76abd36c2d6c4b15e161ee4fb41505565a$17/0xPN630J7";

const compare = hashche.compare(password, dbPassword, salt);

console.log(compare);
// true OR false
```

In encryption and comparison, the salt is optional. If you don’t provide one, it will automatically generate a default salt assigned to it. However, it is good practice to use a custom-generated salt, which should be the same for both encryption and password comparison. It would be best to use dotenv to store the salt in an environment variable and pass it as a parameter.

The library is designed to be secure and reliable. Many variations and hashes are created, which are changed every time a new password is generated. But if the correct one is entered, the mechanism recognizes it and works. Fast and easy to use and at the same time reliable and secure.

Enjoy

## License

[MIT](https://choosealicense.com/licenses/mit/)
