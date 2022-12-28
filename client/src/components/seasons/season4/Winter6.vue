<template>

<!--
hæab yothutab rtno ab ndrtutnoestabthno
utthwihæest abest esthæab estrtst
esthæthhw ovæutestthowutyo utthabhæ
owutrtnd esthæab estrtst rtow esthæab ndrtutnoestabthno
abutabutth ndrtutnothnowi th hæabyobe estrthæabutelhw esthæab abelwiab
abnoel esthæutrthæ yothestestyoab esthæthnowihw rtowow
yothbeab ebabut stabutesthw, ovrtestestyoabhw abnoel ebutestyoabutth
rtut hæhæabestabutabut th owthnoel yoththnowi abutrtutnoel
thest'hw ovabebrtndab ab hæabovthest, ab hæabth estrt hwestabutest esthæab elabth

th wirt esthæutrtutwihæ abyoyo esthæthhw
ovabowrtutab thrtut hæabbeab utst
hwrt th ebabno owababyo hæabststthabut
estrt ovab hwabowab utst hæabutab hæthesthæ thrtut
th wirt esthæutrtutwihæ abyoyo esthæthhw
ovabowrtutab thrtut hæabbeab utst
hwrt th ebabno owababyo hæabststthabut
estrt ovab hwabowab utst hæabutab hæthesthæ thrtut

