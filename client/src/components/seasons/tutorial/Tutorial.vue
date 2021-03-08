<template>
  <div id="bg1"></div>
  <div id="bg2"></div>
  <div id="bg3"></div>
  <div class="t-wrap" :class="{console: co}" v-if="rdy">
    <div class="pane-s tutorial">
      <h1 v-if="i !== 3">{{m}}</h1>
    </div>
    <div class="content-s tutorial puzzle-content" v-if="p.id">
      <h3 class="puzzle-title" v-if="p.title && argT[0]">{{p.title}}</h3>
      <p class="puzzle-descr" v-if="p.description && argT[1]">
        <span class="descr">{{p.description}}</span>
      </p>
      <div class="puzzle-tpl" v-if="p.template" v-html="p.template"></div>
      <div class="soulve" v-if="i == 3">
        <button class="btn btn-primary" @click="gopen();">Solve</button>
      </div>
      <div class="open-c inner" v-if="i == 3">
        <p class="helper-bar float-right" @click="gopen();">
          <span class="icon icon-game"></span>
        </p>
      </div>
      <Audio 
        v-bind:p="fx[0].path"
        v-bind:t="fx[0].type"
        v-bind:a="false"
        v-bind:l="false"
        ref="fx"
        v-if="s"
      ></Audio>
    </div>
    <div class="content-s danger no-access" v-if="!a && i > 1">
      <p class="no-access descr" v-html="w"></p>
      <router-link to="/learn">Back</router-link>
    </div>
    <!-- Soulve -->
    <Console 
      v-bind:s="p.secret"
      v-bind:d="cd"
      v-bind:i="i"
      v-bind:r="def[0]"
      v-bind:p="p"
      v-bind:l="(i == sl) ? true : false"
      v-if="p.secret"
      @proof="retain"
      @copen="copen"
    ></Console>
    <Graphical 
      v-bind:s="p.secret"
      v-bind:r="def[0]"
      v-bind:f="fi"
      v-bind:o="gd"
      v-bind:i="i"
      v-bind:p="p"
      v-bind:a="sv"
      v-bind:rst="true"
      v-bind:l="(i == sl) ? true : false"
      v-if="p.secret"
      @proof="retain"
      @gclose="gclose"
    ></Graphical>
  </div>
</template>

<script>
import * as api from '../../../util/api';
import store from '../../../util/storage';
import { verifyProof } from '../../../util/hasher';
import * as Config from '../../../conf/constants';

import Console from '../../children/soulve/Console.vue';
import Graphical from '../../children/soulve/Graphical.vue';
import Audio from '../../children/Audio.vue';

