// Default checked je meseznča vezava, zato je potrebno default ceno nastaviti na 20.00€.
let cena = document.getElementById("cena");
cena.innerHTML += " 20.00€";

document.body.addEventListener("change", () => {
    let checked_vezava = document.querySelector("input[name='vezava']:checked");
    let nakup_vezav = document.getElementById("nakup_vezav");
    let popust = Math.trunc(parseInt(nakup_vezav.value) / 5) * (parseInt(checked_vezava.value) * 0.2);
    let cena_clanarine = parseInt(checked_vezava.value) * parseInt(nakup_vezav.value) - popust;
    cena.innerHTML = `Cena: ${cena_clanarine}.00€`
})