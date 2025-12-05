# AuraMint - AI Art NFT Marketplace

A decentralized marketplace for minting, trading, and auctioning AI-generated art as NFTs on the Ethereum blockchain.

## Overview

AuraMint is a blockchain-based DApp that enables artists to mint their AI-generated artworks (images, videos, and other digital art) as NFTs and sell them through a trustless auction system. Built with React, Solidity, and Web3.js, it provides a complete NFT lifecycle management platform with transparent pricing and immutable ownership records.

## Key Features

- **Mint AI Art NFTs**: Create unique ERC721 NFTs for your AI-generated artworks with custom titles and generation metadata
- **Decentralized Auctions**: List your NFTs for auction with customizable base prices and durations
- **Transparent Bidding**: Place bids on active auctions with automatic validation and highest bidder tracking
- **Ownership History**: View complete provenance and transaction history for each NFT
- **Metadata Caching**: Hybrid on-chain/off-chain storage optimizes gas costs while preserving full metadata
- **Modern UI**: Clean, responsive interface with Morandi color scheme

## Technology Stack

- **Frontend**: React 16.11.0, Web3.js 1.2.2
- **Smart Contracts**: Solidity 0.8.0, OpenZeppelin ERC721
- **Development Tools**: Truffle Framework, Ganache
- **Blockchain**: Ethereum (local testnet)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v12.x or higher)
- [Truffle](https://www.trufflesuite.com/truffle) (`npm install -g truffle`)
- [Ganache](https://www.trufflesuite.com/ganache) (local blockchain)
- [MetaMask](https://metamask.io/) browser extension

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Patricia-Chen/AuraMint.git
cd AuraMint
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
cd client
npm install
cd ..
```

### 3. Start Local Blockchain

Launch Ganache with the following configuration:
- **Port**: 8545
- **Network ID**: 5777
- **Hostname**: 127.0.0.1

Or use Ganache CLI:
```bash
ganache-cli -p 8545
```

### 4. Configure Truffle Network

Verify `truffle-config.js` has the correct network settings:

```javascript
networks: {
  development: {
    host: "127.0.0.1",
    port: 8545,
    network_id: "*"
  }
}
```

## Compile Smart Contracts

Compile the Solidity contracts to generate ABI and bytecode:

```bash
truffle compile
```

**Expected Output:**
```
Compiling your contracts...
===========================
✔ Fetching solc version list from solc-bin...
✔ Compiling ./contracts/ArmorAuction.sol
✔ Compiling ./contracts/Migrations.sol
```

The compiled artifacts will be saved in `build/contracts/`.

## Deploy Smart Contracts

### Option 1: Using Truffle Migrate

Deploy contracts to your local Ganache network:

```bash
truffle migrate --reset
```

**Expected Output:**
```
2_deploy_contracts.js
=====================

   Deploying 'ArmorAuction'
   ------------------------
   > transaction hash:    0x...
   > contract address:    0x6c0f7BbD70a474247D0B7ef9DE44C3bd0CE98c49
   > account:             0x...
   > balance:             99.98...
   > gas used:            3421567
   > gas price:           20 gwei
```

**Important**: Copy the deployed contract address.

### Option 2: Using Remix IDE

1. Install and run Remixd:
```bash
npm install -g @remix-project/remixd
remixd -s . -u https://remix.ethereum.org/
```

2. Open [Remix IDE](https://remix.ethereum.org/) and connect to localhost
3. Open `contracts/ArmorAuction.sol`
4. Compile with Solidity 0.8.0
5. Deploy using "Injected Provider" (MetaMask connected to Ganache)
6. Copy the deployed contract address

### Update Contract Address in Frontend

Replace the contract address in the following files:
- `client/src/Instance.js`

Search for the old address and replace with your new deployment address:
```javascript
const address = "YOUR_NEW_CONTRACT_ADDRESS_HERE";
```

## Run Basic Tests

### Test 1: Unit Tests (Truffle)

Run the automated test suite:

```bash
truffle test
```

### Test 2: Manual Functional Testing

1. **Start the Frontend Application**:
```bash
cd client
npm start
```

The app will open at `http://localhost:3000`

2. **Configure MetaMask**:
   - Add Custom Network:
     - Network Name: Ganache Local
     - RPC URL: `http://127.0.0.1:8545`
     - Chain ID: `1337`
     - Currency Symbol: `ETH`
   - Import Ganache accounts using private keys

3. **Test Workflow**:

   **a) Mint an NFT**:
   - Click "Mint Your AI Art NFT"
   - Enter artwork title: `"Sunset Dreams"`
   - Enter generation metadata: `"DALL-E 3: A serene mountain landscape at sunset"`
   - Click "Mint NFT"
   - Confirm MetaMask transaction (cost: 1,000,001 wei + gas)
   - Wait for confirmation

   **b) View Your Collection**:
   - Navigate to "My AI Art Collection"
   - Verify your newly minted NFT appears with correct title and metadata
   - Note the NFT ID and identifier

   **c) Start an Auction**:
   - Click "Start an Auction"
   - Enter NFT ID from previous step
   - Set base price: `5000` wei
   - Set duration: `1000` seconds
   - Click "Start Auction"
   - Confirm MetaMask transaction

   **d) Browse Auctions**:
   - Navigate to "Items on Auction"
   - Verify your auction is listed with correct details
   - Note current highest bidder and deadline

   **e) Place a Bid** (switch to another MetaMask account):
   - Click "Place Your Bid"
   - Enter the NFT ID
   - Enter bid amount (must be higher than current price)
   - Click "Place Bid"
   - Confirm MetaMask transaction

   **f) Claim After Auction**:
   - Wait for auction to expire (or manually advance Ganache time)
   - Navigate to "Check and Claim Your Auctions"
   - Enter the NFT ID
   - Click "Claim"
   - Winner receives NFT, seller receives payment

   **g) Check Ownership History**:
   - Navigate to "NFT Ownership History"
   - Enter NFT ID
   - Click "Check History"
   - View complete ownership transfer records

