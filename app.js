////LES VARIABLES////
const statut = document.querySelector("h2");
const lesCases = document.querySelectorAll(".case")
const recButton = document.querySelector("button");

let jeuActif = true;
let joueurActif = "X"
let etatJeu = ["", "", "", "", "", "", "", "", "",];
const conditionsVictoir = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


////LES ECOUTEUR////
statut.innerHTML= tourJoueur();

lesCases.forEach(function(element) {
    element.addEventListener("click", gestionClick);
})

recButton.addEventListener("click", recommencerJeu);


////LES FONCTIONS////
function gagne() {
    return `Le joueur ${joueurActif}, a gagne`;
}

function egalite() {
    return "Egalite";
}

function tourJoueur() {
    return `C'est au tour du joueur ${joueurActif}`;
}

function gestionClick() {
    //RECUPERER L'INDEX DE LA CASE//
    const indexCase = parseInt(this.dataset.index);
    
    if (etatJeu[indexCase] != "" || !jeuActif) {
        return
    }
    
    //REMPLIR LE TABLEAU ETATJEU//
    etatJeu[indexCase] = joueurActif;
    this.innerHTML = joueurActif;
    
    //FONCTION POUR VERIFIER LE GAGNANT//
    verifGagnant();
}

function verifGagnant() {
    let tourGagnant = false;

    //CREATION DE 3 VARIABLES DEPUIS LE TABLEAU ETATJEU//
    for (let conditionVictoir of conditionsVictoir) {
        let val1 = etatJeu[conditionVictoir[0]];
        let val2 = etatJeu[conditionVictoir[1]];
        let val3 = etatJeu[conditionVictoir[2]];

        if (val1 === "" || val2 === "" || val3 === "") {
            continue;
        }
        if (val1 === val2 && val2 === val3) {
            tourGagnant = true;
            break;
        }
    } 
    if (tourGagnant) {
        statut.innerHTML = gagne();
        jeuActif = false;
        return
    }
    if (!etatJeu.includes("")) {
        statut.innerHTML = egalite();
        jeuActif = false;
        return
    }
    joueurActif = joueurActif === "X" ? "O" : "X";
    statut.innerHTML= tourJoueur();
}

function recommencerJeu() {
    joueurActif = "X"
    jeuActif = true;
    etatJeu = ["", "", "", "", "", "", "", "", "",];
    statut.innerHTML= tourJoueur();
    
    for (cell of lesCases) {
        cell.innerHTML = "";
    }
}
