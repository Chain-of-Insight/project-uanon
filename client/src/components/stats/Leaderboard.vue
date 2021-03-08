<template>
  <div class="pane-s leaders">
    <h1>Leaders</h1>
    <h3 class="blood">{{ msg }}</h3>

    <div class="loading" v-if="!pg.length && ld">
      <p v-if="ld">Loading...</p>
    </div>
    <div class="loading" v-if="!pg.length && !ld">
      <p class="none-shall-pass">None are worthy</p>
    </div>

    <div class="page-l" v-if="pg.length">
      <select class="form-control question item" v-model="s" v-if="pg.length && s">
        <option v-for="(z, i) in sz" :key="i" :value="z">{{z}}</option>
      </select>
    </div>
    
    <table class="leaderboard table" v-if="pg.length">
      <thead>
        <tr>
          <th class="h blood" scope="col">Rank</th>
          <th class="h blood" scope="col">Player</th>
          <th class="h blood" scope="col">Team</th>
          <!-- <th class="h blood" scope="col">Truths</th> -->
        </tr>
      </thead>
      <tbody>
        <tr class="leader-item" :class="{diamond: (parseInt(player.rank)==1), gold: (parseInt(player.rank)==2), silver: (parseInt(player.rank)==3), last: i==(pg.length-1), even: (p<1)?i>3&&i%2==0:i%2==0}" v-for="(player, i) in pg" :key="i" @click="g(player.tzAddress);">
          <th scope="row" :title="a[parseInt((player.rank-1))]" v-if="(parseInt(player.rank)<=3)">
            <span>{{player.rank}}</span>
            <i v-if="(parseInt(player.rank)==1)" class="elo-swag fas fa-crown"></i>
            <i v-if="(parseInt(player.rank)==2)" class="elo-swag fas fa-medal"></i>
            <i v-if="(parseInt(player.rank)==3)" class="elo-swag fas fa-trophy"></i>
          </th>
          <th :title="'Agent #' + String((i+1)) + ' of ' + r.length" scope="row" v-else>
            <span>{{player.rank}}</span>
          </th>
          <td :title="player.tzAddress" v-if="player.userName">{{player.userName}}</td>
          <td :title="player.tzAddress" v-else>{{player.agentName}}</td>
          <td :title="c.TEAM_MAP[player.teamName.toLowerCase()].description">{{player.teamName}}</td>
          <!-- <td>&nbsp;</td> -->
        </tr>
      </tbody>
    </table>

    <div class="controls paging" v-if="pg.length">
      <div class="ctrl-left float-left">
        <button class="btn btn-inverse" :disabled="p < 1" @click="p = 0;">«</button>
        <button class="btn btn-primary" :disabled="p < 1" @click="--p;">Previous</button>
      </div>
      <div class="ctrl-center">
        <p class="page">{{ p + 1 }}</p>
      </div>
      <div class="ctrl-right float-right">
        <button class="btn btn-primary" :disabled="p >= (Math.ceil((r.length/s))-1)" @click="++p;">Next</button>
        <button class="btn btn-inverse" :disabled="p >= (Math.ceil((r.length/s))-1)" @click="p=(Math.ceil((r.length/s))-1);">»</button>
      </div>
    </div>

  </div>
</template>

<script>
import * as Config from '../../conf/constants';
import * as api from '../../util/api';

