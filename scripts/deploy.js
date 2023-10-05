const { ethers, run, network } = require("hardhat")
require("dotenv").config()

async function main() {
    const simpleStorage = await ethers.deployContract("SimpleStorage")
    console.log(`Deployed to  address: ${simpleStorage.target}`)
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        console.log("Wait for blocks .....")
        await simpleStorage.deploymentTransaction().wait(6)
        await verify(simpleStorage.target, [])
    }

    const currentfvn = await simpleStorage.retrieve()
    console.log(`current is ${currentfvn}`)
    const transaction = await simpleStorage.store(8)
    await transaction.wait(1)
    const updated = await simpleStorage.retrieve()
    console.log(`updated is ${updated}`)
}

async function verify(contractAddress, args) {
    console.log("Verifying ........")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
