import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import cssVariables from "../utilities/cssVariables";
import imagePath from "../utilities/imagePath";
import { Icon } from "@rneui/base";
import Button from "./Button";
import { useSelector } from "react-redux";
import getDirections from "react-native-google-maps-directions";
import { selectDestination, selectParkingMarker } from "../slices/navSlice";

const GarageDetails = () => {
  const garageDetails = useSelector(selectParkingMarker);
  const destination = useSelector(selectDestination);

  const slotsAvailable = garageDetails.slots.filter(
    (slot) => slot.status === "available",
  )?.length;

  const handleGetDirections = () => {
    const data = {
      source: {
        latitude: destination.latitude,
        longitude: destination.longitude,
      },
      destination: {
        latitude: garageDetails.latitude,
        longitude: garageDetails.longitude,
      },
      params: [
        {
          key: "travelmode",
          value: "driving", // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate", // this instantly initializes navigation using the given travel mode
        },
      ],
    };

    getDirections(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.informationText}>
          No Bargaining on step parking
        </Text>
        <View style={styles.parkingLotImageContainer}>
          <Image
            style={styles.parkingLotImage}
            source={imagePath.parkingLotImage}
          />
        </View>
        <View style={styles.heading}>
          <Text style={styles.headingText}>{garageDetails?.name}</Text>
          <View style={[styles.infos]}>
            <Text style={styles.headingText}>
              Rs {garageDetails?.price} / hr
            </Text>
          </View>
        </View>
        <View style={styles.secondary}>
          <Text style={styles.secondaryText}>{garageDetails?.address}</Text>
        </View>
        <View style={styles.infosContent}>
          <View style={[styles.infos]}>
            <Icon
              type="font-awesome"
              name="car"
              color={cssVariables.accent}
              size={10}
            />
            <Text style={styles.slot}>{slotsAvailable} Slots available</Text>
          </View>
          <View style={[styles.infos]}>
            <Icon
              type="font-awesome"
              name="map-marker"
              color={cssVariables.red}
              size={14}
            />
            <Text style={styles.slot}>
              {Math.round(garageDetails?.distance * 10) / 10} km .{" "}
              {Math.round(garageDetails?.duration * 10) / 10} min away
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyles={{
            button: styles.buttons,
            text: {
              color: cssVariables.accent,
              marginLeft: 0,
            },
          }}
          buttonFunction={() => {
            handleGetDirections();
          }}
          icon={null}
          buttonName={"Take Me there"}
        />
      </View>
    </View>
  );
};

export default GarageDetails;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: cssVariables.paddingSmall,
    backgroundColor: cssVariables.dark,
  },
  topContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  informationText: {
    color: cssVariables.primaryWhite,
    opacity: 0.2,
    fontSize: cssVariables.textSmall,
  },
  parkingLotImageContainer: {
    width: "100%",
    height: 120,
    overflow: "hidden",
    borderRadius: 20,
    marginTop: cssVariables.marginMedium,
  },
  parkingLotImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  heading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginTop: cssVariables.marginMedium,
  },
  headingText: {
    fontSize: cssVariables.textMedium,
    fontFamily: "Poppin-Medium",
    color: cssVariables.primaryWhite,
    marginLeft: cssVariables.marginXSmall,
    lineHeight: 20,
  },
  secondary: {
    width: "100%",
    marginTop: cssVariables.marginSmall,
  },
  secondaryText: {
    color: cssVariables.primaryWhite,
    opacity: 0.5,
    fontSize: cssVariables.textSmall,
    marginLeft: cssVariables.marginXSmall,
  },
  infosContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginTop: cssVariables.marginSmall,
    paddingLeft: cssVariables.paddingXSmall,
  },
  infos: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  slot: {
    fontSize: cssVariables.textSmall,
    fontFamily: "Poppin-Regular",
    color: cssVariables.primaryWhite,
    marginLeft: cssVariables.marginXSmall,
  },
  buttonContainer: {
    width: "100%",
  },
  buttons: {
    width: "100%",
    marginTop: 16,
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: "Poppin-SemiBold",
    borderColor: cssVariables.accent,
    borderWidth: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
