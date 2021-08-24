
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('uporabniki').del()
        .then(function () {
            // Inserts seed entries
            return knex('uporabniki').insert([
                {
                    "id": 1,
                    "ime": "jazen",
                    "geslo": "geslo123",
                },
                {
                    "id": 2,
                    "ime": "domen",
                    "geslo": "123",
                    "role":"admin"

                },
                {
                    "id": 3,
                    "ime": "kekec",
                    "geslo": "kekec123",

                },
                {
                    "id": 4,
                    "ime": "bedanec",
                    "geslo": "bedanec123",

                }
            ]);
        });
};
