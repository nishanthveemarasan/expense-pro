import { API_URL } from "../../../Helper/Helper";
import { expenseStoreAction, todoStoreAction } from "../Store";

export const initialTaskData = (data, token) => {
    return (dispatch) => {
        // console.log(data);
        dispatch(todoStoreAction.addInitialTaskData({ data, token }));
    };
};

export const addNewTask = (data, refresh, token) => {
    return async (dispatch) => {
        try {
            const request = await fetch(`${API_URL}/tasks/store`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            const response = await request.json();

            if (response.errors) {
                alert(response.message);
                return;
            }
            if (response.data) {
                // console.log(response.data);
                dispatch(
                    todoStoreAction.updateTaskData({ data: response.data })
                );
                dispatch(todoStoreAction.updatePage(refresh));
                dispatch(todoStoreAction.emptyTodoTask());
                dispatch(todoStoreAction.showModel());
            }
        } catch (error) {
            // console.log(error.message);
            alert(
                "Unknown error happened!! plese try again after page reloads!"
            );
            return;
            // window.location.reload(false);
        }
    };
};
export const updateTaskStatus = (data, token) => {
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
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(body),
                }
            );
            const response = await request.json();
            // console.log(response);
            if (!response.data) {
                alert(
                    "Unknown errosssr happened!! plese try again after page reloads!"
                );
                // window.location.reload(false);
            }
        } catch (error) {
            // console.log(error);
            alert(
                error.message ??
                    "Unknown error happenedssss!! plese try again after page reloads!"
            );
            // window.location.reload(false);
        }
    };
};

export const completeTaskStatus = (uuid, token) => {
    return async (dispatch) => {
        try {
            const request = await fetch(`${API_URL}/tasks/${uuid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
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

export const addTaskItemExistTask = (uuid, id, data, token) => {
    return async (dispatch) => {
        try {
            dispatch(todoStoreAction.addTaskItemExistTask({ uuid, id, data }));
            const request = await fetch(`${API_URL}/tasks/${uuid}/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            const response = await request.json();
            if (response.errors) {
                alert(
                    `${response.message} to create Saving! Please give the right details`
                );
                dispatch(savingStoreAction.showModel());
                return;
            }
            if (response.message) {
                alert(response.message);
                dispatch(todoStoreAction.showModel());
                return;
            }
            if (response.data) {
            }
        } catch (error) {
            alert(
                error.message ??
                    "Unknown error happened!! plese try again after page reloads!"
            );

            window.location.reload(false);
        }
    };
};

export const updateTaskItemsOrder = (data) => {
    return async (dispatch) => {
        const url = `${API_URL}/tasks/${data.uuid}/update`;
        const requestData = {
            data: data.data,
        };

        try {
            const request = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${data.token}`,
                },
                body: JSON.stringify(requestData),
            });
            const response = await request.json();
            if (response.errors) {
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: `${response.message} to create Saving! Please give the right details`,
                    })
                );
                setTimeout(() => {
                    window.location.reload(false);
                }, 500);
            }
            if (response.message) {
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: response.message,
                    })
                );
                setTimeout(() => {
                    window.location.reload(false);
                }, 500);
            }
            if (response.data) {
            }
        } catch (error) {
            dispatch(
                expenseStoreAction.onOpenErrorModal({
                    error: "Unknown error happened!! plese try again after page reloads!",
                })
            );
            setTimeout(() => {
                window.location.reload(false);
            }, 500);
        }
    };
};

export const deleteTaskItemFromTask = (data) => {
    return async (dispatch) => {
        const url = `${API_URL}/tasks/${data.pUuid}/delete/${data.cUuid}`;

        try {
            const request = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${data.token}`,
                },
            });
            const response = await request.json();
            if (response.errors) {
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: `${response.message} to create Saving! Please give the right details`,
                    })
                );
                setTimeout(() => {
                    window.location.reload(false);
                }, 500);
            }
            if (response.message) {
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: response.message,
                    })
                );
                setTimeout(() => {
                    window.location.reload(false);
                }, 500);
            }
            if (response.data) {
            }
        } catch (error) {
            dispatch(
                expenseStoreAction.onOpenErrorModal({
                    error: "Unknown error happened!! plese try again after page reloads!",
                })
            );
            setTimeout(() => {
                window.location.reload(false);
            }, 500);
        }
    };
};

export const UpdateTaskItemContent = (data) => {
    return async (dispatch) => {
        const url = `${API_URL}/tasks/${data.pUuid}/update/${data.cUuid}/content`;
        const requestData = {
            content: data.content,
        };
        try {
            const request = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${data.token}`,
                },
                body: JSON.stringify(requestData),
            });
            const response = await request.json();
            if (response.errors) {
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: `${response.message} to create Saving! Please give the right details`,
                    })
                );
                setTimeout(() => {
                    window.location.reload(false);
                }, 500);
            }
            if (response.message) {
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: response.message,
                    })
                );
                setTimeout(() => {
                    window.location.reload(false);
                }, 500);
            }
            if (response.data) {
            }
        } catch (error) {
            dispatch(
                expenseStoreAction.onOpenErrorModal({
                    error: "Unknown error happened!! plese try again after page reloads!",
                })
            );
            setTimeout(() => {
                window.location.reload(false);
            }, 500);
        }
    };
};
