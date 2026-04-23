import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function useLocation() {
  const [location, setLocation] = useState<any>(null);
  const [address, setAddress] = useState<string>("Fetching location...");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // 🔹 Ask permission
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setErrorMsg("Permission denied");
          setAddress("Location not available");
          return;
        }

        // 🔹 Get location (approximate)
        let loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        setLocation(loc.coords);

        // 🔹 Reverse Geocoding (SAFE)
        try {
          const result = await Location.reverseGeocodeAsync(loc.coords);

          if (result.length > 0) {
            const place = result[0];

            const area =
              place.district ||
              place.subregion ||
              place.city ||
              "Unknown area";

            const region = place.region || "";

            setAddress(`${area}, ${region}`);
          } else {
            setAddress("Location found");
          }
        } catch (geoError) {
          console.log("Reverse geocoding failed:", geoError);
          setAddress("Location unavailable");
        }
      } catch (err) {
        console.log("Location error:", err);
        setErrorMsg("Unable to fetch location");
        setAddress("Location unavailable");
      }
    })();
  }, []);

  return { location, address, errorMsg };
}