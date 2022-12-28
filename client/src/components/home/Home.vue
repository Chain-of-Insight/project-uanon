<template>
  <div class="pane-s home">
    <div class="abs">
      <h1>{{ msg }}</h1>
    </div>
    <div class="w">
      <iframe id="a" src="https://www.youtube.com/embed/CqL6kkMTjRw?rel=0&amp;autoplay=1&mute=1&controls=0&loop=1&playlist=CqL6kkMTjRw" frameborder="0"></iframe>
    </div>
  </div>
  <div class="content-s home season-content" v-if="a && p">
    <router-link :to="l[i].p" v-for="(s, i) in d" :key="i">

      <div class="season-item" :class="{'pyramidscheme': (i==2), 'restitution': (i==5)}" v-if="l[i] && i!==3 && i!==4" :style="'background-image: url(' + l[i].b + ');'">
        <div v-if="i==1" class="season 991" :id="'si-'+i">
          <h2 class="season 991">Season {{s}}</h2>
        </div>
        <h2 class="season" v-if="i!==1 && i!==2">Season {{s}}</h2>
      </div>
      <h2 class="season mont-royal" v-if="i==2">Season {{s}}</h2>
      <div class="season-item pentakiller" v-if="l[i] && i==3" @mouseover="pk=true" @mouseout="pk=false" :class="{'active':pk==true}">
        <div id="pk" class="base" @mouseover="pk=true" @mouseout="pk=false" :class="{'active':pk==true}">
          <div class="circle"></div>
          <div class="bar n0"><li></li></div>
          <div class="bar n1"><li></li></div>
          <div class="bar n2"><li></li></div>
          <div class="bar n3"><li></li></div>
          <div class="bar n4"><li></li></div>
          <div class="overbar n0"><li></li></div>
          <div class="overbar n1"><li></li></div>
          <div class="overbar n2"><li></li></div>
          <div class="overbar n3"><li></li></div>
          <div class="overbar n4"><li></li></div>
          <div class="u" :style="'background-image: url(' + l[i].b + ');'"></div>
          <section class="penta">
            <div class='blooddrop a'></div>
            <div class='blooddrop b'></div>
            <div class='blooddrop c'></div>
            <div class='blooddrop d'></div>
            <div class='blooddrop e'></div>
            <div class='blooddrop f'></div>
            <div class='blooddrop g'></div>
            <div class='blooddrop h'></div>
          </section>
        </div>
        <h2 class="season in-decay" @mouseover="pk=true" @mouseout="pk=false" :class="{'active':pk==true}">Season {{s}}</h2>
      </div>

      <div class="season-item cults effect-wrapper" v-if="l[i] && i==4" @mouseover="ew=true" @mouseout="ew=false" :class="{'deadly-night':ew==true}">
        <div class="layer1">
          <div>
              <div>
                  <div>
                      <div>
                          <div>
                              <div>
                                  <div>
                                      <div>
                                          <div>
                                                <div>
                                                  <div>
                                                      <div></div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>

        <div class="layer2">
          <div>
              <div>
                  <div>
                      <div>
                          <div>
                              <div>
                                  <div>
                                      <div>
                                          <div>
                                                <div>
                                                  <div>
                                                      <div></div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <h2 class="season nightfall" @mouseover="ew=true" @mouseout="ew=false" :class="{'active':ew==true}">Season {{s}}</h2>
      </div>

    </router-link>
  </div>
  <div class="content-s home season-content" v-if="a && !p">
    <div class="season-item join">
      <div class="full-width">
        <router-link to="/register">
          <h2 class="season register">Sign Up</h2>
        </router-link>
      </div>
    </div>
  </div>
  <div class="content-s home season-content" v-if="!a">
    <div class="season-item join">
      <div class="float-left">
        <h2 class="season login" @click="login();">Login</h2>
      </div>
      <div class="float-right">
        <router-link to="/register">
          <h2 class="season register">Sign Up</h2>
        </router-link>
      </div>
    </div>
  </div>
  <footer>
    <div class="fc">
      <div class="terms">
        <a href="/tos.html" target="_blank">Terms & Conditions</a>
      </div>
      <div class="policy">
        <a href="/policy.html" target="_blank">Privacy Policy</a>
      </div>
    </div>
  </footer>
