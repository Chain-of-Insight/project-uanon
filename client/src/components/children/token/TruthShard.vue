<template>
  <div class="truth-shard nft" @click="toggle();">
    <div class="jumbotron">
      <div class="img-wr" :class="'bg-' + r" v-if="s">
        <img class="card-img" :class="n.asset.type" :src="image" :alt="m.attributes[1].action">
      </div>
      <div class="card-body" v-if="m">
        <h5 class="card-title" v-if="m.name"><strong class="blood">{{m.name}}</strong></h5>
        <p class="card-text" v-if="m.attributes.length > 0">{{m.attributes[1].value}}</p>
      </div>
    </div>
  </div>

  <div class="dtl" v-if="o && m['name']">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title" v-if="m.name">{{m.name}}</h4>
                <div type="button" class="close" @click="close();">
                  <span class="close-x" aria-hidden="true">&times;</span>
                </div>
              </div>
              <div class="modal-body">
                <div class="accum">
                  <div class="img-wr lg right float-right" :class="r + ' ' + n.asset.type" v-if="image" @click="z=!z;">
                    <img class="card-img" :class="{active: z}" :src="image" :alt="m.attributes[1].action">
                  </div>
                  <div class="left">
                    <p class="descr descr-t" v-if="m.creator && !m.creators">
                      <label>Creator:&nbsp;</label>
                      <span>{{m.creator}}</span>
                    </p>
                    <p class="descr descr-t" v-if="m.creators">
                      <label>Creator:&nbsp;</label>
                      <span v-if="m.creators.length">{{m.creators[0]}}</span>
                    </p>
                    <p class="descr descr-t" v-if="m.attributes.length > 0">
                      <label>Rarity:&nbsp;</label>
                      <span>{{m.attributes[0].value}}</span>
                    </p>
                    <!-- Rite of the Revenant -->
                    <p class="descr descr-t" v-if="m.attributes.length > 1 && r == 'spring'">
                      <label>Revenant Spirit:&nbsp;</label>
                      <span>{{m.attributes[2].value}}</span>
                    </p>
                    <!-- Kept Their Keep -->
                    <p class="descr descr-t" v-if="m.attributes.length > 1 && r == 'summer'">
                      <label>Provenance:&nbsp;</label>
                      <span>{{m.attributes[2].value}}</span>
                    </p>
                    <!-- Wrong, forever on the Throne -->
                    <p class="descr descr-t" v-if="m.attributes.length > 1 && r == 'autumn'">
                      <label>Genus:&nbsp;</label>
                      <span>{{m.attributes[2].value}}</span>
                    </p>
                    <!-- Cannot the Kingdom of Salvation take me Home? -->
                    <p class="descr descr-t" v-if="m.attributes.length > 1 && r == 'winter'">
                      <label>Calculus:&nbsp;</label>
                      <span>{{m.attributes[2].value}}</span>
                    </p>
                    <!-- This path seems the blackest -->
                    <p class="descr descr-t" v-if="m.attributes.length > 1 && r == 'cryptowinter'">
                      <label>Lunar Phase:&nbsp;</label>
                      <span>{{m.attributes[2].value}}</span>
                    </p>
                    <!-- But I guess it's the soonest -->
                    <p class="descr descr-t" v-if="m.attributes.length > 2 && r == 'cryptowinter'">
                      <label>Solar Power:&nbsp;</label>
                      <span>{{m.attributes[3].value}}</span>
                    </p>
                    <!-- I want the money I don't care about thi$ -->
                    <p class="descr descr-t" v-if="m.attributes.length > 0">
                      <label>Action:&nbsp;</label>
                      <span>{{m.attributes[1].value}}</span>
                    </p>
                    <!-- In the night there's no faces -->
                    <p class="descr descr-t" v-if="m.imageUri && !m.displayUri">
                      <label>Image:&nbsp;</label>
                      <span>{{m.imageUri}}</span>
                    </p>
                    <p class="descr descr-t" v-if="m.displayUri">
                      <label>Image:&nbsp;</label>
                      <span>{{m.displayUri}}</span>
                    </p>
                    <p class="descr descr-t" v-if="m.externalUri">
                      <label v-if="r == 'spring' || r == 'summer' || r == 'autumn' || r == 'winter' || r == 'cryptowinter'">Video:&nbsp;</label>
                      <label v-if="r == 'dawn'">Audio:&nbsp;</label>
                      <span v-if="r !== 'tutorial'">
                        <a :href="m.externalUri" target="_blank">{{m.externalUri}}</a>
                      </span>
                    </p>
                  </div>
                  <div class="descr descr-t" v-if="m.description">
                    <label>Engraving:&nbsp;</label>
                    <div class="descr-f">{{m.description}}</div>
                  </div>
                </div>
                <div class="ctrl" v-if="r !== 'tutorial' && r !== 'autumn' && r !== 'winter' && r !== 'cryptowinter' && r !== 'dawn'">
                  <button class="btn btn-primary ctrl 3d" @click="loadT();">Open in 3D Viewer</button>
                </div>
                <div class="ctrl" v-if="r !== 'tutorial' && r == 'cryptowinter'">
                  <button class="btn btn-primary ctrl 2d" @click="loadT();">Open in 2D Viewer</button>
                </div>
                <div class="ctrl" v-if="r !== 'tutorial' && r == 'dawn'">
                  <button class="btn btn-primary ctrl 2d" @click="loadT();">Open in Audio Player</button>
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
import * as Config from '../../../conf/constants';
import * as api from '../../../util/api';

