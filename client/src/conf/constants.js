const DEFAULT_SIZE = 2;
const DEFAULT_OP_SIZE = 1001;
const DEFAULT_DEPTH = 1;
const DEFAULT_CHAR_LENGTH = 64;
const DEFAULT_FIELD_SIZE = 1;
const DEFAULT_VISIBLE_PROPS = ['title','description','secret','previous','payload','hint','files'];
const DEFAULT_STORAGE_BASE = process.env.VUE_APP_STORAGE_BASE;
const DEFAULT_STORAGE_DOWNLOAD = 'index.zip';
const deployed = ['tutorial'];
const TEAMS = {
  '5ff7b2944650b50b77b641f9': {id:'5ff7b2944650b50b77b641f9', name: 'Nation', description: 'So he that can find no other way for correcting the errors of his people but by taking from them the conveniences of life, shows that he knows not what it is to govern a free nation.'},
  '5ff7b3204650b50b77b641fa': {id:'5ff7b3204650b50b77b641fa', name: 'Rebel', description: 'As soon as it is possible to disobey with impunity, disobedience is legitimate.'},
  '5ff7b6114650b50b77b641fb': {id:'5ff7b6114650b50b77b641fb', name: '404', description: 'The known is finite, the unknown infinite; intellectually we stand on an islet in the midst of an illimitable ocean of inexplicability.'}
}
const TEAM_MAP = {
  'nation': {id:'5ff7b2944650b50b77b641f9', name: 'Nation', description: 'So he that can find no other way for correcting the errors of his people but by taking from them the conveniences of life, shows that he knows not what it is to govern a free nation.'},
  'rebel': {id:'5ff7b3204650b50b77b641fa', name: 'Rebel', description: 'As soon as it is possible to disobey with impunity, disobedience is legitimate.'},
  '404': {id:'5ff7b6114650b50b77b641fb', name: '404', description: 'The known is finite, the unknown infinite; intellectually we stand on an islet in the midst of an illimitable ocean of inexplicability.'}
};

const notify = {
  DEFAULT_PLAYER_WARNING: "Careful Observer, you're missing the access key to view this Op",
  DEFAULT_CLI_ERROR: "Error processing command",
  DEFAULT_VERIFICATION_SUCCESS: "Use the command `next` to load the next puzzle",
  DEFAULT_VERIFICATION_SUCCESS_GRAPHICAL: "Solution has been verified",
  DEFAULT_VERIFICATION_FAIL: "Verification failed",
  DEFAULT_NO_ACCESS: "Error, access key required",
  DEFAULT_ACCESS_KEY_ACQUIRED: "Access key acquired",
  DEFAULT_NAVIGATION: "Loading...",
  DEFAULT_LOG_GEN: "Generating logs...",
  DEFAULT_DOWNLOAD_COMPLETE: "Download complete"
};

