## Morphosis

a simple ui to create crypro wallets

Using the [ether.js](https://github.com/ethers-io/ethers.js/) library to encrypt/decrypt the wallets.
Due to how the Key Derivation Functions are computed the above methods are CPU intensive for [security reasons](https://docs.ethers.org/v5/concepts/security/).
Delegating these tasks to a web worker fixed the issue, that the above functions are render blocking when running on the main thread.

> (Note: in Safari the encrypt/decrypt process is much more faster)

#### supported blockchains:

- Ethereum Sepolia testnet
- BNB testnet

#### References:

https://julien-maffre.medium.com/what-is-an-ethereum-keystore-file-86c8c5917b97
https://www.quicknode.com/guides/ethereum-development/wallets/how-to-generate-a-new-ethereum-address-in-javascript/
