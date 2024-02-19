// Encryption
function caesarEncrypt(text, shift) {
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

    const newIndex = (charIndex + shift + 26) % 26;
    encryptedText += alphabet[newIndex];
  }

  return encryptedText;
}

// Decryption
function caesarDecrypt(text, shift) {
  return caesarEncrypt(text, -shift);
}

// Function to check a character is Alphabet or not
function isAlphabet(character) {
  return /[A-Z]/.test(character);
}

// Event handler for the Caesar Cipher buttons
document.getElementById("caesarEncryptBtn").addEventListener("click", () => {
  const plainText = document.getElementById("caesarText").value.toUpperCase();
  const shift = parseInt(document.getElementById("caesarShift").value);
  const encryptedText = caesarEncrypt(plainText, shift);
  document.getElementById("caesarOutput").value = encryptedText;

  if (plainText && shift) {
    const solutionContainer = document.querySelector(".solution");
    solutionContainer.innerHTML = "";
    const solutionHeading = document.createElement("h5");
    solutionHeading.innerText = `Solution Steps:
  Encryption: C = (P + K)mod26`;

    solutionContainer.appendChild(solutionHeading);

    for (let i = 0; i < plainText.length; i++) {
      // console.log(plainText[i] + "->" + encryptedText[i]);
      if (isAlphabet(plainText[i])) {
        const steps = document.createElement("p");

        steps.innerText = `For ${plainText[i]}:- (${
          plainText[i]
        } + ${shift})mod26
      (${plainText.charCodeAt(i) - 65} + ${shift})mod26
      ${plainText.charCodeAt(i) - 65 + shift}mod26
      ${(plainText.charCodeAt(i) - 65 + shift) % 26} i.e ${encryptedText[i]}`;

        solutionContainer.appendChild(steps);
      }
    }
  }
});

document.getElementById("caesarDecryptBtn").addEventListener("click", () => {
  const cipherText = document.getElementById("caesarText").value.toUpperCase();
  const shift = parseInt(document.getElementById("caesarShift").value);
  const decryptedText = caesarDecrypt(cipherText, shift);
  document.getElementById("caesarOutput").value = decryptedText;

  if (cipherText && shift) {
    const solutionContainer = document.querySelector(".solution");
    solutionContainer.innerHTML = "";
    const solutionHeading = document.createElement("h2");
    solutionHeading.innerText = `Solution Steps:
  Decryption: P = (C - K)mod26`;

    solutionContainer.appendChild(solutionHeading);

    for (let i = 0; i < cipherText.length; i++) {
      if (isAlphabet(cipherText[i])) {
        const steps = document.createElement("p");

        steps.innerText = `For ${cipherText[i]}:- (${
          cipherText[i]
        } - ${shift})mod26
      (${cipherText.charCodeAt(i) - 65} - ${shift})mod26
      ${cipherText.charCodeAt(i) - 65 - shift}mod26
      ${(cipherText.charCodeAt(i) - 65 - shift) % 26} i.e ${decryptedText[i]}`;

        solutionContainer.appendChild(steps);
      }
    }
  }
});
