import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mainPage: "todoCategory",
    page: "work",
    taskType: "work",
    showModel: false,
    showTasks: "current",
    todoTask: {
        date: "",
        title: "",
        items: [], //uuid,name,completed:false
        completed: false,
        type: null,
    },
    data: [],
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        updatePage(state, action) {
            state.mainPage = action.payload.mainPage;
            state.page = action.payload.page;
            state.taskType = action.payload.taskType;
            state.showTasks = action.payload.showTasks;
        },
        setShowPage(state, action) {
            state.showTasks = action.payload.type;
        },
        updateTodoTitle(state, action) {
            state.todoTask.title = action.payload.title;
        },
        addItemToTask(state, action) {
            const copyArray = state.todoTask.items.slice();
            copyArray.push(action.payload.data);
            state.todoTask.items = copyArray;
        },
        removeItemFromTask(state, action) {
            const copyArray = state.todoTask.items.slice();
            copyArray.splice(action.payload.id, 1);
            state.todoTask.items = copyArray;
        },
        updateTaskData(state, action) {
            const copyArray = state.data.slice();
            copyArray.unshift(action.payload.data);
            state.data = copyArray;
        },
        updateToDoList(state, action) {
            const copyArray = state.data.slice();
            const id = action.payload.id;
            const parentId = action.payload.parentId;

            copyArray[parentId] = {
                ...copyArray[parentId],
                completed: false,
            };

            copyArray[parentId].items[id] = {
                ...copyArray[parentId].items[id],
                completed: !copyArray[parentId].items[id].completed,
            };

            state.data = copyArray;
        },
        completeToDoList(state, action) {
            const copyArray = state.data.slice();
            const id = action.payload.id;
            let com = action.payload.value;
            copyArray[id] = {
                ...copyArray[id],
                completed: com,
            };

            state.data = copyArray;
        },
        emptyTodoTask(state, action) {
            state.todoTask = {
                date: "",
                title: "",
                items: [],
                completed: false,
                type: null,
            };
        },

        updateShowLabel(state, action) {
            state.showCompletedLabel = action.payload.value;
        },

        addInitialTaskData(state, action) {
            state.data = action.payload.data;
        },

        showModel(state, action) {
            state.showModel = !state.showModel;
            console.log(state.showModel);
        },
    },
});

export default todoSlice;
