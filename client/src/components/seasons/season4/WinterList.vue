<!-- Welcome Observers, to an UNPRECEDENTED! season -->
<template>

  <div class="winter-wrap" v-if="rdy">

    <div class="ctx">
      <canvas id="canvas" :width="an.width" :height="an.height"></canvas>
      <div class="guardian">
        <span class="the decades">A desert with dead trees...and bitter cold black piercing stars</span>
<!--
                                   ____
  ________________________/ O  \___/
 <888888888888888888888888_____/   \
-->
      </div>
    </div>

    <!-- Inside the jade forest -->
    <div class="content-wrapper jumbotron" :class="{ascended: asc}">
  
      <div class="pane-s winter-list title-message">
        <h1>{{m}}</h1>
      </div>
      <div class="pane-s winter-list progress">
        <div class="progress bt">
          <div class="progress-bar" :style="'width:' + prg + '%;'"></div>
        </div>
      </div>
      <div class="content-s resume">

        <section class="header-t">
          <div class="content-s winter-list list-items" v-if="s.length">

            <!-- 
              Демократия – это собрание психически нездоровых людей в 
              попытке компенсировать дефекты их психической организации, 
              хотя сложение недостатков вовсе не приводит к положительному 
              результату.
            -->

            <ul class="winter-list ul" v-if="s[0]['priv']">
              <li class="winter-list li" v-for="(p, i) in s" :key="p.pub">
                <span class="not-solved li" v-if="!p.priv && s[i-1].priv == false"><a>Winter {{(i+1)}}</a></span>
                <router-link class="not-solved li" :to="'/winter/' + (i+1)" v-if="!p.priv && s[i-1].priv !== false || (i>5) && s[5].priv !== false && !p.priv">Winter {{(i+1)}}</router-link>
                <router-link class="solved li" :to="'/winter/' + (i+1)" v-if="p.priv">Winter {{i+1}} ❄ SOLVED</router-link>
              </li>
              <li v-if="s[(s.length-1)].priv">
                <router-link class="not-solved li" :to="'/winter/so-i-can-feel-happier'" v-if="!asc">Winter ❄❄︵‿︵‿❄❄ Ascension</router-link>
                <h3 v-if="asc">
                  <router-link class="asc li" :to="'/winter/so-i-can-feel-happier'">Winter ❄❄︵‿/\^/\︵‿❄❄ Ascension - ASCENDED</router-link>
                </h3>
              </li>
              <li v-if="asc">
                <h3><router-link class="asc li" :to="'/winter/safe-up-here-with-you'">View Ascension</router-link></h3>
              </li>
            </ul>
            <ul class="winter-list ul" v-else>
              <li class="winter-list li" v-for="(p, i) in s" :key="p.pub">
                <router-link class="not-solved li" :to="'/winter/1'" v-if="i == 0">Winter 1</router-link>
                <span class="not-solved li" v-if="i > 0"><a>Winter {{(i+1)}}</a></span>
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

import make from '../../../aesthetics/a7';

export default {
  name: 'Winters',
  data: () => ({
    a: make,
    b: true,
    c: null,
    l: null,
    m: 'Obscurantism',
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
    def: ['winter', 4],
    rdy: false,
    str: {},
    asc: false,
    info: false
  }),
  mounted: async function () {
    await this.getS();
    await this.getU();
    await this.truths();
    this.an.width = (window) ? window.innerWidth : null;
    this.an.height = (window) ? window.innerHeight : null;
    setTimeout(() => {
      this.ma();
    },0);
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
.winter-wrap {
  background-image: url('/img/3450804e9328585e42a89335475f2317785c6f09feac8e5c0b5ada225ec4fd2b.png');
  background-repeat: repeat-x;
  background-size: cover;
  overflow: hidden;
  position: fixed;
  top: 52px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  animation: snowstorm ease 660s;
  -webkit-animation: snowstorm ease 660s;
  -moz-animation: snowstorm ease 660s;
  -o-animation: snowstorm ease 660s;
  -ms-animation: snowstorm ease 660s;
  animation-iteration-count: infinite;
}
canvas {
  display: block;
}
div.center {
  display: block;
  max-width: 80vw;
  margin: auto;
  position: relative;
}
.guardian {
  position: absolute;
  bottom: 100px;
  width: 100%;
}
.guardian span {
  width: 579px;
  margin: auto;
  display: block;
  position: relative;
  border: 1px solid transparent;
  color: rgba(0,0,0,0);
  background-color: transparent;
  padding: 1em;
  border-radius: 6px;
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
  background-color: unset;
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

@keyframes snowstorm {
  0% {filter: hue-rotate(55deg) invert(10%);}
  50% {filter: hue-rotate(155deg) invert(22%);}
  100% {filter: hue-rotate(55deg) invert(10%);}
}
@-moz-keyframes snowstorm {
  0% {filter: hue-rotate(55deg) invert(10%);}
  50% {filter: hue-rotate(155deg) invert(22%);}
  100% {filter: hue-rotate(55deg) invert(10%);}
}
@-webkit-keyframes snowstorm {
  0% {filter: hue-rotate(55deg) invert(10%);}
  50% {filter: hue-rotate(155deg) invert(22%);}
  100% {filter: hue-rotate(55deg) invert(10%);}
}
@-o-keyframes snowstorm {
  0% {filter: hue-rotate(55deg) invert(10%);}
  50% {filter: hue-rotate(155deg) invert(22%);}
  100% {filter: hue-rotate(55deg) invert(10%);}
}
@-ms-keyframes snowstorm {
  0% {filter: hue-rotate(55deg) invert(10%);}
  50% {filter: hue-rotate(155deg) invert(22%);}
  100% {filter: hue-rotate(55deg) invert(10%);}
}
</style>