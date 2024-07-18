import axiosInstance from ".";


export const registerUser = async(payload) => {
    try{
      console.log(payload);
      const response = await axiosInstance.post('/api/users/register',payload);
      console.log(response);
      return response.data
    }
    catch(error){
      return error.response.data
    }
}

export const loginUser = async(payload) => {
    try{
      const response = await axiosInstance.post('/api/users/login',payload);
      return response.data
    }
    catch(error){
      return error.response.data
    }
}

export const getUserInfo = async() => {
  try{
    const response = await axiosInstance.post('/api/users/get-user-info')
    return response.data
  }
  catch(error){
    return error.response.data
  }
}