const express = require('express')
const app = express()
const sql = require('sqlite3').verbose()
const bodyParser = require('body-parser');
const path = require('path')

app.use(bodyParser.json())

const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sql.Database(dbPath, { encoding: 'UTF-8' });

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS citys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    `);
});
  

app.post('/add-city', (req, res) => {

    //* check if city already exists -->

    db.get("SELECT * FROM citys WHERE name = ?", [req.body.city], (err, row) => {
        if (err) {
            console.error("Error during city check:", err);
            res.status(500).send("Fehler bei der Datenbankabfrage");
        } else if (row) {
            //* If the city already exists -->

            console.log("City already exists:", row);
            res.status(500).send("Stadt bereits bekannt");
        } else {
            //* If the city does not exist -->

            console.log("City does not exist, inserting:", req.body.city);

            //* adding new city to database -->

            const stmt = db.prepare("INSERT INTO citys (name) VALUES (?)");
            stmt.run(req.body.city, (err) => {
                if (err) {
                    console.error("Error during INSERT:", err);
                    res.status(500).send("Fehler beim Einfügen der Stadt");
                } else {
                    console.log("City successfully added:", req.body.city);
                    res.status(200).send("Stadt erfolgreich hinzugefügt");
                }
            });
        }
    });
});


app.get("/city-list", (req, res) => {

    //TODO: error handling

    db.all("SELECT * FROM citys", (err, rows) => {
        console.log(rows);

        res.send(rows)
    })
})

app.listen(4000)