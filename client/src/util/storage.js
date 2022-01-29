import * as Config from '../conf/constants';

const M = 'observations';
const deployed = Config.deployed;
const DEFAULT_CHAR_LENGTH = Config.DEFAULT_CHAR_LENGTH;

/**
 * Load all Log items from local storage
 */
function getStore () {
  let store = localStorage.getItem(M);
  if (store == null) {
    return {};
  } else {
    return JSON.parse(store);
  }
}

/**
 * Get a Log item from local storage
 * @param {String} realm : Name of season, must be deployed
 * @returns {Object} Array instance of season store
 * @see deployed 
 */
function getStoreItem (realm) {
  if (typeof realm !== 'string') {
    return false;
  } else if (deployed.indexOf(realm) < 0) {
    return false;
  }
  let store = getStore();
  if (store[realm]) {
    return store[realm];
  } else {
    return [];
  }
}

/**
 * Update local storage with new soulve
 * @param {Object} item : Soulve
 * @param {String} realm : Name of season, must be deployed
 * @param {Number} index : The index of the riddle within the season's realm
 */
function updateStore (item, realm, index) {
  // console.log('Update Store =>', item, realm, index);
  if (typeof item !== 'object') {
    return false;
  } else if (!item.secret || !item.proof || !item.id) {
    return false;
  } else if (typeof realm !== 'string') {
    return false;
  } else if (deployed.indexOf(realm) < 0) {
    return false;
  } else if (typeof index !== 'number') {
    return false;
  }
  let store = getStore();
  if (!store[realm]) {
    store[realm] = [];
  }
  store[realm][index] = item;
  let update = JSON.stringify(store);
  localStorage.setItem(M, update);
  return true;
}

/**
 * Update local storage with new soulve
 * @param {String} realm : Name of season, must be deployed
 * @param {Boolean} asc : Ascended state (true | false)
 */
function updateAscensions(realm, asc) {
  if (typeof realm !== 'string') {
    console.warn('Error updating ascensions', realm);
    return false;
  } else if (typeof asc !== 'boolean') {
    console.warn('Error updating ascensions', asc);
    return false;
  }
  let store = getStore();
  if (!store['ascensions']) {
    store.ascensions = {};
  }
  let exists = (store.ascensions[realm]) ? true : false;
  if (!exists) {
    switch (realm.toLowerCase()) {
      case 'tutorial+': {
        store.ascensions['tutorial+'] = asc;
        break;
      }
      case 'spring+': {
        store.ascensions['spring+'] = asc;
        break;
      }
      case 'summer+': {
        store.ascensions['summer+'] = asc;
        break;
      }
      case 'autumn+': {
        store.ascensions['autumn+'] = asc;
        break;
      }
    }
    let update = JSON.stringify(store);
    localStorage.setItem(M, update);
    return true;
  } else {
    return false;
  }
}

/**
 * Update stored default Console size setting
 * @param {Number} index : 0 => small, 1 => x small, 2 => xx small
 */
function updateConsole(index = null, remove = false) {
  // console.log('updateConsole', [index, remove]);
  let store = getStore();
  if (remove == true) {
    if (store['cSize']) {
      delete store.cSize;
    let update = JSON.stringify(store);
    localStorage.setItem(M, update);
    }
  } else if (isNaN(index)) {
    return;
  } else {
    const a = [0,1,2];
    const b = [35,25,15];
    if (a.indexOf(index) == -1) {
      return;
    }
    store.cSize = b[index];
    let update = JSON.stringify(store);
    localStorage.setItem(M, update);
  }
}

/**
 * Gets default Console size setting
 */
function getConsole() {
  let store = getStore(), cSize;
  if (store['cSize']) {
    cSize = store.cSize;
  } else {
    cSize = null;
  }
  // console.log('Get Console', cSize);
  return cSize;
}

/**
 * Returns Log item if exists or false if not found
 * @param {String} pubKey : Public secret from Tezos (XXX: or API)
 * @param {String} realm : Name of season, must be deployed
 * @returns {Mixed: Object|Boolean}
 */
function logItemExists(pubKey, realm) {
  if (typeof pubKey !== 'string') {
    return false;
  } else if (pubKey.length !== DEFAULT_CHAR_LENGTH) {
    return false;
  } else if (typeof realm !== 'string') {
    return false;
  } else if (deployed.indexOf(realm) < 0) {
    return false;
  }

  // Parse season storage for value
  let seasonStore = getStoreItem(realm);
  let item = false;
  if (seasonStore.length < 1) {
    return false;
  } else if (!Array.isArray(seasonStore)) {
    return false;
  }
  for (let i = 0; i < seasonStore.length; i++) {
    if (seasonStore[i]) {
      if (seasonStore[i].secret) {
        if (seasonStore[i].secret == pubKey) {
          item = seasonStore[i];
          return item;
        }
      }
    }
    if (i == (seasonStore.length - 1)) {
      return false;
    }
  }
}

const store = {
  get: getStore,
  getItem: getStoreItem,
  existsItem: logItemExists,
  update: updateStore,
  ascend: updateAscensions,
  console: getConsole,
  consoleSize: updateConsole
};

export default { store };