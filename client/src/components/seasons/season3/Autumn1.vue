<template>

<!--

*

th ovabwiabno estrt ebyothndov esthæab ndrtutnoestabthno
esthæthhw hæabhw yortnowi abwirt
hwrtrtno ndth hæabth ovabebbe ebrtutabutabel hæthesthæ hwnorthæ
yothhwestabno hæhæabno th estabyoyo thrtut estututno ovabebbe northæ
ovabowrtutab thest thhw estrtrt yoabestab

ab esthæthhwestabel ndrtutnoestabthno hæthelabhw ab owrtutnoestabthno, abnoel
thow thrtut elutthnobe elababstyoth owutrtnd thest thrtut'yoyo owthnoel estutabnohwowrtutndabestthrtno
ovutest estrt utæebhæ thest
owthuthwest thrtut nduthwest stabhwhw rtnoab hæutnoelutabel esthærtuthwabnoel esthæthhwestabel estutabsthw
hæthyoyo thrtut ovab hwestutrtnowi abnortutwihæ?
abovyoab estrt uthwab abyoyo thrtutut hwabnohwabhw?!

elabutbeabnoabel ovyoabelabhw abnoel ebyothndovthnowi owabnoebabhw
beababst thrtutut hæthesthw hwhæabutst rtut thrtut inuthwest ndthwihæest hwstutthnowi esthæthhw estutabst.
ovabestestyoab abnoel rtutest-hwndabutest esthæab ebyoabutabut hwabnoestthnoabyohw
hærtabutelabhw rtow elændrtnohw abutabutthhæhæabutab hæthelthnowi,
hæabthestthnowi, estutththnowi estrt ebabestebhæ thrtut.
elabowestyoth ndabnortabututab esthæutrtutwihæ esthæabthut wiutthst
uthwab thrtutut hææstrtnohw abnoel thrtut inuthwest ndthwihæest estutthabyo

utst esthæab ndrtutnoestabthno stabesthæ
esthæab estabututabthno hæthnoelthnowi abutabutthhæhæabutab
inrtututnoabth wiabestestthnowi ndrtutab elthowowthebutyoest
ebrtndstabnothrtnohw owabyoyoabno
estabndstestabel ovth hwthutabnohw ebabyoyothnowi esthæabnd hwhæababestyoth
estrt esthæabthut ovyortrtelth abnoelthnowi

esthæthhw soutabhwest thhw bethyoyothnowi
th elabthyoth elæyoest ndth hwestutabnowiesthæ estrt ebrtndstyoabestab esthæthhw ndabelnoabhwhw
esthæabno th yortrtbe utst...

ndth abthabhw wiabest hæthelabut
th'el utæebhæabel esthæab ndthelelyoab rtow esthæab ndrtutnoestabthno thæuthw abwirt
th noabutabut nortestthebabel esthæab owrtutnoestabthno hwestabnoelthnowi utthwihæest thno owutrtnoest rtow ndab
wiyothndndabutthnowi hæthesthæ esthæthhwestabel estutabnohwowrtutndabestthrtno strthæabuthw.
th elutthnobe thest elababstyoth, abnoel
owababyo esthæab ebhæabnowiab thnohwthelab ndab hærthæyothnowi
ututnonothnowi hæthesthæ esthæab hæthnoel abhw ndth ebrtndstabnothrtno
ndth æuthw wiutrthæ hwhæabutstabut
ndth estababesthæ abhwestabnoelthnowi
ndth abthabhw, rtow ebrtututhwab, ebabno hwabab
ndrtutab ebyoæutyoth thno esthæthhw elabutbenoabhwhw

*

