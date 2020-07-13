document.getElementById("submit").onclick = uploadMessage
function uploadMessage(){
  console.log(pigins)
  pigins.uploadData(document.getElementById("tag").value, document.getElementById("message").value, "text").then(()=>{
    console.log("done");
  }).catch((e)=>{console.log(e)})
}

function getMessage(){
  pigins.getData().then((x)=>console.log(x)).catch((e)=>{console.log(e)})
}

document.getElementById("get").onclick = getMessage




const flock = new Flock()
two.bind('update', function(frameCount) {
  flock.tick();
}).play();
