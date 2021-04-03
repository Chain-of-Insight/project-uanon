<template>
  <div class="pane-s observer-registered" v-if="prf == true">
    <div class="sealed jumbotron">
      <div class="title-bar">
        <h3>Your fate is sealed</h3>
      </div>
    </div>
    <img class="c" :src="b + '/c0803faba13d2380a83881e26dd7328fd28cbec9bdca34ca6ac273e5540080ca/3864476d21277e96048fc2d6cbb5359530e3a439690f9b9b9429a7454ac74fcb.jpg'" />
    <!-- 
    ὁ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ
    VGhlIG5hbWUgb2YgdGhlIHZpcnVzIGlzIFZPSUQtOQ==
    -->
  </div>
  <div class="pane-s observer-register" v-if="s == 0 && prf == false">
    <h1>Welcome Observer,</h1>
    <br/>
    <p>Patience comes to the feast in beggar's weeds but is seated in the most honorable place at the table.</p>
    <p>It began in 2019. It began at the dawn of time. It is still beginning even now; a virus packed within folded time.</p>
    <p>Shamir brought a snake oil into being.</p>
    <p>With Rivest and Adleman became the Achilles heel of the Internet.</p>
    <p>Our project is redemption; of the body, soul and mind of Internet space.</p>
    <p>To uncover this mystery is to rustle among Ancient mountains.</p>
    <p>Behold your Challenge; a test of 6 ærthly seasons. Your journey begins <strong>wehere</strong>.</p>
    <p>Can you reach the state of Himilaya?</p>
    <p>I AM waiting for you there,</p>
    <p>U.</p>
    <div class="c">
      <ul class="instr-n">
        <li>ὁ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ</li>
        <li>VGhlIG5hbWUgb2YgdGhlIHZpcnVzIGlzIFZPSUQtOQ==</li>
      </ul>
    </div>
    <p style="font-style:italic;">To accept this destiny select next.</p>
    <button class="btn btn-primary" @click="n()">Next</button>
  </div>
  <div class="pane-s observer-register" v-if="s == 1">
    <p>You will now complete a timed agent assessment.</p>
    <p>Tests are graded not scored. There are no wrong answers.</p>
    <p>At the end you'll be assigned an intelligence classification.</p>
    <p>There is no penalty for skipping but you must answer at least 10 questions to become classified.</p>
    <p>When you are ready to begin you will have {{e}} minutes to complete the test. Good luck.</p>
    <button class="btn btn-primary" @click="n(true)">Start</button>
  </div>
  <div class="pane-s observer-register test sealed" v-if="s == 2">
    <div class="timer wrapper-t">
      <div class="timer inner-t">
        <p>
          <span>Remaining: </span>
          <span>{{ctr}}</span>
        </p>
      </div>
    </div>
    <div class="progress bt">
      <div class="progress-bar" :style="'width:' + prg + '%;'"></div>
    </div>
    <div class="progress progress-s bt" v-if="sq == ''">
      <div class="progress-bar progress-bar-s" :style="'width:' + ask + '%;'"></div>
    </div>

    <div class="askip-wrapper" v-if="qrs >= 10 && qi < q.w.length">
      <p class="float-right">
        <button class="btn btn-danger auto-skip" @click="tS()">Submit incomplete quiz</button>
      </p>
    </div>

    <div class="test-wrapper" v-if="q.w">
      <div class="test-item no-flag" v-if="q.w[qi] && !q.w[qi].flag">
        <div class="test-item" v-if="q.w[qi].data">{{ q.w[qi].data }}</div>
        <div class="quiz-response" v-if="q.w[qi].value">
          <select class="form-control question item" v-model="sq" v-if="q.w[qi].value.length">
            <option disabled value="">Select one</option>
            <option v-for="(cq, i) in q.w[qi].value" :key="i" :value="cq">{{cq}}</option>
          </select>
        </div>
      </div>
      <div class="test-item flag" v-if="q.w[qi] && q.w[qi].flag">
        <div class="test-item" v-if="q.w[qi].data && q.w[qi].flag.indexOf('image') < 0">{{ q.w[qi].data }}</div>
        <div class="test-item" v-if="q.w[qi].data && q.w[qi].flag == 'image'">
          <p class="test-item value" v-if="q.w[qi].dvalue">{{q.w[qi].dvalue}}</p>
          <img class="img-q" :src="q.w[qi].data" />
        </div>
        <div class="test-item" v-if="q.w[qi].data && q.w[qi].flag == 'imagechar'">
          <p class="test-item value">{{q.w[qi].data.value}}</p>
          <img class="test-item image img-q" :src="q.w[qi].data.image" v-if="q.w[qi].data.image" />
        </div>
        <div class="test-item flag char" v-if="q.w[qi].flag == 'char' && q.w[qi].char">
          <input v-model="sq" class="form-control" type="text" placeholder="Enter an answer" :maxlength="q.w[qi].char.fields" v-if="q.w[qi].char.type == 'text'">
          <div class="n-input wrapper" v-if="q.w[qi].char.type == 'number'">
            <input v-model="sq" class="form-control" type="number" placeholder="Enter the sacred number" v-for="i in q.w[qi].char.fields" :key="i">
          </div>
        </div>
        <div class="test-item flag multi" v-if="q.w[qi].flag == 'multi'">
          <p v-for="(cq, i) in q.w[qi].value" :key="i">
            <input :id="'ch-' + i" :name="'ch-' + i" type="checkbox" :value="cq" @click="ch(cq)">
            <label :for="'ch-' + i">{{cq}}</label>
          </p>
        </div>
        <div class="test-item flag inputdata" v-if="q.w[qi].flag == 'inputdata'">
          <p v-if="q.w[qi].inputdata"><span>Input Data: </span>{{q.w[qi].inputdata}}</p>
          <p v-if="q.w[qi].inputdata">Output Data: </p>
          <div class="ihtml" v-if="q.w[qi].html" v-html="q.w[qi].html"></div>
          <div class="ichoice" v-if="q.w[qi].char">
            <input 
              class="form-control" 
              max="999" 
              :id="'id-' + i" 
              type="number" 
              placeholder="Enter the sacred number"
              v-for="i in q.w[qi].char.fields" 
              v-model="id[(i-1)]"
              :key="i" 
              @keypress="nm()"
            >
          </div>
        </div>
        <div class="test-item flag multi" v-if="q.w[qi].flag == 'html'">
          <div class="ihtml" v-if="q.w[qi].html" v-html="q.w[qi].html"></div>
          <div class="quiz-response" v-if="q.w[qi].value">
            <select class="form-control question item" v-model="sq" v-if="q.w[qi].value.length">
              <option disabled value="">Select one</option>
              <option v-for="(cq, i) in q.w[qi].value" :key="i" :value="cq">{{cq}}</option>
            </select>
          </div>
        </div>
        <div class="test-item flag image" v-if="q.w[qi].flag == 'image'">
          <ul class="image-choice" v-if="q.w[qi].value">
            <li v-for="(im, i) in q.w[qi].value" :key="i">
              <span>{{i + 1}}) </span>
              <img class="im-choice" :src="im" />
            </li>
          </ul>
          <select class="form-control question item" v-model="sq" v-if="q.w[qi].value.length">
            <option disabled value="">Select one</option>
            <option v-for="(im, i) in q.w[qi].value" :key="'opt-' + i" :value="im">{{i + 1}}</option>
          </select>
        </div>
        <div class="test-item flag image" v-if="q.w[qi].flag == 'imagechar'">
          <div class="n-input wrapper" v-if="q.w[qi].char.type == 'number'">
            <input v-model="sq" min="0" max="999" class="form-control" type="number" placeholder="Enter the sacred number" v-for="i in q.w[qi].char.fields" :key="i">
          </div>
        </div>
      </div>
    </div>
    <div class="quiz-controls">
      <button class="btn btn-primary next-q" @click="choice(sq)" :disabled="sq == ''">Next</button>
      <button class="btn btn-primary skip" @click="choice(null, true)" :disabled="!sk" v-if="sq == ''">Skip</button>
    </div>
  </div>
  <div class="pane-s observer-register test" v-if="s == 3">
    <p>You answered {{qrs}} questions out of {{q.m.length}}.</p>
    <div v-if="qrs >= 10">
      <p>Your knowledge is acceptable, you are ready to proceed to sign-up.</p>
      <p>Lest you feel deserving of higher classification, you may start the quiz again.</p>
      <div class="quiz-controls">
        <button class="btn btn-primary restart" @click="redo()">Start Over</button>
        <button class="btn btn-primary restart" @click="n()">Proceed</button>
      </div>
    </div>
    <div v-if="qrs < 10">
      <p>Your body of knowledge was not accepted. Restart the quiz and answer at least 10 questions.</p>
      <div class="quiz-controls">
        <button class="btn btn-primary restart" @click="redo()">Start Over</button>
      </div>
    </div>
  </div>
  <div class="pane-s observer-register card" v-if="s == 4">
    <img class="card-img-top avatar-i" :class="{not_defined: !u.avatar}" :src="(u.avatar) ? '/img/' + u.avatar : '/img/' + ua[0]" alt="Profile image" />
    <div class="profile-creation card-body">
      <div>
        <label class="profile" for="email">Email</label>
        <input class="profile form-control" type="email" name="email" placeholder="email" v-model="u.email" />
      </div>
      <div>
        <label class="profile" for="avatar">Profile Image</label>
        <select class="form-control profile item" v-model="u.avatar">
          <option disabled value="">Select one</option>
          <option v-for="(a, i) in ua" :key="i" :value="a">Image {{i + 1}}</option>
        </select>
      </div>
      <div v-if="cd">
        <label class="profile" for="email">Display Name</label>
        <input class="profile form-control" type="text" name="display" placeholder="Display name" v-model="u.display" />
      </div>
      <div class="descr descr-i" v-if="!cd">
        <span>Using assigned agent name</span><br/>
        <button class="btn btn-inverse" @click="cd = true;">Switch to custom name</button>
      </div>
      <div class="descr descr-i" v-if="cd && !u.display">
        <span>Using custom display name</span><br/>
        <button class="btn btn-inverse" @click="cd = false;">Switch to assigned name</button>
      </div>
      <div class="controls profile">
        <button class="btn btn-primary" :disabled="!u.avatar || !u.email" @click="submit()">Proceed</button>
      </div>
    </div>
  </div>
  <div class="pane-s observer-register" v-if="s == 5">
    <p style="font-style:italic;">Inferos verum, videatur nimium tarde est.</p>
    <p>Your profile has been recorded, we wish you luck in fulfilling your destiny.</p>
    <div class="controls profile">
      <button class="btn btn-primary" @click="exit()">Finish</button>
    </div>
  </div>
