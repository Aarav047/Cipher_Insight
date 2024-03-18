// Function to generate the key square
function generateKeySquare(keyword) {
  const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
  const uniqueChars = [];
  const keySquare = [];

  // Remove duplicate characters from the keyword and handle "I" and "J" as the same letter
  for (const char of keyword.toUpperCase()) {
    if (!uniqueChars.includes(char) && char !== "J") {
      uniqueChars.push(char);
    }
  }

  // Build the key square
  for (let i = 0; i < uniqueChars.length; i++) {
    keySquare.push(uniqueChars[i]);
  }

  for (let i = 0; i < alphabet.length; i++) {
    if (!uniqueChars.includes(alphabet[i])) {
      keySquare.push(alphabet[i]);
    }
  }

  return keySquare;
}

// Function to handle repeated letters by inserting a filler letter
function modifyText(plaintext) {
  let modifiedText = "";
  for (let i = 0; i < plaintext.length; i += 2) {
    let pair = plaintext.slice(i, i + 2);
    if (pair.length === 2 && pair[0] === pair[1]) {
      modifiedText += pair[0] + "X" + pair[1];
    } else {
      modifiedText += pair;
    }
  }

  if (modifiedText.length % 2 !== 0) {
    modifiedText += "X";
  }

  return modifiedText;
}

// Function to perform Playfair encryption
function playfairEncrypt(text, keyword) {
  const keySquare = generateKeySquare(keyword);
  let encryptedText = "";
  let pos1, pos2, row1, row2, col1, col2;

  // Replacing any J in the text with I
  let replaceJ = text.replace(/J/g, "I");
  text = modifyText(replaceJ);

  for (let i = 0; i < text.length; i += 2) {
    pos1 = keySquare.indexOf(text[i]);
    pos2 = keySquare.indexOf(text[i + 1]);
    row1 = Math.floor(pos1 / 5);
    col1 = pos1 % 5;
    row2 = Math.floor(pos2 / 5);
    col2 = pos2 % 5;

    // Same letter in the same row
    if (row1 === row2) {
      encryptedText += keySquare[row1 * 5 + ((col1 + 1) % 5)];
      encryptedText += keySquare[row1 * 5 + ((col2 + 1) % 5)];
    }
    // Same letter in the same column
    else if (col1 === col2) {
      encryptedText += keySquare[((row1 + 1) % 5) * 5 + col1];
      encryptedText += keySquare[((row2 + 1) % 5) * 5 + col1];
    }
    // Rectangle case
    else {
      encryptedText += keySquare[row1 * 5 + col2];
      encryptedText += keySquare[row2 * 5 + col1];
    }
  }

  return encryptedText;
}

// Function to perform Playfair decryption
function playfairDecrypt(text, keyword) {
  const keySquare = generateKeySquare(keyword);
  let decryptedText = "";
  let pos1, pos2, row1, row2, col1, col2;

  // Replacing any J in the text with I
  text = text.replace(/J/g, "I");

  for (let i = 0; i < text.length; i += 2) {
    pos1 = keySquare.indexOf(text[i]);
    pos2 = keySquare.indexOf(text[i + 1]);
    row1 = Math.floor(pos1 / 5);
    col1 = pos1 % 5;
    row2 = Math.floor(pos2 / 5);
    col2 = pos2 % 5;

    // Same letter in the same row
    if (row1 === row2) {
      decryptedText += keySquare[row1 * 5 + ((col1 + 4) % 5)];
      decryptedText += keySquare[row1 * 5 + ((col2 + 4) % 5)];
    }
    // Same letter in the same column
    else if (col1 === col2) {
      decryptedText += keySquare[((row1 + 4) % 5) * 5 + col1];
      decryptedText += keySquare[((row2 + 4) % 5) * 5 + col1];
    }
    // Rectangle case
    else {
      decryptedText += keySquare[row1 * 5 + col2];
      decryptedText += keySquare[row2 * 5 + col1];
    }
  }

  return decryptedText;
}

// Funtion to check if input is a valid word
function isValidWord(word) {
  // Regular expression to match only letters from A to Z
  var regex = /^[A-Z]+$/;

  // Check if the word matches the regular expression
  return regex.test(word);
}
// Function to generate and display the Playfair matrix
function generatePlayfairMatrix(keyword) {
  const solutionContainer = document.querySelector(".solution");

  const keySquare = generateKeySquare(keyword);
  // const matrixTable = document.getElementById("playfairMatrix");
  const matrixTable = document.createElement("table");
  matrixTable.setAttribute("id", "playfairMatrix");

  // Clear previous content
  matrixTable.innerHTML = "";

  // Filling the table
  for (let i = 0; i < 5; i++) {
    const row = matrixTable.insertRow();
    for (let j = 0; j < 5; j++) {
      const cell = row.insertCell();
      cell.textContent = keySquare[i * 5 + j];
    }
  }

  solutionContainer.appendChild(matrixTable);
}

