import React, { Component } from "react";
let web3 = require("./getWeb3")
let auctionApp = require("./Instance")
class ForgeNFT extends Component{
    //这个状态指的是是否正在等待请求结果
    state = { isrequesting: false, value:"", metadataValue:"" }

    forgeAnNFT = async() => { 
        if (this.state.isrequesting === true)
            return
        this.setState({isrequesting:true})
        //检测并更改默认账户
        await web3.eth.getAccounts().then(
            function(accounts){
                web3.eth.defaultAccount = accounts[0]
            }
        )
        var gas = 3000000
        //更新当前账户信息
        let accounts = web3.eth.getAccounts().then(
            function(accounts){
                web3.eth.defaultAccount = accounts[0]
            }
        );
        //10^6wei 铸币需要的钱
        let NFTname = this.state.value
        let metadata = this.state.metadataValue
        try{
            await auctionApp.methods.applyArts(NFTname).send( {
                    from: web3.eth.defaultAccount,
                    gas: 3000000,
                    value: 1000001
                }
            ).then(
                function(receipt){
                    // 获取NFT ID并存储metadata映射
                    if (metadata) {
                        // 从事件日志中获取新铸造的NFT ID
                        auctionApp.methods.see_NFTS().call({from: web3.eth.defaultAccount}).then(
                            function(items) {
                                if (items && items.length > 0) {
                                    // 获取最新的NFT ID
                                    const latestId = items[items.length - 1];
                                    // 获取这个NFT的identifier作为key
                                    auctionApp.methods.see_NFT_info(latestId).call().then(
                                        function(info) {
                                            const identifier = info[1]; // rarity/identifier
                                            // 存储到localStorage: identifier -> metadata
                                            let metadataCache = JSON.parse(localStorage.getItem('nft_metadata_cache') || '{}');
                                            metadataCache[identifier] = metadata;
                                            localStorage.setItem('nft_metadata_cache', JSON.stringify(metadataCache));
                                        }
                                    );
                                }
                            }
                        );
                    }
                    alert("Successfully minted AI artwork: " + NFTname + "\nPlease refresh your collection to view")
                }
            )
        }
        catch(error){
            alert("An NFT with the same name already exists!")
        }
        this.setState({isrequesting:false})
    }
    render() {
        if (this.state.isrequesting === true)
            return(
                <div className="glass-card loading-container">
                    <div className="loading-spinner"></div>
                    <h3>Forging in progress...</h3>
                </div>
            )
        else return (
            <div className="nft-card">
                <div className="card-header gradient-bg">
                    <h2>Mint Your AI Art NFT</h2>
                    <p>Create a unique AI-generated art piece as an NFT</p>
                </div>
                <div className="card-body">
                    <div className="forge-form">
                        <div className="form-group">
                            <label className="form-label">Artwork Title</label>
                            <input 
                                type="text" 
                                className="form-input" 
                                value={this.state.value} 
                                placeholder="Enter your artwork title"
                                onChange={(e) => {
                                    this.setState({
                                        value: e.target.value
                                    });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Generation Metadata</label>
                            <input 
                                type="text" 
                                className="form-input" 
                                value={this.state.metadataValue}
                                placeholder="e.g., DALL-E 3: A serene mountain landscape at sunset"
                                onChange={(e) => {
                                    this.setState({
                                        metadataValue: e.target.value
                                    });
                                }}
                            />
                            <small style={{color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '5px', display: 'block'}}>
                                Format: [AI Model] + [Prompt] - This will be stored as the unique identifier for your AI artwork
                            </small>
                        </div>
                        <button className="btn-primary btn-large" onClick={this.forgeAnNFT}>
                            Mint NFT
                        </button>
                    </div>
                </div>
            </div>
        )
    }


}
export default ForgeNFT;