const externals = {
  sounds: {
    default: {path: process.env.VUE_APP_STORAGE_BASE + '/sounds/a69f70c2201dacfc0a7e5f2226a1cd00ad8b1cd1ee42a2e69b144fc65caaeeb2.wav', type: 'audio/wav'},
    defaultLoop: {
      path: process.env.VUE_APP_STORAGE_BASE + '/sounds/',
      type: 'audio/mpeg',
      files: [
        "024b51dfd011c6ce4184d693eb589bab71391877b7cc235dbacb70371c659cd4.mp3",
        "07cbe83cb56e8569bd826a4e22ffc7ca72b9a240e7520d794a4c2bb3caeaec44.mp3",
        "07f2b1d43adda84f05693f33717b6050c4ea378a702736b8d1b43b719ce5fca0.mp3",
        "0a4444a08411631141789457678c3c09dbcbaf2c47ce784f5b7c43e4784a6948.mp3",
        "0b5c7038280bf2d7738b2c23f04e6d1f74035c076a72605fb315a1b32aed2623.mp3",
        "0bea2329690e5d14f961cbbe6d682af56f9b38f55e6e74b8874cb0d84b375af5.mp3",
        "4e38572d946aafbecdb54f326475a05cf05582a36421b2b3b61519757f006f63.wav", // 1,14,-4,991
        "5294af14400473f1fd9f06a8ad66dded7ec54b1db29965886cec4f22b7b4e19b.mp3",
        "6a302e17a2d113bc2c9d48e7d592d712381c83b165cb7468d1ca9ab61788d183.mp3",
        "72de3f4ab37fd19f340ecd6f540cd59c596743341535bc2bec972a81b8ecee8b.mp3",
        "8a553dffae21286a5d944fa811b11f261de910488639742a048fcfd8296a88a8.mp3",
        "96035189f8f87368557e11cc7ca75673c0cd21186d26fb9b01a90160eba7a981.mp3",
        "99c1549960dfead53e1a8b754224a0862a8ff5512491bc5cfdb83422ba40f6d4.mp3",
        "b030ea82ff97584682e1feeeac11d49aad9b98cf0f825c5ef275c2fbae96f3a8.mp3",
        "c4b6300dab0b8200df373b8ecb6881dcbed0284e4567005cad4250db8b7f4b5e.mp3",
        "ec45883459c8d10bc9493e751b3dd7096710f0ff356055ff07ffc80dc77a49db.mp3"
      ]
    }
  },
  images: {
    profile: [
      // he / him / they / it
      'b2254023e1bff8f97ef00b9aa19344a3012527db23d160285e1efdc3126b037f.png','27383b5e51d8c75b336c02c86572364f35d048701ae9fee32295e639f61f8347.png','ec46689669ea06ce4708ebd6fe60c26aab4e234014288c0677b5fa6e8bccea8e.png',
      // she / her / they / it
      'd08bad3b99f941150272a66ce7784a89719b362140874f55461c880de52f7cd4.png','62daa439035926fc7ab6886560134af63eb3fdcfd0ed61eba64fba097b168a4a.png','968100823661a7d2299f24842c385cf9c9a98685b8876b5793aaf2d1bdd0ea48.png'
    ],
    badges: {
      brain: '876bda425f5a5d315ce6b9f80a8e39170b27fd224488babcb85db06dcf53484d.png',
      cracker: '2d1a0765acad0401c09d8f32cc77a8417bbf8d95ff87a9023ef3eeb067622ac7.png',
      openmind: 'f870824d3d8c51b036537ce5d3cbdde9e5435d8a364525d1a69fc3a3f389b94f.png',
      optimist: '4c215bd4086ef20ac92233c3d8ce266b610c0ad6990ef61a9f2e69baf15d0733.png',
      paranoid: '1dc818c106d38679b7fcd28b799bf63f8b6034443415daed3051c731a52133b2.png',
      dither: '754ae734ce777e5d71d429a53a6e756a17a095a486983c7d385daf9f259201d7.png',
      ruler: '06ae751b4b26a4c8d409c532d9225675f556aa95c32b7aba3b40a8c20bf64517.png',
      sage: '65de581e97eead94c2751bc9ba257d558d0d1e32259047e408f874e62478dab3.png',
      skeptic: 'ea965291b796d60c1d17cff66e0aca5fa6a8275444062259e5e6b0a8717b7c12.png'
    },
    nft: {
      tutorial: {
        path: process.env.VUE_APP_STORAGE_BASE + '/nft/fe30030e102ecf8fab72edd523758d54b314224d81ef9f50265efeac824fb56e/',
        image: {
          ascended: '7947d1a9db909ed8b7972869c86f39953c1bb92de74f66f9c9ca862efc794c82.png',
          forgotten: '153bc3545ed7f2f784ab4157937c3887560fce4340b922873a44d6235903ce35.png',
          rare: '64331980e95012da2d431567aae8a80a741a1a9d1894a70241b5004190fa71bc.png',
          prosaic: 'b341e5c08a130abf24b210dae4ecc38db47e24889768b4dfda41bc78d0b22252.png',
          common2: '3793a40d19570feb51ad40bad70ef446a5ed27fc8322a059d238bae9c935ac98.png',
          common1: 'eab38edf6f04740bf5fadd22ad9e1a4b686fa9c12263b41805687c624d40bc9d.png'
        }
      }
    }
  },
  tutorial3: {
    script: process.env.VUE_APP_STORAGE_BASE + '/289f2157eca9228d2e0119548c8116679b844948c863f276da3e72d25a11033b/index.js',
    style: process.env.VUE_APP_STORAGE_BASE + '/289f2157eca9228d2e0119548c8116679b844948c863f276da3e72d25a11033b/index.css',
    audio: {path: process.env.VUE_APP_STORAGE_BASE + '/289f2157eca9228d2e0119548c8116679b844948c863f276da3e72d25a11033b/a18ecf32ca0636dee18db00facccb7a74511cf92b3d760a7144baadda52dadb4.mp3', type: 'audio/mpeg'}
  },
  explorer: {
    testnet: 'https://edo2net.tzkt.io/',
    mainnet: 'https://tzkt.io/'
  }
};

module.exports = {
  DEFAULT_SIZE: DEFAULT_SIZE,
  DEFAULT_OP_SIZE: DEFAULT_OP_SIZE,
  DEFAULT_DEPTH: DEFAULT_DEPTH,
  DEFAULT_CHAR_LENGTH: DEFAULT_CHAR_LENGTH,
  DEFAULT_VISIBLE_PROPS: DEFAULT_VISIBLE_PROPS,
  DEFAULT_FIELD_SIZE: DEFAULT_FIELD_SIZE,
  DEFAULT_STORAGE_BASE: DEFAULT_STORAGE_BASE,
  DEFAULT_STORAGE_DOWNLOAD: DEFAULT_STORAGE_DOWNLOAD,
  TEAMS: TEAMS,
  TEAM_MAP: TEAM_MAP,
  deployed: deployed,
  notify: notify,
  externals: externals
};