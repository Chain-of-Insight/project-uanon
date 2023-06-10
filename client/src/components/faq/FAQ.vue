<template>
  <div class="pane-s observer-faq">
    <div class="pane-s faq">
      <h1 class="blood">{{ msg }}</h1>
    </div>
    <div class="content-s faq">
      <div class="about jumbotron">
        <div class="title-bar">
          <h3>Wisdom from the game Creator...</h3>
        </div>
        <hr class="ruler">
        <div class="blade">
          <p>Humankind-ness is timid and apoplectic; this voids the sacred numbers.</p>
          <p>One dares not say 'I think,' 'I am,' but quotes some saint or sage.</p>
          <p>But before the blade of grass or blowing rose, are u a mob?</p>
          <p>We sustain in this epoch by turning darkness into light.</p>
          <div class="h">
            <p>To behold my challenge of 6 ærthly sæsons, you must collect Truths and prizes contained within the passing of sæsons.</p>
            <p>Forge Comprehension by combining these Truths.</p>
            <p>The first player to forge Comprehension will ascend to the final prize.</p>
            <p>Long may you succeed in unlocking the big picture.</p>
          </div>
          <p>— U.</p>
        </div>
      </div>
      <img class="c" :src="b + '/c0803faba13d2380a83881e26dd7328fd28cbec9bdca34ca6ac273e5540080ca/c091569ec0bc8530d91d36fb4ea10dc8dc9f4250f812aa385607dc4c085eb1e9.jpg'" />
      <div class="pane-s faq">
        <h1>Frequently Asked Questions</h1>
      </div>
      <ul id="faq">
        <li>
          <div class="faq-item">
            <h3>How do I sign up?</h3>
            <p class="resp">Complete the <router-link to="/register">enlistment test</router-link> if you are worthy</p>
          </div>
        </li>
        <li>
          <div class="faq-item">
            <h3>How do I login?</h3>
            <p class="resp">Kindly install the <a href="https://templewallet.com/" target="_blank">Temple</a> browser extension, or create a wallet with <a href="https://kukai.app/" target="_blank">Kukai</a>, and affiliate your <a href="https://tezos.com/" target="_blank">Tezos</a> account. A Tezos account is required for login.</p>
          </div>
        </li>
        <li>
          <div class="faq-item">
            <h3>How do I play?</h3>
            <p class="resp">Complete the <router-link to="/learn">tutorials</router-link> and redeem your first ascension</p>
          </div>
        </li>
        <li>
          <div class="faq-item">
            <h3>I found data that might be from U?</h3>
            <p class="resp">Verify information on external sites is signed by PGP signature <a href="https://keys.openpgp.org/search?q=D2E932FCD8F37168CD4F8D17E779F9B4BA2391A0" target="_blank">D2E932FCD8F37168CD4F8D17E779F9B4BA2391A0</a>. Verify information published to Tezos is from address <a :href="a" target="_blank">tz1UanonKsn9xEoSRTwKNmfhvCUC3wcj6NJb</a>.</p>
          </div>
        </li>
        <li>
          <div class="faq-item">
            <h3>Why does this exist?</h3>
            <p class="resp">Freedom of Speech is a First Amendment right defined in the Heavenly Constitution. It guarantees that Government cannot infringe on an individual’s right to Prove whatever they’d like. Project Uanon is not the Federal Government. Therefore it is impossible, by definition, for Project Uanon to be in violation of an individual's 1st Amendment rights to free speech. For this reason can We tell the Truth, to each their own.</p>
          </div>
        </li>
        <li>
          <div class="faq-item">
            <h3>What are the prize bounties?</h3>
            <ul class="bounties">
              <li>𝐒𝐄𝐀𝐒𝐎𝐍 𝟎 - 𝐊𝐧𝐨𝐰𝐥𝐞𝐝𝐠𝐞 𝐨𝐟 𝐭𝐡𝐞 𝐣𝐨𝐮𝐫𝐧𝐞𝐲</li>
              <li>𝐒𝐄𝐀𝐒𝐎𝐍 𝟏 - 2677 XTZ (Solved 09/04/2021)</li>
              <li>𝐒𝐄𝐀𝐒𝐎𝐍 𝟐 - 2680 XTZ (Solved 13/07/2021)</li>
              <li>𝐒𝐄𝐀𝐒𝐎𝐍 𝟑 - 2680 XTZ (Solved 30/01/2022)</li>
              <li>𝐒𝐄𝐀𝐒𝐎𝐍 𝟒 - 3000 XTZ (Solved 31/12/2022)</li>
              <li>𝐒𝐄𝐀𝐒𝐎𝐍 𝟓 - 3000 XTZ (Solved 02/01/2023)</li>
              <li>𝐒𝐄𝐀𝐒𝐎𝐍 𝟔 (𝐅𝐈𝐍𝐀𝐋 𝐏𝐑𝐈𝐙𝐄) - 10000 XTZ</li>
              <li>𝐂𝐎𝐌𝐌𝐔𝐍𝐈𝐓𝐘 𝐏𝐑𝐈𝐙𝐄 - 7000 XTZ (Split between the top 10 players)</li>
            </ul>
          </div>
        </li>
        <li>
          <div class="faq-item">
            <h3>What is True?</h3>
            <p class="resp">The opposite of False</p>
          </div>
        </li>
      </ul>
      <div class="night-n">
        <p>2 lnqngzgom yzvc olzgmdhflvyuvgf z qzflzgo'm evjchdzwu</p><p>5 jnlmhgzcm zln z ihlvxhg</p>
      </div>
    </div>
  </div>
