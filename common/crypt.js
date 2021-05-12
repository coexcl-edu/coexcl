
const CryptoJS = require("crypto-js");
const key = "ASECRET";

function encryptpwd(pwdtoencrpyt) {
    let cipher = CryptoJS.AES.encrypt(pwdtoencrpyt, key);
    cipher = cipher.toString();
    return cipher;
  }
  /**
   * Password Decryption
   * @param {string} pwdtodecrpyt decrypt to user entered password.
   */
  function decryptpwd(pwdtodecrpyt) {
    let decipher = CryptoJS.AES.decrypt(pwdtodecrpyt, key);
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    return decipher;
  }

  module.exports = { encryptpwd, decryptpwd };
