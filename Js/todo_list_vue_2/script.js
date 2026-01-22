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
            newTodoItemId: 1,
            newTodoItemText: "",
            isEditing: false
        };
    },

    methods: {
        addTodoItem() {
            const newTodoItem = {
                id: this.newTodoItemId,
                text: this.newTodoItemText
            };

            this.newTodoItemId++;

            this.items.push(newTodoItem);

            this.newTodoItemText = "";
        },

        deleteTodoItem(index) {
            this.items.splice(index, 1);
        },

        editTodoItem() {

        },

        saveTodoItem() {

        },

        canselEditing() {

        }
    },

    template:`
      <h1>TODO List</h1>
      <form @submit.prevent="addTodoItem">
        <label>
          <input v-model="newTodoItemText" class="form-control" type="text">
        </label>
        <div>
          <button>Add</button>
        </div>
      </form>
      
      <ul class="list-unstyled">
        <li v-for="(item, index) in items"
            :key="item.id">
          <div>
            {{  item.text  }}
            <button @click="editTodoItem">Edit</button>
            <button @click="deleteTodoItem(index)">Delete</button>
          </div>
        </li>
      </ul>`
}).mount("#app");