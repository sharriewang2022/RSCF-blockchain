import React, { createContext, useContext, useEffect, useState } from 'react';
import Web3, {Contract} from "web3";
// import { ethers } from 'ethers';
// import SupplyChainRSCF from '../abis/SupplyChainRSCF.json'
import web3Load from "../trace/metamask/web3Load"
import { Web3Provider } from '@ethersproject/providers';
import { SMART_CONTRACT_ADDRESS } from '../config/sysConfig';
import { supplyChainAbiType } from '../util/smartContractTypeforJson';
import supplyChainjson from '../abis/SupplyChainRSCF.json';
import * as fs from "fs";
import path from 'path';


interface BlockProviderProps {
  children: JSX.Element | JSX.Element[]
}

interface BlockContextData {
  addProduct: (productId:string, name:string, manufacturer:string, supplier:string) => any;
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

export function BlockProvider({children}:BlockProviderProps){
  // 1. fs, path could not run on client sideconst supplyChainAbi = JSON.parse(fs.readFileSync('../abis/SupplyChainRSCF.json', 
  // {encoding: "utf-8",})).abi as unknown as supplyChainAbiType;
  // //json file is in /public/src/abis/SupplyChainRSCF.json
  // const filePath = path.resolve('./public', 'src', 'abis', 'SupplyChainRSCF.json');
  // const supplyChainjson = fs.readFileSync(filePath);
  // const supplyChainAbi = JSON.parse(supplyChainjson?.toString()).abi as unknown as supplyChainAbiType;
  const supplyChainAbi =  supplyChainjson.abi as unknown as supplyChainAbiType;
  const [account , setAccount] = useState("");
  const [supplyChainABI ,setSupplyChainABI] = useState<Contract<supplyChainAbiType>>(new Contract<supplyChainAbiType>(supplyChainAbi));
  // const [smartContract ,setSmartContract] = useState<any>();
  const [isMetamask, setIsMetamask] = useState(false);
  const [web3,setWeb3] = useState<any>();

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
  
  // register MetaMask provider when network changes
  useEffect(() => {
    loadWeb3()
    if(window.ethereum){
      window.ethereum.on("accountsChanged", (accounts: any) => {
        const provider = new Web3Provider(window.ethereum);
        // const provider = new ethers.providers.get(window.ethereum);
        // window.web3.setProvider(provider)
        console.log(accounts[0]);
      });
      window.ethereum.on('chainChanged', () => {
        // handle what happens when chain changes, prefereably reload the page
        const provider = new Web3Provider(window.ethereum);
        // error:window.web3.setProvider is not a function
        // window.web3.setProvider(provider)
        window.location.reload(); 
      });
    
      window.ethereum.request({ method: "eth_requestAccounts" })
      .then( (accounts: any) => 
        {
          console.log(accounts[0]);
        }
      )
    }
  }, []);

    async function loadWeb3() {
        if (window.ethereum) {
          setIsMetamask(true)
          window.web3 = new Web3(window.ethereum)
          // await window.ethereum.enable()
        }
        else if (window.web3) {
          setIsMetamask(true)
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {          
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');          
        }
      }

      //react connect blockchain smart contract
      //1.Load web3 after has a wallet; 
      //2.(Optional) put web3 object and the accounts from web3.eth.getAccounts() to setState
      //3.Create contract instance with the address from deployment.  can deploy the contract dynamically from the app but more complicated.
      //4.Add the contract to the state
      //Call methods on the contract
      async function loadBlockChainData(){
        window.ethereum.enable();  
        // const web3 = new Web3(window.web3.currentProvider);
        // const web3 = new Web3(window.ethereum);
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
        const accounts = await web3.eth.getAccounts()
        setWeb3(web3)
        // Get the accounts from MetaMask      
        // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        web3.eth.defaultAccount = accounts[0];
        console.log("accounts[0]" + accounts[0]);
        // Get the network ID
        const currentNetworkId = parseInt(await window.ethereum.request({ method: 'net_version' }));
        console.log("currentNetworkId" + currentNetworkId);
        // Get the network data from the contract JSON
        const networkId = await web3.eth.net.getId();
        const chainId = await web3.eth.getChainId();

        const contractAddress = SMART_CONTRACT_ADDRESS;
        // const contractAddress = supplyJson.networks["5777"].address;
        // const contractAddress = supplyJson.networks[networkId].address; //supplyJson.networks[42]        

        //get smart contract in supplyChain.json. parameters: (contractABI, contractAddress）       
        // productContractAbi.options.gas = 500000       
        // const productContractAbi = new web3.eth.Contract(nonceAbi, contractAddress); --can work
        const productContractAbi = new web3.eth.Contract(supplyChainAbi, contractAddress);
        setSupplyChainABI(productContractAbi)
   
        console.log(productContractAbi)           
      }

      // async function loadBlockChainData(){
      //   const web3 = window.web3
      //   setWeb3(web3)
      //   const accounts = await web3.eth.getAccounts()
      //   setAccount(accounts[0])
      //   const networkId = await web3.eth.net.getId()
      //   console.log(networkId)
      //   const supplyAbi = new web3.eth.Contract(supply)
      //   const networkData = supplyAbi.networks[networkId]
      //   const chainABI =   new web3.eth.Contract(supply.abi,networkData.address,{ transactionConfirmationBlocks: 1,gasPrice :200000000000})
      //   setSupplyChainABI(chainABI)
      //   console.log(chainABI)    
      
      // if (currentNetworkId !== chainId) {
      //   try {
      //     await window.ethereum.request({
      //       method: 'wallet_switchEthereumChain',
      //       params: [{ chainId: `0x${addresses.chainId.toString(16)}` }],
      //     });
      //   } catch (error:any) {
      //     console.error('Error switching network:', error);
      //     if (error.code === 4902) {
      //       console.error(`Please add the mumbai network to your MetaMask wallet`, {
      //         type: 'error',
      //       });
      //     } else {
      //       console.error('User rejected the request.');
      //     }
      //   }
      // }
      // this.contract = this.contract.connect(this.signer);  
      // }

      function addProduct(productId:string, name:string, manufacturer:string, supplier:string){
        if(supplyChainABI == undefined){
          return;
        }
        console.info("contract addProduct result: ", supplyChainABI);     
        // call smart contract method.
        // (contract.methods.transfer as any)('0xe4beef667408b99053dc147ed19592ada0d77f59', 12)  
        return supplyChainABI.methods.addProduct(name).send({from : account})
        // return supplyChainABI.methods.addProduct(productId, name, manufacturer, supplier).send({from : account})
          .on('transactionHash', function(hash:any){
            console.log("supplyChainABI addProduct transactionHash:" + hash)
          })
          .on('receipt', function(receipt:any){
            console.log("supplyChainABI addProduct receipt:" + receipt)
          })
          .on('error', function(error:any){
            console.log("supplyChainABI addProduct error:" + error)
          })
      }

      function updateLocation(location: string, id: string, address: string){
        return supplyChainABI.methods.changeLocation(location,id,address).send({from : account})
      } 

      function trackProduct(id:string){
        return supplyChainABI.methods.fetchInfo(id).call()
          .then(function(balance){
            console.log("supplyChainABI fetchInfo:" + balance)
          }).catch(function(error){
            console.log("supplyChainABI fetchInfo error:" + error)
          })
        

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
