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
import { useSelector } from "react-redux";
import { selectUserProfile } from "../slices/navSlice";

const Stack = createNativeStackNavigator();

const ApplicationWrapper = () => {
  const navigation = useNavigation();
  const userDetail = useSelector(selectUserProfile);

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
    let bookingMode = "none";
    // possible - none, inbooking, checkedout
    const fetchData = async () => {
      try {
        const interval = setInterval(async () => {
          console.log("Calling profile api");
          let response = await getUserDetail({ userId: userDetail.id });
          // console.log(response.user);
          if (!response?.user?.bookings?.length) return;
          let latestbooking = response?.user?.bookings[0];
          console.log(latestbooking);

          if (
            latestbooking.status === "inbooking" &&
            bookingMode !== "inbooking"
          ) {
            bookingMode = "inbooking";
            navigation.navigate("CheckedIn", {
              booking: latestbooking,
            });
          } else if (
            latestbooking.status === "checkedout" &&
            bookingMode !== "checkedout"
          ) {
            bookingMode = "checkedout";
            navigation.replace("CheckedOut", {
              booking: latestbooking,
            });
          } else if (latestbooking.status === "completed") {
            bookingMode = "none";
          }
          // console.log(response);
          // const user = response.data;
          // console.log(user);
        }, 1000);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
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
