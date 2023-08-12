import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  parking: null,
  /*
    location:{
      latitude:
      longitude:
    }
  */
  destination: null,
  /*
    location:{
      latitude:
      longitude:
    }
  */
  travelTimeInformation: null,
  userProfile: null,
  /*
    email:
    password:
  */
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setParking: (state, action) => {
      state.parking = action.payload;
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
  },
});

export const {
  setParking,
  setDestination,
  setTravelTimeInformation,
  setUserProfile,
} = navSlice.actions;

//selectors
export const selectParkingMarker = (state) => state.nav.parking;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;
export const selectUserProfile = (state) => state.nav.userProfile;

export default navSlice.reducer;
