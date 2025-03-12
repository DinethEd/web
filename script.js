// Load articles from localStorage on page load
document.addEventListener('DOMContentLoaded', loadArticles);

let isAdmin = false; // To track if the user is authenticated

function followUs() {
    alert("Thank you for following! Stay tuned for more updates.");
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

function publishArticle() {
    const content = document.getElementById('articleContent').value;
    if (content.trim()) {
        saveArticle(content);
        document.getElementById('articleContent').value = '';
        showSection('articles');
    } else {
        alert("Please write something before publishing.");
    }
}

function saveArticle(content) {
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    articles.unshift(content); // Add new article to the beginning
    localStorage.setItem('articles', JSON.stringify(articles));
    displayArticles(articles);
}

function loadArticles() {
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    displayArticles(articles);
}

function displayArticles(articles) {
    const articleList = document.getElementById('articleList');
    articleList.innerHTML = ''; // Clear the list
    articles.forEach((article, index) => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article-item');
        articleDiv.innerHTML = `
            <p>${article}</p>
            ${isAdmin ? `<button onclick="deleteArticle(${index})">Delete</button>` : ''}
            <hr>`;
        articleList.appendChild(articleDiv);
    });
}

function authenticateAdmin() {
    const password = prompt("Enter admin password:");
    if (password === "YourSecurePassword") { // Replace "YourSecurePassword" with a strong password
        isAdmin = true;
        alert("Admin access granted!");
        loadArticles(); // Reload articles to show delete buttons
    } else {
        alert("Incorrect password!");
    }
}

function deleteArticle(index) {
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    articles.splice(index, 1); // Remove the article at the specified index
    localStorage.setItem('articles