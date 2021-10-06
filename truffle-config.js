const ContractKit = require('@celo/contractkit')
const Web3 = require('web3')

require('babel-register');
require('babel-polyfill');

// connect to the desired network
const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
const kit = ContractKit.newKitFromWeb3(web3)

const getAccount = require('./utils/getAccount').getAccount

async function awaitWrapper(){
  let account = await getAccount()
  console.log(`Account address: ${account.address}`)
  kit.addAccount(account.privateKey)
}

awaitWrapper()

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    alfajores: {
      provider: kit.web3.currentProvider,
      network_id: 44787
    },
    mainnet: {
      provider: kit.web3.currentProvider,
      network_id: 42220
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/', // will put compiled code to abis
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg"
    }
  }
}