export default {
  name: 'Tutorial',
  components: { Console, Graphical, Audio },
  data: () => ({
    a: false,
    cd: false,
    co: false,
    gd: false,
    api: api,
    h: verifyProof,
    i: null,
    m: 'Tutorial ',
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
    fx: [Config.externals.tutorial3.audio],
    do: store,
    sl: null,
    sv: null,
    fi: null,
    str:{},
    def: ['tutorial', 0],
    rdy: false,
    argT: [false, false]
  }),
  mounted: async function () {
    const T = [1,2,3,4,5];
    if (this.$route.params) {
      if (this.$route.params.id) {
        this.i = parseInt(this.$route.params.id);
        this.m += String(this.i);
        if (T.indexOf(this.i) == -1 || this.$route.params.id.length > 1) {
           return location.href = '/';
        } else {
          this.rdy = true;
        }
        if (!isNaN(this.i)) {
          this.getStr();
          await this.getS();
          await this.getTpl(this.i);
        }
      }
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
          let s = d.message, i = (this.i - 1);
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
    /**
     * @param {Number} n : Index
     */
    getTpl: async function (n) {
      let i = (n - 1);
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
          if (typeof str[(i - 1)] == 'object') {
            if (str[(i - 1)].proof) {
              proof = str[(i - 1)].proof;
              s = str[(i - 1)].secret;
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
      this.p.template = (m.template) ? m.template : null;

      if (Array.isArray(this.p.files)) {
        for (let i = 0; i < this.p.files.length; i++) {
          let f = this.p.files[i].split('/');
          f = f[f.length - 1];
          this.p.files[i] = f;
        }
      }

      // console.log('Current Puzzle =>', this.p);

      switch (this.i) {
        case 3: {
          await this.loadS();
          this.fi = 1;
          break;
        }
      }
    },
    loadS: async function () {
      let s = document.createElement('script');
      s.setAttribute('src', Config.externals.tutorial3.script);
      let c = document.createElement('link');
      c.setAttribute('rel', 'stylesheet');
      c.setAttribute('href', Config.externals.tutorial3.style);
      document.head.appendChild(s);
      document.head.appendChild(c);
      let n = document.getElementById('nav');
      n.style.top = '-3px';
      n.style.left = '-3px';
      await this.$nextTick(function () {
        setTimeout(() => {
          window.generateGrid();
          window.shuffle();
          let t = document.getElementsByTagName('td');
          t.forEach((el) => {
            el.addEventListener('click',() => {
              this.$refs.fx.play();
            })
          });
        }, 1000);
      });
      return;
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
     * @param {String} s : Secret
     */
    retain: function (s) {
      if (typeof s !== 'string') {
        return;
      } else if (s.length !== Config.DEFAULT_CHAR_LENGTH) {
        return;
      }
      this.p.proof = s;
      if (!this.do.store.update(this.p, this.def[0], (this.i - 1))) {
        console.warn("Failed updating storage, your solution has not been saved");
      }
    },
    gopen: function () {
      if (this.i == 3 && window['forgeResult']) {
        this.sv = [];
        this.sv.push(window.forgeResult());
      }
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
#bg1, #bg2, #bg3 {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  border: 0;
  padding: 0;
  min-width: 100vw;
  min-height: 100vh;
  z-index: -1;
}
#bg1 {
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/cf3c6f0f3163a1c4b2aa788af8c88a0c1e9a3c3378e9178e2060ae8707d10898.png');
  background-size: cover;
  background-repeat: repeat;
  opacity: 0;
  animation: fade ease 60s;
  -webkit-animation: fade ease 60s;
  -moz-animation: fade ease 60s;
  -o-animation: fade ease 60s;
  -ms-animation: fade ease 60s;
  animation-iteration-count: infinite;
}
#bg2 {
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/9a63a8814764d3fecbd33fa96565d3d639a1bb08cde0234bb68529481aa45665.png');
  background-size: cover;
  background-repeat: repeat;
  opacity: 0;
  animation: fade ease 45s;
  -webkit-animation: fade ease 45s;
  -moz-animation: fade ease 45s;
  -o-animation: fade ease 45s;
  -ms-animation: fade ease 45s;
  animation-iteration-count: infinite;
}
#bg3 {
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/5820f3104ed541f402e369c6da61ab87cae7e58e0ce56547922a0ba4d57721fd.png');
  background-size: cover;
  background-repeat: repeat;
  opacity: 0.5;
  animation: fade ease 35s;
  -webkit-animation: fade ease 35s;
  -moz-animation: fade ease 35s;
  -o-animation: fade ease 35s;
  -ms-animation: fade ease 35s;
  animation-iteration-count: infinite;
}
.t-wrap {
  padding: 4em;
  max-width: 1440px;
  width: 80vw;
  margin: auto;
  box-shadow: 0 0 5px 10px #333;
  -webkit-box-shadow: 0 0 5px 10px #333;
  -moz-box-shadow: 0 0 5px 10px #333;
  background-color: rgba(148,49,91,0.4);
  border-radius: 1em;
  margin-bottom: 4em;
}
.t-wrap.console {
  margin-bottom: 55vh;
}
.puzzle-content {
  margin-bottom: 8em;
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
  font-size: 0.85em;
}
.helper-bar:hover {
  box-shadow: 0 0 5px 10px rgba(230,0,115,0.3);
  text-shadow: 0 0 20px #eee, 0 0 30px #eee, 0 0 40px #ff7070, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff7070;
}
.helper-bar > .icon-game {
  position: relative;
  top: 2px;
}
@keyframes fade {
  0% {opacity:0;}
  50% {opacity:0.5;}
  100% {opacity:0;}
}
@-moz-keyframes fade {
  0% {opacity:0;}
  50% {opacity:0.5;}
  100% {opacity:0;}
}
@-webkit-keyframes fade {
  0% {opacity:0;}
  50% {opacity:0.5;}
  100% {opacity:0;}
}
@-o-keyframes fade {
  0% {opacity:0;}
  50% {opacity:0.5;}
  100% {opacity:0;}
}
@-ms-keyframes fade {
  0% {opacity:0;}
  50% {opacity:0.5;}
  100% {opacity:0;}
}
</style>