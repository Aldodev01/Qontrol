/*
 * name validation
 * accepted: letters & spaces, minimum 3 chars, maximum 15 chars
 */
export const username: RegExp = /[a-zA-Z\ ]{3,15}/;
/*
 * email validation
 */
export const email: RegExp = /^[^\s@]+@[^\s@]+\.([^\s@]{2,})+$/;
export const status: RegExp = /^(user|signer)$/;

/*
 * password validation, should contain:
 * (?=.*\d): at least one digit
 * (?=.*[a-z]): at least one lower case
 * (?=.*[A-Z]): at least one uppercase case
 * [0-9a-zA-Z]{6,}: at least 6 from the mentioned characters
 */
export const password: RegExp = /^.{6,}$/;

/*
 * phone validation
 * accepted: digits only, minimum 10 chars, maximum 15 chars, optionally starts with '+'
 */
export const phone: RegExp = /^\+?\d{10,15}$/;
