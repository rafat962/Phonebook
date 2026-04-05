import Person from "../models/Person.js";

// 3.13 + 3.18 — GET /api/persons
export const getAllPersons = async (req, res, next) => {
    try {
        const persons = await Person.find({});
        res.status(200).json({
            status: "success",
            personData: persons,
        });
    } catch (err) {
        next(err);
    }
};

// 3.18 — GET /api/persons/:id
export const getPersonByID = async (req, res, next) => {
    try {
        const person = await Person.findById(req.params.id);

        if (!person) {
            return res.status(404).json({
                status: "Error",
                message: `Person with id ${req.params.id} not found`,
            });
        }

        res.status(200).json({
            status: "success",
            person,
        });
    } catch (err) {
        next(err);
    }
};

// 3.15 — DELETE /api/persons/:id
export const deletePerson = async (req, res, next) => {
    try {
        const person = await Person.findByIdAndDelete(req.params.id);

        if (!person) {
            return res.status(404).json({
                status: "Error",
                message: `Person with id ${req.params.id} not found`,
            });
        }

        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

// 3.14 — POST /api/persons
// 3.17 — if name exists → update number instead
export const createPerson = async (req, res, next) => {
    try {
        const { name, number } = req.body;

        if (!name || !number) {
            return res.status(400).json({
                status: "Error",
                error: "name and number are required",
            });
        }

        // 3.17: check for existing name → update instead of creating
        const existing = await Person.findOne({
            name: { $regex: new RegExp(`^${name}$`, "i") },
        });

        if (existing) {
            const updated = await Person.findByIdAndUpdate(
                existing._id,
                { number },
                { new: true },
            );
            return res.status(200).json({
                status: "success",
                person: updated,
            });
        }

        const person = new Person({ name, number });
        const savedPerson = await person.save();

        res.status(201).json({
            status: "success",
            person: savedPerson,
        });
    } catch (err) {
        next(err);
    }
};

// 3.18 — GET /info
export const getInfo = async (req, res, next) => {
    try {
        const count = await Person.countDocuments();
        const time = new Date().toString();

        res.status(200).send(`
            <html>
              <body style="font-family: sans-serif; padding: 2rem;">
                <p>Phonebook has info for <strong>${count}</strong> people</p>
                <p>${time}</p>
              </body>
            </html>
        `);
    } catch (err) {
        next(err);
    }
};