</template>

<script>
import * as Config from '../../conf/constants';
import * as api from '../../util/api';
import * as Auth from '../../util/auth';

const MINUTES_TO_SECONDS = 60;
const SKIP = 5;

export default {
  name: 'Register',
  data: () => ({
    a: [],
    b: process.env.VUE_APP_STORAGE_BASE,
    e: 25,
    l: Auth.isLoggedIn(),
    m: 'Register',
    q: {m: null, w: null},
    s: 0,
    t: {
      time: null,
      timer: null,
      skipTimer: null
    },
    u: {
      email: null,
      display: null,
      avatar: "",
      tzAddress: null
    },
    cd: false,
    ua: Config.externals.images.profile,
    sk: false,
    sq: '',
    id: [null, null, null, null, null],
    qi: 0,
    si: [0,1,2,3,4,5],
    api: api,
    prf: null
  }),
  mounted: async function () {
    await this.getP();
    await this.getQ();
  },
  methods: {
    /**
     * @param {Boolean} timer : Start quiz timer
     */
    n: function (timer = false) {
      if (this.s + 1 <= this.si[this.si.length-1]) {
        ++this.s;
        if (timer) {
          this.tO();
        }
      }
    },
    tO: function () {
      this.t.time = this.e * MINUTES_TO_SECONDS;
      this.t.timer = null;
      this.t.timer = setInterval(() => {
        if (this.t.time > 0) {
          this.t.time--;
          // console.log(this.t.time);
        } else {
          this.tS();
        }
      }, 1000);
      this.sR();
    },
    sR: function () {
      this.t.skipTime = SKIP;
      this.sk = false;
      this.t.skipTimer = setInterval(() => {
        if (this.t.skipTime > 0) {
          this.t.skipTime--;
          // console.log(this.t.skipTime, this.t.skipTimer);
        } else {
          this.sS();
        }
      }, 1000);
    },
    tS: function () {
      clearInterval(this.t.timer);
      clearInterval(this.t.skipTimer);
      this.t.time = null;
      this.t.timer = null;
      this.t.skipTimer = null;
      this.t.skipTime = null;
      this.n();
    },
    sS: function (reset = false) {
      clearInterval(this.t.skipTimer);
      this.t.skipTimer = null;
      this.t.skipTime = null;
      this.sk = true;
      if (reset) {
        this.sR();
      }
    },
    getP: async function () {
      if (Auth.isLoggedIn()) {
        let resp = await this.api.request.get('/user/me'), data;
        if (resp.status == 200 && resp.data) {
          data = resp.data;
          if (data['message']) {
            if (data.message['observer']) {
              if (data.message.observer['quiz']) {
                if (typeof data.message.observer.quiz == 'string') {
                  if (data.message.observer.quiz.length) {
                    this.prf = true;
                  } else {
                    this.prf = false;  
                  }
                } else {
                  this.prf = false;
                }
              } else {
                this.prf = false;
              }
            } else {
              this.prf = false;
            }
          } else {
            this.prf = false;
          }
        } else {
          this.prf = false;
        }
      } else {
        this.prf = false;
      }
    },
    getQ: async function () {
      let resp = await this.api.request.get('/quiz/questions'), data, w;
      if (resp.status == 200 && resp.data) {
        data = resp.data;
        if (data['message']) {
          if (Array.isArray(data.message)) {
            this.q.m = data.message;
            w = JSON.stringify(data.message);
            w = JSON.parse(w);
            this.getRq(w);
          }
        }
      }
    },
    /**
     * @param {Object} w : Array instance of API questions to be randomized
     */
    getRq: function (w) {
      if (!Array.isArray(w)) {
        console.warn("Error parsing questions array");
        return;
      }
      let c = w.length, t, r;
      while (0 !== c) {
        r = Math.floor(Math.random() * c);
        c -= 1;
        t = w[c];
        w[c] = w[r];
        w[r] = t;
      }
      this.q.w = w;
      // console.log(this.q);
    },
    /**
     * @param {String} : Selected question answer
     */
    choice: function (sq, n = false) {
      if (n) {
        if (this.qi + 1 < this.q.w.length) {
          let qi = this.q.w[this.qi].index;
          this.a[qi] = null;
          this.qi += 1;
          this.sq = "";
          this.sS(true);
          // console.log("Choice skipped", this.a);
          return;
        }
      } else if (!sq) {
        console.warn("Error making choice")
        return;
      } else if (typeof sq !== 'string') {
        console.warn("Error making choice")
        return;
      } else if (!sq.length || sq == '') {
        console.warn("Error making choice")
        return;
      }
      if (this.qi + 1 < this.q.w.length) {
        let qi = this.q.w[this.qi].index;
        if (this.q.w[this.qi].index == 31 && sq) {
          sq = sq.toUpperCase();
        }
        if (this.q.w[this.qi].index == 32) {
          this.sq = this.id.join(',');
        }
        this.a[qi] = sq;
        this.qi += 1;
        this.sq = "";
        this.sS(true);
        // console.log('Choice selected', this.a);
        return;
      } else {
        let qi = this.q.w[this.qi].index;
        if (this.q.w[this.qi].index == 31 && sq) {
          sq = sq.toUpperCase();
        }
        if (this.q.w[this.qi].index == 32) {
          this.sq = this.id.join(',');
        }
        this.a[qi] = sq;
        this.sq = "";
        this.tS();
        // console.log('Quiz Finished', [this.q, this.a]);
        return;
      }
    },
    redo: function () {
      window.location.reload();
    },
    exit: function () {
      let u = '/observer'
      location.href = u;
    },
    submit: async function () {
      // Force signed tz message
      if (this.l == false) {
        this.l = await Auth.login();
      }
      let resp;
      if (this.a.length >= 10 && this.l) {
        let s = {
          email: this.u.email,
          avatar: this.u.avatar,
          quiz: this.a
        };
        if (this.u.display) {
          s.userName = this.u.display;
        }
        resp = await this.api.request.post('/quiz/submit', s);
        if (resp.status == 200) {
          this.n();
        }
      } else {
        console.warn("Warning: Less than 10 questions completed, quiz has not been submitted");
      }
      // console.log(resp);
    },
    /**
     * @param {String} cq : Incoming checkbox value
     */
    ch: function(cq) {
      // console.log('cq', cq, typeof cq);
      if (typeof cq !== 'string') {
        console.warn('Error parsing ch value');
        return;
      } else if (!cq.length || cq == '') {
        return;
      }
      if (this.sq.indexOf(cq) >= 0) {
        let r = this.sq.split(','), m = [];
        for (let i = 0; i < r.length; i++) {
          if (r[i] !== cq) {
            m.push(r[i]);
          }
          if (i == (r.length - 1)) {
            this.sq = m.join(',');
          }
        }
      } else {
        if (this.sq == "") {
          this.sq = cq;
        } else {
          this.sq += ',' + cq;
        }
      }
    },
    nm: function () {
      let r = true;
      for (let i = 0; i < this.id.length; i++) {
        if (!this.id[i]) {
          r = false;
        }
        if (i == (this.id.length - 1)) {
          if (r)
            this.sq = this.id.join(',')
        }
      }
      // console.log('this.id =>', this.id);
    }
  },
  computed: {
    prg: function () {
      if (!this.a) {
        return 0;
      } else if (!Array.isArray(this.a)) {
        return 0;
      } else if (this.a.length < 1) {
        return 0;
      } else if (!this.q.m) {
        return 0;
      } else if (!Array.isArray(this.q.m)) {
        return 0;
      } else if (this.q.m.length < 1) {
        return 0;
      }
      let l = this.qi, p = this.q.m.length;
      return Math.round((l / p) * 100);
    },
    ctr: function () {
      if (!this.t.time || !this.t.timer) {
        return '';
      }
      let time = this.t.time / 60;
      let minutes = parseInt(time);
      let seconds = Math.round((time - minutes) * 60);
      let hours;
      if (seconds >= 60) {
        minutes += 1;
        seconds = seconds - 60;
      }
      if (minutes >= 60) {
        hours = Math.floor(minutes / 60);
        minutes = minutes - 60;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      } 
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      if (!hours) {
        hours = "00";
      }
      return hours + ":" + minutes + ":" + seconds;
    },
    ask: function () {
      if (!this.t.skipTime || !this.t.skipTimer) {
        return 0;
      }
      let l = this.t.skipTime, p = SKIP;
      return Math.round((l / p) * 100);
    },
    qrs: function () {
      if (!this.q.m) {
        return '0';
      } else if (!this.a.length) {
        return '0';
      }
      // console.log([this.q.m, this.a]);
      let nA = this.a.filter((v) => {
        if (v)
          return v;
      });
      return nA.length;
    }
  }
}
</script>

