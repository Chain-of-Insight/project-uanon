<!-- Welcome To The Greatest Filibuster -->
<template>

  <div class="cryptowinter-wrap" v-if="rdy">

    <div class="ctx">
      <canvas id="canvas" :width="an.width" :height="an.height"></canvas>
      <button id="stopgap" class="btn btn-inverse" @click="ds();">STOP IT!</button>
    </div>

    <!-- Inside the jade forest -->
    <div class="content-wrapper jumbotron" :class="{ascended: asc}">
  
      <div class="pane-s cryptowinter-list title-message">
        <h1>{{m}}</h1>
      </div>
      <div class="pane-s cryptowinter-list progress">
        <div class="progress bt">
          <div class="progress-bar" :style="'width:' + prg + '%;'"></div>
        </div>
      </div>
      <div class="content-s resume">

        <section class="header-t">
          <div class="content-s cryptowinter-list list-items" v-if="s.length">

            <ul class="cryptowinter-list ul" v-if="s[0]['priv']">
              <li class="cryptowinter-list li" v-for="(p, i) in s" :key="p.pub">
                <span class="not-solved li" v-if="!p.priv && s[i-1].priv == false"><a>Cryptowinter {{(i+1)}}</a></span>
                <router-link class="not-solved li" :to="'/cryptowinter/' + (i+1)" v-if="!p.priv && s[i-1].priv !== false || (i>5) && s[5].priv !== false && !p.priv">Winter {{(i+1)}}</router-link>
                <router-link class="solved li" :to="'/cryptowinter/' + (i+1)" v-if="p.priv">Cryptowinter {{i+1}} $ SOLVED</router-link>
              </li>
              <li v-if="s[(s.length-1)].priv">
                <router-link class="not-solved li" :to="'/cryptowinter/sleep-paralysis'" v-if="!asc">Cryptowinter $$︵‿︵‿$$ Ascension</router-link>
                <h3 v-if="asc">
                  <router-link class="asc li" :to="'/cryptowinter/sleep-paralysis'">Cryptowinter $$︵‿/\^/\︵‿$$ Ascension - ASCENDED</router-link>
                </h3>
              </li>
              <li v-if="asc">
                <h3><router-link class="asc li" :to="'/cryptowinter/are-these-demons-real'">View Ascension</router-link></h3>
              </li>
            </ul>
            <ul class="cryptowinter-list ul" v-else>
              <li class="cryptowinter-list li" v-for="(p, i) in s" :key="p.pub">
                <router-link class="not-solved li" :to="'/cryptowinter/1'" v-if="i == 0">Cryptowinter 1</router-link>
                <span class="not-solved li" v-if="i > 0"><a>Cryptowinter {{(i+1)}}</a></span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>

  </div>
</template>

<script>
import { getActiveAccount } from '../../../util/tezos';
import { getTruthShard } from '../../../util/contract';
import * as Config from '../../../conf/constants';
import * as api from '../../../util/api';
import store from '../../../util/storage';

import * as make from '../../../aesthetics/a8';

export default {
  name: 'Crypto Winters',
  data: () => ({
    a: make,
    b: true,
    c: null,
    l: null,
    m: 'EVERYTHING',
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
    def: ['cryptowinter', 5],
    rdy: false,
    str: {},
    asc: false,
    info: false,
    clear: null
  }),
  mounted: async function () {
    await this.getS();
    await this.getU();
    await this.truths();
    this.an.width = (window) ? window.innerWidth : null;
    this.an.height = (window) ? window.innerHeight : null;
    this.a.init();
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
        console.log('Season:', this.s);
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
      setTimeout(() => {
        this.ma();
      },0);
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
    ma: function () {
      this.clear = setInterval(this.a.draw, 33);
    },
    ds: function () {
      if (this.clear) this.a.stop(this.clear);
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
  z-index: -1;
}
#stopgap {
  position: fixed;
  bottom: 1em;
  right: 1em;
}
</style>