export default {
  name: 'Leaders',
  data: () => ({
    a: ['Slob Dpon', 'Contender', 'Heroic'],
    c: Config,
    r: [],
    p: 0,
    s: 10,
    ld: false,
    sz: [10, 25, 50, 100],
    api: api,
    msg: 'Selbstuberwindung'
  }),
  mounted: async function () {
    await this.l();
  },
  methods: {
    g: function (p = null) {
      if (typeof p !== 'string') {
        return;
      } else if (p.length !== 36) {
        return;
      }
      let c = location.href, a = c.split('/'), b;
      a[(a.length - 1)] = 'player';
      a.push(p);
      b = a.join('/');
      return location.href = b;
    },
    l: async function () {
      this.ld = true;
      let resp = await this.api.request.get('/leaderboard');
      this.ld = false;
      if (resp.status == 200 && resp.data) {
        if (resp.data['message']) {
          if (resp.data.message['rankings']) {
            this.r = resp.data.message.rankings;
            // console.log('Rankings =>', this.r);
          }
        }
      }
    }
  },
  computed: {
    pg: function () {
      let p,s,e;
      if (!this.r) {
        return [];
      } else if (!Array.isArray(this.r)) {
        return [];
      }
      if (this.p == 0) {
        p = this.r.slice(0, this.s);
      } else {
        s = (this.p * this.s) + 1;
        e = (this.p * this.s) + this.s;
        p = this.r.slice(s,e);
      }
      return p;
    }
  }
}
</script>
<style scoped>
.pane-s.leaders {
  max-width: 1080px;
}
h1 {
  background: -webkit-linear-gradient(#fff, #eee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 0px 6px #eee;
}
h3 {
  background: -webkit-linear-gradient(#fff, #ff7070);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 0px 6px #ff7070;
  animation: mythos ease 360s;
  -webkit-animation: mythos ease 360s;
  -moz-animation: mythos ease 360s;
  -o-animation: mythos ease 360s;
  -ms-animation: mythos ease 360s;
  animation-iteration-count: infinite;
}
.loading {
  height: 40vh;
  background-image: url('/img/loading.gif');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.page-l {
  max-width: 90px;
  float: right;
  position: relative;
  top: -25px;
}
table {
  background-color: #333333;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  border-radius: 1em;
}
th.h {
  border-top: none;
}
table th, table td  {
  padding-left: 2em;
  padding-right: 2em;
}
.leaderboard {
  margin-top: 2em;
  clear: both;
}
.leader-item {
  cursor: pointer;
  background-color: #333333;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
}
.leader-item.even {
  background-color: rgba(148,49,91,0.7);;
}
.leader-item:hover {
  background-color: #ff7070;
  color: #fff;
}
.leader-item.last > th {
  border-radius: 0 0 0 1em;
}
.leader-item.last > td:last-of-type {
  border-radius: 0 0 1em 0;
}
.none-shall-pass {
  position: relative;
  top: 45%;
  text-align: center;
  font-size: 2em;
  text-shadow: 0.1em 0.1em 0.1em #000;
}

/* Always get ELO */
.elo-swag {
  position: relative;
  left: 1em;
}
.diamond {
  color: rgb(230,0,115);
  background:linear-gradient(-42deg,#caa1de,#ffffff 16%,#dedede 21%,#ffffff 24%,#caa1de 27%,#dedede 72%,#ffffff 80%,#dedede 84%,#caa1de 93%,#dea1ca);
}
.gold {
  color: rgba(73, 45, 21, 0.72);
  background: linear-gradient(-42deg,#a17434,#ffc373 16%,#ffc373 21%,#ffffff 24%,#ffc373 27%,#ffc373 36%,#ffffff 45%,#ffffff 60%,#ffc373 72%,#ffffff 80%,#ffc373 84%,#a17434);
}
.silver {
  color: #333;
  background: linear-gradient(-42deg, #aaa9ad, #ffffff 16%, #aaa9ad 21%, #aaa9ad 24%, #aaa9ad 27%, #dedede 36%, #aaa9ad 45%, #aaa9ad 60%, #dedede 72%, #ffffff 80%, #dedede 84%, #aaa9ad);
}
.controls div {
  max-width: 30%;
  margin: auto;
}
.controls div button {
  margin: 0.25rem;
}
.ctrl-right {
  position: relative;
  top: -20px;
}
.ctrl-center .page {
  text-align: center;
  margin: auto;
  position: relative;
  top: 10px;
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