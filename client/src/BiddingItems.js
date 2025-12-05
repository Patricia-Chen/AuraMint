import React, { Component } from "react";
let web3 = require("./getWeb3")
let address = "0x6c0f7BbD70a474247D0B7ef9DE44C3bd0CE98c49"
let auctionApp = require("./Instance")
class BiddingItems extends Component{
    state = { isrequesting: false, valueID:"" , valueprice:""}
   
    biddingFor = async() => {
        this.setState({isrequesting:true})
        //检测并更改默认账户
        await web3.eth.getAccounts().then(
            function(accounts){
                web3.eth.defaultAccount = accounts[0]
            }
        )
        let isApprove = auctionApp.methods.isApprovedForAll(web3.eth.defaultAccount, address).call()
        if (isApprove == false)
        {
            alert("Please refresh the page to re-authorize auction functionality")
            this.setState({isrequesting:false})
            return
        }
        let ID = this.state.valueID
        let price = this.state.valueprice
        if (ID == "")
        {
            alert("Please enter a valid ID")
            this.setState({isrequesting:false})
            return
        }
        if (price == "")
        {
            alert("Please enter a valid price")
            this.setState({isrequesting:false})
            return
        }
        try{
            auctionApp.methods.bidForWeapon(ID).send(
                {
                    from: web3.eth.defaultAccount,
                    gas: 300000,
                    value: price
                }
            ).then(
                function(){
                    alert("Successfully bid on: ID " + ID + "\nPlease refresh the page to view")
                }
            )
        }
        catch(error){
            alert("Bid must be higher than current price/Auction ended, please verify your input")
            this.setState({isrequesting:false})
            return
        }
        this.setState({isrequesting:false})


    }

    render(){
        if (this.state.isrequesting)
            return(
                <div className="glass-card loading-container">
                    <div className="loading-spinner"></div>
                    <h3>Placing your bid...</h3>
                </div>
            )
        else{
            return(
                <div className="nft-card">
                    <div className="card-header gradient-bg">
                        <h2>Place Your Bid</h2>
                        <p>Compete for the NFT you desire</p>
                    </div>
                    <div className="card-body">
                        <form className="bid-form">
                            <div className="form-group">
                                <label className="form-label">NFT ID</label>
                                <input 
                                    type="number" 
                                    className="form-input" 
                                    placeholder="Enter auction ID" 
                                    key="inputID"
                                    onChange={(e) => {
                                        this.setState({
                                            valueID: e.target.value
                                        });
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Bid Amount (wei)</label>
                                <input 
                                    type="number" 
                                    className="form-input" 
                                    placeholder="Enter your bid" 
                                    key="inputPrice"
                                    onChange={(e) => {
                                        this.setState({
                                            valueprice: e.target.value
                                        });
                                    }}
                                />
                            </div>
                            <button 
                                type="button" 
                                className="btn-primary btn-large" 
                                onClick={this.biddingFor}
                            >
                                Place Bid
                            </button>
                        </form>
                    </div>
                </div>
            )
        }
    }
}





export default BiddingItems