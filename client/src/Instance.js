let ArmorAuction = require("./contracts/ArmorAuction.json")
let web3 = require("./getWeb3")
let address = "0x6c0f7BbD70a474247D0B7ef9DE44C3bd0CE98c49"
let auctionApp = new web3.eth.Contract(
    ArmorAuction.abi,
    address
  )

module.exports = auctionApp