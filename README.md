# This Integration Example is based on the Lit Ceramic Integration Example 

Thanks Lit Protocol for this great Integration Example!

https://github.com/LIT-Protocol/CeramicIntegrationExample

# Web3.Storage + Lit Integration Example

## Welcome!

Welcome to the [Web3.Storage Lit Integration](https://github.com/Ghostshare/web3.storage-lit-sdk) Example. This is a playground for the [web3.storage-lit-sdk](https://www.npmjs.com/package/web3.storage-lit-sdk) module, to show anyone who's interested what it looks like in practice! It uses this module to store (with Web3.Storage) and to encrypt (with Lit) any file the user wants to store. It will be accessible only to those who control the wallet of the user that made it. It appears on the Web3.Storage network as encrypted data.

## Quick and Dirty Instructions for running in dev

Make sure to run `yarn` to install everything at first.

Run `yarn start` to start the server.

## Technologies

- [Lit Protocol Encryption](https://developer.litprotocol.com/docs/intro/): an open source, decentralized utility that uses encryption to provide blockchain users access to digital and real world experiences. The network acts as a decentralized access control list (ACL) which leverages on-chain data to grant users access to content, software, and other decentralized networks.
- [Web3.Storag Js Client Library](https://web3.storage/docs/reference/js-client-library/): Provides access to the Web3.Storage Network (IPFS).

## Usage

The app is configured to only let any users with at least 0.00000 ETH decrypt the content. This access control condition can be changed to anything you want. You can find some examples here: https://developer.litprotocol.com/docs/SDK/accessControlConditionExamples

1. Open the [Playground page, often localhost:1234 when running parcel](http://localhost:1234)
2. Open your browser's console by inspecting the page
3. Click 'Encrypt w/ Lit + Web3.Storage upload' button to begin process!
4. Authenticate by clicking "Connect wallet"
5. Approve prompts in your Web3 wallet for Lit
6. Write and read Lit-Encrypted documents on the Web3.Storage Network from the console using the referenced API methods

## License

MIT
