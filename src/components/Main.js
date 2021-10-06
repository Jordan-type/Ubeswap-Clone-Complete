import React, { Component } from "react";
import celoLogo from '../assets/images/celo_logo.png'

class Main extends Component {

  render() {
    return (
      <div id="content" className="mt-3">
                  <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Staking Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{(this.props.stakingBalance)} cUSD</td>
              <td>{(this.props.UbeswapTokenBalance)} UBC</td>

            </tr>
          </tbody>
        </table>

        <div className="card mb-4" >

          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let amount
                amount = this.input.value.toString()
                // amount = window.kit.web3.utils.toWei(amount, 'Ether')
                this.props.stakeTokens(amount)
              }} >
              <div>
                <label className="float-left"><b>Stake Tokens</b></label>
                <span className="float-right text-muted">
                  Balance: {(this.props.cusdTokenBalance)}
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <img src={celoLogo} height='32' alt=""/>
                    &nbsp;&nbsp;&nbsp; cUSD
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">STAKE </button>
            </form>
            <button
              type="submit"
              className="btn btn-link btn-block btn-sm"
              onClick={(event) => {
                event.preventDefault()
                this.props.unstakeTokens()
              }}>
                UN-STAKE
              </button>
          </div>
        </div>

      </div>
    );
  }
}

export default Main;
