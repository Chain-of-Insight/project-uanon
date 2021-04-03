<template>
  <div class="mailer">
    <div class="title-bar e-bar"></div>
    <div class="sjt-bar es-bar"></div>
    <div class="e-body">
      <div class="row">
        <div class="col-4 info">
          <div class="wr">
            <h4 class="inbox">Inbox</h4>
            <div class="inbox-list" v-if="inbox.length">
              <span class="info" v-if="inbox[0].subject && inbox[0].from">
                <div>
                  <div class="subject-s bold italic" v-html="inbox[0].subject"></div>
                </div>
                <div>
                  <span class="italic">{{inbox[0].from}}</span>  
                </div>
              </span>
            </div>
          </div>
        </div>
        <div class="col-8 active-mail">
          <div class="a-mail" v-if="s">
            <div class="subject" v-if="s.subject">
              <span class="bold italic">Subject:</span>
              <div class="subject-s sjt-s-t bold italic" v-html="s.subject"></div>
            </div>
            <div class="from" v-if="s.from">
              <span class="bold italic">From: {{s.from}}</span>
            </div>
            <div class="to" v-if="s.to">
              <span class="bold italic">To: {{s.to}}</span>
            </div>
            <div class="body" v-if="s.body" v-html="s.body"></div>
            <div class="reply" v-if="s.id == 0">
              <h4 class="bold italic">Reply:</h4>
              <div>
                <textarea 
                  id="repl"
                  class="input-reply form-control"
                  ref="inp"
                  v-model="input"
                  @keyup="inP($event);"
                  @paste="deny();"
                ></textarea>
              </div>
              <div class="messenger" v-if="msg.type && msg.value" data="O5SSA23FMVYCA2LUEAYTAMA=">
                <p class="error-msg danger bg-danger" v-if="msg.type == 'error'">{{msg.value}}<span class="float-right close-x" @click="msg={type:null,value:null};input=null;i=0;">&times;</span></p>
                <div class="success-msg success bg-success" v-if="msg.type == 'success'">
                  <span class="float-right close-x" @click="msg={type:null,value:null};input=null;i=0;">&times;</span>
                  <div v-html="msg.value"></div>
                </div>
              </div>
              <div>
                <button class="btn btn-primary" @click="send();" :disabled="!input">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as Config from '../../../conf/constants';
  import store from '../../../util/storage';
  import * as aes from '../../../util/cipher/aes';

  const R = 'spring', N = 5;

  export default {
    props: {
      e: Object   // Email 
    },
    data: () => ({
      a: false,
      d: [],
      i: 0,
      l: null,
      m: null,
      p: null,
      s: null,
      do: store,
      msg: {
        type: null,
        value: null
      },
      AES: aes.default.AES,
      str: {},
      input: null,
      reply: null,
      inbox: [],
      proof: null,
      sent: []
    }),
    mounted: async function () {
      this.str = this.do.store.get();
      this.s = this.e;
      this.inbox.unshift(this.s);
      if (this.e) {
        if (this.e['payload']) {
          this.p = this.e.payload;
        }
      }
      if (this.str[R]) {
        let str = this.str[R];
        if (typeof str[N-1] == 'object') {
          if (str[N-1]['proof']) {
            this.proof = str[N-1].proof;
          }
        }
        // XXX: [#WWG0WGN] Decoding these not helpful unless u r shamelessly cribbing
        const l = `75f10a9d5b9d64c9cc92a1b853438cbf8a686cf9163ba9bf54d155c5579b28cf023e2200fe4556435027141243c9d6354a13e03b80b8794c05c7e66e4f531368ea9e076c717d1e1e99d96250842d8cbb`;
        const m = `58e382f2f77dab3c4275effbf4b7cc38523d0878155be11b43b5b9720fd4d793ca94384b30486b175b1debc21a9ece8d29d0363200449745ddcd9e1a3ef7e08450ea64d6110835782bef42f770316d357367f7d524041a315534fac029f374473a44b0ee347f99f0fd35ea185bca93a80e263487f0dcd6b4e7c53d69d46c68c528a6ea8890882b1e62e9598be01eda4008e5f9208d5c829596e942cdd4ba495a75d9866bf20cc823299c01f91cd0060d`;
        // XXX: End;
        try {
          this.l = this.AES.decrypt('cbc', l, this.proof);
          this.m = this.AES.decrypt('cbc', m, this.proof);
        } catch(e) {
          console.warn(e);
        }
      }
    },
    methods: {
      /**
       * Pro-Tip: You'll want to figure out what this does.
       * @param {Object | Event} e : KeyUp
       */
      inP: function (e) {
        if (!this.l || !this.m) {
          return;
        }
        const no = ['shift','home','insert','enter','control','meta','space','backspace','delete','pageup','pageup','pagedown','end','`','~'];
        let xl = new Function('return ' + this.l)(), xm = new Function('return ' + this.m)(), k = e.key.toLowerCase();
        let s = xl();
        if (no.indexOf(k) < 0) {
          let i = xm(k), o = this.input.split('');
          let j = s[this.i] + i;
          j = j.toString(16);
          if (String(j).length == 1) {
            j = String(0) + String(j);
          }
          o[(o.length-1)] = j;
          this.input = o.join('');
          if ((this.i+1) == s.length) {
            this.i = 0;
          } else {
            this.i += 1;
          }
        }
      },
      deny: function () {
        let d = document.getElementById('repl');
        d.value = null;
      },
      send: function () {
        if (!this.input) {
          return;
        }
        if (!this.input.length) {
          return;
        }
        this.msg = {type: null, value: null};
        // Verify submission
        let submission = this.input.trim().replace(/"/g,"");
        let v = this.make(submission);
        if (v !== true) {
          this.msg = {type: 'error', value: Config.notify.DEFAULT_VERIFICATION_FAIL};
        // pass
        } else {
          this.msg = {type: 'success', value: '<p>Correct calculation!</p><p>Use the console to submit the pre-transmogrified value to the Prover.</p>'};
        }
        // console.log("Looking for this?", N);
      },
      /**
       * @param {String} a : Answer
       */
      make: function (a) {
        return a == this.p;
      },
    }
  }
</script>

<style scoped>
.mailer {
  background: linear-gradient(to right, rgb(64, 224, 208), rgb(255, 140, 0), rgb(255, 0, 128));
  padding: 2em;
  border-radius: 0 0 1em 1em;
  animation: mythos ease 160s;
  -webkit-animation: mythos ease 160s;
  -moz-animation: mythos ease 160s;
  -o-animation: mythos ease 160s;
  -ms-animation: mythos ease 160s;
  animation-iteration-count: infinite;
}
.inbox-list {
  background-color: #eee;
  padding: 2em;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
}
.bold {
  font-weight: bold;
}
.italic {
  font-style: italic;
}
.body {
  margin-top: 2em;
  margin-bottom: 2em;
}
.reply div {
  margin-bottom: 1.25rem;
}
.dial {
  margin-top: 1em;
  margin-bottom: 1em;
}
.messenger {
  filter: hue-rotate(0deg) !important;
}
.error-msg,
.success-msg {
  padding: 1em;
  color: #ffffff;
  border-radius: 5px;
}
.sjt-s-t {
  display: inline;
  margin-left: 10px;
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