import api from ".";

export const getUserDetails = async (userId : string) => {
    const token = localStorage.getItem("token");
    if(userId){
        const response = await api.get(`/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }

    throw Error("Did not find user id");
  };