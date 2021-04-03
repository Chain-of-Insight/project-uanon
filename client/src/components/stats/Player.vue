<template>
  <div class="pane-s observer" v-if="!l">
    <p>{{ c.notify.DEFAULT_PLAYER_WARNING }}</p>
  </div>
  <div class="pane-s observer" v-if="l">
    <div class="pane-s-inner observer" v-if="o">
      <div class="pane-s observer-profile card">
        <div class="profile card-body">
          <div class="close-x">
            <span class="float-right">
              <router-link class="bck-x" to="/leaders">&times;</router-link>
            </span>
          </div>
          <div class="avatar">
            <img class="avatar-i float-right" :src="'/img/' + o.avatar" alt="Profile image" v-if="o.avatar" />
          </div>
          <div class="display-name">
            <h1 v-if="o.userName">{{o.userName}}</h1>
            <h1 v-if="o.agentName && !o.userName">{{o.agentName}}</h1>
          </div>
          <div class="agent team">
            <div v-if="o.team">
              <span class="cyan">Team: </span><span>{{ c.TEAMS[o.team].name }}</span>
              <p class="descr team-descr quote">"{{ c.TEAMS[o.team].description }}"</p>
            </div>
          </div>
          <div class="badges" v-if="p">
            <div v-if="p.badges">
              <h3 id="badge-title">Badges:</h3>
              <div class="ubadge" v-for="(b,i) in ab" :key="i">
                <div class="badge-item" :class="b.type" :title="cd[b.type]">
                  <img class="ubadge" :class="b.type" :src="'/img/' + c.externals.images.badges[b.type]" />
                  <p class="ribbon">
                    <span class="ribbon-content">{{b.name}}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="skills" v-if="p">
            <div v-if="p.skills">
              <h3 id="skill-title">Skills:</h3>
              <div class="uskill">
                <div class="pwrap">
                  <span>Defense:</span>
                  <div class="progress" v-if="typeof p.skills.defense == 'number'">
                    <div class="progress-bar" :style="'width:' + p.skills.defense + '%;'" v-if="p.skills.defense > 0"></div>
                    <div class="progress-bar" :style="'width:50%;'" v-if="p.skills.defense == 0"></div>
                  </div>
                </div>
                <div class="pwrap">
                  <span>Destiny:</span>
                  <div class="progress" v-if="typeof p.skills.destiny == 'number'">
                    <div class="progress-bar" :style="'width:' + p.skills.destiny + '%;'" v-if="p.skills.destiny > 0"></div>
                    <div class="progress-bar" :style="'width:50%;'" v-if="p.skills.destiny == 0"></div>
                  </div>
                </div>
                <div class="pwrap">
                  <span>Dexterity:</span>
                  <div class="progress" v-if="typeof p.skills.dexterity == 'number'">
                    <div class="progress-bar" :style="'width:' + p.skills.dexterity + '%;'" v-if="p.skills.dexterity > 0"></div>
                    <div class="progress-bar" :style="'width:50%;'" v-if="p.skills.dexterity == 0"></div>
                  </div>
                </div>
                <div class="pwrap">
                  <span>Stamina:</span>
                  <div class="progress" v-if="typeof p.skills.stamina == 'number'">
                    <div class="progress-bar" :style="'width:' + p.skills.stamina + '%;'" v-if="p.skills.stamina > 0"></div>
                    <div class="progress-bar" :style="'width:30%;'" v-if="p.skills.stamina == 0"></div>
                  </div>
                </div>
                <div class="pwrap">
                  <span>Strength:</span>
                  <div class="progress" v-if="typeof p.skills.strength == 'number'">
                    <div class="progress-bar" :style="'width:' + p.skills.strength + '%;'" v-if="p.skills.strength > 0"></div>
                    <div class="progress-bar" :style="'width:50%;'" v-if="p.skills.strength == 0"></div>
                  </div>
                </div>
                <div class="pwrap">
                  <span>Willpower:</span>
                  <div class="progress" v-if="typeof p.skills.willpower == 'number'">
                    <div class="progress-bar" :style="'width:' + p.skills.willpower + '%;'" v-if="p.skills.willpower > 0"></div>
                    <div class="progress-bar" :style="'width:50%;'" v-if="p.skills.willpower == 0"></div>
                  </div>
                </div>
                <div class="pwrap">
                  <span>Wisdom:</span>
                  <div class="progress" v-if="typeof p.skills.wisdom == 'number'">
                    <div class="progress-bar" :style="'width:' + p.skills.wisdom + '%;max-width:100%;'" v-if="p.skills.willpower > 0"></div>
                    <div class="progress-bar" :style="'width:50%;max-width:100%;'" v-if="p.skills.willpower == 0"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="truths" style="clear:both;" v-if="t && !ld">
            <h3 id="truths-title">Truths:</h3>
            <div class="truth" v-for="(truth, i) in t" :key="i">
              <TruthShard
                v-bind:r="truth.asset.realm"
                v-bind:n="truth"
              >
              </TruthShard>
            </div>
          </div>
          <div class="loading" v-if="ld == true"></div>
        </div>
      </div>
      <div class="back-ctrl">
        <router-link class="bck" to="/leaders">Back to Leaderboard</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import * as Config from '../../conf/constants';
