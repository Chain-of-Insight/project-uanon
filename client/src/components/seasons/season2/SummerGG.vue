<template>
  <div class="spring-wrap gg" v-if="asc">
    <div class="video gg"></div>
    <div class="voidism" v-if="st==1">
      <canvas id="canvas"></canvas>
      <div class="j-fixed">
        <div class="sealed jumbotron">
          <div class="ctrl">
            <button class="btn btn-primary tk" @click="k();">
              <span class="icon-display"></span>&nbsp;<span>TAKE YOUR BOW</span>
            </button>
            <button class="btn btn-primary tk tk2" @click="st=1;" v-if="st!==1">
              <span class="icon-coronavirus"></span>
            </button>
            <button class="btn btn-primary tk tk2" @click="st=0;" v-if="st!==0">
              <span class="fa fa-crown"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="sealed jumbotron" v-if="st==0">
      <div class="title-bar t">
        <h3>An Elephant Never Forgets</h3>
        <hr class="ruler">
      </div>
      <p>When I was young I'd flee this town</p>
      <p>I buried my dreams underground</p>
      <p>Asked did I? We drink to die.</p>
      <p>We drink Tonight!</p>
      <p>Far from home, elephant guns</p>
      <p>let's take them down 1—x—1</p>
      <p>We'll lay It down, it's not been found; it's not A◯round</p>
      <p>Let the seasons begin, it rolls right on ◯</p>
      <p>Let the seasons begin, take the Big King down</p>
      <p>Let the seasons begin, it rolls right on ◯</p>
      <p>Let the seasons begin, take the Big King. Bow down.</p>
      <p>And it rips through the silence—of our camp at Night</p>
      <p>And it rips through the Night—all night, all night</p>
      <p>And it rips through the silence—of our camp at night</p>
      <p>And it rips through the silence—<br/>All that is left is all that I LOST...</p>
      <div class="another-castle">
        <span class="door-one hidden">wodИWOႧDOWNbow</span><span class="door-two hidden">TAKE-THE-BIG-KING—ИWOႧDOWN</span>
      </div>
      <div class="ctrl">
        <button class="btn btn-primary tk" @click="k();">
          <span class="icon-display"></span>&nbsp;<span>TAKE YOUR BOW</span>
        </button>
        <button class="btn btn-primary tk tk2" @click="ism(1);" v-if="st!==1">
          <span class="icon-coronavirus"></span>
        </button>
        <button class="btn btn-primary tk tk2" @click="ism(0);" v-if="st!==0">
          <span class="fa fa-crown"></span>
        </button>
      </div>
    </div>
    <div class="hierarchies" v-if="sh">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog modal-dialog-e">
              <div class="modal-content modal-content-e">
                <div class="modal-header">
                  <div type="button" class="close" @click="k();">
                    <span class="close-x" aria-hidden="true">&times;</span>
                  </div>
                </div>
                <div class="modal-body">
                  <iframe :src="v" frameborder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
  <div class="spring-wrap gg" v-if="!asc && !ld">
    <div class="sealed jumbotron">
      <div class="title-bar">
        <h3>Your Truth lacks evidence</h3>
        <hr class="ruler">
      </div>
      <p class="blood">Entrance requires holding the <span class="italic">Ark of the Revenant</span></p>
    </div>
  </div>
  <div class="loading" v-if="ld"></div>
</template>

<script>
import { getActiveAccount } from '../../../util/tezos';
import { getTruthShard } from '../../../util/contract';

import make from '../../../aesthetics/a5';

const YTB = "https://www.youtube.com/embed/";

export default {
  name: 'Summer Ascend',
  data: () => ({
    a: make,
    r: 'summer',
    v: null,
    ld: false,
    sh: false,
    st: 0,
    asc: false
  }),
  mounted: async function () {
    await this.verify();
  },
  methods: {
    k: function () {
      if (!this.asc || !this.v) {
        console.warn("Error loading vision.");
        return;
      } else {
        this.sh = !this.sh;
        let b;
        if (this.sh){
          b = document.getElementsByTagName('body');
          b[0].style.overflow = 'hidden';
        } else {
          b = document.getElementsByTagName('body');
          b[0].style.overflow = '';
        }
      }
    },
    /**
     * @param {Number} s : Boolean integer (animation state) ? True : False
     */
    ism: async function (s = 0) {
      if (typeof s !== 'number') {
        s = 0;
      } else if (s > 1 || s < 0) {
        s = 0;
      }
      this.st = s;
      if (s > 0) {
        setTimeout(() => {
          this.$nextTick(async() => {
            await this.ma();
          });
        }, 0);
      }
    },
    ma: async function () {
      await this.a();
    },
    verify: async function () {
      this.ld = true;
      let a = await getActiveAccount();
      if (!a.address) {
        return;
      }
      let t;
      try {
        t = await getTruthShard(a.address, this.r);
      } catch(e) {
        console.warn("Error loading Truth shard", e);
        this.ld = false;
      } finally {
        this.ld = false;
        if (t) {
          if (t['metadata']) {
            if (t.metadata.externalUri) {
              this.asc = true;
              let y = t.metadata.externalUri.split('/');
              y = YTB + y[y.length-1];
              this.v = y;
            }
          }
        }
      }
    },
  }
}
</script>

<style scoped>
.loading {
  height: 40vh;
  background-image: url('/img/loading.gif');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.centre {
  text-align: center;
}
.spring-wrap.gg {
  width: 80vw;
  max-width: 1440px;
  margin: auto;
  margin-bottom: 6.5em;
}
#canvas {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: none;
}
.sealed {
  animation: mythos ease 160s;
  -webkit-animation: mythos ease 160s;
  -moz-animation: mythos ease 160s;
  -o-animation: mythos ease 160s;
  -ms-animation: mythos ease 160s;
  animation-iteration-count: infinite;
}
.sealed.jumbotron {
  margin-top: 0;
  max-width: 1440px;
  width: 80vw;
  margin: auto;
}
.sealed .title-bar h3,
.sealed .title-bar h5,
.sealed p {
  background: -webkit-linear-gradient(#ff7070, #333);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 0px 6px #ff7070;
}
.ruler {
  border-top: 1px solid rgba(255,255,55,0.1);
  margin-top: 1em;
  margin-bottom: 1em;
}
.sealed p {
  font-size: 1.5em;
}
.title-bar.t {;
  margin-bottom: 2em;
}
div.hierarchies {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity .3s ease;
}
.modal-dialog-e {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin-top: 0;
  min-width: 95vw;
}
.modal-body, iframe {
  height: 100%;
  width: 100%;
  margin: auto;
  min-height: 90vh;
  background: transparent;
}
.ctrl {
  display: block;
  margin: auto;
  width: 250px;
}
.j-fixed {
  position: absolute;
  left: 0;
  right: 0;
}
.tk {
  display: inline-block;
  margin: auto;
  margin-right: 1em;
}
span.icon-display {
  position: relative;
  top: 2px;
}
iframe {
  width: 100%;
  height: auto;
  background-color: #333333;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  border-radius: 0.5em;
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