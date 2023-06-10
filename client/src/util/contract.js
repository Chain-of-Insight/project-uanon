import { tzip12 } from '@taquito/tzip12';
import { tzip16 } from '@taquito/tzip16';
import { compose } from '@taquito/taquito';
import { Tezos } from './tezos';

const importKey = require('@taquito/signer').importKey;

const Oracle = process.env.VUE_APP_TEZOS_ORACLE;
const SEASON_0_NFT = process.env.VUE_APP_TEZOS_NFT_SEASON_0;
const SEASON_1_NFT = process.env.VUE_APP_TEZOS_NFT_SEASON_1;
const SEASON_2_NFT = process.env.VUE_APP_TEZOS_NFT_SEASON_2;
const SEASON_3_NFT = process.env.VUE_APP_TEZOS_NFT_SEASON_3;
const SEASON_4_NFT = process.env.VUE_APP_TEZOS_NFT_SEASON_4;
const SEASON_5_NFT = process.env.VUE_APP_TEZOS_NFT_SEASON_5;
const SEASON_6_NFT = process.env.VUE_APP_TEZOS_NFT_SEASON_6;
const DEPLOYED = [0,1,2,3,4,5,6];
const defs = ['tutorial', 'spring', 'summer', 'autumn', 'winter', 'cryptowinter', 'dawn'];

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
  const SUMMER = 2;
  const AUTUMN = 3;
  const WINTER = 4;
  const CRYPTOWINTER = 5;
  const DAWN = 6;
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
  let realmOpts;
  await importKey(Tezos, 'edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq');
  try {
    switch (season) {
      case 'spring': {
        selectedContract = SEASON_1_NFT;
        realmOpts = ["ascended", "lost", "secret", "cruel", "common2", "common1"];
        break;
      }
      case 'summer': {
        selectedContract = SEASON_2_NFT;
        realmOpts = ["ascended", "medieval", "kohathite", "orthodox", "common2", "common1"];
        break;
      }
      case 'autumn': {
        selectedContract = SEASON_3_NFT;
        realmOpts = ["ascended", "twisted", "diabolic", "exigent", "common2", "common1"];
        break;
      }
      case 'winter': {
        selectedContract = SEASON_4_NFT;
        realmOpts = ["ascended", "self-transforming", "whetted", "crying", "common2", "common1"];
        break;
      }
      case 'cryptowinter': {
        selectedContract = SEASON_5_NFT;
        realmOpts = ["ascended", "incandescent", "neuromorphic", "spurious", "common2", "common1"];
        break;
      }
      case 'dawn': {
        selectedContract = SEASON_6_NFT;
        realmOpts = ["ascended", "fragile", "future", "classic", "common2", "common1"];
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
        assets = {
          id: String(cIndex), 
          value: Number(asset),
          realm: season,
          type: realmOpts[cIndex]
        };
      } catch(e) {
        console.warn('Error', e);
        continue;
      }
    }
    // console.log('Assets =>', assets);
    if (assets['id']) {
      let sI;
      switch (season) {
        case 'spring': {
          sI = SPRING;
          break;
        }
        case 'summer': {
          sI = SUMMER;
          break;
        }
        case 'autumn': {
          sI = AUTUMN;
          break;
        }
        case 'winter': {
          sI = WINTER;
          break;
        }
        case 'cryptowinter': {
          sI = CRYPTOWINTER;
          break;
        }
        case 'dawn': {
          sI = DAWN;
          break;
        }
      }
      truths.push({season: sI, asset: assets, metadata: m});
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
  const SUMMER = ['ascended','medieval','kohathite','orthodox','common1','common2'];
  const AUTUMN = ['ascended','twisted','diabolic','exigent','common2','common1'];
  const WINTER = ['ascended','self-transforming','whetted','crying','common2','common1'];
  const CRYPTOWINTER = ['ascended','incandescent','neuromorphic','spurious','common2','common1'];
  if (typeof index !== 'number') {
    return false;
  } else if (typeof season !== 'string') {
    return false;
  } else if (defs.indexOf(season) < 0) {
    return false;
  }
  let selectedContract, sI;
  await importKey(Tezos, 'edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq');
  try {
    switch (season) {
      case 'spring': {
        selectedContract = SEASON_1_NFT;
        sI = SPRING;
        break;
      }
      case 'summer': {
        selectedContract = SEASON_2_NFT;
        sI = SUMMER;
        break;
      }
      case 'autumn': {
        selectedContract = SEASON_3_NFT;
        sI = AUTUMN;
        break;
      }
      case 'winter': {
        selectedContract = SEASON_4_NFT;
        sI = WINTER;
        break;
      }
      case 'cryptowinter': {
        selectedContract = SEASON_5_NFT;
        sI = CRYPTOWINTER;
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
      type: sI[index]
    };

    if (asset['id']) {
      let truth =  {season: season, asset: asset, metadata: m};
      return truth;
    }
  } catch (e) {
    console.warn('Error mounting wallet at NFT', e);
  }
}

async function getComprehension(address) {
  if (!address) return false;
  else if (typeof address !== 'string') return false;
  
  // use alice key
  await importKey(Tezos, 'edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq');

  const selectedContract = SEASON_6_NFT;
  const nftLen = 6;
  const realmOpts = ["ascended", "fragile", "future", "classic", "common2", "common1"];

  let ss = "dawn", requestList = [], tokenIndexes = [];
  for (let n = 0; n < nftLen; n++) {
    let a = {
      owner: address,
      token_id: String(n)
    };
    requestList.push(a);
  }
  let nftInstance = await Tezos.contract.at(selectedContract, tzip16);
  let addressBalance = await nftInstance.views.balance_of(requestList).read();
  addressBalance = toJSON(addressBalance);

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
      assets = {
        id: String(cIndex), 
        value: Number(asset),
        realm: ss,
        type: realmOpts[cIndex]
      };
    } catch(e) {
      console.warn('Error', e);
      continue;
    }
  }
  let BigPicture = {season: 6, asset: assets, metadata: m};
  return BigPicture;
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
  let realmOpts, ss;
  // use alice key
  await importKey(Tezos, 'edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq');
  for (let i = 0; i < DEPLOYED.length; i++) {
    try {
      switch (DEPLOYED[i]) {
        case 0: {
          selectedContract = SEASON_0_NFT;
          nftLen = 6;
          realmOpts = ["ascended", "forgotten", "rare", "prosaic", "common2", "common1"];
          ss = "tutorial";
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
          realmOpts = ["ascended", "lost", "secret", "cruel", "common2", "common1"];
          ss = "spring";
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
        case 2: {
          selectedContract = SEASON_2_NFT;
          nftLen = 6;
          realmOpts = ["ascended", "medieval", "kohathite", "orthodox", "common2", "common1"];
          ss = "summer";
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
        case 3: {
          selectedContract = SEASON_3_NFT;
          nftLen = 6;
          realmOpts = ["ascended", "twisted", "diabolic", "exigent", "common2", "common1"];
          ss = "autumn";
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
        case 4: {
          selectedContract = SEASON_4_NFT;
          nftLen = 6;
          realmOpts = ["ascended", "self-transforming", "whetted", "crying", "common2", "common1"];
          ss = "winter";
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
        case 5: {
          selectedContract = SEASON_5_NFT;
          nftLen = 6;
          realmOpts = ["ascended", "incandescent", "neuromorphic", "spurious", "common2", "common1"];
          ss = "cryptowinter";
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

          if (DEPLOYED[i] >= 1) {
            let c = await Tezos.contract.at(selectedContract, compose(tzip16, tzip12));
            m = await c.tzip12().getTokenMetadata(cIndex);
            let m2 = await c.tzip16().getMetadata();
            if (m2['metadata']) {
              if (m2.metadata['description']) {
                m.description = m2.metadata['description'];
              }
            }
          }
          assets = {
            id: String(cIndex), 
            value: Number(asset),
            realm: ss,
            type: realmOpts[cIndex]
          };
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
  getTruths,
  getComprehension
};