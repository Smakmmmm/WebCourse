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

    })
    .mount("#app");