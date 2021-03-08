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
  methods: {
    play: function () {
      this.$refs.m.play();
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