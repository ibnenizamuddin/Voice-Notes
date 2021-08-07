window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
const clearButton = document.getElementById('clear');
const stopButton = document.getElementById('stop');
const startButton = document.getElementById('start');
const copyButton = document.getElementById('copy');

recognition.lang = 'en-US';

let p = document.createElement('p');
const words = document.querySelector('.words');


recognition.addEventListener('result', e => {
    words.scrollTop = words.scrollHeight;
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    const script = transcript;
    p.textContent = script;

    if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }
});


function clearAll() {
    document.querySelectorAll('p').forEach(el => el.remove());
    startButton.style.backgroundColor = "green";
    stopButton.style.backgroundColor = "grey";
    clearButton.style.backgroundColor = "grey";
    copyButton.style.backgroundColor = "grey";
    words.appendChild(p);
}
function startListenining() {
    startButton.style.backgroundColor = "grey";
    stopButton.style.backgroundColor = "red";
    clearButton.style.backgroundColor = "grey";
    copyButton.style.backgroundColor = "grey";
    clearButton.removeEventListener('click', clearAll);
    stopButton.addEventListener('click', stopListenining);
    startButton.removeEventListener('click', startListenining);
    recognition.interimResults = true;
    words.appendChild(p);
    recognition.start();
    recognition.addEventListener('end', recognition.start);
}

function copyTextContent() {
    let copiedText = words.innerText;
    let tempElem = document.createElement("textarea");
    document.body.appendChild(tempElem);
    tempElem.value = copiedText;
    tempElem.select();
    document.execCommand("copy");
    document.body.removeChild(tempElem);



}

function stopListenining() {
    startButton.style.backgroundColor = "green";
    stopButton.style.backgroundColor = "grey";
    clearButton.style.backgroundColor = "dodgerblue";
    copyButton.style.backgroundColor = "dodgerblue";

    clearButton.addEventListener('click', clearAll);
    startButton.addEventListener('click', startListenining);
    copyButton.addEventListener('click', copyTextContent);
    stopButton.removeEventListener('click', stopListenining);
    recognition.removeEventListener('end', recognition.start);
    recognition.stop();
}


startButton.addEventListener('click', startListenining);
