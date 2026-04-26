/* global axios, bootstrap, Vue */

import "bootstrap/dist/css/bootstrap.css";
import "../stylesheets/style.scss";

function executeGet(url, data) {
    return axios.get(url, {
        params: data
    }).then(response => response.data);
}

function executePost(url, data) {
    return axios.post(url, data).then(response => response.data);
}

function executeDelete(url) {
    return axios.delete(url).then(response => response.data);
}

function executeEdit(url, data) {
    return axios.put(url, data).then(response => response.data);
}

class PhoneBookService {
    constructor() {
        this.baseUrl = "/api/contacts";
    }

    getContacts(term) {
        return executeGet(this.baseUrl, { term });
    }

    deleteContact(id) {
        return executeDelete(`${this.baseUrl}/${id}`);
    }

    createContact(contact) {
        return executePost(this.baseUrl, contact);
    }

    editContact(id, contact) {
        return executeEdit(`${this.baseUrl}/${id}`, contact);
    }
}

Vue.createApp({
    data() {
        return {
            contacts: [],
            term: "",
            name: "",
            phone: "",
            service: new PhoneBookService(),
            deleteConfirmDialog: null,
            contactToDelete: null
        };
    },

    created() {
        this.loadContacts();
    },

    mounted() {
            this.deleteConfirmDialog = new bootstrap.Modal(this.$refs.modal);
    },

    methods: {
        createContact() {
            const contact = {
                name: this.name,
                phone: this.phone
            };

            this.service.createContact(contact).then(response => {
                if (!response.success) {
                    alert(response.message);
                    return;
                }

                this.name = "";
                this.phone = "";

                this.loadContacts();
            }).catch(() => alert("Couldn't create contacts"));
        },

        showDeleteContactConfirmModal(contact) {
            this.contactToDelete = contact;
            this.deleteConfirmDialog.show();
        },

        deleteContact() {
            this.service.deleteContact(this.contactToDelete.id).then(response => {
                if (!response.success) {
                    alert(response.message);
                    return;
                }

                this.deleteConfirmDialog.hide();
                this.loadContacts();
                this.contactToDelete = null;
            }).catch(() => alert("Couldn't delete the contact"));
        },

        startEdit(contact) {
            contact.isEditing = true;
            contact.tempName = contact.name;
            contact.tempPhone = contact.phone;
        },

        saveEdit(contact) {
            if (!contact.tempName.trim() || !contact.tempPhone.trim()) {
                alert("Name and phone fields couldn't be empty!");
                return;
            }

            const updatedContact = {
                name: contact.tempName,
                phone: contact.tempPhone
            }

            this.service.editContact(contact.id, updatedContact).then(response => {
                if (!response.success) {
                    alert(response.message);
                    return;
                }

                contact.name = contact.tempName;
                contact.phone = contact.tempPhone;
                contact.isEditing = false;
            }).catch(() => alert("Couldn't edit the contact"));
        },

        loadContacts() {
            /** @type {Array} */
            this.service.getContacts(this.term).then(contacts => {
                this.contacts = contacts.map(c => ({
                    ...c,
                    isEditing: false,
                    tempName: c.name,
                    tempPhone: c.phone
                }));
            }).catch(() => alert("Couldn't load contacts"));
        }
    }
}).mount("#app");