</template>

<script>
const IS_TESTNET = (process.env.VUE_APP_TEZOS_NETWORK == 'delphinet') ? true : false;
export default {
  name: 'FAQ',
  data: () => ({
    a: (!IS_TESTNET) ? 'https://tzkt.io/tz1UanonKsn9xEoSRTwKNmfhvCUC3wcj6NJb' : 'https://delphinet.tzkt.io/tz1UanonKsn9xEoSRTwKNmfhvCUC3wcj6NJb',
    b: process.env.VUE_APP_STORAGE_BASE,
    msg: 'We All Have Questions'
  })
}
</script>

<style scoped>
.observer-faq {
  max-width: 1200px;
}
.title-bar h3 {
  background: -webkit-linear-gradient(#ff7070, #333);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 0px 6px #ff7070;
}
.about {
  animation: mythos ease 160s;
  -webkit-animation: mythos ease 160s;
  -moz-animation: mythos ease 160s;
  -o-animation: mythos ease 160s;
  -ms-animation: mythos ease 160s;
  animation-iteration-count: infinite;
}
.about p {
  background: -webkit-linear-gradient(#fff, #ff7070);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 0px 6px #ff7070;
}
.ruler {
  border-top: 1px solid rgba(255,255,55,0.1);
  margin-top: 1em;
  margin-bottom: 1em;
}
#faq {
  list-style: none;
  padding-left: 0;
}
#faq li {
  margin-top: 2em;
}
.faq-item h3 {
  font-size: 2rem;
}
.night-n {
  color: #000000;
}
img.c {
  max-width: 100%;
  margin: auto;
  margin-top: 4em;
  margin-bottom: 4em;
  display: block;
  border-radius: 1em;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  filter: hue-rotate(225deg);
  animation: transmogrify ease 60s;
  -webkit-animation: transmogrify ease 60s;
  -moz-animation: transmogrify ease 60s;
  -o-animation: transmogrify ease 60s;
  -ms-animation: transmogrify ease 60s;
  animation-iteration-count: infinite;
}
ul.bounties {
  list-style-type: none;
  margin-top: 0.5em;
  padding-left: 0;
}
ul.bounties li {
  margin-top: 0 !important;
}
@keyframes mythos {
  0% {filter: hue-rotate(0deg);}
  50% {filter: hue-rotate(255deg);}
  100% {filter: hue-rotate(0deg);}
}
@-moz-keyframes mythos {
  0% {filter: hue-rotate(0deg);}
  50% {filter: hue-rotate(255deg);}
  100% {filter: hue-rotate(0deg);}
}
@-webkit-keyframes mythos {
  0% {filter: hue-rotate(0deg);}
  50% {filter: hue-rotate(255deg);}
  100% {filter: hue-rotate(0deg);}
}
@-o-keyframes mythos {
  0% {filter: hue-rotate(0deg);}
  50% {filter: hue-rotate(255deg);}
  100% {filter: hue-rotate(0deg);}
}
@-ms-keyframes mythos {
  0% {filter: hue-rotate(0deg);}
  50% {filter: hue-rotate(255deg);}
  100% {filter: hue-rotate(0deg);}
}
@keyframes transmogrify {
  0% {filter: hue-rotate(225deg);}
  50% {filter: hue-rotate(25deg);}
  100% {filter: hue-rotate(225deg);}
}
@-moz-keyframes transmogrify {
  0% {filter: hue-rotate(225deg);}
  50% {filter: hue-rotate(25deg);}
  100% {filter: hue-rotate(225deg);}
}
@-webkit-keyframes transmogrify {
  0% {filter: hue-rotate(225deg);}
  50% {filter: hue-rotate(25deg);}
  100% {filter: hue-rotate(225deg);}
}
@-o-keyframes transmogrify {
  0% {filter: hue-rotate(225deg);}
  50% {filter: hue-rotate(25deg);}
  100% {filter: hue-rotate(225deg);}
}
@-ms-keyframes transmogrify {
  0% {filter: hue-rotate(225deg);}
  50% {filter: hue-rotate(25deg);}
  100% {filter: hue-rotate(225deg);}
}
</style>