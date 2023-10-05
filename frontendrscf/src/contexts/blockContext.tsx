import React,{useContext, useEffect, useState } from "react";
import Web3 from "web3";
import supply from '../abis/supplyChain.json'
import {Navigate} from "react-router-dom"

interface Props {
  children: JSX.Element
}
const blockContext  = React.createContext(null);


export function useBlock(){
    return useContext(blockContext);
}

export function BlockProvider({children}: Props){
    const [account , setAccount] = useState();
    const [supplyChain ,setsupplyChain] = useState(supply);
    const [isMetamask, setIsMetamask] = useState(false);
    const [web3,setWeb3] = useState();
 
    useEffect(() => {
         loadWeb3()
         if(window.ethereum){
       loadBlockChainData()
       window.ethereum.on('accountsChanged', function (accounts) {
       setAccount(accounts[0])
      })
      return window.ethereum.off
    }
    },[])

    // re-register MetaMask provider whenever network changes
    useEffect(() => {
      if(window.ethereum){
      window.ethereum.on("chainChanged", (network) => {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(provider)
        });
      }
    }, [provider]);

    async function loadWeb3() {
        if (window.ethereum) {
          setIsMetamask(true)
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          setIsMetamask(true)
        window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          Navigate.call("/instructions");
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
          
        }
      }

      async function loadBlockChainData(){

          const web3 = window.web3
          setWeb3(web3)
          const accounts = await web3.eth.getAccounts()
          setAccount(accounts[0])
          const networkId = await web3.eth.net.getId()
          console.log(networkId)
          const networkData = supply.networks[networkId]
          const chain = await new web3.eth.Contract(supply.abi,networkData.address,{ transactionConfirmationBlocks: 1,gasPrice :200000000000})
            setsupplyChain(chain)
            console.log(chain)
      }

      function addProduct(name:string){
        if(supplyChain == undefined){
          return;
        }
        return supplyChain.methods.addProduct(name).send({from : account})
      }

      function updateLocation(location ,id,address){
        return supplyChain.methods.changeLocation(location,id,address).send({from : account})
      } 

      function trackProduct(id){
        return supplyChain.methods.fetchInfo(id).call()
      }
      function productCount(){
        return supplyChain.methods.productCount().call()
      }

      function fetchOwner(id){
        return supplyChain.methods.fetchAddress(id).call()
      }

      function fetchLocations(id){
        return supplyChain.methods.fetchAllLocation(id).call()
      }
      const value = {
          addProduct,
          account,
          productCount,
          updateLocation,
          trackProduct,
          fetchOwner,
          fetchLocations
      }
      return(
          <blockContext.Provider value = {value}>
            {children}
          </blockContext.Provider>
      ) 
}