thest'hw æutyoth ndrtutnothnowi
nort rtnoab thhw abhæabbeab
th'nd ovabebbe abest ndth ebyothowow
hwestthyoyo esthæutrthæthnowi esthæthnowihw rtowow
th yothhwestabno estrt hwrtutnoelhw esthæabth ndabbeab
rtno esthæabthut hæabth elrthæno
th owrtyoyorthæ hæthesthæ ndth abthabhw estthyoyo esthæabth ebutabhwhæ
th thndabwithnoab hæhæabest ndth ovrtelth hærtutyoel hwrtutnoel yothbeab
hwyoabndndthnowi abwiabthnohwest esthærthwab utrtebbehw
abnoel hæhæabno thest yoabnoelhw
hæthyoyo ndth abthabhw ovab ebyorthwabel rtut rtstabno?  
-->

  <div id="bg1"></div>
  <div id="bg2"></div>
  <div id="bg3"></div>

  <div class="winter-wrap console" v-if="rdy">

    <div class="content-s winter puzzle-content" v-if="p.id">

      <div class="wr">
        <div id="book">
          <div class="page cover front" data-density="hard">
            <h1 class="the-misery-of-vision">Canto III</h1>
          </div>
          <div class="page" id="start"></div>
          <div class="page page1">
            <img class="pimage img1" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/1.png'" />
            <p class="caption" v-if="p.captions[0]">{{p.captions[0]}}</p>
          </div>
          <div class="page page2">
            <img class="pimage img2" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/2.png'" />
            <p class="caption" v-if="p.captions[1]">{{p.captions[1]}}</p>
          </div>
          <div class="page page3">
            <img class="pimage img3" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/3.png'" />
            <p class="caption" v-if="p.captions[2]">{{p.captions[2]}}</p>
          </div>
          <div class="page page4">
            <img class="pimage img4" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/4.png'" />
            <p class="caption" v-if="p.captions[3]" v-html="p.captions[3]"></p>
          </div>
          <div class="page page5">
            <img class="pimage img5" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/5.png'" />
            <p class="caption" v-if="p.captions[4]">{{p.captions[4]}}</p>
          </div>
          <div class="page page6">
            <img class="pimage img6" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/6.png'" />
            <p class="caption" v-if="p.captions[5]">{{p.captions[5]}}</p>
          </div>
          <div class="page page7">
            <img class="pimage img7" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/7.png'" />
            <p class="caption" v-if="p.captions[6]" v-html="p.captions[6]"></p>
          </div>
          <div class="page page8">
            <img class="pimage img8" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/8.png'" />
            <p class="caption" v-if="p.captions[7]">{{p.captions[7]}}</p>
          </div>
          <div class="page mapkey">
            <p>A map that's also a key</p>
            <table>
              <tbody>
                <tr>
                  <td>____ ____ ___ ____ _____</td>
                </tr>
                <tr>
                  <td>____ ____ __ ___ _____</td>
                </tr>
                <tr>
                  <td>___ ____ ___</td>
                </tr>
                <tr>
                  <td>___ __________</td>
                </tr>
                <tr>
                  <td>___ __ ___ ___ ______</td>
                </tr>
                <tr>
                  <td>___ ___ ___ ____ ____ ________ __ _ _____</td>
                </tr>
                <tr>
                  <td>____ __ _____ ___ ___ __</td>
                </tr>
                <tr>
                  <td>___ ____ ______ ____</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Liber campir. -->
          <div class="page" id="final"></div>
          <div class="page cover back" data-density="hard"></div>
        </div>
      </div>

    </div>

    <div class="content-s danger no-access" v-if="!a && i > 0">
      <p class="no-access descr" v-html="w"></p>
      <router-link to="/palilalia">Back</router-link>
    </div>

    <!-- Soulve -->
    <div class="open-c inner">
      <p class="helper-bar float-right" @click="handleCopen();" v-if="p.secret">
        <span class="icon icon-terminal2"></span>
      </p>
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
      v-bind:tx="false"
      v-bind:rst="false"
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
      v-bind:l="true"
      v-bind:q="true"
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

  import { PageFlip } from 'page-flip';

  const CURRENT_I = 5;

  export default {
  name: 'Winter 6',
  components: { Console, Graphical },
  data: () => ({
    a: false,
    c: Config,
    h: verifyProof,
    i: CURRENT_I,
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
    gd: false,
    do: store,
    sl: null,
    sv: null,
    fi: null,
    un: null,
    api: api,
    str:{},
    def: ['winter', 4],
    rdy: false,
    argT: [false, false]
  }),
  mounted: async function () {
    this.getStr();
    await this.getU();
    await this.getS();
    await this.getTpl();
    this.rdy = true;
    await this.$nextTick();
    this.canto();
  },
  methods: {
    getStr: function () {
      this.str = this.do.store.get();
      // console.log('Store =>', this.str);
    },
    getS: async function () {
      let req = {
        realm: this.def[0]
      };
      let resp = await this.api.request.post('/season/get', req);
      // console.log(resp);
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
      if (i == 0) {
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
          // console.log('store', str);
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
      this.p.files = (m.files) ? m.files : null;
      this.p.fields = (m.fields) ? m.fields : 1;
      this.p.template = (m.template) ? m.template : null;
      this.p.captions = (m.captions) ? m.captions : [];
      this.p.format = (this.p.payload['format']) ? this.p.payload.format : null;
      if (Array.isArray(this.p.files)) {
        for (let i = 0; i < this.p.files.length; i++) {
          let f = this.p.files[i].split('/');
          f = f[f.length - 1];
          this.p.files[i] = '<a href="'+this.c.DEFAULT_STORAGE_BASE+'/'+this.p.id+'/'+f+'" target="_blank">'+f+'</a>';
        }
      }
      console.log('Current Puzzle =>', this.p);
    },
    /**
     * @param {String} s : Public key
     * @param {String} h : Private Proof
     */
     prove: function (h, s) {
      let v = false;

      // console.log('Verifying Proof =>', [h, typeof h]);

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
    handleCopen: function () {
      document.dispatchEvent(new KeyboardEvent('keypress',{'key':'`'}));
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
    canto: function  () {
      const b = document.getElementById('book');
      const f = new PageFlip(b, {
        width: 600,
        height: 800,
        showCover: true
      });
      f.loadFromHTML(document.querySelectorAll('.page'));
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
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/5820f3104ed541f402e369c6da61ab87cae7e58e0ce56547922a0ba4d57721fd.png');
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
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/cf3c6f0f3163a1c4b2aa788af8c88a0c1e9a3c3378e9178e2060ae8707d10898.png');
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
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/9a63a8814764d3fecbd33fa96565d3d639a1bb08cde0234bb68529481aa45665.png');
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
.wr {
  padding: 2em;
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
.helper-bar:nth-of-type(2n) {
  right: calc(2em + 75px);
}
.helper-bar:hover {
  box-shadow: 0 0 5px 10px rgba(230,0,115,0.3);
  text-shadow: 0 0 20px #eee, 0 0 30px #eee, 0 0 40px #ff7070, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff7070;
}
.helper-bar > .icon-game {
  position: relative;
  top: 2px;
}
.winter-wrap.copen {
  margin-bottom: 70vh;
}
#book {
  margin: auto;
  top: 4em;
  border-radius: 4em;
}
.the-misery-of-vision {
  color: rgba(0,0,0,0.7);
  text-shadow:
    0 0 5px #ffc373,
    0 0 10px #ffc373,
    0 0 20px #ffc373,
      0 0 40px #a17434,
      0 0 80px goldenrod,
      0 0 90px goldenrod,
      0 0 100px #a17434,
      0 0 150px #a17434;
  font-weight: 800;
  text-align: center;
  display: block;
  text-transform: uppercase;
  background-color: transparent;
  font-family: 'AnglicanText';
  font-size: 2.5em;
  letter-spacing: 0.4em;
  position: absolute;
  top: 12%;
  left: 18%;
}
.cover.front, .cover.back {
  filter: invert(0.9);
}
.cover.front {
  background: url('https://uanon.s3.amazonaws.com/c7f2e913f7739a1f556243c4fddc18e9b0d9f157f0316524ac322c1bf2425c31/book-cover-01a.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 110%;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
}
.cover.back {
  background: url('https://uanon.s3.amazonaws.com/c7f2e913f7739a1f556243c4fddc18e9b0d9f157f0316524ac322c1bf2425c31/book-cover-01b.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 110%;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
}
.page {
  padding: 20px;
  background-color: #f8f5de;
  background-image: 
    linear-gradient(to right, rgba(255,210,0,0.3), rgba(200, 160, 0, 0.1) 11%, rgba(0,0,0,0) 35%, rgba(200, 160, 0, 0.1) 65%),
    linear-gradient(to left, rgba(255,210,0,0.3), rgba(200, 160, 0, 0.1) 11%, rgba(0,0,0,0) 25%, rgba(200, 160, 0, 0.1) 75%);
  font-family: 'Special Elite', cursive;
  color: #000000;
  overflow: hidden;
  cursor: pointer;
}
.page:nth-child(even) {
  border-radius: 1em 0  0 1em;
}
.page:nth-child(odd) {
  border-radius: 0 1em  1em 0;
}
.cover {
  cursor: grab;
  border: solid 1px #333333;
}
#start {
  background: url('https://uanon.s3.amazonaws.com/c7f2e913f7739a1f556243c4fddc18e9b0d9f157f0316524ac322c1bf2425c31/knights-coat-of-arms.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
#final {
  background: url('https://uanon.s3.amazonaws.com/c7f2e913f7739a1f556243c4fddc18e9b0d9f157f0316524ac322c1bf2425c31/cosmiel-and-theodidactus.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.flip-book {
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
  margin: 0 auto;
  display: none;
  z-index: 100
}
.html-book {
  background-size: cover
}
.page .page-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
}
.page .page-content .page-header {
  height: 30px;
  font-size: 100%;
  text-transform: uppercase;
  text-align: center;
}
.page .page-content .page-image {
  height: 100%;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
}
.page .page-content .page-text {
  height: 100%;
  flex-grow: 1;
  font-size: 80%;
  text-align: justify;
  margin-top: 10px;
  padding-top: 10px;
  box-sizing: border-box;
  border-top: solid 1px #f4e8d7;
}
.page .page-content .page-footer {
  height: 30px;
  border-top: solid 1px #f4e8d7;
  font-size: 80%;
  color: #998466;
}
.page.--left {
  border-right: 0;
  box-shadow: inset -7px 0 30px -7px rgba(0, 0, 0, 0.4);
}
.page.--right {
  border-left: 0;
  box-shadow: inset 7px 0 30px -7px rgba(0, 0, 0, 0.4);
}
.page.--right .page-footer {
  text-align: right;
}
.page.hard {
  border: solid 1px #998466;
}
.page.page-cover {
  background-color: #e3d0b5;
  color: #785e3a;
  border: solid 1px #998466;
}
.page.page-cover h2 {
  text-align: center;
  padding-top: 50%;
  font-size: 210%;
}
.page.page-cover.page-cover-top {
  box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5), -2px 0 5px 2px rgba(0, 0, 0, 0.4);
}
.page.page-cover.page-cover-bottom {
  box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5), 10px 0 8px 0px rgba(0, 0, 0, 0.4);
}
img.pimage {
  margin-bottom: 1em;
  position: relative;
}
.caption {
  text-align: center;
  margin: auto;
  left: -2.5%;
}
.page1 p, 
.page1 img,
.page7 p, 
.page7 img,
.page8 p, 
.page8 img {
  top: 8em;
  position: relative;
}
.page5 img, .page5 p {
  top: 3.5em;
  position: relative;
}
.page6 img, .page6 p {
  top: 6em;
  position: relative;
}
.pimage.img4 {
  left: 23%;
  height: 70%;
  margin: auto;
}
.page4 p {
  text-align: left;
  margin-top: 1em;
}
.pimage.img5 {
  left: 5%;
}
.pimage.img6 {
  width: 100%;
}
.pimage.img7, .pimage.img8 {
  width: 100%;
  height: auto;
}
.mapkey table, .mapkey p {
  position: relative;
  top: 26%;
  left: 5%;
}
table {
  padding: 0;
  margin: 0;
}
table, tr, td {
  text-align: left;
  max-width: 500px;
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