![Logo](https://raw.githubusercontent.com/arnaudovproject/hashche/main/resources/logo.png)

# HASHCHE

This is a JavaScript/TypeScript library that enables you to quickly and easily encrypt your passwords and store them securely in your database. You can then effortlessly compare and verify these passwords. The library provides uncompromising password hashing for maximum security. Additionally, it includes UUID generation, which creates a unique identifier that is guaranteed never to be repeated. You can rely on the UUIDs provided by this library for robust uniqueness. Moreover, the library allows you to generate secure tokens for various purposes, such as user registration, password recovery, and account activation, ensuring that each token is both random and unique.

## Installation

Install hashche with npm

```bash
  npm install hashche
```

## Roadmap

- [Generate a secure password](#usageexamples---generate-password)
- [Comparison of hashed passwords](#usageexamples---compare-password)
- [UUID generation](#usageexamples---generate-uuid)
- [Generate unique TOKENS](#usageexamples---generate-unique-token)

## Usage/Examples - Generate Password

JavaScript Example

```javascript
const { hashche } = require("hashche");

let salt = "081395d4448bc815a8c2e6817904e86e3a11bc3a13ecb68a34e3f02c51b8180e"; // Optional
let password = "myPassword1234";

const crypt = hashche.crypt(password, salt);

console.log(crypt);
// $24$12#41c4ebcbd890e2bd54c31e8a77d666e41b6db0406357ae8872f7333916ad34eb$17/0xJ4h7Ye2
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
const { hashche } = require("hashche");

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
  "$24$12#e527df8ca434fa9878df1326925b316c8acc60de800baf5eabfb1359175a08ca$17/0xLpb75gW";

const compare = hashche.compare(password, dbPassword, salt);

console.log(compare);
// true OR false
```

## Usage/Examples - Generate UUID

JavaScript Example

```javascript
const { uuid } = require("hashche");

const myuuid = uuid();

console.log(myuuid);
// ced68eb5-118d4a446a-ebcd0-6ee56eb8-435ffaa
```

TypeScript Example

```typescript
import { uuid } from "hashche";

const myuuid = uuid();

console.log(myuuid);
// edd8cca1-67926bd334-7b937-e3256ea9-9528847
```

## Usage/Examples - Generate Unique Token

JavaScript Example

```javascript
const { token } = require("hashche");

const mytoken = token();

console.log(mytoken);
// a178b127549632b484f5e7b48cf35d96679b1e5ce562dd7068fccee9de3229e5
```

TypeScript Example

```typescript
import { token } from "hashche";

const mytoken = token();

console.log(mytoken);
// 4c852149052d53523e7ade5748c3ea04e0d5928c79de9ee0bc3d478c5f1a8f31
```

In encryption and comparison, the salt is optional. If you don’t provide one, it will automatically generate a default salt assigned to it. However, it is good practice to use a custom-generated salt, which should be the same for both encryption and password comparison. It would be best to use dotenv to store the salt in an environment variable and pass it as a parameter.

The library is designed and developed to encrypt and hash passwords, ensuring they cannot be guessed or compromised. It then provides a mechanism to match and verify whether the encrypted password is the same as the one provided.

The library can generate a UUID (Unique User Identification Number) that is guaranteed never to be duplicated. Even if used simultaneously across thousands of systems, the likelihood of repetition is virtually impossible.

With this library, you can generate unique tokens quickly and easily. You can use these tokens for user registration, forgotten password recovery, account activation, and other purposes. The tokens are encrypted in such a way that their UUIDs are secure and random. The possibility of generating the same token twice is virtually impossible.

Enjoy

## Authors

- [@arnaudovproject](https://github.com/arnaudovproject)

## License

[MIT](https://choosealicense.com/licenses/mit/)
