require('@nomicfoundation/hardhat-toolbox');

module.exports = {
  blockGasLimit: 500_000_000,
  networks: {
    hardhat: {
    },
    // testnet: {
    //   url: "https://eth.bd.evmos.dev:8545",
    //   accounts: [privateKey1, privateKey2],
    // }
  },
  solidity: {
    compilers:[
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.8.2",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ]
  },
};
