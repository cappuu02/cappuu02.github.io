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
            // Calculate the jump based on the new logic
            const jump = (Math.random() < probability) ? (1 / Math.sqrt(systems)) : (-1 / Math.sqrt(systems));
            yPosition += jump;

            // Ensure yPosition does not drop below 0 or exceed the number of systems
            yPosition = Math.max(0, Math.min(yPosition, systems)); 

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
        penetrationData.push(yPosition); // Store as an integer
    }

    // Calcola la posizione y per la linea a metà dell'altezza del canvas
    const midLineY = canvas.height / 2;

    // Calcola la posizione x per la linea a n/2
    const midLineX = marginX + ((systems / 2) * xStep); // Posizione x corrispondente a n/2

    // Disegna la linea verticale a n/2
    ctx.beginPath();
    ctx.moveTo(midLineX, marginY); // Parte dall'alto
    ctx.lineTo(midLineX, canvas.height - marginY); // Va in basso
    ctx.strokeStyle = '#33ff57'; // Colore verde
    ctx.lineWidth = 2; // Spessore della linea
    ctx.stroke();
    ctx.closePath();

    // Draw the vertical line
    ctx.beginPath();
    ctx.moveTo(maxScoreX, marginY);
    ctx.lineTo(maxScoreX, canvas.height - marginY);
    ctx.strokeStyle = '#ff5733';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Count unique penetration levels
    const levelCounts = {};
    penetrationData.forEach(penetration => {
        if (penetration > 0) {
            levelCounts[penetration] = (levelCounts[penetration] || 0) + 1; // Count unique scores
        }
    });

    const totalAttackers = penetrationData.length;

    // Draw the histogram
    Object.keys(levelCounts).forEach(penetration => {
        const frequencyRelative = levelCounts[penetration] / totalAttackers;

        // Calculate the starting Y position for the histogram line
        const startY = canvas.height - marginY - ((penetration) * chartHeight / systems);

        // Draw horizontal bar starting from the position of the last hacker
        ctx.beginPath();
        const lineWidth = frequencyRelative * (canvas.width - maxScoreX - marginX);
        ctx.moveTo(maxScoreX, startY);
        ctx.lineTo(maxScoreX + lineWidth, startY);
        ctx.strokeStyle = '#007bff';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();    
    });
}
