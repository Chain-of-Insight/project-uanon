<template>
  <div class="container-e" v-if="e['name'] && e['background'] && e['table']" :style="'background:url('+e.background+')'">
  
    <div class="app-wr">
      <img class="pentagon" :src="e.table" usemap="#image-map">

      <map name="image-map">
        <area alt="Person 1" title="Person 1" @click="selP(1);" coords="293,16,19" shape="circle">
        <area alt="Person 2" title="Person 2" @click="selP(2);" coords="578,215,21" shape="circle">
        <area alt="Person 3" title="Person 3" @click="selP(3);" coords="464,547,21" shape="circle">
        <area alt="Person 4" title="Person 4" @click="selP(4);" coords="119,547,23" shape="circle">
        <area alt="Person 5" title="Person 5" @click="selP(5);" coords="16,218,23" shape="circle">
      </map>

      <div class="container">
        <div class="controls" :class="{lg: go && tx}">
          <button class="btn btn-primary" @click="soulve();" v-if="!go">Submit Answers</button>
          <button class="btn btn-primary" v-if="go && tx" @click="claim();">Claim Reward</button>
          <button class="btn btn-primary" v-if="go" @click="next();">Next</button>
          <button class="btn btn-inverse" @click="show();"><span class="icon-ask"></span></button>
        </div>

        <div class="messenger" v-if="msg.type && msg.value">
          <p class="error-msg danger bg-danger" v-if="msg.type == 'error'">{{msg.value}}<span class="float-right close-x" @click="msg={type:null,value:null};">&times;</span></p>
          <p class="success-msg success bg-success" v-if="msg.type == 'success'">{{msg.value}}</p>
          <div class="view-reward" v-if="oph && go">
            <a :href="oph" target="_blank">View reward operation</a>
          </div>
        </div>
      </div>

      <div v-if="sh">
        <transition name="modal" v-if="e.text">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog modal-dialog-e">
                <div class="modal-content modal-content-e">
                  <div class="modal-header">
                    <h4 class="modal-title">Entschuldigen Sie bitte</h4>
                    <div type="button" class="close" @click="sh=false;">
                      <span class="close-x" aria-hidden="true">&times;</span>
                    </div>
                  </div>
                  <div class="modal-body">
                    <div class="text-e" v-html="e.text"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <div v-if="typeof sp == 'number'">
        <transition name="modal" v-if="people[sp]">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">Person {{sp+1}}</h4>
                    <div type="button" class="close" @click="close();">
                      <span class="close-x" aria-hidden="true">&times;</span>
                    </div>
                  </div>
                  <div class="modal-body">
                    <ul class="n-fields ul form-group">
                      <li class="tutorials-list li" v-for="(input, n) in people[sp]" :key="n">
                        <label :for="'input-' + n">Solution {{(n + 1)}}:</label>
                        <input 
                          type="text" 
                          class="input form-control" 
                          :id="'soulve-' + n"
                          :name="'input-' + n"
                          v-model="people[sp][n]"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

  </div>
</template>

