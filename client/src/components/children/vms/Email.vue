<template>
  <div class="mailer" :class="b">
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
                  <span class="bold italic">{{inbox[0].subject}}</span>
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
              <span class="bold italic">Subject: {{s.subject}}</span>
            </div>
            <div class="from" v-if="s.from">
              <span class="bold italic">From: {{s.from}}</span>
            </div>
            <div class="to" v-if="s.to">
              <span class="bold italic">To: {{s.to}}</span>
            </div>
            <div class="body" v-if="s.body" v-html="s.body"></div>
            <div v-if="b == 'horror'" class="reply reply-h">
              <textarea class="william-ii form-control" rows="6" cols="1" v-model="reply"></textarea>
              <button class="btn btn-primary submit-h" @click="despair();">Submit</button>
            </div>
            <div class="messenger" v-if="msg.type && msg.value">
              <p class="error-msg danger bg-danger" v-if="msg.type == 'error'">{{msg.value}}<span class="float-right close-x" @click="msg={type:null,value:null};reply=null;">&times;</span></p>
              <div class="success-msg success bg-success" v-if="msg.type == 'success'">
                <span class="float-right close-x" @click="msg={type:null,value:null};input=null;i=0;">&times;</span>
                <div v-html="msg.value"></div>
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
  import { generateProofAsString, verifyProof } from '../../../util/hasher';

  export default {
    props: {
      b: String,
      e: Object   // Email 
    },
    data: () => ({
      a: false,
      d: [],
      h: {
        g: generateProofAsString, 
        v: verifyProof
      },
      s: null,
      it: 0,
      msg: {
        type: null,
        value: null
      },
      input: null,
      output: null,
      inbox: [],
      reply: null,
      sent: []
    }),
    mounted: async function () {
      this.s = this.e;
      this.inbox.unshift(this.s);
    },
    methods: {
      send: function () {
        if (!this.input) {
          return;
        }
        if (!this.input.length) {
          return;
        }
        this.msg = {type: null, value: null};
        let submission = this.input.trim().replace(/"/g,"");
        let v = this.make(submission);
        if (v !== true) {
          this.msg = {type: 'error', value: Config.notify.DEFAULT_VERIFICATION_FAIL};
        // pass
        } else {
        // fail
          this.msg = {type: 'success', value: Config.notify.DEFAULT_VERIFICATION_SUCCESS };
        }
      },
      despair: function () {
        if (!this.e['reply']) {
          this.msg = {type: 'error', value: Config.notify.DEFAULT_VERIFICATION_FAIL};
          return;
        }
        let r = this.reply.split("\n");
        let s = (this.e.reply) ? this.e.reply['payload'] : null;
        for (let i = 0; i < r.length; i++) {
          r[i] = r[i].replace(/[^\w\s]|_/g, "").replace(/\s+/g, "").toUpperCase()
        }
        if (!s) {
          this.msg = {type: 'error', value: Config.notify.DEFAULT_VERIFICATION_FAIL};
          return;
        } else {
          s = s.split("(Public Key): ");
          if (s.length == 2) {
            s = s[1];
          } else {
            this.msg = {type: 'error', value: Config.notify.DEFAULT_VERIFICATION_FAIL};
            return;
          }
        }
        this.msg = {type: null, value: null};
        let v = this.make(r, s);
        if (v !== true) {
        // fail
          this.msg = {type: 'error', value: Config.notify.DEFAULT_VERIFICATION_FAIL};
        // pass
        } else {
          this.msg = {type: 'success', value: "Verification succeeded. Use proof " + this.output + " to reveal the horror show."};
        }
      },
      /**
       * @param {String} a : Answer
       */
      make: function (a,b = null) {
        let c;
        if (!b)  {
          c = [a]
        } else {
          c = a;
        }
        let p = this.h.g(JSON.stringify(c), Config.DEFAULT_DEPTH), s = (!b) ? this.s : b;
        p = p.substring(2);
        const v = this.h.v(p, s, Config.DEFAULT_SIZE, Config.DEFAULT_DEPTH);
        if (v == true) {
          this.output = p;
        }
        return v;
      },
    }
  }
</script>

<style scoped>
.mailer:not(.horror) {
  background: linear-gradient(to right, rgb(64, 224, 208), rgb(255, 140, 0), rgb(255, 0, 128));
  animation: mythos ease 160s;
  -webkit-animation: mythos ease 160s;
  -moz-animation: mythos ease 160s;
  -o-animation: mythos ease 160s;
  -ms-animation: mythos ease 160s;
  animation-iteration-count: infinite;
}
.mailer.horror {
  background: #ff7070;
}
.mailer {
  padding: 2em;
  border-radius: 0 0 1em 1em;
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
.dial, .submit-h {
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