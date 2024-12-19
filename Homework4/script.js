document.getElementById('submitButton').addEventListener('click', function() {
    const attackersValue = parseInt(document.getElementById('attackers').value);
    const systemValue = parseInt(document.getElementById('servers').value);
    const probability = parseFloat(document.getElementById('probability').value);

    // Disegna il grafico con i valori forniti
    drawChart(attackersValue, systemValue, probability);
});

function drawChart(attackers, systems, probability) {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const marginX = 50; // Margine per l'asse y
    const marginY = 30;
    const chartWidth = canvas.width - marginX * 2; // Larghezza totale del grafico
    const chartHeight = canvas.height - marginY * 2;

    const yCenter = canvas.height / 2; // Centro verticale del canvas
    const xStep = chartWidth / (systems - 1); // Passo per l'asse x
    const jumpSize = 1 / Math.sqrt(systems); // Salto in base alla radice quadrata di n
    const yMax = Math.sqrt(systems); // Nuovo valore massimo dell'asse Y
    const yStep = chartHeight / (2 * yMax); // Scala verticale basata su +/-sqrt(systems)

    const midIndex = Math.floor(systems / 2); // Punto a metà del percorso
    const midPenetrationData = []; // Dati per i livelli a n/2
    const finalPenetrationData = []; // Dati per i livelli a n

    // Disegna l'asse y principale
    ctx.beginPath();
    ctx.moveTo(marginX, marginY);
    ctx.lineTo(marginX, canvas.height - marginY);
    ctx.strokeStyle = '#000'; // Colore nero per l'asse y
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Disegna l'asse x principale
    ctx.beginPath();
    ctx.moveTo(marginX, yCenter);
    ctx.lineTo(marginX + chartWidth, yCenter);
    ctx.strokeStyle = '#000'; // Colore nero per l'asse x
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Etichetta del valore massimo su Y (+sqrt(systems))
    ctx.font = '14px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'right';
    ctx.fillText(`+${yMax.toFixed(2)}`, marginX - 10, marginY + 5);

    // Etichetta del valore minimo su Y (-sqrt(systems))
    ctx.fillText(`-${yMax.toFixed(2)}`, marginX - 10, canvas.height - marginY - 5);

    // Simula gli attacchi e traccia le linee per ciascun attaccante
    for (let i = 0; i < attackers; i++) {
        ctx.beginPath();
        ctx.moveTo(marginX, yCenter); // Inizia dal livello 0 al centro

        let yPosition = 0;
        let midPosition = 0;

        for (let j = 0; j < systems; j++) {
            if (j > 0) {
                const jump = (Math.random() < probability) ? jumpSize : -jumpSize;
                yPosition += jump;

                yPosition = Math.max(-yMax, Math.min(yPosition, yMax));
            }

            const x = marginX + (j * xStep);
            const y = yCenter - (yPosition * yStep);

            if (j === midIndex) {
                midPosition = yPosition;
            }

            ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `hsl(${(i / attackers) * 360}, 100%, 50%)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.closePath();

        midPenetrationData.push(midPosition);
        finalPenetrationData.push(yPosition);
    }

    // Linee verticali di riferimento: linea verde a metà e linea rossa alla fine
    const midLineX = marginX + (midIndex * xStep);
    ctx.beginPath();
    ctx.moveTo(midLineX, marginY);
    ctx.lineTo(midLineX, canvas.height - marginY);
    ctx.strokeStyle = '#33ff57'; // Verde per la linea centrale
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    const maxScoreX = marginX + chartWidth;
    ctx.beginPath();
    ctx.moveTo(maxScoreX, marginY);
    ctx.lineTo(maxScoreX, canvas.height - marginY);
    ctx.strokeStyle = '#ff5733'; // Rosso per la linea finale
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Calcolo di media e varianza
    function calculateMean(data) {
        return data.reduce((sum, value) => sum + value, 0) / data.length;
    }

    function calculateVariance(data, mean) {
        return data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / data.length;
    }

    const meanMid = calculateMean(midPenetrationData);
    const varianceMid = calculateVariance(midPenetrationData, meanMid);

    const meanFinal = calculateMean(finalPenetrationData);
    const varianceFinal = calculateVariance(finalPenetrationData, meanFinal);

    // Aggiorna gli input HTML con i risultati
    document.getElementById('meanMid').value = meanMid.toFixed(2);
    document.getElementById('varianceMid').value = varianceMid.toFixed(2);
    document.getElementById('meanFinal').value = meanFinal.toFixed(2);
    document.getElementById('varianceFinal').value = varianceFinal.toFixed(2);

    // Funzione per disegnare l'istogramma basato sui livelli continui raggiunti dagli attaccanti
    function drawHistogram(data, startX) {
        const frequencyMap = {};

        for (let i = 0; i < data.length; i++) {
            const level = data[i];
            frequencyMap[level] = (frequencyMap[level] || 0) + 1;
        }

        const maxFrequency = Math.max(...Object.values(frequencyMap));

        for (let level in frequencyMap) {
            const freq = frequencyMap[level];
            const y = yCenter - (parseFloat(level) * yStep);
            const barLength = (freq / maxFrequency) * 100;

            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(startX + barLength, y);
            ctx.strokeStyle = '#0000FF';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
        }
    }

    drawHistogram(midPenetrationData, midLineX);
    drawHistogram(finalPenetrationData, maxScoreX);
}
