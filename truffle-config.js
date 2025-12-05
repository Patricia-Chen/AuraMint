const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host:"127.0.0.1",
      port: 8545,
      from: "0xc4A4D7a5FfE90Fe4492Bf37a7EFe0EF268CCa473",  // 会自动使用 Ganache 第一个账户
      network_id: "*"
    }
  },compilers:{
    solc:{
      version: "0.8.0"
    }
  }
};
