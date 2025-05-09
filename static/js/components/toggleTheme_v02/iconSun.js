// @ts-check

/**
 * Custom element representing an icon with a sun design.
 * It includes functionality for event handling, attribute observation, and rendering the icon.
 */
customElements.define(
  "icon-sun",
  class extends HTMLElement {
    /**
     * Creates an instance of the icon-sun custom element.
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
      /** @type {SVGElement | null} */
      this.icon = this.querySelector("#icon-sun");
      if (!this.icon) {
        throw new Error("icon-sun element not found");
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
        new CustomEvent("clicked-sun", {
          bubbles: true,
          composed: false,
          detail: { id: "sun" },
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
              this.icon.tabIndex = 0;
            } else {
              if (!this.icon) {
                throw new Error("icon is not initialized");
              }
              this.icon.classList.remove("active");
              this.icon.tabIndex = -1;
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
      return dataTheme === "dark" ? "active" : "";
    }

    /**
     * Renders the SVG for the sun icon inside the custom element.
     * This method is called when the element is connected to the DOM.
     */
    render() {
      this.innerHTML = `
      <div id="icon-sun" class="icon icon-sun ${this.setDisplay()}">
        <svg height="32" width="32" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path>
        </svg>
      </div>
      <style>
      </style>
    `;
    }
  },
);
