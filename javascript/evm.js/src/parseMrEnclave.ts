import type { RawMrEnclave } from "./types.js";

const bytesRegex = /^\[(\s)?[0-9]+((\s)?,(\s)?[0-9]+){31,}\]/g;
const hexRegex = /^(0x|0X)?[a-fA-F0-9]{64}/g;
const base64Regex =
  /^(?:[A-Za-z\d+\/]{4})*(?:[A-Za-z\d+\/]{3}=|[A-Za-z\d+\/]{2}==)?/g;

/**
 * This function parses the input "mrEnclave" which can be of type RawMrEnclave (string, Buffer, Uint8Array, number[]) and converts it into Uint8Array format.
 * The function checks the type and format of the input and accordingly converts it into Uint8Array.
 *
 * If the input is a string, the function checks if it is a string of bytes, a hexadecimal string, or a base64 string and converts accordingly.
 * If none of these match, it assumes the input to be utf-8 and converts it.
 *
 * If the input is an instance of Buffer or Uint8Array, it simply converts to Uint8Array.
 *
 * If none of these types match, it assumes the input to be an array of numbers and converts it to Uint8Array.
 *
 * Finally, it ensures that the output Uint8Array is always 32 bytes.
 *
 * @param mrEnclave - The RawMrEnclave input which can be of type string, Buffer, Uint8Array or number[]
 * @returns A Uint8Array converted from the input.
 *
 * ```typescript
 * let hexString = '0x1A';
 * let uint8ArrayFromHexString = parseMrEnclave(hexString);
 * console.log(uint8ArrayFromHexString); // Uint8Array(...)
 *
 * let buffer = Buffer.from('Hello, World!');
 * let uint8ArrayFromBuffer = parseMrEnclave(buffer);
 * console.log(uint8ArrayFromBuffer); // Uint8Array(...)
 *
 * let byteArray = new Uint8Array([1, 2, 3]);
 * let uint8ArrayFromByteArray = parseMrEnclave(byteArray);
 * console.log(uint8ArrayFromByteArray); // Uint8Array(...)
 * ```
 */
export function parseMrEnclave(mrEnclave: RawMrEnclave): Uint8Array {
  let myUint8Array: Uint8Array;

  if (typeof mrEnclave === "string") {
    if (bytesRegex.test(mrEnclave)) {
      // check if its a string of bytes '[1,2,3]'
      myUint8Array = new Uint8Array(JSON.parse(mrEnclave));
    } else if (hexRegex.test(mrEnclave)) {
      // check if its a hex string '0x1A'
      myUint8Array = new Uint8Array(Buffer.from(mrEnclave, "hex"));
    } else if (base64Regex.test(mrEnclave)) {
      // check if its a base64 string
      myUint8Array = new Uint8Array(Buffer.from(mrEnclave, "base64"));
    } else {
      // assume utf-8
      myUint8Array = new Uint8Array(Buffer.from(mrEnclave));
    }
  } else if (mrEnclave instanceof Buffer) {
    myUint8Array = new Uint8Array(mrEnclave);
  } else if (mrEnclave instanceof Uint8Array) {
    myUint8Array = mrEnclave;
  } else {
    // Assume input is number[]
    myUint8Array = new Uint8Array(mrEnclave);
  }

  // make sure its always 32 bytes
  return new Uint8Array(
    Array.from(myUint8Array).concat(Array(32).fill(0)).slice(0, 32)
  );
}
