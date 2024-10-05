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
    ctx.beginPath(); // Avvio un nuovo tracciamento
    ctx.moveTo(50, 30); // Punto di partenza dell'asse Y
    ctx.lineTo(50, canvas.height - 30); // Asse Y
    ctx.lineTo(canvas.width - 30, canvas.height - 30); // Asse X
    ctx.strokeStyle = '#007bff'; // Stile delle linee
    ctx.stroke(); // Esegui il tracciamento delle linee
    ctx.closePath(); // Chiudi il tracciamento delle linee



    // Disegna le etichette sull'asse X
    for (let j = 0; j < systems; j++) {
        const xLabel = 50 + (j * (canvas.width - 100) / (systems - 1)); // Calcola la posizione X
        ctx.fillText(j + 1, xLabel - 5, canvas.height - 10); // Disegna il numero del sistema
    }



    // Array per registrare il punteggio di penetrazione di ogni aggressore
    const penetrationData = [];

    // Disegna le linee per ogni aggressore
    for (let i = 0; i < attackers; i++) {
        ctx.beginPath();
        ctx.moveTo(50, canvas.height - 30); // Inizio della linea (0 sistemi hackerati)

        let yPosition = 0; // Inizia a zero per ogni aggressore

        // Simula i tentativi di penetrazione
        for (let j = 0; j < systems; j++) {
            // Genera un numero casuale e controlla se penetra
            const penetrated = Math.random() > probability;

            if (penetrated) {
                yPosition += 1; // Incrementa se penetra
            }

            // Limita yPosition per non superare il numero massimo di aggressori
            yPosition = Math.min(yPosition, attackers); // Limita a un massimo pari al numero di aggressori

            // Disegna la linea verticale
            const x = 50 + (j * (canvas.width - 100) / (systems - 1)); // Calcola la posizione X
            const y = canvas.height - 30 - (yPosition * (canvas.height - 60) / attackers); // Calcola la posizione Y

            ctx.lineTo(x, y); // Disegna la linea verso la nuova posizione calcolata
        }

        ctx.strokeStyle = `hsl(${(i / attackers) * 360}, 100%, 50%)`; // Colore differente per ogni aggressore
        ctx.lineWidth = 2; // Spessore della linea
        ctx.stroke(); // Esegui il tracciamento della linea
        ctx.closePath();

        penetrationData.push(yPosition); // Registra il punteggio di penetrazione
    }
}