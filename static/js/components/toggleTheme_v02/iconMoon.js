// @ts-check

/**
 * Custom element representing an icon with a sun design.
 * It includes functionality for event handling, attribute observation, and rendering the icon.
 */
customElements.define(
  "icon-moon",
  class extends HTMLElement {
    /**
     * Creates an instance of the icon-moon custom element.
     * Initializes the observer to monitor attribute changes.
     */
    constructor() {
      super();
      this.observer = null;
    }

    /**
     * Called when the element is added to the DOM.
     * It renders the icon and hydrates its state (finds and sets up event listeners and observers).
     */
    connectedCallback() {
      this.render();
      this.hydrate();
    }

    /**
     * Called when the element is removed from the DOM.
     * Disconnects the mutation observer if it exists.
     */
    disconnectedCallback() {
      if (this.observer) {
        this.observer.disconnect();
      }
    }

    /**
     * Initializes the icon element, sets up event listeners, and starts observing attribute changes.
     *
     * @throws {Error} Throws an error if the icon element is not found.
     */
    hydrate() {
      /** @type {HTMLElement | null} */
      this.icon = this.querySelector("#icon-moon");
      if (!this.icon) {
        throw new Error("icon-moon element not found");
      }
      this.addEventListeners();
      this.observeAttributes();
    }

    /**
     * Adds event listeners to the icon element, specifically for the "click" event.
     */
    addEventListeners() {
      if (this.icon != null) {
        this.icon.addEventListener("click", this.handleClick.bind(this));
      }
    }

    /**
     * Handles the click event on the component.
     * Prevents the default action and dispatches a custom event with the details.
     *
     * @param {MouseEvent} event - The click event object that is passed by the browser when the user clicks on the component.
     * @returns {void}
     */
    handleClick(event) {
      event.preventDefault();

      this.dispatchEvent(
        new CustomEvent("clicked-moon", {
          bubbles: true,
          composed: false,
          detail: { id: "moon" },
        }),
      );
    }

    /**
     * Observes changes to specific attributes of the custom element (e.g., `data-active`).
     * Adjusts the display of the icon based on these attribute changes.
     */
    observeAttributes() {
      this.observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === "attributes") {
            const active = this.getAttribute("data-active");

            // Hide or show the icon based on the attribute
            if (active === "true") {
              if (!this.icon) {
                throw new Error("icon is not initialized");
              }
              this.icon.classList.add("active");
            } else {
              if (!this.icon) {
                throw new Error("icon is not initialized");
              }
              this.icon.classList.remove("active");
            }
          }
        }
      });

      // Observe changes to 'data-hidden' and 'data-active' attributes
      this.observer.observe(this, { attributes: true });
    }

    /**
     * Set the initial active class depending on the html element data-theme attribute
     */
    setDisplay() {
      const dataTheme =
        document.documentElement.getAttribute("data-theme") || "light";
      return dataTheme === "light" ? "active" : "";
    }

    /**
     * Renders the SVG for the moon icon inside the custom element.
     * This method is called when the element is connected to the DOM.
     */
    render() {
      this.innerHTML = `
      <div id="icon-moon" class="icon icon-moon ${this.setDisplay()}">
        <svg id="svg-moon" height="32" width="32" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" fill-rule="evenodd"></path>
        </svg>
      </div>
      <style>
      </style>
    `;
    }
  },
);
