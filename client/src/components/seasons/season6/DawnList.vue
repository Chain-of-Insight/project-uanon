<!-- The final self -->
<template>

  <div class="dawn-wrap" v-if="rdy" title="Click the lower void to halt or resume growth" alt="Click the lower void to halt or resume growth">

    <div class="ctx">
      <canvas id="canvas"></canvas>
    </div>

    <!-- In the fog of history -->
    <div class="content-wrapper jumbotron" :class="{ascended: asc}">
  
      <div class="pane-s dawn-list title-message">
        <h1>{{m}}</h1>
      </div>
      <div class="pane-s dawn-list progress">
        <div class="progress bt">
          <div class="progress-bar" :style="'width:' + prg + '%;'"></div>
        </div>
      </div>
      <div class="content-s resume">

        <section class="header-t">
          <div class="content-s dawn-list list-items" v-if="s.length">              
            <ul class="dawn-list ul">
              <li class="dawn-list li" v-for="(p, i) in s" :key="p.pub">
                <router-link class="not-solved li" :to="'/dawn/' + (i+1)" v-if="!p.priv">Dawn {{(i+1)}}</router-link>
                <router-link class="lit li" :to="'/dawn/' + (i+1)" v-if="p.priv">🕯️ Dawn {{(i+1)}} - SOLVED 🕯️</router-link>
              </li>
              <li v-if="s[(s.length-1)].priv">
                <router-link class="not-solved li" :to="'/dawn/future-histories'" v-if="!asc">Dawn ︵‿/\^/\︵‿ Ascension</router-link>
                <h3 v-if="asc">
                  <router-link class="asc lit li" :to="'/dawn/future-histories'">Dawn ︵‿/\^/\︵‿ Ascension - ASCENDED</router-link>
                </h3>
              </li>
              <li v-if="asc">
                <h3><router-link class="asc lit li" :to="'/dawn/comprehension'">View Ascension</router-link></h3>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>

  </div>

  <div class="open-c inner">
    <p class="helper-bar float-right" @click="k();" title="What is True?">
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
                <h1 class="blood" v-if="page == 0">The Mansion</h1>
                <h1 class="blood" v-if="page == 1">Password Formatting</h1>
                <div type="button" class="close" @click="k();">
                  <span class="close-x" aria-hidden="true">&times;</span>
                </div>
              </div>
              <div class="modal-body">
                <div class="mansion" v-if="page == 0">
                  <div>There's no flesh, there's no fingers. In my hair, I see a tunnel<br/>
We built walls, tall and solid between the treasure and the shovel<br/>
I see an inn, I see a fountain, there's a trail over the mountain<br/>
There's no wayside, there's no stopping and the peak is wide and rocky<br/>
There's no ceiling in the mansion, there's no waste, no hesitation<br/>
There's no crack of dawn, no morning, just an everlasting warming</div>
                </div>
                <div class="rulers" v-if="page == 1">
                  <ol>
                    <li>All passwords in Season 6 (Dawn) share the same format requirements</li>
                    <li>This includes both intermediate and final passwords (e.g. process steps and what needs to be submitted to the prover)</li>
                    <li>The format is: <strong>uppercase with spaces removed</strong></li>
                    <li>Passwords may still contain numbers. Example: "V3RYL33TP4SSW0RD"</li>
                    <li>Passwords may also contain non-English characters. Example: "TOMASGÖSTATRANSTRÖMER"</li>
                    <li>Passwords may also contain punctuation characters. Example: "CRIMEDOESN'TFRAY"</li>
                    <li>In some cases (e.g. HOLLOW EARTH console), passwords will be auto formatted for your convenience</li>
                    <li>Note that automatic formatting will not be applied to password protected zip files, or answers submitted to the prover</li>
                  </ol>
                  <h5 class="cyan">We wish you luck in this final journey</h5>
                </div>
              </div>
              <div class="modal-footer">
                <div class="ctrl-t">
                  <div class="left float-left">
                    <button class="btn btn-inverse" :disabled="page == 0" @click="page = 0;">&laquo;</button>
                  </div>
                  <div class="right float-right">
                    <button class="btn btn-inverse" :disabled="page == 1" @click="page = 1;">&raquo;</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { getActiveAccount } from '../../../util/tezos';
import { getTruthShard } from '../../../util/contract';
import * as Config from '../../../conf/constants';
import * as api from '../../../util/api';
import store from '../../../util/storage';

import make from '../../../aesthetics/a5';

export default {
  name: 'Dawns',
  data: () => ({
    a: make,
    b: true,
    c: null,
    l: null,
    m: 'FRAGILE VICTORIES',
    o: null,
    p: null,
    r: false,
    s: [],
    t: null,
    v: true,
    ag: null,
    an: {width: null, height: null},
    do: store,
    cd: false,
    gd: false,
    sh: false,
    pz: {},
    un: null,
    api: api,
    def: ['dawn', 6],
    inf: false,
    rdy: false,
    str: {},
    asc: false,
    info: false,
    clear: null,
    page: 0,
  }),
  mounted: async function () {
    await this.getS();
    await this.getU();
    await this.truths();
    
    setTimeout(() => {
      this.$nextTick(async() => {
        await this.ma();
      });
    }, 0)
  },
  methods: {
    getS: async function () {
      this.rdy = true;
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
      await this.a();
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
canvas {
  display: block;
}
div.center {
  display: block;
  max-width: 80vw;
  margin: auto;
  position: relative;
}
.p-close {
  position: relative;
  top: -15px;
  right: -3px;
  color: #ff7070;
  border: none;
  cursor: pointer;
  z-index: 2000;
}
.header-t, .jumbotron {
  max-height: 70vh;
}
.jumbotron {
  overflow-y: auto;
  margin-top: 0;
  background-color: #333;
}
.resume {
  margin-top: 2em;
}
.btn-hide {
  margin-top: 1em;
  margin-bottom: 2em;
}
.solve.solve-t {
  z-index: 2000;
  width: 100%;
  min-height: 5vh;
}
.open-c.inner > .helper-bar {
  z-index: 2001;
}
.winter-list.progress {
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
.winter-list li, .winter-list.title-message {
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
#canvas {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  pointer-events: none;
}
div.hierarchies {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
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
  height: 80vh;
  background: transparent;
  overflow: auto;
  padding: 2em;
  line-height: 2em;
  gap: 2em;
}
.modal-body.st-4 {
  height: auto !important;
  max-height: 92.5vh;
}
.modal-footer {
  border-top: 1px solid #000000;
}
.open-c.inner > .helper-bar {
  z-index: 2001;
}
.ctrl-t {
  clear: both;
  width: 100%;
}
.left .btn, .right .btn {
  margin-right: 0.25em;
}
.mansion > div {
  max-width: 625px;
  margin: auto;
}
.lit {
  text-shadow:
    0 0 5px #000,
    0 0 10px #000,
    0 0 20px #000,
    0 0 40px #a17434,
    0 0 100px #fff,
    0 0 150px #fff;
}
</style>