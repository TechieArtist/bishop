document.addEventListener('DOMContentLoaded', function() {
    // Toggle chat functionality
    const toggleChatBtn = document.getElementById('toggle-chat-btn');
    const chatContainer = document.querySelector('.chat-container');

    toggleChatBtn.addEventListener('click', function() {
        chatContainer.style.display = chatContainer.style.display === 'block' ? 'none' : 'block';
    });

    // Chat submission functionality
    document.getElementById('submit').addEventListener('click', function() {
        const prompt = document.getElementById('prompt').value;
        fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('response').innerText = data.responseMessage;
        })
        .catch(error => console.error('Error:', error));
    });

    // Modal functionality
    var modal = document.getElementById("myModal");
    var img = document.getElementById("myImg");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    img.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.querySelector("img").src;
        captionText.innerHTML = this.querySelector("img").alt;
    };
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() { 
        modal.style.display = "none";
    };

    // Zoom toggle functionality
    modalImg.addEventListener('click', function() {
        this.classList.toggle('zoomed');
        this.style.cursor = this.classList.contains('zoomed') ? 'zoom-out' : 'zoom-in';
    });
});
