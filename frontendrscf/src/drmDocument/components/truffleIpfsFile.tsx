// import React, {Component} from 'react'
// import SimpleStorageContract from '../src/SimpleStorage.json'
// import getWeb3 from './utils/getWeb3'
// import './css/oswald.css'
// import './css/open-sans.css'
// import './css/pure-min.css'
// import './App.css'
// const ipfsAPI = require('ipfs-http-client');
// const ipfs = ipfsAPI.create({host: 'localhost', port: '5001', protocol: 'http'});
// const contract = require('truffle-contract')
// const simpleStorage = contract(SimpleStorageContract)
// let account;
// // Declaring this for later so we can chain functions on SimpleStorage.
// let contractInstance;
// let saveImageOnIpfs = (reader:FileReader) => {
//   return new Promise(function(resolve, reject) {
//     const buffer = Buffer.from(reader.result);
//     ipfs.add(buffer).then((response) => {
//       console.log(response)
//       resolve(response[0].hash);
//     }).catch((err) => {
//       console.error(err)
//       reject(err);
//     })
//   })
// }

//another example

// let saveImageOnIpfs= (reader) => {
//     return new Promise(async(resolve, reject) => {
//         try {
//           const buffer = Buffer.from(reader.result);
//             let results = await ipfs.add(buffer);
//             let hash1 = results.path;
//             resolve(hash1);
//         } catch (err) {
//             console.error(err);
//             reject(err);
//         }
//     })
//   }


// class TruffleIPFSFile extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       blockChainHash: null,
//       web3: null,
//       address: null,
//       imgHash: null,
//       isWriteSuccess: false
//     }
//   }
//   componentWillMount() {
//     ipfs.swarm.peers(function(err, res) {
//       if (err) {
//         console.error(err);
//       } else {
//         // var numPeers = res.Peers === null ? 0 : res.Peers.length;
//         // console.log("IPFS - connected to " + numPeers + " peers");
//         console.log(res);
//       }
//     });
//     getWeb3.then(results => {
//       this.setState({web3: results.web3})
//       // Instantiate contract once web3 provided.
//       this.instantiateContract()
//     }).catch(() => {
//       console.log('Error finding web3.')
//     })
//   }
//   instantiateContract = () => {
//     simpleStorage.setProvider(this.state.web3.currentProvider);
//     this.state.web3.eth.getAccounts((error, accounts) => {
//       account = accounts[0];
//       simpleStorage.at('0xe7D98C99d71438A072B020138dD75347792FA214').then((contract) => {
//         console.log(contract.address);
//         contractInstance = contract;
//         this.setState({address: contractInstance.address});
//         return;
//       });
//     })
//   }
//   render() {
//     return (<div className="App">
//       {
//         this.state.address
//           ? <h1>CONNECT THE CONTRACT ADDRESS：{this.state.address}</h1>
//           : <div/>
//       }
//       <h2>UPLOAD TO IPFS：</h2>
//       <div>
//         <label id="file">CLICK TO UPLOAD THE FILE</label>
//         <input type="file" ref="file" id="file" name="file" multiple="multiple"/>
//       </div>
//       <div>
//         <button onClick={() => {
//             var file = this.refs.file.files[0];
//             var reader = new FileReader();
//             // reader.readAsDataURL(file);
//             reader.readAsArrayBuffer(file)
//             reader.onloadend = function(e) {
//               console.log(reader);
//               saveImageOnIpfs(reader).then((hash) => {
//                 console.log(hash);
//                 this.setState({imgHash: hash})
//               });
//             }.bind(this);
//           }}>UPLOAD TO IPFS AND RETURN THE HASH</button>
//       </div>
//       {
//         this.state.imgHash
//           ? <div>
//               <h2>imgHash：{this.state.imgHash}</h2>
//               <button onClick={() => {
//                   contractInstance.set(this.state.imgHash, {from: account}).then(() => {
//                     console.log('HASH HAS BEEN WRITE ON BLOCKCHAIN');
//                     this.setState({isWriteSuccess: true});
//                   })
//                 }}>PUT HASH ON BLOCKCHAIN：contractInstance.set(imgHash)</button>
//             </div>
//           : <div/>
//       }
//       {
//         this.state.isWriteSuccess
//           ? <div>
//               <h1>HASH IS ON THE BLOCK CHAIN</h1>
//               <button onClick={() => {
//                   contractInstance.get({from: account}).then((data) => {
//                     console.log(data);
//                     this.setState({blockChainHash: data});
//                   })
//                 }}>READ HASH ON BLOCKCHAIN：contractInstance.get()</button>
//             </div>
//           : <div/>
//       }
//       {
//         this.state.blockChainHash
//           ? <div>
//               <h3>READ THE HASH ON BLOCKCHAIN：{this.state.blockChainHash}</h3>
//             </div>
//           : <div/>
//       }
//       {
//         this.state.blockChainHash
//           ? <div>
//               <h2>BROWSER ACCESS：{"http://localhost:8080/ipfs/" + this.state.imgHash}</h2>
//               <img alt="" style={{
//                   width: 1600
//                 }} src={"http://localhost:8080/ipfs/" + this.state.imgHash}/>
//             </div>
//           : <img alt=""/>
//       }
//     </div>);
//   }
// }
// export default TruffleIPFSFile