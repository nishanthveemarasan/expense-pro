export const email = (value) =>
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        value
    );
export const required = (value) => value.trim() !== "";

export const match = (password, confirm) => {
    return password.trim() == confirm.trim();
};

export const length = (config) => (value) => {
    let isValid = true;
    if (config.min) {
        isValid = isValid && value.trim().length >= config.min;
    }
    return isValid;
};
