import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./HomePage";
import MapScreen from "./MapScreen";
import ParkingHistory from "./ParkingHistory";
import EventSource from "react-native-sse";
import { useNavigation } from "@react-navigation/native";
import "react-native-url-polyfill/auto";
import { getUserDetail } from "../api/user";

const Stack = createNativeStackNavigator();

const ApplicationWrapper = () => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log("hey! there");
    // const url = new URL("http://13.212.20.156:5100/sse");
    // const es = new EventSource(url);

    // const openEventListener = (event) => {
    //   console.log("Open SSE connection.");
    // };

    // const messageEventListener = (event) => {
    //   const eventData = JSON.parse(event?.data);
    //   console.log(eventData?.test);
    //   if (eventData?.test === false) {
    //     const bookingStatus = eventData?.booking?.status;

    //     if (bookingStatus === "inbooking") {
    //       navigation.navigate("CheckedIn", {
    //         booking: eventData?.booking,
    //       });
    //     } else if (bookingStatus === "checkedout") {
    //       navigation.replace("CheckedOut", {
    //         booking: eventData?.booking,
    //       });
    //     }
    //   }
    // };

    // const errorEventListener = (event) => {
    //   if (event.type === "error") {
    //     console.error("Connection error:", event.message);
    //   } else if (event.type === "exception") {
    //     console.error("Error:", event.message, event.error);
    //   }
    // };

    // es.addEventListener("open", openEventListener);
    // es.addEventListener("message", messageEventListener);
    // es.addEventListener("error", errorEventListener);

    // return () => {
    //   es.removeEventListener("open", openEventListener);
    //   es.removeEventListener("message", messageEventListener);
    //   es.removeEventListener("error", errorEventListener);
    //   es.close();
    // };
    console.log("Calling profile api every 1 sec");
    const interval = setInterval(() => {
      console.log("Calling profile api");
      api
        .get("/profile")
        .then((response) => {
          console.log("profile api response", response);
          if (response?.data?.user) {
            dispatch(setUserProfile(response?.data?.user));
          }
        })
        .catch((error) => {
          console.log("error fetching profile");
        });
    });
}, []);


  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
          // animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="ParkingHistory"
        component={ParkingHistory}
        options={{
          headerShown: false,
          animationTypeForReplace: "pop",
          animation: "fade_from_bottom",
          animationDuration: 1,
        }}
      />
    </Stack.Navigator>
  );
};

export default ApplicationWrapper;

const styles = StyleSheet.create({});
