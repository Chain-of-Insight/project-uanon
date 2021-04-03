<!-- Welcome to the twisted Tower of Princess Caraboo -->
<template>
  <!-- Ungated -->
  <div class="content-i ung" v-if="ung">
    <svg v-if="b">
      <defs>
        <linearGradient id="rites" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#F9BDF3"/>
          <stop offset="100%" stop-color="#111111"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
  <div class="content-wrapper jumbotron" :class="{ascended: asc, ungated: ung}" v-if="ung">
  
    <div class="pane-s spring-list title-message">
      <h1>{{m}}</h1>
    </div>
    <div class="pane-s spring-list progress">
      <div class="progress bt">
        <div class="progress-bar" :style="'width:' + prg + '%;'"></div>
      </div>
    </div>
    <div class="content-s resume">
    
      <section class="header-t">
        <div class="crawler-static jumbotron-t" v-if="sh">
          <div class="wr">
            <div class="title">
              <h1>WELCOME OBSERVER!</h1>
            </div>
            <p>T<span class="colour-t">h</span>e existence of c<span class="colour-t">i</span>vilization is pre<span class="colour-t">d</span>estined on th<span class="colour-t">i</span>s earth as well as i<span class="colour-t">n</span> the universe.  The li<span class="colour-t">g</span>ht and the darkness alternate.</p>
            <p>At the moment, HUmankind is dominated by ev<span class="colour-t">i</span>l.  Only Truth can lead it back into the light.  Reckoning will come to us like light<span class="colour-t">n</span>ing in the darkness.</p>
            <p>2021 is a historic moment.  The forces of justice are mounting and there’s a chance to turn the tide.  Every observer is smouldering with destiny.</p>
            <p>The challenges found here are the training to <span class="colour-t">p</span>repare you in your hunt for justice.  Only the best wi<span class="colour-t">l</span>l unlock the secrets of HUm<span class="colour-t">a</span>nkind’s bravest warr<span class="colour-t">i</span>ors; Nikola Tesla, Claude Shannon, Mary Shelley and cou<span class="colour-t">n</span>tless others who have already reached the state of Himalaya.  Long may you succeed in unlocking the big picture.</p>
            <p>See<span class="colour-t">i</span>ng a world free of demo<span class="colour-t">ns</span> and full of l<span class="colour-t">ight</span>.  Together we will save the world from the virus!<span class="colour-t">!</span></p>
            <p>Everything is just beginning<span class="colour-t">!</span></p>
            <p>Everything has already begun<span class="colour-t">!</span></p>
            <p>Everything has indeed begun!</p>
            <p>U.</p>
            <button class="btn-hide btn btn-primary" @click="sh = false;">Hide Riddle Text</button>
          </div>
        </div>

        <div class="content-s spring-list list-items" v-if="s.length">
          <ul class="spring-list ul" v-if="s[0]['priv']">
            <li class="spring-list li" v-for="(p, i) in s" :key="p.pub">
              <span class="not-solved li" v-if="!p.priv && s[i-1].priv == false"><a>Spring {{i}}</a></span>
              <router-link class="not-solved li" :to="'/spring/' + i" v-if="!p.priv && s[i-1].priv !== false">Spring {{i}}</router-link>
              <router-link class="not-solved li" :to="'/discover'" v-if="!p.priv && s[i].priv !== false && i == 0">Spring {{i}}</router-link>
              <router-link class="solved li" :to="'/spring/' + i" v-if="p.priv && i > 0">Spring {{i}} - SOLVED</router-link>
              <span class="solved li" style="cursor:pointer;" @click="sh = !sh" v-if="p.priv && i == 0">Spring {{i}} - SOLVED</span>
            </li>
            <li v-if="s[(s.length - 1)].priv">
              <router-link class="not-solved li" :to="'/spring/rites-of-spring'" v-if="!asc">Spring /\^/\ Ascension</router-link>
              <h3 v-if="asc">
                <router-link class="asc li" :to="'/spring/rites-of-spring'">Spring /\^/\ Ascension - ASCENDED</router-link>
              </h3>
            </li>
            <li v-if="asc">
              <h3><router-link class="asc li" :to="'/spring/gg'">View Ascension</router-link></h3>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>

  <!-- Gated -->
  <div class="content-wrapper-g gated" v-if="!ung">

    <div class="content-i">
      <iframe src="https://www.youtube.com/embed/8mBtRhvTOBc?rel=0&amp;autoplay=1&mute=1&controls=0&start=534" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>

    <div class="u">
      <div class="center">
        <img class="u_avi" src="https://uanon.s3.amazonaws.com/uav/6ffce610afca2a45b40e7f9f0b135402238ec14ee0d087940531b0dabbbf2db1.png" />
      </div>
    </div>
    <div class="fade"></div>

    <section class="header">
      <div class="crawler">
        <div class="title">
          <h1>WELCOME OBSERVER!</h1>
        </div>
        <p>T<span class="colour-t">h</span>e existence of c<span class="colour-t">i</span>vilization is pre<span class="colour-t">d</span>estined on th<span class="colour-t">i</span>s earth as well as i<span class="colour-t">n</span> the universe.  The li<span class="colour-t">g</span>ht and the darkness alternate.</p>
        <p>At the moment, HUmankind is dominated by ev<span class="colour-t">i</span>l.  Only Truth can lead it back into the light.  Reckoning will come to us like light<span class="colour-t">n</span>ing in the darkness.</p>
        <p>2021 is a historic moment.  The forces of justice are mounting and there’s a chance to turn the tide.  Every observer is smouldering with destiny.</p>
        <p>The challenges found here are the training to <span class="colour-t">p</span>repare you in your hunt for justice.  Only the best wi<span class="colour-t">l</span>l unlock the secrets of HUm<span class="colour-t">a</span>nkind’s bravest warr<span class="colour-t">i</span>ors; Nikola Tesla, Claude Shannon, Mary Shelley and cou<span class="colour-t">n</span>tless others who have already reached the state of Himalaya.  Long may you succeed in unlocking the big picture.</p>
        <p>See<span class="colour-t">i</span>ng a world free of demo<span class="colour-t">ns</span> and full of l<span class="colour-t">ight</span>.  Together we will save the world from the virus!<span class="colour-t">!</span></p>
        <p>Everything is just beginning<span class="colour-t">!</span></p>
        <p>Everything has already begun<span class="colour-t">!</span></p>
        <p>Everything has indeed begun!</p>
        <p>U.</p>
      </div>
    </section>
  </div>
  <div v-if="pz">
    <div class="solve solve-t" v-if="pz.secret">
      <div class="open-c inner">
        <p class="helper-bar float-right" @click="gopen();">
          <span class="icon icon-game"></span>
        </p>
      </div>
    </div>
  </div>
  <Graphical 
    v-bind:s="pz.secret"
    v-bind:r="def[0]"
    v-bind:f="pz.fields"
    v-bind:o="gd"
    v-bind:i="0"
    v-bind:p="pz"
    v-bind:t="pz.title"
    v-bind:fn="['Name of the Virus', 'Read between the lines']"
    v-bind:dd="false"
    v-bind:rst="true"
    v-if="pz.secret"
    @proof="retain"
    @gclose="gclose"
  ></Graphical>
  <Console 
    v-bind:s="pz.secret"
    v-bind:d="cd"
    v-bind:i="0"
    v-bind:r="def[0]"
    v-bind:p="pz"
    v-bind:q="true"
    v-bind:un="un"
    v-if="pz.secret && un"
    @proof="retain"
  ></Console>
