<template>
  <div class="audio">
    <audio id="sp_int" loop autobuffer :autoplay="a" v-if="l" ref="m">
      <source :src="p" :type="t" />
    </audio>
    <audio id="sp_int" autobuffer :autoplay="a" v-if="!l" ref="m">
      <source :src="p" :type="t" />
    </audio>
  </div>
</template>

<script>
export default {
  props: {
    p: String,  // Path (url)
    t: String,  // Type
    a: Boolean, // Autoplay
    l: Boolean  // Loop
  },
  emits: ['fin'],
  data: () => ({
    d: null
  }),
  mounted: async function () {
    let o;
    this.$watch('p', (n, og) => {
      if (n !== o) {
        this.$refs.m.load();
      }
      o = og;
    });
    this.$refs.m.onloadedmetadata = () => {
      this.d = this.$refs.m.duration * 1000;
      if (this.a)  {
        setTimeout(() => {
          this.$emit('fin', true);
        }, this.d);
      }
    };
  },
  methods: {
    play: function () {
      this.$refs.m.play();
      if (this.d) {
        setTimeout(() => {
          this.$emit('fin', true);
        }, this.d);
      }
    },
    pause: function () {
      this.$refs.m.pause();
    },
    stop: function () {
      this.$refs.m.pause();
      this.$refs.m.currentTime = 0;
    }
  },
}
</script>

<style scoped></style>