<template>
  <div class="guarded content-s" v-if="rdy && !access">
    <p class="no-access descr" v-html="w"></p>
    <router-link to="/the-new-classic">Back</router-link>
  </div>
  <div class="guard-dropped" v-if="access">
    <div class="pane-s observer-register" v-if="s == 0">
      <p>You will now complete a timed agent assessment to determine your comprehension.</p>
      <p>It will cover topics and strategies from the 6 seasons.</p>
      <p>Completing this test requires you've solved everything (including pre-season and post-season puzzles)</p>
      <p>Remember always: <strong> U R anon 2</strong></p>
      <p>We wish you luck in the final challenge.</p>
      <button class="btn btn-primary" @click="startClimbing();">Start</button>
    </div>
    <div class="pane-s observer-register test sealed" v-if="s == 1">
      <div class="timer wrapper-t">
        <div class="timer inner-t">
          <p>
            <span>Previous Attempts: </span>
            <span class="jaundice">{{attempts - 1}}</span>
          </p>
          <p>
            <span>Current Time: </span>
            <span class="jaundice">{{ctr}}</span>
          </p>
        </div>
      </div>

      <div class="test-wrapper" v-if="trial">
        <div class="test-item no-flag" >
          <div class="test-item" v-if="trial.q">
            <p :class="'test-item-'+trial.index">{{ (trial.index == 3) ? trial.q.slice(0,45) : trial.q}}</p>
            <p v-if="trial.index == 6">Two words for each field.</p>
          </div>
          <div class="quiz-response" v-if="trial.type && typeof trial.index == 'number'">
            <!-- Multiple Choice w/ Select Inputs -->
            <div class="multiple-choice" v-if="trial.type == 'select'">
              <!-- Trial #1 -->
              <div class="trial-1" v-if="trial.index == 0">
                <ul class="trial-select" v-if="trial.o">
                  <li v-for="(gameSeason, i) in trial.o[0]" :key="trial.index+'-'+i">
                    <div class="left season">
                      <label>{{gameSeason}}</label>
                    </div>
                    <div class="right theme">
                      <select class="form-control question item" v-model="sq[i]">
                        <option disabled value="">Select one</option>
                        <option v-for="(theme, j) in trial.o[1]" :key="trial.index+'-opt-'+j" :value="gameSeason.replace(/\s/g, '').toUpperCase() + theme.replace(/\s/g, '').toUpperCase()">{{(theme == 'Ascension') ? 'Comprehension' : theme}}</option>
                      </select>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- Trial #3 -->
              <div class="trial-3" v-if="trial.index == 2">
                <p v-if="trial.o">Codes: <span class="blood">[{{ String(trial.o) }}]</span></p>
                <ul class="trial-select codes">
                  <li v-for="(sacred, i) in sq" :key="trial.index+'-'+i">
                    <select class="form-control question item" v-model="sq[i]">
                      <option disabled value="">Select one</option>
                      <option v-for="(code, j) in trial.o" :key="trial.index+'-opt-'+j" :value="code.replace(/\s/g, '').toUpperCase()">{{code}}</option>
                    </select>
                  </li>
                </ul>
              </div>
              <!-- Trial #5 -->
              <div class="trial-5" v-if="trial.index == 4">
                <ul class="trial-select" v-if="trial.o">
                  <li v-for="(text, i) in trial.o" :key="trial.index+'-'+i">
                    <div class="left text">
                      <label>{{text}}</label>
                    </div>
                    <div class="right select">
                      <select class="form-control question item" v-model="sq[i]">
                        <option disabled value="">Select one</option>
                        <option :value="text">Keep</option>
                        <option value="false">Reject</option>
                      </select>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- Trial #10 -->
              <div class="trial-10" v-if="trial.index == 9">
                <ul class="trial-select" v-if="trial.o">
                  <li v-for="(statement, i) in trial.o" :key="trial.index+'-'+i">
                    <div class="left text">
                      <label>{{statement}}</label>
                    </div>
                    <div class="right select fin">
                      <select class="form-control question model" v-model="ss[i]">
                        <option disabled value="">Select one</option>
                        <option value="spring">Spring</option>
                        <option value="summer">Summer</option>
                        <option value="autumn">Autumn</option>
                        <option value="winter">Winter</option>
                        <option value="cryptowinter">Cryptowinter</option>
                        <option value="dawn">Dawn</option>
                      </select>
                      <span class="spacer">&nbsp;</span>
                      <select class="form-control question item chained" v-model="sq[i]" v-if="ss[i]">
                        <option disabled value="">Select one</option>
                        <option v-for="(puzzle, j) in puzzles[ss[i]]" :value="puzzle.replace(/\s/g, '').toUpperCase()" :key="trial.index+'-opt-'+j">{{puzzle}}</option>
                      </select>
                      <select class="form-control question item chained" v-model="sq[i]" v-if="!ss[i]">
                        <option disabled value="">Select one</option>
                      </select>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <!-- Multiple Choice w/ Numerical || String Inputs -->
            <div class="multiple-choice" v-if="trial.type == 'numbers' || trial.type == 'strings'">
              <!-- Trial #2 -->
              <div class="trial-2" v-if="trial.index == 1">
                <ul class="trial-number">
                  <li v-for="(sacred, i) in sq" :key="trial.index+'-'+i">
                    <input class="form-control numbers-trial" type="number" placeholder="Enter the sacred number" v-model="sq[i]" />
                  </li>
                </ul>
              </div>
              <!-- Trial #4 -->
              <div class="trial-4" v-if="trial.index == 3">
                <ul class="trial-string">
                  <li v-for="(sacred, i) in sq" :key="trial.index+'-'+i">
                    <input class="form-control numbers-trial" type="text" placeholder="One who has many names" v-model="sq[i]" />
                  </li>
                </ul>
              </div>
              <!-- Trial #7 -->
              <div class="trial-7" v-if="trial.index == 6">
                <ul class="trial-string">
                  <li v-for="(brainvoid, i) in sq" :key="trial.index+'-'+i">
                    <input class="form-control numbers-trial" type="text" placeholder="ᛈᚱᚩᚷᚱᚪᛗ·ᚣᚩᚢᚱ·ᛗᛁᚾᛞ.ᛈᚱᚩᚷᚱᚪᛗ·ᚱᛠᛚᛁᛏᚣ." v-model="sq[i]" />
                  </li>
                </ul>
              </div>
            </div>
            <!-- Trial #6 -->
            <div class="single-choice" v-if="trial.type == 'string'">
              <div class="trial-6" v-if="trial.index == 5">
                <input class="form-control" type="text" placeholder="ᚹᚻᚢ·ᛈᚱᚩᚷᚱᚪᛗᛗᛖᛞ·ᚣᚩᚢᚱ·ᛗᛁᚾᛞ?" v-model="sq">
              </div>
            </div>
            <!-- Trial #8 -->
            <div class="single-choice" v-if="trial.type == 'string'">
              <div class="trial-8" v-if="trial.index == 7">
                <input class="form-control" type="text" placeholder="Null and Void, Like Hour Mineds Windsthin" v-model="sq">
              </div>
            </div>
            <!-- Trial #9 -->
            <div class="single-choice" v-if="trial.type == 'string'">
              <div class="trial-9" v-if="trial.index == 8">
                <input class="form-control" type="text" placeholder="A bridged to another dimension" v-model="sq">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="error bg-danger" v-if="error">
        <span class="float-right" @click="error = null;">&times;</span>
        <p v-if="trial.index < 9">Failed to decrypt the next question.</p>
        <p v-if="trial.index == 9">Ascension proof was rejected.</p>
      </div>
      <div class="trial-controls" v-if="typeof trial.index == 'number'">
        <button class="btn btn-primary next-q" @click="attemptTrial(trial.index);" v-if="trial.index < 9">Next</button>
        <button class="btn btn-primary next-q" @click="attemptFinalize();" v-if="trial.index == 9">Finalize</button>
      </div>
    </div>
    <div class="pane-s observer-register test sealed" v-if="s == 2">
      <p>Your body of knowledge is acceptable, you may forge comprehension.</p>
      <p>Open the Graphical Solver to complete the forgery.</p>
      <p>Then complete the subjective portion of this test (see below).</p>
      <p>Answers to essay questions must be between 10 and 250 words.</p>

      <div class="subjectives">
        <div class="test-wrapper">
          <!-- Trial #11 -->
          <div class="test-item" v-if="trials[10]">
            <div class="test-item question" v-if="trials[10].q">
              <p class="test-item-10">{{trials[10].q}}</p>
            </div>
            <div class="quiz-response" v-if="trials[10]">
              <!-- Single Choice w/ Select Inputs -->
              <div class="multiple-choice">
                <div class="trial-10">
                  <select class="form-control question model" v-model="subjectives[0]">
                    <option disabled value="">Select one</option>
                    <option :value="belonging" v-for="(belonging, i) in trials[10].o" :key="'belonging-'+i">{{belonging}}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Trial #12 -->
          <div class="test-item" v-if="trials[11]">
            <div class="test-item question" v-if="trials[11].q">
              <p class="test-item-11">{{trials[11].q}}</p>
            </div>
            <div class="quiz-response" v-if="trials[11]">
              <!-- Single Choice w/ Select Inputs -->
              <div class="multiple-choice">
                <div class="trial-11">
                  <select class="form-control question model" v-model="subjectives[1]">
                    <option disabled value="">Select one</option>
                    <option :value="rejection" v-for="(rejection, i) in trials[11].o" :key="'rejection-'+i">{{rejection}}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Trial #13 -->
          <div class="test-item" v-if="trials[12]">
            <div class="test-item question" v-if="trials[12].q">
              <p class="test-item-12">{{trials[12].q}}</p>
            </div>
            <div class="quiz-response" v-if="trials[12]">
              <!-- Essay -->
              <div class="essay">
                <div class="trial-12">
                  <textarea class="form-control" v-model="subjectives[2]"></textarea>  
                </div>
              </div>
            </div>
          </div>
          <!-- Trial #14 -->
          <div class="test-item" v-if="trials[13]">
            <div class="test-item question" v-if="trials[13].q">
              <p class="test-item-13">{{trials[13].q}}</p>
            </div>
            <div class="quiz-response" v-if="trials[13]">
              <!-- Essay -->
              <div class="essay">
                <div class="trial-13">
                  <textarea class="form-control" v-model="subjectives[3]"></textarea>  
                </div>
              </div>
            </div>
          </div>
          <!-- Trial #15 -->
          <div class="test-item" v-if="trials[14]">
            <div class="test-item question" v-if="trials[14].q">
              <p class="test-item-14">{{trials[14].q}}</p>
            </div>
            <div class="quiz-response" v-if="trials[14]">
              <!-- Essay -->
              <div class="essay">
                <div class="trial-14">
                  <textarea class="form-control" v-model="subjectives[4]"></textarea>  
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="error bg-danger" v-if="error">
          <span class="float-right" @click="error = null;">&times;</span>
          <p>Failed submitting comprehension.</p>
        </div>

        <div class="trial-controls" v-if="typeof trial.index == 'number'">
          <button class="btn btn-primary next-q comprehension" @click="attemptSubmitComprehension();" :disabled="parseComprehension()">Submit Comprehension</button>
        </div>
      </div>
    </div>

    <div class="pane-s observer-register test sealed" v-if="s == 3">
      <h3>Your fate is sealed.</h3>
      <p>Game Over, you are "victorious".</p>
      <p>I hope you "enjoy" such fragile victories.</p>
      <p>We congratulate you for reaching the state of Himalaya.</p>
      <p>Thank you for playing PROJECT UANON.</p>
      <p title="R ANON 2" alt="R ANON 2">U.</p>
      <p>
        <router-link to="/">
          <button class="btn btn-primary">Home has never felt so far away...</button>
        </router-link>
      </p>
    </div>

    <div class="cryptowinter-wrap console" :class="{copen: co}" v-if="rdy">

      <!-- Soulve -->
      <div class="dawn-wrap console" :class="{copen: co}" v-if="rdy">
        <div class="open-c inner">
          <p class="helper-bar float-right" @click="handleCopen();" v-if="p.bundle">
            <span class="icon icon-terminal2"></span>
          </p>
          <p class="helper-bar float-right" @click="gopen();" v-if="p.bundle">
            <span class="icon icon-game"></span>
          </p>
        </div>
        <Graphical 
          v-bind:a="a"
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
    </div>
  </div>
