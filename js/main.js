let text = document.getElementById("decryptedText");
let encText = document.getElementById("encryptedText");
let encrypt = document.getElementById("encrypt");
let decrypt = document.getElementById("decrypt");

encrypt.onclick = function() {
  encText.value = base64Encode(text.value);
}

function base64Encode(s) {
  var alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; 
  var p = "";
  var r = "";
  if (s.length % 3 > 0) {
    p += "=";
    s += "\0";
  }
  for (c = 0; c < s.length; c += 3) {
    var n = (s.charCodeAt(c) << 16) + (s.charCodeAt(c+1) << 8) + s.charCodeAt(c+2);
    n = [(n>>>18) & 63, (n>>>12) & 63, (n>>>6) & 63, n & 63];
    r += alph[n[0]] + alph[n[1]] + alph[n[2]] + alph[n[3]];
  }
  return r.substring(0, r.length - p.length) + p;
}

function base64Decode(s) {
  
}
