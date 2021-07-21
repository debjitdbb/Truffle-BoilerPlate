const Web3 = require('web3')
const util = require('util')
const fs = require('fs')
const exec = util.promisify(require('child_process').exec)

const network = "mumbai"
const contractName = "Contract"
const contracts = JSON.parse(fs.readFileSync('./deployment/contracts.json', 'utf8'))
const contractAddress = contracts[contractName]
if (!Web3.utils.isAddress(contractAddress)) {
    console.log(`${contractName} is not deployed or contract address is invalid`)
    process.exit()
}

const verify = async (contractName, contractAddress, network) => {
    console.log("Verifying ... \n")
    console.log('Contract:', contractName)
    console.log('Address:', contractAddress)
    console.log('Network:', network)
    console.log('\n')

    const { stdout, stderr } = await exec(`truffle run verify ${contractName}@${contractAddress} --network ${network}`)
    if (stderr != null) {
        console.log(stdout)
    } else {
        console.log('stderr:', stderr)
    }
}

verify(contractName, contractAddress, network)