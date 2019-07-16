const SHA256 = require('crypto-js/sha256');

class Block
{
    constructor(timestamp, data, previoushash)
    {
        this.timestamp = timestamp;
        this.data = data;//Array Of Transactions
        this.previoushash = previoushash;
        this.hash = this.calculate();
        this.nonce = 0;
    }

    calculate()
    {
        return SHA256(this.previoushash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();

    }

    mine(difficulty)
    {
        let count = 0;
        //console.log(this.hash.substring(0, difficulty) + " - " + "0".repeat(difficulty));
        while(this.hash.substring(0, difficulty) !== "0".repeat(difficulty))
        {
            this.nonce++;
            this.hash = this.calculate();
            count++;
            //console.log(this.hash);
        }
 
        console.log("Block Hashed: " + this.hash);
        console.log("Iterations Took: " + count);
    }
} 

module.exports = Block;