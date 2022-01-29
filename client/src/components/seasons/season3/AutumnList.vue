<!-- We l come to the Odyssey -->
<template>

  <div class="content-i atdraw">

    <div id="fall-of-HUman" :class="alt">
      <!-- Penta Sun -->
      <div id="turquoise-hexagon-sun" class="base" :style="'transform:scale('+ sun +')'">
        <div id="pillage" class="circle"></div>
        <div class="td bar n0"><li></li></div>
        <div class="td bar n1"><li></li></div>
        <div class="td bar n2"><li></li></div>
        <div class="td bar n3"><li></li></div>
        <div class="td bar n4"><li></li></div>
        <div class="td overbar n0"><li></li></div>
        <div class="td overbar n1"><li></li></div>
        <div class="td overbar n2"><li></li></div>
        <div class="td overbar n3"><li></li></div>
        <div class="td overbar n4"><li></li></div>
      </div>
    </div>

  </div>

  <div class="content-wrapper jumbotron">
  
    <div class="pane-s autumn-list title-message">
      <h1>{{m}}</h1>
    </div>
    <div class="pane-s autumn-list progress">
      <div class="progress bt">
        <div class="progress-bar" :style="'width:' + prg + '%;'"></div>
      </div>
    </div>
    <div class="content-s resume">
    
      <section class="header-t">
        <div class="content-s autumn-list list-items" v-if="s.length">
          <ul class="autumn-list ul" v-if="s[0]['pub']">
            <li class="autumn-list li" v-for="(p, i) in s" :key="p.pub">
              <!-- Unsolved -->              
              <router-link class="not-solved li" :to="'/autumn/' + (i+1)" v-if="!p.priv">Autumn {{(i+1)}}</router-link>
              <!-- Solved -->
              <router-link class="solved li" :to="'/autumn/' + (i+1)" v-if="p.priv">Autumn {{(i+1)}} - SOLVED</router-link>
            </li>
            <!-- Ascension -->
            <li v-if="can">
              <router-link class="not-solved li" :to="'/autumn/the-same-old-story'" v-if="!asc">Autumn /\^/\ Ascension</router-link>
              <h3 v-if="asc">
                <router-link class="asc li" :to="'/autumn/the-same-old-story'">Autumn /\^/\ Ascension - ASCENDED</router-link>
              </h3>
            </li>
            <li v-if="asc">
              <h3><router-link class="asc li" :to="'/autumn/one-tin-soldier-rides-away'">View Ascension</router-link></h3>
            </li>
          </ul>
        </div>
      </section>

    </div>
  </div>
  <div class="open-c inner">
    <p class="helper-bar fi float-right" @click="ama();" title="Wander across the Lonely Planet">
      <!-- .???/a/nar/6f6ffc26-684f-450f-8a5a-6343bc424b72/1336397 -->
      <span class="icon fa fa-globe" title="Wander across the Lonely Planet"></span>
    </p>
    <p class="helper-bar float-right" @click="k();" title="What is True?">
      <!-- .observer/faq -->
      <span class="icon fa fa-info-circle" title="What is True?"></span>
    </p>
  </div>

  <div class="hierarchies" v-if="inf">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog modal-dialog-e">
            <div class="modal-content modal-content-e">
              <div class="modal-header">
                <h1>{{md+1}}.</h1>
                <div type="button" class="close" @click="k();">
                  <span class="close-x" aria-hidden="true">&times;</span>
                </div>
              </div>
              <div :class="'modal-body st-' + String(md)">
                <ul class="tractatus" v-if="!isNaN(md)">
                  <li v-for="(passage, i) in witt[md]" :key="i">
                    <span class="key" v-if="passage.key">
                      <strong>{{passage.key}}</strong>
                    </span>&nbsp;
                    <div class="row-t">
                      <div class="value" v-if="passage.value" v-html="passage.value"></div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="modal-footer">
                <div class="ctrl-t">
                  <div class="left float-left">
                    <button class="btn btn-inverse" :disabled="md == 0" @click="md=0;">&laquo;</button>
                    <button class="btn btn-primary prev prev-t" @click="md--" :disabled="md == 0">&lt;</button>
                  </div>
                  <div class="right float-right">
                    <button class="btn btn-primary next next-t" @click="md++;" :disabled="md == (witt.length-1)">&gt;</button>
                    <button class="btn btn-inverse" :disabled="md == (witt.length-1)" @click="md=((witt.length-1));">&raquo;</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
  <Audio 
    v-bind:p="w.path"
    v-bind:t="w.type"
    v-bind:a="false"
    v-bind:l="false"
    v-if="s.length"
    ref="plates"
  ></Audio>
