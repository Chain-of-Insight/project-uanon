<template>
  <div id="uterm" class="console open">
    <div class="console-inner">
      <p class="title-bar">
        <span class="ws"></span>
        <span class="icon icon-terminal1"></span>
      </p>
      <div class="uwrapper">
        <div id="log">
          <p class="log-item" v-for="(l, i) in log" :key="i" v-html="l"></p>
        </div>
        <div class="cli-input">
          <span class="cyan">{{uni}}</span>@{{data.season[ci]}}:<span class="jaundice">~/{{i}}</span><span> $ </span>
          <input 
            type="search" 
            id="cli"
            class="input" 
            ref="cli"
            @keydown="cliP($event)"
            v-model="input"
            autocomplete="off"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Config from '../../../conf/constants';
import * as api from '../../../util/api';
import store from '../../../util/storage';
import { generateProofAsString, verifyProof } from '../../../util/hasher';

const DATA = require('./data/spring.console1.json');

export default {
  props: {
    s: String,
    d: Boolean,
    r: String,
    i: Number,
    l: Boolean,
    p: Object,
    q: Boolean,
    tx: Boolean,
    un: String
  },
  emits: ['proof', 'err'],
  data: () => ({
    a: [],
    h: {
      g: generateProofAsString, 
      v: verifyProof
    },
    ci: 0,
    do: store,
    go: false,
    fl: ['--help', '--current', '--index'],
    id: null,
    iu: false,
    ss: null,
    si: [35,25,15],
    sd: [],
    api: api,
    cmd: ['info', 'download', 'submit', 'next', 'prev', 'clear', 'help'],
    uni: null,
    out: null,
    log: [],
    open: false,
    clog: [],
    clogs: null,
    data: DATA,
    input: null
  }),
  mounted: function () {
    if (!this.un) {
      this.uni = 'observer';
    } else {
      this.uni = this.un;
    }
    // Autofocus event
    this.$refs.cli.focus();
    document.getElementById('uterm').addEventListener('click', (e) => {
      if (e.target) {
        if (e.target.id == 'uterm' || e.target.classList.contains('title-bar')) {
          this.$refs.cli.focus();
        }
      }
    });
    this.id = this.data.info[this.ci].id;
    if (this.data) {
      if (Array.isArray(this.data.season)) {
        for (let i = 0; i < this.data.season.length; i++) {
          let u = Config.DEFAULT_STORAGE_BASE + '/sounds/' + this.id + '/err' + String(i) + '.mp3';
          this.a.push(u);
        }
      }
    }
    // console.log('DATA =>', this.data);
    // console.log('this.a =>', this.a);
  },
  updated: function() {
    this.$nextTick(function () {
      if (this.iu) {
        setTimeout(() => {
          document.getElementById('cli').setSelectionRange(this.input.length, this.input.length);
        }, 1);
        this.iu = false;
      }
    });
  },
  methods: {
    /**
     * @param {Object | KeyboardEvent} e : Keypressed Event
     */
    cliP: async function (e) {
      const t = document.getElementById('uterm');
      const k = e.key.toLowerCase();
      if (k == 'arrowup') {
        if (this.clog.length) {
          if (!this.clogs) {
            this.clogs = this.clog.length - 1;
            this.input = this.clog[this.clogs];
            this.iu = true;
          } else {
            if (this.clogs > 0) {
              this.clogs -= 1;
              this.input = this.clog[this.clogs];
              this.iu = true;
            }
          }
        }
      }
      if (k == 'arrowdown') {
        if (this.clog.length) {
          if (!this.clogs) {
            this.clogs = null;
            this.input = '';
          } else {
            if (this.clogs < (this.clog.length - 1)) {
              this.clogs += 1;
              this.input = this.clog[this.clogs];
              this.iu = true;
            } else if (this.clogs == (this.clog.length - 1)) {
              this.clogs = null;
              this.input = '';
            }
          }
        }
      }
      if (k === 'enter') {
        let out = await this.cp(this.input);
        if ((this.ci + 1) < this.a.length) {
          this.ci += 1;
        } else {
          this.ci = 0;
        }
        this.log.push(out);
        this.input = '';
        this.$nextTick(() => {
          t.scrollTop = t.scrollHeight;
        });
      }
    },
    /**
     * @param {String} cmd: Command to parse
     */
    cp: async function (cmd) {
      this.log.push('<span class="cyan">' + this.uni + '</span>@' + this.data.season[this.ci] + ':<span class="jaundice">~/' + String(this.i) + '</span><span> $ </span> ' + cmd);

      // Garbage in -> Garbage out
      let resp = await this.api.request.get('/traduire'), g;
      if (resp['data']) {
        if (resp.data['statusCode']) {
          if (resp.data.statusCode == 200 && resp.data['message']) {
            g = resp.data.message;
          }
        }
      }

      // Args
      let PilgrimsProgress = (g) ? g : Config.notify.DEFAULT_CLI_ERROR; 
      let invalidMsg = '<span style="max-width:60vw;display:inline-block;margin:auto;">' + PilgrimsProgress + '</span>', can = this;

      if (cmd.substr(0, 6).toLowerCase() == "submit") {
        this.clog.push(cmd);
        let soulve = cmd.split('submit');
        let submission = soulve[1];
        if (typeof submission !== 'string') {
          return invalidMsg;
        } else if (submission.length < 1) {
          return invalidMsg;
        } else if (this.tx) {
          return "Use the graphical solver for Tezos operations";
        }
        // Verify submission
        submission = submission.trim().replace(/"/g,"");
        let v = this.make(submission);
        // fail
        if (v !== true) {
          if (this.a[this.ci]) {
            this.$emit('err', this.a[this.ci]);
          }
          return PilgrimsProgress;
        // pass
        } else {
          this.log.push(Config.notify.DEFAULT_ACCESS_KEY_ACQUIRED);
          return Config.notify.DEFAULT_VERIFICATION_SUCCESS;
        }
      }

      if (cmd.substr(0, 4).toLowerCase() == "next") {
        this.clog.push(cmd);
        if (!can.go) {
          if (!this.do.store.existsItem(this.p.secret, this.r)) {
            if (this.a[this.ci]) {
              this.$emit('err', this.a[this.ci]);
            }
            return invalidMsg;
          }
        }
        this.log.push(Config.notify.DEFAULT_NAVIGATION);
        let c = location.href, a = c.split('/'), b = a[(a.length - 1)], u;
        a[(a.length - 1)] = parseInt(b) + 1;

        if (this.l) {
          u = a.slice(0,(a.length - 1)).join('/');
          if (this.r == 'spring') {
            u = u.replace(this.r, 'discover');
          }
        } else {
          u = a.join('/');
        }
        // console.log('Route =>', [a, u, can.go]);
        return location.href = u;
      } else if (cmd.substr(0, 4).toLowerCase() == "prev") {
        this.clog.push(cmd);
        let c = location.href, a = c.split('/'), b = a[(a.length - 1)], u;
        this.log.push(Config.notify.DEFAULT_NAVIGATION);
        if (this.r == 'spring' && parseInt(b) == 1) {
          delete a[a.length - 1];
          u = a.join('/').replace(this.r, 'discover');
          return location.href = u;
        }
        a[(a.length - 1)] = parseInt(b) - 1;
        if (Number(a[(a.length - 1)]) > 0) {
          u = a.join('/');
          // console.log('Route =>', [u]);
          return location.href = u;
        } else {
          if (this.a[this.ci]) {
            this.$emit('err', this.a[this.ci]);
          }
          return invalidMsg;
        }
      } else {
        if (this.a[this.ci]) {
          this.$emit('err', this.a[this.ci]);
        }
      }
      // Cmd
      if (typeof cmd !== 'string') {
        return invalidMsg;
      } else if (cmd.substr(0, 4).toLowerCase() == "info") {
        this.clog.push(cmd);
        let infoArray = this.ig();
        if (Array.isArray(infoArray)) {
          if (infoArray.length) {
            for (let i = 0; i < infoArray.length; i++) {
              if ((i - 1) == infoArray.length) {
                return infoArray[i];
              }
              this.log.push(infoArray[i]);
            }
          } else { return invalidMsg }
        } else { return invalidMsg }
      } else if (cmd.substr(0, 3).toLowerCase() == "log") {
        return invalidMsg;
      } else if (cmd.substr(0, 8).toLowerCase() == "download") {
        this.clog.push(cmd);
        if (typeof this.p !== 'object') {
          return invalidMsg;
        } else if (!this.p['files']) {
          return invalidMsg;
        }
        let id = this.p.id;
        if (!id || typeof id !== 'string') {
          return invalidMsg;
        }
        let f = Config.DEFAULT_STORAGE_BASE + '/' + id + '/' + Config.DEFAULT_STORAGE_DOWNLOAD;
        this.download(f);
        let WARN = '';
        if (this.data) {
          if (this.data['download']) {
            if (Array.isArray(this.data.download)) {
              if (this.data.download[this.ci]) {
                WARN = this.data.download[this.ci];
              }
            }
          }
        }
        return WARN;
      } else if (cmd.substr(0, 5).toLowerCase() == "clear") {
        this.clog.push(cmd);
        this.log = [];
        return invalidMsg;
      } else if (cmd.substr(0, 4).toLowerCase() == "help") {
        this.clog.push(cmd);
        let h = this.data.info[this.ci];
        let infoArray = this.ig(h);
        if (Array.isArray(infoArray)) {
          if (infoArray.length) {
            for (let i = 0; i < infoArray.length; i++) {
              if ((i - 1) == infoArray.length) {
                return infoArray[i];
              }
              this.log.push(infoArray[i]);
            }
          } else { return invalidMsg }
        } else { return invalidMsg }
        return;
      } else {
        return invalidMsg;
      }
      // Flags
      // XXX TODO: this
    },
    ig: function (s = null) {
      let ig = [], c;
      if (!s) {
        c = this.p;
      } else {
        c = s;
      }
      if (c.title) {
        if (typeof c.title == 'object') {
          ig.push(' <span class="cyan-bg">Title:</span>                   ' + c.title.value);
          ig.push(' <span class="cyan-bg">Title<span class="jaundice">->format</span>:</span>           ' + c.title.format);
        } else {
          ig.push(' <span class="cyan-bg">Title:</span>                   ' + c.title);
        }
      }
      if (c.description) {
        if (typeof c.description == 'object') {
          ig.push(' <span class="cyan-bg">Description:</span>             ' + c.description.value);
          ig.push(' <span class="cyan-bg">Description<span class="jaundice">->format</span>:</span>     ' + c.description.format);
        } else {
          ig.push(' <span class="cyan-bg">Description:</span>             ' + c.description);
        }
      }
      if (c.secret) {
        ig.push(' <span class="cyan-bg">Public Key:</span>                ' + c.secret);
      }
      if (c.operation) {
        let o = (c.operation.mainnet == "") ? c.operation.testnet : c.operation.mainnet;
        ig.push(' <span class="cyan-bg">Operation:</span>                 ' + o);
      }
      if (c.payload) {
        if (c.payload.value) {
          ig.push(' <span class="cyan-bg">Payload:</span>                 ' + c.payload.value);
        }
        if (c.payload.format) {
          ig.push(' <span class="cyan-bg">Format:</span>                  ' + c.payload.format);
        }
      }
      if (c.format) {
        ig.push(' <span class="cyan-bg">Format:</span>                    ' + c.format);
      }
      if (c.hint) {
        ig.push(' <span class="cyan-bg">Hint:</span>                      ' + c.hint);
      }
      if (s) {
        if (this.a[this.ci]) {
          let pc = this.a[this.ci].split('/'), u = pc[pc.length - 1];
          ig.push(' <span class="cyan-bg">Attachments:</span>               ' + String(u));
        }
      }
      return ig;
    },
    /**
     * @param {String} a : Answer
     */
    make: function (a) {
      let p = this.h.g(JSON.stringify([a]), Config.DEFAULT_DEPTH), s = this.s, can = this;
      p = p.substring(2);
      const v = this.h.v(p, s, Config.DEFAULT_SIZE, Config.DEFAULT_DEPTH);
      // console.log('Proof =>', {proof: p, verified: v, secret: s});
      if (v === true) {
        // console.log('Proof Verified =>', {proof: p, verified: v, secret: s});
        // Update parent
        this.$emit('proof', p);
        can.go = true;
      }
      return v;
    },
    /**
     * @param {String} f : File URL
     */
    download: async function (f) {
      await this.api.request.download(f);
      let d = [];
      if (this.data['downloaded']) {
        if (Array.isArray(this.data.downloaded)) {
          d = this.data.downloaded;
        }
      }
      if (d[this.ci]) {
        this.log.push(d[this.ci]);
      } else {
        this.log.push(Config.notify.DEFAULT_DOWNLOAD_COMPLETE);
      }
    }
  }
}
</script>

<style scoped>
  .console {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
    width: auto;
    background-color: rgba(0,0,0,0.9);
    z-index: 1000;
  }
  .console.sm {
    min-height: 35vh;
    max-height: 35vh;
  }
  .console.x-sm {
    min-height: 25vh;
    max-height: 25vh;
  }
  .console.xx-sm {
    min-height: 15vh;
    max-height: 15vh;
  }
  .console.closed {
    display: none;
  }
  .console.open {
    display: block;
  }
  .console-inner {
    padding: 0;
  }
  .ws {
    margin-right: 2px;
  }
  .console p.title-bar {
    position: fixed;
    width: 100%;
    height: 35px;
    background-image: url('https://uanon.s3.amazonaws.com/backgrounds/4aefac88b597b312f457af4c6eb210bfeb2b614d861a9d8a380990e96c8823ab.png');
    background-repeat: repeat;
    background-color: #333;
    -moz-box-shadow: inset 0 0 10px #000000;
    -webkit-box-shadow: inset 0 0 10px #000000;
    box-shadow: inset 0 0 10px #000000;
    color: #ff7070;
    margin-bottom: 1em;
    z-index: 1000;
  }
  .close-x, .plus-s, .minus-s {
    font-size: 2em;
    margin-right: 0.5em;
    color: #ff7070;
    top: -7px;
    position: relative;
    cursor: pointer;
  }
  .plus-s.greyed, .minus-s.greyed {
    color: #ffb6c1;
    opacity: 0.5;
    cursor: not-allowed;
  }
  .icon.icon-terminal1 {
    position: relative;
    top: 7px;
  }
  .input, .input:active, .input:focus {
    background: transparent;
    border: none;
    color: #ffffff;
    outline: none;
  }
  .cli-input {
    margin-left: 0.25em;
    margin-bottom: 0.25em;
  }
  .log-item {
    margin: 0;
    margin-left: 0.25em;
  }
  .uwrapper {
    position: relative;
    top: 40px;
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
  }
  .helper-bar:hover {
    box-shadow: 0 0 5px 10px rgba(230,0,115,0.3);
    text-shadow: 0 0 20px #eee, 0 0 30px #eee, 0 0 40px #ff7070, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff7070;
  }
</style>