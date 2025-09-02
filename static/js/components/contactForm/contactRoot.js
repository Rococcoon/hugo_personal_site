// @ts-check

customElements.define(
  "contact-form",
  class extends HTMLElement {
    constructor() {
      super();
    }

    /**
     * Lifecycle method called when the element is inserted into the dom
     *
     * @returns {void}
     */
    connectedCallback() {
      this.render();
      this.hydrate();
    }

    /**
     * Lifecycle method called when the element is removed from the DOM
     *
     * @returns {void}
     */
    disconnectedCallback() {}

    /**
     * Lifecycle method called after the element has rendered
     *
     * @returns {void}
     */
    hydrate() {}

    /**
     * render the components inner html
     *
     * @returns {void}
     */
    render() {
      this.innerHTML = `
      <style>
        .contact-form {
          align-items: flex-start;
          background-color: var(--base);
          border: 3px solid var(--text);
          box-shadow: 6px 6px 0 var(--sub);
          outline: 3px solid var(--base);
          display: flex;
          flex-direction: column;
          gap: 20px;
          justify-content: flex-start;
          padding: 22px;
          width: 280px;
        }
        .contact-form .label-container {
          align-items: flex-start;
          display: flex;
          flex-direction: column;
          gap: 10px;
          justify-content: flex-start;
          width: 100%;
        }

        .cf-title-container {
          align-items: center;
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .contact-form button {
          background-color: var(--main);
          color: var(--base);
          padding: 8px;
        }

        .contact-form input {
          border: 3px solid var(--text);
          box-shadow: 6px 6px 0 var(--sub);
          outline: 3px solid var(--base);
          padding: 8px;
          transition: border 0.3s ease;
          width: 100%;
        }

        .contact-form input:focus-visible {
          border: 3px solid var(--main);
        }

        .contact-form textarea {
          border: 3px solid var(--text);
          box-shadow: 6px 6px 0 var(--sub);
          outline: 3px solid var(--base);
          padding: 8px;
          transition: border 0.3s ease;
          width: 100%;
        }

        .contact-form textarea:focus-visible {
          border: 3px solid var(--main);
        }

        @media (min-width: 640px) {
          .contact-form {
            width: 650px;
          }
        }
      </style>
      <form
        class="contact-form"
        id="contact-form"
        hx-boost="false"
        name="contact"
        method="POST"
        data-netlify="true"
      >
        <input type="hidden" name="form-name" value="contact" />

        <p hidden>
          <label for="bot-field">Don’t fill this out if you're human:</label>
          <input id="bot-field" name="bot-field" />
        </p>

        <div class="cf-title-container">
          <h2>CONTACT ME!</h2>
        </div>

        <div class="label-container">
          <label for="name">
            Name<span aria-hidden="true">:</span>
          </label>
          <input
            aria-required="true"
            autocomplete="name"
            id="name"
            name="name"
            placeholder="NAME"
            required
            type="text"
          />
        </div>

        <div class="label-container">
          <label for="email">
            Email<span aria-hidden="true">:</span>
          </label>
          <input
            aria-required="true"
            autocomplete="email"
            id="email"
            name="email"
            placeholder="EMAIL"
            required
            type="email"
          />
        </div>

        <div class="label-container">
          <label for="subject">
            Subject<span aria-hidden="true">:</span>
          </label>
          <input
            aria-required="true"
            autocomplete="off"
            id="subject"
            name="subject"
            placeholder="SUBJECT"
            required
          />
        </div>

        <div class="label-container">
          <label for="message">
            Message<span aria-hidden="true">:</span>
          </label>
          <textarea
            aria-required="true"
            id="message"
            name="message"
            placeholder="MESSAGE"
            required
            rows="5"
          ></textarea>
        </div>

        <div>
          <button type="submit">SEND MESSAGE</button>
        </div>
      </form>
      `;
    }
  },
);
