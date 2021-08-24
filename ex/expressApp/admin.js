const adminAuth = () => {
    const role = sessionStorage.getItem('role');
    if (role === 'admin') {
        document.getElementById('objavaArtikla').innerHTML = "  <a class=\"nav-link active bg-success\" aria-current=\"page\"   href=\"../frontend/html/objava_artikla.html\">Dodaj nov izdelek</a>"
    }
}


