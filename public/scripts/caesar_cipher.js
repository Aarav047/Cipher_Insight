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

function mod(n, m) {
  return ((n % m) + m) % m;
}

// Event handler for the Caesar Cipher buttons
document.getElementById("caesarEncryptBtn").addEventListener("click", () => {
  const plainText = document.getElementById("caesarText").value.toUpperCase();
  const shift = parseInt(document.getElementById("caesarShift").value);
  const encryptedText = caesarEncrypt(plainText, shift);
  document.getElementById("caesarOutput").value = encryptedText;

  const solutionContainer = document.querySelector(".solution");
  solutionContainer.innerHTML = "";

  const indexTable = document.querySelector(".table-responsive");

  if (plainText && shift && plainText.length <= 100) {
    indexTable.classList.remove("hide");
    solutionContainer.classList.remove("hide");
    const solutionHeading1 = document.createElement("p");
    solutionHeading1.innerText = `Solution Steps:`;
    solutionHeading1.classList.add("steps-h1");
    solutionContainer.appendChild(solutionHeading1);

    const solutionHeading2 = document.createElement("p");
    solutionHeading2.innerText = `Encryption: C = (P + K)mod26
    where P -> Plain Text
    \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0K -> Key
    \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0C -> Cipher Text`;

    solutionHeading2.classList.add("steps-h2");
    solutionContainer.appendChild(solutionHeading2);

    for (let i = 0; i < plainText.length; i++) {
      if (isAlphabet(plainText[i])) {
        const steps = document.createElement("p");

        steps.innerText = `For ${
          plainText[i]
        }:- \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 (${
          plainText[i]
        } + K)mod26
      \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0(${
        plainText.charCodeAt(i) - 65
      } + ${shift})mod26
      \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${
        plainText.charCodeAt(i) - 65 + shift
      }mod26
      \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${mod(
        plainText.charCodeAt(i) - 65 + shift,
        26
      )} i.e ${encryptedText[i]}`;
        steps.classList.add("steps");
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
  const solutionContainer = document.querySelector(".solution");
  solutionContainer.innerHTML = "";

  if (cipherText && shift && cipherText.length <= 100) {
    solutionContainer.classList.remove("hide");
    const solutionHeading1 = document.createElement("p");
    solutionHeading1.innerText = `Solution Steps:`;
    solutionHeading1.classList.add("steps-h1");
    solutionContainer.appendChild(solutionHeading1);

    const solutionHeading2 = document.createElement("p");
    solutionHeading2.innerText = `Decryption: P = (C - K)mod26
    where C -> Cipher Text
    \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0K -> Key
    \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0P -> Plain Text`;
    solutionHeading2.classList.add("steps-h2");
    solutionContainer.appendChild(solutionHeading2);

    for (let i = 0; i < cipherText.length; i++) {
      if (isAlphabet(cipherText[i])) {
        const steps = document.createElement("p");

        steps.innerText = `For ${
          cipherText[i]
        }:- \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 (${
          cipherText[i]
        } - ${shift})mod26
      \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0(${
        cipherText.charCodeAt(i) - 65
      } - ${shift})mod26
      \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${
        cipherText.charCodeAt(i) - 65 - shift
      }mod26
      \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${mod(
        cipherText.charCodeAt(i) - 65 - shift,
        26
      )} i.e ${decryptedText[i]}`;
        steps.classList.add("steps");
        solutionContainer.appendChild(steps);
      }
    }
  }
});

// Event handlers for Shift field
document.querySelector("#increment").addEventListener("click", () => {
  const shift = document.querySelector("#caesarShift");
  if (shift.value >= 0) {
    shift.stepUp();
  }
});

document.querySelector("#decrement").addEventListener("click", () => {
  const shift = document.querySelector("#caesarShift");
  if (shift.value > 0) {
    shift.stepDown();
  }
});
