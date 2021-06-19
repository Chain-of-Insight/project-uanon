<template>
  <transition name="modal">
    <div class="modal-mask-t" :class="{modalMask: a}">
      <div class="modal-wrapper-t">
        <div class="modal-dialog-t">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" v-if="c">{{c.name}}</h5>
              <h5 class="modal-title" v-if="a">Apps</h5>
              <div type="button" class="close" @click="close();">
                <span class="close-x" aria-hidden="true">&times;</span>
              </div>
            </div>
            <div class="modal-body" :class="{email: (c) ? (c.i==0) : false, albert: (c) ? (c.i==4) : false, horror: b=='horror'}">
              <div v-if="c">
                <div v-if="c.i==0 && c.email">
                  <Email
                    v-bind:b="b"
                    v-bind:e="c.email"
                    v-if="!c.email['spring1']"
                  ></Email>
                  <SpringEmail1
                    v-bind:e="c.email"
                    v-if="c.email['spring1']"
                  ></SpringEmail1>
                </div>
                <div v-if="c.i==0 && !c.email">
                  <span style="font-style:italic;position:relative;top:1rem;left:1rem;">Inbox empty</span>
                </div>
                <div v-if="c.i==1 && !c.list.length">Found nothing of interest in path: <span style="font-style:italic;">/uanon/hemma</span></div>
                <div v-if="c.i==2 && c.msg">{{c.msg}}</div>
                <div v-if="c.i==3 && !c.list.length">Found nothing of interest in path: <span style="font-style:italic;">/uanon/rusl</span></div>
                <div v-if="c.i==4 && c.einstein">
                  <HeadScratcher
                    v-bind:e="c.einstein"
                    @proof="retain"
                  ></HeadScratcher>
                </div>
              </div>
              <div v-if="a">
                <div class="icons icons-top">
                  <div class="i-file f" @click="load(1)"></div>
                  <div class="i-mail mail" @click="load(0)">
                    <span class="count-m notify bg-danger" v-if="ne">{{ne}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Email from './Email.vue';
  import SpringEmail1 from './SpringEmail1.vue';
  import HeadScratcher from './Einstein.vue';

  export default {
    props: {
      a: Boolean,
      b: String,
      c: Object,
      ne: Number
    },
    components: { Email, SpringEmail1, HeadScratcher },
    emits: ['pclose', 'popen', 'proof'],
    data: () => ({}),
    mounted: async function () {},
    methods: {
      load: function (i) {
        this.$emit('popen', i);
      },
      close: function () {
        this.$emit('pclose', -1);
      },
      retain: function (p) {
        this.$emit('proof', p);
      }
    }
  }
</script>

<style scoped>
.modal-title {
  text-transform: capitalize;
}
.modal-body {
  background-image: none;
  color: #333333;
  background-color: #ffffff;
}
.i-mail {
  background: url('/img/594692b3eaff8c473127e8135d65989255562f622f2dbcfb5b748bcfe66059fa.svg');
}
.i-inf {
  background: url('/img/fa6834a5b0f20fb555bfbe67ed97896e7e645f11cf0a9ddc57756e220e1a8f3a.svg');
}
.i-file {
  background: url('/img/6bb98f9d3c55ea4970b8e63e5cad6e4df7cfedde9c6bb28cc87a130e557fdf94.svg');
}
.i-trash {
  background: url('/img/ee1226237fcc1e43b1ed4fb65437642d1fddbc59261b93eaa72ec64a3ce45538.svg');
}
.icons-top, .icons-top div {
  display: inline-block;
}
.icons-top div {
  margin: auto;
}
.i-mail, 
.i-file,
.i-trash,
.i-inf {
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  background-position: left top;
  background-size: cover;
  position: relative;
  cursor: pointer;
}
.modal-body {
  min-height: 20vh;
}
.modal-wrapper-t {
  max-height: 90vh;
}
.modal-body.email {
  max-height: 85vh;
  overflow: auto;
}
.modal-body.email,
.modal-body.albert {
  margin: 0;
  padding: 0;
}
.count-m {
  border-radius: 50%;
  color: #ffffff;
  font-size: 10px;
  width: 15px;
  height: 15px;
  float: right;
  position: relative;
  top: 25px;
  left: -5px;
  text-align: center;
}
</style>