</template>

<script>
import * as Config from '../../../conf/constants';
import * as api from '../../../util/api';
import store from '../../../util/storage';
import { generateProofAsString } from '../../../util/hasher';
import * as aes from '../../../util/cipher/aes';
import Puzzles from '../../../util/puzzles';

import Graphical from '../../children/soulve/Graphical.vue';
import Console from '../../children/soulve/Console.vue';

const CURRENT_I = 0;

export default {
  name: 'DawnAscend',
  components: { Console, Graphical },
  data: () => ({
    a: [],
    c: Config,
    h: generateProofAsString,
    i: CURRENT_I,
    p: {
      id: null,
      title: null,
      description: null,
      secret: null,
      template: null
    },
    q: {enc: [], dec: []},
    o: null,
    s: 0,
    w: Config.notify.DAWN_PLAYER_WARNING.slice(-1),
    cd: false,
    co: false,
    gd: false,
    do: store,
    sq: ["","","","","",""],
    ss: ["","","","","",""],
    un: null,
    aes: aes.default.AES,
    api: api,
    def: ['dawn+', 0],
    rdy: false,
    str: {},
    start: null,
    timer: null,
    error: null,
    trial: null,
    access: false,
    trials: [],
    solves: [],
    stopped: false,
    puzzles: Puzzles,
    attempts: 1,
    currentTime: null,
    childProofs: null,
    subjectives: ["","","","",""],
  }),
  mounted: async function () {
    this.getStr();
    await this.getU();
    await this.getTpl();
    await this.getQ();
    let attempts = localStorage.getItem('trials');
    if (attempts) this.attempts += parseInt(attempts);
    this.rdy = true;
  },
  methods: {
    getStr: function () {
      this.str = this.do.store.get();
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
      let r = this.def[0], d, req = {
        index: CURRENT_I, 
        realm: r
      };
      // Assemble
      let proofs = [];
      let secrets = ["9c9dba32b632a6f79d5e467fcfc6a5b8be03845830b0bb929502b8957cc549c1","775bed9daae4e50c8af1b6b93b98f0e0725a5ad6636aa30a4b3e508fe0254945","cc2e7830d1bf2ed4c51f7cd8e88c725e19790b221b8bfbe0088c1d85617b54a4","ed18a13d9adf51dc24ab5e001682eb73c929b943fcb40f310590d896f2116db3","d5de6ff254499e6e3a25d97273c9c9c0fe78e54d7f0581cfc46cb89eba5cddef"];
      for (let i = 0; i < secrets.length; i++) {
        let y = this.do.store.existsItem(secrets[i], 'dawn');
        if (y['proof']) proofs.push(y.proof);
      }

      // Generate
      let p = this.h(JSON.stringify(proofs), Config.DEFAULT_DEPTH);
      p = p.substring(2);
        
      try {
        req.proof = p;
        let resp = await this.api.request.post('/puzzle/get', req);
        if (resp.status == 200 && resp.data) {
          d = resp.data;
          if (d.message) {
            this.make(d.message);
          }
        }
      } catch (e) {
        console.warn('Error resolving puzzle data', e);
      }
    },
    prep: function () {
      if (this.p.id && this.str) {
        let a = [], str = this.str['dawn'];
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
      this.p.format = (m.format) ? m.format : null;
      this.p.fields = (m.fields) ? m.fields : null;
      this.p.hint = (m.hint) ? m.hint : null;
      this.p.template = (m.template) ? m.template : null;
      this.p.data = (m.data) ? m.data : null;
      this.prep();
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
    startClimbing: function () {
      this.s = 1;
      this.start = new Date().getTime();
      localStorage.setItem('trials', this.attempts);
      this.timer = setInterval(() => {
        if (this.stopped) clearInterval(this.timer);
        else this.currentTime = new Date().getTime();
      }, 1000);
    },
    getQ: async function () {
      // Generate sub-proofs
      let proofs = [];
      let secrets = [
        "9c9dba32b632a6f79d5e467fcfc6a5b8be03845830b0bb929502b8957cc549c1", // Dawn1
        "775bed9daae4e50c8af1b6b93b98f0e0725a5ad6636aa30a4b3e508fe0254945", // Dawn2
        "cc2e7830d1bf2ed4c51f7cd8e88c725e19790b221b8bfbe0088c1d85617b54a4", // Dawn3
        "ed18a13d9adf51dc24ab5e001682eb73c929b943fcb40f310590d896f2116db3", // Dawn4
        "d5de6ff254499e6e3a25d97273c9c9c0fe78e54d7f0581cfc46cb89eba5cddef", // Dawn5
      ];
      for (let i = 0; i < secrets.length; i++) {
        let y = this.do.store.existsItem(secrets[i], 'dawn');
        if (y['proof']) proofs.push(y.proof);
      }

      // Generate main proof
      this.childProofs = proofs;
      let p = this.h(JSON.stringify(proofs), Config.DEFAULT_DEPTH);
      p = p.substring(2);

      // Request ascension test
      let req = {
        proof: p
      };
      let resp, data;
      try {
        resp = await this.api.request.post('/comprehension/questions', req);
        this.rdy = true;
      } catch (e) {
        console.log(e);
        this.rdy = true;
      }
      if (resp.status == 200 && resp.data) {
        data = resp.data;
        if (data['message']) {
          if (Array.isArray(data.message)) {
            this.access = true;
            this.trials = data.message;
            this.trial = this.trials[0];
            this.trial.index = 0;
            this.trial.type = 'select';
          }
        }
      }
    },
    attemptTrial: async function (i) {
      // console.log("TRIAL", this.trials[i]);
      this.error = null;
      let sq;
      if (i === 4) {
        sq = this.sq.filter((item) => {
          return item !== 'false';
        });
        sq.sort();
        for (let j = 0; j < sq.length; j++) {
          if (sq[j]) sq[j] = sq[j].replace(/\s/g, '').toUpperCase();
        }
      } else {
        if (Array.isArray(this.sq)) {
          for (let j = 0; j < this.sq.length; j++) {
            if (this.sq[j]) this.sq[j] = this.sq[j].replace(/\s/g, '').toUpperCase();
          }
        } else {
          if (this.sq) this.sq = this.sq.replace(/\s/g, '').toUpperCase();
        }
        sq = this.sq;
      }
      try {
        let attemptKey = (Array.isArray(sq)) ? JSON.stringify(sq) : JSON.stringify([sq]);
        attemptKey = this.h(attemptKey, Config.DEFAULT_DEPTH);
        attemptKey = attemptKey.substring(2);
        let success = this.decode(this.trials[i+1], attemptKey);
        if (!success) {
          this.error = true;
          return;
        }
        if (i == 6) {
          let enc = "a71c5c26d99cb5b0a2fc8a78236ea2b939d0d77ffe0239b4bdf58af04fce6c7a";
          sq[sq.length - 1] = this.decode(enc, process.env.VUE_APP_GAME_SEED);
          attemptKey = JSON.stringify(sq);
          attemptKey = this.h(attemptKey, Config.DEFAULT_DEPTH);
          attemptKey = attemptKey.substring(2);
        }
        this.solves.push(attemptKey);
        this.trial = JSON.parse(success);
        this.trial.index = (i+1);
        if (this.trial.q) {
          if (this.trial.q.indexOf('(42 select inputs);') > -1) {
            this.trial.q = this.trial.q.replace('(42 select inputs);', '');
            this.trial.q += " (using the pre-formatted values)."
          }
        }
        switch (this.trial.index) {
          case 1: {
            this.sq = [null,null,null,null,null,null,null];
            this.trial.type = 'numbers';
            break;
          }
          case 2: {
            this.sq = ["","","","","","","","",""];
            this.trial.type = 'select';
            break;
          }
          case 3: {
            this.sq = [null,null,null];
            this.trial.type = 'strings';
            break;
          }
          case 4: {
            this.sq = [
              "","","","","","","","","","",
              "","","","","","","","","","",
              "","","","","","","","","","",
              "","","","","","","","","","",
              "",""
            ];
            this.trial.type = 'select';
            break;
          }
          case 5: 
          case 7:
          case 8: {
            this.sq = "";
            this.trial.type = 'string';
            break;
          }
          case 6: {
            this.sq = ["","","","","","","","",""];
            this.trial.type = 'strings';
            break;
          }
          case 9: {
            this.sq = ["","","","","",""];
            this.trial.type = 'select'
            break;
          }
        }
      } catch(e) {
        console.log(e);
        this.error = true;
        return;
      }
    },
    attemptFinalize: function () {
      if (!Array.isArray(this.sq)) {
        this.error = true;
        return;
      }
      for (let i = 0; i < this.sq.length; i++) {
        this.sq[i] = this.sq[i].replace(/\s/g, '').toUpperCase();
      }
      let trial10 = JSON.stringify(this.sq);
      let p = this.h(trial10, Config.DEFAULT_DEPTH);
      p = p.substring(2);
      let finalSolve = [...this.childProofs, ...this.solves];
      finalSolve = JSON.stringify(finalSolve)
      finalSolve = JSON.parse(finalSolve);
      finalSolve.push(p);
      let verifiableProof = this.h(JSON.stringify(finalSolve), 1001);
      if (verifiableProof.substring(2) == "8d1d7c72b6be241f58d47e1c0a9bd55e6aaaa02839d7bc335138e667a07e5499") {
        ++this.s;
        this.solves.push(p);
        this.stopped = true;
        this.error = false;
        // Auto-complete Graphical Solver
        this.a = this.solves;
      } else {
        this.error = true;
        return;
      }
    },
    decode: function (enc, key) {
      // console.log("DECODE", enc, key);
      try {
        let dec = this.aes.decrypt('cbc', enc, key);
        return dec;
      } catch(e) {
        console.log(e);
        return false;
      }
    },
    parseComprehension: function () {
      let canSubmit = true;
      for (let i = 0; i < this.subjectives.length; i++) {
        if (!this.subjectives[i]) canSubmit = false;
        if (typeof this.subjectives[i] !== 'string') canSubmit = false;
        if (i >= 2) {
          let essayWords = this.subjectives[i].split(" ");
          if (essayWords.length < 10 || essayWords.length > 250) canSubmit = false;
        }
        if (i == (this.subjectives.length - 1)) return (canSubmit) ? false : true;
      }
    },
    attemptSubmitComprehension: async function () {
      let req = {
        question1: this.subjectives[0],
        question2: this.subjectives[1],
        question3: this.subjectives[2],
        question4: this.subjectives[3],
        question5: this.subjectives[4],
      };
      let resp = await this.api.request.post('/comprehension/submit', req);
      if (resp.status == 200) {
        // console.log('attemptSubmitComprehension', resp);
        ++this.s;
      } else {
        this.error = true;
      }
    },
  },
  computed: {
    ctr: function () {
      let hours, minutes, seconds;
      if (typeof this.start !== 'number') return '';
      if (this.start > this.currentTime) return '';
      let diff = this.currentTime - this.start;
      seconds = diff / 1000;
      if (seconds < 60) {
        hours = "00";
        minutes = "00";
      } else if (seconds < 3600) {
        hours = "00";
        minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
      } else {
        hours = Math.floor(seconds / 3600);
        minutes = Math.floor((seconds % 3600) / 60);
        seconds = (seconds % 3600) % 60;
      }

      if (typeof seconds == 'number') seconds = parseInt(seconds);
      if (typeof minutes == 'number') minutes = parseInt(minutes);
      if (typeof hours == 'number') hours = parseInt(hours);

      if (typeof seconds == 'number' && seconds < 10) seconds = "0" + seconds;
      if (typeof minutes == 'number' && minutes < 10) minutes = "0" + minutes;
      if (typeof hours == 'number' && hours < 10) hours = "0" + hours;

      return hours + ":" + minutes + ":" + seconds;
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
.trial-controls .btn {
  float: right;
}
.trial-controls {
  clear: both;
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
div.left, div.right {
  width: 100%;
  max-width: 50%;
  display: inline-block;
  margin: auto;
}
div.left.season, div.fin .question.model {
  max-width: 175px;
}
div.fin .question.chained {
  max-width: 420px;
}
div.fin .question.model, div.fin .question.chained {
  display: inline-block;
}
ul, ul li {
  list-style: none;
}
.timer {
  text-align: right;
}
.multiple-choice > div.trial-1, .test-item-0 {
  max-width: 1040px;
  margin: auto;
}
.test-item-0 {
  padding: 2em;
}
.error.bg-danger {
  padding: 2em;
  border-radius: 1em;
  margin-bottom: 1em;
}
.error.bg-danger > span {
  cursor: pointer;
  position: relative;
  top: -12px;
}
ul.trial-number, ul.trial-string, ul.codes, 
.trial-5 ul, .trial-10 ul {
  margin-left: 0;
  padding-left: 0;
}
.trial-5 ul,
.trial-10 ul {
  margin-top: 3em;
}
.trial-5 ul li,
.trial-10 ul li {
  padding: 1em;
}
.trial-5 ul li:first-of-type,
.trial-10 ul li:first-of-type {
  border-radius: 1em 1em 0 0;
}
.trial-5 ul li:last-of-type,
.trial-10 ul li:last-of-type {
  border-radius: 0 0 1em 1em;
}
.trial-5 ul li:nth-child(odd),
.trial-10 ul li:nth-child(odd) {
  background-color: #333333;
}
.trial-5 ul li:nth-child(even),
.trial-10 ul li:nth-child(even) {
  background-color: #ff7070;
}
.trial-8 input {
  max-width: 100%;
}
.spacer {
  width: 1em;
}
div.subjectives {
  border-top: 1px solid #ff7070;
  margin-top: 2em;
}
.trial-10 select, .trial-11 select {
  max-width: 500px;
}
.next-q.comprehension {
  margin-top: 1em;
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