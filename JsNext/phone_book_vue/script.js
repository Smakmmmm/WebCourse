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
            addPhoneBookRaw() {
                const newPhoneNumberItem = {
                    name: this.name,
                    surname: this.surname,
                    phoneNumber: this.phoneNumber
                };

                this.items.push(newPhoneNumberItem);

                this.name = "";
                this.surname = "";
                this.phoneNumber = "";
            }
        },

        template: `
          <form @submit.prevent="addPhoneBookRaw" class="row">
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
                editingName: this.item.name.text,
                editingSurname: this.item.surname.text,
                editingPhoneNumber: this.item.phoneNumber.text
            };
        },

        methods: {},

        template: `
          <li class="mb-2">
            <div class="row" v-if="!isEditing">
              <span class="col" v-text="number"></span>
              <span class="col" v-text="item.name"></span>
              <span class="col" v-text="item.surname"></span>
              <span class="col" v-text="item.phoneNumber"></span>
              <div class="col-auto">
                <button class="btn btn-primary me-2">Save</button>
                <button class="btn btn-danger">Cancel</button>
              </div>
            </div>
            <div v-else>

            </div>
          </li>
        `
    })
    .mount("#app");