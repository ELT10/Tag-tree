import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import {
  BscConnector,
  UserRejectedRequestError,
} from '@binance-chain/bsc-connector'
//import bsc from '@binance-chain/bsc-use-wallet'
import {
  ConnectionRejectedError, useWallet, UseWalletProvider
} from 'use-wallet';


function App() {
  const [usacc, setUsacc] = useState();
  const [usbal, setUsbal] = useState();
  const [usstat, setUsstat] = useState();
  const wallet = useWallet()
  useEffect(() => {
    if (wallet.status === "connected" || localStorage.getItem("wallstat") === "connected") {
      localStorage.setItem("wallstat", "connected");
      localStorage.setItem("usradd", wallet.account);
      localStorage.setItem("usrbal", wallet.balance);
      setUsacc(localStorage.getItem("usradd"));
      setUsbal(localStorage.getItem("usrbal"));
      setUsstat("connected");
    }
    if (wallet.status !== "connected") {
      console.log("Resettings happening");
      localStorage.setItem("wallstat", "disconnected");
      localStorage.setItem("usradd", "");
      localStorage.setItem("usrbal", "");
      setUsacc(localStorage.getItem("usradd"));
      setUsbal(localStorage.getItem("usrbal"));
      setUsstat("disconnected");
    }
  });
  const blockNumber = wallet.getBlockNumber()

  return (
    <>


      <nav class="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
        <div class="container">

          <a class="navbar-brand logo-image" href="#"><h1 style={{ color: "white", textDecoration: "none" }}>LOGO</h1></a>

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-awesome fas fa-bars"></span>
            <span class="navbar-toggler-awesome fas fa-times"></span>
          </button>



          <div class="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav ml-auto" style={{ margin: "0 auto" }}>
              <li class="nav-item">
                <a class="nav-link page-scroll" href="#header">SEARCH HASHTAGS</a>
              </li>
              <li class="nav-item">
                <a class="nav-link page-scroll" href="#features">MY HASHTAGS</a>
              </li>
              <li class="nav-item">
                <a class="nav-link page-scroll" href="#details">TRACK REFFERALS</a>
              </li>

            </ul>

            <span class="nav-item">
              {usstat === 'connected' ? (
                <div class="usrdet">
                  <div class="usracc">Acc: {usacc} </div>
                  <div class="usrbal">( {usbal} ETH )</div>
                  <button class="btn-outline-sm discc" onClick={() => { wallet.reset() }}>disconnect</button>
                </div>
              ) :
                (
                  <a class="btn-outline-sm" href="#open-modal">LOG IN</a>
                )}
            </span>
          </div>
        </div>
      </nav>
      <div id="open-modal" class="modal-window">
        <div>
          <a href="#" title="Close" class="modal-close">Close</a>
          {usstat === 'connected' ? (
            <div style={{ textAlign: "center" }}>
              <div class="usraccmod" style={{ color: "black" }}>Acc: {usacc} </div>
              <div style={{ color: "black", marginBottom: "10px" }}>Bal: {usbal} ETH</div>
              <button class="btn-outline-sm moddisc" onClick={() => { wallet.reset() }}>disconnect</button>
            </div>
          ) : (
            <div>
              <h1>Connect using : </h1>
              <div class="modflex">
                <button class="modbttn" onClick={() => wallet.connect()}>MetaMask</button>
                <button class="modbttn" onClick={() => wallet.connect('walletconnect')}>Walletconnect</button>
                <button class="modbttn" onClick={() => wallet.connect('bsc')}>Binance Chain Connect</button>
              </div>
            </div>

          )}

        </div>
      </div>

      <header id="header" class="header">
        <div class="header-content">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 col-xl-12" style={{ textAlign: "center" }}>
                <div class="text-container">
                  <h1>#TAGCIRCLE</h1>
                  <br />
                  <br />
                  <br />
                  <h3 style={{ color: "white" }}>OWN VIRTUAL REAL ESTATE</h3>
                  <p class="p-large">REGISTER #HASHTAG AND EARN DAILY REWARDS</p>
                  <br />
                  <br />
                  <a class="btn-solid-lg page-scroll" href="#">LEARN MORE</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <svg class="header-frame" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1920 310"><title>header-frame</title><path class="cls-1" d="M0,283.054c22.75,12.98,53.1,15.2,70.635,14.808,92.115-2.077,238.3-79.9,354.895-79.938,59.97-.019,106.17,18.059,141.58,34,47.778,21.511,47.778,21.511,90,38.938,28.418,11.731,85.344,26.169,152.992,17.971,68.127-8.255,115.933-34.963,166.492-67.393,37.467-24.032,148.6-112.008,171.753-127.963,27.951-19.26,87.771-81.155,180.71-89.341,72.016-6.343,105.479,12.388,157.434,35.467,69.73,30.976,168.93,92.28,256.514,89.405,100.992-3.315,140.276-41.7,177-64.9V0.24H0V283.054Z" /></svg>




      <div class="form">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="icon-container">
                <span class="fa-stack">
                  <a href="#your-link">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fab fa-facebook-f fa-stack-1x"></i>
                  </a>
                </span>
                <span class="fa-stack">
                  <a href="#your-link">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fab fa-twitter fa-stack-1x"></i>
                  </a>
                </span>
                <span class="fa-stack">
                  <a href="#your-link">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fab fa-pinterest-p fa-stack-1x"></i>
                  </a>
                </span>
                <span class="fa-stack">
                  <a href="#your-link">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fab fa-instagram fa-stack-1x"></i>
                  </a>
                </span>
                <span class="fa-stack">
                  <a href="#your-link">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fab fa-linkedin-in fa-stack-1x"></i>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="copyright" style={{ backgroundColor: "white" }}>
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <p class="p-small" style={{ borderTop: "0px", color: "black", fontSize: "10px" }}>Copyright ©2020 &ensp;&ensp;<a style={{ color: "black" }}>Designed by <a target="_blank" href="https://portfol10.com/" style={{ color: "black" }}>l__1_0</a></a></p>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

// Wrap everything in <UseWalletProvider />
export default () => (
  <UseWalletProvider
    chainId={1}
    connectors={{
      // This is how connectors get configured
      walletconnect: { rpcUrl: "https://mainnet.mycustomnode.com" },
      bsc: {
        web3ReactConnector() {
          return new BscConnector({ supportedChainIds: [56, 97] })
        },
        handleActivationError(err) {
          if (err instanceof UserRejectedRequestError) {
            return new ConnectionRejectedError()
          }
        },
      },
    }}
  >
    <App />
  </UseWalletProvider>
)