</template>

<script>
import { getActiveAccount } from '../../../util/tezos';
import { getTruthShard } from '../../../util/contract';
import * as Config from '../../../conf/constants';
import * as api from '../../../util/api';
import store from '../../../util/storage';
import Audio from '../../children/Audio.vue';

import make from '../../../aesthetics/a6';

export default {
  name: 'autumns',
  components: { Audio },
  data: () => ({
    api: api,
    a: make,
    b: true,
    c: null,
    l: null,
    m: 'Glossolalia',
    o: null,
    p: null,
    r: false,
    s: [],
    t: null,
    w: Config.externals.sounds.autumn.tectonics,
    do: store,
    cd: false,
    md: 0,
    gd: false,
    sg: false,
    sh: false,
    pz: {},
    un: null,
    def: ['autumn', 3],
    inf: false,
    str: {},
    sun: 1,
    asc: false,
    witt: [
      [
        {key: 1, value: "The world is everything that is the case."},
        {key: 1.1, value: "The world is the totality of facts, not of things."},
        {key: 1.11, value: "The world is determined by the facts, and by these being all the facts."},
        {key: 1.12, value: "For the totality of facts determines both what is the case, and also all that is not the case."},
        {key: 1.13, value: "The facts in logical space are the world."},
        {key: 1.2, value: "The world divides into facts."},
        {key: 1.21, value: "Any one can either be the case or not be the case, and everything else remain the same."}
      ],
      [
        {key: 2, value: "What is the case, the fact, is the existence of atomic facts."},
        {key: 2.01, value: "An atomic fact is a combination of objects (entities, things)."},
        {key: 2.011, value: "It is essential to a thing that it can be a constituent part of an atomic fact."}
      ],
      [
        {key: 3, value: "The logical picture of the facts is the thought."}
      ],
      [
        {key: 4, value: "The thought is the significant proposition."},
        {key: 4.54, value: "The general propositional form is a variable."}
      ],
      [
        {key: 5, value: "Propositions are Truth-functions of elementary propositions. (An elementary proposition is a Truth-function of itself.)"},
        {key: 5.01, value: "The elementary propositions are the Truth-arguments of propositions."},
        {key: 5.1, value: "The Truth-functions can be ordered in series. That is the foundation of the theory of probability."},
        {key: 5.101, value: "<div>Those Truth-possibilities of its Truth-arguments, which verify the proposition, I shall call its Truth-grounds. The Truth-functions of every number of elementary propositions can be written in a schema of the following kind: </div><pre>(TTTT)(p, q) Tautology (if p then p, and if q then q) [p ⊃ p . q ⊃ q] \n(FTTT)(p, q) in words: Not both p and q. [∼(p . q)] \n(TFTT)(p, q) „ „ If q then p. [q ⊃ p] \n(TTFT)(p, q) „ „ If p then q. [p ⊃ q] \n(TTTF)(p, q) „ „ p or q. [p ∨ q] \n(FFTT)(p, q) „ „ Not q. [∼q] \n(FTFT)(p, q) „ „ Not p. [∼p] \n(FTTF)(p, q) „ „ p or q, but not both. [p . ∼q : ∨ : q . ∼p] \n(TFFT)(p, q) „ „ If p, then q; and if q, then p. [p ≡ q] \n(TFTF)(p, q) „ „ p \n(TTFF)(p, q) „ „ q \n(FFFT)(p, q) „ „ Neither p nor q. [∼p . ∼q or p | q] \n(FFTF)(p, q) „ „ p and not q. [p . ∼q] \n(FTFF)(p, q) „ „ q and not p. [q . ∼p] \n(TFFF)(p, q) „ „ p and q. [p . q] \n(FFFF)(p, q) Contradiction (p and not p; and q and not q.) [p . ∼p . q . ∼q]</pre>"},
        {key: 5.123, value: "If a God creates a world in which certain propositions are True, (S)He/Enby creates thereby also a world in which all propositions consequent on them are True. And similarly S(H)e/Enby could not create a world in which the proposition 'p' is True without creating all its objects."},
        {key: 5.1361, value: "The events of the future cannot be inferred from those of the present. Superstition is the belief in the causal nexus."},
        {key: 5.1362, value: "The freedom of the will consists in the fact that future actions cannot be known now."}
      ]
    ]
  }),
  mounted: async function () {
    await this.getS();
    await this.getU();
    await this.truths();
    await this.ma();
  },
  methods: {
    getS: async function () {
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
          for (let i = 0; i < s.length; i++) {
            let y = this.do.store.existsItem(s[i], this.def[0]);
            this.s.push({
              pub: s[i],
              priv: y
            });
          }
          if (this.s.length) {
            this.getO();
          }
        }
        // console.log('Season:', this.s);
      }
    },
    getO: async function () {
      let req = {
        index: 0, 
        realm: this.def[0]
      }, d;
      let resp = await this.api.request.post('/puzzle/get', req);
      if (resp.status == 200 && resp.data) {
        d = resp.data;
        if (d.message) {
          this.pz = d.message;
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
    truths: async function () {
      let s = this.do.store.get();
      if (s['ascensions']) {
        if (s.ascensions[this.def[0] + '+']) {
          this.asc = s.ascensions[this.def[0] + '+'];
        }
      }
      let a = await getActiveAccount();
      if (!a.address) {
        return;
      }
      let t;
      try {
        t = await getTruthShard(a.address, this.def[0]);
      } finally {
        if (t) {
          if (t['asset'] && t['season'] && this.def.length > 1) {
            if (t.season == this.def[1]) {
              this.asc = true;
              let r = this.def[0] + '+';
              this.do.store.ascend(r, this.asc);
            }
          }
        }
      }
    },
    ma: async function () {
      await this.a.make();
    },
    ama: function () {
      this.a.move();
      if (this.$refs.plates)
        if (this.$refs.plates['play'])
          this.$refs.plates.play();

      const len = 13;
      const max = 1.75;
      const min = 0;
      const m = 0.0175;
      let moves = 0;
      let g = setInterval(() => {
        if (moves >= len) {
          clearInterval(g);
          moves = 0;
          if (this.sun <= min) {
            this.sg = true;
          } else if (this.sun >= max) {
            this.sg = false;
          }
          // XXX DBG:
          // console.log('Finished cycle', {
          //   sun: this.sun,
          //   sg: this.sg
          // });
          return;
        }
        if (this.sg) {
          this.sun += m;
        } else {
          this.sun -= m;
        }
        moves++;
      }, 250);
    },
    k: function () {
      this.inf = !this.inf;
      let b;
      if (this.inf){
        b = document.getElementsByTagName('body');
        b[0].style.overflow = 'hidden';
      } else {
        b = document.getElementsByTagName('body');
        b[0].style.overflow = '';
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
    /**
     * @param {String} s : Secret
     */
    retain: function (s) {
      if (typeof s !== 'string' || typeof this.pz !== 'object') {
        return;
      } else if (s.length !== Config.DEFAULT_CHAR_LENGTH) {
        return;
      }
      this.pz.proof = s;
      // console.log("Proof", [this.pz, s]);
      if (!this.do.store.update(this.pz, this.def[0], this.pz.index)) {
        console.warn("Failed updating storage, your solution has not been saved");
      }
    },
  },
  computed: {
    alt: function () {
      const def = Math.random() <= 0.5;
      let c = 'alt';
      if (!def) {
        let c1 = Math.random() <= 0.5,
            c2 = Math.random() <= 0.5,
            c3 = Math.random() <= 0.5;
        if (c1==c2==c3) {
          return c+'1';
        } else {
          return c+'2';
        }
      } else {
        return c+'0';
      }
    },
    prg: function () {
      if (!this.s) {
        return 0;
      } else if (!Array.isArray(this.s)) {
        return 0;
      } else if (this.s.length < 1) {
        return 0;
      }
      let p = 0, l = this.s.length;
      for (let i = 0; i < l; i++) {
        if (this.s[i].priv) {
          if (typeof this.s[i].priv == 'object') {
            if (this.s[i].priv['secret']) {
              if (this.s[i].priv['secret'].length == Config.DEFAULT_CHAR_LENGTH) {
                p += 1;
              }
            }
          }
        }
      }
      let j = (this.asc) ? 0 : 1;
      return Math.round((p / (l+j)) * 100);
    },
    can: function () {
      let c;
      if (!this.s) {
        return false;
      } else if (!Array.isArray(this.s)) {
        return false;
      } else if (this.s.length < 1) {
        return false;
      }
      for (let i = 0; i < this.s.length; i++) {
        if (!this.s[i].priv) {
          c = false;
          return c;
        }
        if (i == (this.s.length-1)) {
          if (c !== false) {
            c = true;
          }
        }
      }
      return c;
    }
  }
}
</script>

<style>
canvas {
  position: absolute;
  top: 0;
}
</style>

<style scoped>
#fall-of-HUman {
	position: fixed;
	width: 100vw;
	height: 100vh;
	overflow-x: hidden;
} 
#fall-of-HUman.alt0 {
  background: linear-gradient(#333, #ff5743, #8b0000);
}
#fall-of-HUman.alt1 {
  background: linear-gradient(#7882ff, #ff8d8d);
}
#fall-of-HUman.alt2 {
  background: linear-gradient(160deg,#333,#8b0000,#8b0000,#ff5743,#8b0000,#8b0000,#333);
}

/* /// */
.base {
  width: 350px;
  height: auto;
  position: absolute;
  right: -190px;
  top: 50px;
  margin: 0 250px 0 auto;
}
.circle {
  position: absolute;
  width: 222px;
  height: 222px;
  border: 12px solid red;
  border-radius: 112px;
  left: 150px;
  top: 150px;
  margin-left: -107px;
  margin-top: -112px;
  background-color: red;
  background-image: linear-gradient(315deg, red 0%, #ff4e00 10%, #ec9f05 54%);
  box-shadow: inset 0 0 0 6px #linear-gradient(325deg, #f5bd02  0%, #ec9f05 74%);;
}
.bar, .overbar {
  position: absolute;
  height: 200px;
  width: 10px;
  left: 150px;
  top: 50px;
}
.td li {
  list-style-type: none;
  height: 200px;
  width: 20px;
  margin-left: 30px;
  width: 10px;
  background: red;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
}
.n0 {
  transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
}
.n1 {
  transform: rotate(90deg);
  -webkit-transform: rotate(162deg); 
}
.n2 { 
  transform: rotate(90deg);
  -webkit-transform: rotate(234deg); 
}
.n3 { 
  transform: rotate(90deg);
  -webkit-transform: rotate(306deg); 
}
.n4 { 
  transform: rotate(90deg);
  -webkit-transform: rotate(378deg); 
}
.content-i {
  position: fixed; 
  top: 0; 
  width: 100%; 
  height: 100%; 
  z-index: -1;
  pointer-events: none;
}
.fade {
  position: relative;
  width: 100%;
  min-height: 60vh;
  top: -25px;
  background-image: linear-gradient(0deg, transparent, black 75%);
  z-index: 1;
}
.header {
  display: flex;
  justify-content: center;
  position: fixed;
  overflow-y: hidden;
  top: 45vh;
  height: 800px;
  color: #ffffff;
  text-shadow: 2px 2px #000000;
  font-family: 'Special Elite', cursive;
  font-size: 500%;
  font-weight: 600;
  letter-spacing: 6px;
  line-height: 150%;
  perspective: 400px;
  text-align: justify;
}
.header-t, .jumbotron {
  max-height: 70vh;
}
.jumbotron {
  overflow-y: auto;
  margin-top: 0;
}
.crawler {
  position: relative;
  top: 99999px;
  transform-origin: 50% 100%;
  animation: crawler 60s linear;
  animation-iteration-count: infinite;
  animation-delay: 2s;
}
.resume {
  margin-top: 2em;
}
.btn-hide {
  margin-top: 1em;
  margin-bottom: 2em;
}
.crawler > .title {
  font-size: 90%;
  text-align: center;
}
.crawler > .title h1 {
  margin: 0 0 100px;
  text-transform: uppercase;
}
.colour-t {
  color: #c0c0c0;
}
.solve.solve-t {
  z-index: 2000;
  width: 100%;
  min-height: 5vh;
}
.open-c.inner > .helper-bar {
  z-index: 2001;
}
.jumbotron-t {
  background-color: rgba(230,0,115,0.9);
  border-radius: 2em;
  padding: 4em;
  margin-left: -2em;
  margin-right: -2em;
  margin-bottom: 2em;
  animation: mythos ease 160s;
  -webkit-animation: mythos ease 160s;
  -moz-animation: mythos ease 160s;
  -o-animation: mythos ease 160s;
  -ms-animation: mythos ease 160s;
  animation-iteration-count: infinite;
}
.jumbotron-t p, .jumbotron-t h1 {
  background: -webkit-linear-gradient(#fff, #ff7070);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 0px 6px #ff7070;
}
.autumn-list.progress {
  margin-top: 1em;
  margin-bottom: 1em;
  background-color: #333;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
}
.progress.bt {
  background-color: #0a4862;
  background-color: #333;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
}
.progress-bar {
  background-color: #ffffff;
  color: #ffffff;
}
ul {
  list-style: none;
  padding-left: 0;
}
.autumn-list li, .autumn-list.title-message {
  text-shadow: 1px 1px #333;
}
.solved {
  color: #ffffff;
}
.li.not-solved, .li.solved {
  filter: brightness(1.75);
}
.li.asc {
  background: -webkit-linear-gradient(#fff, #eee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 0px 6px #ff7070;
}
span.not-solved {
  opacity: 0.5;
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
.helper-bar.fi {
  right: 4.75em;
}
.helper-bar:hover {
  box-shadow: 0 0 5px 10px rgba(230,0,115,0.3);
  text-shadow: 0 0 20px #eee, 0 0 30px #eee, 0 0 40px #ff7070, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff7070;
}
div.hierarchies {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity .3s ease;
}
.modal-dialog-e {
  position: relative;
  margin: auto;
  margin-top: 5vh;
  min-width: 75vh;
}
.modal-body {
  height: 100%;
  width: 100%;
  margin: auto;
  height: 70vh;
  background: transparent;
  overflow: auto;
  padding: 2em;
}
.modal-body.st-4 {
  height: auto !important;
  max-height: 92.5vh;
}
.modal-footer {
  border-top: 1px solid #000000;
}
ul.tractatus {
  font-size: 1.2em;
}
.ctrl-t {
  clear: both;
  width: 100%;
}
.left .btn, .right .btn {
  margin-right: 0.25em;
}

@keyframes crawler {
	0% {
    top: -100px;
    transform: rotateX(20deg)  translateZ(0);
  }
	100% { 
    top: -6000px;
    transform: rotateX(25deg) translateZ(-2500px);
  }
}
@keyframes mythos {
  0% {filter: hue-rotate(0deg);}
  50% {filter: hue-rotate(255deg);}
  100% {filter: hue-rotate(0deg);}
}
@-moz-keyframes mythos {
  0% {filter: hue-rotate(0deg);}
  50% {filter: hue-rotate(255deg);}
  100% {filter: hue-rotate(0deg);}
}
@-webkit-keyframes mythos {
  0% {filter: hue-rotate(0deg);}
  50% {filter: hue-rotate(255deg);}
  100% {filter: hue-rotate(0deg);}
}
@-o-keyframes mythos {
  0% {filter: hue-rotate(0deg);}
  50% {filter: hue-rotate(255deg);}
  100% {filter: hue-rotate(0deg);}
}
@-ms-keyframes mythos {
  0% {filter: hue-rotate(0deg);}
  50% {filter: hue-rotate(255deg);}
  100% {filter: hue-rotate(0deg);}
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