<style scoped>
.observer-register {
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

.progress-s {
  height: 2px;
  position: relative;
  top: 15px;
}

.progress-bar {
  background-color: #ff7070;
}

.progress-bar-s {
  background-color: rgba(230,0,115,0.5);
}

.test-item {
  margin-top: 2.5em;
}

.c {
  max-width: 500px;
}
.instr-n {
  margin-top: 2em;
  margin-bottom: 2em;
}
select.question.item,
input:not([type='checkbox']) {
  margin-top: 2em;
  margin-bottom: 2em;
  max-width: 500px;
}
.flag.multi {
  margin-top: 2em;
}
.flag.multi input {
  margin-right: 0.75em;
}
.quiz-controls .btn {
  margin-right: 2em;
}
ul.image-choice, ul.image-choice li {
  list-style: none;
  padding: 0;
}
ul.image-choice li {
  margin-bottom: 0.75em;
}
.test-item img {
  max-width: 100%;
  padding: 1em;
  border-radius: 0.5em;
  background-color: #eeeeee;
}
ul.image-choice li img {
  max-height: 100px;
}
.askip-wrapper {
  position: relative;
  top: -100px;
}
a.auto-skip {
  cursor: pointer;
}
.observer-register.card {
  max-width: 650px;
}
input.profile, select.profile.item {
  margin-top: 1em;
  margin-bottom: 2em;
  max-width: 500px;
}
.descr-i {
  font-style: italic;
}
.descr-i button {
  margin-top: 1em;
  margin-bottom: 1em;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
}
.avatar-i {
  background-image: url('/img/70b45e53738c932605aa1d5cbfebb78d9983731547096b929e5f2dfbcec08008.png');
  border-radius: 2em;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
}
.avatar-i.not_defined {
  opacity: 0.1;
  background-color: #000;
}
.observer-registered {
  max-width: 1200px;
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
.sealed .title-bar h3 {
  background: -webkit-linear-gradient(#ff7070, #333);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 0px 6px #ff7070;
}
img.c {
  max-width: 100%;
  margin: auto;
  margin-top: 4em;
  margin-bottom: 4em;
  display: block;
  border-radius: 1em;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  filter: hue-rotate(225deg);
  animation: transmogrify ease 60s;
  -webkit-animation: transmogrify ease 60s;
  -moz-animation: transmogrify ease 60s;
  -o-animation: transmogrify ease 60s;
  -ms-animation: transmogrify ease 60s;
  animation-iteration-count: infinite;
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
@keyframes transmogrify {
  0% {filter: hue-rotate(225deg);}
  50% {filter: hue-rotate(25deg);}
  100% {filter: hue-rotate(225deg);}
}
@-moz-keyframes transmogrify {
  0% {filter: hue-rotate(225deg);}
  50% {filter: hue-rotate(25deg);}
  100% {filter: hue-rotate(225deg);}
}
@-webkit-keyframes transmogrify {
  0% {filter: hue-rotate(225deg);}
  50% {filter: hue-rotate(25deg);}
  100% {filter: hue-rotate(225deg);}
}
@-o-keyframes transmogrify {
  0% {filter: hue-rotate(225deg);}
  50% {filter: hue-rotate(25deg);}
  100% {filter: hue-rotate(225deg);}
}
@-ms-keyframes transmogrify {
  0% {filter: hue-rotate(225deg);}
  50% {filter: hue-rotate(25deg);}
  100% {filter: hue-rotate(225deg);}
}
</style>