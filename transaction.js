class Transaction
{
    constructor(timestamp, from, to, amout)
    {
        this.timestamp = timestamp;
        this.from = from;
        this.to = to;
        this.amout = amout;
    }
}

module.exports = Transaction;