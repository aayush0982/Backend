
export const setUserEmail = (email) => {
    if (email) {
        localStorage.setItem("userEmail", email);
    }
};

export const removeUserEmail = () => {
    localStorage.removeItem("userEmail");
};