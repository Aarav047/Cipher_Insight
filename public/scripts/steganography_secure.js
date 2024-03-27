// function to preview the image
let key;
const staticIv = new ArrayBuffer(16);
function previewImage(file, canvasSelector, callback) {
  var reader = new FileReader();
  var image = new Image();
  var $canvas = $(canvasSelector);
  var context = $canvas[0].getContext("2d");
  

  if (file) {
    reader.readAsDataURL(file);
  }

  reader.onloadend = function () {
    image.src = URL.createObjectURL(file);

    image.onload = function () {
      $canvas.prop({
        width: image.width,
        height: image.height,
      });

      context.drawImage(image, 0, 0);

      callback();
    };
  };
}
function bytesToBase64(bytes) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)))
}
function base64ToBytes(base64) {
	return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}
async function keyGen() {
  
  key = await crypto.subtle.generateKey({name: 'AES-CBC', length: 128}, true, ['encrypt', 'decrypt']);
  const exportedKeyBytes = await crypto.subtle.exportKey('raw', key);
  console.log(exportedKeyBytes);
  const exportedKeyBase64 = bytesToBase64(exportedKeyBytes);
  document.querySelector(".col-8").innerText = exportedKeyBase64;
}
async function aes(text,flag,key1){
  if(flag=="encryp"){
  const contentBytes = new TextEncoder().encode(text);
  const encryptedBytes = await crypto.subtle.encrypt({name: 'AES-CBC', iv: staticIv}, key, contentBytes);
  const encryptedBase64 = bytesToBase64(encryptedBytes);
  return encryptedBase64;
  }
if(flag=="decryp")
{
  console.log("In decryp");
  console.log("key is ");
    console.log(key1);
    const keyBase64 = key1;
	const keyBytes = base64ToBytes(keyBase64);
  const keyi = await crypto.subtle.importKey("raw", keyBytes, {name: 'AES-CBC'}, true, ['encrypt', 'decrypt']);
  console.log("keyi",keyi)
  const encryptedBase64 = text;
  const encryptedBytes = base64ToBytes(encryptedBase64);
  console.log("ebyter",encryptedBytes);
  
  const contentBytes = await crypto.subtle.decrypt({name: 'AES-CBC', iv: staticIv}, keyi, encryptedBytes);
  const content = new TextDecoder().decode(contentBytes);
    return content;
}
}
// Function to to hide message in the image
async function  encodeMessage() {
  $(".error").hide();
  $(".binary").hide();

  var text = $("textarea.message").val();
  let aes1= await aes(text,"encryp");
  text=aes1;
  console.log(text);
  var $originalCanvas = $(".original canvas");
  var $nulledCanvas = $(".nulled canvas");
  var $messageCanvas = $(".message canvas");

  var originalContext = $originalCanvas[0].getContext("2d");
  var nulledContext = $nulledCanvas[0].getContext("2d");
  var messageContext = $messageCanvas[0].getContext("2d");
  var width = $originalCanvas[0].width;
  var height = $originalCanvas[0].height;
 // Check if the image is big enough to hide the message
  if (text.length * 8 > width * height * 3) {
    $(".error").text("Text too long for chosen image....").fadeIn();

    return;
  }

  $nulledCanvas.prop({
    width: width,
    height: height,
  });

  $messageCanvas.prop({
    width: width,
    height: height,
  });

  // Normalize the original image and draw it
  var original = originalContext.getImageData(0, 0, width, height);
  var pixel = original.data;
  for (var i = 0, n = pixel.length; i < n; i += 4) {
    for (var offset = 0; offset < 3; offset++) {
      if (pixel[i + offset] % 2 != 0) {
        pixel[i + offset]--;
      }
    }
  }
  nulledContext.putImageData(original, 0, 0);

  // Convert the message to a binary string
  var binaryMessage = "";
  for (i = 0; i < text.length; i++) {
    var binaryChar = text[i].charCodeAt(0).toString(2);
  
// Pad with 0 until the binaryChar has a lenght of 8 (1 Byte)
    while (binaryChar.length < 8) {
      binaryChar = "0" + binaryChar;
    }

    binaryMessage += binaryChar;
  }
  console.log("Binary message before adding 1 img",binaryMessage);

  $(".binary textarea").text(binaryMessage);
  binaryMessage=binaryMessage + "1";
  console.log("Binary message after adding 1 img",binaryMessage);

  // Apply the binary string to the image and draw it
  var message = nulledContext.getImageData(0, 0, width, height);
  pixel = message.data;
  counter = 0;
  for (var i = 0, n = pixel.length; i < n; i += 4) {
    for (var offset = 0; offset < 3; offset++) {
      if (counter < binaryMessage.length) {
        pixel[i + offset] += parseInt(binaryMessage[counter]);
        counter++;
      } else {
        break;
      }
    }
  }
  messageContext.putImageData(message, 0, 0);

  $(".binary").fadeIn();
  $(".images .nulled").fadeIn();
  $(".images .message").fadeIn();
  $("#downloadButton").removeClass("hiddenDownloadButton");
}

