$(function () {
    const addPhoneForm = $("#add-phone-form");
    const phoneNumbersTable = $("#phone-numbers-table");
    const newSurnameField = $("#new-surname-text-field");
    const newNameField = $("#new-name-text-field");
    const newPhoneNumberField = $("#new-phone-number-field");

    let serialNumber = 1;

    addPhoneForm.submit(function (e) {
        e.preventDefault();

        let newSerialNumber = serialNumber;
        let newSurname = newSurnameField.val().trim();
        let newName = newNameField.val().trim();
        let newPhoneNumber = newPhoneNumberField.val().trim();

        newSurnameField.removeClass("invalid");
        newNameField.removeClass("invalid");
        newPhoneNumberField.removeClass("invalid");

        let needReturn = false;

        if (newSurname.length === 0) {
            newSurnameField.addClass("invalid");
            needReturn = true;
        }

        if (newName.length === 0) {
            newNameField.addClass("invalid");
            needReturn = true;
        }

        if (newPhoneNumber.length === 0) {
            newPhoneNumberField.addClass("invalid");
            needReturn = true;
        }

        if (needReturn) {
            return;
        }

        const newTableRow = $("<tr>");

        function setViewMode() {
            newTableRow.html(`<td class="serial-number"></td>
                <td class="surname"></td>
                <td class="name"></td>
                <td class="phone-number"></td>
                <td>
                    <button class="delete-button" type="button">Удалить</button>
                    <button class="edit-button" type="button">Редактировать</button>
                </td>`);

            newTableRow.find(".serial-number").text(newSerialNumber);
            newTableRow.find(".surname").text(newSurname);
            newTableRow.find(".name").text(newName);
            newTableRow.find(".phone-number").text(newPhoneNumber);

            newTableRow.find(".delete-button").click(function () {
                const currentElementSerialNumber = parseInt(newTableRow.find(".serial-number").text());
                newTableRow.remove();
                serialNumber--;

                const serialNumbers = $(".serial-number");

                for (let i = currentElementSerialNumber - 1; i < serialNumber; i++) {
                    serialNumbers.eq(i).text(i + 1);
                }
            });

            newTableRow.find(".edit-button").click(function () {
                const currentElementSerialNumber = parseInt(newTableRow.find(".serial-number").text());

                newTableRow.html(`<td class="serial-number"></td>
                    <td class="surname">
                        <div class="text-field-with-message">
                            <input type="text" class="edit-surname-field">
                            <div class="error-message">Необходимо указать фамилию</div>
                        </div>
                    </td>
                    <td class="name">
                        <div class="text-field-with-message">
                            <input type="text" class="edit-name-field">
                            <div class="error-message">Необходимо указать имя</div>
                        </div>
                    </td>
                    <td class="phone-number">
                        <div class="text-field-with-message">
                            <input type="number" class="edit-phone-number-field">
                            <div class="error-message">Необходимо указать номер телефона</div>
                        </div>
                    </td>
                    <td>
                        <button class="save-button" type="button">Сохранить</button>
                        <button class="cancel-button" type="button">Отменить</button>
                    </td>`);

                const editSurnameField = newTableRow.find(".edit-surname-field");
                const editNameField = newTableRow.find(".edit-name-field");
                const editPhoneNumberField = newTableRow.find(".edit-phone-number-field");
                newTableRow.find(".serial-number").val(currentElementSerialNumber);

                editSurnameField.val(newSurname);
                editNameField.val(newName);
                editPhoneNumberField.val(newPhoneNumber);

                newTableRow.find(".cancel-button").click(function () {
                    newSerialNumber = currentElementSerialNumber;
                    setViewMode();
                });

                newTableRow.find(".save-button").click(function () {
                    const changedSurname = editSurnameField.val().trim();
                    const changedName = editNameField.val().trim();
                    const changedPhoneNumber = editPhoneNumberField.val().trim();

                    needReturn = false;

                    if (changedSurname.length === 0) {
                        editSurnameField.addClass("invalid");
                        needReturn = true;
                    }

                    if (changedName.length === 0) {
                        editNameField.addClass("invalid");
                        needReturn = true;
                    }

                    if (changedPhoneNumber.length === 0) {
                        editPhoneNumberField.addClass("invalid");
                        needReturn = true;
                    }

                    if (needReturn) {
                        return;
                    }

                    newSerialNumber = currentElementSerialNumber;
                    newSurname = changedSurname;
                    newName = changedName;
                    newPhoneNumber = changedPhoneNumber;
                    setViewMode();
                });
            });
        }

        setViewMode();

        phoneNumbersTable.append(newTableRow);
        serialNumber++;

        newSurnameField.val("");
        newNameField.val("");
        newPhoneNumberField.val("");
    })
});