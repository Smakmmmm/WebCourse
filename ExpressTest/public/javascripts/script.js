/* global axios, Vue, bootstrap */

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
        this.deleteConfirmDialog = new bootstrap.Modal(this.$refs.modal, {});
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
            }).catch(() => alert("Couldn't delete contacts"));
        },

        loadContacts() {
            this.service.getContacts(this.term).then(contacts => {
                this.contacts = contacts;
            }).catch(() => alert("Couldn't load contacts"));
        }
    }
}).mount("#app");