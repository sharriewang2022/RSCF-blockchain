const SupplyChainRSCF = artifacts.require("./SupplyChainRSCF.sol");

module.exports = function (deployer) {
 deployer.deploy(SupplyChainRSCF);
};