export default {
  props: {
    c: String, // Contract
    n: Object, // NFT
    r: String  // Realm
  },
  data: () => ({
    m: null,
    o: false,
    s: null,
    z: false,
    td: false,
    api: api,
    def: ['tutorial', 'spring', 'summer', 'autumn', 'winter', 'cryptowinter', 'dawn'],
    defs: {
      tutorial: 0,
      spring: 1,
      summer: 2,
      autumn: 3,
      winter: 4,
      cryptowinter: 5,
      dawn: 6
    }
  }),
  mounted: async function () {
    if (this.n) {
      if (typeof this.n['metadata'] == 'object') {
        this.m = this.n.metadata;
        this.forge();
      }
    }
  },
  methods: {
    forge: function () {
      // console.log(this.m);
      if (this.n) {
        if (this.n['asset']) {
          if (this.n.asset['type']) {
            this.s = this.n.asset.type;
          }
        }
        // console.log('this.n =>', this.n);
      }
    },
    loadT: function () {
      if (this.n) {
        if (this.n['asset']) {
          if (this.n.asset['realm']) {
            switch(this.n.asset.realm) {
              case this.def[1]:
              case this.def[2]:
              case this.def[5]:
              case this.def[6]: {
                let c = location.href, a = c.split('/'), b = a[(a.length - 1)], u;
                let i = this.defs[this.n.asset.realm];
                if (b == 'observer') {
                  u = c.replace('/observer', '/token/') + Config.tokens[i] + '/' + this.n.asset.type;
                } else if (a[(a.length - 2)] == 'player') {
                  a[(a.length - 2)] = 'token';
                  a[(a.length - 1)] = Config.tokens[i];
                  a.push(this.n.asset.type);
                  u = a.join('/');
                }
                // console.log(i, Config.tokens[i], u);
                return location.href = u;
              }
            }
          }
        }
      }
    },
    toggle: function () {
      this.o = !this.o;
      this.z = false;
      let b = document.getElementsByTagName('body');
      if (this.o) {
        b[0].style.overflow = 'hidden';
      } else {
        b[0].style.overflow = '';
      }
    },
    close: function () {
      this.o = false;
      this.z = false;
      let b = document.getElementsByTagName('body');
      b[0].style.overflow = '';
    }
  },
  computed: {
    image: function () {
      let r = this.r, s = this.s;
      if (!r) {
        r = this.def[0];
      }
      if (!s) {
        return ''
      } else {
        return Config.externals.images.nft[r].path + Config.externals.images.nft[r].image[s];
      }
    }
  }
}
</script>