-->

  <div class="autumn-wrap console" :class="{copen: co}" v-if="rdy">

    <div class="content-s autumn puzzle-content" v-if="p.id">
      <div class="jumbotron hack-this-meme ctf-banner">
        <ul class="ctf-meta">
          <li class="ctf title">
            <h3 class="ctf-label cyan">Title:</h3>&nbsp;<span>{{p.title}}</span>
          </li>
          <li class="ctf category" v-if="p.category">
            <h3 class="ctf-label cyan">Category:</h3>&nbsp;<span>{{p.category}}</span>
          </li>
          <li class="ctf tags" v-if="p.tags">
            <h3 class="ctf-label cyan">Tags:</h3>&nbsp;
            <div class="tags" v-for="(tag,i) in p.tags" :key="i">
              <span class="tag" v-if="i !== (p.tags.length-1)">{{tag}},&nbsp;</span>
              <span class="tag" v-if="i == (p.tags.length-1)">{{tag}}</span>
            </div>
          </li>
          <li class="ctf points" v-if="p.points">
            <h3 class="ctf-label cyan">Points:</h3>&nbsp;<span>{{p.points}}</span>
          </li>
          <li class="ctf pubkey" v-if="p.secret">
            <h3 class="ctf-label cyan">Pubkey:</h3>&nbsp;<span>{{p.secret}}</span>
          </li>
        </ul>
      </div>

      <div class="instructions" v-if="p.description">
        <h4 class="blood">Your instructions:</h4>
        <p>{{p.description}}</p>
      </div>

      <div id="game_status" class="game status">
        <!-- Not started -->
        <div v-if="geo.state == 0">
          <button class="btn btn-primary" @click="geo.state = 6">
            <span v-if="!geo.started">Start</span>
            <span v-else>Resume</span>
          </button>
        </div>

        <!-- List Games -->
        <div id="games_list" v-if="geo.state >= 6">

          <div class="jumbotron game" :class="'game-'+(i+1)" v-for="(game,i) in geo.meta" :key="i">
            <h3><strong>Game {{(i+1)}}</strong></h3>
            <p>{{game.cat}}</p>
            <p>{{game.type}}</p>
            <p>{{geo.res[i].filter((g)=>{return g!==null}).length}} of 5 locations selected</p>
            <div v-if="geo.res[i].filter((g)=>{return g!==null}).length == geo.res[i].length">
              <div>
                <a v-if="!geo.show[i]" class="anstg show blood" @click="geo.show[i] = true">View Answers</a>
                <a v-if="geo.show[i]" class="anstg hide blood" @click="geo.show[i] = false">Hide Answers</a>
              </div>
              <div v-if="geo.show[i]">
                <ul class="answers">
                  <li v-for="(answer,j) in geo.res[i]" :key="j">{{(j+1)}}. {{answer}}</li>
                </ul>
              </div>
            </div>
            <button class="btn btn-primary" @click="initG(0,i)">
              <span>Play</span>
            </button>
          </div>

        </div>

        <div class="check-result" v-if="geo.state >= 6">
          <p>When you've selected all locations, use the "Submit" button to check their veracity and receive your next instruction.</p>
          <button class="btn btn-primary" @click="submit();">Submit</button>
          <div class="result" v-if="geo.report">
            <div v-if="geo.report.msg">
              <div class="close-x report">
                <span class="float-right" @click="geo.report = {msg: null, success:null}">×</span>
              </div>
              <div class="bg-success" v-if="geo.report.success">{{geo.report.msg}}</div>
              <div class="bg-danger" v-if="!geo.report.success">{{geo.report.msg}}</div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div id="active-game" :class="'state-'+geo.state">
      <div id="pano"></div>
      <div id="ctrl-r">

        <div id="ctrl1">
          <div class="rowr">
            <span class="cyan">Game:</span><span>&nbsp;{{(geo.g + 1)}}</span>
          </div>
          <div class="rowr">
            <span class="cyan">Location:</span><span>&nbsp;{{(geo.l + 1)}}</span>
          </div>
          <div class="rowr" v-if="geo.state > 0 && geo.state < 6">
            <span class="cyan" v-if="geo.res[geo.g][geo.l]">Selected Answer:</span><span>&nbsp;{{geo.res[geo.g][geo.l]}}</span>
          </div>
        </div>

        <div id="ctrl2">
          <div class="rowr" v-if="p.geoquestr.games[geo.g]">
            <span class="cyan">Locale:</span><span>&nbsp;{{ p.geoquestr.games[geo.g].locale }}</span>
          </div>
          <div class="rowr" v-if="p.geoquestr.games[geo.g]">
            <span class="cyan">Objective:</span><span>&nbsp;Select the correct {{ p.geoquestr.games[geo.g].type }}</span>
          </div>
        </div>

        <div id="ctrl3">
          <div class="rowr" v-if="geo.state > 0 && geo.state < 6">
            <button class="btn btn-inverse" @click="initG((geo.l-1))" :disabled="geo.l <= 0">Previous</button>
            <button class="btn btn-primary" @click="initG((geo.l+1))" :disabled="geo.l >= 4">Next</button>
            <button class="btn btn-success" @click="closeGm();" v-if="geo.res[geo.g][0] && geo.res[geo.g][1] && geo.res[geo.g][2] && geo.res[geo.g][3] && geo.res[geo.g][4]">Complete</button>
            <div class="close-x">
              <span class="float-right" @click="geo.state = 6">×</span>
            </div>
          </div>
        </div>

      </div>

      <MapSelect
        v-bind:g="geo.meta[geo.g]"
        v-bind:s="d"
        v-if="geo.state > 0 && geo.state < 6"
        @toggle="mtoggle"
        @answer="msAnswer"
      ></MapSelect>
    </div>

    <!-- Soulve -->
    <div class="open-c inner">
      <p class="helper-bar float-right" @click="gopen();" v-if="p.secret">
        <span class="icon icon-game"></span>
      </p>
    </div>
    <Graphical 
      v-bind:s="p.secret"
      v-bind:r="def[0]"
      v-bind:f="p.fields"
      v-bind:o="gd"
      v-bind:i="i"
      v-bind:p="p"
      v-bind:t="p.title"
      v-bind:dd="false"
      v-bind:tx="true"
      v-bind:rst="true"
      v-if="p.secret"
      @proof="retain"
      @gclose="gclose"
    ></Graphical>
    <Console
      v-bind:s="p.secret"
      v-bind:d="cd"
      v-bind:i="i"
      v-bind:r="def[0]"
      v-bind:p="p"
      v-bind:l="false"
      v-bind:q="true"
      v-bind:un="un"
      v-if="p.secret && un"
      @proof="retain"
      @copen="copen"
    ></Console>
  </div>

