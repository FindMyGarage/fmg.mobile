import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import cssVariables from "../utilities/cssVariables";
import { Icon } from "@rneui/base";
import { useDispatch } from "react-redux";
import { setParking } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";

const SingleGarage = ({ garage }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const slotsAvailable = garage.slots.filter(
    (slot) => slot.status === "available"
  )?.length;

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(
          setParking({
            latitude: garage?.locationX,
            longitude: garage?.locationY,
            distance: 1.2,
            duration: 5.65,
            name: garage?.name,
            address: garage?.address,
            price: garage?.slots[0]?.chargePerHour,
            slots: garage?.slots,
          })
        );
        navigation.navigate("GarageDetails", {
          latitude: garage?.locationX,
          longitude: garage?.locationY,
        });
      }}
      style={styles.container}
    >
      <View style={styles.heading}>
        <Text style={styles.headingText}>{garage?.name.toUpperCase()}</Text>
        <View style={[styles.infos]}>
          {/* <Icon
        type="font-awesome"
        name="money"
        color="green"
        size={10}
      /> */}
          <Text style={styles.headingText}>
            Rs {garage.slots[0].chargePerHour} / hr
          </Text>
        </View>
      </View>
      <View style={styles.infos}>
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
            0.5 km . {Math.floor(Math.random() * 10 + 1)} min away
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SingleGarage;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: cssVariables.secondaryDark,
    padding: cssVariables.paddingSmall,
    marginBottom: cssVariables.marginSmall,
    borderRadius: 8,
  },
  heading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: cssVariables.marginXSmall,
  },
  headingText: {
    fontSize: cssVariables.textMedium,
    fontFamily: "Poppin-Medium",
    color: cssVariables.primaryWhite,
    marginLeft: cssVariables.marginXSmall,
    lineHeight: 20,
  },
  infos: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  slot: {
    fontSize: cssVariables.textXSmall,
    fontFamily: "Poppin-Regular",
    color: cssVariables.primaryWhite,
    marginLeft: cssVariables.marginXSmall,
  },
});
