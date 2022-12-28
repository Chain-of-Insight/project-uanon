<template>

<!--
"wirt ovab ab hæabutrt, ovutelelth," ndabhwrtno'hw owabesthæabut hwestabutab 
ovrtwiabutel ebabno ovab hææutel hwabththnowi ovabowrtutab hæthhw hwrtno hæabhw 
hæhæababyoabel abhæabth. "wirtrtel inrtov, ovutel."
-->

  <div id="bg1"></div>
  <div id="bg2"></div>
  <div id="bg3"></div>

  <div class="winter-wrap console" v-if="rdy">

    <div class="content-s winter puzzle-content" v-if="p.id">
      
      <div id="game" class="jumbotron">

        <!-- Game Not Started -->
        <div class="pre-game" v-if="game.state == NOTSTARTED">

          <h2 class="title">TRICKY DRAMA</h2>
        
          <div class="cheaters rules">
            <div class="in-spite-of-the-ruler">
              <h3>Rulers:</h3>
              <ol class="honeyed cruellers">
                <li>Defend yourself against the "enemy" ⚔️🛡️</li>
                <li>Score points</li>
                <li>Don't miss</li>
              </ol>
            </div>
          </div>

          <!-- Game Start -->
          <button class="btn btn-primary start" @click="gameStart();">Start Game</button>

        </div>

        <!-- Playing -->
        <div class="active-game" v-if="game.state == PLAYING">
          <iframe id="tricky" class="sticky-drama" src="https://www.youtube.com/embed/td-e4i2BL_Q?rel=0&amp;autoplay=1&mute=0&enablejsapi=1&controls=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

          <div id="grid" class="grid">
            <table id="board">
              <tbody>
                <tr>
                  <td class="tile" id="loc_0" @click="handleClick"></td>
                  <td class="tile" id="loc_1" @click="handleClick"></td>
                  <td class="tile" id="loc_2" @click="handleClick"></td>
                </tr>
                <tr>
                  <td class="tile" id="loc_3" @click="handleClick"></td>
                  <td class="tile" id="loc_4" @click="handleClick"></td>
                  <td class="tile" id="loc_5" @click="handleClick"></td>
                </tr>
                <tr>
                  <td class="tile defense" id="loc_6" @click="handleClick"></td>
                  <td class="tile defense" id="loc_7" @click="handleClick"></td>
                  <td class="tile defense" id="loc_8" @click="handleClick"></td>
                </tr>
              </tbody>
            </table>
            <div><button class="btn btn-danger btn-power" @click="game.state = NOTSTARTED;"></button><br/>Points: <span id="points">{{game.points}}</span></div>
          </div>

        </div>

        <!-- Player Loss -->
        <div class="gameover" v-if="game.state == GAMEOVER">
          <h3>GAME OVER</h3>
          <p v-if="game.points > 0">You lose!</p>
          <p v-if="game.points <= 0">You died!</p>
          <ul class="scoreboard">
            <li>Points: {{game.points}}</li>
            <li>Bullseyes: {{hits}}</li>
            <li>Misses: {{misses}}</li>
          </ul>
          <!-- Game Reset -->
          <button class="btn btn-primary start" @click="gameReset();">Play Again</button>
        </div>

        <!-- Player Win -->
        <div class="gameunder" v-if="game.state == GAMEUNDER">
          <h3>GAME UNDER</h3>
          <p>You Win!</p>
          <ul class="scoreboard">
            <li>Points: {{game.points}}</li>
            <li>Bullseyes: {{hits}}</li>
            <li>Misses: {{misses}}</li>
          </ul>
          <!-- Game Reset -->
          <button class="btn btn-primary start" @click="gameReset();">Play Again</button>
        </div>

      </div>

      <!-- Pop Up -->
      <div id="popped" v-if="popup.show && popup.msg">
        <p class="blood">{{ popup.msg }}</p>
      </div>
    
    </div>

    <div class="content-s danger no-access" v-if="!a && i > 0">
      <p class="no-access descr" v-html="w"></p>
      <router-link to="/palilalia">Back</router-link>
    </div>

    <!-- Soulve -->
    <div class="open-c inner">
      <p class="helper-bar float-right" @click="handleCopen();" v-if="p.secret">
        <span class="icon icon-terminal2"></span>
      </p>
      <p class="helper-bar float-right" @click="gopen();" v-if="p.secret">
        <span class="icon icon-game"></span>
      </p>
    </div>

    <div class="v-ctrl blood" @click="sound();" v-if="game.state == PLAYING">
      <span class="icon icon-volume_up" title="Toggle sound" v-if="v"></span>
      <span class="icon icon-volume_off" title="Toggle sound" v-if="!v"></span>
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
      v-bind:tx="false"
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

  const CURRENT_I = 0;
  
  const GAME_STATE_NOTSTARTED = 0;
  const GAME_STATE_PLAYING = 1;
  const GAME_STATE_GAMEOVER = 2;
  const GAME_STATE_GAMEUNDER = 666;
  const GAME_DURATION = 347000;
  const GAME_MSG_DURATION = 4000;

  export default {
  name: 'Winter 1',
  components: { Console, Graphical },
  data: () => ({
    a: false,
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
    v: true,
    w: Config.notify.DEFAULT_PLAYER_WARNING,
    do: store,
    sl: null,
    sv: null,
    fi: null,
    un: null,
    str: {},
    def: ['winter', 4],
    rdy: false,
    argT: [false, false],
    game: {
      on: false,
      started: 0,
      points: 0,
      state: GAME_STATE_NOTSTARTED,
    },
    fail: null,
    hits: 0,
    misses: 0,
    score: [
      [{from:0,to:0,tile:null,laid:false}],
      [{from:0,to:0,tile:null,laid:false}],
      [{from:0,to:0,tile:null,laid:false}],
      [{from:0,to:0,tile:null,laid:false}],
      [{from:0,to:0,tile:null,laid:false}],
      [{from:0,to:0,tile:null,laid:false}],
      [{from:0,to:0,tile:null,laid:false}],
      [{from:0,to:0,tile:null,laid:false}]
    ],
    popup: { show: false, msg: null },
    NOTSTARTED: GAME_STATE_NOTSTARTED,
    PLAYING: GAME_STATE_PLAYING,
    GAMEOVER: GAME_STATE_GAMEOVER,
    GAMEUNDER: GAME_STATE_GAMEUNDER
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
    gameReset: function () {
      this.popup = {
        show: true,
        msg: this.p.drama[this.p.drama.length - 1]
      };
      setTimeout(()=> {
        this.clearPopup();
      }, GAME_MSG_DURATION);
      this.gameStart();
    },
    gameStart: function () {
      this.game = {
        on: true,
        points: 0,
        started: new Date().getTime(),
        state: GAME_STATE_PLAYING
      };
      for (let i = 0; i < this.score.length; i++) {
        this.score[i].laid = false;
      }
      this.v = true;
      this.p.drama = this.p.rawd;
      this.hits = 0;
      this.misses = 0;
      setTimeout(()=> {
        this.gameStop();
      }, GAME_DURATION);
    },
    handleClick: function (event) {
      if (!event) {
        return;
      }
      let id = (event['target']) ? event.target.id : null;
      if (typeof id !== 'string') {
        return;
      }
      let tile = parseInt(id.slice(-1));
      this.handleGameAction(tile);
    },
    handleGameAction: function (tile) {
      if (!this.game.started || typeof tile !== 'number') {
        return;
      }
      let diff = Math.round(((new Date().getTime()) - this.game.started) / 1000);
      let scored = false;
      for (let i = 0; i < this.score.length; i++) {
        let range = this.score[i];
        if (diff >= (range.from-4) && diff <= (range.to+4) && tile == range.tile) {
          scored = true;
          if (!range.laid) {
            this.scorePoint();
            this.score[i].laid = true;
          }
        } else {
          if (i == (this.score.length - 1) && !scored) {
            this.losePoint();
          }
        }
      }
    },
    anHero: function () {
      this.game.state = GAME_STATE_GAMEOVER;
    },
    losePoint: function () {
      ++this.misses;
      if (this.game.points > 0) {
        --this.game.points;
        if (this.game.points == 0) {
          this.anHero();
        }
      }
      this.popup = {
        show: true,
        msg: this.fail
      };
      setTimeout(()=> {
        this.clearPopup();
      }, GAME_MSG_DURATION);

      // TODO: Play point loss audio and screenflash
      console.log('Point lost', this.game.points);
    },
    scorePoint: function () {
      if (this.game.points == 666) {
        return;
      }

      ++this.game.points;
      ++this.hits;
      if (this.game.points == 8) {
        this.game.points = 666;
      }
      if (Array.isArray(this.p.drama)) {
        if (this.p.drama.length) {
          this.popup = {
            show: true,
            msg: (this.game.points > this.p.drama.length) ? this.p.drama[this.p.drama.length - 2] : this.p.drama[this.game.points - 1]
          };
        }
      }
      setTimeout(()=> {
        this.clearPopup();
      }, GAME_MSG_DURATION);

      // TODO: Play point scored audio and screenflash
      console.log('Point won', this.game.points);
    },
    gameStop: function () {
      let t = new Date().getTime();
      if ((t - this.game.started) < GAME_DURATION) {
        return;
      }
      if (!this.game.points) {
        this.game.state = GAME_STATE_GAMEOVER
      } else {
        this.game.state = (this.game.points >= 666) ? GAME_STATE_GAMEUNDER : GAME_STATE_GAMEOVER;
      }
    },
    clearPopup: function () {
      this.popup.show = false;
      this.popup.msg = null;
    },
    /**
     * @param {?Boolean} s : Optional param to hard mute / unmute instead of toggle
     */
    sound: function (s = null) {
      const y = document.getElementById('tricky');
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
      this.p.files = (m.files) ? m.files : null;
      this.p.fields = (m.fields) ? m.fields : 1;
      this.p.template = (m.template) ? m.template : null;
      this.p.tricky = (m.tricky) ? m.tricky : null;
      this.p.rawd = (m.drama) ? m.drama.slice(1) : [];
      this.p.warning = (m.warning) ? m.warning : null;
      this.p.format = (this.p.payload['format']) ? this.p.payload.format : null;

      if (m.drama.length) {
        this.fail = m.drama[0];
      }
      if (Array.isArray(this.p.files)) {
        for (let i = 0; i < this.p.files.length; i++) {
          let f = this.p.files[i].split('/');
          f = f[f.length - 1];
          this.p.files[i] = f;
        }
      }
      if (Array.isArray(this.p.tricky)) {
        for (let i = 0; i < this.p.tricky.length; i++) {
          let trick = this.p.tricky[i];
          if (trick.length == 3) {
            this.score[i].from = trick[0];
            this.score[i].to = trick[1];
            this.score[i].tile = trick[2];
          }
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
    handleCopen: function () {
      document.dispatchEvent(new KeyboardEvent('keypress',{'key':'`'}));
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
    },
  }
}
</script>

<style scoped>
#bg1, #bg2, #bg3 {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  border: 0;
  padding: 0;
  min-width: 100vw;
  min-height: 100vh;
  z-index: -1;
}
#bg1 {
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/5820f3104ed541f402e369c6da61ab87cae7e58e0ce56547922a0ba4d57721fd.png');
  background-size: cover;
  background-repeat: repeat;
  opacity: 0;
  animation: fade ease 60s;
  -webkit-animation: fade ease 60s;
  -moz-animation: fade ease 60s;
  -o-animation: fade ease 60s;
  -ms-animation: fade ease 60s;
  animation-iteration-count: infinite;
}
#bg2 {
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/cf3c6f0f3163a1c4b2aa788af8c88a0c1e9a3c3378e9178e2060ae8707d10898.png');
  background-size: cover;
  background-repeat: repeat;
  opacity: 0;
  animation: fade ease 45s;
  -webkit-animation: fade ease 45s;
  -moz-animation: fade ease 45s;
  -o-animation: fade ease 45s;
  -ms-animation: fade ease 45s;
  animation-iteration-count: infinite;
}
#bg3 {
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/9a63a8814764d3fecbd33fa96565d3d639a1bb08cde0234bb68529481aa45665.png');
  background-size: cover;
  background-repeat: repeat;
  opacity: 0.5;
  animation: fade ease 35s;
  -webkit-animation: fade ease 35s;
  -moz-animation: fade ease 35s;
  -o-animation: fade ease 35s;
  -ms-animation: fade ease 35s;
  animation-iteration-count: infinite;
}
#game, #popped {
  max-width: 1380px;
  margin: auto;
}
#popped {
  text-align: center;
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
.helper-bar:nth-of-type(2n) {
  right: calc(2em + 75px);
}
.helper-bar:hover, .v-ctrl:hover {
  box-shadow: 0 0 5px 10px rgba(230,0,115,0.3);
  text-shadow: 0 0 20px #eee, 0 0 30px #eee, 0 0 40px #ff7070, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff7070;
}
.helper-bar > .icon-game {
  position: relative;
  top: 2px;
}
.v-ctrl {
  position: fixed;
  right: calc(2em + 171px);
  bottom: 45px;
  border-radius: 20%;
  padding: 0.25em;
  cursor: pointer;
  border: 1px solid rgba(255,112,112,0.25);
}
.v-ctrl span {
  position: relative;
  top: 2px;
  font-size: 2.5em;
  clear: both;
  cursor: pointer;
}
.winter-wrap.copen {
  margin-bottom: 70vh;
}
ol.cruellers, ul.scoreboard {
  margin-top: 2em;
  margin-bottom: 2em;
}
ol.cruellers li, ul.scoreboard li {
  font-size: 1.25em;
  margin-bottom: 1rem;
  padding: 1em;
  border-radius: 2em;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
}
ol.cruellers li:nth-child(odd), ul.scoreboard li:nth-child(odd) {
  background-color: #333333;
}
ol.cruellers li:nth-child(even), ul.scoreboard li:nth-child(even) {
  background-color: rgb(148,49,91);
}
ul.scoreboard {
  list-style: none;
}
h2.title {
  font-size: 3em;
  padding: 1rem;
}
.btn.start {
  margin: auto;
  width: 30%;
  display: block;
}
.gameover h3, .gameover p {
  text-align: center;
  font-size: 2.5em;
}

