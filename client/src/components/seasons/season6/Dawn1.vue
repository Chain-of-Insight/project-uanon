<template>
  <div class="dawn-wrap" v-if="rdy">

    <div class="content-s dawn puzzle-content" v-if="p.id">

      <div class="wr">
        <div id="book">
          <div class="page cover front" data-density="hard">
            <h1 class="tempest">CANTO IV</h1>
          </div>
          <div class="page" id="start"></div>
          <div class="page">
            <div class="poem-i">
              <h3 class="campir" v-if="p.liber" v-html="p.liber"></h3>
            </div>
            <div class="poem-i">
              <div class="result">
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/108.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/118.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/110.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/120.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/115.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/105.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/120.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/116.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/121.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/102.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/111.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/117.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/114.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/105.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/103.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/104.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/116.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/110.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/120.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/102.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/105.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/118.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/122.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/114.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/111.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/120.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/116.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/118.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/110.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/116.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/121.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/116.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/118.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/110.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/116.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/121.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/116.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/118.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/111.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/120.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/110.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/105.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/110.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/116.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/110.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/116.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/104.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/114.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/120.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/116.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/104.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/105.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/114.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/116.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/110.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/116.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/104.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/105.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/114.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/116.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/110.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/120.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/111.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/110.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/104.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/117.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/110.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/100.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/114.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/100.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/115.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/118.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/110.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/116.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/121.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/115.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/118.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/110.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/116.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/104.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/105.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/114.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/116.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/110.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/120.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/111.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/110.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/104.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/117.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/110.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/100.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/114.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/100.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/115.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/118.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/110.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/116.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/121.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/105.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/103.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/104.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/116.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/116.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/118.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/111.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/120.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/116.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/104.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/105.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/114.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/116.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/121.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/102.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/111.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/117.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/114.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/102.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/111.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/117.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/114.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/120.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/116.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/118.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/110.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/116.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/121.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/116.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/104.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/114.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
                <img src="https://uanon.s3.amazonaws.com/fb44de717e6070d4847bce0180abbed8376e3711784b3ff3b413772bc98f0dd9/101.png"/>
              </div>
            </div>
            <div class="poem-i">
              <p v-if="p.cordus" v-html="p.cordus"></p>
            </div>
          </div>
          <div class="page" id="final"></div>
          <div class="page cover back" data-density="hard"></div>
        </div>
      </div>

    </div>

    <div class="content-s danger no-access" v-if="!a">
      <p class="no-access descr" v-html="w"></p>
      <router-link to="/the-new-classic">Back</router-link>
    </div>

    <!-- Soulve -->
    <div class="open-c inner">
      <p class="helper-bar float-right" @click="handleCopen();" v-if="p.secret">
        <span class="icon icon-terminal2"></span>
      </p>
      <p class="helper-bar float-right" @click="gopen();" v-if="p.secret">
        <span class="icon icon-game"></span>
      </p>
    </div>
    <Graphical 
      v-bind:s="p.secret"
      v-bind:r="def[0]"
      v-bind:f="p.fields"
      v-bind:o="gd"
      v-bind:i="i"
      v-bind:p="p"
      v-bind:t="'Liber Cordus'"
      v-bind:dd="false"
      v-bind:l="false"
      v-bind:tx="false"
      v-bind:rst="true"
      v-if="p.secret"
      @proof="retain"
      @gclose="gclose"
    ></Graphical>
    <Console
      v-bind:s="p.secret"
      v-bind:d="cd"
      v-bind:i="i"
      v-bind:r="def[0]"
      v-bind:p="p"
      v-bind:l="false"
      v-bind:q="true"
      v-bind:un="un"
      v-if="p.secret && un"
      @proof="retain"
      @copen="copen"
    ></Console>
  </div>
  <div class="loading" v-if="ld"></div>
</template>

