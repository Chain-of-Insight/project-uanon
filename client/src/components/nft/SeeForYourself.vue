<template>

<div class="loading" v-if="ld"></div>

<div class="pane-s token-wrap 3d sealed" v-if="!a && !ld">
  <h3 class="descr" alt="The token you are looking for does not Exist" title="The token you are looking for does not Exist">What is True?</h3>
</div>

<div class="pane-s token-wrap 3d" v-if="a && !ld">
  <div class="model" v-if="model">
    <model-viewer 
      class="mv"
      :class="m.asset.type + ' ' + m.asset.realm"
      :src="model.uri"
      environment-image="neutral"
      loading="eager"
      v-if="model.uri"
      camera-controls
    ></model-viewer>
  </div>
</div>

</template>

<script>
import * as api from '../../util/api';
import { getTruthShardData } from '../../util/contract';

const DEPLOYED = [process.env.VUE_APP_TEZOS_NFT_SEASON_1,process.env.VUE_APP_TEZOS_NFT_SEASON_2];

export default {
  data: () => ({
    a: false,
    c: null,
    m: null,
    n: null,
    r: null,
    t: null,
    bg: null,
    ld: true,
    api: api,
    def: ['spring','summer'],
    model: null,
    spring: ['ascended','lost','secret','cruel','common2','common1'],
    summer: ['ascended','medieval','kohathite','orthodox','common2','common1']
  }),
  mounted: async function () {
    await this.loadComponent();
    if (this.$route.params) {
      if (this.$route.params.contract && this.$route.params.type) {
        let d = await this.getData(this.$route.params.contract, this.$route.params.type);
        if (d) {
          this.m = d;
          this.a = true;
          if (this.m['metadata']) {
            if (this.m.metadata['formats']) {
              this.setM(this.m.metadata.formats);
            }
          }
          // console.log('this.m =>', this.m);
        } else {
          this.ld = false;
        }
      }
    }
  },
  methods: {
    /**
     * @param {String} contract : Tezos contract address
     * @param {String} type : Human readable NFT type, e.g. "ascended"
     */
    getData: async function (contract, type) {
      this.ld = true;
      try {
        this.c = contract;
        this.t = type;
        let args = {s: null,i: null}, t;
        switch (this.c) {
          // Spring
          case DEPLOYED[0]: {
            this.r = this.def[0]
            args.s = this.r;
            switch (this.t) {
              case this.spring[0]: {
                args.i = 0;
                t = await getTruthShardData(args.s, args.i);
                this.ld = false;
                return t;
              }
              case this.spring[1]: {
                args.i = 1;
                t = await getTruthShardData(args.s, args.i);
                this.ld = false;
                return t;
              }
              case this.spring[2]: {
                args.i = 2;
                t = await getTruthShardData(args.s, args.i);
                this.ld = false;
                return t;
              }
              case this.spring[3]: {
                args.i = 3;
                t = await getTruthShardData(args.s, args.i);
                this.ld = false;
                return t;
              }
              case this.spring[4]: {
                args.i = 4;
                t = await getTruthShardData(args.s, args.i);
                this.ld = false;
                return t;
              }
              case this.spring[5]: {
                args.i = 5;
                t = await getTruthShardData(args.s, args.i);
                this.ld = false;
                return t;
              }
              default: {
                this.ld = false;
                return false;
              }
            }
          }
          // Summer
          case DEPLOYED[1]: {
            this.r = this.def[1]
            args.s = this.r;
            switch (this.t) {
              case this.summer[0]: {
                args.i = 0;
                t = await getTruthShardData(args.s, args.i);
                console.log('getTruthShardData', t);
                this.ld = false;
                return t;
              }
              case this.summer[1]: {
                args.i = 1;
                t = await getTruthShardData(args.s, args.i);
                this.ld = false;
                return t;
              }
              case this.summer[2]: {
                args.i = 2;
                t = await getTruthShardData(args.s, args.i);
                this.ld = false;
                return t;
              }
              case this.summer[3]: {
                args.i = 3;
                t = await getTruthShardData(args.s, args.i);
                this.ld = false;
                return t;
              }
              case this.summer[4]: {
                args.i = 4;
                t = await getTruthShardData(args.s, args.i);
                this.ld = false;
                return t;
              }
              case this.summer[5]: {
                args.i = 5;
                t = await getTruthShardData(args.s, args.i);
                this.ld = false;
                return t;
              }
              default: {
                this.ld = false;
                return false;
              }
            }
          }
          default: {
            this.ld = false;
            return false;
          }
        }
      } catch(e) {
        this.ld = false;
        console.warn("Error loading 3D model", e);
        return false;
      }
    },
    /**
     * @param {Object} f : Array of asset formats 
     */
    setM: function (f) {
      console.log('setM', f);
      if (!Array.isArray(f)) {
        return;
      }
      if (this.c) {
        switch (this.c) {
          case DEPLOYED[0]: 
          case DEPLOYED[1]: {
            if (f[1]) {
              this.model = f[1];
              // console.log('Model =>', this.model);
            }
            break;
          }
        }
      }
    }
  },
  computed: {
    loadComponent: function () {
      return () => import('@google/model-viewer');
    }
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
.mv {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  min-height: calc(100vh - 50px);
  width: auto;
  background: radial-gradient(circle at 50% -20.71%, #ff7070 0, #ff683e 16.67%, #ff5743 33.33%, #f94646 50%, #e83548 66.67%, #d8254a 83.33%, #c9144c 100%);
}
.mv.ascended {
  background: linear-gradient(-42deg, #caa1de, #ffffff 16%, #dedede 21%, #ffffff 24%, #caa1de 27%, #dedede 72%, #ffffff 80%, #dedede 84%, #caa1de 93%, #dea1ca);
}
.mv.lost {
  background: linear-gradient(to right, #BF953F, #FCF6BA, #efefef, #FBF5B7, #AA771C);
}
.mv.secret {
  background: linear-gradient(-42deg, #aaa9ad, #ffffff 16%, #aaa9ad 21%, #aaa9ad 24%, #aaa9ad 27%, #dedede 36%, #aaa9ad 45%, #aaa9ad 60%, #dedede 72%, #ffffff 80%, #dedede 84%, #aaa9ad);
}
.mv.cruel {
  background: linear-gradient(to right, rgb(64, 224, 208), rgb(255, 140, 0), rgb(255, 0, 128));
}
.mv.summer:not(.ascended) {
  background: linear-gradient(to right, #333333, #8B0000, #8B0000, #ff5743, #8B0000, #8B0000, #333333);
}
</style>