/* Game Board */
iframe {
  position: absolute;
  width: 1215px;
  height: 800px;
}
.btn-power {
  margin-bottom: 1em;
  border: 1px solid #000000;
}
.grid {
  display: flex;
  justify-content: center;
  position: relative;
  margin: auto;
  margin-bottom: 3.5rem;
}
table,
th,
td {
  border: 1px solid transparent;
  background-color: transparent;
  padding: 10px;
  text-align: center;
  font-family: Arial;
  font-size: 25pt;
}
table {
  width: 100%;
  height: 800px;
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/558125c8bc056a1f2c2745a80432440d30664a8c137c833c0751ad0121f6c050.png');
  background-size: 1600px;
  background-position: -150px;
  background-repeat: no-repeat;
}
td {
  cursor: url('/img/f2194ea7d3c9049ce48385c2ba5471a9be536bddfeeba68fcb0ce085c823356d.png'), pointer;
  background: transparent;
}
td.defense {
  cursor: url('/img/5a8fad4b3ffbcd3b5eece21c0e68b1b2e367b875cd1aa5de0c5ad826afc7ee44.png'), pointer;
}
@keyframes fade {
  0% {opacity:0;}
  50% {opacity:0.5;}
  100% {opacity:0;}
}
@-moz-keyframes fade {
  0% {opacity:0;}
  50% {opacity:0.5;}
  100% {opacity:0;}
}
@-webkit-keyframes fade {
  0% {opacity:0;}
  50% {opacity:0.5;}
  100% {opacity:0;}
}
@-o-keyframes fade {
  0% {opacity:0;}
  50% {opacity:0.5;}
  100% {opacity:0;}
}
@-ms-keyframes fade {
  0% {opacity:0;}
  50% {opacity:0.5;}
  100% {opacity:0;}
}
</style>