import * as api from '../../util/api';
import * as Auth from '../../util/auth';
import { getTruths } from '../../util/contract';

import TruthShard from '../children/token/TruthShard.vue';

export default {

  name: 'Player',
  components: { TruthShard },
  data: () => ({
    c: Config,
    l: Auth.isLoggedIn(),
    m: 'Agent File',
    o: null,
    p: null,
    t: null,
    ld: false,
    cd: {brain: "Logical prowess", ruler: "Will to power", dither: "The rest is silence", openmind: "To be is to be perceived", paranoid: "I'm not a conspiracy theorist, I'm a conspiracy analyst", optimist: "In a cooperative society there's no jealousy because there's no need for jealousy", sage: "Welcome Pilgrim, to the great journey", skeptic: "A lot of things about the way we're all living now ... are completely insane", cracker: "Mess with the best WannaCry like the rest"},
    api: api
  }),
  mounted: async function () {
    await this.get();
    await this.truths();
  },
  computed: {
    ab: function () {
      return this.p.badges.filter(b => (b.awarded === true || (b.value / b.len) >= 0.5));
    }
  },
  methods: {
    get: async function () {
      if (this.$route.params) {
        if (this.$route.params.id) {
          const r = {
            tzAddress: this.$route.params.id,
            $embed: 'quiz'
          };
          let resp = await this.api.request.get('/user', r), data;
          if (resp.status == 200 && resp.data) {
            data = resp.data;
            if (data['docs']) {
              if (data.docs.length) {
                this.o = data.docs[0];
                if (this.o['quiz']) {
                  if (this.o.quiz['result']) {
                    if (typeof this.o.quiz.result == 'string') {
                      this.p = JSON.parse(this.o.quiz.result);
                    }
                  }
                }
              } else {
                let c = location.href, a = c.split('/'), b;
                a.pop();
                a[(a.length - 1)] = 'leaders';
                b = a.join('/');
                return location.href = b;
              }
            }
          }
        }
      }
    },
    truths: async function () {
      if (this.$route.params) {
        if (this.$route.params.id) {
          this.ld = true;
          let t;
          try {
            t = await getTruths(this.$route.params.id);
          } finally {
            this.ld = false;
          }
          if (t.length) {
            this.t = t;
            // console.log('Truths =>', this.t);
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.observer-profile {
  padding: 4em;
  max-width: 1200px;
  width: 80vw;
  min-height: 80vh;
  margin: auto;
  box-shadow: 0 0 5px 10px #333;
  -webkit-box-shadow: 0 0 5px 10px #333;
  -moz-box-shadow: 0 0 5px 10px #333;
  background-color: rgba(148,49,91,0.4);
  border-radius: 1em;
  margin-bottom: 4em;
}
.bck {
  position: relative;
  top: -1.5em;
  padding-bottom: 4em;
}
.bck-x {
  position: relative;
  top: -3.5em;
  right: -2.5em;
  text-decoration: none;
  color: #ffffff;
  font-size: 32px;
}
.back-ctrl {
  max-width: 1080px;
  margin: auto;
}
.avatar-i {
  background-image: url('/img/70b45e53738c932605aa1d5cbfebb78d9983731547096b929e5f2dfbcec08008.png');
  border-radius: 2em;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  max-width: 400px;
  margin-left: 1em;
}
.agent.team {
  padding-top: 1.5em;
}

.team-descr {
  padding-top: 1.5em;
  padding-bottom: 1.5em;
  font-style: italic;
}
img.join {
  max-width: 200px;
  padding-bottom: 1.5em;
  display: block;
  cursor: pointer;
}
#badge-title, #skill-title, #truths-title {
  margin-top: 2em;
}
.ubadge, .badge-item {
  height: 100px;
  display: inline-block;
  margin-right: 0.5em;
  margin-bottom: 1em;
}
.badge-item {
  background-size: cover;
  background: #F09819;
  background: -webkit-linear-gradient(to right, #EDDE5D, #F09819);
  background: linear-gradient(to right, #EDDE5D, #F09819);
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  border-radius: 50%;
  width: 145px;
  height: 145px;
}
.badge-item.brain {
  background: linear-gradient(45deg, #b9abcf 50%, #b9f2ff 50%);
  background-size: 22px 22px;
}
.badge-item.sage {
  background: #348F50;
  background: -webkit-linear-gradient(to right, #56B4D3, #b9f2ff);
  background: linear-gradient(to right, #56B4D3, #b9f2ff);
}
.badge-item.ruler {
  background: linear-gradient(135deg, #eceddc 25%, transparent 25%),
  linear-gradient(225deg, #eceddc 25%, transparent 25%),
  linear-gradient(315deg, #eceddc 25%, transparent 25%),
  linear-gradient(45deg, #eceddc 25%, transparent 25%); 
  background-size: 21px 21px;
}
.badge-item.cracker {
  background: #2b1331;
  background-image: linear-gradient(315deg, #2b1331 0%, #b9abcf 74%);
}
img.ubadge {
  position: relative;
  top: 18px;
  left: 22px;
  padding: 0.25em;
}
.uskill .pwrap > span {
  width: 20%;
  font-size: 0.75em;
}
.uskill .pwrap > div {
  width: 80%;
  float: right;
  position: relative;
  top: 15px;
  left: -50px;
}
.loading {
  height: 40vh;
  background-image: url('/img/loading.gif');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-top: 2em;
}
div.truth {
  display: inline-flex;
}
/***
 * BADGES
 */
.badges {
  padding-top: 1em;
}
.ribbon {
  font-size: 10px;
  top: -25px;
  max-width: 100px;
  position: relative;
  background: #ba89b6;
  color: #fff;
  text-align: center;
  padding: 1em 2em;
  margin: 2em auto 3em;
}
.ribbon:before, .ribbon:after {
  content: "";
  position: absolute;
  display: block;
  bottom: -1em;
  border: 1.5em solid #986794;
  z-index: -1;
}
.ribbon:before {
  left: -2em;
  border-right-width: 1.5em;
  border-left-color: transparent;
}
.ribbon:after {
  right: -2em;
  border-left-width: 1.5em;
  border-right-color: transparent;
}
.ribbon .ribbon-content:before, .ribbon .ribbon-content:after {
  content: "";
  position: absolute;
  display: block;
  border-style: solid;
  border-color: #804f7c transparent transparent transparent;
  bottom: -1em;
}
.ribbon .ribbon-content:before {
  left: 0;
  border-width: 1em 0 0 1em;
}
.ribbon .ribbon-content:after {
  right: 0;
  border-width: 1em 1em 0 0;
}
</style>