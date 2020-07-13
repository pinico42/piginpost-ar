
const root = document.getElementById("twojs-canvas");
let h = window.innerHeight;
let w = window.innerWidth;
const two = new Two({width: w, height: h}).appendTo(root);
window.onresize = (ev) => {
  h = window.innerHeight;
  w = window.innerWidth;
  two.height = h;
  two.width = w;
}

