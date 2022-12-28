<template>

  <div id="bg1"></div>
  <div id="bg2"></div>
  <div id="bg3"></div>

  <div class="winter-wrap console" :class="{copen: co}" v-if="rdy">
    
    <div class="content-s winter puzzle-content"  v-if="p.id">

      <div class="instructions" v-if="p.description">
        <h4 class="blood">{{ p.title }}</h4>
        <div v-html="p.description"></div>

        <div class="generations" v-if="p.data">
          <div class="generation" v-for="(gen, i) in p.data" :key="i">
            <h4 class="blood">Generation {{(i+1)}}:</h4>
            <iframe :src="p.filesRaw[i]"></iframe>
            <pre class="data" alt="data outputs [symmetries, sub-groups]" title="data outputs recorded at time of collection">
              <label>s:</label>&nbsp;<span>{{gen[0]}}</span>
              <br/>
              <label>g:</label>&nbsp;<span>{{gen[1]}}</span>
              <br/>
            </pre>
          </div>
        </div>

        <div class="souls-crying" v-if="p.soulcries" alt="The crying of souls" title="The crying of souls">
          <div class="agony" v-if="p.soulcries['vinum']">
            <h3 class="blood">The meddled wailing of mental banshees</h3>
            <p class="screaming-from-inside">{{p.soulcries.vinum}}</p>
          </div>
          <div class="agony" v-if="p.soulcries['daemonum']">
            <h3 class="blood">Graverobbers roiling in the stark of startled nights</h3>
            <p class="screaming-from-inside">{{p.soulcries.daemonum}}</p>
          </div>
          <!-- Decrypt Souls -->
          <button class="btn btn-primary tk" @click="k();">Decrypt</button>
        </div>

      </div>
    </div>

    <div class="economy" v-if="sel.sh">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog modal-dialog-e">
              <div class="modal-content modal-content-e">
                <div class="modal-header">
                  <h3 class="blood" v-if="sel.st == 0">Gen4 - Banshees</h3>
                  <h3 class="blood" v-if="sel.st == 1">Gen5 - Graverobbers</h3>
                  <div type="button" class="close" @click="k();">
                    <span class="close-x" aria-hidden="true">&times;</span>
                  </div>
                </div>
                <div class="modal-body">
                  <div class="bd-in" v-if="sel.st == 0">
                    <label for="banshee-s">s:&nbsp;</label>
                    <input 
                      type="text" 
                      class="input form-control"
                      name="banshee-s"
                      v-model="sel.banshees[0]"
                    />
                    <label for="banshee-s">g:&nbsp;</label>
                    <input 
                      type="text" 
                      class="input form-control"
                      name="banshee-g"
                      v-model="sel.banshees[1]"
                    />
                    <button class="btn btn-primary tk" @click="soul(0);" :disabled="!sel.banshees[0] || !sel.banshees[1]">Decrypt</button>
                    <button class="btn btn-inverse tk" @click="sel.st=1;">Switch To Graverobbers</button>

                    <div class="msg success-msg success bg-success" v-if="sel.res[0]">
                      <p>Decrypt succeeded:</p>
                      <p style="font-style:italic;">{{sel.res[0]}}</p>
                      <span class="float-right close-x msg-close-x success" @click="sel.res[0]=null;sel.banshees=[null,null];">×</span>
                    </div>
                    <div class="msg error-msg msg danger bg-danger" v-if="sel.err[0]">
                      <p>{{sel.err[0]}}</p>
                      <span class="float-right close-x msg-close-x err" @click="sel.err[0]=null;sel.banshees=[null,null];">×</span>
                    </div>
                  </div>

                  <div class="bd-in" v-if="sel.st == 1">
                    <label for="graverobbers-s">s:&nbsp;</label>
                    <input 
                      type="text" 
                      class="input form-control"
                      name="banshee-s"
                      v-model="sel.graverobbers[0]"
                    />
                    <label for="graverobbers-s">g:&nbsp;</label>
                    <input 
                      type="text" 
                      class="input form-control"
                      name="graverobbers-g"
                      v-model="sel.graverobbers[1]"
                    />
                    <button class="btn btn-primary tk" @click="soul(1);" :disabled="!sel.graverobbers[0] || !sel.graverobbers[1]">Decrypt</button>
                    <button class="btn btn-inverse tk" @click="sel.st=0;">Switch To Banshees</button>

                    <div class="msg success-msg success bg-success" v-if="sel.res[1]">
                      <p>Decrypt succeeded:</p>
                      <p style="font-style:italic;">{{sel.res[1]}}</p>
                      <span class="float-right close-x msg-close-x success" @click="sel.res[1]=null;sel.graverobbers=[null,null];">×</span>
                    </div>
                    <div class="msg error-msg msg danger bg-danger" v-if="sel.err[1]">
                      <p>{{sel.err[1]}}</p>
                      <span class="float-right close-x msg-close-x err" @click="sel.err[1]=null;sel.graverobbers=[null,null];">×</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Soulve -->
    <div class="open-c inner">
      <p class="helper-bar float-right" @click="handleCopen();" v-if="p.bundle">
        <span class="icon icon-terminal2"></span>
      </p>
      <p class="helper-bar float-right" @click="gopen();" v-if="p.bundle">
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
      v-bind:fn="p.fieldNames"
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
      v-bind:tx="true"
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
  import { verifyProof, generateProofAsString } from '../../../util/hasher';
  import * as Config from '../../../conf/constants';
  import * as aes from '../../../util/cipher/aes';

  import Graphical from '../../children/soulve/Graphical.vue';
  import Console from '../../children/soulve/Console.vue';

  const CURRENT_I = 0;

  export default {
    name: 'Winter Ascension',
    components: { Console, Graphical },
    data: () => ({
      a: false,
      c: Config,
      d: false,
      g: generateProofAsString,
      h: verifyProof,
      i: CURRENT_I,
      m: null,
      o: null,
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
      cd: false,
      co: false,
      gd: false,
      do: store,
      sl: null,
      sv: null,
      fi: null,
      un: null,
      aes: aes.default.AES,
      api: api,
      def: ['winter+', 4],
      sel: {
        banshees: [null,null],
        graverobbers: [null,null],
        res: [null,null],
        err: [null,null],
        sh: false,
        st: 0
      },
      str: {},
      rdy: false,
      argT: [false, false],
    }),
    mounted: async function () {
      this.getStr();
      await this.getU();
      await this.getTpl();
      this.rdy = true;
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
        let r = this.def[0], d, req = {
          index: CURRENT_I, 
          realm: r
        };
        // Assemble proof
        if (this.str['winter']) {
          let str = this.str['winter'];
          req.proof = str[5].proof;
          try {
            let resp = await this.api.request.post('/puzzle/get', req);
            if (resp.status == 200 && resp.data) {
              d = resp.data;
              if (d.message) {
                this.a = true;
                this.make(d.message);
              }
            }
          } catch (e) {
            console.warn('Error resolving puzzle data', e);
          }
        }
      },
      prep: function () {
        if (this.p.id && this.str) {
          let a = [], str = this.str['winter'];
          for (let i = 0; i < str.length; i++) {
            if (str[i]) {
              if (str[i].proof) {
                a[i] = str[i].proof;
              }
            }
          }
          this.p.bundle = a;
          // console.log('Current Puzzle =>', this.p);
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
        this.p.filesRaw = (m.files) ? m.files : null;
        this.p.format = (m.format) ? m.format : null;
        this.p.hint = (m.hint) ? m.hint : null;
        this.p.fields = (m.fields) ? m.fields : null;
        this.p.fieldNames = (m.fieldNames) ? m.fieldNames : null;
        this.p.template = (m.template) ? m.template : null;
        this.p.soulcries = (m.soulcries) ? m.soulcries : null;
        this.p.data = (m.data) ? m.data : null;
        this.p.files = [];

        if (Array.isArray(this.p.filesRaw)) {
          for (let i = 0; i < this.p.filesRaw.length; i++) {
            this.p.files[i] = '<a href="'+ this.p.filesRaw[i] +'" target="_blank">Gen'+ String((i+1)) +'</a>';
          }
        }

        this.prep();
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
      handleCopen: function () {
        document.dispatchEvent(new KeyboardEvent('keypress',{'key':'`'}));
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
      soul: function (n = 0) {
        if (!this.p.soulcries) return;
        if (typeof n !== 'number') n = 0;
        if (n < 0 || n > 1) n = 0;
        this.sel.err[n] = null;
        this.sel.res[n] = null;
        const m = (n == 0) ? this.p.soulcries.vinum : this.p.soulcries.daemonum;
        const k = (n == 0) ? JSON.stringify(this.sel.banshees) : JSON.stringify(this.sel.graverobbers);
        try {
          this.sel.res[n] = this.aes.decrypt('cbc', m, k);
        } catch (e) {
          this.sel.err[n] = String(e);
        }
      },
      k: function () {
        this.sel.sh = !this.sel.sh;
        let b;
        if (this.sh) {
          b = document.getElementsByTagName('body');
          b[0].style.overflow = 'hidden';
        } else {
          b = document.getElementsByTagName('body');
          b[0].style.overflow = '';
        }
      },
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
#bg3 {
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
#bg1 {
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
#bg2 {
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
.winter-wrap {
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
}
.helper-bar:nth-of-type(2n) {
  right: calc(2em + 75px);
}
.helper-bar:hover {
  box-shadow: 0 0 5px 10px rgba(230,0,115,0.3);
  text-shadow: 0 0 20px #eee, 0 0 30px #eee, 0 0 40px #ff7070, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff7070;
}
.helper-bar > .icon-game {
  position: relative;
  top: 2px;
}
.card {
  background: #000;
  box-shadow: inset 0 0 10px #000000;
  border-radius: 5px;
}
.card-header {
  background-repeat: repeat;
  background-color: #333;
  box-shadow: inset 0 0 10px #000000;
  color: #ff7070;
  border-bottom: none;
}
.card-header.open {
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/4aefac88b597b312f457af4c6eb210bfeb2b614d861a9d8a380990e96c8823ab.png');
}
.card-header .btn-link {
  color: #ff7070;
}
.card-body {
  background-color: rgba(0,0,0,0.9);
}
.controls .btn {
  margin-right: 1em;
}
.ifr, .ifr p, .ifr i  {
  display: inline-block;
}
.ifr i {
  margin-left: 1.25em;
}
.winter-wrap.copen {
  margin-bottom: 70vh;
}
div.generations {
  margin-top: 3rem;
  min-width: 942px;
}
div.generation {
  margin-bottom: 1.75rem;
  background: #333;
  border-radius: 1em;
  padding: 1em;
}
iframe {
  min-height: 445px;
  width: 602px;
  border: 1px solid transparent;
}
pre {
  margin-left: 2rem;
  top: -243px;
  position: relative;
}
label {
  float: left;
}
.data span {
  text-align: left;
  right: 50%;
  position: relative;
}
p.screaming-from-inside {
  word-break: break-all;
}
div.souls-crying {
  background: #333333;
  border-radius: 1em;
  padding: 3.5em;
}
.modal-mask {
  position: fixed;
  z-index: 2500;
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
.close {
  float: right;
}
.close.error-reset {
  color: #ffffff;
  opacity: 0.8;
  font-weight: 100;
  position: relative;
  right: 0.25em;
}
.modal-body {
  clear: both;
}
.bd-in .form-control {
  width: 90%;
  margin-bottom: 2em;
}
.btn.tk {
  margin-right: 10px;
}
div.msg {
  padding: 1em;
  border-radius: 8px;
  margin-top: 1em;
}
.msg-close-x {
  position: relative;
}
.msg-close-x.success {
  top: -90px;
}
.msg-close-x.err {
  top: -50px;
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