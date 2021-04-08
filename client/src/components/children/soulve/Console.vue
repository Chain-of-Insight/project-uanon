<template>
  <div id="uterm" class="console" :class="{'open': open, 'closed': !open, 'sm': (ss == 35), 'x-sm': (ss == 25), 'xx-sm': (ss == 15)}">
    <div class="console-inner">
      <p class="title-bar">
        <span class="ws"></span>
        <span class="icon icon-terminal1"></span>
        <span class="float-right close-x" @click="close();">&times;</span>
        <span class="float-right plus-s" @click="plusS();" v-if="ss">&#43;</span>
        <span class="float-right plus-s greyed" v-if="!ss">&#43;</span>
        <span class="float-right minus-s" @click="minusS();" v-if="ss !== 15">&#8722;</span>
        <span class="float-right minus-s greyed" v-if="ss == 15">&#8722;</span>
      </p>
      <div class="uwrapper">
        <div id="log">
          <p class="log-item" v-for="(l, i) in log" :key="i" v-html="l"></p>
        </div>
        <div class="cli-input">
          <span class="cyan">{{uni}}</span>@{{r}}:<span class="jaundice">~/{{i}}</span><span> $ </span>
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
  <div class="open-c helper" v-if="!open">
    <div class="open-c inner" v-if="!q">
      <p class="helper-bar float-right" @click="toggle();">
        <span class="icon icon-terminal2"></span>
      </p>
    </div>
  </div>
</template>

<script>
import * as Config from '../../../conf/constants';
import * as api from '../../../util/api';
import store from '../../../util/storage';
import { generateProofAsString, verifyProof } from '../../../util/hasher';

