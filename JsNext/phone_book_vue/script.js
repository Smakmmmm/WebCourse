Vue.createApp({})
    .component("PhoneBook", {
        data() {
            return {
                name: "",
                surname: "",
                phoneNumber: "",

                items: []
            };
        },

        methods: {
            addPhoneBookRow() {
                const newPhoneNumberItem = {
                    name: this.name,
                    surname: this.surname,
                    phoneNumber: this.phoneNumber
                };

                this.items.push(newPhoneNumberItem);

                this.name = "";
                this.surname = "";
                this.phoneNumber = "";
            },

            deletePhoneBookRow(item) {
                this.items = this.items.filter(x => x !== item);
            },

            updateFields(editedItem) {
                this.item.name.text = editedItem.name;
                this.item.surname.text = editedItem.surname;
                this.item.phoneNumber.text = editedItem.phoneNumber;
            }
        },

        template: `
          <form @submit.prevent="addPhoneBookRow" class="row">
            <label class="col">
              <input v-model="name" class="form-control" type="text" placeholder="Name">
            </label>
            <label class="col">
              <input v-model="surname" class="form-control" type="text" placeholder="Surname">
            </label>
            <label class="col">
              <input v-model="phoneNumber" class="form-control" type="number" placeholder="Phone number">
            </label>
            <div class="col-auto">
              <button class="btn btn-primary">Add</button>
            </div>
          </form>

          <ul class="list-unstyled">
            <phone-book-item v-for="(item, index) in items"
                             :key="item.id"
                             :item="item"
                             :number="index + 1"
                             @delete-item="deletePhoneBookRow(item)"
                             @save-item="updateFields($event)"
            ></phone-book-item>
          </ul>
        `
    })
    .component("PhoneBookItem", {
        props: {
            item: {
                type: Object,
                required: true
            },

            number: Number
        },

        data() {
            return {
                isEditing: false,
                editingName: this.item.name,
                editingSurname: this.item.surname,
                editingPhoneNumber: this.item.phoneNumber
            };
        },

        methods: {
            save() {
                this.isEditing = false;

                this.$emit("save-item",
                    {
                        name: this.editingName,
                        surname: this.editingSurname,
                        phoneNumber: this.editingPhoneNumber
                    })
            },

            cancel() {

            }
        },

        template: `
          <li class="mb-2">
            <div class="row" v-if="!isEditing">
              <span class="col-1" v-text="number"></span>
              <span class="col" v-text="item.name"></span>
              <span class="col" v-text="item.surname"></span>
              <span class="col" v-text="item.phoneNumber"></span>
              <div class="col-auto">
                <button @click="isEditing = true" class="btn btn-primary me-2">Edit</button>
                <button @click="$emit('delete-item')" class="btn btn-danger">Delete</button>
              </div>
            </div>
            <div v-else class="row">
              <span class="col-1" v-text="number"></span>
              <label class="col">
                <input v-model="editingName" class="form-control" type="text" placeholder="Name">
              </label>
              <label class="col">
                <input v-model="editingSurname" class="form-control" type="text" placeholder="Surname">
              </label>
              <label class="col">
                <input v-model="editingPhoneNumber" class="form-control" type="number" placeholder="Phone number">
              </label>
              <div class="col-auto">
                <button @click="save" class="btn btn-primary">Save</button>
                <button class="btn btn-danger">Cancel</button>
              </div>
            </div>
          </li>
        `
    })
    .mount("#app");
