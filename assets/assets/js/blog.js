document.addEventListener('DOMContentLoaded', () => {
    const blogContainer = document.querySelector('.blog-post');
    const backButton = document.getElementById('back-button');
    const themeSwitcher = document.getElementById('themeToggle');
    const footerAuthor = document.getElementById('footer-author');

    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeSwitcher.checked = true;
        }
    } else {
        document.body.classList.add('light-mode'); // Ensure light-mode by default
    }

    // Listen for the switcher to be clicked and then toggle the theme
    themeSwitcher.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    // Retrieve and display blog posts
    const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    let lastAuthor = '';

    blogPosts.forEach(post => {
        const postContainer = document.createElement('div');
        postContainer.className = 'blog-post-container';

        const blogTitle = document.createElement('h2');
        blogTitle.textContent = post.title;

        const blogContent = document.createElement('p');
        blogContent.textContent = post.content;

        const blogAuthor = document.createElement('p');
        blogAuthor.textContent = `Posted by: ${post.username}`;
        blogAuthor.style.color = 'grey';
        blogAuthor.style.fontSize = '15px';
        blogAuthor.style.textTransform = 'capitalize';

        postContainer.appendChild(blogTitle);
        postContainer.appendChild(blogContent);
        postContainer.appendChild(blogAuthor);
        blogContainer.appendChild(postContainer);

        lastAuthor = post.username;
    });

    // Set the footer author text to the last post's author
    footerAuthor.textContent = lastAuthor;

    // Add event listener to back button
    backButton.addEventListener('click', () => {
        // Clear form data in localStorage
        localStorage.removeItem('currentTitle');
        localStorage.removeItem('currentContent');
        localStorage.removeItem('currentAuthor');

        // Navigate back to index.html
        window.location.href = 'index.html';
    });
});
