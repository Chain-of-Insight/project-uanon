<template>
  <!-- Desktop -->
  <div class="bgu" v-if="!bgo"></div>
  <div class="bgo" v-if="bgo && o" :style="'background-image:url('+ o['bg'] +')'"></div>
  <div class="bgx" v-if="bgo && !o"></div>
  
  <div class="u" v-if="!bgo || (bgo && r == 'summer' && i == 6)">
    <div class="center">
      <img v-if="r !== 'summer'" class="u_avi" src="https://uanon.s3.amazonaws.com/uav/6ffce610afca2a45b40e7f9f0b135402238ec14ee0d087940531b0dabbbf2db1.png" />
      <img v-if="r == 'summer'" class="u_avi-h" src="https://uanon.s3.amazonaws.com/backgrounds/09d7f064eea42be512538cf11e669292147b7bc098f50becc2f51946c5b1417a.png" />
    </div>
  </div>

  <div class="u container container-ui" v-if="bgo && o && i == 7">
    <div class="text banner banner-t" :style="'background-image:url('+ o['banner'] +')'">
    </div>
    <div class="row row-lr">
      <div class="left col-6" :style="'background-image:url('+ o['left'] +')'"></div>
      <div class="right col-6" :style="'background-image:url('+ o['right'] +')'"></div>
    </div>
  </div>

  <div class="menu umenu-col">
    <div class="icons icons-top">
      <div class="i-mail mail" @click="load(0)">
        <span class="count-m notify bg-danger" v-if="ne">{{ne}}</span>
      </div>
      <div class="i-inf inf" @click="load(2)"></div>
    </div>
    <div class="icons icons-bottom show-apps" @click="show();"></div>
  </div>
  <div class="active-desktop">
    <div class="i-file f" @click="load(1)"></div>
    <div class="i-trash trash" @click="load(3)"></div>
    <div class="i-einstein einstein" @click="load(4)" v-if="hs" :style="'background: url('+ hs.table +')'">
      <span class="label einstein" v-if="hs.name">{{hs.name}}</span>
    </div>
    <div class="i-media media" :class="{playing: mp, stopped: !mp}" @click="audioP();" v-if="m && r == 'spring' && i == 8">
      <span class="label media">{{d[5].filename}}</span><br/>
      <span class="label media icon-volume-high" v-if="mp"></span>
    </div>
    <Audio
      v-bind:p="m"
      v-bind:t="'audio/wav'"
      v-bind:a="mp"
      v-if="mp"
      @fin="stopP"
    ></Audio>

    <div class="files-container" v-if="ma && r == 'winter' && i == 2">
      <div :class="'i-txt txt-file txt-' + (i+1)" v-for="(file, i) in ma" :key="i" @click="load((7+i))">
        <span class="label txt-file">WhatLanguageAmI{{i + 1}}.txt</span>
      </div>
    </div>
  </div>

  <!-- Active Context -->
  <div class="context" v-if="typeof c['i'] == 'number' || a">
    <!-- Open App -->
    <Program
      v-bind:b="b"
      v-bind:c="c"
      v-if="c.i >= 0 && c.name"
      @pclose="load"
      @popen="load"
      @proof="retain"
    ></Program>
    <!-- Open App List -->
    <Program
      v-if="a"
      v-bind:a="a"
      v-bind:ne="ne"
      @pclose="load"
      @popen="load"
      @proof="retain"
    ></Program>
  </div>

</template>

