import { tzip16 } from '@taquito/tzip16';
import { Tezos } from './tezos';

const importKey = require('@taquito/signer').importKey;

const Oracle = process.env.VUE_APP_TEZOS_ORACLE;
const SEASON_0_NFT = process.env.VUE_APP_TEZOS_NFT_SEASON_0;
const DEPLOYED = [0];

async function getOracle() {
  try {
    let contractInstance = await Tezos.wallet.at(Oracle);
    // console.log('Oracle =>', contractInstance);
    return contractInstance;
  } catch (e) {
    console.log('Error mounting wallet at Oracle', e);
    return false;
  }
}

const toJSON = (x) => JSON.parse(JSON.stringify(x));

async function getTruths(address) {
  if (!address) {
    return false;
  } else if (typeof address !== 'string') {
    return false;
  }

  let truths = [], selectedContract, nftLen, addressBalance, tokenIndexes = [];
  // use alice key
  await importKey(Tezos, 'edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq');
  for (let i = 0; i < DEPLOYED.length; i++) {
    try {
      switch (DEPLOYED[i]) {
        case 0: {
          selectedContract = SEASON_0_NFT;
          nftLen = 6;
          let requestList = [];
          for (let n = 0; n < nftLen; n++) {
            let a = {
              owner: address,
              token_id: String(n)
            };
            requestList.push(a);
          }
          let nftInstance = await Tezos.contract.at(selectedContract, tzip16);
          addressBalance = await nftInstance.views.balance_of(requestList).read();
          addressBalance = toJSON(addressBalance);
          // console.log('addressBalance =>', addressBalance);
          break;
        }
      }

      if (!addressBalance) {
        return [];
      }

      for (let a = 0; a < addressBalance.length; a++) {
        let balance = (addressBalance[a]['balance']) ? addressBalance[a]['balance'] : 0;
        if (balance) {
          if (!isNaN(balance)) {
            balance = Number(balance);
            if (balance > 0) {
              tokenIndexes.push(a);
            }
          }

        }
      }

      let contractInstance = await Tezos.wallet.at(selectedContract);
      let storage = await contractInstance.storage();
      // console.log('NFT =>', [contractInstance, storage]);
      // console.log('Player =>', address);

      let assets = {}, m = {};
      for (let j = 0; j < tokenIndexes.length; j++) {
        try {
          let cIndex = tokenIndexes[j];
          // console.log('[cIndex, tokenIndexes]', [cIndex, tokenIndexes]);
          let asset = await storage.assets.ledger.get({
            0: address,
            1: String(cIndex)
          });
          if (isNaN(Number(asset))) {
            continue;
          }
          let metadata = await storage.assets.token_metadata.get(String(cIndex));
          let entries = metadata.extras.entries();
          for (let entry of entries) {
            if (entry[0] == 'attributes') {
              let attributes = Buffer.from(entry[1], "hex").toString();
              m[entry[0]] = JSON.parse(attributes);
            } else {
              m[entry[0]] = Buffer.from(entry[1], "hex").toString();
            }
          }
          switch (cIndex) {
            case 0: {
              assets = {
                id: String(cIndex), 
                value: Number(asset),
                realm: "tutorial",
                type: "ascended"
              };
              break;
            }
            case 1: {
              assets = {
                id: String(cIndex), 
                value: Number(asset),
                realm: "tutorial",
                type: "forgotten"
              };
              break;
            }
            case 2: {
              assets = {
                id: String(cIndex), 
                value: Number(asset),
                realm: "tutorial",
                type: "rare"
              };
              break;
            }
            case 3: {
              assets = {
                id: String(cIndex), 
                value: Number(asset),
                realm: "tutorial",
                type: "prosaic"
              };
              break;
            }
            case 4: {
              assets = {
                id: String(cIndex), 
                value: Number(asset),
                realm: "tutorial",
                type: "common2"
              };
              break;
            }
            case 5: {
              assets = {
                id: String(cIndex), 
                value: Number(asset),
                realm: "tutorial",
                type: "common1"
              };
              break;
            }
          }
        } catch(e) {
          continue;
        }
      }
      // console.log('S0 Assets =>', assets);
      if (assets['id']) {
        truths.push({season: i, asset: assets, metadata: m});
      }
    } catch (e) {
      console.log('Error mounting wallet at NFT', e);
    }
    if (i == (DEPLOYED.length - 1)) {
      return truths;
    }
  }
}

export { 
  getOracle,
  getTruths
};