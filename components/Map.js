import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectGarageList,
  selectParkingMarker,
  setParking,
} from "../slices/navSlice";
import mapStyle from "../assets/mapStyle.json";
import imagePath from "../utilities/imagePath";
import { GOOGLE_MAPS_APIKEY } from "@env";
import MapViewDirections from "react-native-maps-directions";
import cssVariables from "../utilities/cssVariables";
import { useNavigation } from "@react-navigation/native";

const Map = () => {
  const [parkingDuration, seTparkingDuration] = useState(5.65);
  const [parkingDistance, setParkingDistance] = useState(1.2);

  const destination = useSelector(selectDestination);
  const garageDetails = useSelector(selectParkingMarker);
  const garageList = useSelector(selectGarageList);

  const mapRef = useRef(null);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      mapRef.current.fitToElements(["destination", "garagemarkers"], {
        edgePadding: { top: 50, bottom: 50, left: 50, right: 50 },
        animated: "true",
      });
    }, 500);
  }, []);

  return (
    <MapView
      ref={mapRef}
      mapType="mutedStandard"
      style={{
        width: "100%",
        height: "100%",
      }}
      initialRegion={{
        latitude: destination?.latitude,
        longitude: destination?.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      customMapStyle={mapStyle}
    >
      {garageDetails && (
        <MapViewDirections
          origin={{
            latitude: destination?.latitude,
            longitude: destination?.longitude,
          }}
          destination={{
            latitude: garageDetails?.latitude,
            longitude: garageDetails?.longitude,
          }}
          onReady={({ distance, duration }) => {
            seTparkingDuration(duration);
            setParkingDistance(distance);
          }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeColor={cssVariables.accent}
          strokeWidth={2}
        />
      )}

      {destination && (
        <Marker
          coordinate={{
            latitude: destination.latitude,
            longitude: destination.longitude,
          }}
          image={imagePath.destinationMarker}
          title="destination"
          identifier="destination"
          anchor={{
            x: 0.5,
            y: 0.5,
          }}
        />
      )}

      {garageList &&
        garageList.map((garage) => {
          const slotsAvailable = garage.slots.filter(
            (slot) => slot.status === "available",
          )?.length;

          return (
            <Marker
              key={garage._id}
              coordinate={{
                latitude: garage?.locationX,
                longitude: garage?.locationY,
              }}
              onPress={() => {
                dispatch(
                  setParking({
                    latitude: garage?.locationX,
                    longitude: garage?.locationY,
                    distance: parkingDistance,
                    duration: parkingDuration,
                    name: garage?.name,
                    address: garage?.address,
                    price: garage?.slots[0]?.chargePerHour,
                    slots: garage?.slots,
                  }),
                );
                navigation.navigate("GarageDetails", {
                  latitude: garage?.locationX,
                  longitude: garage?.locationY,
                });
              }}
              image={imagePath.garageMarker}
              title={`${garage?.name}: slot available ${slotsAvailable}`}
              identifier="garageMarkers"
              anchor={{
                x: 0.5,
                y: 0.9,
              }}
            />
          );
        })}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
