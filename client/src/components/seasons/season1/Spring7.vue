<template>
  <div class="spring-wrap console" v-if="rdy">

    <div class="content-s spring puzzle-content" v-if="p.id">
      <Ubuntu
        v-bind:i="i"
        v-bind:o="{bg:c.DEFAULT_STORAGE_BASE+'/'+p.id+'/'+p.files[0],left:c.DEFAULT_STORAGE_BASE+'/'+p.id+'/'+p.files[1],right:c.DEFAULT_STORAGE_BASE+'/'+p.id+'/'+p.files[2],banner:c.DEFAULT_STORAGE_BASE+'/'+p.id+'/'+p.files[3]}"
        v-bind:r="def[0]"
        v-bind:in="p.description"
        v-bind:un="un"
        v-if="un"
        @proof="retain"
      ></Ubuntu>
    </div>

    <div class="content-s danger no-access" v-if="!a && i > 0">
      <p class="no-access descr" v-html="w"></p>
      <router-link to="/discover">Back</router-link>
    </div>

    <!-- Soulve -->
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

  import Console from '../../children/soulve/Console.vue';
  import Ubuntu from '../../children/vms/Ubuntu.vue'

  const CURRENT_I = 7;

  export default {
  name: 'Spring 7',
  components: { Console, Ubuntu },
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
    w: Config.notify.DEFAULT_PLAYER_WARNING,
    fx: [Config.externals.tutorial3.audio],
    do: store,
    sl: null,
    sv: null,
    fi: null,
    un: null,
    str:{},
    def: ['spring', 0],
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
      // console.log('getS', resp);
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
      // console.log('getSl', resp);
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
                let t = this.prove(proof, s, true);
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
      this.p.files = (m.files) ? m.files : null;
      this.p.template = (m.template) ? m.template : null;
      if (m['email']) {
        this.p.email = m.email;
      }
      if (m['einstein']) {
        m.einstein.secret = m.secret;
        this.p.einstein = m.einstein;
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
     prove: function (h, s, op = false) {
      let v = false;

      // console.log('Verifying Proof =>', [h, typeof h]);

      if (typeof h !== 'string') {
        return false;
      } else if (h.length !== Config.DEFAULT_CHAR_LENGTH) {
        return false;
      }

      if (!op) {
        const p = this.h(h, s, Config.DEFAULT_SIZE, Config.DEFAULT_DEPTH);
        if (p === true)
          v = true;
        return v;
      } else {
        const p = this.h(h, s, Config.DEFAULT_OP_SIZE, Config.DEFAULT_DEPTH);
        if (p === true)
          v = true;
        return v;
      }
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
    }
  }
}
</script>

<style scoped>
</style>