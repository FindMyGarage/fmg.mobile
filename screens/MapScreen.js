import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Map from "../components/Map";
import cssVariables from "../utilities/cssVariables";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GarageDetails from "../components/GarageDetails";
import GarageList from "../components/GarageList";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectUserProfile,
  setGarageList,
} from "../slices/navSlice";
import api from "../api/index";

const Stack = createNativeStackNavigator();

const MapScreen = () => {
  const userDetail = useSelector(selectUserProfile);
  const destination = useSelector(selectDestination);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!destination) return;
    // api call for all the garages
    const getCloseGarageList = async () => {
      try {
        const response = await api.post(
          "/garages/find",
          {
            latitude: destination.latitude,
            longitude: destination.longitude,
            limit: 0,
            radius: 10,
          },
          {
            headers: {
              "content-type": "application/json",
            },
          },
        );

        dispatch(setGarageList(response?.data?.garages));
      } catch (error) {
        console.log("error fetching garageList");
      }
    };

    getCloseGarageList();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapSection}>
        <Map />
      </View>
      <View style={styles.bottom}>
        <Stack.Navigator>
          <Stack.Screen
            name="GarageList"
            component={GarageList}
            options={{
              headerShown: false,
              animationTypeForReplace: "push",
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="GarageDetails"
            component={GarageDetails}
            options={{
              headerShown: false,
              animationTypeForReplace: "push",
              animation: "slide_from_right",
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  mapSection: {
    width: "100%",
    height: "60%",
  },
  bottom: {
    height: "45%",
    width: "100%",
    backgroundColor: cssVariables.dark,
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -12,
    },
    shadowOpacity: 1,
    shadowRadius: 16.0,
    overflow: "hidden",
    elevation: 24,
  },
});
