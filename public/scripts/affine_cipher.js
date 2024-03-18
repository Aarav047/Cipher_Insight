// Function to perform Affine Cipher encryption
function affineEncrypt(text, key1, key2) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const textLength = text.length;
  let encryptedText = "";

  for (let i = 0; i < textLength; i++) {
    const char = text[i];
    if (char === " ") {
      encryptedText += " ";
      continue;
    }

    const charIndex = alphabet.indexOf(char);
    if (charIndex === -1) {
      encryptedText += char;
      continue;
    }

    const newIndex = (key1 * charIndex + key2) % 26;
    encryptedText += alphabet[newIndex];
  }

  return encryptedText;
}

// Function to perform Affine Cipher decryption
function affineDecrypt(text, key1, key2) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const textLength = text.length;
  const modInverseA = modInverse(key1, 26); // Calculate the modular inverse of 'a'

  let decryptedText = "";

  for (let i = 0; i < textLength; i++) {
    const char = text[i];
    if (char === " ") {
      decryptedText += " ";
      continue;
    }

    const charIndex = alphabet.indexOf(char);
    if (charIndex === -1) {
      decryptedText += char;
      continue;
    }

    const newIndex = (modInverseA * (charIndex - key2 + 26)) % 26;
    decryptedText += alphabet[newIndex];
  }

  return decryptedText;
}

// Function to calculate the modular inverse
function modInverse(key1, m) {
  for (let x = 1; x < m; x++) {
    if ((key1 * x) % m === 1) {
      return x;
    }
  }
  return -1; // Return -1 if modular inverse doesn't exist
}

// Event handler for the Affine Cipher buttons
document.getElementById("affineEncryptBtn").addEventListener("click", () => {
  const text = document.getElementById("affineText").value.toUpperCase();
  const key1 = parseInt(document.getElementById("affineKey1").value);
  const key2 = parseInt(document.getElementById("affineKey2").value);
  const encryptedText = affineEncrypt(text, key1, key2);
  document.getElementById("affineOutput").value = encryptedText;
});

document.getElementById("affineDecryptBtn").addEventListener("click", () => {
  const text = document.getElementById("affineText").value.toUpperCase();
  const key1 = parseInt(document.getElementById("affineKey1").value);
  const key2 = parseInt(document.getElementById("affineKey2").value);
  const decryptedText = affineDecrypt(text, key1, key2);
  document.getElementById("affineOutput").value = decryptedText;
});
