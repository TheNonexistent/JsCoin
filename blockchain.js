const Transaction = require('./transaction.js');
const Block = require('./block.js');

class BlockChain
{
    constructor(difficulty, reward, initialcoins)
    {
        this.chain  = [];
        this.unminedtransactions = [];

        this.difficulty = difficulty;
        this.reward = reward;

        this.registered = ["#1", "#2", "#4", "#123"];//Initially Registered Wallets. Will Be Airdropped.

        this.creategenesis();
        this.airdrop(initialcoins);
    }

    airdrop(coins)
    {
        for (const wallet of this.registered)
        {
            this.unminedtransactions.push(new Transaction(Date.now(), "mint", wallet, coins));
        }
    }

    creategenesis()
    {
        let genesistransaction = new Transaction(Date.now(), "mint", "genesis", 0);
        let genesisblock =  new Block(Date.now(), [genesistransaction], "0");
        this.chain.push(genesisblock);
    }

    getlatest()
    {
        return this.chain[this.chain.length - 1];
    }

    minecurrent(miner)
    {
        console.log("Mining A Block...");
        let block = new Block(Date.now(), this.unminedtransactions, this.getlatest().hash);
        block.mine(this.difficulty);

        console.log("Current Block Mined.");

        this.chain.push(block);
        
        this.unminedtransactions = [
            new Transaction(Date.now(), "mint", miner, this.reward)
        ];

    }

    isvalid()
    {
        for(var i = 1; i < this.chain.length; i++)
        {
            const current = this.chain[i];
            const previous = this.chain[i - 1]

            if (current.hash !== current.calculate())
            {
                return false;
            }
            if (current.previoushash !== previous.hash)
            {
                return false;
            }
        }
        return true;
    }

    make(transaction)
    {
        this.unminedtransactions.push(transaction);
    }

    getbalance(wallet)
    {
        let balance = 0;

        for(const block of this.chain)
        {
            for(const transaction of block.data)
            {
                if (transaction.from === wallet)
                {
                    balance -= transaction.amout;
                }

                if (transaction.to === wallet)
                {
                    balance += transaction.amout;
                }
            }
        }
        return balance;
    }
}

module.exports = BlockChain;