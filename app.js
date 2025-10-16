// <<< YEH FINAL, WORKING CODE HAI >>>

document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');
    const quizModal = document.getElementById('quiz-modal');
    const quizQuestionEl = document.getElementById('quiz-question');
    const quizOptionsEl = document.getElementById('quiz-options');
    const quizFeedbackEl = document.getElementById('quiz-feedback');
    const nextQuizBtn = document.getElementById('next-quiz-btn');

    // Aapki API key
    const API_KEY = 'cf27baffca744e16abb8977db4521419';
    const API_URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;

    let articlesData = [];

    async function fetchNews() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('API Key invalid or Network Error');
            }
            const data = await response.json();
            articlesData = data.articles.filter(a => a.urlToImage && a.title && a.description && a.source.name);
            displayNews();
        } catch (error) {
            newsContainer.innerHTML = `<p style="text-align:center; color: red; font-weight: bold;">News load nahi ho saki. Apni API key ya internet connection check karein.</p>`;
        }
    }

    function displayNews() {
        newsContainer.innerHTML = ''; // Loader hatayein
        articlesData.forEach((article, index) => {
            const card = document.createElement('div');
            card.className = 'article-card';
            card.innerHTML = `
                <img src="${article.urlToImage}" alt="News Image">
                <div class="article-content">
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                </div>
                <button class="quiz-btn" data-index="${index}">Test Your Knowledge!</button>
            `;
            newsContainer.appendChild(card);
        });
    }

    newsContainer.addEventListener('click', e => {
        if (e.target.classList.contains('quiz-btn')) {
            showQuiz(articlesData[parseInt(e.target.dataset.index)]);
        }
    });

    function showQuiz(article) {
        const question = `Yeh khabar kis news source se hai?`;
        const correctAnswer = article.source.name;
        const fakeSources = ["Zee News", "NDTV", "The Times of India", "India Today"];
        const options = [...new Set([correctAnswer, ...fakeSources])].sort(() => Math.random() - 0.5).slice(0, 4);
        
        quizQuestionEl.textContent = question;
        quizOptionsEl.innerHTML = '';
        options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => checkAnswer(option, correctAnswer, event.target);
            quizOptionsEl.appendChild(button);
        });

        quizFeedbackEl.textContent = '';
        quizModal.classList.remove('hide');
    }

    function checkAnswer(selected, correct, button) {
        Array.from(quizOptionsEl.children).forEach(btn => btn.disabled = true);
        if (selected === correct) {
            button.classList.add('correct');
            quizFeedbackEl.textContent = "Awesome! Sahi jawab.";
        } else {
            button.classList.add('wrong');
            quizFeedbackEl.textContent = `Galat! Sahi jawab hai: ${correct}`;
        }
    }

    nextQuizBtn.addEventListener('click', () => quizModal.classList.add('hide'));

    fetchNews();
});
