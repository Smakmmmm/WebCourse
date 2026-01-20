Vue.createApp({
    data() {

    },

    methods: {

    },

    template:`
      <h1>TODO List</h1>
      <form @submit.prevent="//TODO method">
        <label>
          <input class="form-control" type="text">
        </label>
        <div>
          <button>Add</button>
        </div>
      </form>
      
      <ul class="list-unstyled">
        
      </ul>
    `
}).mount("#app");