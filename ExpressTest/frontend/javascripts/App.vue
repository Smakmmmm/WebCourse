<!--suppress JSValidateTypes -->
<script>
import PhoneBookService from "./phoneBookService";
import BootstrapModal from "./BootstrapModal.vue";
import alert from "bootstrap/js/src/alert";

export default {
  name: "App",

  components: {
    BootstrapModal
  },

  data() {
    return {
      contacts: [],
      term: "",
      name: "",
      phone: "",
      service: new PhoneBookService(),
      contactToDelete: null
    };
  },

  created() {
    this.loadContacts();
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
      this.$refs.deleteConfirmModal.show();
    },

    deleteContact() {
      this.service.deleteContact(this.contactToDelete.id).then(response => {
        if (!response.success) {
          alert(response.message);
          return;
        }

        this.$refs.deleteConfirmModal.hide();
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
}
</script>

<template>
  <h1 class="mb-3">PhoneBook</h1>

  <form @submit.prevent="createContact" class="mb-3">
    <h2 class="h5">Add contact</h2>

    <div class="row row-cols-lg-auto g-3 align-items-center">
      <div class="col-12">
        <input v-model="name" type="text" class="form-control" placeholder="Name">
      </div>
      <div class="col-12">
        <input v-model="phone" type="text" class="form-control" placeholder="Phone">
      </div>
      <div class="col-12">
        <button class="btn btn-primary">Create</button>
      </div>
    </div>
  </form>

  <form @submit.prevent="loadContacts" class="mb-3">
    <h2 class="h5">Search contact</h2>

    <div class="row row-cols-lg-auto g-3 align-items-center">
      <div class="col-12">
        <input v-model="term" type="text" class="form-control" placeholder="Search text">
      </div>
      <div class="col-12">
        <button class="btn btn-primary">Search</button>
      </div>
    </div>
  </form>

  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
      <tr>
        <th>№</th>
        <th>Name</th>
        <th>Phone</th>
        <th>Functions</th>
      </tr>
      </thead>
      <tbody v-cloak>
      <tr v-for="(contact, index) in contacts" :key="contact.id">
        <td v-text="index + 1"></td>
        <td>
          <div v-if="!contact.isEditing" v-text="contact.name"></div>
          <input v-else v-model="contact.tempName" class="form-control" type="text">
        </td>

        <td>
          <div v-if="!contact.isEditing" v-text="contact.phone"></div>
          <input v-else v-model="contact.tempPhone" class="form-control" type="text">
        </td>

        <td>
          <div v-if="!contact.isEditing">
            <button @click="startEdit(contact)" class="btn btn-primary">Edit</button>
            <button @click="showDeleteContactConfirmModal(contact)" class="btn btn-danger">Delete</button>
          </div>
          <div v-else>
            <button @click="saveEdit(contact)" class="btn btn-primary">Save</button>
            <button @click="contact.isEditing = false" class="btn btn-danger">Cancel</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <bootstrap-modal ref="deleteConfirmModal" @ok="deleteContact">
      <template #header>Delete confirmation</template>
      <template #body>Do you really want to delete this contact?</template>
    </bootstrap-modal>
  </div>
</template>