<script>
  import * as api from '../../../util/api';
  import store from '../../../util/storage';
  import { verifyProof } from '../../../util/hasher';
  import * as Config from '../../../conf/constants';
  
  import Graphical from '../../children/soulve/Graphical.vue';
  import Console from '../../children/soulve/Console.vue';

  import { PageFlip } from 'page-flip';

  const CURRENT_I = 0;

  export default {
  name: 'Dawn 1',
  components: { Console, Graphical },
  data: () => ({
    a: false,
    c: Config,
    h: verifyProof,
    i: CURRENT_I,
    p: {
      id: null,
      title: null,
      description: null,
      secret: null,
      template: null
    },
    s: null,
    t: null,
    w: Config.notify.DAWN_PLAYER_WARNING[CURRENT_I],
    cd: false,
    do: store,
    fi: null,
    ld: true,
    gd: false,
    sl: null,
    sv: null,
    un: null,
    api: api,
    def: ['dawn', 6],
    str: {},
    rdy: false,
  }),
  mounted: async function () {
    this.getStr();
    await this.getU();
    await this.getS();
    await this.getTpl();
    this.rdy = true;
    await this.$nextTick();
    this.canto();
  },
  methods: {
    getStr: function () {
      this.str = this.do.store.get();
      // console.log('Store =>', this.str);
    },
    getS: async function () {
      let req = {
        realm: this.def[0]
      };
      let resp = await this.api.request.post('/season/get', req);
      // console.log(resp);
      if (resp.status == 200 && resp.data) {
        let d = resp.data;
        if (d.message) {
          let s = d.message, i = CURRENT_I;
          if (s[i]) {
            this.s = s[i];
            await this.getSl();
          }
        }
      }
    },
    getSl: async function () {
      let r = this.def[0],
          d;
      let req = {
        realm: r
      };
      let resp = await this.api.request.post('/season/get', req);
      if (resp.status == 200 && resp.data) {
        d = resp.data;
        let s = d.message;
        if (Array.isArray(s)) {
          this.sl = s.length;
        }
      }
    },
    getU: async function () {
      let resp = await this.api.request.get('/user/me'), data;
      if (resp.status == 200 && resp.data) {
        data = resp.data;
        if (data['message']) {
          if (data.message.observer) {
            this.o = data.message.observer;
            if (this.o['agentName']) {
              this.un = this.o.agentName.replace(/\s/g, '');
            }
            // console.log('Observer', this.o);
          }
        }
      }
    },
    /**
     * @param {Number} n : Index
     */
    getTpl: async function () {
      let i = CURRENT_I;
      let r = this.def[0];
      let d;
      let req = {
        index: i, 
        realm: r
      };
      // No proof required (only token)
      try {
        let resp = await this.api.request.post('/puzzle/get', req);
        if (resp.status == 200 && resp.data) {
          d = resp.data;
          if (d.message) {
            this.make(d.message);
            this.a = true;
            this.ld = false;
          }
        }
      } catch (e) {
        console.error(e);
        this.a = false;
        this.ld = false;
      }
    },
    /**
     * @param {Object} m : Response object.data
     */
     make: async function (m) {
      this.p.id = (m.id) ? m.id : null;
      this.p.title = (m.title) ? m.title : null;
      this.p.description = (m.description) ? m.description : null;
      this.p.secret = (m.secret) ? m.secret : null;
      this.p.operation = (m.operation) ? m.operation : null;
      this.p.previous = (m.previous) ? m.previous : null;
      this.p.payload = (m.payload) ? m.payload : null;
      this.p.hint = (m.hint) ? m.hint : null;
      this.p.files = (m.files) ? m.files : null;
      this.p.fields = (m.fields) ? m.fields : 1;
      this.p.fieldNames = (m.fieldNames) ? m.fieldNames : null;
      this.p.template = (m.template) ? m.template : null;
      this.p.liber = (m.liber) ? m.liber : null;
      this.p.cordus = (m.cordus) ? m.cordus : null;
      if (this.p.payload) {
        this.p.format = (this.p.payload['format']) ? this.p.payload.format : null;
      }
      // console.log('Current Puzzle =>', this.p);
    },
    /**
     * @param {String} s : Public key
     * @param {String} h : Private Proof
     */
     prove: function (h, s) {
      let v = false;

      // console.log('Verifying Proof =>', [h, typeof h]);

      if (typeof h !== 'string') {
        return false;
      } else if (h.length !== Config.DEFAULT_CHAR_LENGTH) {
        return false;
      }

      const p = this.h(h, s, Config.DEFAULT_SIZE, Config.DEFAULT_DEPTH);

      if (p === true)
        v = true;

      return v;
    },
    /**
     * @param {String} s : Secret
     */
    retain: function (s) {
      if (typeof s !== 'string') {
        return;
      } else if (s.length !== Config.DEFAULT_CHAR_LENGTH) {
        return;
      }
      this.p.proof = s;
      // console.log([this.p, this.def[0], CURRENT_I]);
      if (!this.do.store.update(this.p, this.def[0], CURRENT_I)) {
        console.warn("Failed updating storage, your solution has not been saved");
      }
    },
    handleCopen: function () {
      document.dispatchEvent(new KeyboardEvent('keypress',{'key':'`'}));
    },
    copen: function (b) {
      this.co = b;
    },
    gopen: function () {
      this.gd = true;
      let b = document.getElementsByTagName('body');
      b[0].style.overflow = 'hidden';
    },
    gclose: function () {
      this.gd = false;
      let b = document.getElementsByTagName('body');
      b[0].style.overflow = '';
    },
    canto: function  () {
      const b = document.getElementById('book');
      const f = new PageFlip(b, {
        width: 600,
        height: 800,
        showCover: true
      });
      f.loadFromHTML(document.querySelectorAll('.page'));
    }
  }
}
</script>

