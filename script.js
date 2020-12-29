const quotes = [
    'Weak. Immature. That’s not what you call a man.',
    'No one can break the bond that Nezuko and I share!',
    'It’s the heart that drives people. So, your heart can grow as strong as you want it to!',
    'Comin’ through! Comin’ through!',
    'No need to ponder. My only job is to slay this demon as I was told.',
    'Don’t ever give others a chance to murder you!',
    'The red flame sword of Rengoku will burn you down to the bone!',
    'I must do what is my duty. I won’t let anyone here die!',
    'Live with your chest high.',
    'Anyone who hurts my sister, Hashira or not, I won’t let you get away with it.',
];
// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
// the starting time
let startTime = Date.now();
// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

document.getElementById('start').addEventListener('click', () => {
    // get a quote
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