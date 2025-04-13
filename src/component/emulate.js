function emulate(cardDeck, direction) {
    if (cardDeck.isAnimating || !(cardDeck.$actualCard = cardDeck.lastElementChild)) return;

    cardDeck.isAnimating = true;

    const adjustment = 20;
    const deltaX = cardDeck.decision_threshold * direction + adjustment * direction;

    cardDeck.onMove({
        touches: [{ pageX: cardDeck.startX + deltaX, pageY: cardDeck.startY }],
        pageX: cardDeck.startX + deltaX,
        pageY: cardDeck.startY,
    });

    cardDeck.applyCardDecision();
    cardDeck.endCardAnimation();
}

export function discardToRight(ref) {
    emulate(ref, 1)
}

export function discardToLeft(ref) {
    emulate(ref, -1)
}

export default {
    discardToRight, discardToLeft
}