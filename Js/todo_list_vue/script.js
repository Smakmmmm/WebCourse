Vue.createApp({})
    .component("TodoList", {
        data() {
            return {
                items: [],
                newTodoItemText: "",
                newTodoItemId: 1
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
            }
        },

        template: `
          <form @submit.prevent="addTodoItem" class="row">
            <label class="col">
              <input v-model="newTodoItemText" class="form-control" type="text">
            </label>
            <div class="col-auto">
              <button class="btn btn-primary">Add</button>
            </div>
          </form>

          <ul>
            <todo-list-item v-for="item in items" 
                            :key="item.id" 
                            :item="item"></todo-list-item>
          </ul>`
    })
    .component("TodoListItem", {
        props: {
            item: {
                type: Object,
                required: true
            }
        },

        data() {
            return {};
        },

        template: `<li>{{  item.text  }}</li>`
    })
    .mount("#app");