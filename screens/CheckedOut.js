import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import cssVariables from "../utilities/cssVariables";
import { Icon } from "@rneui/base";
import imagePath from "../utilities/imagePath";
import Button from "../components/Button";
import { payBooking } from "../api/user";
import { useNavigation } from "@react-navigation/native";

const CheckedOut = ({ route }) => {
  const booking = route.params.booking;

  const navigation = useNavigation();

  const calculateDuration = (startTime, endTime) => {
    const durationInMilliseconds = endTime - startTime;
    const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor(
      (durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
    );
    return { hours, minutes };
  };

  // if startime and endtime exists
  const startTime = new Date(booking?.startTime);
  const endTime = new Date(booking?.endTime);

  const { hours, minutes } = calculateDuration(startTime, endTime);
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.profileImage}></View> */}
      <Icon
        type="feather"
        name="check-circle"
        color={cssVariables.green}
        size={18}
        style={styles.icon}
      ></Icon>
      <Text style={styles.checkedOutText}>Thankyou for using our Services</Text>
      <View style={styles.parkingLotImageContainer}>
        <Image
          style={styles.parkingLotImage}
          source={imagePath.parkingLotImage}
        />
      </View>

      {/* <Text  style={styles.parkingLotName}>
        SILVASA Parking Lot
      </Text>
      <Text style={styles.parkingLotAddress}>
      Sec - 17 , pl-8A/9 , Kamothe , NaviMumbai
      </Text> */}
      <Text style={styles.parkingSlotText}>Total Amount</Text>
      <Text style={styles.parkingSlotNumber}>
        Rs. {Math.round(booking?.amount * 100) / 100}
      </Text>
      <Text style={styles.totalTime}>
        {/** StartTime - Endtime into minutes */}
        {hours} hours and {minutes} minutes
      </Text>

      <Button
        buttonStyles={{
          button: styles.buttons,
          text: {
            color: cssVariables.primaryBlack,
            textAlign: "center",
            fontSize: cssVariables.textMedium,
          },
        }}
        buttonFunction={() => {
          // Call pay now api
          payBooking({ bookingId: booking?._id });
          navigation.navigate("ApplicationWrapper");
          // redirect to home page
        }}
        icon={null}
        buttonName={"Pay Now"}
      />

      <Text style={styles.copyright}>FindMyGarage OFFICIAL</Text>
    </SafeAreaView>
  );
};

export default CheckedOut;

const styles = StyleSheet.create({
  container: {
    backgroundColor: cssVariables.dark,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: cssVariables.paddingSmall,
  },
  profileImage: {
    width: 75,
    height: 75,
    backgroundColor: cssVariables.primaryWhite,
    borderRadius: 100,
    marginTop: cssVariables.marginLarge,
  },
  icon: {
    marginTop: cssVariables.marginLarge,
  },
  checkedOutText: {
    fontFamily: "Poppin-Regular",
    fontSize: cssVariables.textMedium,
    color: cssVariables.primaryWhite,
    marginTop: cssVariables.marginSmall,
  },
  parkingLotImageContainer: {
    width: "100%",
    height: 150,
    overflow: "hidden",
    borderRadius: 20,
    marginTop: cssVariables.marginLarge,
  },
  parkingLotImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  parkingLotName: {
    fontFamily: "Poppin-Regular",
    fontSize: cssVariables.textLarge,
    color: cssVariables.primaryWhite,
    marginTop: cssVariables.marginSmall,
  },
  parkingLotAddress: {
    fontFamily: "Poppin-Regular",
    fontSize: cssVariables.textSmall,
    color: cssVariables.primaryWhite,
    marginTop: cssVariables.marginXSmall,
    opacity: 0.4,
  },
  parkingSlotText: {
    fontFamily: "Poppin-Regular",
    fontSize: cssVariables.textMedium,
    color: cssVariables.primaryWhite,
    marginTop: cssVariables.marginXlarge,
  },
  parkingSlotNumber: {
    fontFamily: "Poppin-Regular",
    fontSize: cssVariables.textHeading,
    color: cssVariables.primaryWhite,
    color: cssVariables.accent,
  },
  totalTime: {
    fontFamily: "Poppin-Regular",
    fontSize: cssVariables.textXMedium,
    color: cssVariables.primaryWhite,
    opacity: 0.6,
  },
  copyright: {
    position: "absolute",
    fontFamily: "Poppin-Regular",
    fontSize: cssVariables.textXSmall,
    color: cssVariables.primaryWhite,
    color: cssVariables.primaryWhite,
    bottom: cssVariables.marginSmall,
    opacity: 0.4,
  },
  buttons: {
    width: "50%",
    backgroundColor: cssVariables.accent,
    textAlign: "center",
    padding: cssVariables.paddingSmall,
    marginTop: cssVariables.marginXlarge,
    borderRadius: 6,
  },
});
