const { assert } = require('chai');
const SupplyChainRSCF = artifacts.require("./SupplyChainRSCF.sol");

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('SupplyChainRSCF', ([buyer, seller, logistics,importer]) => {
    let supplyChainRSCF
  
    before(async () => {
        supplyChainRSCF = await SupplyChainRSCF.deployed()
    })

    describe('deployment' , async() => {
        it('should deploy' , async() => {

            let address = supplyChainRSCF.address
            assert.notEqual(address, '')
            assert.notEqual(address, 0x0)
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
    })

    describe('product' , async() => {

        it('should add product' , async() => {
            const result = await supplyChainRSCF.addProduct("product_1" , {from : seller})
            const productCount = await supplyChainRSCF.productCount()
        
           assert.equal(productCount , 1)
           const event = result.logs[0].args
           assert.equal( event.name, "product_1")
           assert.equal( event.owner , seller)
           assert.equal(event.id.toNumber(),productCount.toNumber())
           assert.equal(event.currentLocation,0x0)
        })

        it('should add new location' , async() => {
            let address = supplyChainRSCF.address
            console.log("changeLocoation: address " + address)
            // changeLocoation: address 0x009278Cfea93587403af5613D0191513256F9244
            // const result1 = await supplyChainRSCF.changeLocation( 'new fright hub' , 1 , { from: importer})
            //const result1 = await supplyChainRSCF.changeLocation('0x047d88ca83bd2ba8166ec20bf31a027d2d5e544d', 1 , address)
            const result1 = await supplyChainRSCF.changeLocation( 'new fright hub' , 0 , address)
            const event1 = result1.logs[0].args
            assert.equal(event1.id.toNumber(),1)
            assert.equal(event1.currentLocation, 'new fright hub')
        })

        it("should return info" , async() => {
            // const result3 = await supplyChainRSCF.fetchInfo( 1 ,{from:buyer})
            const result3 = await supplyChainRSCF.fetchInfo( 1 )
            const event3  = result3.logs[0].args
            console.log(result3)
        })
    })
})