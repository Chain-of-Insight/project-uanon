<!-- Welcome Observers, to the Ancient mausoleum -->
<template>

  <div class="summer-wrap" v-if="rdy && ag == false">
  
    <!-- The Wrath of God -->
    <div class="content-i wr">
      <iframe id="wrath" src="https://www.youtube.com/embed/JrokMa1QlKo?rel=0&amp;autoplay=1&mute=0&enablejsapi=1&controls=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>

    <div class="v-ctrl blood" @click="sound();">
      <span class="icon icon-volume_up" title="Toggle sound" v-if="v"></span>
      <span class="icon icon-volume_off" title="Toggle sound" v-if="!v"></span>
    </div>
    <div class="v-ctrl-2 blood" @click="impatient();">
      <span class="icon-question"></span>
    </div>
    <div class="patience" :class="{hidden: !info}">
      <span class="p-close float-right" @click="info=false;">&#x2715;</span>
      <p>Patience Pilgrim, you only have to watch it once.</p>
    </div>
  </div>

  <div class="summer-wrap" v-if="rdy && ag == true">
    <!-- The Bloody Desert -->
    <div class="content-i">
      <svg v-if="b">
        <defs></defs>
      </svg>
    </div>

    <!-- And Twisting Path -->
    <div class="content-wrapper jumbotron" :class="{ascended: asc}">
  
      <div class="pane-s summer-list title-message">
        <h1>{{m}}</h1>
      </div>
      <div class="pane-s summer-list progress">
        <div class="progress bt">
          <div class="progress-bar" :style="'width:' + prg + '%;'"></div>
        </div>
      </div>
      <div class="content-s resume">

        <section class="header-t">
          <div class="content-s summer-list list-items" v-if="s.length">

            <ul class="summer-list ul" v-if="s[0]['priv']">
              <li class="summer-list li" v-for="(p, i) in s" :key="p.pub">
                <span class="not-solved li" v-if="!p.priv && s[i-1].priv == false && ((i>5) && s[5].priv == false)"><a>Summer {{(i+1)}}</a></span>
                <router-link class="not-solved li" :to="'/summer/' + (i+1)" v-if="!p.priv && s[i-1].priv !== false || (i>5) && s[5].priv !== false && !p.priv">Summer {{(i+1)}}</router-link>
                <router-link class="solved li" :to="'/summer/' + (i+1)" v-if="p.priv">Summer {{i+1}} - SOLVED</router-link>
              </li>
              <li v-if="s[(s.length-1)].priv">
                <router-link class="not-solved li" :to="'/summer/the-land-vomits-ghosts'" v-if="!asc">Summer ‿︵‿︵‿ Ascension</router-link>
                <h3 v-if="asc">
                  <router-link class="asc li" :to="'/summer/the-land-vomits-ghosts'">Summer ‿︵‿︵‿/\^/\‿︵‿︵‿ Ascension - ASCENDED</router-link>
                </h3>
              </li>
              <li v-if="asc">
                <h3><router-link class="asc li" :to="'/summer/gg'">View Ascension</router-link></h3>
              </li>
            </ul>
            <ul class="summer-list ul" v-else>
              <li class="summer-list li" v-for="(p, i) in s" :key="p.pub">
                <router-link class="not-solved li" :to="'/summer/1'" v-if="i == 0">Summer 1</router-link>
                <span class="not-solved li" v-if="i > 0"><a>Summer {{(i+1)}}</a></span>
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

import make from '../../../aesthetics/a3';

export default {
  name: 'Summers',
  data: () => ({
    api: api,
    a: make,
    b: true,
    c: null,
    l: null,
    m: 'Descend',
    o: null,
    p: null,
    r: false,
    s: [],
    t: null,
    v: true,
    ag: null,
    do: store,
    cd: false,
    gd: false,
    sh: false,
    pz: {},
    un: null,
    def: ['summer', 2],
    rdy: false,
    str: {},
    asc: false,
    info: false
  }),
  mounted: async function () {
    await this.getS();
    await this.getU();
    if (window.localStorage.getItem('_u_ag')) {
      this.ma();
      window.addEventListener('resize', this.rm);
    }
    await this.truths();
  },
  methods: {
    getS: async function () {
      if (window) {
        let a = window.localStorage.getItem('_u_ag');
        this.ag = (a) ? true : false;
        if (!this.ag) {
          window.setTimeout(() => {
            window.localStorage.setItem('_u_ag', true);
            this.ag = true;
            this.$nextTick(async () => {
              await this.ma();
              window.addEventListener('resize', this.rm);
            });
          }, 328000);
        }
        // console.log('this.ag', this.ag);
      }
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
    rm: async function () {
      this.b = false;
      this.b = true;
      await this.ma();
    },
    impatient: function () {
      this.info = !this.info;
    },
    /**
     * @param {?Boolean} s : Optional param to hard mute / unmute instead of toggle
     */
    sound: function (s = null) {
      const y = document.getElementById('wrath');
      if (s == null) {
        this.v = !this.v;
      } else if (s) {
        this.v = true;
      } else {
        this.v = false;
      }
      if (this.v == false) {
        y.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
      } else {
        y.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
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
div.center {
  display: block;
  max-width: 80vw;
  margin: auto;
  position: relative;
}
.content-i {
  position: fixed; 
  top: 50px; 
  width: 100%; 
  height: 100%; 
  z-index: -1;
  pointer-events: none;
}
.content-i.wr {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
iframe {
  position: relative;
  top: -5%;
  left: -2%;
  width: 100%;
  height: 110%;
  border-radius: 4em;
}
.v-ctrl {
  position: absolute;
  right: 4em;
  bottom: 45px;
  border-radius: 20%;
  padding: 0.1em;
  cursor: pointer;
  border: 1px solid rgba(255,112,112,0.25);
}
.v-ctrl-2 {
  position: absolute;
  right: 7em;
  bottom: 45px;
  border-radius: 20%;
  padding: 0.1em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  cursor: pointer;
  border: 1px solid rgba(255,112,112,0.25);
}
.patience {
  position: absolute;
  right: 4em;
  bottom: 100px;
  border: 1px solid #ff7070;
  background-color: rgba(255,112,112,0.25);
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
.v-ctrl span {
  position: relative;
  top: 3px;
  clear: both;
  cursor: pointer;
}
.v-ctrl-2 span {
  position: relative;
  top: 3px;
  clear: both;
  cursor: pointer;
}

.v-ctrl:hover {
  box-shadow: 0 0 5px 10px rgba(230,0,115,0.3);
  text-shadow: 0 0 20px #eee, 0 0 30px #eee, 0 0 40px #ff7070, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff7070;
}

.v-ctrl-2:hover {
  box-shadow: 0 0 5px 10px rgba(230,0,115,0.3);
  text-shadow: 0 0 20px #eee, 0 0 30px #eee, 0 0 40px #ff7070, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff7070;
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
.summer-list.progress {
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
.summer-list li, .summer-list.title-message {
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
</style>