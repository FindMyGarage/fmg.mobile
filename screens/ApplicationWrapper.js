import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./HomePage";
import MapScreen from "./MapScreen";
import ParkingHistory from "./ParkingHistory";
import EventSource from "react-native-sse";
import { useNavigation } from "@react-navigation/native";
import "react-native-url-polyfill/auto";

const Stack = createNativeStackNavigator();

const ApplicationWrapper = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const url = new URL("http://13.212.20.156:5100/sse");
    const es = new EventSource(url);

    es.addEventListener("open", (event) => {
      console.log("Open SSE connection.");
    });

    es.addEventListener("message", (event) => {
      const eventData = JSON.parse(event?.data);
      console.log(eventData?.test);
      if (eventData?.test === false) {
        const bookingStatus = eventData?.booking?.status;

        if (bookingStatus === "inbooking") {
          navigation.navigate("CheckedIn", {
            booking: eventData?.booking,
          });
        } else if (bookingStatus === "checkedout") {
          navigation.replace("CheckedOut", {
            booking: eventData?.booking,
          });
        }
      }
    });

    es.addEventListener("error", (event) => {
      if (event.type === "error") {
        console.error("Connection error:", event.message);
      } else if (event.type === "exception") {
        console.error("Error:", event.message, event.error);
      }
    });

    return () => {
      es.removeAllEventListeners();
      es.close();
    };
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
