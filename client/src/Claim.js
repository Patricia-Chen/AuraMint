import React, { Component } from "react";
let web3 = require("./getWeb3")
let auctionApp = require("./Instance")
class Claim extends Component{
    state = { isrequesting: false, valueID:"" }

    
    claimNFT = async() => {
        this.setState({isrequesting:true})
        //检测并更改默认账户
        await web3.eth.getAccounts().then(
            function(accounts){
                web3.eth.defaultAccount = accounts[0]
            }
        )
        let ID = this.state.valueID
        if (ID == "")
        {
            alert("Please enter a valid ID")
            this.setState({isrequesting:false})
            return
        }
        try{
            await auctionApp.methods.claimAuction(ID).send({
                from: web3.eth.defaultAccount,
                gas: 300000,
            }).then(
                function(ret){
                    alert("Successfully claimed " + ID + ". Please refresh your inventory to view")
                }
            )
        }
        catch(error){
            alert("Auction not ended/You are not the highest bidder/Insufficient gas fees! Please check the auction interface and account balance")
            this.setState({isrequesting:false})
            return
        }
        this.setState({isrequesting:false})
    }
    render(){
        if (this.state.isrequesting)
            return(
                <div className="claim-banner loading-state">
                    <div className="loading-spinner-small"></div>
                    <span>Claiming NFT, please wait...</span>
                </div>
            )
        else return(
            <div className="claim-banner">
                <span className="claim-text">
                    <strong>Check and Claim Your Auctions</strong>
                </span>
                <div className="claim-input-group">
                    <input 
                        type="number" 
                        placeholder="Enter ID to claim" 
                        className="claim-input"
                        onChange={(e) => {
                            this.setState({
                                valueID: e.target.value
                            });
                        }}
                    />
                    <button 
                        type="button" 
                        className="btn-claim" 
                        onClick={this.claimNFT}
                    >
                        Claim NFT
                    </button>
                </div>
            </div>
        )
    }
}
export default Claim