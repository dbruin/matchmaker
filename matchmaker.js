document.getElementById('questionForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const   answers = [];
    const   compatibilityScores = [];
    
    //Retrieve user's answers
    for (let i = 1; i <= 5; i++) {
        const q = document.querySelector('input[name="q' + i + '"]:checked');
        answers.push(parseInt(q.value));
    }

    const   desiredAnswers = [4, 4, 1, 3, 5]

    let totalScore = 0;
    for (let i = 0; i < answers.length; i++) {
        const   score = Math.abs(answers[i] - desiredAnswers[i]);
        compatibilityScores.push(score);
        totalScore += score;
    }

    displayCompatibilityScores(compatibilityScores, totalScore);
});

function displayCompatibilityScores(scores, totalScore) {
    const resultsList = document.querySelector('#results ul');
    resultsList.innerHTML = '';

    scores.forEach((score,index) => {
        const listItem = document.createElement('li');
        listItem.textContent = 'Question ' + (index + 1) + ': ' + score;
        resultsList.appendChild(listItem);
    });

    document.getElementById('totalScore').textContent = totalScore;
}