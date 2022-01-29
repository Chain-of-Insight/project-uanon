<template>

  <div id="bg1"></div>
  <div id="bg2"></div>
  <div id="bg3"></div>

  <div class="autumn-wrap console" :class="{copen: co}" v-if="rdy">
    
    <div class="content-s autumn puzzle-content"  v-if="p.id">
      <div class="jumbotron hack-this-meme ctf-banner">
        <ul class="ctf-meta">
          <li class="ctf title">
            <h3 class="ctf-label cyan">Title:</h3>&nbsp;<span>{{p.title}}</span>
          </li>
          <li class="ctf category" v-if="p.category">
            <h3 class="ctf-label cyan">Category:</h3>&nbsp;<span>{{p.category}}</span>
          </li>
          <li class="ctf tags" v-if="p.tags">
            <h3 class="ctf-label cyan">Tags:</h3>&nbsp;
            <div class="tags" v-for="(tag,i) in p.tags" :key="i">
              <span class="tag" v-if="i !== (p.tags.length-1)">{{tag}},&nbsp;</span>
              <span class="tag" v-if="i == (p.tags.length-1)">{{tag}}</span>
            </div>
          </li>
          <li class="ctf points" v-if="p.points">
            <h3 class="ctf-label cyan">Points:</h3>&nbsp;<span>{{p.points}}</span>
          </li>
          <li class="ctf pubkey" v-if="p.secret">
            <h3 class="ctf-label cyan">Pubkey:</h3>&nbsp;<span>{{p.secret}}</span>
          </li>
        </ul>
      </div>

      <div class="instructions" v-if="p.description">
        <h4 class="blood">Your instructions:</h4>
        <div v-html="p.description"></div>
      </div>

      <div class="docs" v-if="p.api">
        <h4 class="blood">Documentation</h4>
        <div class="idocs">
          
          <div id="opts">
            <div id="accordion">
              <!-- Auth -->
              <div class="card">
                <div class="card-header" :class="{open: o == 0}" id="a_auth_h">
                  <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#a_auth" aria-expanded="true" aria-controls="a_auth" @click="o = (o === 0) ? null : 0;">Authentication</button>
                    <span class="float-right close-x" data-toggle="collapse" data-target="#a_auth" v-if="o == 0" @click="o = null;">&times;</span>
                  </h5>
                </div>
                <div id="a_auth" class="collapse" aria-labelledby="API Authentication" data-parent="#accordion">
                  <div class="card-body">
                    <div class="ifr" v-if="p.api.docs">
                      <a class="ifr ifr-auth" :href="p.api.docs.auth" v-if="p.api.docs.auth" target="_blank">
                        <p>Open Auth Documentation</p>
                        <i class="fa fa-external-link"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- GET -->
              <div class="card">
                <div class="card-header" :class="{open: o == 1}" id="a_get_h">
                  <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#a_get" aria-expanded="true" aria-controls="a_get" @click="o = (o === 1) ? null : 1;">GET</button>
                    <span class="float-right close-x" data-toggle="collapse" data-target="#a_get" v-if="o == 1" @click="o = null;">&times;</span>
                  </h5>
                </div>
                <div id="a_get" class="collapse" aria-labelledby="HTTP GET" data-parent="#accordion">
                  <div class="card-body">
                    <div class="ifr" v-if="p.api['docs']">
                      <a class="ifr ifr-auth" :href="p.api.docs.get" v-if="p.api.docs.get" target="_blank">
                        <p>Open Http GET Documentation</p>
                        <i class="fa fa-external-link"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- POST -->
              <div class="card">
                <div class="card-header" :class="{open: o == 2}" id="a_post_h">
                  <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#a_post" aria-expanded="true" aria-controls="a_post" @click="o = (o === 2) ? null : 2;">POST</button>
                    <span class="float-right close-x" data-toggle="collapse" data-target="#a_post" v-if="o == 2" @click="o = null;">&times;</span>
                  </h5>
                </div>
                <div id="a_post" class="collapse" aria-labelledby="HTTP POST" data-parent="#accordion">
                  <div class="card-body">
                    <div class="ifr" v-if="p.api['docs']">
                      <a class="ifr ifr-auth" :href="p.api.docs.post" v-if="p.api.docs.post" target="_blank">
                        <p>Open Http POST Documentation</p>
                        <i class="fa fa-external-link"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Soulve -->
    <div class="open-c inner">
      <p class="helper-bar float-right" @click="gopen();" v-if="p.secret">
        <span class="icon icon-game"></span>
      </p>
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
      v-bind:tx="true"
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
      v-bind:tx="true"
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

  export default {
    name: 'Autumn Ascension',
    components: { Console, Graphical },
    data: () => ({
      a: false,
      c: Config,
      d: false,
      h: verifyProof,
      i: CURRENT_I,
      m: null,
      o: null,
      p: {
        id: null,
        title: null,
        description: null,
        secret: null,
        template: null
      },
      s: null,
      t: null,
      w: Config.notify.DEFAULT_PLAYER_WARNING,
      cd: false,
      co: false,
      gd: false,
      do: store,
      sl: null,
      sv: null,
      fi: null,
      un: null,
      api: api,
      str: {},
      img: 0,
      def: ['autumn+', 3],
      rdy: false,
      argT: [false, false]
    }),
    mounted: async function () {
      this.getStr();
      await this.getU();
      await this.getTpl();
      this.rdy = true;
    },
    methods: {
      getStr: function () {
        this.str = this.do.store.get();
      },
      getS: async function () {
        let req = {
          realm: this.def[0]
        };
        let resp = await this.api.request.post('/season/get', req);
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
        if (i == CURRENT_I) {
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
      prep: function () {
        if (this.p.id && this.str) {
          let a = [], str = this.str['autumn'];
          for (let i = 0; i < str.length; i++) {
            if (str[i]) {
              if (str[i].proof) {
                a[i] = str[i].proof;
              }
            }
          }
          this.p.bundle = a;
          // console.log('Current Puzzle =>', this.p);
        }
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
        this.p.fields = (m.fields) ? m.fields : null;
        this.p.template = (m.template) ? m.template : null;
        this.p.tags = (m.tags) ? m.tags : null;
        this.p.category = (m.category) ? m.category : null;
        this.p.points = (m.points) ? m.points : null;
        this.p.api = (m.api) ? m.api : null;

        if (this.p.payload) {
          if (this.p.payload['format']) {
            this.p.format = this.p.payload.format;
          }
        }

        this.prep();
        // console.log('Current Puzzle =>', this.p);
      },
      loadM: function (l) {
        return this.z.out(l);
      },
      initG: function(n,g=null) {
        if (window['gmap']) {
          delete window.gmap
        }
        if (g !== null) {
          this.geo.g = g;
          this.geo.state = (g+1);
          this.geo.l = 0;
        } else {
          this.geo.l = n;
        }
        this.geo.x = this.p.geoquestr.games[this.geo.g].locations[this.geo.l];
        let s=this.loadM(this.geo.x).split(','),si=parseFloat(s[0].replace('@','')),sii=parseFloat(s[1]),t={lat:si,lng:sii};
        window.gmap = new window.google.maps.StreetViewPanorama(
          document.getElementById("pano"),{
            position:t,
            controlSize: 0,
            motionTracking: false,
            motionTrackingControl: false,
            streetViewControl: false,
            linksControl: false,
            panControl: false,
            imageDateControl: false,
            addressControl: false,
            showRoadLabels: false,
            enableCloseButton: false,
            zoomControl: false,
            addressControlOptions: {position: window.google.maps.ControlPosition.BOTTOM_CENTER}
          }
        );
      },
      submit: async function () {
        this.geo.report = {
          msg: null, 
          success:null
        };
        let req = {
          submit: JSON.stringify(this.geo.res)
        };
        let resp = await this.api.request.post('/geoquestr', req);
        if (resp.status == 200 && resp.data) {
          let d = resp.data;
          if (d.message) {
            this.geo.report = {
              success: d.message.success,
              msg: d.message.content
            };
          }
        }
      },
      /**
       * @param {String} s : Public key
       * @param {String} h : Private Proof
       */
      prove: function (h, s) {
        let v = false;

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
      closeGm: function () {
        if (this.geo.res.length) {
          localStorage.setItem('_u_meme1', JSON.stringify(this.geo.res));
        }
        this.geo.state = 6
      },
      mtoggle: function () {
        this.d = !this.d;
      }
    }, 
    computed: {
      can: function () {
        let c;
        if (!this.geo) {
          return false;
        } else if (!this.geo.res) {
          return false;
        } else if (!this.geo.res.length) {
          return false;
        }
        for (let i = 0; i < this.geo.res.length; i++) {
          for (let j = 0; j < this.geo.res[i].length; j++) {
            if (!this.geo.res[i][j]) {
              c = false
              return false;
            }
            if (i == (this.geo.res.length-1) && j == (this.geo.res.length[i]-1)) {
              c = true;
            }
          }
        }
        return c;
      }
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
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/cf3c6f0f3163a1c4b2aa788af8c88a0c1e9a3c3378e9178e2060ae8707d10898.png');
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
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/9a63a8814764d3fecbd33fa96565d3d639a1bb08cde0234bb68529481aa45665.png');
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
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/5820f3104ed541f402e369c6da61ab87cae7e58e0ce56547922a0ba4d57721fd.png');
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
.autumn-wrap {
  padding: 4em;
  max-width: 1440px;
  width: 80vw;
  margin: auto;
  box-shadow: 0 0 5px 10px #333;
  -webkit-box-shadow: 0 0 5px 10px #333;
  -moz-box-shadow: 0 0 5px 10px #333;
  background-color: rgba(148,49,91,0.4);
  border-radius: 1em;
  margin-bottom: 4em;
}
.wr {
  position: absolute;
  right: 0;
  left: 0;
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
.helper-bar:hover {
  box-shadow: 0 0 5px 10px rgba(230,0,115,0.3);
  text-shadow: 0 0 20px #eee, 0 0 30px #eee, 0 0 40px #ff7070, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff7070;
}
.helper-bar > .icon-game {
  position: relative;
  top: 2px;
}
.ctf-banner {
  background-image: url("https://uanon.s3.amazonaws.com/backgrounds/3ab2ba644a304a0f022cf0b5d26c9e926111defd244c5270d8c77ee63662f9bc.png");
  background-size: cover;
}
.ctf-label, div.tags {
  display: inline;
  font-weight: 500;
  text-shadow: 0 2px 2px #333;
}
.ctf-banner ul {
  padding: 3rem;
}
.ctf-meta {
  background: -webkit-linear-gradient(transparent, rgba(230,0,115,0.8)) left repeat;
  margin-top: -4em;
  margin-bottom: -3.2em;
  margin-left: -32px;
  margin-right: -32px;
  border-radius: 1em;
}
.ctf-banner ul, .ctf-banner ul li {
  list-style: none;
}
.ctf-banner ul li {
  line-height: 1.25rem;
}
.ctf-banner ul li span, .ctf-banner ul li div.tags {
  font-style: italic;
}
div.instructions {
  margin-top: 2em;
  margin-bottom: 2em;
}
#opts {
  margin-top: 1em;
  margin-bottom: 1em;
}
.close-x {
  font-size: 2em;
  margin-right: 0.5em;
  color: #ff7070;
  top: -7px;
  position: relative;
}
.close-x.a-err {
  top: -15px;
  left: 25px;
  color: #ffffff;
}
.card {
  background: #000;
  box-shadow: inset 0 0 10px #000000;
  border-radius: 5px;
}
.card-header {
  background-repeat: repeat;
  background-color: #333;
  box-shadow: inset 0 0 10px #000000;
  color: #ff7070;
  border-bottom: none;
}
.card-header.open {
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/4aefac88b597b312f457af4c6eb210bfeb2b614d861a9d8a380990e96c8823ab.png');
}
.card-header .btn-link {
  color: #ff7070;
}
.card-body {
  background-color: rgba(0,0,0,0.9);
}
.controls .btn {
  margin-right: 1em;
}
.ifr, .ifr p, .ifr i  {
  display: inline-block;
}
.ifr i {
  margin-left: 1.25em;
}
.autumn-wrap.copen {
  margin-bottom: 70vh;
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