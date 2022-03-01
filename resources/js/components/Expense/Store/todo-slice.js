import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mainPage: "todoCategory",
    page: "work",
    taskType: "work",
    showTasks: "current",
    todoTask: {
        date: "",
        title: "",
        items: [], //uuid,name,completed:false
        completed: false,
        type: null,
    },
    data: [
        {
            uuid: 1646047805811,
            date: "2022-02-28",
            title: "Sadasd",
            items: [
                {
                    uuid: 1646047805810,
                    name: "sub task 1",
                    completed: true,
                },
                {
                    uuid: 1646047805812,
                    name: "sub task 2",
                    completed: false,
                },
                {
                    uuid: 1646047805820,
                    name: "sub task 3",
                    completed: false,
                },
                {
                    uuid: 1646047805822,
                    name: "sub task 4",
                    completed: false,
                },
            ],
            completed: false,
            type: "work",
        },
        {
            uuid: 1646047805830,
            date: "2022-02-28",
            title: "This sdasd asd ada",
            items: [
                {
                    uuid: 1646047805831,
                    name: "sub task 1",
                    completed: false,
                },
                {
                    uuid: 1646047805832,
                    name: "sub task 2",
                    completed: false,
                },
            ],
            completed: false,
            type: "work",
        },
        {
            uuid: 1646047805830,
            date: "2022-02-28",
            title: "This sdasd asd ada",
            items: [
                {
                    uuid: 1646047805831,
                    name: "sub task 1",
                    completed: false,
                },
                {
                    uuid: 1646047805832,
                    name: "sub task 2",
                    completed: false,
                },
            ],
            completed: false,
            type: "personal",
        },
        {
            uuid: 1646047805814,
            date: "2022-02-28",
            title: "Sadasd",
            items: [
                {
                    uuid: 1646047805815,
                    name: "sub task 1",
                    completed: true,
                },
                {
                    uuid: 1646047805816,
                    name: "sub task 2",
                    completed: true,
                },
            ],
            completed: true,
            type: "work",
        },
    ],
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
            copyArray.push(action.payload.data);
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
            console.log(action?.payload);
            state.showCompletedLabel = action.payload.value;
            console.log("running");
        },
    },
});

export default todoSlice;