// Function to extract the message from the image

async function decodeMessage(key1) {
  var $originalCanvas = $(".decode canvas");
  var originalContext = $originalCanvas[0].getContext("2d");

  var original = originalContext.getImageData(
    0,
    0,
    $originalCanvas.width(),
    $originalCanvas.height()

  );
  let binaryMessage = "";
  var pixel = original.data;
  for (var i = 0, n = pixel.length; i < n; i += 4) {
    for (var offset = 0; offset < 3; offset++) {
      var value = 0;
      if (pixel[i + offset] % 2 != 0) {
        value = 1;
      }

      binaryMessage += value;
    }
  }
  let i1=binaryMessage.lastIndexOf("1");
 binaryMessage=binaryMessage.substring(0,i1);
  console.log("Binary message after",binaryMessage);
 var output = "";
  for (var i = 0; i < binaryMessage.length; i += 8) {
    var c = 0;
    for (var j = 0; j < 8; j++) {
      c <<= 1;
      c |= parseInt(binaryMessage[i + j]);
    }

    output += String.fromCharCode(c);
  }
  console.log(output);
   output=await aes(output,"decryp",key1);
  $(".binary-decode textarea").text(output);
  $(".binary-decode").fadeIn();
}

//------------------  Event Listeners and handlers ------------------ //

$("button.encode, button.decode, button.generatekey").click(function (event) {
  event.preventDefault();
});

// For encode button
document.querySelector(".encode").addEventListener("click", () => {
  encodeMessage();
});

// For decode button
document.querySelector(".decode").addEventListener("click", () => {
   let keyInput=document.querySelector("#decryptkeyinput");
   console.log(keyInput.value);
   key1=keyInput.value;
  decodeMessage(key1);

});
document.querySelector("#key-generate-btn").addEventListener("click",()=>{
keyGen();
})

// Event listener for the Download Button for Encode Image
$("#downloadButton").click(function () {
  var canvas = document.querySelector(".message canvas");
  var image = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  var link = document.createElement("a");
  link.download = "EncodedImage.png";
  link.href = image;
  link.click();
});

// Event listener to preview encoded Image
document
  .querySelector("input[name=baseFile]")
  .addEventListener("change", () => {
    var file = document.querySelector("input[name=baseFile]").files[0];

    $(".images .nulled").hide();
    $(".images .message").hide();

    previewImage(file, ".original canvas", function () {
      $(".images .original").fadeIn();
      $(".images").fadeIn();
    });
  });

// Event listener to preview decoded Image
document
  .querySelector("input[name=decodeFile]")
  .addEventListener("change", () => {
    var file = document.querySelector("input[name=decodeFile]").files[0];

    previewImage(file, ".decode canvas", function () {
      $(".decode").fadeIn();
    });
  });
