document.getElementById('submitButton').addEventListener('click', function() {
    const attackersValue = parseInt(document.getElementById('attackers').value);
    const systemValue = parseInt(document.getElementById('servers').value);
    const probability = parseFloat(document.getElementById('probability').value);

    // Disegna il grafico
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

    // Disegna gli assi
    ctx.beginPath();
    ctx.moveTo(marginX, marginY); 
    ctx.lineTo(marginX, canvas.height - marginY); 
    ctx.lineTo(canvas.width - marginX, canvas.height - marginY);
    ctx.strokeStyle = '#007bff';
    ctx.stroke();
    ctx.closePath();

    const penetrationData = [];

    // Simula attacchi e raccoglie i punteggi di penetrazione
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

        // Aggiungi il punteggio finale per ogni aggressore
        penetrationData.push(yPosition);
    }

    // Aggiungi il calcolo della media dopo il ciclo
    const averagePenetrationScore = computeAverage(penetrationData);

    // Aggiorna la media nell'HTML
    document.getElementById('averageScoreValue').innerText = averagePenetrationScore.toFixed(2);

    // Codice per disegnare il resto del grafico (istogramma e linea rossa)
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

    // Disegna l'istogramma
    for (let i = 0; i < systems; i++) {
        const frequencyRelative = levelCounts[i] / totalAttackers;
        const lineWidth = frequencyRelative * (canvas.width - maxScoreX - marginX) * (1 + attackers * 0.1);

        ctx.beginPath();
        const startY = canvas.height - marginY - ((i + 1) * chartHeight / systems);
        ctx.moveTo(maxScoreX, startY);
        ctx.lineTo(maxScoreX + lineWidth, startY);
        ctx.strokeStyle = '#007bff';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

        if (frequencyRelative > 0) {
            const percentage = (frequencyRelative * 100).toFixed(2);
            ctx.fillStyle = '#000';
            ctx.font = '12px Arial';
            ctx.fillText(`${percentage}%`, maxScoreX + lineWidth + 5, startY);
        }
    }
}



// Funzione ricorsiva per calcolare la media
function computeAverage(scores, index = 0, sum = 0) {
    // Condizione di uscita
    if (index >= scores.length) {
        return sum / scores.length; // Calcola e restituisce la media
    }
    
    // Accumula il punteggio corrente
    sum += scores[index];
    
    // Chiama ricorsivamente la funzione con il prossimo indice
    return computeAverage(scores, index + 1, sum);
}

