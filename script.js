let timer;
let timeLeft;
let selectedTime = 15;
let typingStarted = false;
let currentText = '';
const startSound = document.getElementById('start-sound');
const endSound = document.getElementById('end-sound');

const texts = {
    punctuation: [
        "Wait—what just happened? I couldn't believe my eyes; the document was gone! Everything I'd worked on, for hours—no, days—vanished in an instant. 'What do I do now?' I thought, panic rising. Should I call tech support, or try to recover it myself? Either way, I had to act fast; time was running out, and the deadline was looming. But where did it go—how could this happen?",
        
        "She looked out the window, sighed, and muttered, 'This is going to be one of those days, isn't it?' The rain, pouring down in torrents, made the streets look like rivers. Cars honked; pedestrians rushed by, umbrellas clutched tightly. It was chaos—pure, unadulterated chaos. 'Why didn't I stay home?' she wondered. But it was too late; the day had already begun.",
        
        "They argued, 'You never listen!'—'But you never understand!'—back and forth, until neither knew what they were fighting about. It was exhausting, draining—like running in circles, getting nowhere. They needed a break, a moment to breathe, but neither would back down. 'Why is this so hard?' one of them finally asked, voice softening. 'Maybe,' came the reply, 'we're just too different.'",
        
        "As the clock struck midnight—ding, dong, ding, dong—she crept through the house, careful not to make a sound. The floorboards creaked—just a little—and she froze, heart pounding. Did someone hear that? No, it was just her imagination—probably. She continued, slowly, cautiously, toward the old, wooden chest in the corner. What secrets did it hold? She was about to find out...",
        
        "The report was due at 5:00 PM sharp; no excuses, no exceptions. Everyone knew the stakes—they couldn't afford any mistakes. 'Are you ready?' the team leader asked. Nods all around. 'Then let's do this!' Fingers flew over keyboards—tap, tap, tap—until, finally, it was done. But as they read through it, they noticed something—something small, but significant. Could it be fixed in time?"
    ],
    numbers: [
        "123 456 789 101112 131415 161718 192021 222324 252627 282930 313233 343536 373839 404142 434445 464748 495051",
        
        "6789 234 567 890 123 456 789 1023 456 7890 123 4567 8901 234 567 8901 456 789 012 345 678 901 234 567 890 1234",
        
        "321 654 987 123 654 789 321 456 789 321 654 987 123 654 987 321 654 987 123 456 789 321 654 987 123 654 987",
        
        "987654 321 123456 789 987654 321 456789 123 987654 321 123456 789 987654 321 456789 123 987654 321 123456 789",
        
        "111 222 333 444 555 666 777 888 999 000 111 222 333 444 555 666 777 888 999 000 111 222 333 444 555 666 777"
    ],
    words: [
        "the quick brown fox jumps over the lazy dog. every small step counts. keep practicing, and you will improve. focus on accuracy first, then work on speed. typing is a skill that gets better with time.",
        
        "practice makes perfect. don't rush, just keep typing. remember to breathe and stay relaxed. the more you type, the more natural it becomes. take your time and let your fingers find their rhythm.",
        
        "each day brings a new challenge. keep your goals in mind and take it one step at a time. typing fast is important, but typing accurately is even more so. stay patient and keep going.",
        
        "small words can make a big difference. focus on the basics and build your foundation. every word you type is a step toward improvement. keep your eyes on the screen and your fingers on the keys.",
        
        "learning to type well takes time. don't get discouraged by mistakes. every error is an opportunity to learn and grow. keep your fingers moving and your mind focused. with practice, you will succeed."
    ],
    quote: [
        "to be, or not to be, that is the question. whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles and by opposing end them.",
        
        "the only limit to our realization of tomorrow is our doubts of today. believe in yourself, for you have the strength to overcome any challenge. remember, doubt is the enemy of progress and achievement.",
        
        "in the end, it's not the years in your life that count, it's the life in your years. make every moment count, and live with purpose and passion. life is short, so make it meaningful.",
        
        "success is not final, failure is not fatal: it is the courage to continue that counts. keep pushing forward, even when the road is tough. resilience is the key to overcoming obstacles.",
        
        "do not go where the path may lead, go instead where there is no path and leave a trail. blaze your own trail, and don't be afraid to take risks. innovation comes from those who dare to be different."
    ]
};

// Sets the text for the selected category
function setCategory(category) {
    const randomIndex = Math.floor(Math.random() * texts[category].length);
    currentText = texts[category][randomIndex];
    document.getElementById('text').innerText = currentText;
}

// Updates the timer display
function setTime(time) {
    selectedTime = time;
    document.getElementById('time-left').innerText = selectedTime;
}

// Prompts for and sets a custom time
function setCustomTime() {
    const customTime = prompt("Enter custom time in seconds:");
    if (customTime && !isNaN(customTime) && parseInt(customTime, 10) > 0) {
        selectedTime = parseInt(customTime, 10);
        document.getElementById('time-left').innerText = selectedTime;
    } else {
        alert("Please enter a valid positive number.");
    }
}

// Starts the typing test
function startTest() {
    const typingArea = document.getElementById('typing-area');
    typingArea.disabled = false;
    typingArea.focus();
    typingArea.value = '';
    startSound.play();
    startTimer();
}

// Initializes and starts the timer
function startTimer() {
    clearInterval(timer);
    timeLeft = selectedTime;
    document.getElementById('time-left').innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            finishTest();
        }
    }, 1000);
}

// Calculates and displays the results
function finishTest() {
    const typedText = document.getElementById('typing-area').value.trim();
    const totalWords = currentText.split(/\s+/).length;
    const typedWords = typedText.split(/\s+/).length;

    // Calculate WPM based on the total time
    const wpm = (typedWords / selectedTime) * 60;
    
    // Calculate accuracy
    const typedTextClean = typedText.replace(/\s+/g, ' ').toLowerCase();
    const currentTextClean = currentText.replace(/\s+/g, ' ').toLowerCase();
    const correctCharacters = typedTextClean.split('').filter((char, index) => char === currentTextClean[index]).length;
    const totalCharacters = currentTextClean.length;
    const accuracy = Math.round((correctCharacters / totalCharacters) * 100);

    document.getElementById('typing-area').disabled = true;
    endSound.play();
    document.getElementById('result').innerText = `Words per minute: ${Math.round(wpm)}\nAccuracy: ${accuracy}%`;
}

// Toggles the visibility of the menu
function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('open');
}

// Highlights the typed text based on correctness
document.getElementById('typing-area').addEventListener('input', function() {
    const typedText = this.value;
    let displayText = '';
    for (let i = 0; i < currentText.length; i++) {
        if (i < typedText.length) {
            displayText += typedText[i] === currentText[i] 
                ? `<span class="correct">${currentText[i]}</span>` 
                : `<span class="wrong">${currentText[i]}</span>`;
        } else {
            displayText += `<span class="default">${currentText[i]}</span>`;
        }
    }
    document.getElementById('text').innerHTML = displayText;
});

// Starts the test when the spacebar is pressed and typing hasn't started yet
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !typingStarted) {
        event.preventDefault();
        typingStarted = true;
        startTest();
    }
});