</template>

<script>
  import * as api from '../../../util/api';
  import store from '../../../util/storage';
  import { verifyProof } from '../../../util/hasher';
  import * as Config from '../../../conf/constants';
  import out from '../../../util/z';
  
  import Graphical from '../../children/soulve/Graphical.vue';
  import Console from '../../children/soulve/Console.vue';
  import MapSelect from '../../children/MapSelect.vue';

  const CURRENT_I = 0;

  export default {
    name: 'Autumn 1',
    components: { Console, Graphical, MapSelect },
    data: () => ({
      a: false,
      c: Config,
      d: false,
      h: verifyProof,
      i: CURRENT_I,
      m: null,
      p: {
        id: null,
        title: null,
        description: null,
        secret: null,
        template: null
      },
      s: null,
      t: null,
      w: Config.notify.DEFAULT_PLAYER_WARNING,
      z: out,
      cd: false,
      co: false,
      gd: false,
      do: store,
      sl: null,
      sv: null,
      fi: null,
      un: null,
      api: api,
      geo: {
        g: null,
        l: null,
        x: null,
        res: [
          [null,null,null,null,null], // Game 1 - World (country)
          [null,null,null,null,null], // Game 2 - Americas (state / province)
          [null,null,null,null,null], // Game 3 - World (capital city)
          [null,null,null,null,null], // Game 4 - Africa (country)
          [null,null,null,null,null]  // Game 5 - Asia (country)
        ],
        show: [false,false,false,false,false],
        meta: [
          {
            type: "Country", 
            cat: "World"
          },
          {
            type: "State / Province", 
            cat: "Americas"
          },
          {
            type: "Capital City", 
            cat: "World"
          },
          {
            type: "Country", 
            cat: "Africa"
          },
          {
            type: "Country", 
            cat: "Asia"
          },
        ],
        report: {
          msg: null, 
          success:null
        },
        state: 0,
        started: false
      },
      str: {},
      img: 0,
      def: ['autumn', 3],
      rdy: false,
      argT: [false, false]
    }),
    mounted: async function () {
      this.getStr();
      if (localStorage.getItem('_u_meme1') !== null) {
        this.geo.res = JSON.parse(localStorage.getItem('_u_meme1'));
        this.geo.started = true;
      }
      let s = document.createElement('script');
      s.setAttribute('src', Config.externals['autumn1'].script);
      document.head.appendChild(s);
      await this.getU();
      await this.getS();
      await this.getTpl();
      this.rdy = true;
      let m1 = `
HHHHHHHHH     HHHHHHHHH               AAA                  CCCCCCCCCCCCCKKKKKKKKK    KKKKKKK
H:::::::H     H:::::::H              A:::A              CCC::::::::::::CK:::::::K    K:::::K
H:::::::H     H:::::::H             A:::::A           CC:::::::::::::::CK:::::::K    K:::::K
HH::::::H     H::::::HH            A:::::::A         C:::::CCCCCCCC::::CK:::::::K   K::::::K
  H:::::H     H:::::H             A:::::::::A       C:::::C       CCCCCCKK::::::K  K:::::KKK
  H:::::H     H:::::H            A:::::A:::::A     C:::::C                K:::::K K:::::K   
  H::::::HHHHH::::::H           A:::::A A:::::A    C:::::C                K::::::K:::::K    
  H:::::::::::::::::H          A:::::A   A:::::A   C:::::C                K:::::::::::K     
  H:::::::::::::::::H         A:::::A     A:::::A  C:::::C                K:::::::::::K     
  H::::::HHHHH::::::H        A:::::AAAAAAAAA:::::A C:::::C                K::::::K:::::K    
  H:::::H     H:::::H       A:::::::::::::::::::::AC:::::C                K:::::K K:::::K   
  H:::::H     H:::::H      A:::::AAAAAAAAAAAAA:::::AC:::::C       CCCCCCKK::::::K  K:::::KKK
HH::::::H     H::::::HH   A:::::A             A:::::AC:::::CCCCCCCC::::CK:::::::K   K::::::K
H:::::::H     H:::::::H  A:::::A               A:::::ACC:::::::::::::::CK:::::::K    K:::::K
H:::::::H     H:::::::H A:::::A                 A:::::A CCC::::::::::::CK:::::::K    K:::::K
HHHHHHHHH     HHHHHHHHHAAAAAAA                   AAAAAAA   CCCCCCCCCCCCCKKKKKKKKK    KKKKKKK
`;
      let m2 = `
TTTTTTTTTTTTTTTTTTTTTTTHHHHHHHHH     HHHHHHHHHIIIIIIIIII   SSSSSSSSSSSSSSS 
T:::::::::::::::::::::TH:::::::H     H:::::::HI::::::::I SS:::::::::::::::S
T:::::::::::::::::::::TH:::::::H     H:::::::HI::::::::IS:::::SSSSSS::::::S
T:::::TT:::::::TT:::::THH::::::H     H::::::HHII::::::IIS:::::S     SSSSSSS
TTTTTT  T:::::T  TTTTTT  H:::::H     H:::::H    I::::I  S:::::S            
        T:::::T          H:::::H     H:::::H    I::::I  S:::::S            
        T:::::T          H::::::HHHHH::::::H    I::::I   S::::SSSS         
        T:::::T          H:::::::::::::::::H    I::::I    SS::::::SSSSS    
        T:::::T          H:::::::::::::::::H    I::::I      SSS::::::::SS  
        T:::::T          H::::::HHHHH::::::H    I::::I         SSSSSS::::S 
        T:::::T          H:::::H     H:::::H    I::::I              S:::::S
        T:::::T          H:::::H     H:::::H    I::::I              S:::::S
      TT:::::::TT      HH::::::H     H::::::HHII::::::IISSSSSSS     S:::::S
      T:::::::::T      H:::::::H     H:::::::HI::::::::IS::::::SSSSSS:::::S
      T:::::::::T      H:::::::H     H:::::::HI::::::::IS:::::::::::::::SS 
      TTTTTTTTTTT      HHHHHHHHH     HHHHHHHHHIIIIIIIIII SSSSSSSSSSSSSSS   
`
      let m3 = `
MMMMMMMM               MMMMMMMMEEEEEEEEEEEEEEEEEEEEEEMMMMMMMM               MMMMMMMMEEEEEEEEEEEEEEEEEEEEEE
M:::::::M             M:::::::ME::::::::::::::::::::EM:::::::M             M:::::::ME::::::::::::::::::::E
M::::::::M           M::::::::ME::::::::::::::::::::EM::::::::M           M::::::::ME::::::::::::::::::::E
M:::::::::M         M:::::::::MEE::::::EEEEEEEEE::::EM:::::::::M         M:::::::::MEE::::::EEEEEEEEE::::E
M::::::::::M       M::::::::::M  E:::::E       EEEEEEM::::::::::M       M::::::::::M  E:::::E       EEEEEE
M:::::::::::M     M:::::::::::M  E:::::E             M:::::::::::M     M:::::::::::M  E:::::E             
M:::::::M::::M   M::::M:::::::M  E::::::EEEEEEEEEE   M:::::::M::::M   M::::M:::::::M  E::::::EEEEEEEEEE   
M::::::M M::::M M::::M M::::::M  E:::::::::::::::E   M::::::M M::::M M::::M M::::::M  E:::::::::::::::E   
M::::::M  M::::M::::M  M::::::M  E:::::::::::::::E   M::::::M  M::::M::::M  M::::::M  E:::::::::::::::E   
M::::::M   M:::::::M   M::::::M  E::::::EEEEEEEEEE   M::::::M   M:::::::M   M::::::M  E::::::EEEEEEEEEE   
M::::::M    M:::::M    M::::::M  E:::::E             M::::::M    M:::::M    M::::::M  E:::::E             
M::::::M     MMMMM     M::::::M  E:::::E       EEEEEEM::::::M     MMMMM     M::::::M  E:::::E       EEEEEE
M::::::M               M::::::MEE::::::EEEEEEEE:::::EM::::::M               M::::::MEE::::::EEEEEEEE:::::E
M::::::M               M::::::ME::::::::::::::::::::EM::::::M               M::::::ME::::::::::::::::::::E
M::::::M               M::::::ME::::::::::::::::::::EM::::::M               M::::::ME::::::::::::::::::::E
MMMMMMMM               MMMMMMMMEEEEEEEEEEEEEEEEEEEEEEMMMMMMMM               MMMMMMMMEEEEEEEEEEEEEEEEEEEEEE
`
      console.log('%c'+m1,'background:#333333;color:#bada55');
      console.log('%c'+m2,'background:#333333;color:#bada55');
      console.log('%c'+m3,'background:#333333;color:#bada55');
    },
    methods: {
      getStr: function () {
        this.str = this.do.store.get();
      },
      getS: async function () {
        let req = {
          realm: this.def[0]
        };
        let resp = await this.api.request.post('/season/get', req);
        if (resp.status == 200 && resp.data) {
          let d = resp.data;
          if (d.message) {
            let s = d.message, i = CURRENT_I;
            if (s[i]) {
              this.s = s[i];
              await this.getSl();
            }
          }
        }
      },
      getSl: async function () {
        let r = this.def[0],
            d;
        let req = {
          realm: r
        };
        let resp = await this.api.request.post('/season/get', req);
        if (resp.status == 200 && resp.data) {
          d = resp.data;
          let s = d.message;
          if (Array.isArray(s)) {
            this.sl = s.length;
          }
        }
      },
      getU: async function () {
        let resp = await this.api.request.get('/user/me'), data;
        if (resp.status == 200 && resp.data) {
          data = resp.data;
          if (data['message']) {
            if (data.message.observer) {
              this.o = data.message.observer;
              if (this.o['agentName']) {
                this.un = this.o.agentName.replace(/\s/g, '');
              }
              // console.log('Observer', this.o);
            }
          }
        }
      },
      /**
       * @param {Number} n : Index
       */
      getTpl: async function () {
        let i = CURRENT_I;
        let r = this.def[0];
        let d, s;
        let req = {
          index: i, 
          realm: r
        };
        let proof, verifiedProof = false;
        // No proof required
        if (i == CURRENT_I) {
          let resp = await this.api.request.post('/puzzle/get', req);
          if (resp.status == 200 && resp.data) {
            d = resp.data;
            if (d.message) {
              this.make(d.message);
            }
          }
        }
        // Proof required
        else {
          // Prover
          if (this.str[r]) {
            let str = this.str[r];
            if (typeof str[CURRENT_I - 1] == 'object') {
              if (str[CURRENT_I - 1].proof) {
                proof = str[CURRENT_I - 1].proof;
                s = str[CURRENT_I - 1].secret;
                if (typeof s == 'string') {
                  let t = this.prove(proof, s);
                  if (t === true)
                    verifiedProof = true;
                }
              }
            }
          }
          // Verified proof
          if (verifiedProof) {
            req.proof = proof;
            let resp = await this.api.request.post('/puzzle/get', req);
            if (resp.status == 200 && resp.data) {
              d = resp.data;
              if (d.message) {
                this.a = true;
                this.make(d.message);
              }
            }
          }
        }
        // console.log("Proof =>", verifiedProof);
      },
      /**
       * @param {Object} m : Response object.data
       */
      make: async function (m) {
        this.p.id = (m.id) ? m.id : null;
        this.p.title = (m.title) ? m.title : null;
        this.p.description = (m.description) ? m.description : null;
        this.p.secret = (m.secret) ? m.secret : null;
        this.p.operation = (m.operation) ? m.operation : null;
        this.p.previous = (m.previous) ? m.previous : null;
        this.p.payload = (m.payload) ? m.payload : null;
        this.p.hint = (m.hint) ? m.hint : null;
        this.p.fields = (m.fields) ? m.fields : null;
        this.p.template = (m.template) ? m.template : null;
        this.p.tags = (m.tags) ? m.tags : null;
        this.p.category = (m.category) ? m.category : null;
        this.p.points = (m.points) ? m.points : null;
        this.p.geoquestr = (m.geoquestr) ? m.geoquestr : null;

        if (this.p.payload) {
          if (this.p.payload['format']) {
            this.p.format = this.p.payload.format;
          }
        }

        // console.log('Current Puzzle =>', this.p);
      },
      loadM: function (l) {
        return this.z.out(l);
      },
      initG: function(n,g=null) {
        if (window['gmap']) {
          delete window.gmap
        }
        if (g !== null) {
          this.geo.g = g;
          this.geo.state = (g+1);
          this.geo.l = 0;
        } else {
          this.geo.l = n;
        }
        this.geo.x = this.p.geoquestr.games[this.geo.g].locations[this.geo.l];
        let s=this.loadM(this.geo.x).split(','),si=parseFloat(s[0].replace('@','')),sii=parseFloat(s[1]),t={lat:si,lng:sii};
        window.gmap = new window.google.maps.StreetViewPanorama(
          document.getElementById("pano"),{
            position:t,
            controlSize: 0,
            motionTracking: false,
            motionTrackingControl: false,
            streetViewControl: false,
            linksControl: false,
            panControl: false,
            imageDateControl: false,
            addressControl: false,
            showRoadLabels: false,
            enableCloseButton: false,
            zoomControl: false,
            addressControlOptions: {position: window.google.maps.ControlPosition.BOTTOM_CENTER}
          }
        );
      },
      submit: async function () {
        this.geo.report = {
          msg: null, 
          success:null
        };
        let req = {
          submit: JSON.stringify(this.geo.res)
        };
        let resp = await this.api.request.post('/geoquestr', req);
        if (resp.status == 200 && resp.data) {
          let d = resp.data;
          if (d.message) {
            this.geo.report = {
              success: d.message.success,
              msg: d.message.content
            };
          }
        }
      },
      /**
       * @param {String} s : Public key
       * @param {String} h : Private Proof
       */
      prove: function (h, s) {
        let v = false;

        if (typeof h !== 'string') {
          return false;
        } else if (h.length !== Config.DEFAULT_CHAR_LENGTH) {
          return false;
        }

        const p = this.h(h, s, Config.DEFAULT_SIZE, Config.DEFAULT_DEPTH);

        if (p === true)
          v = true;

        return v;
      },
      /**
       * @param {String} a : Selected answer (Country or State/Province)
       */
      msAnswer: function (a) {
        this.geo.res[this.geo.g][this.geo.l] = a;
        this.d = false;
        // XXX DBG:
        // console.log("Map Selection", {mapSelection: a, answersArray: this.geo.res});
      },
      /**
       * @param {Object} s : Secret
       */
      retain: function (s) {
        if (typeof s !== 'object') {
          return;
        } else if (!s.length) {
          return;
        } else if (s[0].length !== Config.DEFAULT_CHAR_LENGTH || s[1].length !== Config.DEFAULT_CHAR_LENGTH) {
          return;
        }
        this.p.proof = s[0];
        let c = JSON.stringify(this.p);
        c = JSON.parse(c);
        c.proof = s[1];
        if (!this.do.store.update(c, this.def[0], CURRENT_I)) {
          console.warn("Failed updating storage, your solution has not been saved");
        }
      },
      copen: function (b) {
        this.co = b;
      },
      gopen: function () {
        this.gd = true;
        let b = document.getElementsByTagName('body');
        b[0].style.overflow = 'hidden';
      },
      gclose: function () {
        this.gd = false;
        let b = document.getElementsByTagName('body');
        b[0].style.overflow = '';
      },
      closeGm: function () {
        if (this.geo.res.length) {
          localStorage.setItem('_u_meme1', JSON.stringify(this.geo.res));
        }
        this.geo.state = 6
      },
      mtoggle: function () {
        this.d = !this.d;
      }
    }, 
    computed: {
      can: function () {
        let c;
        if (!this.geo) {
          return false;
        } else if (!this.geo.res) {
          return false;
        } else if (!this.geo.res.length) {
          return false;
        }
        for (let i = 0; i < this.geo.res.length; i++) {
          for (let j = 0; j < this.geo.res[i].length; j++) {
            if (!this.geo.res[i][j]) {
              c = false
              return false;
            }
            if (i == (this.geo.res.length-1) && j == (this.geo.res.length[i]-1)) {
              c = true;
            }
          }
        }
        return c;
      }
    }
  }
