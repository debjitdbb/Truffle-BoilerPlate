# Steps

1. `npm install`
2. fill public keys and mnemonic in secrets.json, taking help from secretsSample.json, add keys from polygonscan or etherscan as necessary

3. `truffle compile`

      For testing:
         truffle develop
            > migrate 


           -> Change deployment folder accroding to needs

4. `node deployment/deployContract.js`
        deployed contract address is saved in contracts.json


5. `node deployment/verifyContract.js`
        scan link is shown in the terminal