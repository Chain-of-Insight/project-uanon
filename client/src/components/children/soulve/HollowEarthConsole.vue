<template>
  <div id="uterm" class="console open">
    <div class="console-inner">
      <p class="title-bar">
        <span class="ws"></span>
        <span class="icon icon-terminal1"></span>
      </p>
      <div class="uwrapper">
        <div id="log">
          <p class="log-item" v-for="(l, i) in log" :key="i" v-html="l"></p>
        </div>
        <div class="cli-input" v-if="!dollhouse.started">
          <span class="cyan">{{uni}}</span>@{{r}}:<span class="jaundice">~/{{((r == 'summer') ? (i+1) : i)}}</span><span> $ </span>
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
        <div class="cli-input" v-if="dollhouse.started">
          <span class="cyan" v-if="dollhouse.started == true">{{uni}}</span>@{{r}}:<span class="jaundice">~/HOLLOWEARTH</span><span> $ </span>
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

import * as aes from '../../../util/cipher/aes';
const AES = aes.default.AES;

// Hollow Earth
import Doors from './dollhouse/core/doors';
import Globals from './dollhouse/core/globals';
import Lore from './dollhouse/core/lore';
import { Levels, Rooms } from './dollhouse/core/rooms';
import Tiles from './dollhouse/core/tiles';
import Treasures from './dollhouse/core/treasures';
import * as Util from './dollhouse/core/util';

const DollhouseCore = { 
  doors: Doors.Doors,
  globals: Globals.Globals,
  lore: Lore.Lore,
  levels: Levels,
  rooms: Rooms,
  tiles: Tiles.Tiles,
  treasures: Treasures.Treasures,
  util: Util
};

