import React, { Component } from "react";
import Moment from 'moment'
let web3 = require("./getWeb3")
let auctionApp = require("./Instance")
let items = [];
let list = [];
let address = "0x6c0f7BbD70a474247D0B7ef9DE44C3bd0CE98c49"
let name = [];
let rarity = [];
let price = [];
let highestBidder = [];
let ddl = []
class ListAuction extends Component{
    state = { isRequesting: false  };

    componentDidMount = async() => {
        await this.Refresh()
        this.setState({isReloading: false})
    }

    Refresh = async() => {
        if (this.state.isRequesting === true){
            alert("Refreshing, please wait");
            return;
        }
        this.setState({isReloading: true})
        //设置默认账户
        await web3.eth.getAccounts().then(
            function(accounts){
                web3.eth.defaultAccount = accounts[0]
            }
        );
        //要先授权合约地址能够操作本账户货币
        await auctionApp.methods.isApprovedForAll(web3.eth.defaultAccount, address).call()
        .then(
            function(ret){
                if (ret === false)
                {
                    alert("Please pay one-time gas fees to enable auction functionality")
                    auctionApp.methods.setApprovalForAll(address, true).send({
                        from: web3.eth.defaultAccount, 
                        gas: 300000,
                    }).then(console.log("approved"))
                }
            }
        )
        items = [];
        //向list中填入所有正在拍卖的物品的序号
        items = await auctionApp.methods.seeAllAuction().call(
            {from: web3.eth.defaultAccount}
        ).then(
            function(items){
                list = []
                var k = 0
                for (var i in items)
                {
                    list[k] = items[k]
                    k++
                }
            }
        )
        await this.getDetails(list);
    }
    getDetails = async(list) => {
 
        //获取这些序号的稀有度和名称信息
        for (var i = 0; i < list.length; i++)
        {
            await auctionApp.methods.see_NFT_info(list[i]).call(
                {from: web3.eth.defaultAccount}
            ).then(
                function(x) {
                    name[i] = x[0];
                    rarity[i] = x[1];
                }
            )
            await auctionApp.methods.see_Auction_Info(list[i]).call().then(
                function(y) {
                    price[i] = y[0]
                    highestBidder[i] = y[1]
                    let stamp = new Date(parseInt(y[5]) * 1000);
                    ddl[i] = Moment(stamp).format('YYYY-MM-DD HH:mm:ss')   
                }
            )
        }
        this.setState({isReloading: false})
    }
    render(){
        // 从localStorage读取metadata缓存
        const metadataCache = JSON.parse(localStorage.getItem('nft_metadata_cache') || '{}');
        
        if (this.state.isRequesting === true)
            return(
                <div className="glass-card loading-container">
                    <div className="loading-spinner"></div>
                    <h3>Loading auction list...</h3>
                </div>
            )
        return (
        <div className="auction-container">
            <div className="section-header gradient-bg">
                <h2>Items on Auction</h2>
                <button className="btn-secondary" onClick={this.Refresh}>
                    Refresh
                </button>
            </div>
            <div className="table-wrapper">
                <table className="modern-table auction-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Price (wei)</th>
                    <th>Metadata</th>
                    <th>Highest Bidder</th>
                    <th>Deadline</th>
                  </tr>
                </thead>
                <tbody>
                    {
                        list.map(function (value, key) {
                            const rarityColor = rarity[key] > 80 ? "#ffd700" : rarity[key] > 50 ? "#c0c0c0" : "#cd7f32";
                            const identifier = rarity[key];
                            const fullMetadata = metadataCache[identifier];
                            const displayText = fullMetadata || `Series #${identifier}`;
                            const truncatedText = displayText.length > 40 ? displayText.substring(0, 37) + '...' : displayText;
                            
                            return (
                                <tr key={key}>
                                    <td key={value}><span className="badge">{value}</span></td>
                                    <td key={name[key]}><strong>{name[key]}</strong></td>
                                    <td key={price[key]} className="price-cell">{price[key]}</td>
                                    <td key={value + name[key]} title={fullMetadata || `Identifier: ${identifier}`}>
                                        <span style={{color: rarityColor, fontWeight: 'bold', fontSize: '0.85rem', fontFamily: 'monospace'}}>
                                            {truncatedText}
                                        </span>
                                    </td>
                                    <td key={price[key] + highestBidder[key]} className="address-cell">
                                        {highestBidder[key]}
                                    </td>
                                    <td key={value + key + value} className="deadline-cell">{ddl[key]}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                </table>
            </div>
        </div>
        )
    }
        
    
}

export default ListAuction
