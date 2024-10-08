document.getElementById('submitButton').addEventListener('click', function() {
    const attackersValue = parseInt(document.getElementById('attackers').value);
    const systemValue = parseInt(document.getElementById('servers').value);
    const probability = parseFloat(document.getElementById('probability').value);

    // Draw the chart
    drawChart(attackersValue, systemValue, probability);
});

function drawChart(attackers, systems, probability) {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const marginX = 50;
    const marginY = 30;
    const chartWidth = canvas.width - marginX * 2;
    const chartHeight = canvas.height - marginY * 2;
    const maxScoreX = canvas.width - marginX - (chartWidth * 0.25);
    const xStep = (maxScoreX - marginX) / (systems - 1);

    // Draw the axes
    ctx.beginPath();
    ctx.moveTo(marginX, marginY);
    ctx.lineTo(marginX, canvas.height - marginY);
    ctx.lineTo(canvas.width - marginX, canvas.height - marginY);
    ctx.strokeStyle = '#007bff';
    ctx.stroke();
    ctx.closePath();

    const penetrationData = [];

    // Simulate attacks and gather penetration scores
    for (let i = 0; i < attackers; i++) {
        ctx.beginPath();
        ctx.moveTo(marginX, canvas.height - marginY);
        let yPosition = 0;

        for (let j = 0; j < systems; j++) {
            const penetrated = Math.random() > probability;

            if (penetrated) {
                yPosition += 1;
            }

            const x = marginX + (j * xStep);
            const y = canvas.height - marginY - (yPosition * chartHeight / systems);
            ctx.lineTo(x, y);

            if (i === 0) {
                ctx.fillStyle = '#000';
                ctx.font = '12px Arial';
                ctx.fillText(`${j + 1}`, x - 10, canvas.height - 10);
            }
        }

        ctx.strokeStyle = `hsl(${(i / attackers) * 360}, 100%, 50%)`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

        // Add the final score for each attacker
        penetrationData.push(yPosition);
    }

    // Add the average calculation after the loop
    const averagePenetrationScore = computeAverage(penetrationData);

    // Update the average in the HTML
    document.getElementById('averageScoreValue').innerText = averagePenetrationScore.toFixed(2);

    // Draw the vertical line
    ctx.beginPath();
    ctx.moveTo(maxScoreX, marginY);
    ctx.lineTo(maxScoreX, canvas.height - marginY);
    ctx.strokeStyle = '#ff5733';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    const levelCounts = new Array(systems).fill(0);
    penetrationData.forEach(penetration => {
        if (penetration > 0) {
            levelCounts[penetration - 1] += 1;
        }
    });

    const totalAttackers = penetrationData.length;

    // Draw the histogram
    for (let i = 0; i < systems; i++) {
        const frequencyRelative = levelCounts[i] / totalAttackers;

        // Calculate a scaling factor based on the number of attackers
        const scaleFactor = 1 + (attackers / 100); // You can adjust the denominator to modify the effect
        const lineWidth = Math.min(frequencyRelative * (canvas.width - maxScoreX - marginX) * scaleFactor, (canvas.width - maxScoreX - marginX));

        ctx.beginPath();
        const startY = canvas.height - marginY - ((i + 1) * chartHeight / systems);
        ctx.moveTo(maxScoreX, startY);
        ctx.lineTo(maxScoreX + lineWidth, startY);
        ctx.strokeStyle = '#007bff';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();    
    }
}

// Recursive function to calculate the average
function computeAverage(scores, index = 0, sum = 0) {
    // Exit condition
    if (index >= scores.length) {
        return sum / scores.length; // Calculate and return the average
    }
    
    // Accumulate the current score
    sum += scores[index];
    
    // Recursively call the function with the next index
    return computeAverage(scores, index + 1, sum);
}
