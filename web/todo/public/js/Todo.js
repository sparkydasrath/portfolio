let Todo = (function () {

    "use strict";

    const storageKey = "todo_store";

    // DOM placeholder
    let DOM = {};
    let todoItems = [];
    const maxSeed = 500;
    const deleteButtonClass = "delete";
    const completeButtonClass = "complete";
    //let todoItems = generateSampleTodos();

    function TodoItem(id, todoText) {
        this.id = id;
        this.todoText = todoText;
        this.isCompleted = false;

        this.toString = function () {
            return this.todoText;
        }
    }

    let storage = {
        save: function (key, value) {
            if (arguments.length > 1) {
                localStorage.setItem(key, JSON.stringify(value));
            }
        },
        load: function (key) {
            console.log("loading ", key);
            let data = localStorage.getItem(key);
            return (data && JSON.parse(data)) || [];
        }
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function generateSampleTodos() {
        let tds = [
            new TodoItem(getRandomInt(maxSeed), "todo 1"),
            new TodoItem(getRandomInt(maxSeed), "todo 2"),
            new TodoItem(getRandomInt(maxSeed), "todo 3"),
            new TodoItem(getRandomInt(maxSeed), "todo 4")
        ];
        return tds;
    }

    function generateTodo(todoText) {
        return new TodoItem(getRandomInt(maxSeed), todoText);
    }

    // cache DOM
    function cacheDom() {
        // using jQuery
        DOM.$todoContainer = $(".todo-container");
        DOM.$input = DOM.$todoContainer.find('#input-text');
        DOM.$todoItemsContainer = DOM.$todoContainer.find("#todo-items-container");
        DOM.$todoItemTemplate = DOM.$todoContainer.find("#todoItemTemplate");
        DOM.$actions = $("#actions");
        DOM.$deleteAll = DOM.$actions.find("#delete-all");
        DOM.$deleteCompleted = DOM.$actions.find("#delete-all-completed");
        DOM.$showHideCompleted = DOM.$actions.find("#show-hide-completed");
        DOM.$counts = $("#command-bar").find("#counts");
    }

    // bind events
    function bindEvents() {
        DOM.$todoItemsContainer.on("click", handleListItemClicked);
        DOM.$input.on("keyup", handleInputTextBoxKeyUp);
        DOM.$deleteAll.on("click", handleDeleteAll);
        DOM.$deleteCompleted.on("click", handledeleteAllCompleted);
        DOM.$showHideCompleted.on("click", handleShowHideCompleted);
    }

    // render
    function render() {

        // handlebars version
        createHtml(todoItems);

        // update counts
        let counts = getCounts();
        updateCounts(counts);

        // always save after rendering
        storage.save(storageKey, todoItems);
    }

    function createHtml(todoItemsToRender) {

        let rawTemplate = DOM.$todoItemTemplate.html();
        let compiledTemplate = Handlebars.compile(rawTemplate);
        let generatedHtml = compiledTemplate(todoItemsToRender);
        let todoItemsCont = document.getElementById("todo-items-container");
        todoItemsCont.innerHTML = generatedHtml;
    }

    function getCounts() {
        let completed = 0;
        let notCompleted = 0;

        for (let i = 0; i < todoItems.length; i++) {
            const tdi = todoItems[i];
            if (tdi.isCompleted) {
                completed++;
            } else {
                notCompleted++;
            }
        }
        return {
            completed: completed,
            notComplete: notCompleted,
            total: todoItems.length
        };
    }

    function updateCounts(counts) {
        updateHtmlOfElement(DOM.$counts, "");
        let str = "Total: " + counts.total + "\tCompleted: " + counts.completed + "\tNot Complete: " + counts.notComplete;
        updateHtmlOfElement(DOM.$counts, str);
    }

    function handleInputTextBoxKeyUp(eventArgs) {
        if (eventArgs.key.toLowerCase() === "enter" && DOM.$input.val() != "") {
            addTodoItem();
        }
    }

    function getTodoText() {
        return DOM.$input.val();
    }

    function addTodoItem() {
        let todoItemToAdd = createTodoItem(getTodoText());
        todoItems.push(todoItemToAdd);

        render();
        clearInput();
    }

    function clearInput() {
        DOM.$input.val("");
    }

    function createTodoItem(todoText) {
        return generateTodo(todoText);
    }

    function handleDeleteAll() {
        if (todoItems.length === 0) {
            return;
        }
        todoItems = [];
        render();
    }

    function updateHtmlOfElement(elementToUpdate, htmlStringToUse) {
        elementToUpdate.html(htmlStringToUse);
    }

    function handledeleteAllCompleted() {
        let itemsToKeep = [];
        for (let i = 0; i < todoItems.length; i++) {
            let tdi = todoItems[i];
            if (!tdi.isCompleted) {
                itemsToKeep.push(tdi);
            }
        }
    }

    function handleListItemClicked(eventArgs) {

        let originButton = eventArgs.target;

        if (!(originButton instanceof HTMLButtonElement)) {
            return;
        }

        let index = $(originButton).parent().index();
        if (index < 0) {
            return;
        }

        if ($(originButton).attr("class").indexOf(deleteButtonClass) > -1) {
            deleteTodoByIndex(index);

        }
        if ($(originButton).attr("class").indexOf(completeButtonClass) > -1) {
            markTodoAsCompleteByIndex(index);
        }

        render();
    }

    function deleteTodoByIndex(index) {
        todoItems.splice(index, 1);
    }

    function markTodoAsCompleteByIndex(index) {
        todoItems[index].isCompleted = true;
    }

    function handleShowHideCompleted() {
        $("div.done").toggle();
    }

    function handledeleteAllCompleted() {
        let itemsToKeep = [];
        for (let i = 0; i < todoItems.length; i++) {
            let tdi = todoItems[i];
            if (!tdi.isCompleted) {
                itemsToKeep.push(tdi);
            }
        }

        todoItems = itemsToKeep;
        render();
    }

    function init() {
        cacheDom();
        bindEvents();
        todoItems = storage.load(storageKey);
        render();
    }

    return {
        init: init
    }

}());