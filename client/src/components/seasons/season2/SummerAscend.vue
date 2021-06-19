<template>
  <div class="summer-wrap the-land-vomits-ghosts" v-if="rdy">

    <div class="content-s existence container" v-if="p.id">

      <div class="wr">
        <div id="book">
          <div class="page cover front" data-density="hard">
            <h1 class="fountain-of-youth">Canto II</h1>
            <img id="evermore" src="https://uanon.s3.amazonaws.com/c7f2e913f7739a1f556243c4fddc18e9b0d9f157f0316524ac322c1bf2425c31/dante.jpg">
          </div>
          <div class="page" id="start"></div>
          
          <div id="chastity" class="page">
            <img class="mermaid" alt="Calisto, or the Chaste Nymph" title="Calisto, or the Chaste Nymph" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/Arabella-Hunt.jpg'" />
          </div>

          <div id="land" class="page">
            <div class="poem-ii">
              <ul class="land-page v1">
                <li style="text-decoration:underline;font-weight:bold;">Ndth Rtyoel Hærtndab</li>
                <li>ndth rtyoel hærtndab hwndabyoyoabel rtow wirtrtel ovthutesthæ</li>
                <li>ovrtthyoabel utabel ovænohw, beabutnoabyo rtthyo abnoel hæabnoel ndab elrthæno strtabestutth</li>
                <li>thest'hw ovutthebbe hæhæthestab-hæabhwhæabel hæabyoyohw hæthelrthæabel ovth owthuthwest stabthnoest</li>
                <li>esthæab estthno utrtrtow estrtst hæutndndthnowi hwrtnowihw rtow stutrtndthhwab hæhæthyoab estthndab thhw</li>
                <li>yortebbeabel thnoestrt elabndrtnotheb uthæthesthænd hæthesthæ esthæab yoæutabhw</li>
              </ul>
            </div>
          </div>
          
          <div id="vomits" class="page">
            <div class="poem-ii">
              <ul class="land-page v1">
                <li>esthæab estutababhw hæabel estrt hæthno</li>
                <li>hæutwiwithnowi esthæabnd, yortutthnowi esthæabnd ab estrtutestututrtuthw yortutab</li>
                <li>ovutwiwithno' hæhæabno thest hæabhw rtutabut abnoel elrtnoab</li>
                <li>esthæab utrtutnoel ebabndabnoestabel strtest beabstest esthæab utabthno elutrtsthw ebrtrtyo</li>
                <li>noabthwihæovrtuthw abnoel elhæabyoyoabuthw hwstabestestabut thno esthæab strtrtyo</li>
                <li>bethelhw styoabththnowi owrtrtestovabyoyo hæthesthæ hæthhw hæabnoel abnoel hwrtebbe</li>
                <li>hæab hæabel hæhæabest hæab wirtest, abnoel thest hæabhwno'est ab yortest</li>
              </ul>
            </div>
          </div>
          
          <div id="ghosts" class="page">
            <div class="poem-ii">
              <ul class="land-page v1">
                <li>nort rtnoab benoabhæ esthæabth hæabutab strtrtut,</li>
                <li>hæab hæabutab abyoyo thnonortebabnoest estrt wiutababel'hw inutelwindabnoest</li>
                <li>esthæab ebrtutnoestutth hæabhw ebrtndovuthwestthnowi hæthesthæ yothowab yothbeab ab yortnowi</li>
                <li>hæthovabutnoabestthnowi utrtyoebabnort. hæthesthæ ab yortnowi estabyoab rtow hwutebebabhwhw yothbeab In-yort</li>
                <li>owabutndabuthw, owthhwhæabuthw, owthwihæestabuthw,</li>
                <li>abutabno owrtrtyohw hæabel ab styoabebab thno stutrtelutebestthrtno</li>
              </ul>
            </div>
          </div>

          <div id="erotic" class="page">
            <img class="Scene-V" alt="Lovers of Valdaro" title="Lovers of Valdaro" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/Pompeii.jpg'" />
          </div>

          <div id="pillage" class="page">
            <img class="big eddie-ii" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/Eduardus-II.jpg'" alt="In other words it is war minus the shooting" title="In other words it is war minus the shooting" />
          </div>

          <div id="kindness" class="page">
            <div class="poem-ii">
              <ul class="land-page v1">
                <li>esthæab ebrtabhwestabyo yothnoab hæabhw esthæab styoabebab rtow hwabelutebestthrtno</li>
                <li>esthæab ebrtutabyo utababow hærtutyoel ndabbeab thrtut elabhwabel thno utabowyoabebestthrtno</li>
                <li>esthæab hærtndabno hæabyobeabel hæthesthæ wiutabebab abnoel stabutowabebestthrtno</li>
                <li>abnoel hæab inuthwest benoabhæ hæab hæabutab hæabututthrtuthw estrtrt</li>
                <li>nortesthæthnowi ndrtutovthel, thesthw estututab. hæab hæabutab wiyortutthrtuthw</li>
              </ul>
              <h3 class="boom">OVRTRTND!</h3>
              <p class="boom">&#8734;</p>
            </div>
          </div>

          <div id="elisha" class="page">
            <img class="jeered" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/Elisha.jpg'" alt="42 youths" title="42 youths" />
          </div>

          <div id="bears" class="page poem-ii land-page v2">
            <p class="bl"><strong>Esthæabno rtnoab elabth thest ebabndab, hwstrtthyoabel esthæab stabutabelab yothbeab utabthno. yothbeab rtthyo thno ab owyoabndab, thest stabthnoabel, esthæab hææutest abestestabebbe hwutelelabno, rtelelabut esthæabno abyoabutabno,</strong></p>
            <img class="jeered ctr" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/Bears.jpg'" alt="Go up, you baldhead!"  title="Go up, you baldhead!" />
            <p class="bl"><strong>hæabutelabut esthæabno ab stutnoebhæ thno esthæab hærtndov, hærtestestabut esthæabno esthæab youtnoebhæ thrtut ebrtnohwutndab. owrtut uthw, thest hæabel ab ebabnoebabutrtuthw owutndab, ndrtutab youthwest, ndabno hæhært ndabelab bethyoyothnowi hærtwiwithabhw</strong></p>
          </div>

          <div id="shackled" class="page">
            <div class="poem-ii">
              <ul class="land-page v2">
                <li>hwabyoyothnowi stutrtutest owutyoyoth yothbeab hææyoesthæth yothutabhwestrtebbe</li>
                <li>thest ndabelab estthelabhw utrtebbe hæthesthæ ab elthyothwiabnoest ndrtebbe</li>
                <li>ebrtnoowuthwabel hæabutab esthæab stabrtstyoab, thnoowuthwabel thno esthæab abutthyo</li>
                <li>stutrtowabhwhwabel estrt abinabebest yothbeab inabhæhw thno esthæab hwabsoutabyo. estrt hæthno,</li>
                <li>thest ebabndab thno esthæab ndrtutnothnowi hæthesthæ ab hæabutnothnowi abnoel,</li>
                <li>hæthesthærtutest esthæab hæututestthnowi, hæabhw ab ovututelabno</li>
              </ul>
            </div>
          </div>

          <div id="empire" class="page">
            <img class="liber" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/Ganymede.jpg'" alt="Qualis artifex pereo" title="Qualis artifex pereo" />
          </div>

          <div id="justice" class="page">
            <div class="poem-ii">
              <ul class="land-page v2">
                <li>rtnoyoth ebabutestabthno hæabhw elrtutovest;</li>
                <li>ab ndthesthæthebabyo estabyoab, nort hwrtutyo benorthæhw hæabyoyo</li>
                <li>yothovabutestth hæabnoest estrt hæabyoyo, owutababelrtnd ebabyoyoabel owrtut hwhæabyoyohw</li>
                <li>owthabutebab hæabhw esthæab ovyorthæ, beababst thrtutut æuthw estrt esthæab hwhærthæ</li>
                <li>thest abststæuthw rtuthæabyoyo hæabhw utthwihæest thno abthwihæestth-owrtutut</li>
                <li>hæabel Ovthwi Ovutrtesthæabut bethyoyo Ndrtesthæabut thno hæabut hwestrtutab</li>
                <li>hæthesthæ abyoyo rtow uthw</li>
              </ul>
            </div>
          </div>

          
          <div id="raped" class="page">
            <div class="poem-ii">
              <ul class="land-page v2 v3">
                <li>hæabestebhæthnowi, hæab elthelno'est yortutab hæabut abnothndrtutab</li>
                <li style="font-size:0.95rem;">&nbsp;</li>
                <li>stababst ndth strtabnd:</li>
                <li style="font-size:0.95rem;">&nbsp;</li>
                <li>Ndrtesthæabut hæabhw ndth rtyoel hærtndab</li>
                <li>wirtrtel hæthyoyo thhw yortrtestabel, thno ndth rtyoel hærtndab</li>
                <li>utabyothwithrtno thhw ovututnoabel elrthæno, thno ndth rtyoel hærtndab</li>
                <li>bethnoelnoabhwhw thhw hwhæabebbeyoabel, thno ndth rtyoel hærtndab</li>
                <li>inuthwestthebab hæabhw ovababno utabstabel, thno ndth rtyoel hærtndab</li>
              </ul>
              <p class="boom">&#8734;</p>
            </div>
          </div>

          <div id="murderers" class="page">
            <div class="poem-ii">
              <ul class="land-page v3">
                <li>hæabestebhæthnowi, hæab elthelno'est yortutab hæabut abnothndrtutab</li>
                <li>esthæab yoabnoel utrtndthesthw wihærthwesthw, thno ndth rtyoel hærtndab</li>
                <li style="font-size:0.95rem;">&nbsp;</li>
                <li>hæab wirtest stthhwestrtyohw hæthesthæ abthabhw, ebrtutututstestthrtno abnoel yothabhw</li>
                <li>estututhwestabel hwnoabbeabhw abnoel elabovesthw hæthesthærtutest ovutæbehw</li>
                <li>hwuthwstthebthrtuthw noabhæovrtutnohw yothutab thno rtutut hærtutno</li>
                <li>uthwabel estrt esthæab stabthno, utabebbe ovrtelthabhw nortest wiutabthno</li>
              </ul>
            </div>
          </div>

          <div id="hold" class="page">
            <div class="poem-ii">
              <ul class="land-page v3">
                <li>ebhærtst yothndovhw nortest estutababhw. hwstabnoel yothutabhw nortest hææyoesthæ.</li>
                <li>hwababbe utabnowiænoebab, estututesthæ. esthæab ebutabhwthabhwest thrtutesthæ</li>
                <li>hærtthhwest stabthno nortest styoabnohw, ***** ow**be thrtutut styoabnohw</li>
                <li style="font-size:0.95rem;">&nbsp;</li>
              </ul>
              <p class="bl-2">ovabnoelthesthw hæthyoyo ovæest uthw elrthæno, thno ndth rtyoel hærtndab. ututndrtuthw abutab yoabhæ northæ, thno ndth rtyoel hærtndab. hwabelabestthutabhw rtow owabthesthæ, thno ndth rtyoel hærtndab. utabstabuthw abutab stutabthhwabel, thno ndth rtyoel hærtndab. elabndrtnohw elutabhwhwabel hæabyoyo, thno ndth rtyoel hærtndab. thnoowabnoesthw abutab noabthyoabel, thno ndth rtyoel hærtndab. hwstthutthesthw abutab inabthyoabel, thno ndth rtyoel hærtndab. wiututelwiabhw wiutrthæ estabthyohw, thno ndth rtyoel hærtndab.</p>
              <p class="bl-2">th utrthwab rtovhwebabnoab, abyoabebestuttheb, hæabestthnowi rtutesthæabutel yoabovrtut ovabnoæesthæ hwestutovovrtutno owabthesthæ abnoel rtutut owabutndhw stutrtelutebab wiutthyoestth wiututov, abnoel, rtutut bethelhw elabstabnoel rtno hwhæthowestth youtebbe, hwabab, rtutut nduthwab thhw yothowab owrtut elæesthæ thhw rtyoel, hwrt, elrtno'est ovyoabndab ndab owrtut estututesthæ th estrtyoel, hwrt...</p>
            </div>
          </div>

          <div id="post" class="page">
            <div class="poem-ii v3">
              <p class="bl-2">wirtrtel hæthyoyo thhw yortrtestabel, thno ndth rtyoel hærtndab. utabyothwithrtno thhw ovututnoabel elrthæno, thno ndth rtyoel hærtndab. bethnoelnoabhwhw thhw hwhæabebbeyoabel, thno ndth rtyoel hærtndab. inuthwestthebab hæabhw ovababno utabstabel, thno ndth rtyoel hærtndab. ndututelabutabuthw hærtyoel strthwest, thno ndth rtyoel hærtndab. esthæab yoabnoel utrtndthesthw wihærthwesthw thno ndth rtyoel hærtndab</p>
              <p class="boom">&#8734;</p>
              <img class="desire" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/devour.jpg'" />
            </div>
          </div>

          <div class="page">
            <div>
              <h1 class="title-p" v-if="p.title">{{p.title}}</h1>
            </div>
          </div>

          <div class="page">
            <div class="recette pemeal">
              <h3>PEAMEAL BACON</h3>
              <p>Canadians know peameal bacon as an iconic national breakfast food, but the back bacon’s backstory is even richer than its flavour. For those who don’t know, peameal bacon is wet-cured pork loin from the back of the hog that has been trimmed of fat and rolled in cornmeal, creating a yellow crust.  Originally, it was rolled in crushed yellow peas, hence the name peameal. It is much leaner than regular bacon.</p>
              <ul class="pemeal list-unstyled">
                <li><strong>YIELD:</strong></li>
                <li>Makes about 4 pounds (1.8 kg)</li>
                <li><strong>INGREDIENTS:</strong></li>
                <li>3 quarts (3 liters) cold water</li>
                <li>1 cup (300 g) maple syrup</li>
                <li>2/3 cup (150 g) kosher salt</li>
                <li>2 tablespoons Prague powder #1 cure <span style="font-style:italic;">(optional)</span></li>
                <li>10 peppercorns</li>
                <li>1 tablespoon mustard seeds</li>
                <li>1 bay leaf</li>
                <li>4 1/2 pounds (2 kg) boneless lean pork loin</li>
                <li>1 1/2 cups (215 g) coarse cornmeal or 1 1/2 cups (340 g) dried yellow peas, roughly milled in a food processor</li>
              </ul>
            </div>
          </div>

          <div class="page">
            <div class="recette pemeal-2">
              <ul class="pemeal list-unstyled">
                <li><strong>PREPERATION:</strong></li>
                <li>1. In a plastic (preferably) container large enough to hold both the brine and the meat, mix together the water, maple syrup, salt, cure, and spices.</li>
                <li>2. Scoop out a scant 1 cup (200 ml) brine, and use it to load the brine injector. Then, inject the loin every 3/4 to 1 inch (2 to 2.5 cm), inserting the needle about 3/4 inch (2 cm) deep. Try to distribute the brine evenly over the loin. Place the loin in the container with the remaining brine, and keep the meat submerged with the help of a plate or an object of a similar build. Cover and refrigerate for 4 full days.</li>
                <li>3. Remove the loin from the brine and pat it dry. Then roll it in the meal of your choosing. Give it a day's rest, uncovered, in the fridge, so the meal and meat form as one.</li>
                <li>4. You have two options on cooking it: you can slice it and griddle it for a minute on each side (for thin slices that is), or you can bake it at 375°F (190°C) for about an hour, or until it has a core temperature of 142°F (61°C), then slice it. I like it the first way, especially when it gets a bit burnt on the edges and I have added a dash of maple syrup that caramelizes a bit toward the end.</li>
              </ul>
            </div>
          </div>

          <div class="page">
            <img class="ant-colonies" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/Newfoundland.png'" alt="Cuper's Cove" title="Cuper's Cove" />
          </div>

          <div class="page gypsy">
            <div class="recipe gypsy">
              <h3>GYPSY BACON</h3>
              <p>A very traditional and old-fashioned form of bacon, Gypsy bacon is prepared with garlic and paprika giving it its characteristic spice that is similar to Hungarian bacon. It is rich in flavor and pungent in aroma and usually cooked over and enjoyed around the campfire. Gypsy bacon has been around for years and the practice of making and cooking it is a tradition for many gypsies around the world. It is a simple and easy way to prepare bacon when you are constantly on the go and do not have access to a stove.</p>
              <ul class="gypsy list-unstyled">
                <li><strong>INGREDIENTS:</strong></li>
                <li>1 cured slab bacon, rind attached</li>
                <li>1 slice of paradice, to be served hot</li>
              </ul>
            </div>
          </div>

          <div class="page">
            <div class="recipe gypsy-2">
              <ul class="gypsy list-unstyled">
                <li><strong>PREPERATION:</strong></li>
                <li>1. Score the bacon in 1 inch square sections down to the rind.</li>
                <li>2. Skewer it on a long fork or stick and hold it over the fire until the bacon starts to cook and sizzle and the rind shrinks and curls up the bacon sections.</li>
                <li>3. Serve with paradice (heated).</li>
                <li style="font-style:italic">4. (Optional): sprinkle paprika and serve with sliced raw onions.</li>
              </ul>
            </div>
            <img class="spy" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/The-Spy-Who-Loved-Me.jpg'" alt="To fall in love with a shadow" title="To fall in love with a shadow" />
          </div>

          <div class="page">
            <img class="sour" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/1.jpg'" />
          </div>

          <div class="page">
            <img class="dream" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/2.jpg'" />
          </div>

          <div class="page">
            <img class="narrow" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/3.jpg'" />
          </div>

          <div class="page">
            <img class="hallway" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/4.jpg'" />
          </div>

          <div class="page">
            <img class="forsaken" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/5.jpg'" />
          </div>

          <div class="page">
            <div>
              <h1 class="title-p" v-if="p.description">{{p.description}}</h1>
            </div>
          </div>

          <div class="page"></div>

          <div class="page"><!-- Liber campir. --></div>
          <div class="page" id="final"></div>
          <div class="page cover back" data-density="hard">
            <img id="andeverafter" src="https://uanon.s3.amazonaws.com/c7f2e913f7739a1f556243c4fddc18e9b0d9f157f0316524ac322c1bf2425c31/dante.jpg">
          </div>
        </div>
      </div>

      <div class="pane-bt">
        <div class="div">
          <hr class="separator" />
        </div>

        <div class="plateaus jumbotron" v-if="typeof st=='number' && p.plateaus">
          <div class="plateau-0" v-if="st==0">
            <h3 class="pname">Summer on the high plateau can be delectable as honey. It can also be a roaring scourge.</h3>
            <button class="btn btn-danger btn-start" @click="st=1;">Begin</button>
          </div>
          <div class="plateau-1" v-if="st==1 && p.plateaus[0]">
            <h3 class="pname">{{p.plateaus[0].name}}</h3>
            <div class="ptext">
              <p>{{p.plateaus[0].flavour}}</p>
            </div>
            <div class="p1-ctrl" v-if="p.plateaus[0].questions">
              <ul class="p1 list-unstyled" v-if="p.plateaus[0].questions.length">
                <li v-for="(q, i) in p1" :key="i">
                  <div class="li-input select p1">
                    <span>{{q.v}}</span>
                    <select class="form-control question p1" v-model="plateaus.first[q.i]">
                      <option value="">Select an answer</option>
                      <option value="Peameal">Peameal</option>
                      <option value="Gypsy">Gypsy</option>
                    </select>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="plateau-2" v-if="st==2 && p.plateaus[1]">
            <h3 class="pname">{{p.plateaus[1].name}}</h3>
            <div class="ptext" v-html="p.plateaus[1].template"></div>
            <div class="p2-ctrl">
              <input class="form-control question p2" type="text" placeholder="Answer" v-model="plateaus.second">
              <div class="plabel" v-if="p.plateaus[1].format">Format: {{p.plateaus[1].format}}</div>
            </div>
          </div>
          <div class="plateau-3" v-if="st==3 && p.plateaus[2]">
            <h3 class="pname">{{p.plateaus[2].name}}</h3>
            <div class="ptext" v-html="p.plateaus[2].template"></div>
            <div class="p3-ctrl">
              <input class="form-control question p3" type="text" placeholder="Answer" v-model="plateaus.third">
              <div class="plabel" v-if="p.plateaus[2].format">Format: {{p.plateaus[1].format}}</div>
            </div>
          </div>
          <div class="plateau-4" v-if="st==4 && p.plateaus[3] && Array.isArray(p.files)">
            <h3 class="pname">{{p.plateaus[3].name}}</h3>
            <div class="ptext" v-html="p.plateaus[3].flavour.template" v-if="p.plateaus[3].flavour"></div>
            <div class="card-deck">
              <div class="card" v-for="(f, i) in p4" :key="i">
                <img class="card-img-top" :src="c.DEFAULT_STORAGE_BASE + '/' + p.id + '/' + f.v" v-if="f.v.substring(f.v.length-1) !== 'f'" :alt="f.v" :title="f.v" style="cursor:help;">
                <span class="icon fa fa-file-pdf" v-if="f.v.substring(f.v.length-1) == 'f'" :alt="f.v" :title="f.v" style="cursor:help;"></span>
                <div class="card-body">
                  <div class="card-text inp" v-if="p.plateaus[3].format">
                    <input v-model="plateaus.fourth.ordinals[f.i]" class="form-control question a" type="number" min="1" max="4" placeholder="Ordinal" :title="p.plateaus[3].format.ordinal" :alt="p.plateaus[3].format.ordinal" v-if="p.plateaus[3].format.ordinal">
                    <input v-model="plateaus.fourth.labels[f.i]" class="form-control question b" type="text" placeholder="Label" :title="p.plateaus[3].format.label" :alt="p.plateaus[3].format.label" v-if="p.plateaus[3].format.label">
                  </div>
                </div>
              </div>
            </div>
            <div class="submit-ctrl">
              <button id="veins" class="btn btn-primary" @click="vein(p4);">Cook</button>
              <div class="messenger" v-if="msg.type && msg.value">
                <p class="error-msg danger bg-danger" v-if="msg.type == 'error'">{{msg.value}}<span class="float-right close-x" @click="msg={type:null,value:null};vn=[];">&times;</span></p>
                <div class="success-msg success bg-success" v-if="msg.type == 'success'">
                  <span class="float-right close-x" @click="msg={type:null,value:null};vn=[];">&times;</span>
                  <div v-html="msg.value"></div>
                </div>
                <div class="artery-ctrl" v-if="show">
                  <ul class="list-unstyled" v-if="vn.length">
                    <li v-for="(h, i) in vn" :key="i">(Plateau {{(i+1)}}): {{h}}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="plateau-ctrl" v-if="p.plateaus.length && st !== 0">
          <button class="btn btn-inverse" @click="prev();" :disabled="st<=0">Prev</button>
          <button class="btn btn-primary" @click="next();" :disabled="st==4">Next</button>
        </div>
      </div>

    </div>

    <div class="content-s danger no-access" v-if="!a && rdy">
      <p class="no-access descr" v-html="w"></p>
      <router-link to="/descend">Back</router-link>
    </div>

    <div v-if="p.id">
      <!-- Soulve -->
      <div class="open-c inner">
        <p class="helper-bar float-right" @click="gopen();" v-if="p.bundle">
          <span class="icon icon-game"></span>
        </p>
      </div>
      <Graphical 
        v-bind:a="vn"
        v-bind:s="p.secret"
        v-bind:r="def[0]"
        v-bind:f="p.fields"
        v-bind:o="gd"
        v-bind:i="0"
        v-bind:p="p"
        v-bind:t="p.title"
        v-bind:l="true"
        v-bind:dd="true"
        v-bind:rst="true"
        v-bind:tx="true"
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
        v-bind:q="true"
        v-bind:l="true"
        v-bind:tx="true"
        v-bind:un="un"
        v-if="p.secret && un"
        @proof="retain"
        @copen="copen"
      ></Console>
    </div>
  </div>
