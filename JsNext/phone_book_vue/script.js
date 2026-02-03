Vue.createApp({})
    .component("PhoneBook", {
        data() {
            return {
                name: "",
                surname: "",
                phoneNumber: "",

                items: [],

                validated: false
            };
        },

        methods: {
            addPhoneBookRow(event) {
                const form = event.target;
                this.validated = true;

                if (form.checkValidity() === false) {
                    return;
                }

                const newPhoneNumberItem = {
                    id: Date.now(),
                    name: this.name,
                    surname: this.surname,
                    phoneNumber: this.phoneNumber
                };

                this.items.push(newPhoneNumberItem);

                this.name = "";
                this.surname = "";
                this.phoneNumber = "";

                this.validated = false;
            },

            deletePhoneBookRow(item) {
                this.items = this.items.filter(x => x !== item);
            },

            updateFields(event) {
                event.targetItem.name = event.name;
                event.targetItem.surname = event.surname;
                event.targetItem.phoneNumber = event.phoneNumber;
            }
        },

        template: `
          <form @submit.prevent="addPhoneBookRow"
                class="row needs-validation" novalidate
                :class="{'was-validated' : validated}">
            <div class="col">
              <input v-model="name" class="form-control" type="text" placeholder="Name" required>
              <div class="invalid-feedback">Please, dill the name field</div>
            </div>
            <div class="col">
              <input v-model="surname" class="form-control" type="text" placeholder="Surname" required>
              <div class="invalid-feedback">Please, dill the surname field</div>
            </div>
            <div class="col">
              <input v-model="phoneNumber" class="form-control" type="number" placeholder="Phone number" required>
              <div class="invalid-feedback">Please, dill the phone number field</div>
            </div>
            <div class="col-auto">
              <button class="btn btn-primary">Add</button>
            </div>
          </form>

          <ul class="list-unstyled">
            <phone-book-item v-for="(item, index) in items"
                             :key="item.id"
                             :item="item"
                             :index="index"
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

            index: Number,
            number: Number
        },

        data() {
            return {
                isEditing: false,
                editingName: this.item.name,
                editingSurname: this.item.surname,
                editingPhoneNumber: this.item.phoneNumber,

                validated: false
            };
        },

        methods: {
            isItemValid() {
                return this.editingName.trim() !== "" &&
                    this.editingSurname.trim() !== "" &&
                    String(this.editingPhoneNumber).trim() !== "";
            },

            save() {
                this.validated = true;

                if (!this.isItemValid()) {
                    return;
                }

                this.isEditing = false;

                this.$emit("save-item",
                    {
                        targetItem: this.item,
                        name: this.editingName,
                        surname: this.editingSurname,
                        phoneNumber: this.editingPhoneNumber
                    });

                this.validated = false;
            },

            cancel() {
                this.isEditing = false;
                this.editingName = this.item.name;
                this.editingSurname = this.item.surname;
                this.editingPhoneNumber = this.item.phoneNumber;
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
            <div v-else class="row" :class="{'was-validated' : validated}">
              <span class="col-1" v-text="number"></span>
              <div class="col">
                <input v-model="editingName" class="form-control" type="text" placeholder="Name" required>
              </div>
              <div class="col">
                <input v-model="editingSurname" class="form-control" type="text" placeholder="Surname" required>
              </div>
              <div class="col">
                <input v-model="editingPhoneNumber" class="form-control" type="number" placeholder="Phone number"
                       required>
              </div>
              <div class="col-auto">
                <button @click="save" class="btn btn-primary">Save</button>
                <button @click="cancel" class="btn btn-danger">Cancel</button>
              </div>
            </div>
          </li>
        `
    })
    .mount("#app");
