const Block = require('./block.js');

class BlockChain
{
    constructor(difficulty)
    {
        this.chain  = [this.creategenesis()];
        this.difficulty = difficulty;
    }

    creategenesis()
    {
        var date = new Date();
        var timestamp  = date.getTime().toString();
        return new Block(0, "15/01/2018", "Genesis Block", "0");
    }

    getlatest()
    {
        return this.chain[this.chain.length - 1];
    }

    add(block)
    {
        block.previoushash = this.getlatest().hash;
        block.mine(this.difficulty);
        this.chain.push(block);
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
}

module.exports = BlockChain;