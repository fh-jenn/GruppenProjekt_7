// ---------------------------------------------------------
// FRAGEN-DATEN
// Jede Frage hat eine linke und eine rechte Option.
// Jede Option gehört zu einer von vier Gruppen.
// "bild" ist optional: wenn gesetzt, wird ein Bild statt Text gezeigt.
// ---------------------------------------------------------
const fragen = [
    {
        frage: "Lieber draußen in der Natur oder am Rechner basteln?",
        links:  { text: "Natur",   gruppe: "Natur" },
        rechts: { text: "Technik", gruppe: "Technik" }
    },
    {
        frage: "Museum besuchen oder Fußballspiel schauen?",
        links:  { text: "Museum",  gruppe: "Kunst" },
        rechts: { text: "Fußball", gruppe: "Sport" }
    },
    {
        frage: "Wandern in den Bergen oder neues Gadget ausprobieren?",
        links:  { text: "Wandern", gruppe: "Natur" },
        rechts: { text: "Gadget",  gruppe: "Technik" }
    },
    {
        frage: "Malen/Zeichnen oder Mannschaftssport?",
        links:  { text: "Malen",            gruppe: "Kunst" },
        rechts: { text: "Mannschaftssport", gruppe: "Sport" }
    },
    {
        frage: "Zeit im Garten oder Programmieren üben?",
        links:  { text: "Garten",       gruppe: "Natur" },
        rechts: { text: "Programmieren", gruppe: "Technik" }
    }
];

// Beispiel, falls du statt Text ein Bild zeigen willst:
// links: { bild: "bilder/wald.jpg", gruppe: "Natur" }

let aktuelleFrage = 0;
let punkte = { Natur: 0, Technik: 0, Kunst: 0, Sport: 0 };

// Startet das Quiz von vorne
function starte() {
    aktuelleFrage = 0;
    punkte = { Natur: 0, Technik: 0, Kunst: 0, Sport: 0 };
    zeigeFrage();
}

// Zeigt die aktuelle Frage inkl. der zwei Optionen an
function zeigeFrage() {
    const frageObj = fragen[aktuelleFrage];
    document.getElementById("frage-text").innerText = frageObj.frage;

    zeigeOption("links-btn", frageObj.links);
    zeigeOption("rechts-btn", frageObj.rechts);
}

// Füllt einen Button entweder mit Bild oder mit Text
function zeigeOption(buttonId, option) {
    const button = document.getElementById(buttonId);
    if (option.bild) {
        button.innerHTML = '<img src="' + option.bild + '" alt="' + option.text + '">';
    } else {
        button.innerText = option.text;
    }
}

// Wird aufgerufen, wenn der Nutzer "links" oder "rechts" klickt
function waehle(seite) {
    const frageObj = fragen[aktuelleFrage];
    const gewaehlteOption = seite === "links" ? frageObj.links : frageObj.rechts;

    // Punkt für die passende Gruppe vergeben
    punkte[gewaehlteOption.gruppe]++;

    aktuelleFrage++;

    if (aktuelleFrage < fragen.length) {
        zeigeFrage();
    } else {
        zeigeErgebnis();
    }
}

// Ermittelt die Gruppe mit den meisten Punkten und zeigt das Ergebnis
function zeigeErgebnis() {
    let ergebnisGruppe = null;
    let maxPunkte = -1;

    for (const gruppe in punkte) {
        if (punkte[gruppe] > maxPunkte) {
            maxPunkte = punkte[gruppe];
            ergebnisGruppe = gruppe;
        }
    }

    document.getElementById("quiz-bereich").style.display = "none";
    document.getElementById("ergebnis-bereich").style.display = "block";
    document.getElementById("ergebnis-text").innerText =
        "Du wurdest der Gruppe \"" + ergebnisGruppe + "\" zugeteilt!";
}

// Quiz direkt beim Laden der Seite starten
window.onload = starte;