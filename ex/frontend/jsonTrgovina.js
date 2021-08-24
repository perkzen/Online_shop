let kos = JSON.parse(sessionStorage.getItem("kosarica")) || [];

function check(izdelek) {
    for (let i = 0; i < kos.length; i++) {
        if (kos[i].naziv === izdelek.naziv) {
            kos[i].kolicina += izdelek.kolicina;
            kos[i].cena += izdelek.cena;
            return true;
        }
    }
    return false;
}

function dodaj(izdelek) {
    if (izdelek.popust > 0) {
        izdelek.cena = (izdelek.cena - (izdelek.popust / 100) * izdelek.cena);
    }
    if (!check(izdelek)) {
        kos.push(izdelek);
    }

    sessionStorage.setItem("kosarica", JSON.stringify(kos));
}

const pridobiIzdelke = () => {
    fetch('http://localhost:3000/shop/', {
        method: 'GET'
    }).then((odgovor) => {
        return odgovor.json();
    }).then((izdelki) => {
        const tabela = document.getElementById("seznamIzdelkov");
        for (const izdelek of izdelki) {
            let row = tabela.insertRow(-1);
            let id = row.insertCell(-1);
            id.innerHTML = izdelek.id;
            let slika = row.insertCell(-1);
            slika.innerHTML = "<img src='" + izdelek.src + "' style='width: 50px' height='70px'>";
            let nazivIzdelka = row.insertCell(-1);
            nazivIzdelka.innerHTML = izdelek.naziv;
            let velikost = row.insertCell(-1);
            velikost.innerHTML = izdelek.velikost;
            let cena = row.insertCell(-1);
            cena.innerHTML = parseInt(izdelek.cena).toFixed(2) + "€";
            let popust = row.insertCell(-1);
            popust.innerHTML = izdelek.popust + " %";
            let dodaj = row.insertCell(-1);
            dodaj.innerHTML = "<button onclick='dodaj(" + JSON.stringify(izdelek) + ")' class='btn btn-success'>Dodaj v košarico</button>";
            if(roleAuth()) {
                let odstrani = row.insertCell(-1);
                odstrani.innerHTML = `<button onclick='odstrani(${izdelek.id})' class='btn btn-danger'>&times;</button>`;
            }
        }
    })
}

const roleAuth  = () => {
    const role = sessionStorage.getItem('role');
    if (role === 'admin') {
        return true;
    }
}

const odstrani = (index) => {
    fetch('http://localhost:3000/shop/' + index, {
        method: 'DELETE'
    }).then((odgovor) => {
        return odgovor.json();
    }).then((odgovorJSON) => {
        if (odgovorJSON.status === "deleted") {
            alert("Izdelek je bil odstranjen.")
            location.reload();
        }
    })
}



