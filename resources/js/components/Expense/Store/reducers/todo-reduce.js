import { API_URL, WEB_URL } from "../../../Helper/Helper";
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
                dispatch(todoStoreAction.showModel());
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: `${response.message}! please give the right input values`,
                        reload: false,
                    })
                );
            }
            if (response.message) {
                dispatch(todoStoreAction.showModel());
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: `${response.message} ! We are unable to process your request please try again`,
                        reload: false,
                    })
                );
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
            dispatch(todoStoreAction.showModel());
            dispatch(
                expenseStoreAction.onOpenErrorModal({
                    error: "Unknown error happened!! plese try again after page reloads!",
                    reload: false,
                })
            );
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

            if (!response.data) {
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: `${response.message} ! We are unable to process your request please try again`,
                        reload: true,
                    })
                );
            }
        } catch (error) {
            dispatch(
                expenseStoreAction.onOpenErrorModal({
                    error: `${error.message} ! We are unable to process your request please try again`,
                    reload: true,
                })
            );
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
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: `${
                            response.message ? response.message : ""
                        } ! We are unable to process your request please try again`,
                        reload: true,
                    })
                );
            }
        } catch (error) {
            expenseStoreAction.onOpenErrorModal({
                error: `${
                    error.message ? error.message : ""
                } ! We are unable to process your request please try again`,
                reload: true,
            });
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
                dispatch(savingStoreAction.showModel());
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: `${response.message} ! Please give the right data to add`,
                        reload: false,
                    })
                );
            } else if (response.message) {
                dispatch(todoStoreAction.showModel());
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: `${response.message} ! Please try again`,
                        reload: false,
                    })
                );
            }
        } catch (error) {
            dispatch(todoStoreAction.showModel());
            expenseStoreAction.onOpenErrorModal({
                error: `${
                    error.message ? error.message : ""
                } ! We are unable to process your request please try again`,
                reload: true,
            });
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
                        error: `${response.message} ! Please give the right data to update order`,
                        reload: true,
                    })
                );
            } else if (response.message) {
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: `${response.message} ! We are unable to process your request please try again`,
                        reload: true,
                    })
                );
            }
            if (response.data) {
            }
        } catch (error) {
            expenseStoreAction.onOpenErrorModal({
                error: `${
                    error.message ? error.message : ""
                } ! We are unable to process your request please try again`,
                reload: true,
            });
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
                        error: `${response.message} ! Please give the right data to delete`,
                        reload: true,
                    })
                );
            } else if (response.message) {
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: `${response.message} ! We are unable to process your request please try again`,
                        reload: true,
                    })
                );
            }
            if (response.data) {
            }
        } catch (error) {
            expenseStoreAction.onOpenErrorModal({
                error: `${
                    error.message ? error.message : ""
                } ! We are unable to process your request please try again`,
                reload: true,
            });
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
                        error: `${response.message} ! Please give the right data to update`,
                        reload: true,
                    })
                );
            } else if (response.message) {
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: `${response.message} ! We are unable to process your request please try again`,
                        reload: true,
                    })
                );
            }
            if (response.data) {
            }
        } catch (error) {
            expenseStoreAction.onOpenErrorModal({
                error: `${
                    error.message ? error.message : ""
                } ! We are unable to process your request please try again`,
                reload: true,
            });
        }
    };
};

export const deleteTaskFromList = (data) => {
    return async (dispatch) => {
        const url = `${API_URL}/tasks/${data.uuid}/delete`;

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
                        reload: false,
                    })
                );
            }
            if (response.message) {
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: `${response.message} ! We are unable to process your request please try again`,
                        reload: true,
                    })
                );
            }
            if (response.data) {
            }
        } catch (error) {
            dispatch(
                expenseStoreAction.onOpenErrorModal({
                    error: "Unknown error happened!! plese try again after page reloads!",
                    reload: true,
                })
            );
        }
    };
};

export const getInitialTodoData = (token) => {
    return async (dispatch) => {
        try {
            const request = await fetch(`${API_URL}/tasks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const response = await request.json();
            if (response.data) {
                dispatch(initialTaskData(response.data, token));
                dispatch(expenseStoreAction.updateLoadingPage());
            } else {
                localStorage.removeItem("token");
                window.location.replace(`${WEB_URL}/auth`);
            }
        } catch (error) {
            localStorage.removeItem("token");
            window.location.replace(`${WEB_URL}/auth`);
        }
    };
};