<script>
  import * as Config from '../../../conf/constants';
  import { generateProofAsString, verifyProof } from '../../../util/hasher';
  import { getOracle } from '../../../util/contract';
  import { getActiveAccount } from '../../../util/tezos';

  const N = process.env.VUE_APP_TEZOS_NETWORK;
  const TE = process.env.VUE_APP_TESTNET_ENTROPY;
  const X = '106';

  export default {
    props: {
      e: Object   // Einstein
    },
    emits: ['proof'],
    data: () => ({
      person1: [null,null,null,null,null],
      person2: [null,null,null,null,null],
      person3: [null,null,null,null,null],
      person4: [null,null,null,null,null],
      person5: [null,null,null,null,null],
      people: [],
      proof: null,
      msg: {
        type: null,
        value: null
      },
      oph: null,
      op: null,
      go: false,
      sh: false,
      sp: null,
      tx: false,
      c: {},
      h: {
        g: generateProofAsString, 
        v: verifyProof
      },
      l: 5
    }),
    mounted: async function () {
      this.people =  [this.person1,this.person2,this.person3,this.person4,this.person5];
      // console.log('HeadScratcher', [this.e.secret]);
      
      // Get claims
      this.c.instance = await getOracle();
      this.c.storage = await this.c.instance.storage();
      this.c.current = await this.c.storage.puzzles.get(X);
      let c = this.c.current.claimed.keyMap.size;
      if (c == 0) {
        this.tx = true;
      }
      if (this.tx) {
        await getActiveAccount();
        // console.log('Tx true, a', [this.tx, a]);
      }
    },
    methods: {
      selP: function (i) {
        if (typeof i !== 'number') {
          return;
        } else if (i > this.l) {
          return;
        }
        else if (i < 1) {
          return;
        } else {
          this.sp = (i-1);
          // console.log("Selected person", [i, this.sp]);
        }
      },
      close: function () {
        // console.log('Peeps =>', this.people);
        this.sp = null;
      },
      soulve: function () {
        this.msg = {type: null, value: null};
        let can = this;
        let a = [
          // 1
          this.person1[0],this.person1[1],this.person1[2],this.person1[3],this.person1[4],
          // 2
          this.person2[0],this.person2[1],this.person2[2],this.person2[3],this.person2[4],
          // 3
          this.person3[0],this.person3[1],this.person3[2],this.person3[3],this.person3[4],
          // 4
          this.person4[0],this.person4[1],this.person4[2],this.person4[3],this.person4[4],
          // 5
          this.person5[0],this.person5[1],this.person5[2],this.person5[3],this.person5[4]
        ];
        // Verify submission
        let v = this.make(a);
        if (v !== true) {
          this.msg = {type: 'error', value: Config.notify.DEFAULT_VERIFICATION_FAIL};
        // pass
        } else {
          if (!this.tx) {
            this.msg = {type: 'success', value: "Access key acquired! Use the \"Next\" button to load the next puzzle" };
          } else {
            this.msg = {type: 'success', value: "Access key acquired! Use the \"Claim Rewards\" button to claim your prize. Use the \"Next\" button to load the next puzzle" };
          }
          can.go = true;
        }
      },
      /**
       * @param {String} a : Answer
       */
      make: function (a) {
        if (!a) {
          return;
        } else if (!Array.isArray(a)) {
          return;
        } else if (!a.length) {
          return;
        }
        let b = [
          // 1
          this.person1[0],this.person1[1],this.person1[2],this.person1[3],this.person1[4],
          // 2
          this.person2[0],this.person2[1],this.person2[2],this.person2[3],this.person2[4],
          // 3
          this.person3[0],this.person3[1],this.person3[2],this.person3[3],this.person3[4],
          // 4
          this.person4[0],this.person4[1],this.person4[2],this.person4[3],this.person4[4],
          // 5
          this.person5[0],this.person5[1],this.person5[2],this.person5[3],this.person5[4]
        ];
        if (N !== 'mainnet') {
          b.push(TE);
        }
        let p = this.h.g(JSON.stringify(b), Config.DEFAULT_OP_SIZE - 1);
        let p1 = this.h.g(JSON.stringify(b), Config.DEFAULT_DEPTH);
        let s = this.e.secret;
        let can = this;
        p = p.substring(2), p1 = p1.substring(2);
        const v = this.h.v(p, s, Config.DEFAULT_OP_SIZE, Config.DEFAULT_OP_SIZE - 1);
        if (v === true) {
          // console.log('Proof Verified =>', {proof: p, verified: v, secret: s, p1: p1/*, pass: JSON.stringify(a)*/});
          this.$emit('proof', p1);
          if (this.tx) {
            this.proof = p;
          }
          can.go = true;
        }
        return v;
      },
      claim: async function () {
        if (!this.tx || !this.proof) {
          return;
        }
        // Claim reward
        try {
          await getActiveAccount();
          this.msg = {type: 'success', value: "Sending your solve to the Tezos network. This could take a moment."};
          const op1 = await this.c.instance.methods.raiseHand(X).send();
          this.msg = {type: 'success', value: "The Tezos puzzle Gods are listening"};
          await op1.confirmation();
          let result = await this.c.instance.methods.solve(X, this.proof).send();
          this.msg = {type: 'success', value: "Your solve has been submitted to the Tezos network" };
          let t = setInterval(() => {
            if (result['opHash']) {
              if (typeof result.opHash == 'string') {
                if (result.opHash.length) {
                  clearInterval(t);
                  let h = result.opHash, pre;
                  if (N !== 'mainnet') {
                    pre = Config.externals.explorer.testnet;
                  } else {
                    pre = Config.externals.explorer.mainnet;
                  }
                  if (h) {
                    this.op = h;
                    this.oph = pre + h;
                  }
                  // console.log('Tx. result =>', [result, h, this.op]);
                  this.msg = {type: 'success', value: "Your reward has been applied: " + this.op};
                }
              }
            }
          }, 1000);
        } catch (e) {
          console.warn('Error sending operation, reward not claimed', e);
          this.msg = {type: 'error', value: "Error sending Tezos operation, reward not claimed" };
        }
      },
      show: function () {
        this.sh = true;
      },
      next: function () {
        let can = this;
        if (!can.go) {
          return;
        }
        let c = location.href, a = c.split('/'), b = a[(a.length - 1)], u;
        a[(a.length - 1)] = parseInt(b) + 1;
        u = a.join('/');
        return location.href = u;
      }
    }
  }
</script>

<style scoped>
.container-e {
  padding: 2em;
  border-radius: 0 0 1em 1em;
}
img.pentagon {
  margin: auto;
  display: block;
}
area {
  cursor: pointer;
}
.modal-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.close {
  float: right;
}
.close.error-reset {
  color: #ffffff;
  opacity: 0.8;
  font-weight: 100;
  position: relative;
  right: 0.25em;
}
.modal-body {
  clear: both;
}
.modal-content {
  max-height: 90vh;
  overflow-y: auto;
}
.modal-dialog-e {
  max-width: 60vw;
}
ul {
  padding: 0;
  list-style: none;
}
.error-msg,
.success-msg {
  padding: 1em;
  color: #ffffff;
  border-radius: 5px;
}
div.controls {
  margin: auto;
  margin-top: 3em;
  margin-bottom: 2em;
  display: block;
  width: 225px;
}
div.controls.lg {
  width: 280px;
}
div.controls .btn {
  margin-right: 1rem;
  text-align: center;
  display: inline-block;
}
</style>