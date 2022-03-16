<template>
  <div id="app">
    <div :class="{'open': o}" id="nav">
      <span class="menu icon icon-power" @click="b();" title="Main menu"></span>
      <ul :class="{'hidden': !o, 'open': o, 'menu-nav': true}" @click="b();">
        <li class="li nav-home">
          <router-link to="/">Home</router-link>
        </li>
        <li class="li nav-login" v-if="l">
          <router-link to="/leaders">Leaders</router-link>
        </li>
        <li class="li nav-tools">
          <router-link to="/tools">Tools</router-link>
        </li>
        <li class="li nav-faq">
          <router-link to="/faq">FAQ</router-link>
        </li>
        <li class="li nav-login" v-if="l">
          <a href="#" @click="logout();">Logout</a>
        </li>
        <li class="li nav-login" v-if="l" alt="Unsyncs wallet connection allowing you to reconnect or switch between accounts" title="Unsyncs wallet connection allowing you to reconnect or switch between accounts">
          <a href="#" @click="unpair();">Unpair</a>
        </li>
      </ul>
      <div class="float-right controls">
        <span class="icon icon-volume_off" v-if="!s" @click="a();" title="Toggle sound"></span>
        <span class="icon icon-volume_up" v-if="s" @click="a();" title="Toggle sound"></span>
        <router-link class="profile" to="/observer" title="Agent profile">
          <span class="icon icon-user-secret"></span>
        </router-link>
      </div>
      <Audio 
        v-bind:p="w.path"
        v-bind:t="w.type"
        v-bind:a="true"
        v-bind:l="true"
        v-if="s"
      ></Audio>
      <RandomAudioLoop
        v-bind:r="0"
        v-bind:d="60000"
        v-bind:v="0.35"
        v-bind:o="s"
      ></RandomAudioLoop>
    </div>
    <div class="spacer" v-if="o">&nbsp;</div>
    <router-view />
  </div>
</template>

<script>
import * as Config from './conf/constants';
import Audio from './components/children/Audio.vue';
import RandomAudioLoop from './components/children/RandomAudioLoop.vue';
import * as Auth from './util/auth';

import { isLoggedIn } from 'axios-jwt';

export default {
  name: 'App',
  components: { Audio, RandomAudioLoop },
  data: () => ({
    l: isLoggedIn(),
    o: false,
    s: false,
    w: Config.externals.sounds.default
  }),
  mounted: async function () {
    if (localStorage.getItem('_c')) {
      let s = JSON.parse(localStorage.getItem('_c'));
      if (s['sound']) {
        if (s['sound']) {
          if (s['sound']['ambient']) {
            if (s.sound.ambient === true) {
              this.s = true;
            }
          }
        }
      }
    }
  },
  methods: {
    login: async function() {
      this.l = await Auth.login();
    },
    logout: async function() {
      await Auth.logout();
      location.reload();
    },
    unpair: async function() {
      localStorage.removeItem('beacon:accounts');
      await this.logout();
    },
    a: function () {
      this.s = !this.s;
      if (this.s === true) {
        if (localStorage.getItem('_c')) {
          let s = JSON.parse(localStorage.getItem('_c'));
          s.sound.ambient = true;
          localStorage.setItem('_c', JSON.stringify(s));
        } else {
          let s = {
            sound: {
              ambient: true,
              fx: true
            }
          }
          localStorage.setItem('_c', JSON.stringify(s));
        }
      } else {
        if (localStorage.getItem('_c')) {
          let s = JSON.parse(localStorage.getItem('_c'));
          s.sound.ambient = false;
          localStorage.setItem('_c', JSON.stringify(s));
        }
      }
    },
    b: function () {
      this.o = !this.o;
    }
  }
}
</script>

<style scoped>
.menu {
  position: relative;
  top: 15px;
  left: 1.5em;
  cursor: pointer;
  color: #ff7070;
}
.menu-nav {
  padding-top: 2em;
  padding-bottom: 2em;
}
.float-right.controls {
  position: absolute;
  right: 1.5em;
  top: 15px;
}
.float-right.controls span {
  cursor: pointer;
  color: #ff7070;
}
.spacer {
  height: calc(50px + 2em);
}
</style>