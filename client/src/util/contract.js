import { tzip12 } from '@taquito/tzip12';
import { tzip16 } from '@taquito/tzip16';
import { compose } from '@taquito/taquito';
import { Tezos } from './tezos';

const importKey = require('@taquito/signer').importKey;

const Oracle = process.env.VUE_APP_TEZOS_ORACLE;
const SEASON_0_NFT = process.env.VUE_APP_TEZOS_NFT_SEASON_0;
const SEASON_1_NFT = process.env.VUE_APP_TEZOS_NFT_SEASON_1;
const DEPLOYED = [0,1];
const defs = ['tutorial', 'spring'];

/**
 * Gets an instance of Uanon Puzzle Oracle
 * @returns {Mixed | Object : Boolean} : Returns an instance of the Oracle contract or false
 */
async function getOracle() {
  try {
    let contractInstance = await Tezos.wallet.at(Oracle);
    // console.log('Oracle =>', contractInstance);
    return contractInstance;
  } catch (e) {
    console.warn('Error mounting wallet at Oracle', e);
    return false;
  }
}

/**
 * JSON/Object helper
 * @param {Object} x 
 * @returns {Object}
 */
const toJSON = (x) => JSON.parse(JSON.stringify(x));

/**
 * Gets Truths for a particular season owned by a particular address
 * @param {String} address : Address at which the NFT contract lives
 * @param {String} season : Season for which the NFT contract serves
 * @returns {Object}
 */
async function getTruthShard(address, season) {
  const SPRING = 1;
  if (!address) {
    return false;
  } else if (typeof address !== 'string') {
    return false;
  } else if (typeof season !== 'string') {
    return false;
  } else if (defs.indexOf(season) < 0) {
    return false;
  }
  let truths = [], selectedContract, nftLen, addressBalance, tokenIndexes = [];
  await importKey(Tezos, 'edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq');
  try {
    switch (season) {
      case 'spring': {
        selectedContract = SEASON_1_NFT;
        break;
      }
    }
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
    // console.log('tokenIndexes', tokenIndexes);
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
        let entries = metadata.token_info.entries();
        // console.log('[metadata, entries]', [metadata, entries]);
        for (let entry of entries) {
          if (entry[0] == 'attributes') {
            let attributes = Buffer.from(entry[1], "hex").toString();
            m[entry[0]] = JSON.parse(attributes);
          } else {
            m[entry[0]] = Buffer.from(entry[1], "hex").toString();
          }
        }
        let c = await Tezos.contract.at(selectedContract, compose(tzip16, tzip12));
        m = await c.tzip12().getTokenMetadata(cIndex);
        let m2 = await c.tzip16().getMetadata();
        if (m2['metadata']) {
          if (m2.metadata['description']) {
            m.description = m2.metadata['description'];
          }
        }
        switch (cIndex) {
          case 0: {
            assets = {
              id: String(cIndex), 
              value: Number(asset),
              realm: "spring",
              type: "ascended"
            };
            break;
          }
          case 1: {
            assets = {
              id: String(cIndex), 
              value: Number(asset),
              realm: "spring",
              type: "lost"
            };
            break;
          }
          case 2: {
            assets = {
              id: String(cIndex), 
              value: Number(asset),
              realm: "spring",
              type: "secret"
            };
            break;
          }
          case 3: {
            assets = {
              id: String(cIndex), 
              value: Number(asset),
              realm: "spring",
              type: "cruel"
            };
            break;
          }
          case 4: {
            assets = {
              id: String(cIndex), 
              value: Number(asset),
              realm: "spring",
              type: "common2"
            };
            break;
          }
          case 5: {
            assets = {
              id: String(cIndex), 
              value: Number(asset),
              realm: "spring",
              type: "common1"
            };
            break;
          }
        }
      } catch(e) {
        console.warn('Error', e);
        continue;
      }
    }
    // console.log('Assets =>', assets);
    if (assets['id']) {
      truths.push({season: SPRING, asset: assets, metadata: m});
      return truths[0];
    }
  } catch (e) {
    console.warn('Error mounting wallet at NFT', e);
  }
}

/**
 * Gets data for a Truth without requirement to hold token
 * @param {String} season : Season for which token data will be loaded
 * @param {Number} index  : Which token index to return (e.g. index 0 returns 'ascended')
 * @returns {Object}
 */
