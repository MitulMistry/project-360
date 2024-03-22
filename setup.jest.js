// https://stackoverflow.com/questions/76608600/jest-tests-are-failing-because-of-an-unknown-unexpected-token-export
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { TextEncoder, TextDecoder } = require("util");

Object.assign(global, { TextDecoder, TextEncoder });
