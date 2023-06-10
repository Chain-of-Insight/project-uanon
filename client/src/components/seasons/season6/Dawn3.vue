<template>

  <div id="bg1" v-if="!ld"></div>
  <div id="bg2" v-if="!ld"></div>
  <div id="bg3" v-if="!ld"></div>

  <div class="dawn-wrap" v-if="rdy">

    <div class="content-s dawn puzzle-content" v-if="p.id">
      
      <div class="content-s dawn puzzle-content" v-if="p.id">
        <div class="instructions" v-if="p.description">
          <h4 class="blood">{{p.description}}</h4>
        </div>

        <div class="data" v-if="p.files">
          <div class="trace" v-for="(trace, i) in traces" :key="'trace'+(i+1)">
            <p>Trace #{{i+1}}</p>
            <img class="img img-responsive img-fluid" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/' + trace" />
          </div>
        </div>

      </div>

    </div>

    <div class="content-s danger no-access" v-if="!a && i > 0">
      <p class="no-access descr" v-html="w"></p>
      <router-link to="/the-new-classic">Back</router-link>
    </div>
  </div>


  <!-- Soulve -->
  <div class="open-c inner">
    <p class="helper-bar float-right" @click="handleCopen();" v-if="p.secret">
      <span class="icon icon-terminal2"></span>
    </p>
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
    v-bind:t="'How to disappear completely'"
    v-bind:dd="false"
    v-bind:l="false"
    v-bind:tx="false"
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

  <div class="loading" v-if="ld"></div>
</template>

<script>
  import * as api from '../../../util/api';
  import store from '../../../util/storage';
  import { verifyProof } from '../../../util/hasher';
  import * as Config from '../../../conf/constants';
  
  import Graphical from '../../children/soulve/Graphical.vue';
  import Console from '../../children/soulve/Console.vue';

  const CURRENT_I = 2;

  export default {
  name: 'Dawn 3',
  components: { Console, Graphical },
  data: () => ({
    a: false,
    c: Config,
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
    w: Config.notify.DAWN_PLAYER_WARNING[CURRENT_I],
    cd: false,
    do: store,
    fi: null,
    gd: false,
    ld: true,
    sl: null,
    sv: null,
    un: null,
    api: api,
    def: ['dawn', 6],
    str: {},
    rdy: false,
  }),
  mounted: async function () {
    this.getStr();
    await this.getU();
    await this.getS();
    await this.getTpl();
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
      let d;
      let req = {
        index: i, 
        realm: r
      };
      // No proof required (only token)
      try {
        let resp = await this.api.request.post('/puzzle/get', req);
        if (resp.status == 200 && resp.data) {
          d = resp.data;
          if (d.message) {
            this.make(d.message);
            this.a = true;
            this.ld = false;
          }
        }
      } catch (e) {
        console.error(e);
        this.a = false;
        this.ld = false;
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
      this.p.rawFiles = (m.files) ? m.files : [];
      this.p.fields = (m.fields) ? m.fields : 1;
      this.p.fieldNames = (m.fieldNames) ? m.fieldNames : null;
      this.p.template = (m.template) ? m.template : null;
      if (Array.isArray(this.p.files)) {
        this.p.files = JSON.stringify(this.p.files);
        this.p.files = JSON.parse(this.p.files);
        for (let i = 0; i < this.p.files.length; i++) {
          let f = this.p.files[i].split('/');
          f = f[f.length - 1];
          this.p.files[i] = '<a href="'+this.c.DEFAULT_STORAGE_BASE+'/'+this.p.id+'/'+f+'" target="_blank">'+f+'</a>';
        }
      }
      if (this.p.payload) {
        this.p.format = (this.p.payload['format']) ? this.p.payload.format : null;
      }
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
  },
  computed: {
    traces: function () {
      if (typeof this.p !== 'object') return [];
      else if (!Array.isArray(this.p.rawFiles)) return [];
      else if (!this.p.rawFiles.length) return [];
      return this.p.rawFiles.filter((file) => {
        if (file.slice(file.length - 4) == ".png") return file;
      });
    },
  },
}
</script>

<style scoped>
.loading {
  height: 40vh;
  background-image: url('/img/loading.gif');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
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
.dawn-wrap {
  padding: 4em;
  max-width: 1440px;
  width: 80vw;
  margin: auto;
  box-shadow: 0 0 5px 10px #333;
  -webkit-box-shadow: 0 0 5px 10px #333;
  -moz-box-shadow: 0 0 5px 10px #333;
  background-color: rgba(148,49,91,0.4);
  border-radius: 1em;
  margin-bottom: 8em;
  text-align: center;
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
.dawn-wrap.copen {
  margin-bottom: 70vh;
}
.instructions h4 {
  text-transform: uppercase;
}
.trace {
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2em;
  margin-bottom: 2em;
  width: 600px;
  max-width: 90%;
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