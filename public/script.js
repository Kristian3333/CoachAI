document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    let isDark = true;

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        isDark = !isDark;
        themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });

    // Chat interface functionality
    const floatingImage = document.getElementById('floatingImage');
    const chatInterface = document.getElementById('chatInterface');
    const chatOutput = document.getElementById('chatInOutput');
    const userInput = document.getElementById('userInput');

    if (floatingImage) {
        floatingImage.addEventListener('click', function() {
            openChat();
        });
    }

    function openChat() {
        chatInterface.style.display = chatInterface.style.display === 'block' ? 'none' : 'block';
        console.log(chatInterface.style.display === 'block' ? 'Chat opened' : 'Chat closed');
    }

    // Message sending functionality
    userInput.addEventListener('keyup', function(event) {
        if (event.key === "Enter" || event.keyCode === 13) {
            sendMessage();
            event.preventDefault();
        }
    });

    function sendMessage() {
        if (userInput.value.trim() !== "") {
            chatOutput.innerHTML += `<div class="user-message">You: ${userInput.value}</div>`;

            fetch('/api/sendMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userInput.value })
            })
            .then(response => response.json())
            .then(data => {
                chatOutput.innerHTML += `<div class="ai-response">AI: ${data.reply}</div>`;
                userInput.value = '';
                chatOutput.scrollTop = chatOutput.scrollHeight;
            })
            .catch(err => {
                console.error('Error:', err);
                chatOutput.innerHTML += `<div class="error-message">Error: Could not send message.</div>`;
            });
        }
    }

    // Form submission handling
    const form = document.getElementById('myForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(form);

            fetch('/api/posts.js', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong on api server!');
                }
            })
            .then(response => {
                console.log('Success:', response);
                window.location.href = 'main.html';
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }

    // Scrolling behavior for floating elements
    window.onscroll = function() {
        const yOffset = window.pageYOffset + 100;
        if (floatingImage) {
            floatingImage.style.top = yOffset + 'px';
        }
        const chatText = document.getElementById('chatText');
        if (chatText) {
            chatText.style.top = (yOffset + 110) + 'px';
        }
    };
});