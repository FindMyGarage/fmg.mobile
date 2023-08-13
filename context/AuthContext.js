import React, { createContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../slices/navSlice";
import { userLogin, userRegister } from "../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/index";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(null);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log("user not saved", e);
    }
  };

  const loginUser = async ({ email, password }) => {
    try {
      const register = await api.post(
        "/users/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        },
      );

      const userLoginDetail = register?.data?.user;

      dispatch(
        setUserProfile({
          email: userLoginDetail?.email,
          Password: userLoginDetail?.password,
          id: userLoginDetail?._id,
          name: userLoginDetail?.name,
          token: register?.data?.auth_token,
        }),
      );
      console.log("login succesful");
      navigation.navigate("ApplicationWrapper");
      setLogin("userLoggedIn");
    } catch (error) {
      console.log("error occured", error);
    }
  };

  const registerUser = async ({
    name,
    licenseId,
    address,
    email,
    phone,
    password,
  }) => {
    try {
      const register = await api.post(
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
        },
      );

      const userLoginDetail = register?.data?.user;

      dispatch(
        setUserProfile({
          email: userLoginDetail?.email,
          Password: userLoginDetail?.password,
          id: userLoginDetail?._id,
          name: userLoginDetail?.name,
          token: register?.data?.auth_token,
        }),
      );
      navigation.navigate("ApplicationWrapper");
      setLogin("userLoggedIn");

      console.log(register?.data);
    } catch (error) {
      console.log("error occured", error);
    }
  };

  const isUserLoggedIn = async () => {
    try {
      const value = await AsyncStorage.getItem("my-key");
      // check weather the user has done the payment or not
      if (value !== null) {
        dispatch(setUserProfile(value));
      }
    } catch (e) {
      console.log("some error accessing async storage", e);
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loginUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};