export default {
  props: {
    s: String,
    d: Boolean,
    r: String,
    i: Number,
    l: Boolean,
    p: Object,
    q: Boolean,
    cf: Object,
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
    aes: aes,
    api: api,
    cmd: ['info', 'download', 'submit', 'next', 'prev', 'clear', 'help'],
    uni: null,
    out: null,
    log: [],
    open: false,
    clog: [],
    clogs: null,
    input: null,
    dollhouse: {
      core: DollhouseCore,
      started: false,
      room: null,
      level: null,
      madness: 0,
      fatigue: 0,
      godlike: false,
      inventory: {
        chests: [],
        keys: [],
        spells: {}
      },
    }
  }),
  mounted: function () {
    if (!this.un) {
      this.uni = 'observer';
    } else {
      this.uni = this.un;
    }
    // Autofocus event
    this.$refs.cli.focus();
    document.getElementById('uterm').addEventListener('click', (e) => {
      if (e.target) {
        if (e.target.id == 'uterm' || e.target.classList.contains('title-bar')) {
          this.$refs.cli.focus();
        }
      }
    });
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
        if (this.dollhouse.started) this.log.push(this.dollhouseCp(this.input));
        else this.log.push(this.cp(this.input));
        this.input = '';
        this.$nextTick(() => {
          t.scrollTop = t.scrollHeight;
        });
      }
    },
    /**
     * @param {String} cmd: Command to parse
     */
    dollhouseCp: function (cmd) {
      // console.log('Dollhouse', cmd, DollhouseCore);
      this.log.push('<span class="cyan">' + this.uni + '</span>@' + this.r + ':<span class="jaundice">~/HOLLOWEARTH/</span><span> $ </span> ' + cmd);
      let invalidMsg = Config.notify.DEFAULT_CLI_ERROR;
      // Cmd
      if (typeof cmd !== 'string') return invalidMsg;
      else cmd = cmd.toUpperCase();
      let msg;
      switch (cmd.charAt(0)) {
        case 'I': {
          msg = this.dollhouseFmt(DollhouseCore.globals.about);
          break;
        }
        case 'H': {
          msg = this.dollhouseFmt(DollhouseCore.globals.help);
          break;
        }
        case 'R': {
          this.dollhouseRoom();
          return;
        }
        case 'T': {
          this.dollhouseSize();
          return;
        }
        case 'K': {
          this.dollhouseInventory(0);
          return;
        }
        case 'C': {
          this.dollhouseInventory(1);
          return;
        }
        case 'Q': {
          this.dollhouse.started = false;
          setTimeout(() => {
            this.$refs.cli.focus();
          }, 0);
          return;
        }
        case 'N':
        case 'S':
        case 'E':
        case 'W': {
          this.dollhouseMove(cmd.charAt(0));
          return;
        }
        case 'F': {
          this.dollhouseFeel(cmd);
          return;
        }
        case 'D': {
          this.dollhouseDig(cmd);
          return;
        }
        case 'U': {
          this.dollhouseUtter(cmd);
          return;
        }
        case 'O': {
          this.dollhouseOpen(cmd);
          return;
        }
        case 'L': {
          this.dollhouseLook(cmd);
          return;
        }
      }
      if (msg) {
        this.log.push(msg);
        this.log.push('<br/>');
      }
    },
    dollhouseFmt: function (str) {
      if (typeof str !== 'string') return '';
      else return str.replaceAll('\n', '<br/>');
    },
    dollhouseMove: function (direction) {
      this.log.push(DollhouseCore.globals.walk.attempt);
      let room = DollhouseCore.rooms[this.dollhouse.room];
      // Check is valid walking direction
      if (room.options.indexOf(direction) == -1) {
        // Direction invalid
        let rand = this.getRandomInt(0, (DollhouseCore.globals.walk.failure.length - 1));
        let failedMsg = DollhouseCore.globals.walk.failure[rand];
        this.log.push(failedMsg);
        return;
      }
      
      // Walk to new room
      let fullDirection;
      switch (direction) {
        case 'N': {
          fullDirection = 'NORTH';
          break;
        }
        case 'S': {
          fullDirection = 'SOUTH';
          break;
        }
        case 'E': {
          fullDirection = 'EAST';
          break;
        }
        case 'W': {
          fullDirection = 'WEST';
          break;
        }
      }
      let previous = JSON.stringify(this.dollhouse.room);
      this.dollhouse.prev = JSON.parse(previous);
      this.dollhouse.room = room.paths[direction];
      let msg = DollhouseCore.globals.walk.success + ' ' + fullDirection;
      this.log.push(msg);
      this.dollhouseRoom();
    },
    dollhouseDig: function (cmd) {
      let room = DollhouseCore.rooms[this.dollhouse.room];
      let parts = (cmd.indexOf('DIG') > -1) ? cmd.replaceAll(" ", "").split('DIG') : cmd.replaceAll(" ", "").split('D');
      let object = parts.pop();
      let chest = DollhouseCore.treasures.chests['level' + room.level];
      let tiles = DollhouseCore.tiles[room.tiles];

      // console.log('dollhouseDig', cmd, object, tiles, chest);

      let dimensions = object.split(',');
      for (let i = 0; i < dimensions.length; i++) {
        dimensions[i] = parseInt(dimensions[i]);
      }

      if (typeof dimensions[0] !== 'number' || typeof dimensions[1] !== 'number') {
        let rand = this.getRandomInt(0, (DollhouseCore.globals.dig.failure.length - 1));
        let failedMsg = DollhouseCore.globals.dig.failure[rand];
        this.log.push(failedMsg);
        this.dollhouseFatigue();
        return;
      } else if (dimensions[0] > room.size.w || dimensions[0] < 1 || dimensions[1] > room.size.l || dimensions[1] < 1) {
        let rand = this.getRandomInt(0, (DollhouseCore.globals.dig.failure.length - 1));
        let failedMsg = DollhouseCore.globals.dig.failure[rand];
        this.log.push(failedMsg);
        this.dollhouseFatigue();
        return;
      } else if (!chest) {
        let rand = this.getRandomInt(0, (DollhouseCore.globals.dig.failure.length - 1));
        let failedMsg = DollhouseCore.globals.dig.failure[rand];
        this.log.push(failedMsg);
        this.dollhouseFatigue();
        return;
      }
      try {
        let tile = tiles.value[(dimensions[0]-1)][(dimensions[1]-1)];
        let excavation = this.h.g(JSON.stringify([tile]), Config.DEFAULT_DEPTH + 1);
        if (excavation.slice(2) !== chest.locked) {
          let rand = this.getRandomInt(0, (DollhouseCore.globals.dig.failure.length - 1));
          let failedMsg = DollhouseCore.globals.dig.failure[rand];
          this.log.push(failedMsg);
          this.dollhouseFatigue();
          return;
        }
        let rand = this.getRandomInt(0, (DollhouseCore.globals.dig.success.length - 1));
        let successMsg = DollhouseCore.globals.dig.success[rand];
        this.log.push(successMsg);
        this.dollhouseStoreChest(chest, room.level);
        this.log.push(DollhouseCore.globals.dig.completed);
      } catch(e) {
        console.log(e);
        let rand = this.getRandomInt(0, (DollhouseCore.globals.dig.failure.length - 1));
        let failedMsg = DollhouseCore.globals.dig.failure[rand];
        this.log.push(failedMsg);
        this.dollhouseFatigue();
        return;
      }
    },
    dollhouseFeel: function (cmd) {
      let room = DollhouseCore.rooms[this.dollhouse.room];
      let parts = (cmd.indexOf('FEEL') > -1) ? cmd.replaceAll(" ", "").split('FEEL') : cmd.replaceAll(" ", "").split('F');
      let object = parts.pop();
      let keyLevel = this.dollhouse.level + 1;
      let key = DollhouseCore.treasures.keys['level' + keyLevel];
      // console.log('dollhouseFeel', cmd, object);
      if (!room['keys']) {
        let rand = this.getRandomInt(0, (DollhouseCore.globals.feel.failure.length - 1));
        let failedMsg = DollhouseCore.globals.feel.failure[rand];
        this.log.push(failedMsg);
        this.dollhouseDizzy();
        return;
      }
      try {
        let proof = this.h.g(JSON.stringify([object]), Config.DEFAULT_DEPTH);
        key.dec = AES.decrypt('cbc', key.value, proof.slice(2));
        if (!key.dec) {
          let rand = this.getRandomInt(0, (DollhouseCore.globals.feel.failure.length - 1));
          let failedMsg = DollhouseCore.globals.feel.failure[rand];
          this.log.push(failedMsg);
          this.dollhouseDizzy();
          return;
        }
        let rand = this.getRandomInt(0, (DollhouseCore.globals.feel.success.length - 1));
        let successMsg = DollhouseCore.globals.feel.success[rand];
        this.log.push(successMsg);
        this.dollhouseStoreKey(key, keyLevel);
        this.log.push(DollhouseCore.globals.feel.completed);
      } catch(e) {
        let rand = this.getRandomInt(0, (DollhouseCore.globals.feel.failure.length - 1));
        let failedMsg = DollhouseCore.globals.feel.failure[rand];
        this.log.push(failedMsg);
        this.dollhouseDizzy();
        console.log(e);
      }
    },
    // Game Lost
    dollhouseGameover: function (type = 0) {
      // Victorious players are immortal:
      if (this.dollhouse.godlike) return;
      // Display death message
      let reason = (type) ? 'fatigue' : 'madness';
      this.log.push(this.dollhouseFmt(DollhouseCore.globals.gameover.failure.msg));
      this.log.push(DollhouseCore.globals.gameover.failure.state);
      this.log.push('<span class="cyan">State</span>: Dead');
      this.log.push('<span class="cyan">Reason</span>: ' + reason);
      // Reset game state and quit to console
      this.dollhouse = {
        core: DollhouseCore,
        started: false,
        room: null,
        level: null,
        madness: 0,
        fatigue: 0,
        inventory: {
          chests: [],
          keys: []
        }
      };
      setTimeout(() => {
        this.$refs.cli.focus();
      }, 0);
    },
    // Game Won
    dollhouseVictory: function () {
      this.dollhouse.godlike = true;
      this.log.push(this.dollhouseFmt(DollhouseCore.globals.gameover.success.msg));
      this.log.push(DollhouseCore.globals.gameover.success.state);
      this.log.push('<span class="cyan">State</span>: Enlightened');
      this.log.push('<span class="cyan">Reason</span>: Cunning');
    },
    dollhouseDizzy: function () {
      let roll = DollhouseCore.util.iChing();
      if (roll) {
        ++this.dollhouse.madness;
        let rand = this.getRandomInt(0, (DollhouseCore.globals.feel.madness.length - 1));
        let failedMsg = DollhouseCore.globals.feel.madness[rand];
        this.log.push(failedMsg);
      }
      if (this.dollhouse.madness >= 3) this.dollhouseGameover(0);
    },
    dollhouseFatigue: function () {
      let roll = DollhouseCore.util.iChing();
      if (roll) {
        ++this.dollhouse.fatigue;
        let rand = this.getRandomInt(0, (DollhouseCore.globals.dig.fatigue.length - 1));
        let failedMsg = DollhouseCore.globals.dig.fatigue[rand];
        this.log.push(failedMsg);
      }
      if (this.dollhouse.fatigue >= 3) this.dollhouseGameover(1);
    },
    dollhouseStoreKey: function (key, level) {
      if (!key.dec || !key.name || typeof level !== 'number') return;
      if (this.dollhouse.inventory.keys[level-2]) return;
      let engraving = (level <= 3) ? key.dec : "\n" + DollhouseCore.util.b64ToUtf8(key.dec);
      this.dollhouse.inventory.keys.push({
        name: key.name, 
        spell: key.value, 
        engraving: this.dollhouseFmt(engraving)
      });
    },
    dollhouseStoreChest: function (chest, level) {
      if (!chest.name || typeof level !== 'number') return;
      if (this.dollhouse.inventory.chests[level-1]) return;
      this.dollhouse.inventory.chests.push({
        name: chest.name, 
        legend: chest.value,
        engraving: "Unknown (this chest is locked)"
      });
    },
    dollhouseStoreProof: function (secret, proof) {
      this.dollhouse.inventory.spells[secret] = proof;
    },
    dollhouseUtter: function (cmd) {
      let parts = (cmd.indexOf('UTTER') > -1) ? cmd.replaceAll(" ", "").split('UTTER') : cmd.replaceAll(" ", "").split('U');
      let object = parts.pop();
      // console.log('dollhouseUtter', cmd, object);
      if (this.dollhouse.level >= 9) {
        let rand = this.getRandomInt(0, (DollhouseCore.globals.incantation.failure - 1));
        let failedMsg = DollhouseCore.globals.incantation.failure[rand];
        this.log.push(failedMsg);
        return;
      }
      let nextLevelKey = 'level' + (this.dollhouse.level + 1);
      let nextLevel = DollhouseCore.levels[nextLevelKey];
      let nextText = DollhouseCore.lore[nextLevel[0].text];
      // Verify Incantation
      try {
        let proof = this.h.g(JSON.stringify([object]), Config.DEFAULT_DEPTH);
        let value = AES.decrypt('cbc', nextText.enc, proof.slice(2));
        if (!value) {
          let rand = this.getRandomInt(0, (DollhouseCore.globals.incantation.failure.length - 1));
          let failedMsg = DollhouseCore.globals.incantation.failure[rand];
          this.log.push(failedMsg);
          return;
        }
        this.dollhouseStoreProof(nextText.secret, proof.slice(2));
      } catch (e) {
        console.log(e);
        let rand = this.getRandomInt(0, (DollhouseCore.globals.incantation.failure.length - 1));
        let failedMsg = DollhouseCore.globals.incantation.failure[rand];
        this.log.push(failedMsg);
        return;
      }
      this.dollhouse.madness = 0;
      this.dollhouse.fatigue = 0;
      let rand = this.getRandomInt(0, (DollhouseCore.globals.incantation.success.length - 1));
      let successMsg = DollhouseCore.globals.incantation.success[rand];
      this.log.push(successMsg);
    },
    dollhouseOpen: function (cmd) {
      let parts = cmd.split(" ");
      let password = parts.pop();
      let chestName = parts.pop();
      // console.log('dollhouseOpen', cmd, chestName, password);
      let targetChest = this.dollhouse.inventory.chests.filter((chest) => {
        return chest.name == chestName;
      });
      if (!targetChest.length) {
        this.log.push(DollhouseCore.globals.open.chest.failure);
        return;
      }
      try {
        let chest = targetChest[0];
        let proof = this.h.g(JSON.stringify([password]), Config.DEFAULT_DEPTH);
        let legend = AES.decrypt('cbc', chest.legend, proof.slice(2));
        for (let i = 0; i < this.dollhouse.inventory.chests.length; i++) {
          if (this.dollhouse.inventory.chests[i].name == chestName) this.dollhouse.inventory.chests[i].engraving = legend;
        }
        this.log.push(DollhouseCore.globals.open.chest.success);
        this.log.push('<span class="cyan">You uncover the following message inside</span>: <a href="https://'+ legend +'" target="_blank">'+ legend +'</a>');
      } catch(e) {
        console.log(e);
        this.log.push(DollhouseCore.globals.open.chest.failure);
        return;
      }
    },
    dollhouseLook: function (cmd) {
      let parts = (cmd.indexOf('LOOK') > -1) ? cmd.replaceAll(" ", "").split('LOOK') : cmd.replaceAll(" ", "").split('L');
      let object = parts.pop();
      let room = DollhouseCore.rooms[this.dollhouse.room];
      // console.log('dollhouseLook', cmd, object);
      if (object.indexOf('DOOR') > -1) {
        let directions = {'N': 'NORTH', 'S': 'SOUTH', 'E': 'EAST', 'W': 'WEST'};
        let char = object.charAt(0);
        let facing = directions[char];
        let doors = [];
        room.doors.forEach((door) => {
          doors.push(DollhouseCore.doors[door]);
        });
        let targetDoor = doors.filter((door)=> {
          return door.facing == facing;
        });
        if (targetDoor.length) this.log.push(targetDoor[0].description);
        else this.log.push(DollhouseCore.globals.look.unknown);
      } else if (object.indexOf('CHEST') > -1) {
        let chestName = object.replace("CHEST", "");
        let targetChest = this.dollhouse.inventory.chests.filter((chest) => {
          // console.log(chest, chestName);
          if (chest['name']) {
            if (chest.name.replaceAll(" ", "") == chestName) return chest;
          }
        });
        if (!targetChest.length) return this.log.push(DollhouseCore.globals.look.unknown);
        let chest = targetChest[0];
        this.log.push('<span class="cyan">Name</span>: ' + chest.name);
        this.log.push('<span class="cyan">Legend</span>: ' + chest.legend);
        this.log.push('<span class="cyan">Engraving</span>: ' + chest.engraving);
      } else if (object.indexOf('KEY') > -1) {
        let targetKey = this.dollhouse.inventory.keys.filter((key) => {
          if (key['name']) {
            if (key.name.replaceAll(" ", "") == object) return key;
          }
        });
        if (!targetKey.length) return this.log.push(DollhouseCore.globals.look.unknown);
        let key = targetKey[0];
        this.log.push('<span class="cyan">Name</span>: ' + key.name);
        this.log.push('<span class="cyan">Spell Binding</span>: ' + key.spell);
        this.log.push('<span class="cyan">Engraving</span>: ' + key.engraving);
      } else {
        this.log.push(DollhouseCore.globals.look.unknown);
      }
    },
    dollhouseInventory: function (type = 0) {
      // Keys
      let n, msgs =[], item, i = 0;
      if (!type) {
        item = 'keys';
        this.dollhouse.inventory.keys.forEach((key) => {
          ++i;
          msgs.push(i + ') <span class="cyan">Name</span>: ' + key.name + ', <span class="cyan">Engraving</span>: ' + key.engraving);
        })
        n = this.dollhouse.inventory.keys.length;
        if (!n) {
          this.log.push('<span class="blood" style="font-style:italic;">You don\'t have any keys</span>');
          return;
        }
      // Chests
      } else {
        item = 'chests';
        this.dollhouse.inventory.chests.forEach((chest) => {
          ++i;
          msgs.push(i + ') <span class="cyan">Name</span>: ' + chest.name + ', <span class="cyan">Engraving</span>: ' + chest.engraving);
        });
        n = this.dollhouse.inventory.chests.length;
        if (!n) {
          this.log.push('<span class="blood" style="font-style:italic;">You don\'t have any chests</span>');
          return;
        }
      }
      if (n > 0) {
        this.log.push('<span class="cyan">You find the following '+ item +' in your inventory: </span>');
        msgs.forEach((msg) => {
          this.log.push(msg)
        });
      }
    },
    dollhouseSize: function () {
      let room = DollhouseCore.rooms[this.dollhouse.room];
      this.log.push('<span class="cyan">The size of this room is</span>: ' + room.size.w + ' x ' + room.size.l);
    },
    dollhouseProof: function (secret) {
      let proof = this.dollhouse.inventory.spells[secret];
      if (!proof) return false;
      else return proof;
    },
    dollhouseRoom: function () {
      if (!this.dollhouse.room) this.dollhouse.room = 0;
      if (!this.dollhouse.level) this.dollhouse.level = 1;

      // console.log(DollhouseCore);

      // Load room data
      let room = DollhouseCore.rooms[this.dollhouse.room];
      let text = DollhouseCore.lore[room.text];
      
      // Guard room access
      if (text.secret) {
        let proof = this.dollhouseProof(text.secret);
        if (!proof) {
          this.log.push('<span class="blood" style="font-style:italic;">'+ DollhouseCore.globals.gate.msg +'</span>');
          this.dollhouse.room = this.dollhouse.prev;
          return;
        } else {
          // Decrypt lore
          try {
            // Decrypt AES
            let b64value = AES.decrypt('cbc', text.enc, proof);
            // Translate b64
            text.value = DollhouseCore.util.b64ToUtf8(b64value);
            text.dec = true;
            this.dollhouse.level = room.level;
          } catch (e) {
            console.log(e);
            this.log.push('<span class="blood" style="font-style:italic;">'+ DollhouseCore.globals.gate.msg +'</span>');
            this.dollhouse.room = this.dollhouse.prev;
            return;
          }
        }
      }

      // Display room status
      this.log.push('<span class="jaundice" style="font-style:italic;">' + this.dollhouseFmt(text.value) + '</span>');
      this.log.push('<span class="cyan">You are located in</span>: ' + room.title);
      this.log.push('<span class="cyan">There are '+ room.objects.length +' objects here:</span> ' + String(room.objects));

      // Victory to those who reach the final room
      if (room.level == 9 && !this.dollhouse.godlike) this.dollhouseVictory();
    },
    dollhouseInit: function () {
      const greeting = this.dollhouseFmt(DollhouseCore.globals.welcome);
      const about = this.dollhouseFmt(DollhouseCore.globals.about);
      this.log.push(greeting);
      this.log.push(about);
      this.dollhouse.room = 0;
      // Print first room
      this.dollhouseRoom();
    },
    /**
     * Returns a random integer between min (inclusive) and max (inclusive).
     * The value is no lower than min (or the next integer greater than min
     * if min isn't an integer) and no greater than max (or the next integer
     * lower than max if max isn't an integer).
     * Using Math.round() will give you a non-uniform distribution!
     */
    getRandomInt: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    /**
     * @param {String} cmd: Command to parse
     */
    cp: function (cmd) {
      this.log.push('<span class="cyan">' + this.uni + '</span>@' + this.r + ':<span class="jaundice">~/' + ((this.r == 'summer' || this.r == 'autumn' || this.r == 'winter' || this.r == 'cryptowinter' || this.r == 'dawn') ? String((this.i + 1)) : String(this.i)) + '</span><span> $ </span> ' + cmd);
      let invalidMsg = Config.notify.DEFAULT_CLI_ERROR, can = this;
      // Cmd
      if (typeof cmd !== 'string') {
        return invalidMsg;
      } else if (cmd.substr(0, 5).toUpperCase() == "START") {
        this.dollhouse.started = true;
        setTimeout(() => {
          this.$refs.cli.focus();
        }, 0);
        this.dollhouseInit();
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
        if (!can.go && location.href.indexOf('rites-of-spring') == -1 && location.href.indexOf('the-land-vomits-ghosts') == -1 && location.href.indexOf('the-same-old-story') == -1) {
          if (this.r !== 'autumn' && this.r !== 'dawn') {
            if (!this.do.store.existsItem(this.p.secret, this.r)) {
              return Config.notify.DEFAULT_NO_ACCESS;
            }
          }
        }
        this.log.push(Config.notify.DEFAULT_NAVIGATION);
        let c = location.href, a = c.split('/'), b = a[(a.length - 1)], u;
        a[(a.length - 1)] = parseInt(b) + 1;

        if (b == "rites-of-spring") {
          u = c.replace('spring/rites-of-spring', 'discover');
          return location.href = u;
        } else if (b == "the-land-vomits-ghosts") {
          u = c.replace('summer/the-land-vomits-ghosts', 'descend');
          return location.href = u;
        } else if (b == "the-same-old-story") {
          u = c.replace('autumn/the-same-old-story', 'echolalia');
          return location.href = u;
        } else if (b == "so-i-can-feel-happier") {
          u = c.replace('winter/so-i-can-feel-happier', 'palilalia');
          return location.href = u;
        } else if (b == "sleep-paralysis") {
          u = c.replace('cryptowinter/sleep-paralysis', 'deny');
          return location.href = u;
        } else if (b == "future-histories") {
          u = c.replace('dawn/future-histories', 'the-new-classic');
          return location.href = u;
        }

        if (a[(a.length - 2)] == 'discover' || b == 'discover') {
          u = c.replace('discover', this.r + '/1');
          return location.href = u;
        } else if (a[(a.length - 2)] == 'descend' || b == 'descend') {
          u = c.replace('descend', this.r + '/1');
          return location.href = u;
        } else if (a[(a.length - 2)] == 'echolalia' || b == 'echolalia') {
          u = c.replace('echolalia', this.r + '/1');
          return location.href = u;
        } else if (a[(a.length - 2)] == 'palilalia' || b == 'palilalia') {
          u = c.replace('palilalia', this.r + '/1');
          return location.href = u;
        } else if (a[(a.length - 2)] == 'deny' || b == 'deny') {
          u = c.replace('deny', this.r + '/1');
          return location.href = u;
        }  else if (a[(a.length - 2)] == 'the-new-classic' || b == 'the-new-classic') {
          u = c.replace('the-new-classic', this.r + '/1');
          return location.href = u;
        }

        if (this.l) {
          u = a.slice(0,(a.length - 1)).join('/');
          if (this.r == 'tutorial') {
            u = u.replace(this.r, 'learn');
          } else if (this.r == 'spring') {
            u += '/rites-of-spring';
          } else if (this.r == 'summer') {
            u += '/the-land-vomits-ghosts';
          } else if (this.r == 'autumn') {
            u += '/the-same-old-story';
          } else if (this.r == 'winter') {
            u += '/so-i-can-feel-happier';
          } else if (this.r == 'cryptowinter') {
            u += '/sleep-paralysis';
          }  else if (this.r == 'dawn') {
            u += '/future-histories';
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
        } else if (this.r == 'summer' && parseInt(b) == 1) {
          delete a[a.length - 1];
          u = a.join('/').replace(this.r, 'descend');
          return location.href = u;
        }  else if (this.r == 'autumn' && parseInt(b) == 1) {
          delete a[a.length - 1];
          u = a.join('/').replace(this.r, 'echolalia');
          return location.href = u;
        } else if (this.r == 'winter' && parseInt(b) == 1) {
          delete a[a.length - 1];
          u = a.join('/').replace(this.r, 'palilalia');
          return location.href = u;
        } else if (this.r == 'cryptowinter' && parseInt(b) == 1) {
          delete a[a.length - 1];
          u = a.join('/').replace(this.r, 'deny');
          return location.href = u;
        } else if (this.r == 'dawn' && parseInt(b) == 1) {
          delete a[a.length - 1];
          u = a.join('/').replace(this.r, 'the-new-classic');
          return location.href = u;
        }

        if (b == "rites-of-spring") {
          u = c.replace('rites-of-spring', '8');
          return location.href = u;
        }
        if (b == "the-land-vomits-ghosts") {
          u = c.replace('the-land-vomits-ghosts', '10');
          return location.href = u;
        }
        if (b == "the-same-old-story") {
          u = c.replace('the-same-old-story', '5');
          return location.href = u;
        }
        if (b == "so-i-can-feel-happier") {
          u = c.replace('so-i-can-feel-happier', '6');
          return location.href = u;
        }
        if (b == "sleep-paralysis") {
          u = c.replace('sleep-paralysis', '1');
          return location.href = u;
        }
        if (b == "future-histories") {
          u = c.replace('future-histories', '1');
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
        <span class="cyan">info : </span><span style="font-style:italic;">Get information about the current puzzle</span><br/>
        <span class="cyan">submit : </span><span class="blood">[String] </span><span style="font-style:italic;">Solve a puzzle</span><br/>
        <span class="cyan">log : </span><span style="font-style:italic;">View your solving logs</span><br/>
        <span class="cyan">download : </span><span style="font-style:italic;">Download puzzle assets (if available)</span><br/>
        <span class="cyan">next : </span><span style="font-style:italic;">Go to next puzzle</span><br/>
        <span class="cyan">prev : </span><span style="font-style:italic;">Go to previous puzzle</span><br/>
        <span class="cyan">clear : </span><span style="font-style:italic;">Clear this terminal</span><br/>
        <span class="cyan">puzzles : </span><span style="font-style:italic;">Return to puzzle list of current season</span><br/>
        <span class="cyan">home : </span><span style="font-style:italic;">Return to the home page</span><br/>
        <span class="cyan">help : </span><span style="font-style:italic;">Show this help message</span><br/>
        <br/>
        `
        return h;
      } else if (cmd.substr(0, 7).toLowerCase() == "puzzles") {
        this.clog.push(cmd);
        this.log.push(Config.notify.DEFAULT_NAVIGATION);
        let u = (window.location.origin) ? window.location.origin : "https://uanon.observer";
        switch (this.r) {
          case "tutorial": {
            u += '/learn';
            break;
          }
          case "spring": {
            u += '/discover';
            break;
          }
          case "summer": {
            u += '/descend';
            break;
          }
          case "autumn": {
            u += '/echolalia';
            break;
          }
          case "winter": {
            u += '/palilalia';
            break;
          }
          case "cryptowinter": {
            u += '/deny';
            break;
          }
          case "dawn": {
            u += '/the-new-classic';
            break;
          }
        }
        return location.href = u;
      } else if (cmd.substr(0, 4).toLowerCase() == "home") {
        this.clog.push(cmd);
        this.log.push(Config.notify.DEFAULT_NAVIGATION);
        let u = (window.location.origin) ? window.location.origin : "https://uanon.observer";
        return location.href = u;
      } else {
        return invalidMsg;
      }
    },
    ig: function () {
      let ig = [];
      if (this.p.title) {
        if (typeof this.p.title == 'object') {
          ig.push(' <span class="cyan-bg">Title:</span>                                     ' + this.p.title.value);
          ig.push(' <span class="cyan-bg">Title<span class="jaundice">->format</span>:</span>           ' + this.p.title.format);
        } else {
          ig.push(' <span class="cyan-bg">Title:</span>                                     ' + this.p.title);
        }
      }
      if (this.p.description) {
        if (typeof this.p.description == 'object') {
          ig.push(' <span class="cyan-bg">Description:</span>                               ' + this.p.description.value);
          ig.push(' <span class="cyan-bg">Description<span class="jaundice">->format</span>:</span>     ' + this.p.description.format);
        } else {
          ig.push(' <span class="cyan-bg">Description:</span>                               ' + this.p.description);
        }
      }
      if (this.p.secret) {
        ig.push(' <span class="cyan-bg">Public Key:</span>                                  ' + this.p.secret);
      }
      if (this.p.operation) {
        let o = (this.p.operation.mainnet == "") ? this.p.operation.testnet : this.p.operation.mainnet;
        ig.push(' <span class="cyan-bg">Operation:</span>                                   ' + o);
      }
      if (this.p.category) {
        ig.push(' <span class="cyan-bg">Category:</span>                                  ' + this.p.category);
      }
      if (this.p.tags) {
        ig.push(' <span class="cyan-bg">Tags:</span>                                  ' + this.p.tags.join(', '));
      }
      if (this.p.points) {
        ig.push(' <span class="cyan-bg">Points:</span>                                  ' + this.p.points);
      }
      if (this.p.code) {
        ig.push('<div class="code">');
        ig.push('<span class="cyan-bg">Code:</span>');
        ig.push(this.p.code);
        ig.push('</div>');
      }
      if (this.p.payload) {
        if (this.p.payload.value) {
          if (Array.isArray(this.p.payload.value)) {
            this.p.payload.value.forEach((v,i) => {
              ig.push(' <span class="cyan-bg">Payload ' + (i+1) +':</span>                 ' + v);  
            });
          } else {
            if (typeof this.p.payload.value == 'object') {
              // ig.push(' <span class="cyan-bg">Payload:</span><pre class="wrapme">'+JSON.stringify(this.p.payload.value)+'</pre>');
              ig.push(' <span class="cyan-bg">Payload:</span> See attachments');
            } else {
              ig.push(' <span class="cyan-bg">Payload:</span>                                 ' + this.p.payload.value);
            }
          }
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
            if (Array.isArray(this.p.payload.format)) {
              for (let i = 0; i < this.p.payload.format.length; i++) {
                ig.push('<span class="cyan-bg">Format '+ (i+1) +':</span>                   ' + this.p.payload.format[i]);
              }
            } else {
              if (!this.p.format) {
                ig.push('<span class="cyan-bg">Format:</span>                               ' + this.p.payload.format);
              }
            }
          }
        }
      }
      if (this.cf) {
        if (this.r == 'summer' && this.i == 6) {
          let p = this.cf.payload;
          let f = this.cf.format;
          ig.push('<span class="cyan-bg">Email Reply:<span class="jaundice">->payload</span>:</span>                ' + p);
          ig.push('<span class="cyan-bg">Email Reply:<span class="jaundice">->format</span>:</span>                 ' + f);
        }
      }
      if (this.p.format) {
        if (Array.isArray(this.p.format) && !Array.isArray(this.p.payload['format'])) {
          this.p.format.forEach((f,i) => {
            ig.push(' <span class="cyan-bg">Format ' + (i+1) + ':</span>                    ' + f);
          });
        } else if (typeof this.p.format == 'string') {
          ig.push(' <span class="cyan-bg">Format:</span>                                    ' + this.p.format);
        }
      }
      if (this.r == 'spring+' && this.p.morals) {
        if (Array.isArray(this.p.morals)) {
          if (this.p.morals.length) {
            ig.push(' <span class="cyan-bg">Fear<span class="jaundice">->format</span>:</span>                      ' + this.p.morals[0].format);
          }
        }
      }
      if (this.p.warning) {
        ig.push(' <span class="cyan-bg">Warning:</span>                                      ' + this.p.warning);
      }
      if (this.p.hint) {
        if (Array.isArray(this.p.hint)) {
          for (let i = 0; i < this.p.hint.length; i++) {
            ig.push(' <span class="cyan-bg">Hint ' + (i+1) + ':</span>                      ' + this.p.hint[i]);
          }
        } else {
          ig.push(' <span class="cyan-bg">Hint:</span>                                      ' + this.p.hint);
        }
      }
      if (this.dl !== true) {
        if (this.p.files) {
          if (Array.isArray(this.p.files)) {
            if (this.p.files.length > 10) {
              ig.push(' <span class="cyan-bg">Attachments:</span><span style="font-style:italic;"> '+ this.p.files.length +' files</span>');
            } else {
              for (let i = 0; i < this.p.files.length; i++) {
                if (typeof this.p.files[i] == 'object') {
                  let link = (this.p.files[i].url) ? this.p.files[i].url : null;
                  let name = (this.p.files[i].file) ? this.p.files[i].file : null;
                  if (!link || !name) {
                    ig.push(' <span class="cyan-bg">Attachment ' + (i+1) + ':</span>               ' + String(this.p.files[i]));  
                  } else {
                    ig.push('<span class="cyan-bg">Attachment ' + (i+1) + ':</span> <a href="' + link + '" class="attch-lnk" target="_blank">' + name + '</a>');
                  }
                } else {
                  ig.push(' <span class="cyan-bg">Attachment ' + (i+1) + ':</span>               ' + String(this.p.files[i]));
                }
              }
            }
          } else {
            ig.push(' <span class="cyan-bg">Attachments:</span>                              ' + String(this.p.files));
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
    top: 51px;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: calc(100vh - 51px);
    max-height: calc(100vh - 51px);
    overflow-y: auto;
    width: auto;
    background-color: rgba(0,0,0,0.9);
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
    word-wrap: break-word;
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
<style>
.wrapme {
  max-width: 100%;
  word-wrap: break-all;
}
</style>