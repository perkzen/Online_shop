let seznam_artiklov = JSON.parse(localStorage.getItem("seznam-artiklov")) || [];

document.getElementById("visina-popusta").style.visibility = "hidden";


document.body.addEventListener("input", () => {
    const popust = document.querySelector("input[name='popust']:checked");
    if (popust.value === "true") {
        document.getElementById("visina-popusta").style.visibility = "visible";
    } else {
        document.getElementById("visina-popusta").style.visibility = "hidden";
    }
})

const validate_obrazec = () => {
    const ime = document.getElementById("ime").value;
    const velikost = document.getElementById("velikost").value;
    const cena = document.getElementById("cena").value;

    if (ime === "") {
        alert("Vnesi ime izdelka.")
        return false;
    }

    for (let i = 0; i < ime.length; i++) {
        for (let number = 0; number < 10; number++) {
            if (ime[i] === number.toString()) {
                alert("Ime ne sme vsebovati številk.")
                return false;
            }
        }
    }

    if (ime.length > 30) {
        alert("Ime je predolgo")
        return false;
    }

    if (ime.length < 2) {
        alert("Ime je prekratko")
        return false;
    }

    if (velikost === "") {
        alert("Vnesi opis.")
        return false;
    }



    if (cena <= 0 || cena === "") {
        alert("Vnesi ceno.")
        return false;
    }
    return true;
}


const reader = new FileReader();
const img = document.getElementById("img");
let file;
// prebere sliko in jo shrani v objekt
// https://developer.mozilla.org/en-US/docs/Web/API/FileReader
img.addEventListener("change", function () {
    reader.addEventListener("load", () => {
        file = reader.result;
    })
    reader.readAsDataURL(this.files[0])
})

const dodaj_artikel = () => {
    const ime = document.getElementById("ime").value;
    const velikost = document.getElementById("velikost").value;
    const cena = document.getElementById("cena").value;
    const popust = document.querySelector("input[name='popust']:checked");

    const artikel = {
        naziv: ime,
        velikost: velikost,
        cena: cena,
        kolicina: 1,
        src: file,
        popust: 0
    };


    if (popust.value === "true") {
        artikel.popust = document.getElementById("st-popusta").value;
    }

    if (validate_obrazec()) {
        fetch('http://localhost:3000/shop/objava', {
            method: 'POST',
            body: JSON.stringify(artikel),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((odgovor) => {
            return odgovor.json();
        }).then((odgovorJSON) => {
            alert("Izdelek je bil uspešno dodan.")
        })
    }
}

