import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  parking: null,
  destination: null,
  travelTimeInformation: null,
  userProfile: null,
  garageList: null,
  completeUserProfile: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setParking: (state, action) => {
      state.parking = action.payload;
    },
    setGarageList: (state, action) => {
      state.garageList = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setCompleteUserProfile: (state, action) => {
      state.completeUserProfile = action.payload;
    },
  },
});

export const {
  setParking,
  setDestination,
  setTravelTimeInformation,
  setUserProfile,
  setGarageList,
  setCompleteUserProfile,
} = navSlice.actions;

//selectors
export const selectParkingMarker = (state) => state.nav.parking;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;
export const selectUserProfile = (state) => state.nav.userProfile;
export const selectCompleteUserProfile = (state) =>
  state.nav.completeUserProfile;
export const selectGarageList = (state) => state.nav.garageList;

export default navSlice.reducer;
