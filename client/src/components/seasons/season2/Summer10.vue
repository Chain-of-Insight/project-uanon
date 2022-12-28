<template>
  <div class="summer-wrap console" v-if="rdy">

    <div class="content-s summer puzzle-content" v-if="p.id">
      <div class="wr" v-if="p.files && p.metadata">
        <!-- To break a butterfly upon a wheel -->
        <div class="content-i" v-if="st==0">
          <iframe id="wheel" v-if="p.metadata.youtube" :src="'https://www.youtube.com/embed/' + p.metadata.youtube + '?rel=0&amp;autoplay=1&mute=0&enablejsapi=1&controls=0'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <!-- China Girl -->
        <div class="cwr" v-if="st==1">
          <img class="china-girl" :alt="p.metadata.alt" :title="p.metadata.alt" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/' + p.files[0]" v-if="p.files[0] && p.metadata.alt" />
        </div>
      </div>
    </div>

    <div class="content-s danger no-access" v-if="!a && i > 0">
      <p class="no-access descr" v-html="w"></p>
      <router-link to="/descend">Back</router-link>
    </div>

    <!-- Soulve -->
    <div class="open-c inner" v-if="st==1">
      <p class="helper-bar float-right" @click="gopen();" v-if="p.secret">
        <span class="icon icon-game"></span>
      </p>
    </div>

    <div class="v-ctrl blood skip" @click="st=1;" v-if="st==0 && wa">
      <span class="icon fa fa-step-forward" title="Skip video"></span>
    </div>

    <div class="v-ctrl blood" @click="sound();" v-if="st==0">
      <span class="icon icon-volume_up" title="Toggle sound" v-if="v"></span>
      <span class="icon icon-volume_off" title="Toggle sound" v-if="!v"></span>
    </div>
    <Graphical 
      v-bind:s="p.secret"
      v-bind:r="def[0]"
      v-bind:f="1"
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
      v-bind:l="true"
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

  import Console from '../../children/soulve/Console.vue';
  import Graphical from '../../children/soulve/Graphical.vue';

  const CURRENT_I = 9;

  export default {
  name: 'Summer 10',
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
    sl: null,
    st: 0,
    sv: null,
    fi: null,
    un: null,
    wa: false,
    str:{},
    sts: [0,1],
    def: ['summer', 2],
    rdy: false,
    argT: [false, false],
    proof: null
  }),
  mounted: async function () {
    this.getStr();
    await this.getU();
    await this.getS();
    await this.getTpl();
    this.rdy = true;
    setTimeout(() => {
      this.st = 1;
      window.localStorage.setItem('_c_ag', true);
    }, 135000);
    if (window.localStorage.getItem('_c_ag')) {
      this.wa = true;
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
          if (typeof str[CURRENT_I - 4] == 'object') {
            if (str[CURRENT_I - 4].proof) {
              proof = str[CURRENT_I - 4].proof;
              s = str[CURRENT_I - 4].secret;
              if (typeof s == 'string') {
                let t = this.prove(proof, s);
                if (t === true) {
                  verifiedProof = true;
                  this.proof = proof;
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
      this.p.format = (this.p.payload.format) ? this.p.payload.format : null;
      this.p.hint = (m.hint) ? m.hint : null;
      this.p.files = (m.files) ? m.files : null;
      this.p.fields = (m.fields) ? m.fields : 1;
      this.p.template = (m.template) ? m.template : null;
      this.p.metadata = (m.metadata) ? m.metadata : null;
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
    },
    /**
     * @param {?Boolean} s : Optional param to hard mute / unmute instead of toggle
     */
    sound: function (s = null) {
      const y = document.getElementById('wheel');
      if (s == null) {
        this.v = !this.v;
      } else if (s) {
        this.v = true;
      } else {
        this.v = false;
      }
      if (this.v == false) {
        y.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
      } else {
        y.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
      }
    }
  }
}
</script>

<style scoped>
.content-i {
  position: fixed; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%; 
  height: 100%; 
  z-index: -1;
  pointer-events: none;
}
iframe {
  position: relative;
  top: -5%;
  left: -2%;
  width: 100%;
  height: 110%;
  border-radius: 4em;
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
.v-ctrl {
  position: absolute;
  right: 5em;
  bottom: 45px;
  border-radius: 20%;
  padding: 0.25em;
  cursor: pointer;
  border: 1px solid rgba(255,112,112,0.25);
}
.v-ctrl span {
  position: relative;
  top: 3px;
  clear: both;
  cursor: pointer;
}
.v-ctrl:hover {
  box-shadow: 0 0 5px 10px rgba(230,0,115,0.3);
  text-shadow: 0 0 20px #eee, 0 0 30px #eee, 0 0 40px #ff7070, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff7070;
}
.v-ctrl.skip {
  right: 8em;
}
.v-ctrl.skip span {
  font-size: 1.12em;
  margin-left: 0.1em;
  margin-right: 0.1em;
}
.cwr {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: calc(100vh - 50px);
}
.china-girl {
  position: relative;
  height: 90%;
  margin: auto;
  margin-top: 2%;
  margin-bottom: 2%;
  width: auto;
  display: block;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  animation: fadein ease 5s;
  -webkit-animation: fadein ease 5s;
  -moz-animation: fadein ease 5s;
  -o-animation: fadein ease 5s;
  -ms-animation: fadein ease 5s;
  animation-iteration-count: 1;
}
@keyframes fadein {
  0% {opacity:0;}
  25% {opacity:0.25;}
  75% {opacity:0.75;}
  50% {opacity:0.50;}
  100% {opacity:1;}
}
@-moz-keyframes fadein {
  0% {opacity:0;}
  25% {opacity:0.25;}
  75% {opacity:0.75;}
  50% {opacity:0.50;}
  100% {opacity:1;}
}
@-webkit-keyframes fadein {
  0% {opacity:0;}
  25% {opacity:0.25;}
  75% {opacity:0.75;}
  50% {opacity:0.50;}
  100% {opacity:1;}
}
@-o-keyframes fadein {
  0% {opacity:0;}
  25% {opacity:0.25;}
  75% {opacity:0.75;}
  50% {opacity:0.50;}
  100% {opacity:1;}
}
@-ms-keyframes fadein {
  0% {opacity:0;}
  25% {opacity:0.25;}
  75% {opacity:0.75;}
  50% {opacity:0.50;}
  100% {opacity:1;}
}
</style>