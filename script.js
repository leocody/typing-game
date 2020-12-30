const quotes = [
    'Weak. Immature. That is not what you call a man. Sabito',
    'No one can break the bond that Nezuko and I share! Tanjiro',
    'It is the heart that drives people. So, your heart can grow as strong as you want it to! Tanjiro',
    'Comin through! Comin through! Inosuke',
    'No need to ponder. My only job is to slay this demon as I was told. Kanao',
    'Do not ever give others a chance to murder you! Giyuu',
    'The red flame sword of Rengoku will burn you down to the bone! Kyojuro',
    'I must do what is my duty. I will not let anyone here die! Kyojuro',
    'Live with your chest high. Kyojuro',
    'Anyone who hurts my sister, Hashira or not, I will not let you get away with it. Tanjiro',
    'I swear your big brother will save you no matter what! Tanjiro',
    'Do not cry. Do not despair. Now it is not the time for that. Giyuu',
    'Give it all you have got, Tanjiro! Give it all you have got! Tanjiro',
    'I can pick up a sound so gentle and kind from Tanjiro, it makes me want to cry. Zenitsu',
    'Well, I am sorry. You have not even realized that people do not like you. Shinobu',
    'I can see that we will never be friends. Oh,what a pity.',
    'It is the wind that cuts your neck! Sanemi',
    'Breath of Water Eleventh Form Lull Giyuu',
    'Breath of Flame Ninth Form Purgatory Kyojuro',
    'Breath of Thunder First Form Thunderclap and Flash Zenitsu',
    'Breath of Flower Final Form Vermilion Eye Kanao',
    'Breath of Mist Seventh Form Obscuring Muichiro',
    'Hinokami Kagura Dragon Sun Halo Head Dance Tanjiro',
    ''
];


// store the list of words and the index of the word the player is currently typing
let best_time = 9999
let words = [];
let wordIndex = 0;
// the starting time
let startTime = Date.now();
// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');



document.getElementById('start').addEventListener('click', () => {
    // get a quote 0 ~ quotes.length(10)
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    // Put the quote into an array of words
    words = quote.split(' ');
    // reset the word index for tracking
    wordIndex = 0;

    // UI updates
    // Create an array of span elements so we can set a class
    const spanWords = words.map(function (word) { return `<span>${word} </span>` });
    // Convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join('');
    // Highlight the first word
    quoteElement.childNodes[0].className = 'highlight';
    // Clear any prior messages
    messageElement.innerText = '';

    // Setup the textbox
    // Clear the textbox
    typedValueElement.value = '';
    // set focus
    typedValueElement.focus();
    // set the event handler

    // Start the timer
    startTime = new Date().getTime();
});

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

let errorSound = new sound("wrong_answer.mp3");

typedValueElement.addEventListener('input', (event) => {
    // Get the current word
    const currentWord = words[wordIndex];
    // get the current value
    const typedValue = typedValueElement.value;

    // game clear
    if (typedValue === currentWord && wordIndex === words.length - 1) {
        // end of sentence
        // Display success
        const elapsedTime = new Date().getTime() - startTime;
        if (best_time > elapsedTime / 1000) {
            best_time = elapsedTime / 1000
            const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds and you have your best record ${best_time} seconds!!`;
            messageElement.innerText = message;
        } else {
            const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds. The best score is ${best_time}`;
            messageElement.innerText = message;
        }

        // word is correct but words remain
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        // end of word
        // clear the typedValueElement for the new word
        typedValueElement.value = '';
        // move to the next word
        wordIndex++;
        // reset the class name for all elements in quote
        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = '';
        }
        // highlight the new word
        if (quoteElement.childNodes.length > wordIndex) {
            quoteElement.childNodes[wordIndex].className = 'highlight';
        }

        // typed  word is correct but white space is not typed
    } else if (currentWord.startsWith(typedValue)) {
        // currently correct
        // highlight the next word
        typedValueElement.className = '';
        // other
    } else {
        // error state
        typedValueElement.className = 'error';
        if (event.inputType !== "deleteContentBackward") {
            errorSound.play();
        }


    }
});