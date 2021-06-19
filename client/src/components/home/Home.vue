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
      <div class="season-item" :class="{'pyramidscheme': (i==2)}" v-if="l[i]" :style="'background-image: url(' + l[i].b + ');'">
        <div v-if="i==1" class="season 991" :id="'si-'+i">
          <h2 class="season 991">Season {{s}}</h2>
        </div>
        <h2 class="season" v-if="i!==1 && i!==2">Season {{s}}</h2>
      </div>
      <h2 class="season mont-royal" v-if="i==2">Season {{s}}</h2>
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
// import * as Config from '../../conf/constants';

import { isLoggedIn } from 'axios-jwt';

const DEPLOYED = [0,1,2];

export default {
  name: 'Home',
  data: () => ({
    a: isLoggedIn(),
    d: DEPLOYED,
    l: [
      {p: '/learn', b: '/img/3450804e9328585e42a89335475f2317785c6f09feac8e5c0b5ada225ec4fd2b.png'},
      {p: '/discover', b: '/img/d81c85d1b7926c06ce180214bdfe19e059f2fdd38938d97275016dbea3a2389c.jpg'},
      {p: '/descend', b: '/img/0efbeb172d372829e597dcb2d602aa2c5a8fd831ba1e78669876f4032fc25642.png'}
    ],
    o: null,
    p: null,
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
</style>