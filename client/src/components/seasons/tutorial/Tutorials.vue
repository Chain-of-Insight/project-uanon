<template>
  <div class="content-s tutorials-list animation">
    <svg v-if="b">
      <defs>
        <linearGradient id="snow" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#F9BDF3"/>
          <stop offset="100%" stop-color="#111111"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
  <div class="content-wrapper" :class="{j: asc, ascended: asc}">
    <div class="pane-s tutorials-list title-message">
      <h1>{{m}}</h1>
    </div>
    <div class="pane-s tutorials-list progress">
      <div class="progress bt">
        <div class="progress-bar" :style="'width:' + prg + '%;'"></div>
      </div>
    </div>
    <div class="content-s tutorials-list list-items" v-if="s.length">
      <ul class="tutorials-list ul" v-if="s[0]['priv']">
        <li class="tutorials-list li" v-for="(p, i) in s" :key="p.pub">
          <span class="not-solved li" v-if="!p.priv && s[i-1].priv == false"><a>Tutorial {{(i + 1)}}</a></span>
          <router-link class="not-solved li" :to="'/tutorial/' + (i + 1)" v-if="!p.priv && s[i-1].priv !== false">Tutorial {{(i + 1)}}</router-link>
          <router-link class="solved li" :to="'/tutorial/' + (i + 1)" v-if="p.priv">Tutorial {{(i + 1)}}  - SOLVED</router-link>
        </li>
      </ul>
      <ul class="tutorials-list ul" v-else>
        <li class="tutorials-list li" v-for="(p, i) in s" :key="p.pub">
          <router-link class="not-solved li" :to="'/tutorial/1'" v-if="i == 0">Tutorial 1</router-link>
          <span class="not-solved li" v-if="i > 0"><a>Tutorial {{(i + 1)}}</a></span>
        </li>
      </ul>
    </div>
    <div class="cipher" v-if="c && !asc">
      <span class="icon-public_off icon-cipher"></span><span class="icon-legend_toggle icon-cipher"></span><span class="icon-coronavirus icon-cipher"></span><span class="icon-coronavirus icon-cipher"></span><span class="icon-balance-scale icon-cipher"></span><span class="icon-notion icon-cipher"></span><span class="icon-blur_off icon-cipher"></span><span class="icon-legend_toggle icon-cipher"></span><span class="icon-notist icon-cipher"></span><span class="icon-coronavirus icon-cipher"></span><span class="icon-sparkle icon-cipher"></span><span class="icon-flight_takeoff icon-cipher"></span><span class="icon-legend_toggle icon-cipher"></span><span class="icon-menu_book icon-cipher"></span><span class="icon-public_off icon-cipher"></span><span class="icon-legend_toggle icon-cipher"></span><span class="icon-support icon-cipher"></span><span class="icon-sparkle icon-cipher"></span><span class="icon-game icon-cipher"></span><span class="icon-power_input icon-cipher"></span><span class="icon-view_module icon-cipher"></span><span class="icon-notion icon-cipher"></span><span class="icon-menu_book icon-cipher"></span><span class="icon-coronavirus icon-cipher"></span><span class="icon-game icon-cipher"></span><span class="icon-music icon-cipher"></span><span class="icon-puzzle-piece icon-cipher"></span><span class="icon-power_input icon-cipher"></span><span class="icon-satellite icon-cipher"></span><span class="icon-switch_left icon-cipher"></span><span class="icon-power_input icon-cipher"></span><span class="icon-satellite icon-cipher"></span><span class="icon-legend_toggle icon-cipher"></span><span class="icon-puzzle-piece icon-cipher"></span><span class="icon-notion icon-cipher"></span><span class="icon-coronavirus icon-cipher"></span><span class="icon-balance-scale icon-cipher"></span><span class="icon-balance-scale icon-cipher"></span><span class="icon-sparkle icon-cipher"></span><span class="icon-menu_book icon-cipher"></span><span class="icon-offline_bolt icon-cipher"></span><span class="icon-blur_off icon-cipher"></span><span class="icon-legend_toggle icon-cipher"></span><span class="icon-grid_off icon-cipher"></span><span class="icon-grid_off icon-cipher"></span><span class="icon-buildings icon-cipher"></span><span class="icon-support icon-cipher"></span><span class="icon-game icon-cipher"></span><span class="icon-grid_off icon-cipher"></span><span class="icon-puzzle-piece icon-cipher"></span><span class="icon-flight_takeoff icon-cipher"></span><span class="icon-notion icon-cipher"></span><span class="icon-switch_left icon-cipher"></span><span class="icon-sparkle icon-cipher"></span><span class="icon-support icon-cipher"></span><span class="icon-notion icon-cipher"></span><span class="icon-menu_book icon-cipher"></span><span class="icon-coronavirus icon-cipher"></span><span class="icon-balance-scale icon-cipher"></span><span class="icon-view_module icon-cipher"></span><span class="icon-menu_book icon-cipher"></span><span class="icon-legend_toggle icon-cipher"></span><span class="icon-legend_toggle icon-cipher"></span><span class="icon-notion icon-cipher"></span><span class="icon-view_module icon-cipher"></span><span class="icon-balance-scale icon-cipher"></span><span class="icon-legend_toggle icon-cipher"></span><span class="icon-directions_off icon-cipher"></span><span class="icon-notion icon-cipher"></span><span class="icon-blur_off icon-cipher"></span><span class="icon-grid_off icon-cipher"></span><span class="icon-sparkle icon-cipher"></span><span class="icon-blur_off icon-cipher"></span><span class="icon-balance-scale icon-cipher"></span><span class="icon-view_module icon-cipher"></span><span class="icon-switch_left icon-cipher"></span><span class="icon-coronavirus icon-cipher"></span><span class="icon-coronavirus icon-cipher"></span><span class="icon-notion icon-cipher"></span><span class="icon-view_module icon-cipher"></span><span class="icon-coronavirus icon-cipher"></span><span class="icon-game icon-cipher"></span><span class="icon-music icon-cipher"></span><span class="icon-puzzle-piece icon-cipher"></span><span class="icon-power_input icon-cipher"></span><span class="icon-switch_right icon-cipher"></span>
    </div>
    <div class="j ascended offset" v-if="c && asc">
      <h3 class="asc">Tutorial 6 - ASCENDED</h3>
      <div class="solved ascended">
        <span class="icon-public_off icon-cipher"></span><span class="icon-legend_toggle icon-cipher"></span><span class="icon-coronavirus icon-cipher"></span><span class="icon-coronavirus icon-cipher"></span><span class="icon-balance-scale icon-cipher"></span><span class="icon-notion icon-cipher"></span><span class="icon-blur_off icon-cipher"></span><span class="icon-legend_toggle icon-cipher"></span><span class="icon-notist icon-cipher"></span><span class="icon-coronavirus icon-cipher"></span><span class="icon-sparkle icon-cipher"></span><span class="icon-flight_takeoff icon-cipher"></span><span class="icon-legend_toggle icon-cipher"></span><span class="icon-menu_book icon-cipher"></span><span class="icon-public_off icon-cipher"></span><span class="icon-legend_toggle icon-cipher"></span><span class="icon-support icon-cipher"></span><span class="icon-sparkle icon-cipher"></span><span class="icon-game icon-cipher"></span><span class="icon-power_input icon-cipher"></span><span class="icon-view_module icon-cipher"></span><span class="icon-notion icon-cipher"></span><span class="icon-menu_book icon-cipher"></span><span class="icon-coronavirus icon-cipher"></span><span class="icon-game icon-cipher"></span><span class="icon-music icon-cipher"></span><span class="icon-puzzle-piece icon-cipher"></span><span class="icon-power_input icon-cipher"></span><span class="icon-satellite icon-cipher"></span><span class="icon-switch_left icon-cipher"></span><span class="icon-power_input icon-cipher"></span><span class="icon-satellite icon-cipher"></span><span class="icon-legend_toggle icon-cipher"></span><span class="icon-puzzle-piece icon-cipher"></span><span class="icon-notion icon-cipher"></span><span class="icon-coronavirus icon-cipher"></span><span class="icon-balance-scale icon-cipher"></span><span class="icon-balance-scale icon-cipher"></span><span class="icon-sparkle icon-cipher"></span><span class="icon-menu_book icon-cipher"></span><span class="icon-offline_bolt icon-cipher"></span><span class="icon-blur_off icon-cipher"></span><span class="icon-legend_toggle icon-cipher"></span><span class="icon-grid_off icon-cipher"></span><span class="icon-grid_off icon-cipher"></span><span class="icon-buildings icon-cipher"></span><span class="icon-support icon-cipher"></span><span class="icon-game icon-cipher"></span><span class="icon-grid_off icon-cipher"></span><span class="icon-puzzle-piece icon-cipher"></span><span class="icon-flight_takeoff icon-cipher"></span><span class="icon-notion icon-cipher"></span><span class="icon-switch_left icon-cipher"></span><span class="icon-sparkle icon-cipher"></span><span class="icon-support icon-cipher"></span><span class="icon-notion icon-cipher"></span><span class="icon-menu_book icon-cipher"></span><span class="icon-coronavirus icon-cipher"></span><span class="icon-balance-scale icon-cipher"></span><span class="icon-view_module icon-cipher"></span><span class="icon-menu_book icon-cipher"></span><span class="icon-legend_toggle icon-cipher"></span><span class="icon-legend_toggle icon-cipher"></span><span class="icon-notion icon-cipher"></span><span class="icon-view_module icon-cipher"></span><span class="icon-balance-scale icon-cipher"></span><span class="icon-legend_toggle icon-cipher"></span><span class="icon-directions_off icon-cipher"></span><span class="icon-notion icon-cipher"></span><span class="icon-blur_off icon-cipher"></span><span class="icon-grid_off icon-cipher"></span><span class="icon-sparkle icon-cipher"></span><span class="icon-blur_off icon-cipher"></span><span class="icon-balance-scale icon-cipher"></span><span class="icon-view_module icon-cipher"></span><span class="icon-switch_left icon-cipher"></span><span class="icon-coronavirus icon-cipher"></span><span class="icon-coronavirus icon-cipher"></span><span class="icon-notion icon-cipher"></span><span class="icon-view_module icon-cipher"></span><span class="icon-coronavirus icon-cipher"></span><span class="icon-game icon-cipher"></span><span class="icon-music icon-cipher"></span><span class="icon-puzzle-piece icon-cipher"></span><span class="icon-power_input icon-cipher"></span><span class="icon-switch_right icon-cipher"></span>
      </div>
    </div>
  </div>
  <div class="solve-c" v-if="c && pz.secret">
    <div class="open-c inner">
      <p class="helper-bar float-right" @click="gopen();" v-if="pz.bundle">
        <span class="icon icon-game"></span>
      </p>
    </div>
    <Graphical 
      v-bind:s="pz.secret"
      v-bind:r="def[0] + '+'"
      v-bind:f="pz.fields"
      v-bind:o="gd"
      v-bind:i="0"
      v-bind:p="pz"
      v-bind:t="pz.title"
      v-bind:rst="true"
      v-bind:tx="true"
      v-if="pz.secret"
      @proof="retain"
      @gclose="gclose"
      @op="truth"
    ></Graphical>
    <Console 
      v-bind:s="pz.secret"
      v-bind:d="cd"
      v-bind:i="0"
      v-bind:r="def[0] + '+'"
      v-bind:p="pz"
      v-bind:q="true"
      v-bind:tx="true"
      v-if="pz.secret"
      @proof="retain"
    ></Console>
  </div>
