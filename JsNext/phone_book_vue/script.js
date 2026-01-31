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
            <phone-book-item v-for="item in items"
                             :key="item.id"
                             :item="item"
            ></phone-book-item>
          </ul>
        `
    })
    .component("PhoneBookItem", {
        props: {
            item: {
                type: Object,
                required: true
            }
        },

        data() {
            return {
                isEditing: false,
                editingName: this.item.name.text,
                editingSurname: this.item.surname.text,
                editingPhoneNumber: this.item.phoneNumber.text
            };
        },

        methods: {

        },

        template: `
          <li>
            <div v-if="!isEditing">
              <span v-model="item.name.text"></span>
              <span v-model="item.surname.text"></span>
              <span v-model="item.phoneNumber.text"></span>
              <div>
                <button>Save</button>
                <button>Cancel</button>
              </div>
            </div>
            <div v-else>
              
            </div>
          </li>
        `
    })
    .mount("#app");