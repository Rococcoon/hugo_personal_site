// @ts-check

import "/js/components/toggleTheme_v02/iconSun.js";
import "/js/components/toggleTheme_v02/iconMoon.js";

customElements.define(
  "toggle-theme-v02",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.observer = null;
    }

    /**
     * Lifecycle method called when the element is inserted into the dom
     *
     * @returns {void}
     */
    connectedCallback() {
      this.setSystemTheme();
      this.render();
      this.hydrate();
    }

    /**
     * Lifecycle method called when the element is removed from the DOM
     *
     * @returns {void}
     */
    disconnectedCallback() {
      if (this.shadowRoot !== null) {
        const sunIcon = this.shadowRoot.querySelector("icon-sun");
        if (sunIcon) {
          sunIcon.removeEventListener("clicked-sun", this);
        }
        const moonIcon = this.shadowRoot.querySelector("icon-moon");
        if (moonIcon) {
          moonIcon.removeEventListener("clicked-moon", this);
        }
      }
    }

    /**
     * Lifecycle method called after the element has rendered
     *
     * @returns {void}
     */
    hydrate() {
      this.addEventListeners();
    }

    /**
     * pass custom events to the eventHandler function
     *
     * @returns {void}
     */
    addEventListeners() {
      if (this.shadowRoot !== null) {
        const sunIcon = this.shadowRoot.querySelector("icon-sun");
        if (sunIcon) {
          sunIcon.addEventListener("clicked-sun", this);
        }
        const moonIcon = this.shadowRoot.querySelector("icon-moon");
        if (moonIcon) {
          moonIcon.addEventListener("clicked-moon", this);
        }
      }
    }

    /**
     * handles events for sun and moon icon clicks
     *
     * @param {CustomEvent} event - the event object, triggered on click of sun or moon icon
     * @returns {void}
     */
    handleEvent(event) {
      switch (event.type) {
        case "clicked-sun":
          this.handleIconClick(event);
          break;
        case "clicked-moon":
          this.handleIconClick(event);
          break;
      }
    }

    /**
     * Updates the data-theme attribute on the <html> element
     * Updates the data-active on the sun and moon icons
     *
     * @param {CustomEvent} event - the event object, triggered on click of sun or moon icon
     * @returns {void}
     */
    handleIconClick(event) {
      if (event.detail.id === "moon") {
        if (this.shadowRoot != null) {
          this.shadowRoot
            .querySelector("icon-moon")
            ?.setAttribute("data-active", "false");
          this.shadowRoot
            .querySelector("icon-sun")
            ?.setAttribute("data-active", "true");
          document.documentElement.setAttribute("data-theme", "dark");
        }
      }
      if (event.detail.id === "sun") {
        if (this.shadowRoot != null) {
          this.shadowRoot
            .querySelector("icon-moon")
            ?.setAttribute("data-active", "true");
          this.shadowRoot
            .querySelector("icon-sun")
            ?.setAttribute("data-active", "false");
          document.documentElement.setAttribute("data-theme", "light");
        }
      }
    }

    /**
     * Ensures that the <html> element has the data-theme attribute
     * if missing, sets it to default system setting (default 'light')
     *
     * @returns {void}
     */
    setSystemTheme() {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      if (currentTheme !== null) return;

      const prefersDark = window.matchMedia?.(
        "(prefers-color-scheme: dark)",
      ).matches;
      const systemTheme = prefersDark ? "dark" : "light";

      document.documentElement.setAttribute("data-theme", systemTheme);
    }

    /**
     * Determines if the icon should be visible based on the current data-theme
     *
     * @param {'sun' | 'moon'} icon - The icon type, either "sun" or "moon"
     * @returns {string} "true" if the icon should be visible, "false" otherwise
     */
    setIconVisibility(icon) {
      const dataTheme =
        document.documentElement.getAttribute("data-theme") || "light";
      if (icon === "sun") return dataTheme === "dark" ? "true" : "false";
      if (icon === "moon") return dataTheme === "light" ? "true" : "false";
      return "false";
    }

    /**
     * render the components inner html
     *
     * @returns {void}
     */
    render() {
      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = `
        <icon-sun data-active=${this.setIconVisibility("sun")}></icon-sun>
        <icon-moon data-active=${this.setIconVisibility("moon")}></icon-moon>
        <style>
          :host {
            align-items: center;
            display: flex;
            height: 28px;
            justify-content: center;
            position: relative;
            width: 28px;
          }
          icon-moon,
          icon-sun {
            align-items: center;
            display: flex;
            height: 32px;
            justify-content: center;
            position: absolute;
            width: 32px;
          }

          .icon {
            grid-column: 1 / 1;
            grid-row: 1 / 1;
            height: 32px;
            position: absolute;
            transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
            width: 32px;
          }

          /* Default state: hidden via scale(0) */
          .icon-sun,
          .icon-moon {
            transform: scale(0);
            opacity: 0;
            pointer-events: none;
            z-index: 0;
          }

          /* Active state */
          .icon-sun.active,
          .icon-moon.active {
            transform: scale(1) rotate(360deg);
            opacity: 1;
            pointer-events: auto;
            z-index: 1;
          }

          /* Delay moon to fade in later if both toggle at once */
          .icon-moon {
            transition-delay: 100ms;
          }
          .icon-sun {
            transition-delay: 0ms;
          }

          /* Optional fill color styling */
          .icon-sun svg path {
            fill: var(--warn);
          }
          .icon-moon svg path {
            fill: var(--success);
          }
        </sytle>
    `;
      }
    }
  },
);
