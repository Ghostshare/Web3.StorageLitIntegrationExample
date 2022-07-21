import { DID } from 'dids'
import { Integration } from 'web3.storage-lit-sdk'

declare global {
  interface Window {
    did?: DID
  }
}

let web3StorageLitIntegration = new Integration('polygon')

let cid = '' // test data

const updateAlert = (status: string, message: string) => {
  const alert = document.getElementById('alerts')
  if (alert !== null) {
    alert.textContent = message
    alert.classList.add(`alert-${status}`)
    alert.classList.remove('hide')
    setTimeout(() => {
      alert.classList.add('hide')
    }, 5000)
  }
}
const updateCID = (resp: string | String) => {
  cid = resp as string
  console.log('you now have this as your CID', cid)
  // @ts-ignore
  document.getElementById('cid').innerHTML = 
  '<p>Metadata IPFS link: <a href="https://'+resp+'.ipfs.dweb.link" target="_blank">'+resp+'</a></p>'
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContent.........')
  web3StorageLitIntegration.startLitClient(window)
})

// Read from web3.Storage and decrypt with Lit 

document.getElementById('retrieveFromWeb3Storage')?.addEventListener('click', async () => {
  if (document.getElementById('cid') === null) {
    updateAlert('danger', `Error, please store the file in IPFS in order to retrieve it`)
  } else {
    // @ts-ignore
    console.log('this is the CID you\'re retrieving: ', cid)
    const decryptedFile: File = await web3StorageLitIntegration.retrieveAndDecryptFile(cid)
    document.getElementById('decryption').innerHTML = '<p>Retrieved file Name: ' + decryptedFile.name + ' - Type: ' + decryptedFile.type + ' - Size: ' + decryptedFile.size + ' bytes<p>'
    saveData(decryptedFile, decryptedFile.name)
  }
})

var saveData = (function () {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  return function (data, fileName) {
      var blob = new Blob([data], {type: "octet/stream"}),
          url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
  };
}());


// encrypt with Lit and write to web3 storage
document.getElementById('encryptLit')?.addEventListener('click', async function () {
  console.log('chain in web3StorageLitIntegration: ', web3StorageLitIntegration.chain)
  // @ts-ignore
  const fileToEncrypt: HTMLInputElement = document.getElementById('uploadInput')
  if (fileToEncrypt.files.length == 0) {
    updateAlert('danger', `Error, please select a file to share`)
    return
  }
  const file: File = fileToEncrypt.files[0] 
  console.log(file)
  const response = await web3StorageLitIntegration.uploadFile(file)
  updateCID(response)
  console.log("Response: ", response)

  // const evmContractConditions = [
  //   {
  //     contractAddress: '0xb71a679cfff330591d556c4b9f21c7739ca9590c',
  //     functionName: 'members',
  //     functionParams: [':userAddress'],
  //     functionAbi: {
  //       constant: true,
  //       inputs: [
  //         {
  //           name: '',
  //           type: 'address',
  //         },
  //       ],
  //       name: 'members',
  //       outputs: [
  //         {
  //           name: 'delegateKey',
  //           type: 'address',
  //         },
  //         {
  //           name: 'shares',
  //           type: 'uint256',
  //         },
  //         {
  //           name: 'loot',
  //           type: 'uint256',
  //         },
  //         {
  //           name: 'exists',
  //           type: 'bool',
  //         },
  //         {
  //           name: 'highestIndexYesVote',
  //           type: 'uint256',
  //         },
  //         {
  //           name: 'jailed',
  //           type: 'uint256',
  //         },
  //       ],
  //       payable: false,
  //       stateMutability: 'view',
  //       type: 'function',
  //     },
  //     chain: 'xdai',
  //     returnValueTest: {
  //       key: 'shares',
  //       comparator: '>=',
  //       value: '1',
  //     },
  //   },
  // ]

  // const response = litCeramicIntegration
  //   .encryptAndWrite(stringToEncrypt, evmContractConditions, 'evmContractConditions')
  //   .then((value) => updateStreamID(value))
  // console.log(response)
})
