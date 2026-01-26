Vue.createApp({})
.component("PhoneBook", {
    data() {
        return {
            items:[
                {name: "", surname: "", phoneNumber: ""}
            ]
        };
    }
})