export default {
  props: {
    s: String,
    d: Boolean,
    r: String,
    i: Number,
    l: Boolean,
    p: Object,
    q: Boolean,
    dl: Boolean,
    tx: Boolean,
    un: String
  },
  emits: ['proof', 'copen'],
  data: () => ({
    h: {
      g: generateProofAsString, 
      v: verifyProof
    },
    do: store,
    go: false,
    fl: ['--help', '--current', '--index'],
    iu: false,
    ss: null,
    si: [35,25,15],
    api: api,
    cmd: ['info', 'download', 'submit', 'next', 'prev', 'clear', 'help'],
    uni: null,
    out: null,
    log: [],
    open: false,
    clog: [],
    clogs: null,
    input: null
  }),
  mounted: function () {
    if (!this.un) {
      this.uni = 'observer';
    } else {
      this.uni = this.un;
    }
    // Listen for console display
    document.onkeypress = (e) => {
      e = e || window.event;
      const k = e.key;
      if (k === '`' || k === '~') {
        return this.toggle();
      }
    };
    // Autofocus event
    document.getElementById('uterm').addEventListener('click', (e) => {
      if (e.target) {
        if (e.target.id == 'uterm' || e.target.classList.contains('title-bar')) {
          this.$refs.cli.focus();
        }
      }
    });
    // Console size
    this.ss = this.do.store.console();
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
    toggle: function () {
      this.open = !this.open;
      this.$emit('copen', this.open);
      if (this.open) {
        setTimeout(() => {
          this.input = null;
          this.$refs.cli.focus();
        }, 0);
      }
    },
    plusS: function () {
      if (this.ss) {
        let i = this.si.indexOf(this.ss);
        if ((i-1) >= 0) {
          this.ss = this.si[i-1];
          this.do.store.consoleSize((i-1));
        } else if (i == 0) {
          this.ss = null;
          this.do.store.consoleSize(null, true);
        }
      }
      // console.log('plus', [this.ss, this.si]);
    },
    minusS: function () {
      if (!this.ss) {
        this.ss = this.si[0];
        this.do.store.consoleSize(0);
      } else {
        let i = this.si.indexOf(this.ss);
        if ((i+1) < this.si.length) {
          this.ss = this.si[i+1];
          this.do.store.consoleSize((i+1));
        }
      }
      // console.log('minus', [this.ss, this.si]);
    },
    close: function () {
      this.open = false;
      this.$emit('copen', this.open);
    },
    /**
     * @param {Object | KeyboardEvent} e : Keypressed Event
     */
    cliP: function (e) {
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
        this.log.push(this.cp(this.input));
        this.input = '';
        this.$nextTick(() => {
          t.scrollTop = t.scrollHeight;
        });
      }
    },
    /**
     * @param {String} cmd: Command to parse
     */
    cp: function (cmd) {
      this.log.push('<span class="cyan">' + this.uni + '</span>@' + this.r + ':<span class="jaundice">~/' + String(this.i) + '</span><span> $ </span> ' + cmd);
      let invalidMsg = Config.notify.DEFAULT_CLI_ERROR, can = this;
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
        this.clog.push(cmd);
        let st = this.do.store.get();
        let deployed = Config.deployed;
        if (Array.isArray(deployed)) {
          for (let i = 0; i < deployed.length; i++) {
            if (st[deployed[i]]) {
              for (let j = 0; j < st[deployed[i]].length; j++) {
                if (st[deployed[i]][j].template) {
                  delete st[deployed[i]][j].template;
                }
                for (const prop in st[deployed[i]][j]) {
                  if (!st[deployed[i]][j][prop]) {
                    delete st[deployed[i]][j][prop];
                  }
                }
              }
            }
          }
        }
        this.log.push(Config.notify.DEFAULT_LOG_GEN);
        return '<pre class="log cyan">' + JSON.stringify(st, null, 2) + '</pre>';
      } else if (cmd.substr(0, 8).toLowerCase() == "download") {
        this.clog.push(cmd);
        if (typeof this.p !== 'object') {
          return invalidMsg;
        } else if (!this.p['files']) {
          return invalidMsg;
        } else if (this.dl === true) {
          return invalidMsg;
        }
        let id = this.p.id;
        if (!id || typeof id !== 'string') {
          return invalidMsg;
        }
        let f = Config.DEFAULT_STORAGE_BASE + '/' + id + '/' + Config.DEFAULT_STORAGE_DOWNLOAD;
        this.download(f);
        return Config.notify.DEFAULT_NAVIGATION;
      } else if (cmd.substr(0, 6).toLowerCase() == "submit") {
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
          return Config.notify.DEFAULT_VERIFICATION_FAIL;
        // pass
        } else {
          this.log.push(Config.notify.DEFAULT_ACCESS_KEY_ACQUIRED);
          return Config.notify.DEFAULT_VERIFICATION_SUCCESS;
        }
      } else if (cmd.substr(0, 5).toLowerCase() == "clear") {
        this.clog.push(cmd);
        this.log = [];
      } else if (cmd.substr(0, 4).toLowerCase() == "next") {
        this.clog.push(cmd);
        if (!can.go && location.href.indexOf('rites-of-spring') == -1) {
          if (!this.do.store.existsItem(this.p.secret, this.r)) {
            return Config.notify.DEFAULT_NO_ACCESS;
          }
        }
        this.log.push(Config.notify.DEFAULT_NAVIGATION);
        let c = location.href, a = c.split('/'), b = a[(a.length - 1)], u;
        a[(a.length - 1)] = parseInt(b) + 1;

        if (b == "rites-of-spring") {
          u = c.replace('spring/rites-of-spring', 'discover');
          return location.href = u;
        }

        if (a[(a.length - 2)] == 'discover' || b == 'discover') {
          u = c.replace('discover', this.r + '/1');
          return location.href = u;
        }

        if (this.l) {
          u = a.slice(0,(a.length - 1)).join('/');
          if (this.r == 'tutorial') {
            u = u.replace(this.r, 'learn');
          } else if (this.r == 'spring') {
            u += '/rites-of-spring';
          }
        } else {
          u = a.join('/');
        }
        // console.log('Route =>', [u, can.go]);
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
        if (b == "rites-of-spring") {
          u = c.replace('rites-of-spring', '8');
          return location.href = u;
        }
        a[(a.length - 1)] = parseInt(b) - 1;
        if (Number(a[(a.length - 1)]) > 0) {
          u = a.join('/');
          // console.log('Route =>', [u]);
          return location.href = u;
        } else {
          return invalidMsg;
        }
      } else if (cmd.substr(0, 4).toLowerCase() == "help") {
        this.clog.push(cmd);
        let h = `
        <br/>
        <p class="jaundice">CLI: command --{option} [args]</p>
        <span class="cyan">info : </span><span class="cyan-bg">--index={Number}</span>, <span class="cyan-bg">--current (default = current)</span> : <span style="font-style:italic;">Get information about a specific puzzle</span><br/>
        <span class="cyan">submit : </span><span class="cyan-bg">--index={Number}</span>, <span class="cyan-bg">--current (default = current)</span> : <span class="blood">[String] </span><span style="font-style:italic;">Solve a puzzle</span><br/>
        <span class="cyan">log : </span><span class="cyan-bg">--index={Number}</span>, <span class="cyan-bg">--realm={String}</span>, <span class="cyan-bg">--all (default = all)</span> : <span style="font-style:italic;">View entire history or history of a particular puzzle or season</span><br/>
        <span class="cyan">download : </span><span style="font-style:italic;">Download puzzle assets (if available)</span><br/>
        <span class="cyan">next : </span><span style="font-style:italic;">Go to next puzzle</span><br/>
        <span class="cyan">prev : </span><span style="font-style:italic;">Go to previous puzzle</span><br/>
        <span class="cyan">clear : </span><span style="font-style:italic;">Clear this terminal</span><br/>
        <span class="cyan">help : </span><span style="font-style:italic;">Show this help message</span><br/>
        <br/>
        <p class="blood">*WARNING: --{option} flags are currently disabled</p>
        `
        return h;
      } else {
        return invalidMsg;
      }
      // Flags
      // XXX TODO: this
    },
    ig: function () {
      let ig = [];
      if (this.p.title) {
        if (typeof this.p.title == 'object') {
          ig.push(' <span class="cyan-bg">Title:</span>                   ' + this.p.title.value);
          ig.push(' <span class="cyan-bg">Title<span class="jaundice">->format</span>:</span>           ' + this.p.title.format);
        } else {
          ig.push(' <span class="cyan-bg">Title:</span>                   ' + this.p.title);
        }
      }
      if (this.p.description) {
        if (typeof this.p.description == 'object') {
          ig.push(' <span class="cyan-bg">Description:</span>             ' + this.p.description.value);
          ig.push(' <span class="cyan-bg">Description<span class="jaundice">->format</span>:</span>     ' + this.p.description.format);
        } else {
          ig.push(' <span class="cyan-bg">Description:</span>             ' + this.p.description);
        }
      }
      if (this.p.secret) {
        ig.push(' <span class="cyan-bg">Public Key:</span>                ' + this.p.secret);
      }
      if (this.p.operation) {
        let o = (this.p.operation.mainnet == "") ? this.p.operation.testnet : this.p.operation.mainnet;
        ig.push(' <span class="cyan-bg">Operation:</span>                 ' + o);
      }
      if (this.p.payload) {
        if (this.p.payload.value) {
          ig.push(' <span class="cyan-bg">Payload:</span>                 ' + this.p.payload.value);
        }
        if (this.p.payload.format) {
          if (this.r == "spring" && this.i == 6) {
            let arr = [
              '<span class="cyan-bg">Format:</span> Each person, 1st input - ' + this.p.payload.format.person1.input1,
              '<span class="cyan-bg">Format:</span> Each person, 2nd input - ' + this.p.payload.format.person1.input2,
              '<span class="cyan-bg">Format:</span> Each person, 3rd input - ' + this.p.payload.format.person1.input3,
              '<span class="cyan-bg">Format:</span> Each person, 4th input - ' + this.p.payload.format.person1.input4,
              '<span class="cyan-bg">Format:</span> Each person, 5th input - ' + this.p.payload.format.person1.input5,
            ];
            for (let i = 0; i < arr.length; i++) {
              ig.push(arr[i]);
            }
          } else {
            ig.push(' <span class="cyan-bg">Format:</span>                  ' + this.p.payload.format);
          }
        }
      }
      if (this.p.format) {
        ig.push(' <span class="cyan-bg">Format:</span>                    ' + this.p.format);
      }
      if (this.r == 'spring+' && this.p.morals) {
        if (Array.isArray(this.p.morals)) {
          if (this.p.morals.length) {
            ig.push(' <span class="cyan-bg">Fear<span class="jaundice">->format</span>:</span>                      ' + this.p.morals[0].format);
          }
        }
      }
      if (this.p.hint) {
        if (Array.isArray(this.p.hint)) {
          for (let i = 0; i < this.p.hint.length; i++) {
            ig.push(' <span class="cyan-bg">Hint ' + (i+1) + ':</span>                      ' + this.p.hint[i]);
          }
        } else {
          ig.push(' <span class="cyan-bg">Hint:</span>                      ' + this.p.hint);
        }
      }
      if (this.dl !== true) {
        if (this.p.files) {
          if (Array.isArray(this.p.files)) {
            for (let i = 0; i < this.p.files.length; i++) {
              ig.push(' <span class="cyan-bg">Attachment ' + (i+1) + ':</span>               ' + String(this.p.files[i]));
            }
          } else {
            ig.push(' <span class="cyan-bg">Attachments:</span>               ' + String(this.p.files));
          }
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
      this.log.push(Config.notify.DEFAULT_DOWNLOAD_COMPLETE);
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
    min-height: 55vh;
    max-height: 55vh;
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