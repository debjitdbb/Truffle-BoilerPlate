# Steps

npm install
fill public keys and mnemonic in secrets.json, taking help from secretsSample.json, add keys from polygonscan or etherscan as necessary

truffle compile

For testing:
    truffle develop
    > migrate 


-> Change deployment folder accroding to needs

node deployment/deployContract.js
deployed contract address is saved in contracts.json

node deployment/verifyContract.js
scan link is shown in the terminal
