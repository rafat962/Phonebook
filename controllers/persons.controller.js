import data from "../data/Phonebook.json" with { type: "json" };
//  data
let persons = [...data];

export const getAllPersons = async (req, res, next) => {
    try {
        res.status(200).json({
            status: "success",
            personData: persons,
        });
    } catch (err) {
        res.status(404).json({
            status: "Error",
            message: err.message,
        });
    }
};

export const getPersonByID = async (req, res, next) => {
    try {
        const id = req.params.id;
        const person = persons.find((item) => item.id == id);

        if (!person) {
            return res.status(404).json({
                status: "Error",
                message: `Person with id ${id} not found`,
            });
        }

        res.status(200).json({
            status: "success",
            person,
        });
    } catch (err) {
        res.status(404).json({
            status: "Error",
            message: err.message,
        });
    }
};

// 3.4 — DELETE
export const deletePerson = async (req, res, next) => {
    try {
        const id = req.params.id;
        const person = persons.find((item) => item.id == id);

        if (!person) {
            return res.status(404).json({
                status: "Error",
                message: `Person with id ${id} not found`,
            });
        }

        persons = persons.filter((item) => item.id != id);

        res.status(204).end();
    } catch (err) {
        res.status(500).json({
            status: "Error",
            message: err.message,
        });
    }
};

//POST /api/persons
export const createPerson = async (req, res, next) => {
    try {
        const { name, number } = req.body;

        if (!name || !number) {
            return res.status(400).json({
                status: "Error",
                error: "name and number are required",
            });
        }

        const duplicate = persons.find(
            (item) => item.name.toLowerCase() === name.toLowerCase(),
        );
        if (duplicate) {
            return res.status(409).json({
                status: "Error",
                error: "name must be unique",
            });
        }

        const newPerson = {
            id: String(Math.floor(Math.random() * 1_000_000)),
            name,
            number,
        };

        persons = [...persons, newPerson];

        res.status(201).json({
            status: "success",
            person: newPerson,
        });
    } catch (err) {
        res.status(500).json({
            status: "Error",
            message: err.message,
        });
    }
};

// 3.2 GET /info
export const getInfo = async (req, res, next) => {
    try {
        const time = new Date().toString();

        res.status(200).send(`
            <html>
              <body style="font-family: sans-serif; padding: 2rem;">
                <p>Phonebook has info for <strong>${persons.length}</strong> people</p>
                <p>${time}</p>
              </body>
            </html>
        `);
    } catch (err) {
        res.status(500).json({
            status: "Error",
            message: err.message,
        });
    }
};
