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
        fetch('/sendMessage', {
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
document.addEventListener('DOMContentLoaded', function() {
    function sendMessage() {
        const input = document.getElementById('userInput');
        const chatOutput = document.getElementById('chatOutput');

        if (input.value.trim() !== "") {
            chatOutput.innerHTML += `<div class="user-message">You: ${input.value}</div>`;
            // Example of sending a message; adjust according to actual API or mockup
            setTimeout(() => { // Simulate API response delay
                chatOutput.innerHTML += `<div class="ai-response">AI: Thanks for your message!</div>`;
                chatOutput.scrollTop = chatOutput.scrollHeight;
            }, 1000);
            input.value = '';
        }
    }

    const sendButton = document.querySelector('button');
    sendButton.addEventListener('click', sendMessage);
});
}
document.addEventListener('DOMContentLoaded', function() {
    const chatInterface = document.getElementById('chatInterface');
    let isResizing = false;
    let lastDownX = 0;
    let lastDownY = 0;
    let width = chatInterface.offsetWidth;
    let height = chatInterface.offsetHeight;

    const resizer = document.createElement('div');
    resizer.style.width = '10px';
    resizer.style.height = '10px';
    resizer.style.background = 'orange';
    resizer.style.position = 'absolute';
    resizer.style.right = '0';
    resizer.style.bottom = '0';
    resizer.style.cursor = 'se-resize';
    chatInterface.appendChild(resizer);

    resizer.addEventListener('mousedown', function(e) {
        isResizing = true;
        lastDownX = e.clientX;
        lastDownY = e.clientY;
        width = chatInterface.offsetWidth;
        height = chatInterface.offsetHeight;
        e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
        if (!isResizing) return;
        const offsetX = e.clientX - lastDownX;
        const offsetY = e.clientY - lastDownY;

        // Sensitivity adjustment: only resize when a certain pixel threshold is reached
        if (Math.abs(offsetX) > 10 || Math.abs(offsetY) > 10) {
            chatInterface.style.width = (width + offsetX) + 'px';
            chatInterface.style.height = (height + offsetY) + 'px';
            width += offsetX;
            height += offsetY;
            lastDownX = e.clientX;
            lastDownY = e.clientY;
        }
    });

    document.addEventListener('mouseup', function() {
        isResizing = false;
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('userInput');
    input.addEventListener('keyup', function(event) {
        if (event.key === "Enter" || event.keyCode === 13) {
            sendMessage();
            event.preventDefault(); // Prevent default Enter key behavior (e.g., form submission)
        }
    });
});
