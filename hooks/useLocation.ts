import { useState, useCallback } from "react";
import * as Location from "expo-location";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "expo-router";

export default function useLocation() {
  const [location, setLocation] = useState<any>(null);

  const [address, setAddress] = useState(
    "Fetching location..."
  );

  const [errorMsg, setErrorMsg] = useState<string | null>(
    null
  );

  useFocusEffect(
    useCallback(() => {
      const fetchLocation = async () => {
        try {
          // 🔥 MANUAL LOCATION FIRST
          const savedLocation =
            await AsyncStorage.getItem(
              "manualLocation"
            );

          if (savedLocation) {
            setAddress(savedLocation);
            return;
          }

          // 🔥 GPS PERMISSION
          const { status } =
            await Location.requestForegroundPermissionsAsync();

          if (status !== "granted") {
            setErrorMsg("Permission denied");
            setAddress("Location unavailable");
            return;
          }

          // 🔥 GET GPS
          const loc =
            await Location.getCurrentPositionAsync({
              accuracy: Location.Accuracy.Highest,
            });

          setLocation(loc.coords);

          // 🔥 REVERSE GEOCODE
          const result =
            await Location.reverseGeocodeAsync({
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            });

          if (result.length > 0) {
            const place = result[0];

            const area =
              place.district ||
              place.subregion ||
              place.street ||
              place.city ||
              "Unknown area";

            const city = place.city || "";
            const region = place.region || "";

            const finalAddress = [area, city, region]
              .filter(Boolean)
              .join(", ");

            setAddress(finalAddress);
          } else {
            setAddress("Location found");
          }
        } catch (err) {
          console.log(err);

          setErrorMsg("Unable to fetch location");

          setAddress("Location unavailable");
        }
      };

      fetchLocation();
    }, [])
  );

  return {
    location,
    address,
    errorMsg,
  };
}