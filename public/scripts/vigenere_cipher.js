// Function to perform vigenere Cipher encryption
// Function to check a character is Alphabet or not
function isAlphabet(character) {
  return /[A-Z]/.test(character);
}

function mod(n, m) {
  return ((n % m) + m) % m;
}
function keyAdjusment(plain_text,keyword)
{
  let i=0;
  while(keyword.length<plain_text.length)
  {
    keyword+=keyword[i];
    i++;
  }
  return keyword;
}
function vigenereEncrypt(plain_text, keyword) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const textLength = plain_text.length;
  const keywordLength = keyword.length;
  console.log(keyword);
  let encryptedText = "";

  for (let i = 0; i < textLength; i++) {
    const char = plain_text[i];
    if (char === " ") {
      encryptedText += " ";
      continue;
    }

    const keyChar = keyword[i % keywordLength];
    const keyIndex = alphabet.indexOf(keyChar);
    const charIndex = alphabet.indexOf(char);

    if (charIndex === -1) {
      encryptedText += char;
      continue;
    }

    const shift = keyIndex;
    const newIndex = (charIndex + shift + 26) % 26;
    encryptedText += alphabet[newIndex];
  }

  return encryptedText;
}

// Function to perform vigenere Cipher decryption
function vigenereDecrypt(text, keyword) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const textLength = text.length;
  const keywordLength = keyword.length;
  let decryptedText = "";
  let i=0;
  

  for (let i = 0; i < textLength; i++) {
    const char = text[i];
    if (char === " ") {
      decryptedText += " ";
      continue;
    }

    const keyChar = keyword[i % keywordLength];
    const keyIndex = alphabet.indexOf(keyChar);
    const charIndex = alphabet.indexOf(char);

    if (charIndex === -1) {
      decryptedText += char;
      continue;
    }

    const shift = (26 - keyIndex) % 26;
    const newIndex = (charIndex + shift) % 26;
    decryptedText += alphabet[newIndex];
  }

  return decryptedText;
}

// Event handler for the Vigenere Cipher buttons
document.getElementById("vigenereEncryptBtn").addEventListener("click", () => {
  let plainText = document.getElementById("vigenereText").value.toUpperCase();
  plainText=plainText.replaceAll(" ","");
  let keyword = document
    .getElementById("vigenereKeyword")
    .value.toUpperCase();
    let orgKey=keyword;
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    keyword=keyAdjusment(plainText,keyword);
  const encryptedText = vigenereEncrypt(plainText, keyword);
  document.getElementById("vigenereOutput").value = encryptedText;
  const solutionContainer = document.querySelector(".solution");
  console.log(solutionContainer);
  solutionContainer.innerHTML = "";
 const indexTable = document.querySelector(".table-responsive");
  if (plainText.length <= 100) {
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

    const solutionHeading3 = document.createElement("p");
    solutionHeading3.innerText = ` Plaintext -> ${plainText}
    \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Key -> ${orgKey}
    \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Modified key -> ${keyword}`;
    solutionHeading3.classList.add("steps-h2");
    solutionContainer.appendChild(solutionHeading3);

    for (let i = 0; i < plainText.length; i++) {
      if (isAlphabet(plainText[i])) {
        const steps = document.createElement("p");
        let shift=alphabet.indexOf(keyword[i]);

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

document.getElementById("vigenereDecryptBtn").addEventListener("click", () => {
  let text = document.getElementById("vigenereText").value.toUpperCase();
  text=text.replaceAll(" ","");
  let keyword = document
    .getElementById("vigenereKeyword")
    .value.toUpperCase();
    let orgkey=keyword;
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    keyword=keyAdjusment(text,keyword);
  const cipherText = vigenereDecrypt(text, keyword);
  document.getElementById("vigenereOutput").value = cipherText;
  const solutionContainer = document.querySelector(".solution");
  solutionContainer.innerHTML = "";

  if (cipherText.length <= 100) {
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

    const solutionHeading3 = document.createElement("p");
    solutionHeading3.innerText = ` Encrypted text -> ${text}
    \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Key -> ${orgkey}
    \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Modified key -> ${keyword}`;
    solutionHeading3.classList.add("steps-h2");
    solutionContainer.appendChild(solutionHeading3);

    for (let i = 0; i < cipherText.length; i++) {
      if (isAlphabet(cipherText[i])) {
        const steps = document.createElement("p");
        let shift=alphabet.indexOf(keyword[i]);

        steps.innerText = `For ${
          text[i]
        }:- \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 (${
          text[i]
        } - ${shift})mod26
      \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0(${
        text.charCodeAt(i) - 65
      } - ${shift})mod26
      \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${
        text.charCodeAt(i) - 65 - shift
      }mod26
      \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${mod(
        text.charCodeAt(i) - 65 - shift,
        26
      )} i.e ${cipherText[i]}`;
        steps.classList.add("steps");
        solutionContainer.appendChild(steps);
      }
    }
  }
});
