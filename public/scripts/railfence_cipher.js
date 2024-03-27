// Function to perform railfence Cipher encryption
function railFenceEncrypt(text, rails) {
  if (rails < 2) {
    throw new Error("Number of rails must be at least 2.");
  }

  let i=0,j=0,l,counter=0;
        let flag="down";
        
        l=text.length;
     let railMatrix=[];
        for(i=0;i<rails;i++)
       {
        railMatrix[i]=[];
        for(j=0;j<l;j++)
        railMatrix[i][j]=' ';
       }
       i=0;
       j=0;
       while(counter<l)
       {
        railMatrix[i][j]=text[counter];
        counter++;
        j++;
        
        if(i==rails-1)
        flag="up";
        if(i==0)
        flag="down";
        if(flag=="down")
        i++;
        if(flag=="up")
        i--;
        
       }
       table(railMatrix,rails,l)
  return railMatrix.flat().join("").replace(
    / /g,"");
}
function table(railMatrix,rails,length)
{
  console.log(railMatrix,rails,length)
  const solutionContainer = document.querySelector(".solution");
  solutionContainer.classList.remove("hide")
  const matrixTable = document.createElement("table");
  matrixTable.setAttribute("id", "railfenceMatrix");

  // Clear previous content
  matrixTable.innerHTML = "";

  // Filling the table
  for (let i = 0; i < rails; i++) {
    const row = matrixTable.insertRow();
    for (let j = 0; j < length; j++) {
      const cell = row.insertCell();
      cell.textContent = railMatrix[i][j];
    }
  }

  solutionContainer.appendChild(matrixTable);
}

// Function to perform railfence Cipher decryption
function railFenceDecrypt(text, rails) {
  if (rails < 2) {
    throw new Error("Number of rails must be at least 2.");
  }

  const textLength = text.length;
  const railMatrix = new Array(rails)
    .fill("")
    .map(() => new Array(textLength).fill(""));
  let currentRail = 0;
  let direction = 1;

  for (let i = 0; i < textLength; i++) {
    railMatrix[currentRail][i] = "X";

    if (currentRail === 0) {
      direction = 1;
    } else if (currentRail === rails - 1) {
      direction = -1;
    }

    currentRail += direction;
  }

  let index = 0;
  for (let rail = 0; rail < rails; rail++) {
    for (let col = 0; col < textLength; col++) {
      if (railMatrix[rail][col] === "X" && index < textLength) {
        railMatrix[rail][col] = text[index++];
      }
    }
  }

  let decryptedText = "";
  currentRail = 0;
  direction = 1;

  for (let i = 0; i < textLength; i++) {
    decryptedText += railMatrix[currentRail][i];

    if (currentRail === 0) {
      direction = 1;
    } else if (currentRail === rails - 1) {
      direction = -1;
    }

    currentRail += direction;
  }
    console.log(railMatrix);
    table(railMatrix,rails,textLength);
  return decryptedText;
}

// Event handler for the Rail Fence Cipher buttons
document.getElementById("railFenceEncryptBtn").addEventListener("click", () => {
  const text = document.getElementById("railFenceText").value.toUpperCase();
  const rails = parseInt(document.getElementById("railFenceRails").value);
  const solutionContainer=document.querySelector(".solution");
  solutionContainer.classList.remove("hide");
  const solutionHeading1 = document.createElement("p");
  solutionHeading1.innerText = `Solution Steps:
  \u00A0\u00A0\u00A0Encryption `;
  solutionHeading1.classList.add("steps-h1");
  solutionContainer.appendChild(solutionHeading1);

  const solutionHeading2 = document.createElement("p");
  solutionHeading2.innerText = `\u00A0\u00A0\u00A0\Plaintext -> ${text}
  \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0No. of Rails -> ${rails}`
  solutionHeading2.classList.add("steps-h2");
  solutionContainer.appendChild(solutionHeading2);
  const encryptedText = railFenceEncrypt(text, rails);
  document.getElementById("railFenceOutput").value = encryptedText;
  const solutionHeading3=document.createElement("p");
  solutionHeading3.innerText=`\u00A0 Now take character row wise
  \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 Ciphertext ->${encryptedText} `;
  solutionHeading3.classList.add("steps-h2");
  solutionContainer.appendChild(solutionHeading3);
});

document.getElementById("railFenceDecryptBtn").addEventListener("click", () => {
  const text = document.getElementById("railFenceText").value.toUpperCase();
  const rails = parseInt(document.getElementById("railFenceRails").value);
  const solutionContainer=document.querySelector(".solution");
  solutionContainer.classList.remove("hide");
  const solutionHeading1 = document.createElement("p");
  solutionHeading1.innerText = `Solution Steps:
  \u00A0\u00A0\u00A0Decryption `;
  solutionHeading1.classList.add("steps-h1");
  solutionContainer.appendChild(solutionHeading1);
  const solutionHeading2 = document.createElement("p");
  solutionHeading2.innerText = `\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0CipherText -> ${text}
  \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0No. of Rails -> ${rails}
  \u00A0\u00A0\u00A0\u00A0No. of columns in matrix = length of ciphertext = ${text.length}
  \u00A0\u00A0\u00A0\u00A0\u00A0No. of rows in matrix = rails = ${rails}`
  solutionHeading2.classList.add("steps-h2");
  solutionContainer.appendChild(solutionHeading2);
  const decryptedText=railFenceDecrypt(text,rails);
  document.getElementById("railFenceOutput").value = decryptedText;
  const solutionHeading3=document.createElement("p");
  solutionHeading3.innerText=`\u00A0 Now take character diagonally
  \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 Plain text ->${decryptedText} `;
  solutionHeading3.classList.add("steps-h2");
  solutionContainer.appendChild(solutionHeading3)
  
  document.getElementById("railFenceOutput").value = decryptedText;
});
