Vue.createApp({
    props: {
        item: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            items: [],
            newTodoItemText: "",
            editingText: ""
        };
    },

    methods: {
        addTodoItem() {
            const newTodoItem = {
                text: this.newTodoItemText
            };

            this.items.push(newTodoItem);

            this.newTodoItemText = "";
        },

        deleteTodoItem(index) {
            this.items.splice(index, 1);
        },

        editTodoItem(index) {
            this.editingText = this.items[index].text;

            this.items[index].isEditing = true;
        },

        saveTodoItem(index) {
            this.items[index].isEditing = false;
        },

        canselEditing(index) {
            this.items[index].isEditing = false;
            this.items[index].text = this.editingText;
        }
    },

    template:`
      <h1>TODO List</h1>
      <form @submit.prevent="addTodoItem" class="row mb-3">
        <label class="col">
          <input v-model="newTodoItemText" class="form-control" type="text">
        </label>
        <div class="col-auto">
          <button class="btn btn-primary">Add</button>
        </div>
      </form>
      
      <ul class="list-unstyled">
        <li v-for="(item, index) in items"
            :key="item.id"
            class="mb-2">
          <div class="row" v-if="!item.isEditing">
            <span class="col" v-text="item.text"></span>
            <div class="col-auto">
              <button class="btn btn-primary me-2" @click="editTodoItem(index)">Edit</button>
              <button class="btn btn-danger" @click="deleteTodoItem(index)">Delete</button>
            </div>
          </div>
          <div class="row" v-else>
            <div class="col">
              <input v-model="item.text" type="text">
            </div>
            <div class="col-auto">
              <button class="btn btn-success me-2" @click="saveTodoItem(index)" type="button">Save</button>
              <button class="btn btn-danger" @click="canselEditing(index)" type="button">Cancel</button>
            </div>
          </div>
        </li>
      </ul>`
}).mount("#app");