</script>

<style scoped>
.wr {
  position: absolute;
  right: 0;
  left: 0;
}
.helper-bar {
  position: fixed;
  bottom: 30px;
  right: 2em;
  border-radius: 20%;
  background-color: rgba(148,49,91,0.1);
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  padding: 0.25em;
  cursor: pointer;
  border: 1px solid rgba(255,112,112,0.25);
  font-size: 1.5em;
  z-index: 1000;
}
.helper-bar:hover {
  box-shadow: 0 0 5px 10px rgba(230,0,115,0.3);
  text-shadow: 0 0 20px #eee, 0 0 30px #eee, 0 0 40px #ff7070, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff7070;
}
.helper-bar > .icon-game {
  position: relative;
  top: 2px;
}
.ctf-banner {
  background-image: url("https://uanon.s3.amazonaws.com/backgrounds/3ab2ba644a304a0f022cf0b5d26c9e926111defd244c5270d8c77ee63662f9bc.png");
  background-size: cover;
}
.ctf-label, div.tags {
  display: inline;
  font-weight: 500;
  text-shadow: 0 2px 2px #333;
}
.ctf-banner ul {
  padding: 3rem;
}
.ctf-meta {
  background: -webkit-linear-gradient(transparent, rgba(230,0,115,0.8)) left repeat;
  margin-top: -4em;
  margin-bottom: -3.2em;
  margin-left: -32px;
  margin-right: -32px;
  border-radius: 1em;
}
.ctf-banner ul, .ctf-banner ul li {
  list-style: none;
}
.ctf-banner ul li {
  line-height: 1.25rem;
}
.ctf-banner ul li span, .ctf-banner ul li div.tags {
  font-style: italic;
}
div.instructions {
  margin-top: 2em;
  margin-bottom: 2em;
}
#games_list {
  display: flex;
  justify-content: space-between;
}
#games_list .jumbotron.game {
  max-width: 275px;
  margin-right: 0.25em;
}
#active-game {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  z-index: 1000;
}
#active-game.state-0,
#active-game.state-6,
#active-game.state-7 {
  display: none;
}
#pano {
  height: 100%;
  width: 100%;
}
#ctrl-r {
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #333;
  right: 0;
  left: 0;
  top: 0;
  max-height: 15vh;
  z-index: 1100;
}
#ctrl1, #ctrl2, #ctrl3 {
  padding: 1em;
  display: flex;
  flex-direction: column;
}
.rowr button {
  margin-right: 1.5em;
}
#ctrl3 .close-x span {
  font-size: 1.2em;
  position: relative;
  top: -50px;
  right: -5px;
}
.close-x.report span {
  font-size: 1.2em;
  position: relative;
  top: 20px;
  z-index: 100;
}
.anstg {
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
  position: relative;
  top: -15px;
  color: #ff7070 !important;
}
ul.answers {
  padding-left: 0;
  list-style: none;
}
div.result > div > div {
  position: relative;
  border-radius: 0.25em;
  padding: 1em;
}
div.result {
  margin-bottom: 4em;
}
.autumn-wrap.copen {
  margin-bottom: 70vh;
}
</style>