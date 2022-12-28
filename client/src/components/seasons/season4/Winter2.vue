<template>
  <div class="winter-wrap console" v-if="rdy">

    <div class="content-s winter puzzle-content" v-if="p.id">
      <div class="reactionary" v-if="p.payload">
        <iframe class="visionary content-i" :src="p.payloadRaw.value" title="Reactions Et Cetera"></iframe>
      </div>
    </div>

    <div class="content-s danger no-access" v-if="!a && i > 0">
      <p class="no-access descr" v-html="w"></p>
      <router-link to="/palilalia">Back</router-link>
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
      v-bind:t="p.title"
      v-bind:dd="false"
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
  </div>
</template>

<script>
  import * as api from '../../../util/api';
  import store from '../../../util/storage';
  import { verifyProof } from '../../../util/hasher';
  import * as Config from '../../../conf/constants';
  
  import Graphical from '../../children/soulve/Graphical.vue';
  import Console from '../../children/soulve/Console.vue';

  const CURRENT_I = 1;

  export default {
  name: 'Winter 2',
  components: { Console, Graphical },
  data: () => ({
    a: false,
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
    def: ['winter', 4],
    rdy: false,
    argT: [false, false]
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
      this.p.payload = (m.payload) ? { value: '<a href="' + m.payload.value + '" target="_blank">' + m.payload.value + '</a>', format: m.payload.format }: null;
      this.p.payloadRaw = (m.payload) ? m.payload : null;
      this.p.format = (m.payload) ? m.payload.format : null;
      this.p.hint = (m.hint) ? m.hint : null;
      this.p.files = (m.files) ? m.files : null;
      this.p.fields = (m.fields) ? m.fields : 1;
      this.p.template = (m.template) ? m.template : null;
      if (Array.isArray(this.p.files)) {
        for (let i = 0; i < this.p.files.length; i++) {
          let f = this.p.files[i].split('/');
          f = f[f.length - 1];
          this.p.files[i] = f;
        }
      }
      console.log('Current Puzzle =>', this.p);
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
  }
}
</script>

<style scoped>
.helper-bar {
  position: fixed;
  bottom: 30px;
  left: 2em;
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
  left: calc(2em + 75px);
}
.helper-bar:hover {
  box-shadow: 0 0 5px 10px rgba(230,0,115,0.3);
  text-shadow: 0 0 20px #eee, 0 0 30px #eee, 0 0 40px #ff7070, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff7070;
}
.helper-bar > .icon-game {
  position: relative;
  top: 2px;
}
.winter-wrap.copen {
  margin-bottom: 70vh;
}
.content-i {
  position: fixed; 
  top: 0;
  left: -2px;
  bottom: 0;
  width: 100.5%;
  height: 101%; 
  z-index: -1;
  margin: 0;
  padding: 0;
}
</style>