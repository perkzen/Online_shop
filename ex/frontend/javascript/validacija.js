const validate = () => {
    const email = document.getElementById("email").value;
    const ime = document.getElementById("name").value;
    const geslo = document.getElementById("pass").value;
    const geslo2 = document.getElementById("pass2").value;

    if (ime === "") {
        alert("Prosim, vnesite ime.");
        return false;
    }

    if (email === "") {
       alert("Prosim, vnesite email.")
       return false;
    }

    if (geslo === "" || geslo2 === "") {
        alert("Prosim, vnesite geslo.")
        return false;
    }

    if (geslo !== geslo2 && geslo !== "" && geslo2 !== "") {
        alert("Preverite, če se gesli ujemata.")
        return false;
    }

    if (geslo.length < 6) {
        alert("Geslo je prekratko.");
        return false;
    }

    if (geslo.length > 30) {
        alert("Geslo je predolgo.");
        return false;
    }

    //pogleda če gelslo vsebuje številke
    let numbers_in_password = false;
    for (let i = 0; i < geslo.length; i++) {
        for (let number = 0; number < 10; number++) {
            if (geslo[i] === number.toString()) {
                numbers_in_password = true;
            }
        }
    }

    if (numbers_in_password === false) {
        alert("Geslo potrebuje številke.")
        return false;
    }

    return true;
}