</template>

<script>
import * as Auth from '../../util/auth';
import * as api from '../../util/api';

import { isLoggedIn } from 'axios-jwt';

const DEPLOYED = [0,1,2,3,4,5];

export default {
  name: 'Home',
  data: () => ({
    a: isLoggedIn(),
    d: DEPLOYED,
    l: [
      {p: '/learn', b: '/img/3450804e9328585e42a89335475f2317785c6f09feac8e5c0b5ada225ec4fd2b.png'},
      {p: '/discover', b: '/img/d81c85d1b7926c06ce180214bdfe19e059f2fdd38938d97275016dbea3a2389c.jpg'},
      {p: '/descend', b: '/img/0efbeb172d372829e597dcb2d602aa2c5a8fd831ba1e78669876f4032fc25642.png'},
      {p: '/echolalia', b: '/img/23ca814cf4c078f2d0b5ed3b85e2af85b7850dfba1252e87733bffea8c980914.png'},
      {p: '/palilalia', b: ''},
      {p: '/deny', b: '/img/d6d5ee2ecca50604be8dde8c0b9daf786bdfe3fba53672f3c0d1c4744160433d.png'},
    ],
    o: null,
    p: null,
    pk: false,
    ew: false,
    api: api,
    msg: 'project uanon'
  }),
  mounted: async function () {
    if (this.a) {
      await this.get();
    }
  },
  methods: {
    get: async function () {
      let resp = await this.api.request.get('/user/me'), data;
      if (resp.status == 200 && resp.data) {
        data = resp.data;
        if (data['message']) {
          if (data.message.observer) {
            this.o = data.message.observer;
          }
          if (data.message.classification) {
            let p = data.message.classification
            if (typeof p == 'string') {
              this.p = JSON.parse(p)
            }
          }
        }
      }
    },
    login: async function () {
      this.a = await Auth.login();
      if (this.a) {
        location.reload();
      }
    }
  }
}
</script>

