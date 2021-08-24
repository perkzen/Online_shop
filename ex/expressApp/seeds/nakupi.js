exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('nakupi').del()
        .then(function () {
            // Inserts seed entries
            return knex('nakupi').insert([
                {
                    "uporabnikID": 1,
                    "znesek": 20.2,
                    "izdelki":JSON.stringify([
                        {
                            "id": 1,
                            "naziv": "Majica",
                            "velikost": "L",
                            "cena": 25,
                            "kolicina": 1,
                            "src": "Majica.jpg",
                            "popust": 10
                        },
                        {
                            "id": 2,
                            "naziv": "Hlače",
                            "velikost": "M",
                            "cena": 20,
                            "kolicina": 1,
                            "src": "Hlace.jpg",
                            "popust": 0
                        }]),
                    "datum": "2021-04-18T17:19:34.223Z"
                },
            ]);
        });
};
