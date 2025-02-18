# Card Deck Web Component

## [Live Demo](https://searchable-select.vercel.app/)

## CSS Variables for `card-deck`

The `card-deck` component supports various CSS variables to allow customization of its appearance and behavior.

### Size Variables
- `--card-width` (default: `150px`): Defines the width of each card __*Required__.
- `--card-height` (default: `200px`): Defines the height of each card __*Required__.
- `--card-ratio` (default: `1.5`): Sets the aspect ratio of the cards.

### Animation Variables
- `--transition-time` (default: `0.3s`): Controls the duration of the transform animation when a card moves.
- `--transition-opacity` (default: `0.3s`): Defines the transition time for opacity changes.
- `--transition-rotation` (default: `0.3s`): Sets the transition duration for the rotation effect.

### Behavior
- Cards move left or right with the `.go-left` and `.go-right` classes.
- The `.reset` class resets the card's position.
- Card moves it will have a class with the adjective `.dragged` and depending on position `.to-left`, `.to-right`, `.to-top`, `.to-bottom`.

These variables allow flexibility in adjusting the appearance and behavior of the card deck without modifying the core CSS.


## CSS and Component Import

To use the component, ensure you include the CSS from the `dist` folder, as the package only includes the Web Component JavaScript when imported into your project. 

```html
<link rel="stylesheet" href="path/to/dist/style.min.css">
<script type="module" src="path/to/index.min.js"></script>
```

Alternatively, you can import the package directly in your JavaScript/TypeScript files:

```javascript
import '@salvadorsru/card-deck';
```

> **Note:** Importing the package via JavaScript **does not include the CSS**. You will need to manually include the CSS from the `dist` folder in your project.

## Use example


### Basic usage
You can statically define all the elements as follows:

```html
<card-deck>
    <div></div> // Card container
    <div></div> // Card container
</card-deck>
```