### Test 3: Smart Contract Interaction Tests

Test contract functions directly using Truffle console:

```bash
truffle console --network development
```

```javascript
// Get contract instance
let instance = await ArmorAuction.deployed()

// Get accounts
let accounts = await web3.eth.getAccounts()

// Test 1: Mint NFT
await instance.applyArts("Test Artwork", {from: accounts[0], value: 1000001})

// Test 2: Check NFT info
let nfts = await instance.see_NFTS({from: accounts[0]})
console.log("My NFTs:", nfts.toString())

// Test 3: Get NFT details
let info = await instance.see_NFT_info(0)
console.log("NFT Name:", info[0], "Identifier:", info[1].toString())

// Test 4: Start auction
await instance.startAuction(0, 5000, 1000, {from: accounts[0]})

// Test 5: Check auction info
let auctionInfo = await instance.see_Auction_Info(0)
console.log("Base Price:", auctionInfo[0].toString())
console.log("Highest Bidder:", auctionInfo[1])

// Exit console
.exit
```

## Project Structure

```
AuraMint/
├── contracts/               # Solidity smart contracts
│   ├── ArmorAuction.sol    # Main NFT auction contract (ERC721)
│   └── Migrations.sol      # Truffle deployment helper
├── migrations/             # Deployment scripts
│   ├── 1_initial_migration.js
│   └── 2_deploy_contracts.js
├── client/                 # React frontend application
│   ├── src/
│   │   ├── contracts/     # Contract ABIs
│   │   ├── ForgeNFT.js    # Mint NFT component
│   │   ├── MyItems.js     # User collection view
│   │   ├── StartAuction.js # Create auction component
│   │   ├── ListAuction.js # Browse auctions component
│   │   ├── BiddingItems.js # Place bid component
│   │   ├── Claim.js       # Claim NFT/funds component
│   │   ├── ShowBelongers.js # Ownership history
│   │   ├── Instance.js    # Contract instance
│   │   ├── getWeb3.js     # Web3 initialization
│   │   └── styles.css     # Morandi design theme
│   └── public/
├── test/                   # Test files
├── truffle-config.js      # Truffle configuration
├── architecture_diagram.png # System architecture
└── README.md
```

## Troubleshooting

### Issue: Contract deployment fails
**Solution**: Ensure Ganache is running on port 8545 and accounts are unlocked

### Issue: MetaMask transaction fails
**Solution**: 
- Reset MetaMask account: Settings → Advanced → Reset Account
- Ensure you have sufficient ETH in the account
- Check that MetaMask is connected to Ganache network

### Issue: "Nonce too high" error
**Solution**: Reset your MetaMask account or manually set the correct nonce

### Issue: Frontend can't connect to contract
**Solution**: Verify the contract address in `Instance.js` matches your deployed address

### Issue: Compilation warnings about SPDX license
**Solution**: This is informational only and doesn't affect functionality

## Key Smart Contract Functions

| Function | Description | Parameters |
|----------|-------------|------------|
| `applyArts(string _name)` | Mint new AI art NFT | Name of artwork |
| `startAuction(uint id, uint price, uint duration)` | List NFT for auction | NFT ID, base price (wei), duration (seconds) |
| `bid(uint id)` | Place bid on auction | NFT ID |
| `claim(uint id)` | Claim NFT after auction ends | NFT ID |
| `see_NFTS()` | View owned NFT IDs | None |
| `see_NFT_info(uint id)` | Get NFT details | NFT ID |
| `see_Auction_Info(uint id)` | Get auction details | NFT ID |
| `belongers(uint id)` | View ownership history | NFT ID |

## Security Considerations

- Contract uses OpenZeppelin's audited ERC721 implementation
- All auction state changes are validated on-chain
- Reentrancy protection on fund transfers
- Name uniqueness enforced to prevent duplicates
- Only NFT owner can start auctions
- Bid validation ensures amount > current highest bid

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please open an issue on GitHub.

---
