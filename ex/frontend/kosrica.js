const kosarica = JSON.parse(sessionStorage.getItem("kosarica"));


function pridobiKosarico() {
    for (let i = 0; i < kosarica.length; i++) {
        kosarica[i].id = i;
        const izdelek = document.createElement("tr");
        const slikaIzdelka = document.createElement("td");
        const imeArtikla = document.createElement("td");
        const kolicina = document.createElement("td");
        const cena = document.createElement("td");
        const slika = document.createElement("img");
        const odstrani_btn = document.createElement("button");
        const popustIzdelka = document.createElement("td");

        cena.setAttribute("id", "cena" + kosarica[i].id);
        slika.src = `../${kosarica[i].src}`;

        slika.style.width = "80px";
        slika.style.height = "100px";
        slikaIzdelka.appendChild(slika);
        izdelek.appendChild(slikaIzdelka);

        imeArtikla.innerHTML = kosarica[i].naziv;
        izdelek.appendChild(imeArtikla);

        cena.innerHTML = kosarica[i].cena.toFixed(2) + "€";
        izdelek.appendChild(cena);

        popustIzdelka.innerHTML = (kosarica[i].popust || 0) + " %";
        izdelek.appendChild(popustIzdelka);

        kolicina.innerHTML = `<input type='number' min='1' value=${kosarica[i].kolicina} class="form form-control" style="width: 70px" id=${kosarica[i].naziv} oninput="posodobiKolicino(this.id,${kosarica[i].cena / kosarica[i].kolicina})">`

        izdelek.appendChild(kolicina);


        odstrani_btn.innerHTML = "&times";
        odstrani_btn.setAttribute("class", "btn btn-danger");
        odstrani_btn.setAttribute("id", kosarica[i].id);
        odstrani_btn.addEventListener("click", odstrani_izdelek)

        odstrani_btn.style.margin = "10px";
        izdelek.appendChild(odstrani_btn);

        document.getElementById("kosarica").appendChild(izdelek);

        izracunaj_ceno();
        izracunaj_ddv();
    }
}

function posodobiKolicino(id, cenaEnega) {
    let kolicina = parseInt(document.getElementById(id).value);
    for (let izdelek of kosarica) {
        if (izdelek.naziv === id) {
            izdelek.kolicina = kolicina;
            izdelek.cena = cenaEnega * kolicina;
            sessionStorage.setItem("kosarica", JSON.stringify(kosarica));
            document.getElementById("cena" + izdelek.id).innerHTML = izdelek.cena.toFixed(2) + "€";
            izracunaj_ceno();
            izracunaj_ddv();
        }
    }
}

function odstrani_izdelek() {
    const id = this.id;
    kosarica.splice(id, 1);
    sessionStorage.removeItem("kosarica");
    sessionStorage.setItem("kosarica", JSON.stringify(kosarica));
    location.reload();
}


function izracunaj_ceno() {
    let znesek = 0;
    for (let i = 0; i < kosarica.length; i++) {
        znesek += kosarica[i].cena;
    }
    document.getElementById("znesek").innerHTML = znesek.toFixed(2) + "€";
    return znesek.toFixed(2);
}

function izracunaj_ddv() {
    let znesek = 0;
    for (let i = 0; i < kosarica.length; i++) {
        znesek += kosarica[i].cena;
    }
    znesek = (znesek * 1.22).toFixed(2);
    document.getElementById("znesek_ddv").innerHTML = znesek + "€";
    return znesek;
}

function izracunaj_popust() {
    const popust_koda = document.getElementById("popust_koda").value;
    if (popust_koda < 1 || popust_koda > 99) {
        alert("Koda je nevaljana.")
    } else {
        document.getElementById("znesek").innerHTML = (izracunaj_ceno() * (1 - popust_koda * 0.01)).toFixed(2) + "€";
        document.getElementById("znesek_ddv").innerHTML = (izracunaj_ddv() * (1 - popust_koda * 0.01)).toFixed(2) + "€";
        const opozorilo = document.getElementById("opozorilo");
        opozorilo.setAttribute("class", "alert alert-success alert-dismissible fade show");
    }

    izracun_obrokov();

}

document.getElementById("popust-btn").addEventListener("click", izracunaj_popust);


document.getElementById("obroki").style.visibility = "hidden";


document.body.addEventListener("input", () => {
    const obroki = document.querySelector("input[name='obroki']:checked");
    if (obroki.value === "true") {
        document.getElementById("obroki").style.visibility = "visible";
    } else {
        document.getElementById("obroki").style.visibility = "hidden";
    }
})

function izracun_obrokov() {
    const prikaz_cene = document.getElementById("cena-obroka");
    const n = parseInt(document.getElementById("n-obrokov").value);
    const znesek_ddv_stirng = document.getElementById("znesek_ddv").innerHTML;
    const znesek_ddv = parseInt(znesek_ddv_stirng.substr(0, znesek_ddv_stirng.length - 2));
    const obrestna_mera = 1; // 1%

    // o = (G * p * n)/100
    // G+ = G + o
    // cena enea obroka = G+ / n
    const obresti = (znesek_ddv * obrestna_mera * n) / 100;
    const glavnica = znesek_ddv + obresti;
    const cena_obroka = (glavnica + obresti) / n;

    //moja formula
    //const cena_obroka = ((znesek_ddv * obrestna_mera * n) + znesek_ddv) / n

    if (isNaN(cena_obroka)) {
        prikaz_cene.innerHTML = "Cena obroka: " + 0.00.toFixed(2) + "€/ mesec";
    } else {
        prikaz_cene.innerHTML = "Cena obroka: " + cena_obroka.toFixed(2) + "€/ mesec";
    }

}

document.body.addEventListener("change", izracun_obrokov);


const posljiKosrico = () => {
    let kosarica = {
        uporabnikID: sessionStorage.getItem("uporabnik"),
        izdelki: sessionStorage.getItem("kosarica"),
        znesek: izracunaj_ddv(),
        datum: new Date()
    }
    fetch('http://localhost:3000/shop/', {
        method: 'POST',
        body: JSON.stringify(kosarica),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((odgovor) => {
        return odgovor.json();
    })
}