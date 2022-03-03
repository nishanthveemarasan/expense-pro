import { API_URL } from "../../../Helper/Helper";
import { todoStoreAction } from "../Store";

export const initialTaskData = (data) => {
    return (dispatch) => {
        dispatch(todoStoreAction.addInitialTaskData({ data }));
    };
};

export const addNewTask = (data, refresh) => {
    return async (dispatch) => {
        try {
            const request = await fetch(`${API_URL}/tasks/store`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(data),
            });
            const response = await request.json();

            if (response.errors) {
                alert(response.message);
                return;
            }
            if (response.data) {
                dispatch(
                    todoStoreAction.updateTaskData({ data: response.data })
                );
                dispatch(todoStoreAction.updatePage(refresh));
                dispatch(todoStoreAction.emptyTodoTask());
            }
        } catch (error) {
            alert(
                "Unknown error happened!! plese try again after page reloads!"
            );
            window.location.reload(false);
        }
    };
};
export const updateTaskStatus = (data) => {
    return async (dispatch) => {
        const body = {
            completed: data.completed,
        };

        try {
            const request = await fetch(
                `${API_URL}/tasks/${data.parentUuid}/item/${data.childUuid}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );
            const response = await request.json();

            if (!response.data) {
                alert(
                    "Unknown error happened!! plese try again after page reloads!"
                );
                window.location.reload(false);
            }
        } catch (error) {
            alert(
                "Unknown error happened!! plese try again after page reloads!"
            );
            window.location.reload(false);
        }
    };
};

export const completeTaskStatus = (uuid) => {
    return async (dispatch) => {
        try {
            const request = await fetch(`${API_URL}/tasks/${uuid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            const response = await request.json();

            if (!response.data) {
                alert(
                    "Unknown error happened!! plese try again after page reloads!"
                );
                window.location.reload(false);
            }
        } catch (error) {
            alert(
                "Unknown error happened!! plese try again after page reloads!"
            );
            window.location.reload(false);
        }
    };
};
