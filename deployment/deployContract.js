const Web3 = require('web3')
const fs = require('fs')

const network = "mumbai"
const contractName = "Contract"
const constructorArgs = []
const contractsPath = './deployment/contracts.json'

const contracts = JSON.parse(fs.readFileSync(contractsPath, 'utf8'))
const secrets = JSON.parse(fs.readFileSync(`./secrets.json`, 'utf8'))
const account = secrets.account
const privateKey = secrets.privateKey
const infuraKey = secrets.infuraKey
const rpcURLs = {
    'rinkeby': `https://rinkeby.infura.io/v3/${infuraKey}`,
    'polygon': 'https://rpc-mainnet.maticvigil.com/',
    'mumbai': 'https://rpc-mumbai.maticvigil.com/'
}
 
const deploy = async (_contractName, _constructorArgs, _network) => {

    console.log(`\nDeploying ${_contractName} ...`)

    // web3 instance
    const web3 = new Web3(rpcURLs[_network])

    const contract = JSON.parse(fs.readFileSync(`./build/contracts/${_contractName}.json`, 'utf8'))
    const abi = contract.abi
    const bytecode = contract.bytecode
    
    // Contract Instance
    const deploy_contract = new web3.eth.Contract(abi)

    // Create Trnsaction
    const deployTx = deploy_contract.deploy({
        data: bytecode,
        arguments: _constructorArgs
    })

    // Sign Transaction
    const signedTx = await web3.eth.accounts.signTransaction({
        from: account,
        data: deployTx.encodeABI(),
        gas: web3.utils.toHex(8000000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }, privateKey)
    
    // Send Signed Transaction
    const txReceipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
    )
    const _contractAddress = txReceipt.contractAddress
    const _txStatus = txReceipt.status
    
    if(_txStatus) {
        console.log('Contract Deployed at Address:', _contractAddress)
        
        contracts[contractName] = _contractAddress
        fs.writeFileSync(contractsPath, JSON.stringify(contracts, null, 2))
    }
}

deploy(contractName, constructorArgs, network)