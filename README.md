# Card Deck Web Component

## [Live Demo](https://swipeable-card-deck.vercel.app/)

## CSS and Component Import

To use the component, ensure you include the CSS from the `dist` folder, as the package only includes the Web Component JavaScript when imported into your project.

```html
<link rel="stylesheet" href="@salvadorsru/card-deck/dist/style.min.css" />
<script type="module" src="@salvadorsru/card-deck/index.min.js"></script>
```

Alternatively, you can import the package directly in your JavaScript/TypeScript files:

```javascript
import "@salvadorsru/card-deck";
```

> **Note:** Importing the package via JavaScript **does not include the CSS**. You will need to manually include the CSS from the `dist` folder in your project.

### Events

The `card-deck` component emits a custom event named `discard` whenever a card is removed from the deck.

An event called `cardRemoved` is also emitted when a card has been discarded and is permanently removed.
This means that the discarded card has completely disappeared from the screen after its animation finishes,
and its HTML element has been removed.

**Triggered By**: The <card-deck> component when a card is removed.

#### Event Detail Properties:

- _goRight_ (boolean): true if the card was discarded to the right, false if to the left.
- _goDown_ (boolean): true if the card was discarded downward, false if upward.
- _card_ (HTMLElement): A reference to the removed card's HTML element.

### Behavior

- Cards move left or right with the `.go-left` and `.go-right` classes.
- The `.reset` class resets the card's position.
- Card moves it will have a class with the adjective `.dragged`. Depending on its direction, it also gets one of the following classes `.to-left`, `.to-right`, `.to-top`, `.to-bottom`.

These variables allow flexibility in adjusting the appearance and behavior of the card deck without modifying the core CSS.

## Use example

### Basic usage

You can statically define all the elements as follows:

```html
<card-deck>
  // Card container
  <div></div>
  // Card container
  <div></div>
  // Card container
</card-deck>
```

### External card deck management

You can programmatically control the behavior of a `<card-deck>` using the following subpackage.

### Include via HTML

```html
<script type="module" src="@salvador/card-deck/emulate.min.js"></script>
```

Or import via JavaScript

```javascript
import emulate from "@salvadorsru/card-deck/emulate";
// or
import { discardToRight, discardToLeft } from "@salvadorsru/card-deck/emulate";
```

This module provides the `discardToRight` and `discardToLeft` functions,
which allow you to move the card deck to the right or left through code, easily and programmatically.

### Example Usage

```javascript
import { discardToRight, discardToLeft } from "@salvadorsru/card-deck/emulate";

const $deck = document.querySelector("card-deck");

discardToRight($deck);
// or
discardToLeft($deck);
```

## CSS Variables for `card-deck`

The `card-deck` component supports various CSS variables to allow customization of its appearance and behavior.

### Size Variables

- `--card-width` (default: `150px`): Defines the width of each card **\*Required**.
- `--card-height` (default: `200px`): Defines the height of each card **\*Required**.
- `--card-ratio` (default: `1.5`): Sets the aspect ratio of the cards.

### Animation Variables

- `--transition-time` (default: `0.3s`): Controls the duration of the transform animation when a card moves.
- `--transition-opacity` (default: `0.3s`): Defines the transition time for opacity changes.
- `--transition-rotation` (default: `0.3s`): Sets the transition duration for the rotation effect.
