let text = document.getElementById("decryptedText");
let encText = document.getElementById("encryptedText");
let encrypt = document.getElementById("encrypt");
let decrypt = document.getElementById("decrypt");

encrypt.onclick = function() {
  if (text.value) {
    encText.value = base64Encode(text.value);
  }
}

decrypt.onclick = function() {
  if (encText.value) {
  	text.value = base64Decode(encText.value);
  }
}

function base64Encode(s) {
  var alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; 
  var p = "";
  var r = "";
  if (s.length % 3 > 0) {
    p += "=";
    s += "\0";
  }
  for (let c = 0; c < s.length; c += 3) {
    var n = (s.charCodeAt(c) << 16) + (s.charCodeAt(c+1) << 8) + s.charCodeAt(c+2);
    n = [(n>>>18) & 63, (n>>>12) & 63, (n>>>6) & 63, n & 63];
    r += alph[n[0]] + alph[n[1]] + alph[n[2]] + alph[n[3]];
  }
  return r.substring(0, r.length - p.length) + p;
}

function base64Decode(s) {
  var alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; 
	base64inv = {};
  for (let i = 0; i < alph.length; i++)
    base64inv[alph[i]] = i;

  s = s.replace(new RegExp('[^'+alph.split("")+'=]', 'g'), "");
  var p = (s.charAt(s.length-1) === '=' ?
          (s.charAt(s.length-2) === '=' ? 'AA' : 'A') : "");
  var r = "";
  s = s.substr(0, s.length - p.length) + p;

  for (let c = 0; c < s.length; c += 4) {
    var n = (base64inv[s.charAt(c)] << 18) + (base64inv[s.charAt(c+1)] << 12) + 
            (base64inv[s.charAt(c+2)] << 6) + base64inv[s.charAt(c+3)];
    r += String.fromCharCode((n >>> 16) & 255, (n >>> 8) & 255, n & 255);
  }
  return r.substring(0, r.length - p.length);
}
