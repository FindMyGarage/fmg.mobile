import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import cssVariables from "../utilities/cssVariables";
import SingleGarage from "./SingleGarage";
import { useSelector } from "react-redux";
import { selectGarageList } from "../slices/navSlice";

const GarageList = () => {
  const garageList = useSelector(selectGarageList);
  // console.log("garagelist",garageList);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.informationText}>Click on markers or GarageList</Text> */}
      <View style={styles.listContainer}>
        <Text style={styles.heading}>Parkings Nearby</Text>

        {garageList?.length === 0 &&<View style={styles.noGarages}>
           <Text style={styles.noGaragesText}>No Garages available Nearby</Text></View>}

        {garageList?.length !== 0 && (
          <FlatList
            style={styles.lists}
            data={garageList}
            renderItem={({ item }) => {
              // console.log(item);
              return <SingleGarage garage={item} />;
            }}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
    </View>
  );
};

export default GarageList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: cssVariables.paddingSmall,
    backgroundColor: cssVariables.dark,
  },
  informationText: {
    color: cssVariables.primaryWhite,
    opacity: 0.2,
    fontSize: cssVariables.textSmall,
  },
  listContainer: {
    width: "100%",
    height: "100%",
    marginTop: cssVariables.marginSmall,
  },
  heading: {
    fontSize: cssVariables.textMedium,
    color: "white",
    fontFamily: "Poppin-Medium",
    letterSpacing: 0.3,
    marginBottom: cssVariables.marginSmall,
  },
  lists: {
    width: "100%",
    height: "100%",
  },
  noGarages:{
    width: "100%",
    height: "100%",
    display:"flex",
    justifyContent:"center",
    alignItems: "center",
  },
  noGaragesText : {
    color: cssVariables.primaryWhite,
    opacity: 0.5,
    fontSize: cssVariables.textSmall,
  }
});
