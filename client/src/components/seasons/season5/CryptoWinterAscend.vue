<template>
<!--

You'll rebel to anything (as long it's not challenging)

-->
  <div class="cryptowinter-wrap console" :class="{copen: co}" v-if="rdy">

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

  import Graphical from '../../children/soulve/Graphical.vue';
  import Console from '../../children/soulve/Console.vue';

  const CURRENT_I = 0;

  export default {
    name: 'Cryptowinter Ascension',
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
      api: api,
      str: {},
      img: 0,
      def: ['cryptowinter+', 5],
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
        if (this.str['cryptowinter']) {
          let str = this.str['cryptowinter'];
          req.proof = str[0].proof;
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
          let a = [], str = this.str['cryptowinter'];
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
            this.p.files[i] = '<a href="'+ this.p.filesRaw[i] +'" target="_blank">Generation '+ String((i+1)) +'</a>';
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
.close-x {
  font-size: 2em;
  margin-right: 0.5em;
  color: #ff7070;
  top: -7px;
  position: relative;
}
</style>