<style scoped>
.abs {
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  top: 43%;
}
h1 {
  position: relative;
  margin: auto;
  max-width: 995px;
  font-size: 7em;
  text-align: center;
  background: -webkit-linear-gradient(#000000, #333);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: glow 60s ease-in-out infinite alternate;
}
footer {
  position: relative;
  margin-top: 4rem;
  background-color: #333333;
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/4aefac88b597b312f457af4c6eb210bfeb2b614d861a9d8a380990e96c8823ab.png');
  background-size: cover;
  background-repeat: repeat;
}
.fc {
  padding: 2rem;
  width: 250px;
  margin: auto;
}
.w {
  z-index: 1000;
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/4aefac88b597b312f457af4c6eb210bfeb2b614d861a9d8a380990e96c8823ab.png');
  background-size: cover;
  background-repeat: repeat;
  opacity: 0;
  animation: fade ease 60s;
  -webkit-animation: fade ease 60s;
  -moz-animation: fade ease 60s;
  -o-animation: fade ease 60s;
  -ms-animation: fade ease 60s;
  animation-iteration-count: infinite;
  border-radius: 2rem;
}
iframe {
  height: calc(100vh - 100px);
  width: 80vw;
  opacity: 0;
  z-index: -1;
  pointer-events: none;
  background-color: #333;
  box-shadow: 0 0 5px 10px #333;
  animation: fade ease 60s;
  -webkit-animation: fade ease 60s;
  -moz-animation: fade ease 60s;
  -o-animation: fade ease 60s;
  -ms-animation: fade ease 60s;
  animation-iteration-count: infinite;
  border-radius: 2rem;
}
div.season-item {
  max-width: 80vw;
  min-height: 600px;
  margin: auto;
  position: relative;
  margin-top: 4em;
  box-shadow: 0 0 5px 10px #333;
  -webkit-box-shadow: 0 0 5px 10px #333;
  -moz-box-shadow: 0 0 5px 10px #333;
  background-color: rgba(148,49,91,0.1);
  border-radius: 1em;
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  cursor: pointer;
}
.pyramidscheme {
  -webkit-clip-path: polygon(50% 5%, 0% 100%, 100% 100%);
  clip-path: polygon(50% 5%, 0% 100%, 100% 100%);
  filter: sepia(1);
  max-width: 1080px !important;
}
a, a:hover {
  text-decoration: none;
}
h2.season {
  font-size: 7em;
  background: -webkit-linear-gradient(#000000, #333);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 6px #ff7070;
  margin: auto;
  width: 605px;
  position: relative;
  top: 200px;
}
h2.season:hover {
  text-shadow: 0 0 10px #eee, 0 0 20px #eee, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #ff7070;
}
h2.mont-royal {
  top: -360px;
  display: block;
  width: 495px;
  text-align: center;
  font-size: 6em;
}
h2.in-decay {
  display: block;
  text-align: center;
  font-size: 2.5em;
  width: 100%;
  top: 1.75em;
  left: -15px;
}
div.season-item > div.float-left {
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/cf3c6f0f3163a1c4b2aa788af8c88a0c1e9a3c3378e9178e2060ae8707d10898.png');
  background-size: cover;
  background-repeat: repeat;
  width: 50%;
  height: 100%;
  min-height: 600px;
  padding-right: 1.5em;
  border-right: 0.25em solid rgba(148,49,91,0.1);
  border-radius: 1em 0 0 1em;
  opacity: 0.9;
  display: block;
}
div.season-item > div.full-width {
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/5820f3104ed541f402e369c6da61ab87cae7e58e0ce56547922a0ba4d57721fd.png');
  background-size: cover;
  background-repeat: repeat;
  border: 0.25em solid rgba(148,49,91,0.1);
  width: 80vw;
  height: 600px;
}
div.season-item > div.float-right {
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/9a63a8814764d3fecbd33fa96565d3d639a1bb08cde0234bb68529481aa45665.png');
  background-size: cover;
  background-repeat: repeat;
  width: 50%;
  height: 100%;
  min-height: 600px;
  padding-left: 1.5em;
  border-left: 0.25em solid rgba(148,49,91,0.1);
  border-radius: 0 1em 1em 0;
  opacity: 0.9;
  display: block;
}
h2.login, h2.register {
  margin: auto;
  width: 100%;
  text-align: center;
}
#si-1 {
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/d0f95f8b4df94d55f7bee5fe04a82e808695ee60ebbb6f9daa1740f2f73f1889.png');
  background-size: 302px 167px;
  min-height: 600px;
  background-repeat: repeat;
}
.season-item.pentakiller {
  top: -290px;
}
.season-item.pentakiller.active {
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/3ab2ba644a304a0f022cf0b5d26c9e926111defd244c5270d8c77ee63662f9bc.png');
  background-size: cover;
}
.season-item.pentakiller:not(.active) {
  border: none !important;
  box-shadow: none;
  background: transparent;
  animation: mythos ease 160s;
  -webkit-animation: mythos ease 160s;
  -moz-animation: mythos ease 160s;
  -o-animation: mythos ease 160s;
  -ms-animation: mythos ease 160s;
  animation-iteration-count: infinite;
}
.season-item.restitution {
  top: -215px;
  background-size: contain;
  min-width: 1500px;
  max-width: 1500px;
  height: 603px;
  background-position: -3px 9px;
  filter: sepia(1);
  border-radius: 2em;
}
.season-item.restitution:hover, .season-item.restitution:hover * {
  filter: none;
  opacity: 1 !important;
}
#pk.base {
  width: 350px;
  height: auto;
  position: relative;
  margin: 0 auto;
  transform: scale(2.3);
  transform-origin: center;
  top: -40px;
  left: 32px;
}
#pk .circle {
  position: absolute;
  width: 220px;
  height: 220px;
  border: 12px solid red;
  border-radius: 112px;
  left: 150px;
  top: 150px;
  margin-left: -107px;
  margin-top: -112px;
}
#pk .u {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: absolute;
  width: 200px;
  height: 200px;
  left: 52px;
  top: 46px;
  border-radius: 50%;
  opacity: 0.75;
  filter: hue-rotate(160deg);
}
#pk .bar, #pk .overbar {
  position: absolute;
  height: 200px;
  width: 10px;
  left: 150px;
  top: 50px;
}
.bar li, .overbar li {
  list-style-type: none;
  height: 200px;
  width: 20px;
  margin-left: 30px;
  width: 10px;
  background: red;
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
}
.overbar li {
  margin-top: 50px;
  margin-left: 28px;
  height: 50px;
  width: 14px;
  background: red;
  border-left: 2px solid #100;
  border-right: 2px solid #100;
}
.n0 { transform: rotate(90deg); }
.n1 { transform: rotate(162deg); }
.n2 { transform: rotate(234deg); }
.n3 { transform: rotate(306deg); }
.n4 { transform: rotate(378deg); }
section.penta {
  position: absolute;
  top: 125px;
}
.blooddrop {
  position: relative;
  width: 11px;
  height: 11px;
  top: 0px;
  margin: 0;
  background-color: red;
  border-radius: 50%;
  display: none;
}
.base.active section .blooddrop {
  display: block;
  animation: drip 3s cubic-bezier(1,0,.91,.19) infinite ;
  -webkit-animation: drip 3s cubic-bezier(1,0,.91,.19) infinite;
  -moz-animation: drip 3s cubic-bezier(1,0,.91,.19) infinite;
  -o-animation: drip 3s cubic-bezier(1,0,.91,.19) infinite;
}
.blooddrop:before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 23px solid red;
  top: -20px;
  left: 1px;
}
.base.active section .blooddrop.a {
  position: absolute;
  left: 50px;
  top: 20px;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-fill-mode: backwards;
}
.base.active section .blooddrop.b {
  position: absolute;
  left: 75px;
  top: 0px;
  animation-delay: 4s;
  animation-iteration-count: infinite;
  animation-fill-mode: backwards;
}
.base.active section .blooddrop.c {
  position: absolute;
  left: 80px;
  margin-top: -114px;
  animation-delay: 0.8s;
  animation-iteration-count: infinite;
  animation-fill-mode: backwards;
}
.base.active section .blooddrop.d {
  position: absolute;
  left: 216px;
  margin-top: -110px;
  animation-delay: 1s;
  animation-iteration-count: infinite;
  animation-fill-mode: backwards;
}
.base.active section .blooddrop.e {
  position: absolute;
  left: 110px;
  margin-top: -35px;
  animation-delay: 4s;
  animation-iteration-count: infinite;
  animation-fill-mode: backwards;
}
.base.active section .blooddrop.f {
  position: absolute;
  left: 175px;
  margin-top: 8px;
  animation-delay: 6.4s;
  animation-iteration-count: infinite;
  animation-fill-mode: backwards;
}
.base.active section .blooddrop:nth-of-type(7) {
  position: absolute;
  left: 245px;
  margin-top: -45px;
  animation-delay: 2.6s;
  animation-iteration-count: infinite;
  animation-fill-mode: backwards;
}
.base.active section .blooddrop.g {
  position: absolute;
  left: 255px;
  top: 0px;
  animation-delay: 1.2s;
  animation-iteration-count: infinite;
  animation-fill-mode: backwards;
}
.base.active section .blooddrop:nth-of-type(9) {
  position: absolute;
  left: 280px;
  margin-top: 0px;
  animation-delay: 2s;
  animation-iteration-count: infinite;
  animation-fill-mode: backwards;
}
.base.active section .blooddrop.h {
  position: absolute;
  left: 200px;
  margin-top: 65px;
  animation-delay: 4.2s;
  animation-iteration-count: infinite;
  animation-fill-mode: backwards;
}
div.season-item.cults {
  position: relative;
  top: -13em;
  box-shadow: none;
  -webkit-box-shadow: none;
}
.deadly-night .layer1,
.deadly-night .layer1 * {
  animation-name: spin-clockwise;
  animation-duration: 150s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.82, 0.24, 0.25, 0.75);
}
.deadly-night .layer2,
.deadly-night .layer2 * {
  animation-name: spin-counter-clockwise, pulsate;
  animation-duration: 150s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.82, 0.24, 0.25, 0.75);
}
.effect-wrapper {
  position:relative;
  width:400px;
  height:400px;
  top: 10vh;
}
.effect-wrapper .layer1,
.effect-wrapper .layer2 {
  position:absolute;
  top:0px;
  left:0px;
  width:100%;
  height:100%;
  display:-webkit-box;
  -webkit-box-pack:center;
  -webkit-box-align:center;
}
.effect-wrapper .layer1,
.effect-wrapper .layer1 * {
  background:rgba(220,20,60,.1);
  border-radius:10px;
} 
.effect-wrapper .layer2,
.effect-wrapper .layer2 * {
  background:rgba(220,20,60,.1);
  border-radius:10px;
} 
.effect-wrapper .layer1 *,
.effect-wrapper .layer2 * {
  display:-webkit-box;
  -webkit-box-pack:center;
  -webkit-box-align:center;
  width:80%;
  height:80%;
}
.effect-wrapper .layer1,
.effect-wrapper .layer1 * {
  -webkit-box-shadow:inset 0 0 10px rgba(255,255,255,0.3);
}
.effect-wrapper .layer2,
.effect-wrapper .layer2 * {
  -webkit-box-shadow:inset 0 0 10px rgba(255,255,255,0.3);
}
h2.season.nightfall {
  left: -93px;
}
@keyframes spin-clockwise {
  0%   { transform: rotate(0deg);   }
  100% { transform: rotate(360deg); }
}
/* Animation: Counter counter clockwise */
@keyframes spin-counter-clockwise {
  0%   { transform: rotate(0deg);   } 
  100% { transform: rotate(-360deg); }
}
/* Animation: Counter counter clockwise */
@keyframes pulsate {
  0%   { 
    background:rgba(100,100,255,.1);
  } 
  25% {
    background:rgba(220,20,60,.1);
  }
  50%   { 
    background:rgba(100,100,255,.1);
  }
  75% {
    background:rgba(220,20,60,.1);
  }
  100% { 
    background:rgba(255,255,255,.1); 
  }
}
@keyframes drip {
  0% { top: 70px; }
  100% { top: 600px; }
}
@keyframes glow {
  from {
    text-shadow: 0 0 10px #eee, 0 0 20px #eee, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #ff7070;
  }
  to {
    text-shadow: 0 0 20px #eee, 0 0 30px #eee, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff7070;
  }
}
@keyframes fade {
  0% {opacity:0;}
  50% {opacity:1;}
  100% {opacity:0;}
}
@-moz-keyframes fade {
  0% {opacity:0;}
  50% {opacity:1;}
  100% {opacity:0;}
}
@-webkit-keyframes fade {
  0% {opacity:0;}
  50% {opacity:1;}
  100% {opacity:0;}
}
@-o-keyframes fade {
  0% {opacity:0;}
  50% {opacity:1;}
  100% {opacity:0;}
}
@-ms-keyframes fade {
  0% {opacity:0;}
  50% {opacity:1;}
  100% {opacity:0;}
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