</template>

<script>
import * as Config from '../../../conf/constants';
import * as api from '../../../util/api';
import store from '../../../util/storage';

import make from '../../../aesthetics/a1';

import Graphical from '../../children/soulve/Graphical.vue';
import Console from '../../children/soulve/Console.vue';

export default {
  name: 'Tutorials',
  components: { Graphical, Console },
  data: () => ({
    api: api,
    a: make,
    b: true,
    c: null,
    l: null,
    m: 'Learn',
    p: null,
    r: false,
    s: [],
    t: null,
    do: store,
    cd: false,
    gd: false,
    pz: {},
    def: ['tutorial', 0],
    str: {},
    asc: false
  }),
  mounted: async function () {
    await this.getS();
    await this.ma();
    this.c = await this.ic();
    if (this.c) {
      await this.getC();
    }
    window.addEventListener('resize', this.rm);
  },
  methods: {
    getC: async function () {
      let s = this.do.store.get();
      if (s['ascensions']) {
        if (s.ascensions[this.def[0] + '+']) {
          this.asc = s.ascensions[this.def[0] + '+'];
        }
      }
      let s_i = s[this.def[0]][(s[this.def[0]].length - 1)];
      this.str = s[this.def[0]];
      let req = {
        index: 0, 
        realm: this.def[0] + '+',
        proof: s_i.proof
      }, d;
      let resp = await this.api.request.post('/puzzle/get', req);
      if (resp.status == 200 && resp.data) {
        d = resp.data;
        if (d.message) {
          this.pz = d.message;
          if (typeof this.pz == 'object') {
            this.prep();
          }
        }
      }
    },
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
        }
        // console.log('Season:', this.s);
      }
    },
    ma: async function () {
      await this.a();
    },
    rm: async function () {
      this.b = false; // Resets to blank svg
      this.b = true;  // Re-enables svg element
      await this.ma();
    },
    ic: async function () {
      if (!this.s) {
        return false;
      } else if (!Array.isArray(this.s)) {
        return false;
      } else if (this.s.length < 1) {
        return false;
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
      if (p === l) {
        return true;
      } else {
        return false;
      }
    },
    prep: function () {
      if (this.pz.id && this.str.length) {
        let a = [];
        for (let i = 0; i < this.str.length; i++) {
          if (this.str[i]) {
            if (this.str[i].proof) {
              a[i] = this.str[i].proof;
            }
          }
        }
        this.pz.bundle = a;
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
    },
    truth: function (t) {
      if (!this.asc) {
        this.asc = t;
        if (this.asc) {
          // console.log("Player has ascended");
          let r = this.def[0] + '+';
          this.do.store.ascend(r, this.asc);
        }
      }
    }
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
.content-wrapper {
  margin-bottom: 8em;
}
.tutorials-list.progress {
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
}
.solved {
  color: #ffffff;
}
span.not-solved {
  opacity: 0.5;
}
div.cipher {
  font-size: 2rem;
  position: relative;
  background-color: #333333;
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/4aefac88b597b312f457af4c6eb210bfeb2b614d861a9d8a380990e96c8823ab.png');
  background-size: cover;
  background-repeat: repeat;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  padding: 0.5em;
  border-radius: 2rem;
}
div.cipher span, div.cipher span:active, div.cipher span:focus {
  display: inline-block;
  margin: 0.25em;
  cursor: text !important;
}
div.solved.ascended {
  margin-top: 2em;
  display: inline-block;
  max-width: 100%;
  word-break: break-word;
}
div.j.ascended {
  animation: mythos ease 160s;
  -webkit-animation: mythos ease 160s;
  -moz-animation: mythos ease 160s;
  -o-animation: mythos ease 160s;
  -ms-animation: mythos ease 160s;
  animation-iteration-count: infinite;
  background-color: #333333;
  border-radius: 2em;
  padding: 4em;
}
div.j.ascended.content-wrapper {
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
}
div.j.ascended.offset {
  margin-top: 2.75em;
  margin-bottom: 2.75em;
  -moz-box-shadow: inset 0 0 1px #eee;
  -webkit-box-shadow: inset 0 0 1px #eee;
  box-shadow: inset 0 0 1px #eee;
  background-color: rgba(230,0,115,0.3);
}
h3.asc {
  margin: auto;
  background: -webkit-linear-gradient(#fff, #ff7070);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 0px 6px #ff7070;
}
.modal-mask {
  position: fixed;
  z-index: 1000;
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
#tzop {
  color: #000000;
}
ul {
  padding: 0;
  list-style: none;
}
button {
  margin: 0.5em;
}
.error-msg, .success-msg {
  padding: 1em;
  color: #ffffff;
  border-radius: 5px;
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
</style>