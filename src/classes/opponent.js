export default class Opponent {
    library = [];

    constructor () {
        this.library = [];
        this.setDecklist();
    }

    shuffleLibrary () {
        let cards = Object.assign(this.library, []);

        for (var i = cards.length -1; i > 0; --i) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        }

        this.library = cards;
    }
}