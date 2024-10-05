document.getElementById('submitButton').addEventListener('click', function() {
    const attackersValue = parseInt(document.getElementById('attackers').value);
    const systemValue = parseInt(document.getElementById('servers').value);
    const probability = parseFloat(document.getElementById('probability').value);

    // Disegna il grafico per tutti gli attaccanti
    drawChart(attackersValue, systemValue, probability);
});

function drawChart(attackers, systems, probability) {
    // Recuperato Canvas dal DOM e creato un contesto bidimensionale
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // Pulisci il canvas per rimuovere grafici precedenti
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Disegna gli assi
    ctx.beginPath();
    ctx.moveTo(50, 30);
    ctx.lineTo(50, canvas.height - 30);
    ctx.lineTo(canvas.width - 30, canvas.height - 30);
    ctx.strokeStyle = '#007bff';
    ctx.stroke();
    ctx.closePath();

    // Disegna le etichette sull'asse X
    for (let j = 0; j < systems; j++) {
        const xLabel = 50 + (j * (canvas.width - 100) / (systems - 1));
        ctx.fillText(j + 1, xLabel - 5, canvas.height - 10);
    }

    // Array per registrare il punteggio di penetrazione di ogni aggressore
    const penetrationData = [];

    // Disegna le linee per ogni aggressore
    for (let i = 0; i < attackers; i++) {
        ctx.beginPath();
        ctx.moveTo(50, canvas.height - 30);

        let yPosition = 0;

        // Simula i tentativi di penetrazione
        for (let j = 0; j < systems; j++) {
            const penetrated = Math.random() > probability;

            if (penetrated) {
                yPosition += 1;
            }

            const x = 50 + (j * (canvas.width - 100) / (systems - 1));
            const y = canvas.height - 30 - (yPosition * (canvas.height - 60) / systems);

            ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `hsl(${(i / attackers) * 360}, 100%, 50%)`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

        penetrationData.push(yPosition);
    }

    // Disegna l'istogramma
    drawHistogram(penetrationData, systems);
}

/*
function drawHistogram(penetrationData, systems) {
    // Recuperato Canvas per l'istogramma e creato un contesto bidimensionale
    const histogramCanvas = document.getElementById('histogramCanvas');
    const histogramCtx = histogramCanvas.getContext('2d');

    // Pulisci il canvas per rimuovere grafici precedenti
    histogramCtx.clearRect(0, 0, histogramCanvas.width, histogramCanvas.height);

    // Array per contare il numero di hacker per ogni livello
    const levelCounts = new Array(systems).fill(0);

    // Conta quanti hacker hanno raggiunto ciascun livello
    penetrationData.forEach(penetration => {
        if (penetration > 0) {
            levelCounts[penetration - 1] += 1; // Incrementa il conteggio per il livello raggiunto
        }
    });

    // Disegna gli assi dell'istogramma
    histogramCtx.beginPath();
    histogramCtx.moveTo(50, 30);
    histogramCtx.lineTo(50, histogramCanvas.height - 30);
    histogramCtx.lineTo(histogramCanvas.width - 30, histogramCanvas.height - 30);
    histogramCtx.strokeStyle = '#007bff';
    histogramCtx.stroke();
    histogramCtx.closePath();

    // Disegna le barre dell'istogramma
    const barWidth = (histogramCanvas.width - 100) / systems;
    const maxLevelCount = Math.max(...levelCounts);

    for (let i = 0; i < systems; i++) {
        const barHeight = (levelCounts[i] / maxLevelCount) * (histogramCanvas.height - 60); // Normalizza l'altezza delle barre
        histogramCtx.fillStyle = '#007bff';
        histogramCtx.fillRect(50 + i * barWidth, histogramCanvas.height - 30 - barHeight, barWidth - 5, barHeight);
        histogramCtx.fillText(levelCounts[i], 50 + i * barWidth + barWidth / 2 - 5, histogramCanvas.height - 35); // Etichetta con il conteggio

        // Aggiungi etichette sui livelli
        histogramCtx.fillText(i + 1, 50 + i * barWidth + barWidth / 2 - 5, histogramCanvas.height - 10); // Etichette dei sistemi
    }
}
*/