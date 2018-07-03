///////////////////////////////////////////////////////////////////////////////
// HYPER PARAMETERS                                                          //
///////////////////////////////////////////////////////////////////////////////
DEBUG = true
N = 5


///////////////////////////////////////////////////////////////////////////////
// Script                                                                    //
///////////////////////////////////////////////////////////////////////////////
admin.addPeer("enode://cb1aa2d0aa1afbae08d582be88f11fbb0feb4b9c90aa5613e4de55b4a388514d120408ee2533739bee9034eae3cd5a5757a7e52733d1c0822226fc1ec0ac8f90@134.60.77.152:30303");
console.log('[INFO]\t', 'peer added');

miner.setEtherbase("0x638354c050c08730562118dea9c62edc89d2a1e9");
console.log('[INFO]\t', 'etherbase set');

head = eth.getBlock("latest");
console.log('[INFO]\t', 'head retrived\t\t', 'block number:', head.number);

hashes = eth.getBlocksFromHash(head.hash, N);
console.log('[INFO]\t', 'blocks received\t', 'array length:', hashes.length);

if(DEBUG){
    console.log('[DEBUG]\t', 'fetched block details:');
}
var chain = [];
for (var i = 0; i < N; i++) {
    block = eth.getBlock(hashes[i]);
    chain.unshift(block);
    if(DEBUG){
        console.log(JSON.stringify(block, null, "    "))    
    }
    
}

eth.rollback(hashes)
console.log('[INFO]\t', 'chain rewound');

miner.justStart(1);
console.log('[INFO]\t', 'miner started');

if(DEBUG){
    console.log('[DEBUG]\t', 'mined block details:');
}

parentHash = chain[0].parentHash
for (var i = 0; i < N; i++) {
    result = miner.commitSpoofedWork(parentHash, chain[i].timestamp);
    if(DEBUG){
        block = eth.getBlock(result);
        console.log('block', i, ':');
        console.log(JSON.stringify(block, null, "    "));
    }
    else {
        console.log('[INFO]\t', 'spoof mined\t\t', 'block', i, 'hash:', result);
    }

    parentHash = result
}
