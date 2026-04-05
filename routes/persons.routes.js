import { Router } from "express";
import {
    getAllPersons,
    getPersonByID,
    deletePerson,
    createPerson,
} from "../controllers/persons.controller.js";

const router = Router();

router.get("/persons", getAllPersons);
router.get("/persons/:id", getPersonByID);
router.delete("/persons/:id", deletePerson);
router.post("/persons", createPerson);

export default router;