async function getTruthShardData(season, index) {
  const SPRING = ['ascended','lost','secret','cruel','common1','common2'];
  if (typeof index !== 'number') {
    return false;
  } else if (typeof season !== 'string') {
    return false;
  } else if (defs.indexOf(season) < 0) {
    return false;
  }
  let selectedContract;
  await importKey(Tezos, 'edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq');
  try {
    switch (season) {
      case 'spring': {
        selectedContract = SEASON_1_NFT;
        break;
      }
    }
    let contractInstance = await Tezos.wallet.at(selectedContract);
    let storage = await contractInstance.storage();
    let metadata = await storage.assets.token_metadata.get(String(index));
    let entries = metadata.token_info.entries();
    let m = {};

    for (let entry of entries) {
      if (entry[0] == 'attributes') {
        let attributes = Buffer.from(entry[1], "hex").toString();
        m[entry[0]] = JSON.parse(attributes);
      } else {
        m[entry[0]] = Buffer.from(entry[1], "hex").toString();
      }
    }

    let c = await Tezos.contract.at(selectedContract, compose(tzip16, tzip12));
    m = await c.tzip12().getTokenMetadata(index);
    let m2 = await c.tzip16().getMetadata();

    if (m2['metadata']) {
      if (m2.metadata['description']) {
        m.description = m2.metadata['description'];
      }
    }

    let asset = {
      id: String(index), 
      realm: season,
      type: SPRING[index]
    };

    if (asset['id']) {
      let truth =  {season: season, asset: asset, metadata: m};
      return truth;
    }
  } catch (e) {
    console.warn('Error mounting wallet at NFT', e);
  }
}

/**
 * Get all Truths owned by a particular address
 * @param {String} address 
 * @returns {Object} : Array
 */
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
        case 1: {
          selectedContract = SEASON_1_NFT;
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
      // console.log('tokenIndexes', tokenIndexes);
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
          
          let entries; 
          let metadata = await storage.assets.token_metadata.get(String(cIndex));
          if (DEPLOYED[i] == 0) {
            entries = metadata.extras.entries();
          } else if (DEPLOYED[i] > 0) {
            entries = metadata.token_info.entries();
          }
          // console.log('[metadata, entries]', [metadata, entries]);
          
          for (let entry of entries) {
            if (entry[0] == 'attributes') {
              let attributes = Buffer.from(entry[1], "hex").toString();
              m[entry[0]] = JSON.parse(attributes);
            } else {
              m[entry[0]] = Buffer.from(entry[1], "hex").toString();
            }
          }

          if (DEPLOYED[i] == 0) {
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
          } else if (DEPLOYED[i] == 1) {
            let c = await Tezos.contract.at(selectedContract, compose(tzip16, tzip12));
            m = await c.tzip12().getTokenMetadata(cIndex);
            let m2 = await c.tzip16().getMetadata();
            if (m2['metadata']) {
              if (m2.metadata['description']) {
                m.description = m2.metadata['description'];
              }
            }
            switch (cIndex) {
              case 0: {
                assets = {
                  id: String(cIndex), 
                  value: Number(asset),
                  realm: "spring",
                  type: "ascended"
                };
                break;
              }
              case 1: {
                assets = {
                  id: String(cIndex), 
                  value: Number(asset),
                  realm: "spring",
                  type: "lost"
                };
                break;
              }
              case 2: {
                assets = {
                  id: String(cIndex), 
                  value: Number(asset),
                  realm: "spring",
                  type: "secret"
                };
                break;
              }
              case 3: {
                assets = {
                  id: String(cIndex), 
                  value: Number(asset),
                  realm: "spring",
                  type: "cruel"
                };
                break;
              }
              case 4: {
                assets = {
                  id: String(cIndex), 
                  value: Number(asset),
                  realm: "spring",
                  type: "common2"
                };
                break;
              }
              case 5: {
                assets = {
                  id: String(cIndex), 
                  value: Number(asset),
                  realm: "spring",
                  type: "common1"
                };
                break;
              }
            }
          }
        } catch(e) {
          console.warn('Error', e);
          continue;
        }
      }
      // console.log('Assets =>', assets);
      if (assets['id']) {
        truths.push({season: i, asset: assets, metadata: m});
      }
    } catch (e) {
      console.warn('Error mounting wallet at NFT', e);
    }
    if (i == (DEPLOYED.length - 1)) {
      // console.log('Truths', truths);
      return truths;
    }
  }
}

export { 
  getOracle,
  getTruthShard,
  getTruthShardData,
  getTruths
};