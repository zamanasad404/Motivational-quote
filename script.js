// Array of motivational and stoic quotes used in the PWA.
const quotes = [
  "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt",
  "Believe you can and you're halfway there. – Theodore Roosevelt",
  "The journey of a thousand miles begins with one step. – Lao Tzu",
  "What you think, you become. – Buddha",
  "It does not matter how slowly you go as long as you do not stop. – Confucius",
  "He who fears death will never do anything worthy of a living man. – Seneca",
  "You have power over your mind – not outside events. Realize this, and you will find strength. – Marcus Aurelius",
  "We are what we repeatedly do. Excellence, then, is not an act, but a habit. – Aristotle",
  "The happiness of your life depends upon the quality of your thoughts. – Marcus Aurelius",
  "If it is not right, do not do it; if it is not true, do not say it. – Marcus Aurelius",
  "Man conquers the world by conquering himself. – Zeno of Citium",
  "First say to yourself what you would be; and then do what you have to do. – Epictetus",
  "It is not death that a man should fear, but he should fear never beginning to live. – Marcus Aurelius",
  "The best revenge is to be unlike him who performed the injury. – Marcus Aurelius",
  "If you want to improve, be content to be thought foolish and stupid. – Epictetus",
  "Dwell on the beauty of life. Watch the stars, and see yourself running with them. – Marcus Aurelius",
  "Hardship often prepares an ordinary person for an extraordinary destiny. – C.S. Lewis",
  "Great things are done by a series of small things brought together. – Vincent van Gogh",
  "I think, therefore I am. – René Descartes",
  "Don't let what you cannot do interfere with what you can do. – John Wooden",
  "Whether you think you can or you think you can't, you're right. – Henry Ford",
  "Act as if what you do makes a difference. It does. – William James",
  "The only thing necessary for the triumph of evil is for good men to do nothing. – Edmund Burke",
  "A man is but the product of his thoughts. What he thinks, he becomes. – Mahatma Gandhi",
  "Happiness is not something ready-made. It comes from your own actions. – Dalai Lama",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
  "Quality is not an act, it is a habit. – Aristotle",
  "If you are going through hell, keep going. – Winston Churchill",
  "The impediment to action advances action. What stands in the way becomes the way. – Marcus Aurelius",
  "Waste no more time arguing about what a good man should be. Be one. – Marcus Aurelius",
  "Luck is what happens when preparation meets opportunity. – Seneca",
  "He who is not a good servant will not be a good master. – Plato",
  "You must be the change you wish to see in the world. – Mahatma Gandhi",
  "In the middle of difficulty lies opportunity. – Albert Einstein",
  "What lies behind us and what lies before us are tiny matters compared to what lies within us. – Ralph Waldo Emerson",
  "The mind is everything. What you think you become. – Buddha",
  "The greatest glory in living lies not in never falling, but in rising every time we fall. – Nelson Mandela",
  "Life is really simple, but we insist on making it complicated. – Confucius",
  "The purpose of our lives is to be happy. – Dalai Lama",
  "Dream big and dare to fail. – Norman Vaughan",
  "Do what you can, with what you have, where you are. – Theodore Roosevelt",
  "If you want to lift yourself up, lift up someone else. – Booker T. Washington",
  "The power of imagination makes us infinite. – John Muir",
  "What you do today can improve all your tomorrows. – Ralph Marston",
  "Success usually comes to those who are too busy to be looking for it. – Henry David Thoreau",
  "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
  "Keep your face always toward the sunshine—and shadows will fall behind you. – Walt Whitman",
  "The best way to predict the future is to create it. – Peter Drucker",
  "To live is the rarest thing in the world. Most people exist, that is all. – Oscar Wilde",
  "It is never too late to be what you might have been. – George Eliot"
];

// Retrieve the list of previously visited quotes from localStorage or start with an empty array.
let visitedQuotes = JSON.parse(localStorage.getItem('visitedQuotes')) || [];

// Update the list of past quotes displayed in the UI.
function updateOldQuotesList() {
  const list = document.getElementById('old-quotes-list');
  list.innerHTML = '';
  visitedQuotes.forEach((quote) => {
    const li = document.createElement('li');
    li.textContent = quote;
    list.appendChild(li);
  });
}

// Show a new random quote to the user.
function showNewQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById('quote').textContent = quote;
  // Add to visited list if not already present.
  if (!visitedQuotes.includes(quote)) {
    visitedQuotes.push(quote);
    localStorage.setItem('visitedQuotes', JSON.stringify(visitedQuotes));
    updateOldQuotesList();
  }
}

// Event listener for the 'Reveal Quote' button.
document.getElementById('new-quote-btn').addEventListener('click', showNewQuote);

// Event listener for the WhatsApp share button.
document.getElementById('share-btn').addEventListener('click', () => {
  const currentQuote = document.getElementById('quote').textContent;
  // If no quote has been displayed, alert the user.
  if (!currentQuote || currentQuote.startsWith('Press')) {
    alert('Please reveal a quote first!');
    return;
  }
  const encoded = encodeURIComponent(currentQuote);
  const url = `https://api.whatsapp.com/send?text=${encoded}`;
  // Open the WhatsApp share URL in a new tab/window.
  window.open(url, '_blank');
});

// When the page loads, update the list and register the service worker.
window.addEventListener('load', () => {
  updateOldQuotesList();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').catch((err) => {
      console.error('Service Worker registration failed:', err);
    });
  }
});