<script>
  import * as Config from '../../../conf/constants';

  import Program from './Program.vue';
  import Audio from '../Audio.vue';

  export default {
    props: {
      e: Object,  // Email template
      i: Number,  // Index
      o: Object,  // Overrides
      r: String,  // Realm
      m: String,  // Media
      ma: Object, // Media Array
      hs: Object, // Albert's template
      in: String, // Info
      un: String  // Username
    },
    components: { Program, Audio },
    emits: ['proof'],
    data: () => ({
      a: false,
      b: null,
      c: {
        i: null,
        name: ''
      },
      d: [{i:0,name:'email',email:null},{i:1,name:'files',list:[]},{i:2,name:'info'},{i:3,name:'trash',list:[]},{i:4,name:"Albert's head-scratcher", einstein:null}, {i:5,filename:"message.wav"}, {i:6,name:'email',email:null}, {i:7,name:'An Introduction To Existential Types',file:null},{i:8,name:'An Introduction To Existential Types',file:null},{i:9,name:'An Introduction To Existential Types',file:null},{i:10,name:'An Introduction To Existential Types',file:null},{i:11,name:'An Introduction To Existential Types',file:null}],
      ne: 0,
      bgo: false,
      mp: false
    }),
    mounted: async function () {
      if (this.r == "spring" && this.i == 5) {
        this.d[2].msg = Config.notify.DEFAULT_DESKTOP_WELCOME + ' ' + this.in;
      } else {
        if (this.in) {
          this.d[2].msg = this.in;
        }
      }
      if (this.r == "spring" && this.i == 7 || this.r == "summer" && this.i == 6) {
        this.bgo = true;
        if (this.r == "summer" && this.i == 6) {
          this.b = 'horror';
        }
      }
      if (this.r == "winter" && this.i == 2) {
        this.d[7].file = this.ma[0];
        this.d[8].file = this.ma[1];
        this.d[9].file = this.ma[2];
        this.d[10].file = this.ma[3];
        this.d[11].file = this.ma[4];
        console.log('this.ma', this.ma);
      }
      if (this.e) {
        if (this.e['body']) {
          this.d[0].email = this.e;
          this.d[0].email.to = this.un + '@uanon.observer';
          if (this.r == "spring" && this.i == 5) {
            this.d[0].email.spring1 = true;
          }
          this.ne += 1;
          // console.log(this.d[0]);
        }
      }
      if (this.hs) {
        this.d[4].einstein = this.hs;
        // console.log('this.d', this.d);
      }
    },
    methods: {
      show: function () {
        this.c = {i: null,name:''};
        this.a = true;
      },
      load: function (p) {
        if (!this.d.length) {
          return;
        }
        this.a = false;
        if (typeof p !== 'number') {
          this.c = {i: null,name:''};
        } else {
          if (p < 0) {
            this.c = {i: null,name:''};
          } else if (p > (this.d.length - 1))  {
            this.c = {i: null,name:''};
          } else {
            this.c = this.d[p];
            if (p == 0) {
              if (this.ne > 0) {
                this.ne -= 1;
              }
            }
          }
        }
      },
      audioP: function () {
        this.mp = !this.mp;
      },
      stopP: function (e) {
        if (e)
          this.mp = false;
      },
      retain: function (p) {
        this.$emit('proof', p);
      }
    }
  }
</script>

