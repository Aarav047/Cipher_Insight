// Morse code dictionary
const morseCode = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "'": ".----.",
  "!": "-.-.--",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  _: "..--.-",
  '"': ".-..-.",
  $: "...-..-",
  "@": ".--.-.",
  " ": " ",
};

// Reverse Morse code dictionary
const reverseMorseCode = Object.fromEntries(
  Object.entries(morseCode).map(([key, value]) => [value, key])
);

// Function to check if input is valid for Morse code conversion
function isValidForMorse(inputText) {
  // Valid characters for Morse code conversion
  const validChars = /^[A-Za-z0-9,.?'"!()&:;=+-_$/@ ]*$/;
  return validChars.test(inputText);
}

// Function to check if input is a valid Morse code
function isValidMorse(inputMorse) {
  const morseWords = inputMorse.trim().split("   "); // Split Morse code into words
  for (let i = 0; i < morseWords.length; i++) {
    const morseLetters = morseWords[i].split(" "); // Split Morse code word into letters
    for (let j = 0; j < morseLetters.length; j++) {
      const letter = morseLetters[j];
      if (!(letter in reverseMorseCode)) {
        return false; // Not a valid Morse code sequence
      }
    }
  }
  return true; // All sequences are valid Morse code
}

// Function to convert text to Morse code
function convertToMorse(inputText) {
  let morseOutput = "";
  for (let i = 0; i < inputText.length; i++) {
    const char = inputText[i].toUpperCase();
    if (morseCode[char]) {
      morseOutput += morseCode[char] + " ";
    } else {
      morseOutput += "/ "; // Add slash if character not found
    }
  }
  return morseOutput;
}

// Function to convert Morse code to text
function convertFromMorse(inputMorse) {
  let textOutput = "";
  const morseWords = inputMorse.split("   "); // Split Morse code into words
  for (let i = 0; i < morseWords.length; i++) {
    const morseLetters = morseWords[i].split(" "); // Split Morse code word into letters
    for (let j = 0; j < morseLetters.length; j++) {
      const letter = morseLetters[j];
      if (reverseMorseCode[letter]) {
        textOutput += reverseMorseCode[letter];
      } else {
        textOutput += "?"; // Add question mark if Morse code not found
      }
    }
    textOutput += " "; // Add space between words
  }
  return textOutput.trim(); // Trim extra spaces at the end
}

// Function to embed Audio player and play morse code audio
function playMorseAudio(plaintext) {
  var m = new jscw({ wpm: 25, text: plaintext });
  m.renderPlayer("player", m);
  m.onCharacterPlay = function (c) {
    console.log(c);
  };
}

// Event handler for text to Morse Code conversion
document.querySelector("#morseEncryptBtn").addEventListener("click", () => {
  const inputText = document
    .querySelector("#morseCodeText")
    .value.toUpperCase();
  if (isValidMorse(inputText)) {
    document.querySelector("#morseCodeOutput").value =
      "You cannot encode morse code!";
    document.querySelector("#player").innerHTML = "";

    return; // Exit encryption process
  } else if (!isValidForMorse(inputText)) {
    // If input is not valid for Morse code conversion, display an error message
    document.querySelector("#morseCodeOutput").value =
      "Invalid input for Morse code conversion!";
    document.querySelector("#player").innerHTML = "";

    return; // Exit encryption process
  }

  const morseCodeOutput = convertToMorse(inputText);
  document.querySelector("#morseCodeOutput").value = morseCodeOutput.trim();
  playMorseAudio(inputText); // Playing the morse code audio}
});

// Event handler for Morse Code to text conversion
document.querySelector("#morseDecryptBtn").addEventListener("click", () => {
  const inputMorse = document.querySelector("#morseCodeText").value.trim(); // Remove leading/trailing spaces

  if (inputMorse == "") {
    return;
  } else if (!isValidMorse(inputMorse)) {
    // If input is not a valid Morse code, display an error message
    document.querySelector("#morseCodeOutput").value =
      "Invalid Morse code input!";
    document.querySelector("#player").innerHTML = "";
    return; // Exit decryption process
  }

  let decryptedText = convertFromMorse(inputMorse);
  document.querySelector("#morseCodeOutput").value = decryptedText;
  playMorseAudio(decryptedText);
});
