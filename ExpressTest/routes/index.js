const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

let contacts = []; // { id, name, phone }
let currentContactId = 1;

// /api/contacts?term=text
router.get("/api/contacts", function(req, res) {
    const term = (req.query.term || "").toUpperCase();

    const result = term.length === 0
        ? contacts
        : contacts.filter(c => c.name.toUpperCase().includes(term) || c.phone.toUpperCase().includes(term));

    res.send(result);
});

router.delete("/api/contacts/:id", function (req, res) {
    const id = Number(req.params.id);

    contacts = contacts.filter(c => c.id !== id);

    res.send({
        success: true,
        message: null
    });
});

// { name, phone }
router.post("/api/contacts", function (req, res) {
    const contact = {
        name: req.body.name,
        phone: req.body.phone
    };

    if (!contact.name) {
        res.send({
            success: false,
            message: "Field 'name' is required"
        });
        return;
    }

    if (!contact.phone) {
        res.send({
            success: false,
            message: "Field 'phone' is required"
        });
        return;
    }

    const upperCasePhone = contact.phone.toUpperCase();

    if (contacts.some(c => c.phone.toUpperCase() === upperCasePhone)) {
        res.send({
            success: false,
            message: "Phone must be unique"
        });
        return;
    }

    contact.id = currentContactId;
    currentContactId++;

    contacts.push(contact);

    res.send({
        success: true,
        message: null
    });
});

router.put("/api/contacts/:id", function (req, res) {
    const updatedContactId = Number(req.params.id);
    const updatedContact = req.body;

    const contact = contacts.find(c => c.id === updatedContactId);

    if (!contact) {
        res.send({success: false, message: "Contact not found!"});
        return;
    }

    if (!updatedContact.name || !updatedContact.phone) {
        res.send({success: false, message: "Name and fond are required!"});
        return;
    }

    if (contacts.some(c => c.phone === updatedContact.phone && c.id !== updatedContactId)) {
        res.send({success: false, message: "Phone must be unique!"});
        return;
    }

    contact.name = updatedContact.name;
    contact.phone = updatedContact.phone;

    res.send({success: true, message: null});
});

module.exports = router;
