import React, { Component } from "react";
import Main from './Main'
// import { web3, kit } from '../root'
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import CeloDollar from '../abis/CeloDollar.json'
import UbeswapClone from '../abis/UbeswapClone.json'
import YieldFarm from '../abis/YieldFarm.json'
import Navbar from "./Navbar";
import "./App.css";

let kit;

class App extends Component {
  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchaiData()
  }

  async loadBlockchaiData(){
    const web3 = new Web3(window.celo)
    kit = newKitFromWeb3(web3)

    const accounts = await kit.web3.eth.getAccounts()
    this.setState({ account: accounts[0]})
    // kit.defaultAccount = accounts[0];
    // console.log(kit.defaultAccount);

    // Check the Celo network ID
    const networkId = await web3.eth.net.getId();
    console.log(networkId)

    // console.log("CeloDollar data",CeloDollar)

    // load the cusdToken
    const cusdTokenData = CeloDollar.networks[networkId]
    // console.log(" ubeswap token data", ubeswapTokenData)

    if(cusdTokenData) {
      const cusdToken = new kit.web3.eth.Contract(CeloDollar.abi, cusdTokenData.address)
      // contract = new kit.web3.eth.Contract(marketplaceAbi, MPContractAddress)
      this.setState({ cusdToken })

      let cusdTokenBalance = await cusdToken.methods.balanceOf(this.state.account).call()
      this.setState({ cusdTokenBalance:  cusdTokenBalance.toString()})
      // console.log({ balance: cusdTokenBalance})
    } else {
      window.alert("⚠️ CUSD Token contract not deployed to the select network. ");
    }

    // load the UbeswapToken
    const ubeswapTokenData = UbeswapClone.networks[networkId]
    console.log(" ubeswap token data", ubeswapTokenData)

    if(ubeswapTokenData) {
      const ubeswapToken = new kit.web3.eth.Contract(UbeswapClone.abi, ubeswapTokenData.address)
      // contract = new kit.web3.eth.Contract(marketplaceAbi, MPContractAddress)
      this.setState({ ubeswapToken })

      let ubeswapTokenBalance = await ubeswapToken.methods.balanceOf(this.state.account).call()
      this.setState({ ubeswapTokenBalance:  ubeswapTokenBalance.toString()})
      console.log({ balance: ubeswapTokenBalance})
    } else {
      window.alert("⚠️ Ubeswap Token contract not deployed to the select network. ");
    }

    // load the yieldFarm
    const yieldFarmData = YieldFarm.networks[networkId]
    if(yieldFarmData) {
      const yieldFarm = new web3.eth.Contract(YieldFarm.abi, yieldFarmData.address)
      this.setState({ yieldFarm })
      let stakingBalance = await yieldFarm.methods.stakingBalance(this.state.account).call()
      this.setState({ stakingBalance: stakingBalance.toString() })
    } else {
      window.alert('YieldFarm contract not deployed to the select network.')
    }

    // loader
     this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.celo) {
      window.alert("⚠️ Please approve Ubeswap Clone to use Celo wWeb wallet.");
      try {

        await window.celo.enable();
 
      } catch (error) {
        window.alert(`⚠️ ${error}.`);
      }
    } else {
      window.alert("⚠️ Please install the Celo Extension Wallet.");
    }
  }

  stakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.cusdToken.methods.approve(this.state.cusdToken._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.yieldFarm.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  unstakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.yieldFarm.methods.unstakeTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }



  constructor(props) {
    super(props);
    this.state = {
      account: "0x0",
      cusdToken: {},
      UbeswapToken: {},
      cusdTokenBalance: '0',
      UbeswapTokenBalance: '0',
      stakingBalance: '0',
      loading: true
    };
  }

  render() {
    let content 
    if(this.state.loading) {
      content = <p id='loader' className="text-center"> App Loading...</p>
    } else {
      content = <Main
        cusdTokenBalance={this.state.cusdTokenBalance}
        UbeswapTokenBalance={this.state.UbeswapTokenBalance}
        stakingBalance={this.state.stakingBalance}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
       />
    }
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: "600px" }}
            >
              <div className="content mr-auto ml-auto">
                { content }
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
