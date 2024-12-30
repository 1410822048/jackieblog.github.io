mixins.highlight={data(){return{copying:!1}},created(){hljs.configure({ignoreUnescapedHTML:!0}),this.renderers.push(this.highlight)},methods:{sleep(i){return new Promise(e=>setTimeout(e,i))},highlight(){var s;for(s of document.querySelectorAll("pre")){let e=s.textContent;var c=[...s.querySelector("code").classList][0]||"plaintext";s.className=c;let i;try{i=hljs.highlight(e,{language:c}).value}catch{i=e}s.innerHTML=`
              <div class="code-content hljs">${i}</div>
              <div class="language">${c}</div>
              <div class="copycode">
                  <i class="fa-solid fa-copy fa-fw"></i>
                  <i class="fa-solid fa-check fa-fw"></i>
              </div>
              `;c=s.querySelector(".code-content");hljs.lineNumbersBlock(c,{singleLine:!0});let t=s.querySelector(".copycode");t.addEventListener("click",async()=>{this.copying||(this.copying=!0,t.classList.add("copied"),await navigator.clipboard.writeText(e),await this.sleep(1e3),t.classList.remove("copied"),this.copying=!1)})}}}};