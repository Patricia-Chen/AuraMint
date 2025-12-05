import React, { Component } from "react";
let web3 = require("./getWeb3")
let address = "0x6c0f7BbD70a474247D0B7ef9DE44C3bd0CE98c49"
let auctionApp = require("./Instance")
class StartAuction extends Component{
    state = { isrequesting: false, valueID: "", valueprice:"", valueddl:"" }

    startAuction = async() => {
        if (this.state.isrequesting === true)
            return
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
        let originPrice = this.state.valueprice
        let ID = this.state.valueID
        //处理输入一个不存在ID的情况
        await auctionApp.methods.totalSupply().call().then(
            function(num){
                if (ID >= num)
                {
                    alert("This NFT does not exist!")
                    this.setState({isrequesting:false})
                    return
                }
            }
        )
        let ddl = this.state.valueddl
        //处理输入不属于你的ID的情况
        await auctionApp.methods.ownerOf(ID).call().then(
            function(owner){
                if (owner != web3.eth.defaultAccount)
                {
                    alert("You do not own this NFT!")
                    this.setState({isrequesting:false})
                    return
                }
            }
        )
        if (ID == "" || originPrice == "" || ddl == "" || ddl <= 60)
        {
            alert("Input does not meet requirements!")
        }
        else{
            try{
                await auctionApp.methods.startAuction(ID, originPrice, ddl).send( {
                        from: web3.eth.defaultAccount,
                        gas: 300000,
                    }
                ).then(
                    function(){
                        alert("Auction successfully started: ID " + ID + "\nPlease refresh the page to view")
                    }
                )
            }
            catch(error){
                alert("This item is already on auction or has not been removed!")
                this.setState({isrequesting:false})
                return
            }
        }
        this.setState({isrequesting:false})
    }


    render(){
        if (this.state.isrequesting === true)
        {
            return (
                <div className="glass-card loading-container">
                    <div className="loading-spinner"></div>
                    <h3>Creating auction, please wait...</h3>
                </div>
            )
        }
        else return(
            <div className="nft-card">
                <div className="card-header gradient-bg">
                    <h2>Start an Auction</h2>
                    <p>List your NFT for auction with custom settings</p>
                </div>
                <div className="card-body">
                    <form className="auction-form">
                        <div className="form-group">
                            <label className="form-label">NFT ID</label>
                            <input 
                                type="number" 
                                className="form-input" 
                                placeholder="Enter your NFT ID" 
                                key="inputID"
                                onChange={(e) => {
                                    this.setState({
                                        valueID: e.target.value
                                    });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Starting Price (wei)</label>
                            <input 
                                type="number" 
                                className="form-input" 
                                placeholder="Enter starting price" 
                                key="inputPrice"
                                onChange={(e) => {
                                    this.setState({
                                        valueprice: e.target.value
                                    });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Duration (seconds, min: 60)</label>
                            <input 
                                type="number" 
                                className="form-input" 
                                placeholder="Enter auction duration" 
                                key="inputDdl"
                                onChange={(e) => {
                                    this.setState({
                                        valueddl: e.target.value
                                    });
                                }}
                            />
                        </div>
                        <button 
                            type="button" 
                            className="btn-primary btn-large" 
                            onClick={this.startAuction}
                        >
                            Start Auction
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
export default StartAuction;