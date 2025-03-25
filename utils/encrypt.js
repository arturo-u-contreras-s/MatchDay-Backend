const crypto = require("crypto");

const algorithm = "aes-256-cbc"; // AES encryption algorithm with a 256-bit key in CBC (Cipher Block Chaining) mode
const secretKey = process.env.ENCRYPTION_SECRET; // must be 32 bytes (256 bits) long when converted from hexadecimal.
const iv = crypto.randomBytes(16); // Generate a random IV (Initialization Vector)

const encryptToken = (token) => {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, "hex"), iv);
  let encrypted = cipher.update(token, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
};

const decryptToken = (encryptedToken) => {
  const [ivHex, encryptedData] = encryptedToken.split(":");
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, "hex"), Buffer.from(ivHex, "hex"));
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

module.exports = { encryptToken, decryptToken };