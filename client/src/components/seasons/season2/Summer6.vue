<template>

  <div class="summer-wrap console" v-if="rdy && rigged">
    <div class="content-s summer puzzle-content" v-if="p.id && rigged['campaign']">
      <div class="summer-inner" v-html="p.template" v-if="p.template"></div>
      <div class="jumbotron pyramidscheme" v-if="rigged.campaign">
        <h3 v-if="rigged.campaign.president && rigged.campaign.president.candidate !== o.tzAddress">{{rigged.campaign.president.display}} is the<span v-if="rigged.campaign.president.stolen">&nbsp;Illegitimate</span> President</h3>
        <h3 v-if="rigged.campaign.president.candidate == o.tzAddress">You are the<span v-if="rigged.campaign.president.stolen">&nbsp;Illegitimate</span> President</h3>
        <h3 v-if="!rigged.campaign.president">No one is the President</h3>
        <p class="time-remaining"><span class="deadline">{{ddl}}</span></p>
        <div class="float-right ruler-ctrl">
          <button class="btn btn-primary btn-rules" @click="k();">Rules</button>
        </div>
      </div>
      <!-- Tab Nav. -->
      <ul class="nav nav-tabs" id="tabn" role="tablist">
        <li class="nav-item">
          <a class="nav-link" :class="{active: st==0}" id="results" data-toggle="tab" href="#results-c" role="tab" aria-controls="results" aria-selected="true" @click="state(0);">Election</a>
        </li>
        <li class="nav-item" v-if="rigged.campaign.president.candidate !== o.tzAddress">
          <a class="nav-link" :class="{active: st==1}" id="profile" data-toggle="tab" href="#profile-c" role="tab" aria-controls="profile" aria-selected="false" @click="state(1);">Vote</a>
        </li>
        <li class="nav-item" v-if="rigged.campaign.president.candidate == o.tzAddress">
          <a class="nav-link" :class="{active: st==2}" id="profile" data-toggle="tab" href="#president-c" role="tab" aria-controls="profile" aria-selected="false" @click="state(2);">President</a>
        </li>
      </ul>

      <!-- Tab Content -->
      <div class="tab-content" id="tabs">
        <div class="tab-pane fade" :class="{active: st==0, show: st==0}" id="results-c" role="tabpanel" aria-labelledby="results-tab" v-if="st==0">
          
          <div class="voting-data" v-if="rigged.campaign.votes">
            <!-- Votes -->
            <table class="election election-t table" v-if="rigged.campaign.votes.length">
              <thead>
                <tr class="el-item head">
                  <th class="h blood" scope="col">Player</th>
                  <th class="h blood" scope="col">Votes</th>
                </tr>
              </thead>
              <tbody>
                <tr class="el-item" v-for="(p, i) in vt" :key="i">
                  <td :alt="p.candidate" :title="p.candidate">{{i+1}}. {{p.display}}</td>
                  <td>{{p.votes}}</td>
                </tr>
              </tbody>
            </table>
            <!-- No Votes -->
            <div class="no-votes" v-if="!rigged.campaign.votes.length">
              <p>This campaign has no activity.</p>
            </div>
            <!-- Get Votes -->
            <div class="refresh-v">
              <button class="btn btn-primary" @click="refresh();"><span class="fa fa-redo" :class="{roll: ld}"></span></button>
            </div>
            <div class="loading" v-if="ld">
              <p v-if="ld">Loading...</p>
            </div>
          </div>

        </div>
        <div class="tab-pane fade" :class="{active: st==1, show: st==1}" id="profile-c" role="tabpanel" aria-labelledby="profile-tab" v-if="st==1">
          <div class="profile-data">
            <div class="unregistered" v-if="!rg">
              <p>You're not registered as a voter. Use the `Enroll` button to join this campaign.</p>
              <button class="btn btn-primary" @click="enroll();" v-if="!ld">Enroll</button>
              <div class="loading" v-if="ld">
                <p v-if="ld">Loading...</p>
              </div>
            </div>
            <div class="registered" v-if="rg">
              <div class="select-candidate">
                <select class="form-control question item" v-model="sc" v-if="rigged.campaign.votes.length">
                  <option disabled value="">Select a candidate to vote for</option>
                  <option v-for="(p, i) in vt" :key="i" :value="p.candidate">{{p.display}}<span v-if="p.candidate == o.tzAddress">&nbsp;(you)</span></option>
                </select>
              </div>
              <button class="btn btn-primary" @click="vote();" v-if="!ld" :disabled="!sc">Vote</button>
              <div class="loading" v-if="ld">
                <p v-if="ld">Loading...</p>
              </div>
              <div class="feedbk bg-danger" v-if="vs==false">
                <span class="float-right" @click="vs=null;">&#x2715;</span>
                <p>Error submitting vote. Your vote was not cast.</p>
              </div>
              <div class="feedbk bg-success" v-if="vs==true">
                <span class="float-right" @click="vs=null;">&#x2715;</span>
                <p>Your vote was successully cast</p>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" :class="{active: st==2, show: st==2}" id="president-c" role="tabpanel" aria-labelledby="president-tab" v-if="st==2 && rigged.campaign.president.candidate == o.tzAddress">
          <div class="presidents-data">
            <p v-if="!BigP">Welcome President, use the `Fetch Documents` button to review your dossier</p>
            <p v-if="BigP">Your dossier holds the following:</p>
            <div v-if="BigP">
              <ul class="secret">
                <li v-for="(s, i) in BigP" :key="i">{{i+1}}. {{s}}</li>
              </ul>
            </div>
            <button class="btn btn-primary fetch-doc" v-if="!BigP" @click="fetch();">Fetch Documents</button>
            <div class="loading" v-if="ld">
              <p v-if="ld">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-s danger no-access" v-if="!a && i > 0">
      <p class="no-access descr" v-html="w"></p>
      <router-link to="/descend">Back</router-link>
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
      v-bind:rst="false"
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
      v-bind:un="un"
      v-if="p.secret && un"
      @proof="retain"
      @copen="copen"
    ></Console>
  </div>

  <!-- Rules -->
  <div class="hierarchies" v-if="p.rules && sh">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog modal-dialog-e">
            <div class="modal-content modal-content-e">
              <div class="modal-header">
                <h4 class="modal-title"><span v-if="p.title">{{p.title}} - </span>Rules</h4>
                <div type="button" class="close" @click="k();">
                  <span class="close-x" aria-hidden="true">&times;</span>
                </div>
              </div>
              <div class="modal-body">
                <div class="might-of-the-ruler" v-if="Array.isArray(p.rules)">
                  <ul class="rulers">
                    <li v-for="(r,i) in p.rules" :key="i">{{i+1}}. {{r}}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
  import * as api from '../../../util/api';
  import store from '../../../util/storage';
  import { verifyProof } from '../../../util/hasher';
  import * as Config from '../../../conf/constants';

  import Console from '../../children/soulve/Console.vue';
  import Graphical from '../../children/soulve/Graphical.vue';

  const CURRENT_I = 5;
  const L = 5;

  const md5 = require('md5');
  const e = (len) => {
    let r = '', c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', l = c.length, i = 0;
    for (i; i < len; i++) {
      r += c.charAt(Math.floor (Math.random () * l));
    }
    return r;
  };
  const h = () => {
    let r = Math.floor(5 + Math.random() * 10);
    return r;
  };
  const g = (t,z) => {
    const w = [t,z];
    const b = w.join('');
    return b;
  };
  const getWork = (t,z) => {
    let b = g(t,z);
    let r = h();
    let p = e(r);
    let w = md5(b+p);
    let l = L;
    let c = w.substr(0,l); // ༼ຈل͜ຈ༽ﾉ 2 legit ヽ༼ຈل͜ຈ༽ﾉ
    return {h:c,s:p}
  };

  export default {
    name: 'Summer 5',
    components: { Console, Graphical },
    data: () => ({
      a: false,
      c: Config,
      cd: false,
      gd: false,
      api: api,
      h: verifyProof,
      i: CURRENT_I,
      p: {
        id: null,
        title: null,
        description: null,
        secret: null,
        template: null
      },
      s: null,
      t: null,
      v: true,
      w: Config.notify.DEFAULT_PLAYER_WARNING,
      do: store,
      ld: false,
      sc: '',
      sh: false,
      sl: null,
      st: 0,
      sv: null,
      fi: null,
      un: null,
      vs: null,
      str:{},
      ddl: '',
      def: ['summer', 2],
      rdy: false,
      argT: [false, false],
      BigP: null,
      rigged: null,
      GetWoke: getWork
    }),
    mounted: async function () {
      this.getStr();
      await this.getU();
      await this.getS();
      await this.getTpl();
      await this.getEl();
      this.rdy = true;
      let t = this.timer();
      if (t && t !== 'campaign ended') {
        setInterval(() => {
          this.ddl = this.timer();
        }, 1000);
      } else {
        this.ddl = t;
      }
    },
    methods: {
      getStr: function () {
        this.str = this.do.store.get();
        // console.log('Store =>', this.str);
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
        if (i == 0) {
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
      getEl: async function () {
        // Fetch election
        let resp = await this.api.request.get('/election/votes');
        if (resp.status == 200 && resp.data) {
          if (resp.data.message) {
            this.rigged = resp.data.message;
          }
        }
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
        this.p.rules = (m.rules) ? m.rules : null;

        if (this.p.payload) {
          if (this.p.payload['format']) {
            this.p.format = this.p.payload.format;
          }
        }

        if (Array.isArray(this.p.files)) {
          for (let i = 0; i < this.p.files.length; i++) {
            let f = this.p.files[i].split('/');
            f = f[f.length - 1];
            this.p.files[i] = f;
          }
        }
        // console.log('Current Puzzle =>', this.p);
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
       * @param {String} s : Secret
       */
      retain: function (s) {
        if (typeof s !== 'string') {
          return;
        } else if (s.length !== Config.DEFAULT_CHAR_LENGTH) {
          return;
        }
        this.p.proof = s;
        // console.log([this.p, this.def[0], CURRENT_I]);
        if (!this.do.store.update(this.p, this.def[0], CURRENT_I)) {
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
      k: function () {
        if (!this.p) {
          console.warn("Error loading rules.");
          return;
        } else if (!this.p.rules) {
          console.warn("Error loading rules.");
          return;
        } else {
          this.sh = !this.sh;
          let b;
          if (this.sh){
            b = document.getElementsByTagName('body');
            b[0].style.overflow = 'hidden';
          } else {
            b = document.getElementsByTagName('body');
            b[0].style.overflow = '';
          }
        }
      },
      state: function (n) {
        if (typeof n !== 'number') {
          return;
        } else if (n < 0 || n > 2) {
          return;
        }
        switch (n) {
          case 0: {
            this.getEl();
            this.st = 0;
            break;
          }
          case 1: {
            this.st = 1;
            break;
          }
          case 2: {
            this.st = 2;
            break;
          }
        }
      },
      refresh: async function () {
        this.ld = true;
        await this.getEl();
        this.ld = false;
      },
      enroll: async function () {
        this.ld = true;
        let resp = await this.api.request.post('/election/register', {register: true});
        if (resp.status == 200 && resp.data) { // Registration successful;
          await this.getEl();
          this.ld = false;
        } else {
          this.ld = false;
        }
      },
      vote: async function () {
        if (!this.sc) {
          return;
        }
        // Get woke
        const t = new Date().getTime();
        const z = this.o.tzAddress;
        const w = this.GetWoke(t,z);
        // Go vote
        this.ld = true;
        let req = {
          timestamp: t,
          vote: this.sc,
          hash: (w.h) ? w.h : null,
          seed: (w.s) ? w.s : null
        };
        try {
          let resp = await this.api.request.post('/election/vote', req);
          if (resp.status == 200 && resp.data) { // Vote successful;
            await this.getEl();
            this.ld = false;
            this.vs = true;
          } else {
            this.ld = false;
            this.vs = false;
          }
        } catch (e) {
          this.ld = false;
          this.vs = false;
        }
      }, 
      fetch: async function() {
        // Fetch election
        this.ld = true;
        try {
          let resp = await this.api.request.get('/election/president');
          if (resp.status == 200 && resp.data) {
            if (resp.data.message) {
              this.BigP = JSON.parse(resp.data.message);
            }
            this.ld = false;
          } else {
            this.ld = false;
          }
        } catch (e) {
          console.warn('Error fetching presidential dossier', e);
          this.ld = false;
        }
      },
      timer: function () {
        if (!this.rigged) {
          return '';
        } else if (!this.rigged.campaign) {
          return '';
        } else if (!this.rigged.campaign.deadline) {
          return '';
        } else if (typeof this.rigged.campaign.deadline !== 'number') {
          return '';
        }
        let r = '', d = +new Date(this.rigged.campaign.deadline) - +new Date();
        if (d>0) {
          const p = {
            h: Math.floor((d/(1000*60*60))%24),
            m: Math.floor((d/1000/60)%60),
            s: Math.floor((d/1000)%60),
          };
          r = Object.keys(p).map(pp => {
            return `${p[pp]}${pp}`;
          }).join(" ");
        } else {
          this.getEl();
          return 'campaign ended';
        }
        return r;
      }
    },
    computed: {
      rg: function () {
        if (!this.o) {
          return false;
        } else if (!this.o.tzAddress) {
          return false;
        } else if (!this.rigged) {
          return false;
        } else if (!this.rigged.campaign) {
          return false;
        } else if (!this.rigged.campaign.voters) {
          return false;
        } else if (typeof this.rigged.campaign.voters !== 'object') {
          return false;
        } else if (!this.rigged.campaign.voters[this.o.tzAddress]) {
          return false;
        } else {
          return true;
        }
      },
      vt: function () {
        if (!this.rigged) {
          return [];
        } else if (!this.rigged.campaign) {
          return [];
        } else if (!this.rigged.campaign.votes) {
          return [];
        } else if (!this.rigged.campaign.votes.length) {
          return;
        } else {
          let v = this.rigged.campaign.votes;
          v.sort((a,b) => {
            if (a['votes'] && b['votes'])
              return b.votes - a.votes
          });
          return v;
        }
      }    
    }
  }
</script>

<style scoped>
.summer-wrap {
  position: absolute;
  width: 100%;
}
.helper-bar {
  position: fixed;
  bottom: 30px;
  right: 5em;
  border-radius: 20%;
  background-color: rgba(148,49,91,0.1);
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  padding: 0.25em;
  cursor: pointer;
  border: 1px solid rgba(255,112,112,0.25);
}
.helper-bar span.icon-game {
  position: relative;
  top: 3px;
}
.helper-bar:hover {
  box-shadow: 0 0 5px 10px rgba(230,0,115,0.3);
  text-shadow: 0 0 20px #eee, 0 0 30px #eee, 0 0 40px #ff7070, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff7070;
}
.nav-tabs {
  border-bottom: 1px solid #ff7070;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-link:hover {
  background-color: #ff7070;
  border-color: #ff7070;
  color: #ffffff;
}
.pyramidscheme {
  background-image: url("/img/0efbeb172d372829e597dcb2d602aa2c5a8fd831ba1e78669876f4032fc25642.png");
  background-size: cover;
}
.voting-data, .profile-data, .presidents-data {
  margin-top: 2em;
}
.loading {
  height: 40vh;
  background-image: url('/img/loading.gif');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.form-control.question {
  max-width: 350px;
  margin-bottom: 2em;
}
.feedbk {
  padding: 1rem;
  border-radius: 4px;
  margin-top: 2em;
}
.feedbk span {
  cursor: pointer;
  position: relative;
  top: -10px;
}
ul {
  list-style: none;
  padding-left: 0;
}
.ruler-ctrl {
  position: relative;
  top: -80px;
}
.modal-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-body {
  clear: both;
}
.modal-content {
  max-height: 90vh;
  overflow-y: auto;
}
.modal-dialog-e {
  max-width: 60vw;
}
ul.rulers li {
  font-size: 1.25em;
  margin-bottom: 1rem;
  padding: 1em;
  border-radius: 2em;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
}
ul.rulers li:nth-child(odd) {
  background-color: #333333;
}
ul.rulers li:nth-child(even) {
  background-color: rgb(148,49,91);
}
.modal-body {
  overflow-y: auto;
}
div.refresh-v {
  margin-top: 2em;
}
.fa-redo.roll {
  -webkit-animation:spin 1s linear infinite;
  -moz-animation:spin 1s linear infinite;
  animation:spin 1s linear infinite;
}

@-moz-keyframes spin { 
  100% {
    -moz-transform: rotate(360deg); 
  } 
}
@-webkit-keyframes spin { 
  100% { 
    -webkit-transform: rotate(360deg); 
  } 
}
@keyframes spin { 
  100% { 
    -webkit-transform: rotate(360deg); transform:rotate(360deg); 
  } 
}
</style>