const words = ["семейных", "динамичных", "уникальных", "центральных"];
const wordContainer = document.getElementById("word-container");
let wordIndex = 0;

function animateWord(word) {
  wordContainer.innerHTML = "";
  [...word].forEach((letter, i) => {
    const span = document.createElement("span");
    span.className = "letter";
    span.style.animationDelay = `${i * 0.1}s`;
    span.textContent = letter;
    wordContainer.appendChild(span);
  });
}

function cycleWords() {
  animateWord(words[wordIndex]);
  wordIndex = (wordIndex + 1) % words.length;
}

cycleWords();

setInterval(cycleWords, 1500);
