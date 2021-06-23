<template>
  <div class="summer-wrap console" v-if="rdy">

    <div class="content-s summer puzzle-content" v-if="p.id">
      <div class="wr" v-if="p.files">
        <!-- Flag waving -->
        <video id="justice" src="https://uanon.s3.amazonaws.com/86638e249dc86d1c04a2c379095bd741d56fc5db4e352d95e82c977610079d59/e65cd14eaa6d589390e20a1b5ae8be3bf4dcee4c355c1b5ab69635f7cff01eba.mov" autoplay muted loop></video>
        <!-- The Queen's Carriage -->
        <div class="diamond-jubilee" :style="'background-image: url('+ c.DEFAULT_STORAGE_BASE + '/' + p.id + '/' + p.files[0] +')'" v-if="p.files[0]"></div>
        <!-- The Queen's Route -->
        <div class="clues" v-if="p.clues">
          <div class="jumbotron jumbotron-c">
            <div class="descr" v-if="p.description">
              <h3>{{p.description}}</h3>
            </div>
            <ul id="the-queens-clues">
              <li class="legend" v-if="p.clues.legend"><span class="olde blood">1.&nbsp;</span><a :href="p.clues.legend" target="_blank">{{p.clues.legend}}</a></li>
              <li class="route" v-if="p.clues.route"><span class="olde blood">2.&nbsp;</span>{{p.clues.route}}</li>
              <li class="journey" v-if="p.clues.journey"><span class="olde blood">3.&nbsp;</span>{{p.clues.journey}}</li>
            </ul>
            <!--
            Message from Hubei province (PLZYfmDEIwz9tm_TvGPOOSaQhb2Vgsf9ar):

            Look up here, I'm in heaven
            I've got scars that can't be seen
            This way or no way
            You know, I'll be free

            The moment you know, you know you'll know
            -->
            <div class="clock-wrapper">
              <svg v-if="b"></svg>
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
      v-bind:fn="p.fieldNames"
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
  import ENC from '../../../util/cipher/aes';

  import Console from '../../children/soulve/Console.vue';
  import Graphical from '../../children/soulve/Graphical.vue';

  import make from '../../../aesthetics/a4';

  const CURRENT_I = 7;

  export default {
  name: 'Summer 8',
  components: { Console, Graphical },
  data: () => ({
    a: false,
    b: make,
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
    w: Config.notify.DEFAULT_PLAYER_WARNING,
    do: store,
    sl: null,
    sv: null,
    fi: null,
    un: null,
    str:{},
    def: ['summer', 2],
    dec: ENC.AES.decrypt,
    rdy: false,
    argT: [false, false],
    proof: null
  }),
  mounted: async function () {
    this.getStr();
    await this.getU();
    await this.getS();
    await this.getTpl();
    await this.ma();
    await this.loadS();
    this.rdy = true;
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
      // console.log(resp);
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
          // console.log('store', str);
          if (typeof str[CURRENT_I - 2] == 'object') {
            if (str[CURRENT_I - 2].proof) {
              proof = str[CURRENT_I - 2].proof;
              s = str[CURRENT_I - 2].secret;
              if (typeof s == 'string') {
                let t = this.prove(proof, s);
                if (t === true) {
                  verifiedProof = true;
                  this.proof = proof;
                  // console.log('proof', this.proof);
                }
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
    ma: async function () {
      setTimeout(() => {
        this.$nextTick(async() => {
          await this.b();
        });
      }, 0);
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
      this.p.files = (m.files) ? m.files : null;
      this.p.fields = (m.fields) ? m.fields : 1;
      this.p.template = (m.template) ? m.template : null;
      this.p.fieldNames = (m.fieldNames) ? m.fieldNames : ['Solution 1', 'Solution 2'];
      if (Array.isArray(this.p.files)) {
        for (let i = 0; i < this.p.files.length; i++) {
          let f = this.p.files[i].split('/');
          f = f[f.length - 1];
          this.p.files[i] = f;
        }
      }
      this.p.clues = (m.clues) ? m.clues : {};
      // console.log('Current Puzzle =>', this.p);
    },
    /**
     * @param {String} s : Public key
     * @param {String} h : Private Proof
     */
     prove: function (h, s) {
      let v = false;

      // console.log('Verifying Proof =>', [h, typeof h]);

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
    loadS: async function () {
      if (!window.document) {
        return;
      } else if (!this.p) {
        return;
      } else if (!this.p.id) {
        return;
      } else if (!this.proof) {
        return;
      }
      let t = this.dec('cbc', '71cf60b89bf3fc12e8752d274a65be2d67a48fc9b167eac0ae746b68d6fdcc0e0299c9b8357d2d83393a4bd415100df1', this.proof);
      let s = document.createElement('script');
      s.setAttribute('src', this.c.DEFAULT_STORAGE_BASE + '/' + this.p.id + '/' + t);
      document.head.appendChild(s);
    },
    /**
     * @param {Object} s : Puzzle
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
    copen: function (b) {
      this.co = b;
    }
  }
}
</script>

<style scoped>
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
#justice {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0;
  animation: fade ease 40s;
  -webkit-animation: fade ease 40s;
  -moz-animation: fade ease 40s;
  -o-animation: fade ease 40s;
  -ms-animation: fade ease 40s;
  animation-iteration-count: 1;
  z-index: -1;
}
.diamond-jubilee {
  position: absolute;
  width: 100vw;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(100vh - 50px);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  animation: fadein ease 40s;
  -webkit-animation: fadein ease 40s;
  -moz-animation: fadein ease 40s;
  -o-animation: fadein ease 40s;
  -ms-animation: fadein ease 40s;
  animation-iteration-count: 1;
}
div.clues {
  position: absolute;
  left: 0;
  right: 0;
  top: 100vh;
  height: 100vh;
  width: 100vw;
}
div.clues .jumbotron {
  position: relative;
  margin: auto;
  margin-top: 6em;
  max-width: 1440px;
  padding: 4em;
  filter: sepia(1);
  font-family: 'AnglicanText';
}
h3 {
  font-size: 4rem;
}
#the-queens-clues {
  list-style: none;
  word-break: break-word;
  font-size: 1.65em;
  padding-left: 0;
  margin-top: 1.25em;
  font-family: 'Special Elite';
}
.olde {
  font-family: 'AnglicanText';
}
svg {
  margin: auto;
  margin-top: 1em;
  margin-bottom: 1em;
  display: block;
}
@keyframes fadein {
  0% {opacity:0;}
  75% {opacity:0;}
  100% {opacity:1;}
}
@-moz-keyframes fadein {
  0% {opacity:0;}
  75% {opacity:0;}
  100% {opacity:1;}
}
@-webkit-keyframes fadein {
  0% {opacity:0;}
  75% {opacity:0;}
  100% {opacity:1;}
}
@-o-keyframes fadein {
  0% {opacity:0;}
  75% {opacity:0;}
  100% {opacity:1;}
}
@-ms-keyframes fadein {
  0% {opacity:0;}
  75% {opacity:0;}
  100% {opacity:1;}
}
@keyframes fade {
  0% {opacity:0;}
  50% {opacity:1;}
  100% {opacity:0;display:none;}
}
@-moz-keyframes fade {
  0% {opacity:0;}
  50% {opacity:1;}
  100% {opacity:0;display:none;}
}
@-webkit-keyframes fade {
  0% {opacity:0;}
  50% {opacity:1;}
  100% {opacity:0;display:none;}
}
@-o-keyframes fade {
  0% {opacity:0;}
  50% {opacity:1;}
  100% {opacity:0;display:none;}
}
@-ms-keyframes fade {
  0% {opacity:0;}
  50% {opacity:1;}
  100% {opacity:0;display:none;}
}
</style>