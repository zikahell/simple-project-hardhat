const { assert } = require("chai")
const { ethers } = require("hardhat")

describe("SimpleStorage", () => {
    let simpleStorage
    beforeEach(async () => {
        simpleStorage = await ethers.deployContract("SimpleStorage")
    })
    it("Should return 0 when number is 0", async () => {
        const currentfvn = await simpleStorage.retrieve()
        const expected = "0"
        assert.equal(currentfvn, expected)
    })
    it("Should return 7 when number is 7", async () => {
        const expected = "7"
        const transaction = await simpleStorage.store(expected)
        await transaction.wait(1)
        const currentfvn = await simpleStorage.retrieve()

        assert.equal(currentfvn, expected)
    })
    it("Should store 1 person", async () => {
        let name = "ahmed"
        let fvn = 7
        const transacted = await simpleStorage.addPerson(name, fvn)
        const current = await simpleStorage.nameToFavoriteNumber(name)
        assert.equal(current, fvn)
    })
})
