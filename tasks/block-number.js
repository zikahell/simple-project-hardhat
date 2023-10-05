const { task } = require("hardhat/config")

task("block-number", "it return block number").setAction(
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log("Block number is ", blockNumber)
    },
)

module.exports = {}
