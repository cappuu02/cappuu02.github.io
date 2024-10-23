document.getElementById('submitButton').addEventListener('click', function() {
    const attackersValue = parseInt(document.getElementById('attackers').value);
    const systemValue = parseInt(document.getElementById('Intervals').value);
    const Lambda = parseFloat(document.getElementById('Lambda').value);

    // Draw the chart
    drawChart(attackersValue, systemValue, Lambda);
});

function drawChart(attackers, systems, Lambda) {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const marginX = 50;
    const marginY = 30;
    const chartWidth = canvas.width - marginX * 2;
    const chartHeight = canvas.height - marginY * 2;
    const maxScoreX = canvas.width - marginX - (chartWidth * 0.25); // Posizione della linea rossa verticale
    const xStep = (maxScoreX - marginX) / (systems - 1); // Distanza tra i sistemi sull'asse X

    // Draw the axes
    ctx.beginPath();
    ctx.moveTo(marginX, marginY);
    ctx.lineTo(marginX, canvas.height - marginY); // Asse Y
    ctx.lineTo(canvas.width - marginX, canvas.height - marginY); // Asse X
    ctx.strokeStyle = '#007bff';
    ctx.stroke();
    ctx.closePath();

    // Draw X-axis labels as decimal values (e.g., 1/n)
    ctx.fillStyle = '#000'; // Label color
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // Disegna le etichette sull'asse X come valori decimali (1/n, 2/n, ..., n/n)
    for (let i = 0; i < systems; i++) {
        const value = ((i + 1) / systems).toFixed(2); // Si aggiunge 1 a i perché i parte da 0, ma vogliamo etichette che vanno da 1 a n
        const xLabelPos = marginX + (i * xStep);
        ctx.fillText(value, xLabelPos, canvas.height - marginY + 5); // Posiziona l'etichetta sotto l'asse X
    }

    const penetrationData = [];

    // Simula gli attacchi e raccoglie i punteggi di penetrazione
    for (let i = 0; i < attackers; i++) {
        ctx.beginPath();
        ctx.moveTo(marginX, canvas.height - marginY);
        let yPosition = 0;

        for (let j = 0; j < systems; j++) {
            const penetrated = Math.random() > (Lambda / systems);

            if (penetrated) {
                yPosition += 1;
            }

            const x = marginX + (j * xStep);
            const y = canvas.height - marginY - (yPosition * chartHeight / systems);
            ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `hsl(${(i / attackers) * 360}, 100%, 50%)`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

        // Aggiungi il punteggio finale per ogni attaccante
        penetrationData.push(yPosition);
    }

    // Draw the vertical red line (sistema n-esimo)
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

        // Calcola un fattore di scala basato sul numero di attaccanti
        const scaleFactor = 1 + (attackers / 100); // Puoi regolare il denominatore per modificare l'effetto
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






