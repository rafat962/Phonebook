import mongoose from "mongoose";

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

if (!password) {
    console.log("Usage: node mongo.js <password> [name] [number]");
    process.exit(1);
}

// ── Connection
const url = `mongodb+srv://rafatkamel96_db_user:OCwH85x28rX2E8Du@cluster0.vdsw1kb.mongodb.net/?appName=Cluster0`;
// node mongo.js yourpassword rafatkamel96_db_user OCwH85x28rX2E8Du 040-1234556
// const url = `mongodb+srv://YOUR_USERNAME:${password}@YOUR_CLUSTER.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model("Person", personSchema);

if (name && number) {
    // ADD a new person
    const person = new Person({ name, number });

    person.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    });
} else {
    // LIST all persons
    Person.find({}).then((persons) => {
        persons.forEach((p) => console.log(`${p.name} ${p.number}`));
        mongoose.connection.close();
    });
}