// Funtion to generate the steps for playfair cipher
function playfairSteps(
  text,
  keyword,
  resultText,
  mode1,
  mode2,
  modifiedText,
  pairs1,
  pairs2
) {
  const solutionContainer = document.querySelector(".solution");
  solutionContainer.innerHTML = "";
  solutionContainer.classList.remove("hide");

  const indexTable = document.querySelector(".table-responsive");
  indexTable.classList.remove("hide");

  const solutionHeading1 = document.createElement("p");
  solutionHeading1.innerText = `Solution Steps:`;
  solutionHeading1.classList.add("steps-h1");
  solutionContainer.appendChild(solutionHeading1);

  const solutionHeading2 = document.createElement("p");
  solutionHeading2.innerText = `${mode1} -> ${text}`;
  solutionHeading2.classList.add("steps-h2");
  solutionContainer.appendChild(solutionHeading2);

  const solutionHeading3 = document.createElement("p");
  solutionHeading3.innerText = `key -> ${keyword}`;
  solutionHeading3.classList.add("steps-h2", "stepHeading-3");
  solutionContainer.appendChild(solutionHeading3);

  if (text !== modifiedText) {
    const solutionHeading4 = document.createElement("p");
    solutionHeading4.innerText = `Modified ${mode1} -> ${modifiedText}`;
    solutionHeading4.classList.add("steps-h2", "stepHeading-4");
    solutionContainer.appendChild(solutionHeading4);
  }

  const playfairMatrix = document.createElement("p");
  playfairMatrix.innerText = `Playfair Matrix`;
  playfairMatrix.classList.add("steps-h2", "playfairMatrixHeading");
  solutionContainer.appendChild(playfairMatrix);
  generatePlayfairMatrix(keyword); // calling funtion to generate matrix

  for (let i = 0; i < pairs1.length && pairs2.length; i++) {
    const steps = document.createElement("p");

    steps.innerText = `${pairs1[i]} -> ${pairs2[i]}`;
    steps.classList.add("steps");
    solutionContainer.appendChild(steps);
  }

  const result = document.createElement("p");
  result.innerText = `${mode2} -> ${resultText}`;
  result.classList.add("steps", "result-text");
  solutionContainer.appendChild(result);
}

//------------------------------- Event Handlers -------------------------------//

// Event handler for the Playfair Cipher Encryption button
document.querySelector("#playfairEncryptBtn").addEventListener("click", () => {
  const plainText = document
    .querySelector("#playfairText")
    .value.toUpperCase()
    .replace(/\s/g, "");
  const keyword = document
    .querySelector("#playfairKeyword")
    .value.toUpperCase()
    .replace(/\s/g, "");

  const encryptedText = playfairEncrypt(plainText, keyword);
  const playfairOutput = document.querySelector("#playfairOutput");
  playfairOutput.value = "";

  // clearing any previusly added steps
  const solutionContainer = document.querySelector(".solution");
  solutionContainer.innerHTML = "";

  if (plainText && keyword) {
    if (isValidWord(plainText) && isValidWord(keyword)) {
      playfairOutput.value = encryptedText;
      const modifiedText = modifyText(plainText);
      let pairs1 = []; // Left Side
      for (let i = 0; i < modifiedText.length; i += 2) {
        pairs1.push(modifiedText.slice(i, i + 2));
      }

      let pairs2 = []; // Right Side
      for (let i = 0; i < encryptedText.length; i += 2) {
        pairs2.push(encryptedText.slice(i, i + 2));
      }

      // Calling funtion to generate the steps
      if (plainText.length <= 100) {
        playfairSteps(
          plainText,
          keyword,
          encryptedText,
          "Plain Text",
          "Cipher Text",
          modifiedText,
          pairs1,
          pairs2
        );
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "Please enter a valid plaintext or Key",
      });
    }
  } else {
    solutionContainer.classList.add("hide");
    const indexTable = document.querySelector(".table-responsive");
    indexTable.classList.add("hide");
  }
});

// Event handler for the Playfair Cipher decryption button
document.querySelector("#playfairDecryptBtn").addEventListener("click", () => {
  const cipherText = document
    .querySelector("#playfairText")
    .value.toUpperCase()
    .replace(/\s/g, "");
  const keyword = document
    .querySelector("#playfairKeyword")
    .value.toUpperCase()
    .replace(/\s/g, "");
  const decryptedText = playfairDecrypt(cipherText, keyword);
  const playfairOutput = document.querySelector("#playfairOutput");
  playfairOutput.value = "";

  // clearing any previusly added steps
  const solutionContainer = document.querySelector(".solution");
  solutionContainer.innerHTML = "";

  if (cipherText && keyword) {
    if (
      isValidWord(cipherText) &&
      cipherText.length % 2 === 0 &&
      isValidWord(keyword)
    ) {
      playfairOutput.value = decryptedText;

      let pairs1 = []; // Left Side
      for (let i = 0; i < cipherText.length; i += 2) {
        pairs1.push(cipherText.slice(i, i + 2));
      }

      let pairs2 = []; // Right Side
      for (let i = 0; i < decryptedText.length; i += 2) {
        pairs2.push(decryptedText.slice(i, i + 2));
      }

      if (cipherText.length <= 100) {
        // Calling funtion to generate the steps
        playfairSteps(
          cipherText,
          keyword,
          decryptedText,
          "Cipher Text",
          "Plain Text",
          cipherText,
          pairs1,
          pairs2
        );
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "Please enter a valid ciphertext or Key",
      });
    }
  } else {
    solutionContainer.classList.add("hide");
    const indexTable = document.querySelector(".table-responsive");
    indexTable.classList.add("hide");
  }
});