</template>

<script>
import { getActiveAccount } from '../../../util/tezos';
import { getTruths } from '../../../util/contract';
import * as Config from '../../../conf/constants';
import * as api from '../../../util/api';
import store from '../../../util/storage';

import make from '../../../aesthetics/a2';

import Graphical from '../../children/soulve/Graphical.vue';
import Console from '../../children/soulve/Console.vue';

export default {
  name: 'Springs',
  components: { Graphical, Console },
  data: () => ({
    api: api,
    a: make,
    b: true,
    c: null,
    l: null,
    m: 'Discover',
    o: null,
    p: null,
    r: false,
    s: [],
    t: null,
    do: store,
    cd: false,
    gd: false,
    sh: false,
    pz: {},
    un: null,
    def: ['spring', 0],
    str: {},
    asc: false,
    ung: false
  }),
  mounted: async function () {
    await this.getS();
    await this.getU();
    await this.truths();
    window.addEventListener('resize', this.rm);
  },
  watch: {
    ung: {
      handler(a) {
        if (a == true) {
          this.$nextTick(() => {
            this.ma();
          });
        }
      }
    }
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
            if (this.s[0]) {
              if (!this.s[0].priv) {
                this.ung = false;
              } else {
                this.ung = true;
              }
            }
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
        t = await getTruths(a.address);
      } finally {
        t.forEach((truth) => {
          if (typeof truth == 'object') {
            if (truth['season']) {
              if (truth.season == 1) {
                this.asc = true;
                let r = this.def[0] + '+';
                this.do.store.ascend(r, this.asc);
              }
            }
          }
        });
      }
    },
    ma: async function () {
      await this.a();
    },
    rm: async function () {
      this.b = false;
      this.b = true;
      await this.ma();
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
    }
  }
}
</script>

<style scoped>
.content-wrapper.ungated {
  max-width: 60vw;
}
iframe {
  position: relative;
  top: -5%;
  width: 100%;
  height: 110%;
  border-radius: 4em;
}
.u {
  z-index: 100;
  position: absolute;
  width: 100%;
  height: 100%;
}
div.center {
  display: block;
  max-width: 80vw;
  margin: auto;
  position: relative;
}
.colour-t {
  color: #eee;
}
.u_avi {
  position: fixed;
  left: -4.5em;
  margin: auto;
  width: 100vw;
  height: auto;
  opacity: 0.45;
  animation-name: fade;
	animation-duration: 10s;
	animation-iteration-count: infinite;
  filter: hue-rotate(225deg);
  animation: transmogrify ease 60s;
  -webkit-animation: transmogrify ease 60s;
  -moz-animation: transmogrify ease 60s;
  -o-animation: transmogrify ease 60s;
  -ms-animation: transmogrify ease 60s;
  animation-iteration-count: infinite;
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
.spring-list.progress {
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
.spring-list li, .spring-list.title-message {
  text-shadow: 1px 1px #333;
}
.solved {
  color: #ffffff;
}
.asc {
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
.helper-bar:hover {
  box-shadow: 0 0 5px 10px rgba(230,0,115,0.3);
  text-shadow: 0 0 20px #eee, 0 0 30px #eee, 0 0 40px #ff7070, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff7070;
}
.helper-bar > .icon-game {
  position: relative;
  top: 2px;
}

@keyframes fade { 
	0% {opacity: 0.25;} 
	50% {opacity: 0.9;}
  100% {opacity: 0.25;}
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