//import Arweave from "arweave/web";

const app_name = "piginpost-dev"

const arweave = Arweave.init();

const pigins = {
  updateWallet(ev) {
    const fileReader = new FileReader();
    fileReader.onload = async e => {
      if (e.target != null && e.target.result != null) {
        pigins.jwk = JSON.parse(e.target.result.toString());
        console.log(pigins.jwk);
        pigins.walletAddress = await arweave.wallets.jwkToAddress(pigins.jwk);
        console.log(pigins.walletAddress);
        pigins.winston = await arweave.wallets.getBalance(pigins.walletAddress);
        pigins.ar = arweave.ar.winstonToAr(pigins.winston)
        document.getElementById("balance").innerHTML = "Balance: " + pigins.ar + "Ar" ;
        console.log(pigins.winston);
        window.setTimeout(()=>{
          document.getElementById("popup-wallet").parentElement.style.opacity = 0;
          window.setTimeout(()=>{
            document.getElementById("popup-wallet").parentElement.style.display = "none";
          }, 300)
        }, 800)
      }
    };
    if (ev.target instanceof HTMLInputElement && ev.target.files != null)
      fileReader.readAsText(ev.target.files[0]);
  },

  async uploadData(tag, data, type) {
    if(!this.jwk) throw new Error("No wallet connected")
    const transaction = await arweave.createTransaction({
      data: data
    }, this.jwk)
    transaction.addTag("piginpost-tag", tag)
    transaction.addTag("piginpost-type", type)
    transaction.addTag("app-name", app_name)
    await arweave.transactions.sign(transaction, this.jwk)
    console.log(transaction.id)
    const response = await arweave.transactions.post(transaction);
    console.log(response.status);
  },

  async getData(){
    const txids = await arweave.arql({
      op:"equals",
      expr1: "app-name",
      expr2: app_name
    })
    const choice = txids[Math.floor(Math.random()*txids.length)]
    const transaction = await arweave.transactions.get(choice)
    let pigeonTag = ""
    let type = ""
    transaction.get('tags').forEach(tag => {
      let key = tag.get('name', {decode: true, string: true});
      let value = tag.get('value', {decode: true, string: true});
      if(key==="piginpost-tag") pigeonTag = value
      if(key==="piginpost-type") type = value
    });
    return {
      tag: pigeonTag,
      data: transaction.get('data', {decode: true, string: true}),
      type: type
    }
  }
}

document.getElementById("walletUploadInput").onchange = pigins.updateWallet
