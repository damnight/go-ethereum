# To launch server
./geth --datadir ../../../data_dir --port "30303" --bootnodes "enode://cb1aa2d0aa1afbae08d582be88f11fbb0feb4b9c90aa5613e4de55b4a388514d120408ee2533739bee9034eae3cd5a5757a7e52733d1c0822226fc1ec0ac8f90@134.60.77.152:30303" --nodiscover  --networkid 4242 --nat "any"

# To run example script
./geth -exec 'loadScript("../../scripts/helloWorld.js")' attach ../../../data_dir/geth.ipc 2> /dev/null
