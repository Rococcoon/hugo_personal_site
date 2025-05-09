class HamburgerIcon extends HTMLElement {
  constructor() {
    super();
    this.attributeObserver = null;
  }

  connectedCallback() {
    this.render();
    this.hydrate();
  }

  disconnectedCallback() {
    if (this.attributeObserver) {
      this.attributeObserver.disconnect();
    }
  }

  hydrate() {
    this.hmIcon = this.querySelector("#hm-icon-container");
    this.observeAttributes();

    this.hmIcon.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.hmIcon.click();
      }
    });
  }

  observeAttributes() {
    this.attributeObserver = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "attributes") {
          const active = this.getAttribute("data-active");
          if (active === "true") {
            this.hmIcon.classList.add("active");
          } else {
            this.hmIcon.classList.remove("active");
          }
        }
      }
    });

    this.attributeObserver.observe(this, { attributes: true });
  }

  render() {
    this.innerHTML = `
      <div class="hm-icon-container" id="hm-icon-container" tabindex="0">
        <span class="hm-icon-line"></span>
        <span class="hm-icon-line"></span>
        <span class="hm-icon-line"></span>
      </div>

      <style>
        hamburger-icon {
          left: 0;
          position: relative;
          top: 0; 
        }

        .hm-icon-container {
          align-items: center;
          background-color: var(--base);
          border: 3px solid var(--text);
          box-shadow: 6px 6px 0 var(--sub);
          color: var(--base);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 5px;
          height: 50px;
          justify-content: center;
          padding: var(--p-xs) var(--p-xs);
          position: relative;
          outline: 3px solid var(--base);
          transition:
            transform 0.2s ease-out,
            box-shadow 0.2s ease-out,
            outline 1s ease-out,
            position 1s ease-out,
            background-color 1s ease-out;
          width: 50px;
          z-index: 9999;
        }

        .hm-icon-container:hover {
          box-shadow: 10px 10px 0 var(--sub);
          transform: translate(-1px, -1px);
        }

        .hm-icon-container:active {
          background-color: var(--text);
          border-color: var(--text);
          box-shadow: 0px 0px 0 var(--sub);
          color: var(--text);
          transform: translate(1px, 1px);
        }

        .hm-icon-container.active {
          background-color: var(--main);
          border-color: var(--main);
          box-shadow: 0px 0px 0 var(--sub);
          color: var(--text);
          transform: translate(1px, 1px);
        }

        .hm-icon-line {
          background-color: var(--text);
          height: 4px;
          transition: transform 300ms ease, opacity 300ms ease;
          width: 100%;
        }

        .hm-icon-container.active .hm-icon-line:nth-child(1) {
          background-color: var(--base);
          transform: translateY(9px) rotate(45deg);
        }

        .hm-icon-container.active .hm-icon-line:nth-child(2) {
          opacity: 0;
        }

        .hm-icon-container.active .hm-icon-line:nth-child(3) {
          background-color: var(--base);
          transform: translateY(-9px) rotate(-45deg);
        }
      </style>
    `;
  }
}

customElements.define("hamburger-icon", HamburgerIcon);
