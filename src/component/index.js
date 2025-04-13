class CardDeck extends HTMLElement {
    decision_threshold = null;
    isAnimating = false;
    $actualCard = null;
    startX = 0;
    startY = 0;
    pullDeltaX = 0;
    pullDeltaY = 0;

    constructor() {
        super();
        this.startDrag = this.startDrag.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
        this.start();
    }

    start() {
        this.decision_threshold = Number(this.dataset.threshold ?? 75);
        this.addEventListener("mousedown", this.startDrag);
        this.addEventListener("touchstart", this.startDrag, { passive: false });
    }

    startDrag(event) {
        event.stopPropagation();
        event.preventDefault();
        if (this.isAnimating || !(this.$actualCard = this.lastElementChild)) return;

        this.setCoords(event);
        this.addListeners();
    }

    setCoords(event) {
        this.startX = this.getCoord(event, 'X');
        this.startY = this.getCoord(event, 'Y');
    }

    getCoord(event, axis) {
        if (typeof TouchEvent !== 'undefined' && event instanceof TouchEvent) {
            return event.touches[0][`page${axis}`];
        }
        return event[`page${axis}`];
    }

    addListeners() {
        document.addEventListener("mousemove", this.onMove);
        document.addEventListener("mouseup", this.onEnd);
        document.addEventListener("touchmove", this.onMove, { passive: false });
        document.addEventListener("touchend", this.onEnd, { passive: true });
    }

    onMove(event) {
        this.pullDeltaX = this.getCoord(event, 'X') - this.startX;
        this.pullDeltaY = this.getCoord(event, 'Y') - this.startY;

        if (!this.pullDeltaX && !this.pullDeltaY) return;

        this.isAnimating = true;
        const deg = this.pullDeltaX / 14;

        if (!this.$actualCard) return;

        this.$actualCard.classList.add('dragged');
        this.$actualCard.classList.toggle('to-left', this.pullDeltaX <= 0);
        this.$actualCard.classList.toggle('to-right', this.pullDeltaX >= 0);
        this.$actualCard.classList.toggle('to-top', this.pullDeltaY <= 0);
        this.$actualCard.classList.toggle('to-bottom', this.pullDeltaY >= 0);
        this.$actualCard.style.transform = `translateX(${this.pullDeltaX}px) translateY(${this.pullDeltaY}px) rotate(${deg}deg)`;
        this.$actualCard.style.cursor = "grabbing";
    }

    onEnd() {
        this.removeListeners();

        this.$actualCard.classList.remove('dragged');

        const decisionMade =
            Math.abs(this.pullDeltaX) >= this.decision_threshold ||
            Math.abs(this.pullDeltaY) >= this.decision_threshold;

        if (!this.$actualCard) return;

            this[decisionMade ? 'applyCardDecision' : 'resetCardPosition']();

        this.endCardAnimation();
    }

    removeListeners() {
        document.removeEventListener("mousemove", this.onMove);
        document.removeEventListener("mouseup", this.onEnd);
        document.removeEventListener("touchmove", this.onMove);
        document.removeEventListener("touchend", this.onEnd);
    }

    applyCardDecision() {
        const goRight = this.pullDeltaX >= 0;
        const goDown = this.pullDeltaY >= 0;

        this.$actualCard.classList.add(goRight ? "go-right" : "go-left", goDown ? "go-down" : "go-up");
                
        const discard = (name) => this.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: { goRight, goDown, card: this.$actualCard } }));

        discard("discard");

        this.$actualCard.addEventListener("transitionend", () => {
            this.$actualCard?.remove();
            discard("cardRemoved");
        });
    }

    resetCardPosition() {
        this.$actualCard.classList.add("reset");
        this.$actualCard.classList.remove("go-right", "go-left", "go-down", "go-up", 'to-left', 'to-right', 'to-top', 'to-bottom');
    }

    endCardAnimation() {
        this.$actualCard.addEventListener("transitionend", () => {
            this.$actualCard?.removeAttribute("style");
            this.$actualCard?.classList.remove("reset");
            this.pullDeltaX = 0;
            this.pullDeltaY = 0;
            this.isAnimating = false;
        });
    }
}

customElements.define('card-deck', CardDeck);