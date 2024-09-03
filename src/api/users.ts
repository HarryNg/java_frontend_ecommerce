import api from ".";

export const getUserDetails = async (userId : string) => {
    const userData = localStorage.getItem("userData");
    if(userData){
        const { token } = JSON.parse(userData);
        const response = await api.get(`/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }

    throw Error("Did not find user id");
  };