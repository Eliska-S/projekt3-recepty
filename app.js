/*
1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html. */

const seznamReceptu = document.querySelector('.recepty');
recepty.forEach(zobrazRecepty);

function zobrazRecepty(recept) {
    let jedenRecept = document.createElement('div');
    jedenRecept.setAttribute("class", "recept");
    jedenRecept.setAttribute("data-receptIndex", recepty.indexOf(recept));
    jedenRecept.setAttribute("onclick", "klikNaRecept(this)");

    let obrazek = document.createElement('div');
    obrazek.setAttribute("class", "recept-obrazek");

    let obrazekImg = document.createElement('img');
    obrazekImg.src = recept.img;

    let receptInfo = document.createElement('div');
    receptInfo.setAttribute("class", "recept-info");

    let nazevReceptu = document.createElement('h3');
    nazevReceptu.innerHTML = recept.nadpis;

    obrazek.appendChild(obrazekImg);
    receptInfo.appendChild(nazevReceptu);

    jedenRecept.appendChild(obrazek);
    jedenRecept.appendChild(receptInfo);

    seznamReceptu.appendChild(jedenRecept);
}

// 2) Pri kliknutí na tlačítko Hledat by se měl seznam receptů vyfiltrovat podle hledaného slova.

let hledanyVyraz = document.querySelector('input[id=hledat]');

function hledat() {
    seznamReceptu.innerHTML = '';
    
    for (i = 0; i < recepty.length; i++) {
        let receptyLowerCase = recepty[i].nadpis.toLowerCase();
        let inputLowerCase = hledanyVyraz.value.toLowerCase();
        
        if (receptyLowerCase.includes(inputLowerCase)) {
            let zobrazeneRecepty = [];
            zobrazeneRecepty.push(recepty[i]);
            zobrazeneRecepty.forEach(zobrazRecepty);
        }
    }
}

//3) Doplň filtrování receptů podle kategorie.

function filtrujDleKategorie() {
    
    seznamReceptu.innerHTML = '';
    let filtr = document.getElementById('kategorie').value;

    for (i = 0; i < recepty.length; i++) {
        if (filtr === recepty[i].stitek) {
            let zobrazeneRecepty = [];
            zobrazeneRecepty.push(recepty[i]);
            zobrazeneRecepty.forEach(zobrazRecepty);
        } else if (filtr === '') {
            recepty.forEach(zobrazRecepty);
        }
    }
}

// 4) Doplň řazení receptů podle hodnocení.


function seradDleHodnoceni() {

    seznamReceptu.innerHTML = '';
    let razeni = document.getElementById('razeni').value;

    for (i = 0; i < recepty.length; i++) {
        if (razeni === '') {
            location.reload();
            filtrujDleKategorie();
        } else if (razeni === "1") {
            recepty.sort(function (a, b) {
               return b.hodnoceni - a.hodnoceni;
            })
            recepty.forEach(zobrazRecepty);
            filtrujDleKategorie();
        }else if (razeni === "2") {
            recepty.sort(function (a, b) {
                return a.hodnoceni - b.hodnoceni;
            });
            recepty.forEach(zobrazRecepty);
            filtrujDleKategorie();
        }
    }
}

/* 
5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
recept-hodnoceni, recept-nazev, recept-popis. 
*/

function klikNaRecept(recept) {
    let vybranyIndex = recept.getAttribute("data-receptIndex");
    console.log(vybranyIndex);

    document.querySelector('#recept-foto').src = recepty[vybranyIndex].img;
    document.querySelector('#recept-kategorie').innerHTML = recepty[vybranyIndex].kategorie;
    document.querySelector('#recept-hodnoceni').innerHTML = recepty[vybranyIndex].hodnoceni;
    document.querySelector('#recept-nazev').innerHTML = recepty[vybranyIndex].nadpis;
    document.querySelector('#recept-popis').innerHTML = recepty[vybranyIndex].popis;

    let vybranyRecept = recepty[vybranyIndex];

    localStorage.clear();
    localStorage.vybranyRecept = JSON.stringify(vybranyRecept);
}

// 6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.

let posledniRecept = JSON.parse(localStorage.vybranyRecept);

document.querySelector('#recept-foto').src = posledniRecept.img;
    document.querySelector('#recept-kategorie').innerHTML = posledniRecept.kategorie;
    document.querySelector('#recept-hodnoceni').innerHTML = posledniRecept.hodnoceni;
    document.querySelector('#recept-nazev').innerHTML = posledniRecept.nadpis;
    document.querySelector('#recept-popis').innerHTML = posledniRecept.popis;