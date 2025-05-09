+++
title = "Building Web Components with Lifecycle Hooks and Custom Events"
date = 2025-05-03
draft = false
tags = ["Web Components", "JavaScript", "Frontend"]
+++

Let me tell you a tale. A tale of JavaScript, curiosity, and one developer’s unnecessarily ambitious attempt to rebuild a counter from scratch using Web Components. Not because it was the best tool for the job, but because it was there — and sometimes that's enough of a reason.

## Why Web Components?

Honestly? I wanted to explore something a little outside the usual React/Vue/Svelte bubble. There’s a lot of talk about Web Components being a “native” way to build reusable components, but I hadn’t seen many real-world examples that felt complete — especially ones using the full set of lifecycle methods, event handling, and DOM updates. So I decided to roll my own counter.

Just a little one.

## The Code

[Here's the full code I used →](#)

The counter is made up of two components:

- `<simple-counter>`: The parent that manages state, listens to events, and updates the UI.
- `<increment-button>`: A child component that dispatches a custom event when clicked.

I used the full suite of lifecycle methods:

- `constructor()` – Initial setup and method binding.
- `connectedCallback()` – DOM insertion, event wiring, and hydration.
- `disconnectedCallback()` – Event teardown.
- `hydrate()` – Sets initial state (imagine server-provided data or localStorage in real use).
- `render()` – Updates the DOM based on internal state.
- `handleEvents()` – A dedicated method for handling event types, keeping logic centralized.

And yes, I used Shadow DOM. Because it’s 2025, and we can.

## Lessons Learned

### 1. **Web Components Feel Like Low-Level Tools — in a Good Way**

Writing components this way reminded me a bit of writing C after spending years in Python. You’re closer to the metal. You’re more aware of what’s happening under the hood — what’s bound to what, where state lives, and when DOM changes actually happen.

It's not always fast to write, but it’s deeply educational. It reinforces a mental model of how the browser really works.

### 2. **State Management is Still Up to You**

There's no `useState()` here. No reactive syntax. If something changes, you need to decide when and how to update the DOM. That can be tedious, but it’s also freeing — you can structure your code exactly the way you want without a framework’s opinion in the way.

But yes, after writing my fourth `this.render()` call, I started eyeing the Vue docs again. Just briefly.

### 3. **Custom Events are Surprisingly Nice**

One of the nicest parts of the experience was dispatching and listening to custom events. It’s clean. It’s explicit. And with `bubbles: true`, it plays well with composed UIs. This pattern feels intuitive once you get used to it.

It reminded me that so much of modern JavaScript is built on solid patterns from the platform itself — they’re just wrapped in newer abstractions.

### 4. **Shadow DOM Brings Real Encapsulation**

Encapsulation isn’t just a buzzword here — your styles and elements are actually scoped. That makes Web Components a great fit for truly reusable UI blocks, especially in large teams or design systems.

Just keep in mind that debugging can be a little trickier at first. Developer tools are your friend.

### 5. **You Need a Plan for Lifecycle Management**

The lifecycle hooks (`connectedCallback`, `disconnectedCallback`) give you the power to properly wire and clean up your components — something not every developer learns when sticking to high-level frameworks.

Using them here made me appreciate how easy it is to leak memory or have ghost event listeners if you're not careful. It's a good discipline.

## Was It Worth It?

For a small side project? Absolutely. I now have a better mental model of how the platform works, how state flows, and how native components are composed.

Would I build a full production app with just Web Components? Probably not. They shine brightest when you need:

- Framework-agnostic components.
- Reusable UI in large or multi-framework apps.
- Total control over structure and lifecycle.

But the experience was refreshing. And sometimes, taking a break from the “batteries-included” approach gives you just the right amount of creative friction to learn something new.

## Closing Thoughts

Web Components aren't magic. They're not even new anymore. But they are powerful — and they play nicely with the web’s native APIs in a way that most abstractions don’t.

Even if you never ship one, try building one. It might change how you write the rest of your JavaScript.

---

Have you built anything with Web Components lately? Feel free to yell at me on the fediverse or drop a comment if you’ve got better patterns to share.
