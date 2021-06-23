import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';
import { SigningType } from "@airgap/beacon-sdk";

const Tzip12Module = require('@taquito/tzip12').Tzip12Module;
const Tzip16Module = require('@taquito/tzip16').Tzip16Module;

const Tezos = new TezosToolkit(process.env.VUE_APP_TEZOS_RPC_URL);

Tezos.addExtension(new Tzip12Module());
Tezos.addExtension(new Tzip16Module());

const wallet = new BeaconWallet({
    name: process.env.VUE_APP_TEZOS_DAPP_NAME,
    preferredNetwork: process.env.VUE_APP_TEZOS_NETWORK,
    colorMode: 'dark'
});

// Setting the wallet as the wallet provider for Taquito.
Tezos.setWalletProvider(wallet)

const network = {
    type: process.env.VUE_APP_TEZOS_NETWORK,
    rpcUrl: process.env.VUE_APP_TEZOS_RPC_URL
};

const signMessage = async (msg, address) => {
    msg = "Tezos Signed Message: " + msg;
    const input = Buffer.from(msg);
    const prefix = Buffer.from("0501", "hex");
    const len_bytes = Buffer.from(msg.length.toString(16).padStart(8, '0'), "hex");
    msg = Buffer.concat([prefix, len_bytes, input], prefix.length + len_bytes.length + input.length);

    // Bytes to hex
    msg = msg.toString('hex');

    let signedMsg = false;
    try {
        signedMsg = (await wallet.client.requestSignPayload({ signingType: SigningType.MICHELINE, payload: msg, sourceAddress: address })).signature;
    } catch(signPayloadError) {
        console.error(signPayloadError);
    }

    return { msg, signedMsg };
};

const signLoginRequest = async () => {
    const acct = await getActiveAccount();
    return await signMessage(
        JSON.stringify({
            type: 'auth',
            name: process.env.VUE_APP_TEZOS_DAPP_NAME,
            pkh: await acct.address,
            expires: new Date().getTime() + (5 * 60 * 1000)
        }),
        acct.address
    );
};

const getActiveAccount = async () => {
    const activeAccount = await wallet.client.getActiveAccount();

    // no active account, we need permissions first
    if (!activeAccount) {
        await wallet.requestPermissions({ network });
        return getActiveAccount();
    }

    return activeAccount;
};


export {
    Tezos,
    wallet,
    getActiveAccount,
    signLoginRequest,
    signMessage
};
