document.getElementById('submitButton').addEventListener('click', function() {
    const attackersValue = parseInt(document.getElementById('attackers').value);
    const systemValue = parseInt(document.getElementById('servers').value);
    const probability = parseFloat(document.getElementById('probability').value);

    // Draw the chart and calculate the average penetration score
    drawChart(attackersValue, systemValue, probability);
});

function drawChart(attackers, systems, probability) {
    // Get the canvas element by its ID and get its 2D rendering context
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // Clear the previous chart
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    ctx.beginPath(); //new path to draw axes
    ctx.moveTo(50, 30);
    ctx.lineTo(50, canvas.height - 30);
    ctx.lineTo(canvas.width - 30, canvas.height - 30);
    ctx.strokeStyle = '#007bff';
    ctx.stroke();
    ctx.closePath();

    // Draw X-axis labels
    for (let j = 0; j < systems; j++) {
        const xLabel = 50 + (j * (canvas.width - 100) / (systems - 1));//calculate x position fot he label
        ctx.fillText(j + 1, xLabel - 5, canvas.height - 10); //drwa label
    }

    // Array to store each attacker's penetration score
    const penetrationData = [];

    // Draw lines for each attacker
    for (let i = 0; i < attackers; i++) {
        // Draw a line for each attacker
        ctx.beginPath(); 
        //move to the starting point
        ctx.moveTo(50, canvas.height - 30);

        //initialize y position for his attacker
        let yPosition = 0;

        // Simulate the attack for each system
        for (let j = 0; j < systems; j++) {
            //determinate if the attacker penetrates the system based on probability
            const penetrated = Math.random() > probability;

            //penetration is successful, attacker line jump up
            if (penetrated) {
                yPosition += 1;
            }

            // Calculate the X position for the current system
            const x = 50 + (j * (canvas.width - 100) / (systems - 1));
             // Calculate the corresponding Y position based on the penetration score
            const y = canvas.height - 30 - (yPosition * (canvas.height - 60) / systems);
            // Draw a line to the calculated X and Y positions
            ctx.lineTo(x, y);
        }

        //Set the stroke color for his attacker's line
        ctx.strokeStyle = `hsl(${(i / attackers) * 360}, 100%, 50%)`;
        ctx.lineWidth = 2;
        // Render the line on the canvas
        ctx.stroke();
        //close the path for this attacker's line
        ctx.closePath();
         // Store the final Y position (penetration score) in the array
        penetrationData.push(yPosition);
    }

    // Calculate recursive average penetration score
    const averageScore = recursiveAverage(penetrationData, penetrationData.length);
    document.getElementById('averageScoreValue').textContent = averageScore.toFixed(2); // Display average score

    // Draw Y-axis labels
    const maxScore = systems;
    const yLabelCount = 5;
    for (let k = 0; k <= yLabelCount; k++) {
        const yScore = Math.floor((k * maxScore) / yLabelCount);
        const yLabel = canvas.height - 30 - (yScore * (canvas.height - 60) / systems);
        ctx.fillText(yScore, 25, yLabel + 5);
    }

    // Draw histogram
    drawHistogram(penetrationData, systems);
}

// Recursive function to calculate average
function recursiveAverage(arr, length) {
    if (length === 0) {
        return 0;
    }
    if (length === 1) {
        return arr[0];
    }
    return (arr[length - 1] + recursiveAverage(arr, length - 1) * (length - 1)) / length;
}

function drawHistogram(penetrationData, systems) {
    const histogramCanvas = document.getElementById('histogramCanvas');
    const histogramCtx = histogramCanvas.getContext('2d');

    // Pulisci il canvas
    histogramCtx.clearRect(0, 0, histogramCanvas.width, histogramCanvas.height);

    // Inizializza l'array per contare i livelli
    const levelCounts = new Array(systems).fill(0);

    // Conta il numero di attacchi per ogni livello
    penetrationData.forEach(penetration => {
        if (penetration > 0) {
            levelCounts[penetration - 1] += 1;
        }
    });

    // Disegna gli assi dell'istogramma
    histogramCtx.beginPath();
    histogramCtx.moveTo(50, 30); // Asse Y
    histogramCtx.lineTo(50, histogramCanvas.height - 30); // Asse Y
    histogramCtx.lineTo(histogramCanvas.width - 30, histogramCanvas.height - 30); // Asse X
    histogramCtx.strokeStyle = '#007bff';
    histogramCtx.stroke();
    histogramCtx.closePath();

    const totalAttackers = penetrationData.length;
    const barWidth = (histogramCanvas.width - 100) / systems; // Larghezza di ciascuna barra

    for (let i = 0; i < systems; i++) {
        const frequencyRelative = levelCounts[i] / totalAttackers; // Frequenza relativa

        // Calcola l'altezza della barra in base alla frequenza relativa
        const barHeight = frequencyRelative * (histogramCanvas.height - 60); // Altezza massima

        // Disegna la barra verticale
        histogramCtx.fillStyle = '#007bff';
        histogramCtx.fillRect(50 + i * barWidth, histogramCanvas.height - 30 - barHeight, barWidth - 5, barHeight); // -5 per lo spazio tra le barre

        // Disegna il testo con la percentuale
        const percentageText = (frequencyRelative * 100).toFixed(2) + '%';
        histogramCtx.fillStyle = '#000';
        histogramCtx.fillText(percentageText, 50 + i * barWidth + 5, histogramCanvas.height - 30 - barHeight - 5); // Testo sopra la barra

        // Disegna il numero dell'asse X
        histogramCtx.fillStyle = '#000';
        histogramCtx.fillText(i + 1, 50 + i * barWidth + 5, histogramCanvas.height - 15); // Numero sotto la barra
    }
}

