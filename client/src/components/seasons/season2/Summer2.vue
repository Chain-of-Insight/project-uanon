<template>

  <div class="summer-wrap console" v-if="rdy">
    <div class="content-s summer puzzle-content" v-if="p.id">
      

      <div class="wr">
        <!-- Instruction -->
        <div class="haughty jumbotron" v-if="p.template" v-html="p.template"></div>
        <div class="div">
          <hr class="separator" />
        </div>
        <div class="manor">
          <!-- "You've got to climb Mount Everest to reach the Valley of the Dolls" -->
          <model-viewer 
            id="dollhouse"
            class="mv"
            src="https://uanon.s3.amazonaws.com/5fdca460147a5ba0a9e546651f4cf71a07c7d501d9670627344a7309ec390ca2/c0f9a1aabda18aae1afb89361757a0d1938cd45d7d5f8f2e291be1bf8086cb64.glb" 
            alt="Paalace of love, beauty, sexual pleasure, and fertility" 
            camera-controls
          ></model-viewer>
          <!-- "The land vomits ghosts - in my old home" -->
        </div>
        <div class="div">
          <hr class="separator" />
        </div>
        <!-- Scroll -->
        <div class="clue-content scroll-guide">
          <div class="c-main">
            <div class="l-scroll">
              <div class="c-scroll">
                <div class="c-scroll__holder c-scroll__holder--top">
                  <div class="c-scroll__knob">
                    <div class="c-scroll__knob c-scroll__knob--small c-scroll__knob--left"></div>
                  </div>
                  <div class="c-scroll__roll c-scroll__roll--top"></div>
                  <div class="c-scroll__knob">
                    <div class="c-scroll__knob c-scroll__knob--small c-scroll__knob--right"></div>
                  </div>
                </div>
                <div class="c-scroll__paper">
                  <div class="c-scroll__content">
                    <div class="c-scroll__text">
                      <h2 class="c-scroll__heading" v-if="p.morals" v-html="p.morals[0]"></h2>
                      <h2 class="c-scroll__heading" style="text-align:left;margin-left:1em;" v-if="p.description" v-html="p.description"></h2>
                      <ol class="payloads" v-if="p.payload.value">
                        <li v-for="(pi, n) in p.payload.value" :key="n" :class="{'hidden': (n == 3)}">
                          <div class="p-i p1" v-if="n < (p.payload.value.length-1)" v-html="pi"></div>
                        </li>
                      </ol>
                      <h2 class="c-scroll__heading" v-if="p.morals" v-html="p.morals[1]"></h2>
                    </div>
                  </div>
                </div>
                <div class="c-scroll__holder c-scroll__holder--bottom">
                  <div class="c-scroll__knob">
                    <div class="c-scroll__knob c-scroll__knob--small c-scroll__knob--left"></div>
                  </div>
                  <div class="c-scroll__roll c-scroll__roll--bottom"></div>
                  <div class="c-scroll__knob">
                    <div class="c-scroll__knob c-scroll__knob--small c-scroll__knob--right"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Apple -->
        <div class="food-of-the-gods">
          <img class="robbers" src="https://uanon.s3.amazonaws.com/5fdca460147a5ba0a9e546651f4cf71a07c7d501d9670627344a7309ec390ca2/apple.jpg" />
        </div>
      </div>


    </div>

    <div class="content-s danger no-access" v-if="!a && i > 0">
      <p class="no-access descr" v-html="w"></p>
      <router-link to="/descend">Back</router-link>
    </div>

    <!--
    Valley of the Dolls

    "You've got to climb Mount Everest to reach the Valley of the Dolls. It's a brutal climb to reach that peak, you stand there, waiting for the rush of exhilaration, but it doesn't come. You're alone and the feeling of loneliness is overpowering."

    Got to get up, gonna get
    Got to get up all alone
    Got to find out
    Got to find, need to find 
    life on my own
    When will I know?
    Where will I, how will I 
    know what I'll be?
    If I don't go, if I can't, 
    if I don't go where I'm free

    Somewhere ahead
    waits a home, waits a heart
    that will know how I yearned,
    know how I yearned, 
    yearned for a dream
    For a face with a smile 
    and a look of concern
    but will I learn?
    Tell me, when will I know?
    What will I see?
    When will I return?

    When will I learn?
    How will I?
    Where will I find what is real?
    Was there one time, long ago
    When my heart knew how to feel?

    Gonna get, have to get
    off of this ride
    Got to get hold,
    got to get, need to get
    hold of my pride
    When did I get, where did I,
    how was I caught in this game?
    When will I know, where will I,
    how will I think of my name?

    When did I stop feeling sure, 
    feeling safe and start 
    wondering why
    wondering why
    Is this a dream?
    Am I here?
    Where are you?
    What is in back of the sky?
    Why didn't we cry?

    Got to get up, got to get out 
    of this merry-go-round
    Got to get on
    Gonna get, need to get 
    on where I'm bound
    Tell me, when will I know?
    How will I know?
    When will I know why?
    Got to be here
    Got to be, have to be 
    where I belong

    Now that I know,
    had to know, came to know
    where I went wrong
    It was all here, here it was
    Why was I blind to it then?
    This is my world, here it is
    This is where I'll start again

    Was it a dream?
    Was it real?
    Was I there?
    Tell me, when will I know?
    How will I, when will I know why?

    "So many years I prayed for this. Now that it's come, I don't feel a thing."
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
    name: 'Summer 2',
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
        this.p.payload = (m.payload) ? m.payload : null;
        this.p.hint = (m.hint) ? m.hint : null;
        this.p.fields = (m.fields) ? m.fields : null;
        this.p.template = (m.template) ? m.template : null;
        this.p.morals = (m.morals) ? m.morals : null;

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
}
.manor {
  filter: sepia(50%);
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
.scroll-guide, div.div {
  position: relative;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  font-family: 'AnglicanText';
  filter: sepia(30%);
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
  -webkit-animation: brighten 4s infinite;
  animation: brighten 4s infinite;
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
  font-family: 'Special Elite', cursive;
  word-wrap: break-word;
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
.l-scroll {
  max-width: 1800px;
  width: 90%;
}
.c-scroll {
  position: relative;
  left: -25px;
}
.c-scroll__link {
  color: inherit;
}
.c-scroll__paper {
  min-height: 600px;
  min-width: 800px;
  top: -6px;
  left: -80px;
  position: relative;
  z-index: -1;
}
.c-scroll__holder {
  -webkit-box-align: center;
  align-items: center;
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
}
.c-scroll__roll {
  background-color: #dac48b;
  min-height: 65px;
  position: relative;
  width: 1070px;
  margin: 0 5px;
}
.c-scroll__roll:before {/*//here */
  content: '';
  bottom: 2px;
  left: -7px;
  position: absolute;
  top: 2px;
  width: 7px;
  background-color: #4A2B11;
  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(5%, #4A2B11), color-stop(55%, #CD9E53), color-stop(#CD9E53), to(#4A2B11));
  background-image: linear-gradient(to bottom, #4A2B11 5%, #CD9E53 55%, #CD9E53, #4A2B11);
}
.c-scroll__roll:after {
  content: '';
  bottom: 2px;
  right: -7px;
  position: absolute;
  top: 2px;
  width: 7px;
  background-color: #4A2B11;
  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(5%, #4A2B11), color-stop(55%, #CD9E53), color-stop(#CD9E53), to(#4A2B11));
  background-image: linear-gradient(to bottom, #4A2B11 5%, #CD9E53 55%, #CD9E53, #4A2B11);
}
.c-scroll__knob {
  background-color: #CD9E53;
  background-image: -webkit-gradient(linear, left top, right top, color-stop(5%, #4A2B11), color-stop(55%, #CD9E53), color-stop(#CD9E53), to(#4A2B11));
  background-image: linear-gradient(to right, #4A2B11 5%, #CD9E53 55%, #CD9E53, #4A2B11);
  box-shadow: inset 0 6px 32px #4a2b11;
  border-radius: 15px/30px;
  height: 70px;
  position: relative;
  width: 29.9145299145px;
}
.c-scroll .c-scroll__content {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.c-scroll__heading {
  text-align: center;
}
h2.c-scroll__heading {
  font-family: 'AnglicanText';
  font-size: 2rem;
}
.c-scroll__paragraph {
  line-height: 1.3;
}
.c-scroll__knob--small {
  position: absolute;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
}
.c-scroll__knob--left {
  left: -20px;
}
.c-scroll__knob--right {
  right: -20px;
}
.c-scroll__holder--bottom {
  margin-top: -20px;
  position: relative;
  right: 270px;
  top: 515px;
}
.c-scroll__holder--top {
  margin-bottom: -20px;
  position: relative;
  right: 270px;
  top: -528px;
}
h5.sign-off {
  position: relative;
  top: -10px;
  padding: 4px;
}
.c-scroll__text {
    position: relative;
    top: -40px;
    background-image: -webkit-gradient(linear, left top, right top, from(#c19b5d), color-stop(3%, #d9ba7e), color-stop(10%, #ebd095), color-stop(89%, #ebd095), color-stop(91%, #e5c78b), to(#a27a43));
    background-image: linear-gradient(to right, #a27a43 5%, #c19b5d 12%, #e5c78b 91%, #ebd095 89%, #c19b5d 0%, #d9ba7e 3%, #ebd095 10%, #ebd095 89%, #e5c78b 91%, #a27a43 95%);
    box-shadow: inset 0 0 32px #c19b5d;
    letter-spacing: 0.05em;
    line-height: 2;
  padding: 1em;
}
a.scroll-link {
  text-decoration: underline !important;
}
div.food-of-the-gods {
  position: relative;
  top: 30em;
}
div.haughty {
  max-width: 1440px;
  margin: auto;
  margin-top: 4em;
  margin-bottom: 8em;
  padding-left: 4em;
  padding-right: 4em;
}
div.food-of-the-gods img {
  display: block;
  margin: auto;
  padding-bottom: 300px;
  filter: sepia(30%);
}

@media screen and (orientation: landscape) {
  .c-scroll {
    -webkit-transform: rotate(-90deg);
    transform: rotate(-90deg);
  }
  .c-scroll .c-scroll__roll {
    background-image: -webkit-gradient(linear, left top, left bottom, from(#98743C), color-stop(60%, #EED89F), to(#98743C));
    background-image: linear-gradient(to bottom, #98743C, #EED89F 60%, #98743C);
  }
  .c-scroll .c-scroll__roll--bottom {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  .c-scroll .c-scroll__content {
    padding: 0 6px;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }
}

@media screen and (orientation: portrait) {
  .c-scroll .c-scroll__content {
    padding: 0 20px;
  }
  .c-scroll .c-scroll__roll--bottom {
    background-image: -webkit-gradient(linear, left bottom, left top, from(#d4b078), color-stop(30%, #EED89F), to(#98743C));
    background-image: linear-gradient(to top, #d4b078, #EED89F 30%, #98743C);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  .c-scroll .c-scroll__roll--top {
    background-image: -webkit-gradient(linear, left top, left bottom, from(#98743C), color-stop(70%, #EED89F), to(#b6925a));
    background-image: linear-gradient(to bottom, #98743C, #EED89F 70%, #b6925a);
  }
}

/* Smaller scroll settings */
@media screen and (max-width: 2250px)  {
  .c-main {
    max-width: 1880px;
    width: 1880px;
    left: 7%;
  }
  .c-scroll__holder--top {
    right: 255px;
  }
  .c-scroll__holder--bottom {
    right: 255px;
  }
  .c-scroll__roll {
    width: 1050px;
  }
}
@media screen and (max-width: 1800px)  {
  .c-main {
    left: 75px;
    max-width: 1080px;
  }
  .c-scroll__holder--top {
    top: -195px;
    right: 910px;
    width: 1690px;
  }
  .c-scroll__holder--bottom {
    top: 191px;
    right: 910px;
    width: 1690px;
  }
  .c-scroll__roll {
    width: 2020px;
  }
  div.food-of-the-gods {
    top: 55em;
  }
}
@media screen and (max-width: 1330px)  {
  .scroll-guide {
    margin-top: 8.5rem;
  }
  .c-scroll__holder {
    display: none;
  }
  .l-scroll, .c-main {
    margin: auto;
  }
}
</style>