<template>
  <div class="spring-wrap gg" v-if="asc">
    <div class="video gg"></div>
    <div class="sealed jumbotron">
      <div class="title-bar t">
        <h3>The End Is The Beginning Is The End</h3>
        <hr class="ruler">
      </div>
      <p>No one is content with Faith alone.</p>
      <p>It is a sign of urbanity to assume everyone has Faith, else it were a curious statement to make.</p>
      <p>That one is "proceeding further".</p>
      <p v-if="scrawl">In the Ancient Times it was {{scrawl}}.</p>
      <p>Faith was a task for a lifetime.</p>
      <p>Faith was not to be won within a few days or weeks.</p>
      <p>When the hierarchy feels its End approaching. After having fought Battles and preserved Faith.</p>
      <p>Are you yet young at heart not to have forgotten the Fear and Trembling of youth yet you?</p>
      <p>Which the mature HUman has under control, and yet NObody entirely outgrows—</p>
      <p>Except, insofar as one succeeds in "going on" in the puzzle as early as possible.</p>
      <p>The goal reached at last: the spot where once you started, in order to "proceed further".</p>
      <p>Right behind you is the Crazy. To your Right Lies the Confusion.</p>
      <p>WEHERE NOW?&nbsp;<span style="display:none;">WEKNOW WEHERE.</span></p>
      <div class="ctrl">
        <button class="btn btn-primary tk" @click="k();">
          <span class="icon-display"></span>&nbsp;<span>THE MISERABLE VISION</span>
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
                  <div type="button" class="close" @click="sh=false;">
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
      <p class="blood">Entrance requires holding the <span class="italic">Tome of the Princess Caraboo</span></p>
    </div>
  </div>
  <div class="loading" v-if="ld"></div>
</template>

<script>
import { getActiveAccount } from '../../../util/tezos';
import { getTruthShard } from '../../../util/contract';

const YTB = "https://www.youtube.com/embed/";

export default {
  name: 'Spring Ascend',
  data: () => ({
    r: 'spring',
    v: null,
    ld: false,
    sh: false,
    asc: false,
    scrawl: "Ɑiffere🇳​​​​​tᴎeяeffiD"
  }),
  mounted: async function () {
    await this.verify();
  },
  methods: {
    k: function () {
      if (!this.asc || !this.v) {
        console.warn("Error loading miserable vision.");
        return;
      } else {
        this.sh = !this.sh;
      }
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
  min-width: 95vw;
  min-height: 95vh;
  overflow-y: auto;
}
.modal-body, iframe {
  height: 100%;
  width: 100%;
  margin: auto;
  min-height: 90vh;
  background: transparent;
}
.tk {
  display: block;
  margin: auto;
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
