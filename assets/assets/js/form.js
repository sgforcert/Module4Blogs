document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('themeToggle');
    const form = document.querySelector('.centered-form');

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

    // Clear saved blog post data
    localStorage.removeItem('currentTitle');
    localStorage.removeItem('currentContent');
    localStorage.removeItem('currentAuthor');

    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const username = document.getElementById('username').value;
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        // Retrieve existing blog posts
        let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

        // Add new blog post
        blogPosts.push({ username, title, content });

        // Store updated blog posts in localStorage
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts));

        // Redirect to the blog.html page
        window.location.href = 'blog.html';
    });
});
