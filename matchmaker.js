document.getElementById('questionForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const   answers = [];
    const   compatibilityScores = [];
    let     totalScore = 0;
    
    //Retrieve user's answers
    for (let i = 1; i <= 5; i++) {
        const q = document.querySelector('input[name="q' + i + '"]:checked');
        if (!q) {
            document.getElementById('error-q' + i).textContent = 'Please select an answer';
            return;
        }
        answers.push(parseInt(q.value));
    }

    const   desiredAnswers = [4, 4, 1, 3, 5]

    for (let i = 0; i < answers.length; i++) {
        const   score = Math.abs(answers[i] - desiredAnswers[i]);
        compatibilityScores.push(score);
        totalScore += score;
    }

    displayCompatibilityScores(compatibilityScores, totalScore);
});

function displayCompatibilityScores(scores, totalScore) {
    const resultsList = document.querySelector('#compatibilityScores');
    resultsList.innerHTML = '';

    scores.forEach((score,index) => {
        const listItem = document.createElement('li');
        listItem.textContent = 'Question ' + (index + 1) + ': ' + score;
        resultsList.appendChild(listItem);
    });

    document.getElementById('totalScore').textContent = totalScore;

    const   overallCompatibility = calculateOverallCompatibility(totalScore);
    document.getElementById('overallCompatibility').textContent = overallCompatibility;

    displayClosingRemark(overallCompatibility);
}

function    calculateOverallCompatibility(totalScore) {
    const   maxScore = 25;
    const   percentage = ((maxScore - totalScore) / maxScore) * 100;
    return  Math.round(percentage);
}

function    displayClosingRemark(overallCompatibility) {
    let remark = '';
    if  (overallCompatibility >= 80) {
        remark = 'This could be the beginning of a beautiful friendship!';
    } else  if  (overallCompatibility >= 60) {
        remark = 'We could be pretty good friends';
    } else  if  (overallCompatibility >=40) {
        remark = 'There is definitely room for improvement';
    } else {
        remark = 'Not everybody has the same interests. We could both use some improvement.'
    }
    document.getElementById('closingRemark').textContent = remark;
}