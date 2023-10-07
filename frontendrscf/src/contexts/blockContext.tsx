import React, {ReactNode, createContext, useContext, useEffect, useState } from 'react';
import Web3 from "web3";
import {Navigate} from "react-router-dom"
import { ethers } from 'ethers';
import supply from '../abis/supplyChain.json'
import web3Load from "../trace/metamask/web3Load"

interface Props {
  children: JSX.Element
}

interface BlockContextData {
  addProduct: (name:string) => any;
  account: any;
  productCount:() => any;
  updateLocation:(location: string, id: string, address: string) => {};
  trackProduct:(id:string) => any;
  fetchOwner:(id:string) => any;
  fetchLocations:(id:string) => any;
}

export const blockContext = createContext({} as BlockContextData)

export function useBlock(){
  return useContext(blockContext)
}

export function BlockProvider({children}: Props){
    const [account , setAccount] = useState();
    const [supplyChainABI ,setSupplyChainABI] = useState<any>();
    const [isMetamask, setIsMetamask] = useState(false);
    const [web3,setWeb3] = useState();
 
    useEffect(() => {
      web3Load()
      if(window.ethereum){
          loadBlockChainData()
          window.ethereum.on('accountsChanged', function (accounts:any) {
          setAccount(accounts[0])
      })
      return window.ethereum.off
    }
    },[])

    // re-register MetaMask provider whenever network changes
    useEffect(() => {
      if(window.ethereum){
        window.ethereum.on("chainChanged", () => {
          const provider = new ethers.BrowserProvider(window.ethereum);
          window.web3.setProvider(provider)
        });
        window.ethereum.on('chainChanged', function (accounts:any) {
          window.location.reload(); //or your own code
      });  
      }
    }, []);

    // async function loadWeb3() {
    //     if (window.ethereum) {
    //       setIsMetamask(true)
    //       window.web3 = new Web3(window.ethereum)
    //       await window.ethereum.enable()
    //     }
    //     else if (window.web3) {
    //       setIsMetamask(true)
    //     window.web3 = new Web3(window.web3.currentProvider)
    //     }
    //     else {
    //       Navigate.call("/instructions");
    //       window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
          
    //     }
    //   }

      async function loadBlockChainData(){
          const web3 = window.web3
          setWeb3(web3)
          const accounts = await web3.eth.getAccounts()
          setAccount(accounts[0])
          const networkId = await web3.eth.net.getId()
          console.log(networkId)
          const supplyAbi = new web3.eth.Contract(supply)
          const networkData = supplyAbi.networks[networkId]
          const chainABI =   new web3.eth.Contract(supply.abi,networkData.address,{ transactionConfirmationBlocks: 1,gasPrice :200000000000})
          setSupplyChainABI(chainABI)
          console.log(chainABI)         
      }

      function addProduct(name:string){
        if(supplyChainABI == undefined){
          return;
        }
        return supplyChainABI.methods.addProduct(name).send({from : account})
      }

      function updateLocation(location: string, id: string, address: string){
        return supplyChainABI.methods.changeLocation(location,id,address).send({from : account})
      } 

      function trackProduct(id:string){
        return supplyChainABI.fetchInfo(id).call()
      }
      function productCount(){
        return supplyChainABI.methods.productCount().call()
      }

      function fetchOwner(id:string){
        return supplyChainABI.methods.fetchAddress(id).call()
      }

      function fetchLocations(id:string){
        return supplyChainABI.methods.fetchAllLocation(id).call()
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
