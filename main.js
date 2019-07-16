const Transaction = require('./transaction.js');
const Block = require('./block.js');
const BlockChain = require('./blockchain.js');

let date = new Date;
let timestamp = date.getTime().toString();

let difficulty = 4;

let chain = new BlockChain(difficulty);

console.log("Mining A New Block...");
chain.add(new Block(timestamp, [{ from : "#1234", to : "#1", amount : "2"}]));
console.log("Mining A New Block...");
chain.add(new Block(timestamp, [{ from : "#145", to : "#2", amount : "1"}]));

console.log("\n");
console.log(JSON.stringify(chain, null, 4));
console.log("\n");
console.log("Valid? ", chain.isvalid().toString());