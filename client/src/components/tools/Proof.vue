<template>
  <div class="pane-s proving-tools">
    <h1>{{ msg }}</h1>
    <router-link to="/tools">Back to Tools</router-link>
  </div>
  <div class="pane-s content">
    <div id="opts">
      <div id="accordion">

        <div class="card">
          <div class="card-header" :class="{open: o == 'gen'}" id="gen-h">
            <h5 class="mb-0">
              <button class="btn btn-link" data-toggle="collapse" data-target="#gen-b" aria-expanded="true" aria-controls="gen-b" @click="o = (o === 'gen') ? null : 'gen';">GENERATE TRUTH CHAIN</button>
              <span class="float-right close-x" data-toggle="collapse" data-target="#gen-b" v-if="o == 'gen'" @click="o = null;">&times;</span>
            </h5>
          </div>
          <div id="gen-b" class="collapse" aria-labelledby="Generate chain of proofs" data-parent="#accordion">
            <div class="card-body">
              <div class="wrapt">
                <div class="field">
                  <p>
                    <label for="genf">Fields</label>
                  </p>
                  <p>
                    <input class="form-control" min="1" name="genf" type="number" v-model="p.fields" placeholder="Password quantity" />
                  </p>
                </div>
                <div class="size">
                  <p>
                    <label for="gens">Chain Size</label>
                  </p>
                  <p>
                    <input class="form-control" min="1" name="gens" type="number" v-model="p.size" placeholder="Size of hash chain" />
                  </p>
                </div>
              </div>
              <div class="raw" v-if="p.fields">
                <p>Plain Text</p>
                <p class="raw-f" v-for="i in parseInt(p.fields)" :key="i">
                  <input class="form-control" :name="'field-' + i" type="text" v-model="p.raw[parseInt(i)-1]" :placeholder="'Password ' + parseInt(i)" />
                </p>
              </div>
              <div class="enc" v-if="p.raw.length">

                <div class="enc-out" v-if="p.pub">
                  <p>
                    <label for="pubkey">Public Secret</label>
                  </p>
                  <p>
                    <input class="form-control pubkey" name="pubkey" type="text" v-model="p.pub" readonly />
                  </p>
                </div>

                <div class="tree" v-if="p.tree.length">
                  <div class="tree-in" v-if="p.tree.length && p.show">
                    <pre>{{ p.tree }}</pre>
                  </div>
                </div>

                <div class="enc-in" v-if="p.raw[0]">
                  <button class="btn btn-primary" @click="create()">Encrypt</button>
                  <button class="btn btn-inverse" v-if="p.tree.length && !p.show" @click="p.show = true;">View Full Chain</button>
                  <button class="btn btn-inverse" v-if="p.tree.length && p.show" @click="p.show = false;">Hide Chain</button>
                  <button class="btn btn-danger" @click="reset(0)">Reset</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header" :class="{open: o == 'prf'}" id="prf-h">
            <h5 class="mb-0">
              <button class="btn btn-link" data-toggle="collapse" data-target="#prf-b" aria-expanded="true" aria-controls="prf-b" @click="o = (o === 'prf') ? null : 'prf';">GENERATE EVIDENCE</button>
              <span class="float-right close-x" data-toggle="collapse" data-target="#prf-b" v-if="o == 'prf'" @click="o = null;">&times;</span>
            </h5>
          </div>
          <div id="prf-b" class="collapse" aria-labelledby="Generate proof at depth" data-parent="#accordion">
            <div class="card-body">
              
              <div class="wrapt">
                <div class="field">
                  <p>
                    <label for="prff">Fields</label>
                  </p>
                  <p>
                    <input class="form-control" min="1" name="prff" type="number" v-model="d.fields" placeholder="Password quantity" />
                  </p>
                </div>
                <div class="size">
                  <p>
                    <label for="prfd">Proof Depth</label>
                  </p>
                  <p>
                    <input class="form-control" min="1" name="prfd" type="number" v-model="d.depth" placeholder="Depth of proof" />
                  </p>
                </div>
              </div>
              
              <div class="raw" v-if="d.fields">
                <p>Plain Text</p>
                <p class="raw-f" v-for="n in parseInt(d.fields)" :key="n">
                  <input class="form-control" :name="'field-' + n" type="text" v-model="d.raw[parseInt(n)-1]" :placeholder="'Password ' + parseInt(n)" />
                </p>
              </div>

              <div class="enc" v-if="d.raw.length">

                <div class="enc-out" v-if="d.proof">
                  <p>
                    <label for="proof">Proof</label>
                  </p>
                  <p>
                    <input class="form-control pubkey" name="proof" type="text" v-model="d.proof" readonly />
                  </p>
                </div>

                <div class="enc-in" v-if="d.raw[0]">
                  <button class="btn btn-primary" @click="proof()">Encrypt</button>
                  <button class="btn btn-danger" @click="reset(1)">Reset</button>
                </div>

              </div>

            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header" :class="{open: o == 'ver'}" id="ver-h">
            <h5 class="mb-0">
              <button class="btn btn-link" data-toggle="collapse" data-target="#ver-b" aria-expanded="true" aria-controls="ver-b" @click="o = (o === 'ver') ? null : 'ver';">VERIFY TRUTH</button>
              <span class="float-right close-x" data-toggle="collapse" data-target="#ver-b" v-if="o == 'ver'" @click="o = null;">&times;</span>
            </h5>
          </div>
          <div id="ver-b" class="collapse" aria-labelledby="Verify proof at depth" data-parent="#accordion">
            <div class="card-body">

              <div class="wrapt">
                <div class="depth">
                  <p>
                    <label for="verd">Depth of Proof</label>
                  </p>
                  <p>
                    <input class="form-control" min="1" name="verd" type="number" v-model="v.depth" placeholder="Depth of proof" />
                  </p>
                </div>
                <div class="size">
                  <p>
                    <label for="vers">Depth of Public Secret</label>
                  </p>
                  <p>
                    <input class="form-control" min="1" name="vers" type="number" v-model="v.size" placeholder="Size of hash chain" />
                  </p>
                </div>
              </div>

              <div class="enc-in">
                <div class="ver-pu">
                  <p>Public Secret</p>
                  <p class="proof">
                    <input class="form-control" name="verpu" type="text" v-model="v.pub" placeholder="Puzzle to prove" />
                  </p>
                </div>

                <div class="ver-pr">
                  <p>Proof</p>
                  <p class="proof">
                    <input class="form-control" name="verp" type="text" v-model="v.proof" placeholder="Proof to verify" />
                  </p>
                </div>
              </div>

              <div class="enc">
                <div class="enc-out" v-if="v.truth !== null">
                  <p class="success-msg success bg-success" v-if="v.truth == true">Verification successful</p>
                  <p class="error-msg danger bg-danger" v-if="v.truth == false">Verification failed</p>
                </div>

                <div class="enc-in">
                  <button class="btn btn-primary" @click="verify()" :disabled="!v.depth || !v.size || !v.pub || !v.proof">Verify Proof</button>
                  <button class="btn btn-danger" @click="reset(2)" :disabled="!v.depth && !v.size & !v.pub && !v.proof">Reset</button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  
  </div>
