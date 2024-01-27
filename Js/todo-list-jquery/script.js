$(function () {
    const addTodoForm = $("#add-todo-form");
    const todoList = $("#todo-list");
    const newTodoTextField = $("#new-todo-text-field");

    addTodoForm.submit(function (e) {
        e.preventDefault();

        let newTodoText = newTodoTextField.val().trim();
        newTodoTextField.removeClass("invalid");

        if (newTodoText.length === 0) {
            newTodoTextField.addClass("invalid");
            return;
        }

        const newTodo = $("<li>").addClass("todo-item");

        function setViewMode() {
            newTodo.html(`<span class="todo-item-text"></span>
                <button class="delete-button" type="button">Удалить</button>
                <button class="edit-button" type="button">Редактировать</button>`);

            newTodo.find(".todo-item-text").text(newTodoText);

            newTodo.find(".delete-button").click(function () {
                newTodo.remove();
            });

            newTodo.find(".edit-button").click(function () {
                newTodo.html(`<div class="text-field-with-message">
                        <input type="text" class="edit-text-field">
                        <div class="error-message">Необходимо указать текст</div> 
                    </div>
                    <button class="cancel-button" type="button">Отменить</button>
                    <button class="save-button" type="button">Сохранить</button>`);

                const editTextField = newTodo.find(".edit-text-field");
                editTextField.val(newTodoText);

                newTodo.find(".cancel-button").click(function () {
                    setViewMode();
                });

                newTodo.find(".save-button").click(function () {
                    const changedTodoText = editTextField.val().trim();
                    editTextField.removeClass("invalid");

                    if (changedTodoText.length === 0) {
                        editTextField.addClass("invalid");
                        return;
                    }

                    newTodoText = changedTodoText;
                    setViewMode();
                });
            });
        }

        setViewMode();

        todoList.append(newTodo);

        newTodoTextField.val("");
    });
});