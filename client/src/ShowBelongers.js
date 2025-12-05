import React, { Component } from "react";
let auctionApp = require("./Instance")
let list = []
class ShowBelongers extends Component{
    state = { isrequesting: false, valueID:""}

    checkBelongings = async() => {
        this.setState({isrequesting:true})
        let ID = this.state.valueID
        list = [];
        if (ID === ""){
            alert("Please enter a valid ID!")
            this.setState({isrequesting:false})
            return
        }
        try{
            await auctionApp.methods.showBelongings(ID).call().then(
                function(ret){
                    list = ret
                }
            )   
        }
        catch(error){
            alert("This NFT ID does not exist!")
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
                    <h3>Querying ownership history...</h3>
                </div>
            )
        else return(
            <div className="nft-card">
                <div className="card-header gradient-bg">
                    <h2>NFT Ownership History</h2>
                    <p>Track the journey of any NFT</p>
                </div>
                <div className="card-body">
                    <div className="history-form-horizontal">
                        <div className="form-group-flex">
                            <label className="form-label">NFT ID</label>
                            <input 
                                type="number" 
                                className="form-input" 
                                placeholder="Enter NFT ID to check" 
                                key="inputID"
                                onChange={(e) => {
                                    this.setState({
                                        valueID: e.target.value
                                    });
                                }}
                            />
                        </div>
                        <button 
                            type="button" 
                            className="btn-primary btn-check" 
                            onClick={this.checkBelongings}
                        >
                            Check History
                        </button>
                    </div>
                    {list.length > 0 && (
                        <div className="table-wrapper" style={{marginTop: '20px'}}>
                            <table className="modern-table">
                                <thead>
                                <tr>
                                    <th>Order</th>
                                    <th>Owner (Chronological)</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    list.map(function (value, key) {
                                        return (
                                            <tr key={key}>
                                                <td key={1+value}><span className="badge">{key}</span></td>
                                                <td key={key+value} className="address-cell">{value}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
export default ShowBelongers