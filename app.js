// <<< YEH FINAL TEST WALA CODE HAI >>>

document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');

    // Humne NewsAPI ki jagah ek simple, open Quotes API daal di hai
    const API_URL = `https://api.quotable.io/random`;

    async function fetchQuote() {
        try {
            // Loader ko screen par dikhao
            newsContainer.innerHTML = `<div class="loader"></div>`;

            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            displayQuote(data); // Data milne par displayQuote function chalao
        } catch (error) {
            newsContainer.innerHTML = `<p style="text-align:center; color: red; font-weight: bold;">Oops! Kuch gadbad ho gayi.</p>`;
        }
    }

    // Yeh naya function hai quote ko dikhane ke liye
    function displayQuote(quote) {
        newsContainer.innerHTML = ''; // Loader hatayein
        
        const card = document.createElement('div');
        card.className = 'article-card';
        // Hum news ki jagah quote ka content aur author dikha rahe hain
        card.innerHTML = `
            <div class="article-content">
                <h3 style="font-size: 1.5em; line-height: 1.4;">"${quote.content}"</h3>
                <p style="text-align: right; font-weight: bold; margin-top: 20px;">- ${quote.author}</p>
            </div>
            <button onclick="fetchQuote()">Get Another Quote</button>
        `;
        newsContainer.appendChild(card);
    }

    // App shuru hone par fetchQuote chalao
    fetchQuote();
});