</template>

<script>
import * as Config from '../../conf/constants';
import { verifyProof, generateProofAsString } from '../../util/hasher';

export default {
  name: 'Weapons of Truth',
  data: () => ({
    h: { g: generateProofAsString, v: verifyProof },
    o: false,
    p: {pub: null, size: Config.DEFAULT_SIZE, fields: 1, raw: [], tree: [], show: false},
    d: {depth: Config.DEFAULT_DEPTH, fields: 1, raw: [], proof: null},
    v: {depth: Config.DEFAULT_DEPTH, size: Config.DEFAULT_SIZE, pub: null, proof: null, truth: null},
    msg: 'Weapons of Truth',
  }),
  methods: {
    create: function () {
      if (!Array.isArray(this.p.raw)) {
        console.warn('Error parsing array value');
        return;
      } else if (!this.p.size || !this.p.fields || !this.p.raw.length) {
        console.warn('Error generating tree, missing args');
        return;
      }
      let m = JSON.stringify(this.p.raw), s = this.p.size;
      let pub = this.h.g(m,s);
      if (pub) {
        this.p.show = false;
        this.p.pub = pub;
      } else {
        console.warn('Error creating pub key');
        return;
      }
      let t = [{depth: 0, private: m}], e;
      for (let i = 1; i < this.p.size; i++) {
        e = this.h.g(m,i);
        if (e) {
          t.push({depth: i, proof: e});
        } else {
          console.warn('Error creating tree');
          return;
        }
        if (i == (this.p.size - 1)) {
          t.push({depth: this.p.size, public: pub});
        }
      }
      this.p.tree = t;
    },
    proof: function () {
      if (!Array.isArray(this.d.raw)) {
        console.warn('Error parsing array value');
        return;
      } else if (!this.d.depth || !this.d.fields || !this.d.raw.length) {
        console.warn('Error generating proof, missing args');
        return;
      }
      let m = JSON.stringify(this.d.raw), d = this.d.depth;
      let p = this.h.g(m,d);
      if (p) {
        this.d.proof = p;
      } else {
        console.warn('Error creating proof');
        return;
      }
    },
    verify: function () {
      let s, d, p, pub;
      if (typeof this.v.pub !== 'string') {
        console.warn('Error verifying proof, bad pub key');
        this.v.truth = false;
        return;
      } else if (this.v.pub.length !== (Config.DEFAULT_CHAR_LENGTH + 2)) {
        console.warn('Error verifying proof, bad pub key');
        this.v.truth = false;
        return;
      } else if (!this.v.proof) {
        console.warn('Error verifying proof, invalid proof');
        this.v.truth = false;
        return;
      } else if (this.v.proof.length !== (Config.DEFAULT_CHAR_LENGTH + 2)) {
        console.warn('Error verifying proof, invalid proof');
        this.v.truth = false;
        return;
      } else if (!this.v.depth) {
        console.warn('Error verifying proof, invalid depth');
        this.v.truth = false;
        return;
      } else if (!this.v.size) {
        console.warn('Error verifying proof, invalid chain size');
        this.v.truth = false;
        return;
      } else {
        s = parseInt(this.v.size);
        d = parseInt(this.v.depth);
        p = this.v.proof.substring(2);
        pub = this.v.pub.substring(2);
      }
      try {
        this.v.truth = this.h.v(p, pub, s, d);
      } catch (e) {
        console.warn(e);
        this.v.truth = false;
      }
    },
    reset: function (t) {
      if (typeof t !== 'number') {
        return;
      }
      switch(t) {
        case 0: {
          this.p = {pub: null, size: Config.DEFAULT_SIZE, fields: 1, raw: [], tree: [], show: false};
          break;
        }
        case 1: {
          this.d = {depth: Config.DEFAULT_DEPTH, fields: 1, raw: [], proof: null};
          break;
        }
        case 2: {
          this.v = {depth: Config.DEFAULT_DEPTH, size: Config.DEFAULT_SIZE, pub: null, proof: null, truth: null};
        }
      }
    }
  }
}
</script>

<style scoped>
#opts {
  margin-top: 4em;
  margin-bottom: 4em;
}
.close-x {
  font-size: 2em;
  margin-right: 0.5em;
  color: #ff7070;
  top: -7px;
  position: relative;
}
.card {
  border-color: #000;
  box-shadow: inset 0 0 10px #000000;
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
.error-msg, .success-msg {
  padding: 1em;
  color: #ffffff;
  border-radius: 5px;
}
span.descr {
  font-size: 0.75em;
  font-style: italic;
  color: #eee;
}
div.wrapt div {
  display: inline-block;
  margin-right: 1em;
}
input.pubkey {
  background: transparent;
  color: #ff7070;
  border-color: #ff7070;
}
.btn {
  margin-right: 1em;
}
</style>