<style scoped>
.bgu {
  position: fixed;
  width: 100%; 
  height: 100%; 
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/368145178bd2c82cd19b0704b0990e401b2e3920a738f989c235ac2c319d7917.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: hue-rotate(0deg);
  animation: transmogrify ease 60s;
  -webkit-animation: transmogrify ease 60s;
  -moz-animation: transmogrify ease 60s;
  -o-animation: transmogrify ease 60s;
  -ms-animation: transmogrify ease 60s;
  animation-iteration-count: infinite;
}
.bgx, .bgo {
  position: fixed;
  width: 100%; 
  height: 100%; 
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.menu.umenu-col {
  position: fixed;
  height: 100vh;
  width: 150px;
  background-color: rgba(51,51,51,0.4);
  top: 50px;
  left: 0;
}
.i-mail {
  background: url('/img/594692b3eaff8c473127e8135d65989255562f622f2dbcfb5b748bcfe66059fa.svg');
}
.i-inf {
  background: url('/img/fa6834a5b0f20fb555bfbe67ed97896e7e645f11cf0a9ddc57756e220e1a8f3a.svg');
}
.i-file {
  background: url('/img/6bb98f9d3c55ea4970b8e63e5cad6e4df7cfedde9c6bb28cc87a130e557fdf94.svg');
}
.i-trash {
  background: url('/img/ee1226237fcc1e43b1ed4fb65437642d1fddbc59261b93eaa72ec64a3ce45538.svg');
}
.i-media {
  background: url('/img/9fc9fbfd9187376618a6732c61d4c9414b94f27c2d8ae3fbbaa45aa293e98947.svg');
}
.i-txt {
  background: url('/img/152c4dbd2455d77b700cfcd489a07991e16f4c8920598fd9771b7376fd37d8bf.svg');
}
.icons-top div {
  margin: auto;
}
.i-mail, 
.i-file,
.i-trash,
.i-inf,
.i-media,
.i-einstein,
.i-txt {
  width: 100px;
  height: 100px;
  background-repeat: no-repeat !important;
  background-position: left top !important;
  background-size: cover !important;
  position: relative;
  cursor: pointer;
}
.i-media, .i-einstein {
  position: absolute;
  top: 10px;
  left: 130px;
  height: 87px;
}
.i-txt {
  position: absolute;
  top: 215px;
}
.i-txt.txt-2 {
  left: 130px;
}
.i-txt.txt-3 {
  left: calc(2 * 130px);
}
.i-txt.txt-4 {
  left: calc(3 * 130px);
}
.i-txt.txt-5 {
  left: calc(4 * 130px);
}
.i-txt span {
  top: 92px;
  left: 8px;
  position: relative;
  max-width: 95px;
  display: block;
  word-break: break-all;
}
.i-einstein {
  width: 95px;  
}
.i-media {
  width: 90px;
}
.label.media, .label.einstein {
  position: relative;
  top: 80px;
  text-align: center;
  white-space: nowrap;
  font-size: 12px;
}
.label.media {
  left: 10px;
}
.media.icon-volume-high {
  left: 15px;
  top: 83px;
}
.show-apps {
  position: fixed;
  width: 80px;
  height: 80px;
  left: 36px;
  bottom: 50px;
  background: url('/img/9d88d285d8f1c909f3b6931f8c88ebfc64e93d9d282c473e2bac6ef86bacf41d.svg');
  background-size: cover;
  cursor: pointer;
}
.i-mail:hover, 
.i-inf:hover,
.show-apps:hover {
  opacity: 0.65;
}
.active-desktop {
  position: absolute;
  top: 50px;
  left: 200px;
}
div.center {
  display: block;
  margin: auto;
  position: relative;
}
.u_avi {
  position: fixed;
  width: 60vw;
  left: 20vw;
  margin: auto;
  bottom: 0;
  height: auto;
  opacity: 0.45;
  animation-name: fade;
	animation-duration: 10s;
	animation-iteration-count: infinite;
  animation: mythos ease 60s;
  -webkit-animation: mythos ease 60s;
  -moz-animation: mythos ease 60s;
  -o-animation: mythos ease 60s;
  -ms-animation: mythos ease 60s;
  animation-iteration-count: infinite;
  z-index: -1;
}
.u_avi-h {
  position: fixed;
  width: 1080px;
  left: 32vw;
  top: 14%;
  margin: auto;
  height: auto;
  opacity: 0.75;
  animation-name: fade;
	animation-duration: 10s;
	animation-iteration-count: infinite;
  animation: mythos ease 60s;
  -webkit-animation: mythos ease 60s;
  -moz-animation: mythos ease 60s;
  -o-animation: mythos ease 60s;
  -ms-animation: mythos ease 60s;
  animation-iteration-count: infinite;
  z-index: -1;
}
.u.container-ui {
  position: fixed;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
}
.banner.text {
  position: fixed;
  width: 100vw;
  height: 50px;
  margin-left: -15px;
  background-color: rgb(51,51,51);
  background-size: contain;
  background-position: center;
  background-repeat: repeat-x;
}
.row-lr {
  width: auto;
  max-width: 500px;
  height: 100%;
  display: block;
  margin: auto;
}
.row-lr .left, .row-lr .right {
  position: relative;
  width: 100%;
  max-width: 230px;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
}
.row-lr .left {
  margin-right: 20px;
}
.row-lr .right {
  margin-left: 20px;
}
.count-m {
  border-radius: 50%;
  color: #ffffff;
  font-size: 10px;
  width: 15px;
  height: 15px;
  float: right;
  position: relative;
  top: 25px;
  left: -5px;
  text-align: center;
}
@keyframes fade { 
	20% {opacity: 0.65;} 
  40% {opacity: 0.75;} 
	60% {opacity: 0.9;}
  80% {opacity: 0.75;}
  100% {opacity: 0.65;}
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
  0% {filter: hue-rotate(0deg);}
  25% {filter: hue-rotate(25deg);}
  50%  {filter: hue-rotate(55deg);}
  75% {filter: hue-rotate(25deg);}
  100% {filter: hue-rotate(0deg);}
}
@-moz-keyframes transmogrify {
  0% {filter: hue-rotate(0deg);}
  25% {filter: hue-rotate(25deg);}
  50%  {filter: hue-rotate(55deg);}
  75% {filter: hue-rotate(25deg);}
  100% {filter: hue-rotate(0deg);}
}
@-webkit-keyframes transmogrify {
  0% {filter: hue-rotate(0deg);}
  25% {filter: hue-rotate(25deg);}
  50%  {filter: hue-rotate(55deg);}
  75% {filter: hue-rotate(25deg);}
  100% {filter: hue-rotate(0deg);}
}
@-o-keyframes transmogrify {
  0% {filter: hue-rotate(0deg);}
  25% {filter: hue-rotate(25deg);}
  50%  {filter: hue-rotate(55deg);}
  75% {filter: hue-rotate(25deg);}
  100% {filter: hue-rotate(0deg);}
}
@-ms-keyframes transmogrify {
  0% {filter: hue-rotate(0deg);}
  25% {filter: hue-rotate(25deg);}
  50%  {filter: hue-rotate(55deg);}
  75% {filter: hue-rotate(25deg);}
  100% {filter: hue-rotate(0deg);}
}
</style>