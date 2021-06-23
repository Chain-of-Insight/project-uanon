<template>

  <div class="summer-wrap console" v-if="rdy">
    <div class="content-s summer puzzle-content" v-if="p.id">
      

      <div class="wr">
        <h2 class="blood-t">{{p.title}}</h2>
        <!-- Instruction -->
        <div class="haughty jumbotron" v-if="p.template" v-html="p.template"></div>
        <div class="div">
          <hr class="separator" />
        </div>
        <div class="thanks">
          <!-- "I am chaos. I am the substance from which your artists and scientists build rhythms." -->
          <model-viewer 
            id="feeling-very-well"
            class="mv"
            :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/' + p.files[0]" 
            alt="The World As Power" 
            v-if="p.files"
            camera-controls
          ></model-viewer>
          <!-- "I am the spirit with which your children and clowns laugh in happy anarchy. I am chaos. I am alive, and I tell you that you are free." -->
        </div>
        <div class="div">
          <hr class="separator" />
        </div>
        <!-- Life Decay -->
        <div class="door-of-the-gods">
          <p class="p-vs-a-infinity" style="text-align:center;width:100%;">&#x221e;</p>
        </div>
      </div>


    </div>

    <div class="content-s danger no-access" v-if="!a && i > 0">
      <p class="no-access descr" v-html="w"></p>
      <router-link to="/descend">Back</router-link>
    </div>

    <!--
    The Pirates of the Somalian

    Power As Life - "A critical stage represents a "plane" in Nature..."

    I spit it for my block. It's an ode, I admit it
    Here the city code is lock and load
    any minute is rock and roll
    and you rock and roll
    and feel your soul leaving
    It's just the wrong dance that will leave you not breathing
    I'm not particularly proud of this predicament, but 
    I'm born and bred in this tenement I'm sentimental, what
    plus it's only right to represent my hood, and what not,
    so I'm about to do it in the music. In the movies, cut 
    to the chase, pan across to the face. I'm right there
    Freeze frame on the street name, oops wait a minute,
    this is where the streets have no name and the drain of sewage
    you can see it, in this boy how the hate is brewing
    Cause when his tummy tucks in **** the pain is fluid
    So what difference does it make, entertaining through it
    Some get high mixing coke and gun powder, sniffing
    She got a gun but could have been a model or physician

    So what you know bout the pirates terrorize the ocean
    To never know a simple day without a big commotion
    It can't be healthy just to live with a such steep emotion
    and when I try and sleep, I see coffins closing

    We used to take barb wire
    mold them around discarded bike tires
    roll them down the hill on foot blazing
    Now that was our version of mountain bike racing
    (Damn.) Do you see why it's amazing?
    When someone comes out of such a dire situation
    and learns the English language, just to share his observation?
    Probably get a Grammy without a grammar education
    So **** you school and **** you immigration
    and all of you who thought I wouldn't amount to constipation
    and now I'm here without the slightest fear and reservation
    They love me in the slums and the native reservations
    The world is a ghetto administering deprivation,
    but mommy didn't raise no fool, did she Hoyo?
    I promised I will get it and remain strictly loyal
    Cause when they get it—then, they let it all switch and spoil
    but I just illuminated it like kitchen foil
    A lot of main stream ****** is yapping about yapping
    A lot of underground ****** is rapping about rapping
    I just wanna tell you what's really crack-a-lacking:
    before the tears came down this is what happened

    So what you know bout the pirates terrorize the ocean
    To never know a simple day without a big commotion
    It can't be healthy just to live with a such steep emotion
    and when I try and sleep, I see coffins closing
    
    "Suppose we take three planes in descending order A, B, C. Then, the Principle of Control corresponding to A, has adhikara not only over A, but also over B and C; that of B, has jurisdiction or competence over B and C; that of C over C alone."
    -->

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

  const CURRENT_I = 8;

  export default {
    name: 'Summer 9',
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
      w: Config.notify.DEFAULT_PLAYER_WARNING,
      do: store,
      sl: null,
      sv: null,
      fi: null,
      un: null,
      str:{},
      def: ['summer', 2],
      rdy: false,
      argT: [false, false]
    }),
    mounted: async function () {
      this.getStr();
      await this.loadComponent();
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
            if (typeof str[CURRENT_I - 3] == 'object') {
              if (str[CURRENT_I - 3].proof) {
                proof = str[CURRENT_I - 3].proof;
                s = str[CURRENT_I - 3].secret;
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
        this.p.payload = (m.payload) ? m.payload : null;
        this.p.hint = (m.hint) ? m.hint : null;
        this.p.fields = (m.fields) ? m.fields : null;
        this.p.template = (m.template) ? m.template : null;
        this.p.files = (m.files) ? m.files : null;

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
      loadComponent: function () {
        return () => import('@google/model-viewer');
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
h2.blood-t {
  text-align: center;
  text-transform: uppercase;
  font-family: 'AnglicanText' !important;
  font-size: 81px;
  margin-bottom: 0;
  /* text-shadow: 0 0 10px #eee, 0 0 20px #eee, 0 0 30px #000, 0 0 40px #000, 0 0 50px #000, 0 0 60px #ff7070, 0 0 70px #ff7070; */
  
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
.haughty {
  font-size: 1.5em;
  max-width: 1080px;
  font-family: 'Special Elite', cursive;
  margin: auto;
}
table {
  margin: auto !important;
}
div.door-of-the-gods {
  position: relative;
  margin-bottom: 4em;
}
div.door-of-the-gods img {
  display: block;
  margin: auto;
  padding-top: 100px;
  padding-bottom: 150px;
  filter: sepia(30%);
}
.mv {
  position: relative;
  min-height: 85vh;
  width: 80%;
  height: auto;
  margin: auto;
  top: -3em;
  z-index: 1000;
}
div.div {
  position: relative;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  font-family: 'AnglicanText';
}
div.div {
  height: 8px;
  width: auto;
  max-width: 1440px;
  margin: auto;
  border-radius: 5px;
  color: rgba(73,45,21,.72);
  background: linear-gradient(-42deg,#a17434,#ffc373 16%,#ffc373 21%,#fff 24%,#ffc373 27%,#ffc373 36%,#fff 45%,#fff 60%,#ffc373 72%,#fff 80%,#ffc373 84%,#a17434);
}
.c-main {
  -webkit-box-align: center;
  align-items: center;
  display: -webkit-box;
  -webkit-box-pack: center;
  justify-content: center;
  opacity: 0.9;
  position: relative;
  position: relative;
  left: 5.25%;
  max-width: 1800px;
  margin: auto;
}
.clue-content .c-main, strong, a {
  color: #000000;
  font-weight: 400;
}
div.p-i, h2, .haughty {
  margin-bottom: 1em;
  line-height: 1.8;
}
div.p-i {
  font-weight: 600;
}
h2 {
  font-weight: 500;
}
h2.alone {
  font-size: 24px;
}
ol.payloads {
  font-size: 17px;
}
p.p-vs-a-infinity {
  margin: auto;
  margin-top: 4.5em;
  margin-bottom: 4.5em;
  font-size: 48px;
  font-family: 'AnglicanText';
  color: #ffc373;
  filter: sepia(35%);
}
.jumbotron {
  margin-top: 1.25em;
  margin-bottom: 4em;
}
</style>