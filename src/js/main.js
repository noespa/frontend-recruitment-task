const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="src/css/main.css">
<div class="container">
        <aside class="picture">
            <img src="images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_c_scale,w_784.jpg" alt="Sunrise photo" width="505"
                height="330">
        </aside>
        <article class="main">
            <h1><slot name="title"/></h1>
            <p><slot name="content"/></p>
            <button type="button" class="open-modal-button" id="openmodalbutton">Button</button>
        </article>
    </div>
    <div class="modal" id="modal" data-closable>
        <div class="modal-dialog">
            <div class="modal-container">
                <span class="close-modal" aria-hidden="true"><span class="close-x">&times;</span></span>
                <header class="modal-header">
                    <h1>Alert!</h1>
                </header>
                <section class="modal-content">You have clicked <b><span id="click-count"></span> times</b> to related
                    button.</section>
                <button class="reset-count-button" id="resetCountButton">Restart</button>
            </div>
        </div>
    </div>
`;

class FrontendComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({
            mode: 'open'
        });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback() {

        let clickCount = localStorage.getItem('clickCount');

        this.shadowRoot.querySelector('#openmodalbutton').addEventListener("click", () => {
            clickCount++;
            console.log(clickCount);
            if (clickCount >= 5) {
                this.shadowRoot.getElementById("resetCountButton").classList.add('is-visible');
            }
            this.shadowRoot.querySelector("#click-count").innerText = clickCount;
            localStorage.setItem('clickCount', clickCount);
            this.shadowRoot.querySelector(".modal").classList.add('is-visible');

            this.shadowRoot.addEventListener("click", e => {
                if (e.target == this.shadowRoot.querySelector(".reset-count-button.is-visible")) {
                    this.shadowRoot.querySelector(".reset-count-button.is-visible").classList.remove('is-visible');
                    this.shadowRoot.querySelector(".modal.is-visible").classList.remove('is-visible');
                    clickCount = 0;
                    localStorage.setItem('clickCount', clickCount)

                }
            });

            this.shadowRoot.addEventListener("click", e => {
                if (e.target == this.shadowRoot.querySelector(".modal.is-visible")) {
                    this.shadowRoot.querySelector(".modal.is-visible").classList.remove('is-visible');
                }
            });
            this.shadowRoot.addEventListener("click", e => {
                if (e.target == this.shadowRoot.querySelector(".close-x")) {
                    this.shadowRoot.querySelector(".modal.is-visible").classList.remove('is-visible');
                }
            });
            this.shadowRoot.addEventListener("keyup", e => {
                if (e.key == "Escape" && this.shadowRoot.querySelector(".modal.is-visible")) {
                    this.shadowRoot.querySelector(".modal.is-visible").classList.remove('is-visible');
                }
            });
        });
    }
}

window.customElements.define('frontend-component', FrontendComponent);