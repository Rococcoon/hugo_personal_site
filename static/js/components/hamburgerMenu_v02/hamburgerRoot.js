import "/js/components/hamburgerMenu_v02/hamburgerIcon.js";
import "/js/components/hamburgerMenu_v02/hamburgerNav.js";

class HamburgerMenu extends HTMLElement {
  constructor() {
    super();
    this.rendered = false;
  }

  connectedCallback() {
    this.render();
    this.hydrate();
  }

  disconnectedCallback() {
    if (this.hmIcon) {
      this.hmIcon.removeEventListener("click", this.handleIconClick);
    }

    if (this.hmNavLinks) {
      this.hmNavLinks.forEach((link) => {
        link.removeEventListener("click", () => {
          this.toggleAttribute();
        });
      });
    }
  }

  hydrate() {
    this.hmNav = this.querySelector("#hm-nav");
    this.attachEventListener();
    this.setMenuState();
  }

  attachEventListener() {
    this.hmIcon = this.querySelector("#hm-icon");
    if (this.hmIcon) {
      this.hmIcon.addEventListener("click", () => {
        this.toggleAttribute();
      });
    }

    this.hmNavLinks = this.querySelectorAll("#hm-nav-link");
    this.hmNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.toggleAttribute();
      });
    });
  }

  setMenuState() {
    this.hmIcon.setAttribute("data-active", "false");
    this.hmNav.setAttribute("data-active", "false");
  }

  toggleAttribute() {
    const current = this.hmIcon.getAttribute("data-active") === "true";
    this.hmIcon.setAttribute("data-active", String(!current));
    this.hmNav.setAttribute("data-active", String(!current));
  }

  render() {
    if (this.rendered) return;
    this.rendered = true;

    this.innerHTML = `
      <hamburger-icon 
        data-active="false"
        id="hm-icon"
      ></hamburger-icon>
      <hamburger-nav 
        data-active="false"
        id="hm-nav"
      ></hamburger-nav>
      <style>
        hamburger-menu {
          align-items: center;
          box-sizing: border-box;
          display: flex;
          height: 50px;
          justify-content: center;
          margin: 0px;
          padding: 0px;
          position: relative;
          width: 50px;
        }
      </style>
    `;
  }
}

customElements.define("hamburger-menu", HamburgerMenu);