<style scoped>
.loading {
  height: 40vh;
  background-image: url('/img/loading.gif');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
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
  font-size: 1.5em;
}
.helper-bar:nth-of-type(2n) {
  right: calc(2em + 75px);
}
.helper-bar:hover {
  box-shadow: 0 0 5px 10px rgba(230,0,115,0.3);
  text-shadow: 0 0 20px #eee, 0 0 30px #eee, 0 0 40px #ff7070, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff7070;
}
.helper-bar > .icon-game {
  position: relative;
  top: 2px;
}
.dawn-wrap.copen {
  margin-bottom: 70vh;
}
.wr {
  padding: 2em;
}
.tempest {
  text-shadow:
    0 0 5px #ffc373,
    0 0 10px #ffc373,
    0 0 20px #ffc373,
    0 0 40px #a17434,
    0 0 80px goldenrod,
    0 0 90px goldenrod,
    0 0 100px #a17434,
    0 0 150px #a17434;
  font-weight: 800;
  font-size: 200%;
  text-align: center;
  display: block;
  text-transform: uppercase;
  background-color: transparent;
  font-family: 'Special Elite', cursive;
  font-size: 2em;
  letter-spacing: 0.4em;
  position: absolute;
  top: 12%;
  left: 28%;
}
#book {
  margin: auto;
  top: 4em;
  border-radius: 4em;
}
.cover.front, .cover.back {
  filter: sepia(10%) drop-shadow(10px 10px 10px rgba(255,255,224,0.2));
}
.cover.front {
  background: url('https://uanon.s3.amazonaws.com/c7f2e913f7739a1f556243c4fddc18e9b0d9f157f0316524ac322c1bf2425c31/book-cover-02a.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 113% 110%;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
}
.cover.back {
  background: url('https://uanon.s3.amazonaws.com/c7f2e913f7739a1f556243c4fddc18e9b0d9f157f0316524ac322c1bf2425c31/book-cover-02b.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 113% 110%;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
}
#start {
  background: url('https://uanon.s3.amazonaws.com/c7f2e913f7739a1f556243c4fddc18e9b0d9f157f0316524ac322c1bf2425c31/knights-coat-of-arms.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
#final {
  background: url('https://uanon.s3.amazonaws.com/c7f2e913f7739a1f556243c4fddc18e9b0d9f157f0316524ac322c1bf2425c31/cosmiel-and-theodidactus.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.page {
  padding: 20px;
  background-color: #f8f5de;
  background-image: 
    linear-gradient(to right, rgba(255,210,0,0.3), rgba(200, 160, 0, 0.1) 11%, rgba(0,0,0,0) 35%, rgba(200, 160, 0, 0.1) 65%),
    linear-gradient(to left, rgba(255,210,0,0.3), rgba(200, 160, 0, 0.1) 11%, rgba(0,0,0,0) 25%, rgba(200, 160, 0, 0.1) 75%);
  font-family: 'AnglicanText';
  color: #000000;
  overflow: hidden;
  cursor: pointer;
  text-align: center;
}
.page:nth-child(even) {
  border-radius: 1em 0  0 1em;
}
.page:nth-child(odd) {
  border-radius: 0 1em  1em 0;
}
.cover {
  cursor: grab;
  border: solid 1px #333333;
}
.flip-book {
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
  margin: 0 auto;
  display: none;
  z-index: 100
}
.html-book {
  background-size: cover
}
.page .page-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
}
.page .page-content .page-header {
  height: 30px;
  font-size: 100%;
  text-transform: uppercase;
  text-align: center;
}
.page .page-content .page-image {
  height: 100%;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
}
.page .page-content .page-text {
  height: 100%;
  flex-grow: 1;
  font-size: 80%;
  text-align: justify;
  margin-top: 10px;
  padding-top: 10px;
  box-sizing: border-box;
  border-top: solid 1px #f4e8d7;
}
.page .page-content .page-footer {
  height: 30px;
  border-top: solid 1px #f4e8d7;
  font-size: 80%;
  color: #998466;
}
.page.--left {
  border-right: 0;
  box-shadow: inset -7px 0 30px -7px rgba(0, 0, 0, 0.4);
}
.page.--right {
  border-left: 0;
  box-shadow: inset 7px 0 30px -7px rgba(0, 0, 0, 0.4);
}
.page.--right .page-footer {
  text-align: right;
}
.page.hard {
  border: solid 1px #998466;
}
.page.page-cover {
  background-color: #e3d0b5;
  color: #785e3a;
  border: solid 1px #998466;
}
.page.page-cover h2 {
  text-align: center;
  padding-top: 50%;
  font-size: 210%;
}
.page.page-cover.page-cover-top {
  box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5), -2px 0 5px 2px rgba(0, 0, 0, 0.4);
}
.page.page-cover.page-cover-bottom {
  box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5), 10px 0 8px 0px rgba(0, 0, 0, 0.4);
}
/* page contents */
ul, li {
  list-style: none;
  font-size: 1.5em;
}
.poem-i {
  margin: 4em;
  letter-spacing: -0.05em;
}
.poem-i:first-of-type {
  margin-top: 3em;
}
</style>