<style scoped>
.truth-shard {
  margin-right: 40px;
}
div.card,.jumbotron {
  max-width: 425px;
}
.jumbotron {
  margin-bottom: 2em;
  padding: 0;
  padding-bottom: 0.5em;
  cursor: pointer;
  animation: mythos ease 160s;
  -webkit-animation: mythos ease 160s;
  -moz-animation: mythos ease 160s;
  -o-animation: mythos ease 160s;
  -ms-animation: mythos ease 160s;
  animation-iteration-count: infinite;
}
.jumbotron p {
  background: -webkit-linear-gradient(#fff, #ff7070);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 0px 6px #ff7070;
}
a, a:hover, a:active, a:focus {
  opacity: 1;
}
img.card-img {
  max-height: 250px;
  width: auto;
  margin: auto;
  display: block;
}
.card-body {
  text-align: center;
  display: block;
  min-height: 174px;
}
button {
  margin-top: 1rem;
  width: 100%;
}
button.ctrl {
  max-width: 250px;
  margin-left: 0;
  margin-top: 4em;
  margin-bottom: 4em;
  display: block;
}
.bg-warning {
  position: relative;
  top: -1.5em;
  margin-left: 3em;
  margin-right: 3em;
  padding: 1em;
  border-radius: 1em;
  color: #ff7070;
}
.card-text {
  font-size: 1em;
  font-style: italic;
}
.modal-dialog {
  max-width: 80vw;
  overflow-y: initial !important
}
.modal-title {
  padding: 0.25em;
  margin: auto;
  margin-left: 1.25em;
}
.modal-body {
  height: 80vh;
  overflow-y: auto;
  background: rgba(230,0,115,0.5);
  animation: mythos ease 160s;
  -webkit-animation: mythos ease 160s;
  -moz-animation: mythos ease 160s;
  -o-animation: mythos ease 160s;
  -ms-animation: mythos ease 160s;
  animation-iteration-count: infinite;
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
.close-x.xxd {
  position: relative;
  top: -10px;
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
.accum {
  background: -webkit-linear-gradient(#fff, #ff7070);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 0px 6px #ff7070;
  clear: both;
}
div.ctrl, div.accum {
  max-width: 85%;
  margin: auto;
}
.left {
  max-width: 60%
}
.right {
  float: right;
  max-width: 40%;
  text-align: left;
}
.accum p, .accum div {
  margin-bottom: 0;
}
.accum label {
  text-shadow: 0px 0px 6px #2b1331;
}
.descr-t {
  word-break: break-all;
}
.descr-t:last-of-type {
  margin-bottom: 1em;
}
.descr-f {
  white-space: pre-wrap;
}
.img-wr.lg.tutorial {
  background-image: url('https://uanon.s3.amazonaws.com/c0803faba13d2380a83881e26dd7328fd28cbec9bdca34ca6ac273e5540080ca/1.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #333333;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  border-radius: 1em;
  padding: 4em;
}
.img-wr.lg.spring {
  background-image: url('https://uanon.s3.amazonaws.com/c0803faba13d2380a83881e26dd7328fd28cbec9bdca34ca6ac273e5540080ca/2.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #333333;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  border-radius: 1em;
  padding: 4em;
}
.img-wr.lg.summer {
  background-image: url('https://uanon.s3.amazonaws.com/c0803faba13d2380a83881e26dd7328fd28cbec9bdca34ca6ac273e5540080ca/4.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #333333;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  border-radius: 1em;
  padding: 4em;
  max-width: 450px;
}
.img-wr.lg.autumn {
  background-image: url('https://uanon.s3.amazonaws.com/c0803faba13d2380a83881e26dd7328fd28cbec9bdca34ca6ac273e5540080ca/5.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #333333;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  border-radius: 1em;
  max-width: 450px;
  padding: 2em;
}
.img-wr.lg.winter {
  background-image: url('https://uanon.s3.amazonaws.com/c0803faba13d2380a83881e26dd7328fd28cbec9bdca34ca6ac273e5540080ca/6.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #333333;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  border-radius: 1em;
  max-width: 450px;
  padding: 2em;
}
.img-wr.lg.cryptowinter {
  background-image: url('https://uanon.s3.amazonaws.com/c0803faba13d2380a83881e26dd7328fd28cbec9bdca34ca6ac273e5540080ca/7.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #333333;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  border-radius: 1em;
  max-width: 450px;
  padding: 2em;
}
.img-wr.lg.dawn {
  background-image: url('https://uanon.s3.amazonaws.com/c0803faba13d2380a83881e26dd7328fd28cbec9bdca34ca6ac273e5540080ca/8.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #333333;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  border-radius: 1em;
  max-width: 450px;
  padding: 2em;
}
.img-wr.lg img, .img-wr.lg {
  position: relative;
  margin-right: 0.5%;
  cursor: pointer;
}
.img-wr.lg.autumn img{
  border-radius: 1em;
}
.img-wr.lg img.active {
  transform: scale(3);
  z-index: 1000;
  top: 6em;
  right: 25vw;
}
.img-wr.lg.autumn img.active {
  top: 10.5em;
}
.bg-tutorial {
  width: 425px;
  background-image: url('https://uanon.s3.amazonaws.com/c0803faba13d2380a83881e26dd7328fd28cbec9bdca34ca6ac273e5540080ca/1.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #333333;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  border-radius: 1em 1em 0 0;
}
.bg-spring {
  width: 425px;
  background-image: url('https://uanon.s3.amazonaws.com/c0803faba13d2380a83881e26dd7328fd28cbec9bdca34ca6ac273e5540080ca/2.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #333333;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  border-radius: 1em 1em 0 0;
}
.bg-summer {
  width: 425px;
  height: 250px;
  background-image: url('https://uanon.s3.amazonaws.com/c0803faba13d2380a83881e26dd7328fd28cbec9bdca34ca6ac273e5540080ca/4.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #333333;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  border-radius: 1em 1em 0 0;
}
.bg-autumn {
  width: 425px;
  height: 250px;
  background-image: url('https://uanon.s3.amazonaws.com/c0803faba13d2380a83881e26dd7328fd28cbec9bdca34ca6ac273e5540080ca/5.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #333333;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  border-radius: 1em 1em 0 0;
}
.bg-winter {
  width: 425px;
  height: 250px;
  background-image: url('https://uanon.s3.amazonaws.com/c0803faba13d2380a83881e26dd7328fd28cbec9bdca34ca6ac273e5540080ca/6.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #333333;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  border-radius: 1em 1em 0 0;
}
.bg-cryptowinter {
  width: 425px;
  height: 250px;
  background-image: url('https://uanon.s3.amazonaws.com/c0803faba13d2380a83881e26dd7328fd28cbec9bdca34ca6ac273e5540080ca/7.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #333333;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  border-radius: 1em 1em 0 0;
}
.bg-dawn {
  width: 425px;
  height: 250px;
  background-image: url('https://uanon.s3.amazonaws.com/c0803faba13d2380a83881e26dd7328fd28cbec9bdca34ca6ac273e5540080ca/8.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #333333;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  border-radius: 1em 1em 0 0;
}
.bg-summer .card-img, .summer .card-img {
  max-width: 375px;
  position: relative;
}
.bg-summer .card-img.ascended {
  top: 25px;
}
.bg-summer .card-img.medieval {
  top: 2.5px;
}
.bg-summer .card-img.orthodox {
  top: 20px;
}
.bg-summer .card-img.common1, .bg-summer .card-img.common2 {
  top: 17px;
  max-height: 85%;
}
.bg-autumn .card-img {
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-radius: 1em;
}
.bg-winter .card-img,
.winter .card-img {
  max-width: 351px;
  padding-top: 1em;
}
.bg-cryptowinter .card-img,
.cryptowinter .card-img,
.bg-dawn .card-img,
.dawn .card-img,{
  padding: 1em;
}
.summer.ascended .card-img:not(.active),
.summer.orthodox .card-img:not(.active) {
  right: 25%;
}
.summer.medieval .card-img:not(.active) {
  right: 17%;
}
.summer.kohathite .card-img:not(.active) {
  right: 13%;
}
.summer.common1 .card-img:not(.active), .summer.common2 .card-img:not(.active) {
  right: 24%;
}
.winter .card-img {
  top: -12px;
}
.img-wr.lg.winter img.active {
  right: 23vw;
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