</template>

<script>
  import * as api from '../../../util/api';
  import store from '../../../util/storage';
  import { verifyProof, generateProofAsString } from '../../../util/hasher';
  import * as Config from '../../../conf/constants';
  
  import Graphical from '../../children/soulve/Graphical.vue';
  import Console from '../../children/soulve/Console.vue';

  import { PageFlip } from 'page-flip';

  const CURRENT_I = 0;

  export default {
    name: 'Summer Ascend',
    components: { Console, Graphical },
    data: () => ({
      a: false,
      c: Config,
      cd: false,
      gd: false,
      api: api,
      asc: false,
      g: generateProofAsString,
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
      w: Config.notify.DEFAULT_PLAYER_WARNING,
      do: store,
      sl: null,
      st: 0,
      sv: null,
      fi: null,
      un: null,
      vn: [],
      msg: {type:null,value:null},
      str:{},
      def: ['summer+', 0],
      rdy: false,
      argT: [false, false],
      show: false,
      plateaus: {
        first: ['','','','','','','','','','','','','','',''],
        second: null,
        third: null,
        fourth: {
          ordinals: [null,null,null,null],
          labels: ['','','','']
        }
      },
    }),
    mounted: async function () {
      this.getStr();
      await this.getU();
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
        let r = this.def[0], d, req = {
          index: CURRENT_I, 
          realm: r
        };
        // Assemble proof
        if (this.str['summer']) {
          let str = this.str['summer'];
          let p = [];
          if (str[6]) {
            p[0] = (str[6]['proof']) ? str[6]['proof'] : null;
          }
          if (str[7]) {
            p[1] = (str[7]['proof']) ? str[7]['proof'] : null;
          }
          if (str[8]) {
            p[2] = (str[8]['proof']) ? str[8]['proof'] : null;
          }
          if (str[9]) {
            p[3] = (str[9]['proof']) ? str[9]['proof'] : null;
          }
          let g = this.g(JSON.stringify(p), Config.DEFAULT_DEPTH)
          g = g.substring(2);
          req.proof = g;

          try {
            let resp = await this.api.request.post('/puzzle/get', req);
            if (resp.status == 200 && resp.data) {
              d = resp.data;
              if (d.message) {
                this.a = true;
                this.make(d.message);
              }
            }
          } catch (e) {
            console.warn('Error resolving puzzle data', e);
          }
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
        this.p.fields = (m.fields) ? m.fields : null;
        this.p.format = (m.format) ? m.format : null;
        this.p.template = (m.template) ? m.template : null;
        this.p.plateaus = (m.plateaus) ? m.plateaus : null;
        
        // Set files
        if (Array.isArray(this.p.plateaus)) {
          if (this.p.plateaus[3]) {
            if (this.p.plateaus[3]['flavour']) {
              if (this.p.plateaus[3].flavour['files']) {
                this.p.files = this.p.plateaus[3].flavour.files;
              }
            }
          }
        }

        this.prep();
        // console.log('Current Puzzle =>', this.p);
      },
      prep: function () {
        if (this.p.id && this.str) {
          let a = [], str = this.str['summer'];
          for (let i = 0; i < str.length; i++) {
            if (str[i]) {
              if (str[i].proof) {
                a[i] = str[i].proof;
              }
            }
          }
          this.p.bundle = a;
          // console.log('Current Puzzle =>', this.p);
        }
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
       * @param {Object} z : A computed array
       * @see self::p4
       */
      vein: function (z = null) {
        if (!z) {
          return;
        }
        this.show = false;
        this.vn = [];
        this.msg = {type: null, value: null};
        let v = [
          this.plateaus.first,
          [this.plateaus.second],
          [this.plateaus.third]
        ];
        let r = this.plateaus.fourth.ordinals, r_out = [];
        z.sort((a,b) => {
          return a.i - b.i;
        });
        for (let i = 0; i < r.length; i++) {
          let l = this.plateaus.fourth.labels[i];
          let n = parseInt(r[i]) - 1;
          let o = z[i].v;
          r_out[n] = {file: o, label: l};
          if (i == (r.length - 1)) {
            let arr_o = [], arr_i = [], arr_m;
            for (let j = 0; j < r_out.length; j++) {
              if (r_out[j].file && r_out[j].label) {
                arr_o.push(r_out[j].file);
                arr_i.push(r_out[j].label);
              }
              if (j == (r_out.length - 1)) {
                arr_m = arr_o.concat(arr_i);
                v.push(arr_m);
              }
            }
          }
        }
        // v.push(r_out);
        v.forEach((h,i) => {
          try {
            let p = this.g(JSON.stringify(h), Config.DEFAULT_DEPTH);
            p = p.substring(2);
            this.vn.push(p);
            if (i == (v.length-1)) {
              this.msg.type = 'success';
              this.msg.value = 'Your evidence has been cooked';
              this.show = true;
              // console.log('Cooked =>', v);
            }
          } catch(e) {
            this.msg.type = 'danger';
            this.msg.value = 'Error tapping vein, find an elastic';
            console.warn('Error hashing plateaus', e);
          }
        });
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
        // F.on('flip', (e) => {
        //   console.log("Page flip", e);
        // });
      },
      prev: function () {
        if (this.st > 0) {
          this.st -= 1;
        }
      },
      next: function () {
        if (this.st <= 4) {
          this.st += 1;
        }
      },
      /**
     * @param {Object} w : Array instance of API questions to be randomized
     */
      getRq: function (w) {
        if (!Array.isArray(w)) {
          console.warn("Error parsing questions array");
          return;
        }
        let c = w.length, t, r;
        while (0 !== c) {
          r = Math.floor(Math.random() * c);
          c -= 1;
          t = w[c];
          w[c] = w[r];
          w[r] = t;
        }
        return w;
      }
    },
    computed: {
      p1: function () {
        if (!this.p) {
          return [];
        } else if (typeof this.p !== 'object') {
          return [];
        } else if (!this.p.plateaus) {
          return [];
        } else if (!this.p.plateaus.length) {
          return [];
        } else if (!this.p.plateaus[0]['questions']) {
          return [];
        }
        let p1 = this.p.plateaus[0].questions, p = [];
        for (let i = 0; i < p1.length; i++) {
          p.push({
            i: i,
            v: p1[i]
          });
        }
        if (!p.length) {
          return [];
        } else {
          return this.getRq(p);
        }
      },
      p4: function () {
        if (!this.p) {
          return [];
        } else if (typeof this.p !== 'object') {
          return [];
        } else if (!this.p.files) {
          return [];
        } else if (!this.p.files.length) {
          return [];
        }
        let p4 = this.p.files, p = [];
        for (let i = 0; i < p4.length; i++) {
          p.push({
            i: i,
            v: p4[i]
          });
        }
        if (!Array.isArray(p)) {
          return [];
        } else {
          return this.getRq(p);
        }
      }
    }
  }
</script>

<style scoped>
div.content-s.existence {
  max-width: 1440px;
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
.helper-bar:hover {
  box-shadow: 0 0 5px 10px rgba(230,0,115,0.3);
  text-shadow: 0 0 20px #eee, 0 0 30px #eee, 0 0 40px #ff7070, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff7070;
}
.helper-bar > .icon-game {
  position: relative;
  top: 2px;
}
.wr {
  padding: 2em;
  padding-top: 0;
  z-index: 1000;
}
#evermore, #andeverafter {
  position: relative;
  display: block;
  width: 107%;
  height: auto;
  margin: 0;
  padding-left: 0;
  left: -5%;
  top: -2.5%;
  opacity: 0.25;
  filter: sepia(1);
  animation: mythos ease 160s;
  -webkit-animation: mythos ease 160s;
  -moz-animation: mythos ease 160s;
  -o-animation: mythos ease 160s;
  -ms-animation: mythos ease 160s;
  animation-iteration-count: infinite;
}
.bl, .bl-2 {
  font-weight: bolder;
  margin-bottom: 0;
}
.bl {
  font-size: 30px;
}
.bl-2 {
  padding: 1.5%;
}
.fountain-of-youth {
  /* The fraily of its decaying grail */
  color: #333;
  text-shadow:
    0 0 5px #ffc373,
    0 0 10px #ffc373,
    0 0 20px #ffc373,
      0 0 40px #a17434,
      0 0 80px #333,
      0 0 90px #333,
      0 0 100px #a17434,
      0 0 150px #a17434;
  font-weight: 800;
  text-align: center;
  display: block;
  text-transform: uppercase;
  background-color: transparent;
  font-family: 'Special Elite', cursive;
  font-size: 2em;
  letter-spacing: 0.4em;
  position: absolute;
  top: 44%;
  left: 28%;
}
#book {
  margin: auto;
  top: 4em;
  border-radius: 4em;
  z-index: 2000;
}
.cover.front {
  background: url('https://uanon.s3.amazonaws.com/c7f2e913f7739a1f556243c4fddc18e9b0d9f157f0316524ac322c1bf2425c31/book-cover-02a.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 117%;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  animation: transmogrify ease 80s;
  -webkit-animation: transmogrify ease 80s;
  -moz-animation: transmogrify ease 80s;
  -o-animation: transmogrify ease 80s;
  -ms-animation: transmogrify ease 80s;
  animation-iteration-count: infinite;
}
.cover.back {
  background: url('https://uanon.s3.amazonaws.com/c7f2e913f7739a1f556243c4fddc18e9b0d9f157f0316524ac322c1bf2425c31/book-cover-02b.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 117%;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
  animation: transmogrify ease 80s;
  -webkit-animation: transmogrify ease 80s;
  -moz-animation: transmogrify ease 80s;
  -o-animation: transmogrify ease 80s;
  -ms-animation: transmogrify ease 80s;
  animation-iteration-count: infinite;
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
.poem-ii ul, .poem-ii ul li {
  list-style: none;
  font-size: 1.35em;
}
img.mermaid, 
img.Scene-V, 
img.eddie-ii, 
img.liber, 
img.dream, 
img.sour, 
img.narrow, 
img.hallway, 
img.forsaken {
  height: 100%;
  max-width: 550px;
  border-radius: 2%;
  margin: auto;
  display: block;
  box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5), 10px 0 8px 0px rgba(0, 0, 0, 0.4);
  filter: sepia(0.4) hue-rotate(-10deg);
  animation: despair ease 260s;
  -webkit-animation: despair ease 260s;
  -moz-animation: despair ease 260s;
  -o-animation: despair ease 260s;
  -ms-animation: despair ease 260s;
  animation-iteration-count: infinite;
}
img.jeered {
  height: 100%;
  max-width: 550px;
  border-radius: 2%;
  margin: auto;
  display: block;
  box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5), 10px 0 8px 0px rgba(0, 0, 0, 0.4);
  filter: sepia(1);
}
.jeered.ctr {
  max-width: 350px;
  height: auto;
  margin: auto;
  position: relative;
}
img.broken-english {
  max-width: 400px;
  height: auto;
  margin: auto;
  position: relative;
  top: 25%;
}
img.ant-colonies {
  height: auto;
  max-width: 300px;
  top: 22%;
  position: relative;
  border-radius: 2%;
  margin: auto;
  display: block;
  box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5), 10px 0 8px 0px rgba(0, 0, 0, 0.4);
  filter: grayscale(30%) sepia(0.7);
  background-color: #555;
  box-shadow: 0 0 5px 10px #555;
  -webkit-box-shadow: 0 0 5px 10px #555;
  -moz-box-shadow: 0 0 5px 10px #555;
}
img.spy {
  height: auto;
  max-width: 250px;
  top: 11%;
  position: relative;
  border-radius: 2%;
  margin: auto;
  display: block;
  box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5), 10px 0 8px 0px rgba(0, 0, 0, 0.4);
  filter: sepia(1) hue-rotate(-10deg);
  animation: despair ease 260s;
  -webkit-animation: despair ease 260s;
  -moz-animation: despair ease 260s;
  -o-animation: despair ease 260s;
  -ms-animation: despair ease 260s;
  animation-iteration-count: infinite;
}
img.desire {
  height: auto;
  max-width: 500px;
  position: relative;
  border-radius: 2%;
  margin: auto;
  margin-top: 2.75em;
  display: block;
  filter: grayscale(30%) sepia(0.9);
  box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5), 10px 0 8px 0px rgba(0, 0, 0, 0.4);
  background-color: #555;
  box-shadow: 0 0 5px 10px #555;
  -webkit-box-shadow: 0 0 5px 10px #555;
  -moz-box-shadow: 0 0 5px 10px #555;
}
h3.boom {
  margin-top: 2em;
}
.boom {
  display: block;
  margin-left: auto;
  margin-right: auto;
  font-weight: bolder;
  width: fit-content;
}
.btn-start {
  margin: auto;
  margin-top: 2em;
  width: 200px;
}
.title-p {
  text-align: center;
  position: relative;
  top: 325px;
}
div.div {
  position: relative;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  font-family: 'AnglicanText';
  height: 8px;
  width: auto;
  max-width: 1440px;
  margin: auto;
  border-radius: 5px;
  color: rgba(73,45,21,0.72);
  background: linear-gradient(-42deg,#a17434,#ffc373 16%,#ffc373 21%,#fff 24%,#ffc373 27%,#ffc373 36%,#fff 45%,#fff 60%,#ffc373 72%,#fff 80%,#ffc373 84%,#a17434);
}
.pane-bt {
  position: relative;
  top: 4.5em;
  padding-bottom: 8em;
}
.plateau-ctrl button {
  margin-right: 1.5em;
}
.pname, .ptext {
  color: goldenrod;
  background: -webkit-linear-gradient(goldenrod, #ff7070);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 0px 6px #ff7070;
  animation: mythos ease 160s;
  -webkit-animation: mythos ease 160s;
  -moz-animation: mythos ease 160s;
  -o-animation: mythos ease 160s;
  -ms-animation: mythos ease 160s;
  animation-iteration-count: infinite;
}
.card-deck {
  justify-content: space-evenly;
  margin-top: 2em;
}
.card {
  background: #ff7070;
  border-color: #ff7070;
}
.card {
  max-width: 300px;
}
.icon.fa-file-pdf {
  color: #333333;
  text-align: center;
  font-size: 8em;
  text-align: center;
  margin-top: 19%;
  background-color: #eee;
  filter: sepia(1);
}
.card-body {
  position: relative;
}
.inp {
  position: absolute;
  bottom: 0;
  display: block;
  width: 100%;
  left: 0;
  text-align: center;
  background: #ff7070;
}
.card-img-top {
  max-height: 420px; 
}
ul.p1 li, .p2-ctrl, .p3-ctrl {
  margin-bottom: 1em;
  border: 1px solid #ff7070;
  border-radius: 4px;
  padding: 2em;
}
.p1-ctrl, .p2-ctrl, .p3-ctrl, .p4-ctrl {
  color: #000000;
}
.p1-ctrl, .p2-ctrl, .p3-ctrl {
  margin-top: 1.25em;
}
.question {
  margin-bottom: 0.5em;
  width: 258px;
  margin-left: auto;
  margin-right: auto;
}
.question.p1 {
  margin-left: 0;
  margin-right: 1em;
}
.question.p2, .question.p3 {
  margin-left: 0;
  width: 100%;
}
ul.p1.list-unstyled li, .p2-ctrl, .p3-ctrl {
  background-color: #ff7070;
}
.plabel {
  font-size: 15px;
}
.li-input select {
  margin-top: 1em;
}
.question.a {
  margin-top: 0.5em;
}
strong {
  color: #000000;
}
.recette, .recipe {
  font-weight: bold;
  filter: sepia(0.4);
  font-family: 'Special Elite';
}
.submit-ctrl {
  margin-left: 10px;
  margin-top: 2em;
  width: fit-content;
}
.submit-ctrl button {
  width: 120px;
}
div.messenger {
  width: 100%;
}
.error-msg,
.success-msg {
  padding: 1em;
  color: #ffffff;
  border-radius: 5px;
  margin-top: 2em;
}
.artery-ctrl {
  margin: auto;
  margin-top: 2em;
  width: fit-content;
}
@keyframes despair {
  0% {filter: sepia(0.4) hue-rotate(-10deg);}
  50% {filter: sepia(0.4) hue-rotate(155deg);}
  100% {filter: sepia(0.4) hue-rotate(0deg);}
}
@-moz-keyframes despair {
  0% {filter: sepia(0.4) hue-rotate(-10deg);}
  50% {filter: sepia(0.4) hue-rotate(155deg);}
  100% {filter: sepia(0.4) hue-rotate(0deg);}
}
@-webkit-keyframes despair {
  0% {filter: sepia(0.4) hue-rotate(-10deg);}
  50% {filter: sepia(0.4) hue-rotate(155deg);}
  100% {filter: sepia(0.4) hue-rotate(0deg);}
}
@-o-keyframes despair {
  0% {filter: sepia(0.4) hue-rotate(-10deg);}
  50% {filter: sepia(0.4) hue-rotate(155deg);}
  100% {filter: sepia(0.4) hue-rotate(0deg);}
}
@-ms-keyframes despair {/*filter: sepia(0.4) hue-rotate(-10deg);*/
  0% {filter: sepia(0.4) hue-rotate(-10deg);}
  50% {filter: sepia(0.4) hue-rotate(155deg);}
  100% {filter: sepia(0.4) hue-rotate(0deg);}
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