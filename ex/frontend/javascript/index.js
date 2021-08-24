const ura_spletne_strani = document.getElementById("time");
const datum_spletne_strani = document.getElementById("datum");
const akcija_spletna_stran = document.getElementById("akcija");
const preostali_cas_akcije = document.getElementById("preostali_cas_akcije");

const time = () => {
    let date = new Date();
    let leto = date.getFullYear();
    let mesec = date.getMonth() + 1;
    let dan = date.getDate();
    let ure = date.getHours();
    let min = date.getMinutes()
    let sec = date.getSeconds();

    // za lepši izpis se doda 0 če je število manjše od 10
    if (sec < 10) {
        sec = "0" + sec;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (ure < 10) {
        ure = "0" + ure;
    }
    ura_spletne_strani.innerHTML = ure + ":" + min + ":" + sec;
    datum_spletne_strani.innerHTML = dan + "." + mesec + "." + leto;
}
window.setInterval(time, 10);




const cas_akijce = (year,month,day) => {
    let datum_akcije = new Date(year, month, day).getTime();
    let real_month = month+1;
    akcija_spletna_stran.innerHTML = "Akcija velja do: " + day + "." + real_month + "." + year;

    let now = new Date().getTime();

    let razlika = datum_akcije - now;

    let days = Math.floor(razlika / (1000 * 60 * 60 * 24)) * 24;
    let hours = Math.floor((razlika % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + days;
    let minutes = Math.floor((razlika % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((razlika % (1000 * 60)) / 1000);

//skrajšaj
    let display_seconds = seconds;
    let display_minutes = minutes;
    let display_hours = hours;

    if (seconds < 10) {
        display_seconds = "0" + seconds;
    }

    if (minutes < 10) {
        display_minutes = "0" + minutes;
    }

    if (hours < 10) {
        display_hours = "0" + hours;
    }

    preostali_cas_akcije.innerHTML = "Akcija še traja: " + display_hours + "h " + display_minutes + "m " + display_seconds + "s";


    if (razlika < 0) {
        const akcija_potekla = document.createElement("h4");
        const div = document.getElementById("moj-div");
        akcija_potekla.innerHTML = "Akcija je nažalost potekla!";
        akcija_potekla.setAttribute("class", "text-danger");
        div.appendChild(akcija_potekla)
        window.clearInterval(interval);
        preostali_cas_akcije.innerHTML = "Akcija še traja: 00:00:00";
    }

}

let interval = window.setInterval(function () {cas_akijce(2021, 2, 30)}, 10);