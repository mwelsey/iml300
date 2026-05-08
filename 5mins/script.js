import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBI5NZfm-DLjE3n_B3O81sY2Ar2GY9r1VU",
    authDomain: "megan-bf23d.firebaseapp.com",
    projectId: "megan-bf23d",
    storageBucket: "megan-bf23d.firebasestorage.app",
    messagingSenderId: "227294855047",
    appId: "1:227294855047:web:ed486d13c5c585c37b1d22",
    measurementId: "G-4C9K64JXDW"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const wordsRef = ref(db, "responses");

const video = document.getElementById("video-bg");

// DEBUG: Log to console when video is actually ready to play
video.addEventListener("canplaythrough", () => {
    console.log("Video is fully loaded and ready!");
});

// Force play logic
video.play().catch(() => console.log("Waiting for click..."));

window.addEventListener(
    "click",
    () => {
        if (video.paused) video.play();
    },
    { once: true }
);

// Timer Logic
const fourMinutes = 4 * 60 * 1000;
setTimeout(() => {
    triggerCleanse();
}, fourMinutes);

// Firebase listener
onChildAdded(wordsRef, (snapshot) => {
    const data = snapshot.val();
    if (data && data.text) {
        spawnWord(data.text);
    }
});

function spawnWord(text) {
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 50);
    
    const wordElement = $('<div class="floating-word"></div>')
        .text(text)
        .css({ left: x, top: y, opacity: 0 });
    
    $("#word-layer").append(wordElement);
    
    // Fade in and start moving
    wordElement.animate({ opacity: 1 }, 1000);
    makeItDrift(wordElement);
}

// 3. Movement Logic: Moves the word to a new random spot every few seconds
function makeItDrift(element) {
    const move = () => {
        if (!element.length) return; // Stop if element was removed
        const newX = Math.random() * (window.innerWidth - 150);
        const newY = Math.random() * (window.innerHeight - 50);
        
        element.css({
            left: newX,
            top: newY
        });
        
        // Repeat the move every 5-8 seconds for a slow drift
        setTimeout(move, 5000 + Math.random() * 3000);
    };
    move();
}

function triggerCleanse() {
    $(".floating-word, #qr-code").fadeOut(3000);
    $("#video-bg").css("filter", "brightness(1) contrast(1)");
}

$(document).keydown(function (e) {
    if (e.key.toLowerCase() === "c") triggerCleanse();
});
