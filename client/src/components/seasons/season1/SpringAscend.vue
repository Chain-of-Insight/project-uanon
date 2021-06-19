<template>
  <div class="spring-wrap rites-of-spring" v-if="rdy">

    <div class="content-s existence container" v-if="p.id">

      <img class="c" :src="c.DEFAULT_STORAGE_BASE + '/backgrounds/' + p.files[0]" v-if="p.files" />

      <div class="row choice">
        <div class="fear col-6" @click="fear();">
          <a :href="p.morals[0].value" class="enten" target="_blank">FEAR</a>
        </div>
        <div class="trembling col-6" @click="trembling();">
          <a :href="p.morals[1].value" class="eller" target="_blank">TREMBLING</a>
        </div>
      </div>
    </div>

    <div class="content-s danger no-access" v-if="!a && rdy">
      <p class="no-access descr" v-html="w"></p>
      <router-link to="/discover">Back</router-link>
    </div>

    <div v-if="p.id">
      <!-- Soulve -->
      <div class="open-c inner">
        <p class="helper-bar float-right" @click="gopen();" v-if="p.bundle">
          <span class="icon icon-game"></span>
        </p>
      </div>
      <Graphical 
        v-bind:s="p.secret"
        v-bind:r="def[0]"
        v-bind:f="p.fields"
        v-bind:o="gd"
        v-bind:i="0"
        v-bind:p="p"
        v-bind:t="p.title"
        v-bind:l="true"
        v-bind:dd="true"
        v-bind:rst="true"
        v-bind:tx="true"
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
        v-bind:q="true"
        v-bind:l="true"
        v-bind:tx="true"
        v-bind:dl="true"
        v-bind:un="un"
        v-if="p.secret && un"
        @proof="retain"
        @copen="copen"
      ></Console>
    </div>
  </div>
</template>

<script>
  import * as api from '../../../util/api';
  import store from '../../../util/storage';
  import { verifyProof } from '../../../util/hasher';
  import * as Config from '../../../conf/constants';
  
  import Graphical from '../../children/soulve/Graphical.vue';
  import Console from '../../children/soulve/Console.vue';

  const CURRENT_I = 0;

  export default {
    name: 'Spring Ascend',
    components: { Console, Graphical },
    data: () => ({
      a: false,
      c: Config,
      cd: false,
      gd: false,
      api: api,
      asc: false,
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
      def: ['spring+', 0],
      rdy: false,
      argT: [false, false]
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
        // console.log('Store =>', this.str);
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
        let r = this.def[0];
        let d, s;
        let req = {
          index: CURRENT_I, 
          realm: r
        };
        let proof, verifiedProof = false;
        // Proof required
        if (this.str['spring']) {
          let str = this.str['spring'];
          if (typeof str[8] == 'object') {
            if (str[8].proof) {
              proof = str[8].proof;
              s = str[8].secret;
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
              this.asc = true;
              this.make(d.message);
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
        this.p.files = (m.files) ? m.files : null;
        this.p.fields = (m.fields) ? m.fields : null;
        this.p.format = (m.format) ? m.format : null;
        this.p.template = (m.template) ? m.template : null;
        this.p.morals = (m.morals) ? m.morals : ['',''];
        if (Array.isArray(this.p.files)) {
          for (let i = 0; i < this.p.files.length; i++) {
            let f = this.p.files[i].split('/');
            f = f[f.length - 1];
            this.p.files[i] = f;
          }
        }
        this.prep();
        // console.log('Current Puzzle =>', this.p);
      },
      prep: function () {
        if (this.p.id && this.str) {
          let a = [], str = this.str['spring'];
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
      fear: function () {
        if (this.p) {
          if (this.p.morals) {
            window.open(this.p.morals[0].value, '_blank');
          }
        }
      },
      trembling: function () {
        if (this.p) {
          if (this.p.morals) {
            window.open(this.p.morals[1].value, '_blank');
          }
        }
      }
    }
  }
</script>

<style scoped>
.rites-of-spring {
  width: 80vw;
  min-height: 80vh;
  position: absolute;
  left: 10vw;
}
.row.choice {
  text-shadow: 2px 2px #000000;
  font-family: 'Special Elite', cursive;
  text-align: center;
  margin-bottom: 16em;
}
.row.choice {
  color: #ffffff !important;
}
.row.choice:hover {
  color: #000000 !important; /* The darkest purpose of them all... */
}
a {
  color: inherit;
  text-decoration: none;
}
a:hover {
  opacity: 1;
}
.fear, .trembling {
  padding: 3em;
  border-radius: 2em;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  border: 3px solid #000;
  cursor: pointer;
}
.fear:hover, .trembling:hover {
  background: linear-gradient(#fff, #eee);
  text-shadow: 0 0 6px #ff7070;
  border: 3px solid #eee;
  color: #000000 !important;
}
img.c {
  max-width: 100%;
  margin: auto;
  margin-top: 4em;
  margin-bottom: 4em;
  display: block;
  border-radius: 1em;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  animation: transmogrify ease 60s;
  -webkit-animation: transmogrify ease 60s;
  -moz-animation: transmogrify ease 60s;
  -o-animation: transmogrify ease 60s;
  -ms-animation: transmogrify ease 60s;
  animation-iteration-count: infinite;
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
.helper-bar:hover {
  box-shadow: 0 0 5px 10px rgba(230,0,115,0.3);
  text-shadow: 0 0 20px #eee, 0 0 30px #eee, 0 0 40px #ff7070, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff7070;
}
.helper-bar > .icon-game {
  position: relative;
  top: 2px;
}
@keyframes transmogrify {
  0% {filter: hue-rotate(225deg);}
  50% {filter: hue-rotate(25deg);}
  100% {filter: hue-rotate(225deg);}
}
@-moz-keyframes transmogrify {
  0% {filter: hue-rotate(225deg);}
  50% {filter: hue-rotate(25deg);}
  100% {filter: hue-rotate(225deg);}
}
@-webkit-keyframes transmogrify {
  0% {filter: hue-rotate(225deg);}
  50% {filter: hue-rotate(25deg);}
  100% {filter: hue-rotate(225deg);}
}
@-o-keyframes transmogrify {
  0% {filter: hue-rotate(225deg);}
  50% {filter: hue-rotate(25deg);}
  100% {filter: hue-rotate(225deg);}
}
@-ms-keyframes transmogrify {
  0% {filter: hue-rotate(225deg);}
  50% {filter: hue-rotate(25deg);}
  100% {filter: hue-rotate(225deg);}
}
</style>