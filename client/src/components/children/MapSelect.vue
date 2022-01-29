<template>
  <div class="selectors" :class="{'open': s}">
    <div class="close-x" v-if="s">
      <span class="float-right" @click="close();">×</span>
    </div>
    <div class="mopen" v-if="!s" @click="open();">
      <span class="fas fa-globe"></span>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  props: {
    g: Object, // Game Type
    s: Boolean // Toggle Display
  },
  emits: ['answer','toggle'],
  data: () => ({
    map: null,
    selected: {lat:null,lng:null}
  }),
  // mounted: async function () {
  //   console.log('g', this.g);
  // },
  methods: {
    render: function () {
      this.map = new window.google.maps.Map(document.getElementById("map"), {
        center: {lat:0,lng:0},
        zoom: 1,
        maxZoom: 20,
        minZoom: 1,
        streetViewControl: false,
        mapTypeControl: true,
        fullscreenControl: false,
      });

      window.google.maps.event.addListener(this.map, 'click', (evt) => {
        this.set(evt.latLng);
      });
    },
    set: function (selected) {
      if (!selected.lat || !selected.lng) {
        console.warn("Error parsing selected location");
        return;
      }
      new window.google.maps.Marker({
        position: selected,
        map: this.map
      });
      this.parse(selected);
    },
    parse: function (l) {
      new window.google.maps.Geocoder().geocode({'latLng': l}, (r, s) => {
        // console.log('Geocoder', r,s);
        if (s == window.google.maps.GeocoderStatus.OK) {
          if (r.length) {
            for (let i = 0; i < r.length; i++) {
              if (r[i].types) {                
                // Country
                if (this.g.type.toLowerCase() == 'country') {
                  if (r[i].types.indexOf('country') > -1) {
                    if (r[i].formatted_address.toLowerCase() !== "united kingdom") {
                      this.$emit('answer', r[i].formatted_address);
                    }
                  } else if (r[i].types.indexOf('administrative_area_level_1') > -1) {
                    if (r[i].address_components[1].long_name.toLowerCase() == "united kingdom") {
                      this.$emit('answer', r[i].address_components[0].long_name);
                    }
                  }
                }
                // State / Province
                if (this.g.type.toLowerCase() == "state / province") {
                  if (r[i].types.indexOf('administrative_area_level_1') > -1) {
                    let a = r[i].formatted_address.split(',');
                    a = a[0];
                    this.$emit('answer', a.replace('State of ',''));
                  }
                }
                // Capital City
                if (this.g.type.toLowerCase() == "capital city") {
                  if (r[i].types.indexOf('locality') > -1) {
                    let a = r[i].formatted_address.split(',');
                    a = a[0];
                    this.$emit('answer', a);
                  }
                }
              }
            }
          }
        }
      });
    },
    open: function () {
      this.$emit('toggle');
      this.render();
    },
    close: function () {
      this.$emit('toggle');
    }
  },
}
</script>

<style scoped>
div.selectors {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2000;
}
div.selectors.open {
  width: 700px;
  height: 700px;
}
#map {
  width: 100%;
  height: 100%;
}
.mopen, .close-x {
  cursor: pointer;
}
.mopen {
  position: relative;
  bottom: 50px;
  left: 2.5em;
  border-radius: 20%;
  background-color: rgba(148,49,91,0.1);
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  padding: 0.25em;
}
.mopen:hover {
  box-shadow: 0 0 5px 10px rgba(230,0,115,0.3);
  text-shadow: 0 0 20px #eee, 0 0 30px #eee, 0 0 40px #ff7070, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff7070;
}
.mopen span {
  width: 47px;
  height: 45px;
  font-size: 22px;
  left: 12px;
  top: 12px;
  position: relative;
}
.close-x {
  font-size: 22px;
}
</style>