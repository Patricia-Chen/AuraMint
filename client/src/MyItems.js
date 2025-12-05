import React, { Component } from "react";

let web3 = require("./getWeb3")
let auctionApp = require("./Instance")
let items = [];
let list = [];
let onShelf = []
let rarity = []
let name = []
class MyItems extends Component{
    state = { isReloading: false }

    //只执行一次的初始化,在render之后
    componentDidMount = async() => {
        await this.Refresh().then(
            this.setState({isReloading: false})
        )
    }
    
    //刷新按钮绑定事件
    Refresh = async() => {
        if (this.state.isReloading === true){
            alert("Refreshing, please wait");
            return;
        }
        //检查并更改默认账户
        this.setState({isReloading: true})
        await web3.eth.getAccounts().then(
            function(accounts){
                web3.eth.defaultAccount = accounts[0]
            }
        );
        items = [];
        items = await auctionApp.methods.see_NFTS().call(
            {from: web3.eth.defaultAccount}
        ).then(
            // console.log
            function(items){
                var k = 0
                list = []
                for (var i in items)
                {
                    list[k] = items[k]
                    k++
                }
                
            }
        );
        
        await this.getDetail(list).then()
        
    }

    
    DataList(data) {
        // 从localStorage读取metadata缓存
        const metadataCache = JSON.parse(localStorage.getItem('nft_metadata_cache') || '{}');
        
        return (
            <table className="modern-table">
                <thead>
                <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Generation Metadata</th>
                <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map(function (value, key) {
                        const statusClass = onShelf[key] === "On Auction" ? "status-auction" : "status-inventory";
                        const rarityColor = rarity[key] > 80 ? "#ffd700" : rarity[key] > 50 ? "#c0c0c0" : "#cd7f32";
                        const identifier = rarity[key];
                        const fullMetadata = metadataCache[identifier];
                        const displayText = fullMetadata || `Series #${identifier}`;
                        const truncatedText = displayText.length > 50 ? displayText.substring(0, 47) + '...' : displayText;
                        
                        return (
                            <tr key={key}>
                                <td key={value}><span className="badge">{value}</span></td>
                                <td key={name[key]}><strong>{name[key]}</strong></td>
                                <td key={value + name[key]} title={fullMetadata || `Identifier: ${identifier}`}>
                                    <span style={{color: rarityColor, fontWeight: 'bold', fontSize: '0.85rem', fontFamily: 'monospace'}}>
                                        {truncatedText}
                                    </span>
                                </td>
                                <td key={value + onShelf[key]}>
                                    <span className={`status-badge ${statusClass}`}>{onShelf[key]}</span>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
              </table>
        )
    }
    //传入:NFT编号数组
    //作用:将这些NFT的detail写入name和rarity数组中
    getDetail = async(list) => {

        for (var i = 0; i < list.length; i++)
        {
            await auctionApp.methods.see_NFT_info(list[i]).call().then(
                function(x){
                    name[i] = x[0];
                    rarity[i] = x[1];
                }
            )
            await auctionApp.methods.is_On_Auction(list[i]).call().then(
                function(c){
                    onShelf[i] = "In Inventory"
                    if (c === true)
                        onShelf[i] = "On Auction"
                }
            )
        }
        this.setState({isReloading: false})
    }

    render(){
        if (this.state.isReloading === true)
            return(
                <div className="glass-card loading-container">
                    <div className="loading-spinner"></div>
                    <h3>Loading your inventory...</h3>
                </div>
            )
        return(
        <div className="inventory-container">
            <div className="section-header gradient-bg">
                <h2>My AI Art Collection</h2>
                <button className="btn-secondary" onClick={this.Refresh}>
                    Refresh
                </button>
            </div>
            <div className="table-wrapper">
                {this.DataList(list)}
            </div>
        </div>
        );
    }
}


export default MyItems