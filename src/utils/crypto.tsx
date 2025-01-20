import MD5 from "crypto-js/md5";
import SHA256 from "crypto-js/sha256";


/**
 * The function exports a TypeScript implementation of the MD5 hashing algorithm for a given string.
 * @param {string} str - The `str` parameter is a string that will be hashed using the MD5 algorithm.
 */
export function md5(str: string) {
  return MD5(str).toString();
}

/**
 * The function takes a string as input and returns a hashed string using the SHA256 algorithm.
 * @param {string} str - The `str` parameter is a string that will be hashed using the SHA256 algorithm.
 */
export function sha256(str: string) {
  return SHA256(str).toString();
}

/**
 * The function generates a unique identifier using the crypto.randomUUID() method.
 */
export function uuid() {
  return crypto.randomUUID();
}

/**
 * The function generates a random key by hashing a unique identifier using the SHA256 algorithm.
 */
export function randomKey() {
  return sha256(uuid());
}
