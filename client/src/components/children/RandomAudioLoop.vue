<template>
  <div class="sp_rand"></div>
</template>

<script>
import * as Config from '../../conf/constants';
const AudioIndexer = [Config.externals.sounds.defaultLoop];

export default {
  props: {
    o: Boolean, // On / Off
    d: Number,  // Delay
    i: Number,  // Selected index (overide)
    r: Number,  // Realm,
    v: Number   // Volume
  },
  data: () => ({
    a: AudioIndexer,
    b: Config.externals.sounds.defaultLoop.path,
    p: null,
    s: null,
    t: null,
    el: null,
    la: null,
    fn: null,
    def: [0]
  }),
  watch: {
    o: {
      handler: function(nV) {
        if (!nV) {
          this.stop();
          this.el.volume = 0;
          this.fn = null;
          if (this.la) {
            this.la.el.volume = 0;
          }
        } else {
          setTimeout(() => {
            this.select();
          }, this.d);
        }
      }
    }
  },
  mounted: async function () {
    if (!this.i) {
      switch (this.r) {
        case this.def[0]: {
          this.s = this.a[0];
          this.t = this.a[0].type;
          break;  
        }
        default: {
          this.s = this.a[0];
          this.t = this.a[0].type;
          break;
        }
      }
    } else {
      if (typeof this.i == 'number') {
        console.warn('Error parsing numeric value', [this.i, typeof this.i]);
      }
      this.s = this.a[this.i];
      this.t = this.a[this.i].type;
    }
  },
  methods: {
    select: function () {
      if (!this.s) {
        console.warn('Error parsing object value', [this.s, typeof this.s]);
        return;
      } else if (!this.s['path'] || !this.s['type'] || !this.s['files']) {
        console.warn('Error parsing object value', [this.s, typeof this.s]);
        return;
      } else if (!Array.isArray(this.s.files)) {
        console.warn('Error parsing object value', [this.s, typeof this.s]);
        return;
      } else if (!this.s.files.length) {
        console.warn('Error parsing object value', [this.s, typeof this.s]);
        return;
      }
      let n = this.getI(this.s.files.length);
      if (n > (this.s.files.length - 1)) {
        n = this.s.files.length - 1;
      }
      if (n < 0) {
        n = 0;
      }      
      this.p = this.b + this.s.files[n];
      this.play();
      let f = Math.random() >= 0.5, d;
      if (f) {
        d = this.getI(this.d, 0) + 10000;
      } else {
        d = this.d;
      }
      this.fn = setTimeout(() => {
        if (this.o) {
          this.select();
        }
      }, d);
    },
    play: function () {
      if (this.o) {
        // console.log('RA Play =>', [this.s, this.p, this.t]);
        let el = new Audio(this.p);
        this.la = this.el;
        this.el = el;
        this.el.volume = this.v;
        this.el.play();
      }
    },
    pause: function() {
      this.el.pause();
    },
    stop: function () {
      if (this.el) {
        this.el.pause();
        this.el.currentTime = 0;
      }
    },
    getI: function (max, min = 0) {
      min = Math.ceil(min);
      max = Math.floor(max);
      let n = Math.round(Math.random() * (max - min + 1)) + min;
      if (n < min) n = min;
      if (n > max) n = max;
      return n;
    }
  },
}
</script>

<style scoped></style>