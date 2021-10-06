const CeloDollar = artifacts.require("CeloDollar");
const UbeswapClone = artifacts.require("UbeswapClone");
const YieldFarm = artifacts.require('YieldFarm');

module.exports = async function(deployer, network, accounts) {
    //  deploy CeloDollar 
    await deployer.deploy(CeloDollar)
    const cUSDToken = await CeloDollar.deployed()

    //  deploy Ubeswap  clone
    await deployer.deploy(UbeswapClone)
    const UBCToken = await UbeswapClone.deployed()

    // deploying the Yield farm contract
    await deployer.deploy(YieldFarm, cUSDToken.address, UBCToken.address)
    const yieldFarm = await YieldFarm.deployed()

    // trasfer tokens to YieldFarm
    // since we dont have function to deposit tokens
    // trasfer so cUSD to investor
    await UBCToken.transfer(yieldFarm.address, '1000000')
    await cUSDToken.transfer("0x909B0DFE4267F7e2037807a71a9E06Eca8ea23dC", '1000')

}