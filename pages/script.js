document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    let isDark = true;

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        isDark = !isDark;
        themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });

    // Attach an event listener to the image for opening the chat interface
    const floatingImage = document.getElementById('floatingImage');
    if (floatingImage) {
        floatingImage.addEventListener('click', function() {
            openChat();  // This ensures that the click is handled through JavaScript
        });
    }

    window.onscroll = function() {
        const yOffset = window.pageYOffset + 100;
        if (floatingImage) {
            floatingImage.style.top = yOffset + 'px';
        }
        const chatText = document.getElementById('chatText');
        if (chatText) {
            chatText.style.top = (yOffset + 110) + 'px';  // Positioned 110px below the image top
        }
    };
});

function openChat() {
    var chatInterface = document.getElementById('chatInterface');
    if (chatInterface.style.display === 'none' || chatInterface.style.display === '') {
        chatInterface.style.display = 'block';
        console.log('Chat opened');
    } else {
        chatInterface.style.display = 'none';
        console.log('Chat closed');
    }
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const chatOutput = document.getElementById('chatOutput');

    if (input.value.trim() !== "") {
        // Display the user's message in the chat output
        chatOutput.innerHTML += `<div class="user-message">You: ${input.value}</div>`;

        // Send the user's message to the OpenAI API
        fetch('/api/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: input.value })
        })
        .then(response => response.json())
        .then(data => {
            // Display the OpenAI's response in the chat output
            chatOutput.innerHTML += `<div class="ai-response">AI: ${data.reply}</div>`;
            input.value = ''; // Clear input after sending
            chatOutput.scrollTop = chatOutput.scrollHeight; // Scroll to the latest message
        })
        .catch(err => {
            console.error('Error:', err);
            chatOutput.innerHTML += `<div class="error-message">Error: Could not send message.</div>`;
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('userInput');
    input.addEventListener('keyup', function(event) {
        if (event.key === "Enter" || event.keyCode === 13) {
            sendMessage();
            event.preventDefault(); // Prevent default Enter key behavior (e.g., form submission)
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        
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
            window.location.href = 'main.html'; // Redirect to main.html on success
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});