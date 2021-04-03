<template>
  <div class="truth-shard nft" @click="toggle();">
    <div class="jumbotron">
      <div class="img-wr" :class="'bg-' + r" v-if="s">
        <img class="card-img" :src="image" :alt="m.attributes[1].action">
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
                  <div class="img-wr lg right float-right" :class="r" v-if="image" @click="z=!z;">
                    <img class="card-img" :class="{active: z}" :src="image" :alt="m.attributes[1].action">
                    <!--
                    XXX TODO: Display FA2 shadow / depression when FA2 zoomed in
                    -->
                  </div>
                  <div class="left">
                    <p class="descr descr-t" v-if="m.creator">
                      <label>Creator:&nbsp;</label>
                      <span>{{m.creator}}</span>
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
                    <p class="descr descr-t" v-if="m.attributes.length > 0">
                      <label>Action:&nbsp;</label>
                      <span>{{m.attributes[1].value}}</span>
                    </p>
                    <p class="descr descr-t" v-if="m.imageUri && !m.displayUri">
                      <label>Image:&nbsp;</label>
                      <span>{{m.imageUri}}</span>
                    </p>
                    <p class="descr descr-t" v-if="m.displayUri">
                      <label>Image:&nbsp;</label>
                      <span>{{m.displayUri}}</span>
                    </p>
                    <p class="descr descr-t" v-if="m.externalUri">
                      <label v-if="r == 'spring'">Video:&nbsp;</label>
                      <span>
                        <a :href="m.externalUri" target="_blank">{{m.externalUri}}</a>
                      </span>
                    </p>
                  </div>
                  <div class="descr descr-t" v-if="m.description">
                    <label>Engraving:&nbsp;</label>
                    <div class="descr-f">{{m.description}}</div>
                  </div>
                </div>
                <div class="ctrl" v-if="r !== 'tutorial'">
                  <button class="btn btn-primary ctrl" @click="td=!td;">Open in 3D Viewer</button>
                  <div class="bg-warning" v-if="td">
                    <div type="button" class="close" @click="td = false">
                      <span class="close-x xxd" aria-hidden="true">&times;</span>
                    </div>
                    <span>Coming soon...</span>
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
    def: ['tutorial', 0]
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
  margin-left: 5em;
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
  max-width: 85%;
  margin: auto;
  background: -webkit-linear-gradient(#fff, #ff7070);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 0px 6px #ff7070;
  clear: both;
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
.img-wr.lg img, .img-wr.lg {
  position: relative;
  margin-right: 0.5%;
  cursor: pointer;
}
.img-wr.lg img.active {
  transform: scale(3);
  z-index: 1000;
  top: 6em;
  right: 25vw;
}

/* Backgrounds */
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