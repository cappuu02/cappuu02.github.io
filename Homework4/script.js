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

    const yCenter = canvas.height / 2; // Centro verticale del canvas, per valori positivi e negativi
    const xStep = chartWidth / (systems - 1); // Passo per l'asse x
    const jumpSize = 1 / Math.sqrt(systems); // Salto in base alla radice quadrata di n
    const yStep = chartHeight / (2 * systems); // Scala dei valori sull'asse y, considerando sia positivi che negativi

    const midIndex = Math.floor(systems / 2); // Punto a metà del percorso
    const midPenetrationData = []; // Dati per i livelli a n/2
    const finalPenetrationData = []; // Dati per i livelli a n

    // Disegna l'asse y principale (linea verticale centrale per i valori positivi e negativi)
    ctx.beginPath();
    ctx.moveTo(marginX, marginY);
    ctx.lineTo(marginX, canvas.height - marginY);
    ctx.strokeStyle = '#000'; // Colore nero per l'asse y
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Disegna l'asse x principale (linea orizzontale centrale)
    ctx.beginPath();
    ctx.moveTo(marginX, yCenter);
    ctx.lineTo(marginX + chartWidth, yCenter); // Disegna da margine a margine
    ctx.strokeStyle = '#000'; // Colore nero per l'asse x
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Simula gli attacchi e traccia le linee per ciascun attaccante
    for (let i = 0; i < attackers; i++) {
        ctx.beginPath();
        ctx.moveTo(marginX, yCenter); // Inizia dal livello 0 al centro

        let yPosition = 0;
        let midPosition = 0;

        for (let j = 0; j < systems; j++) {
            // Determina il salto in base alla probabilità di successo
            const jump = (Math.random() < probability) ? jumpSize : -jumpSize;
            yPosition += jump;

            // Limita yPosition tra -systems e systems
            yPosition = Math.max(-systems, Math.min(yPosition, systems));

            const x = marginX + (j * xStep);
            const y = yCenter - (yPosition * yStep); // Scala rispetto al centro per valori positivi e negativi

            if (j === midIndex) {
                midPosition = yPosition; // Salva la posizione a metà percorso
            }

            ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `hsl(${(i / attackers) * 360}, 100%, 50%)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.closePath();

        midPenetrationData.push(midPosition); // Salva il livello raggiunto a n/2
        finalPenetrationData.push(yPosition); // Salva il livello raggiunto alla fine
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

    // Funzione per disegnare l'istogramma basato solo sui livelli continui raggiunti dagli attaccanti
    function drawHistogram(data, startX) {
        const frequencyMap = {};

        // Calcola le frequenze senza alcun arrotondamento, considerando i valori continui
        for (let i = 0; i < data.length; i++) {
            const level = data[i];
            frequencyMap[level] = (frequencyMap[level] || 0) + 1;
        }

        const maxFrequency = Math.max(...Object.values(frequencyMap)); // Frequenza massima per calcolare la lunghezza relativa delle barre

        // Disegna le linee orizzontali dell'istogramma basandosi sui livelli continui degli attaccanti
        for (let level in frequencyMap) {
            const freq = frequencyMap[level];
            const y = yCenter - (parseFloat(level) * yStep); // Usa il valore continuo di 'level' per il calcolo di y

            // Calcola la lunghezza della barra in base alla frequenza relativa
            const barLength = (freq / maxFrequency) * 100; // Lunghezza relativa massima di 100 pixel

            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(startX + barLength, y);
            ctx.strokeStyle = '#0000FF'; // Colore blu per le barre dell'istogramma
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
        }
    }

    // Disegna l'istogramma per la metà (n/2) sulla linea verde
    drawHistogram(midPenetrationData, midLineX);

    // Disegna l'istogramma per la fine (n) sulla linea rossa
    drawHistogram(finalPenetrationData, maxScoreX);
}
