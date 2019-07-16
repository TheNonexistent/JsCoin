const Transaction = require('./transaction.js');
const BlockChain = require('./blockchain.js');

let difficulty = 4;
let reward = 40;
let initalcoin = 5;

let chain = new BlockChain(difficulty, reward, initalcoin);

chain.minecurrent("#123");

console.log("Making A New Transaction...");
chain.make(new Transaction(Date.now(), "#1" , "#123", 20));
console.log("Making A New Transaction...");
chain.make(new Transaction(Date.now(), "#123" , "#1", 15));

chain.minecurrent("#1");

chain.minecurrent("#4");

console.log("\n");
console.log(JSON.stringify(chain.chain, null, 4));
console.log("\n");
console.log("Valid? ", chain.isvalid().toString());

console.log("#1 Balance:" + chain.getbalance("#1"));
console.log("#123 Balance:" + chain.getbalance("#123"));
console.log("#4 Balance:" + chain.getbalance("#4"));
