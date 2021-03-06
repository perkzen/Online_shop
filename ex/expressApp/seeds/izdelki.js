
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('izdelki').del()
        .then(function () {
            // Inserts seed entries
            return knex('izdelki').insert([
                {
                    "id": 1,
                    "naziv": "Majica",
                    "velikost": "L",
                    "cena": 25,
                    "kolicina": 1,
                    "src": "slike/Majica.jpg",
                    "popust": 10
                },
                {
                    "id": 2,
                    "naziv": "Hlače",
                    "velikost": "M",
                    "cena": 20,
                    "kolicina": 1,
                    "src": "slike/Hlace.jpg",
                    "popust": 0
                },
                {
                    "id": 3,
                    "naziv": "Čevlji",
                    "velikost": 43,
                    "cena": 100,
                    "kolicina": 1,
                    "src": "slike/Superge.jpg",
                    "popust": 0
                },
                {
                    "id": 4,
                    "naziv": "Kapa",
                    "velikost": "S",
                    "cena": 5,
                    "kolicina": 1,
                    "src": "slike/Kapa.jpg",
                    "popust": 0
                },
                {
                    "id": 5,
                    "naziv": "Pulover",
                    "velikost": "XL",
                    "cena": 60,
                    "kolicina": 1,
                    "src": "slike/Pulover.jpg",
                    "popust": 0
                },
                {
                    "id": 6,
                    "naziv": "Nogavice",
                    "velikost": 41,
                    "cena": 11,
                    "kolicina": 1,
                    "src": "slike/Nogavice.jpg",
                    "popust": 0
                },
                {
                    "id": 7,
                    "naziv": "Kratke Hlače",
                    "velikost": "L",
                    "cena": 30,
                    "kolicina": 1,
                    "src": "slike/Kratke+hlace.jpg",
                    "popust": 0
                },
                {
                    "id": 8,
                    "naziv": "Vetrovka",
                    "velikost": "XL",
                    "cena": 160,
                    "kolicina": 1,
                    "src": "slike/Vetrovka.jpg",
                    "popust": 0
                },
                {
                    "id": 9,
                    "naziv": "Srajca",
                    "velikost": "XS",
                    "cena": 50,
                    "kolicina": 1,
                    "src": "slike/Srajca.jpg",
                    "popust": 0
                },
                {
                    "id": 10,
                    "naziv": "Kavbojke",
                    "velikost": "L",
                    "cena": 100,
                    "kolicina": 1,
                    "src": "slike/Kavbojke.jpg",
                    "popust": 0
                }
            ]);
        });
};
