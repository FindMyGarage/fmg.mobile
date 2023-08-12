import api from "./index";

export const userLogin = ({ email, password }) => {
  let error = null;
  let response = null;
  try {
    const login = api.post(
      "/users/login",
      { email, password },
      {
        headers: {
          "content-type": "text/json",
        },
      }
    );
    console.log(login);
  } catch (e) {
    error = e;
    console.log(error);
  }
  //get something from user
};

export const userRegister = async({
  name,
  licenseId,
  address,
  email,
  phone,
  password,
}) => {
    let register;
  try {
    register = await api.post(
      "/users/register",
      {
        name: name,
        licenseId: licenseId,
        address: address,
        email: email,
        phone: phone,
        password: password,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    
  } catch (e) {
   console.log(e);
  }

  return register
  
};

export const getUserDetail = ({ userId }) => {
  //return something
};
