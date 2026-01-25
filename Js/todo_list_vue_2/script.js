Vue.createApp({
    data() {
        return {
            items: [],
            newTodoItemText: "",
            isSubmitted: false,
            isItemValidated: false
        };
    },

    computed: {
        validate() {
            return !(this.newTodoItemText.length === 0);
        },

        validateItem() {
            return (item) => {
                return !(item.text.trim().length === 0);
            };
        }
    },

    methods: {
        addTodoItem() {
            this.isSubmitted = true;

            if (this.validate) {
                const newTodoItem = {
                    text: this.newTodoItemText
                };

                this.items.push(newTodoItem);

                this.newTodoItemText = "";

                this.isSubmitted = false;
            }
        },

        deleteTodoItem(index) {
            this.items.splice(index, 1);
        },

        editTodoItem(item, index) {
            this.items[index].isEditing = true;
            item.editingText = this.items[index].text;
        },

        saveTodoItem(item, index) {
            this.isItemValidated = true;

            if (this.validateItem(item)) {
                this.items[index].isEditing = false;

                this.isItemValidated = false;
            }
        },

        canselEditing(item, index) {
            this.items[index].isEditing = false;
            this.items[index].text = item.editingText;
            this.editingText = "";
        }
    },

    template: `
      <h1>TODO List</h1>
      <form @submit.prevent="addTodoItem" class="row mb-3 needs-validation" :class="{'was-validated' : isSubmitted}"
            novalidate>
        <div class="input-group has-validation row">
          <div class="col form-label" for="validationCustom01">
            <input v-model="newTodoItemText"
                   :class="{'is-invalid' : isSubmitted && !validate}"
                   class="form-control"
                   id="validationCustom01"
                   type="text"
                   required>
            <div class="invalid-feedback">
              Please fill the task
            </div>
          </div>
          <div class="col-auto">
            <button class="btn btn-primary">Add</button>
          </div>
        </div>
      </form>

      <ul class="list-unstyled">
        <li v-for="(item, index) in items"
            :key="item.id"
            class="mb-2"
            :class="{'was-validated' : isItemValidated}">
          <div class="row" v-if="!item.isEditing">
            <span class="col" v-text="item.text"></span>
            <div class="col-auto">
              <button class="btn btn-primary me-2" @click="editTodoItem(item, index)">Edit</button>
              <button class="btn btn-danger" @click="deleteTodoItem(index)">Delete</button>
            </div>
          </div>
          <div class="row has-validation" v-else>
            <div class="col" for="validationCustom02">
              <input v-model="item.text"
                     type="text"
                     class="col form-control"
                     :class="{'is-invalid' : isItemValidated && !validateItem}"
                     id="validationCustom02"
                     required>
              <div class="invalid-feedback">
                Please fill the task
              </div>
            </div>
            <div class="col-auto">
              <button class="btn btn-success me-2" @click="saveTodoItem(item, index)" type="button">Save</button>
              <button class="btn btn-danger" @click="canselEditing(item, index)" type="button">Cancel</button>
            </div>
          </div>
        </li>
      </ul>`
}).mount("#app");