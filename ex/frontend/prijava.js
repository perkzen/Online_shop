const  prijava = () => {
    event.preventDefault();
    const uporabnik = {
        ime: document.getElementById("name").value,
        geslo: document.getElementById("pass").value
    }
    fetch('http://localhost:3000/uporabniki', {
        method: 'POST',
        body: JSON.stringify(uporabnik),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((odgovor) => {
        return odgovor.json();
    }).then((odgovorJSON) => {
        if (odgovorJSON.status === "login") {
            document.getElementById("name").value = "";
            document.getElementById("pass").value = "";
            alert("Prijava je bila uspešna!")
            sessionStorage.setItem("uporabnik",odgovorJSON.id);
            sessionStorage.setItem("role", odgovorJSON.role);
            window.location.href = '../frontend/html/index.html';
        }else {
            alert("Prijava ni bila uspešna, poskusite znova.")
        }

    })
}

const odjava = () => {
    sessionStorage.clear();
}