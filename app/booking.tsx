import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ScrollView,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Calendar } from "react-native-calendars";
import { useUser } from "../context/UserContext";


export default function BookingScreen() {
  const { total, count } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addBooking } = useUser();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  // 🔥 LOCAL date (fix bug)
  const getToday = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const today = getToday();

  // 🔥 Generate slots (10 → 22)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 10; hour <= 22; hour++) {
      slots.push(hour);
    }
    return slots;
  };

  // 🔥 Format time
  const formatTime = (hour: number) => {
    const suffix = hour >= 12 ? "PM" : "AM";
    const display = hour > 12 ? hour - 12 : hour;
    return `${display}:00 ${suffix}`;
  };

  // 🔥 Smart filtering
  const getAvailableSlots = () => {
    const allSlots = generateTimeSlots();

    if (!selectedDate) return [];

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    if (selectedDate !== today) return allSlots;

    return allSlots.filter((hour) => {
      if (hour > currentHour) return true;

      if (hour === currentHour) {
        return currentMinutes < 30;
      }

      return false;
    });
  };

  const availableSlots = getAvailableSlots();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Confirm Booking",
          headerStyle: { backgroundColor: "#0D0D0D" },
          headerTintColor: "#fff",
        }}
      />

      <SafeAreaView style={styles.container}>
        
        {/* 🔥 SCROLL FIX */}
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          <View style={styles.content}>
            
            {/* Summary */}
            <Text style={styles.title}>Booking Summary</Text>
            <Text style={styles.text}>Services: {count}</Text>
            <Text style={styles.text}>Total: ₹{total}</Text>

            {/* Calendar */}
            <Text style={styles.sectionTitle}>Select Date</Text>

            <Calendar
              minDate={today} // 🔥 FIXED
              onDayPress={(day) => {
                setSelectedDate(day.dateString);
                setSelectedTime(null);
              }}
              markedDates={{
                [selectedDate || ""]: {
                  selected: true,
                  selectedColor: "#E91E63",
                },
              }}
              theme={{
                backgroundColor: "#0D0D0D",
                calendarBackground: "#0D0D0D",
                dayTextColor: "#fff",
                monthTextColor: "#fff",
                arrowColor: "#E91E63",
                selectedDayBackgroundColor: "#E91E63",
              }}
            />

            {/* Time */}
            <Text style={styles.sectionTitle}>Select Time</Text>

            {selectedDate ? (
              availableSlots.length > 0 ? (
                <FlatList
                  data={availableSlots}
                  keyExtractor={(item) => item.toString()}
                  scrollEnabled={false} // 🔥 IMPORTANT (nested scroll fix)
                  renderItem={({ item }) => (
                    <Pressable
                      style={[
                        styles.option,
                        selectedTime === item && styles.selectedOption,
                      ]}
                      onPress={() => setSelectedTime(item)}
                    >
                      <Text style={styles.optionText}>
                        {formatTime(item)}
                      </Text>
                    </Pressable>
                  )}
                />
              ) : (
                <Text style={styles.infoText}>
                  No slots available today
                </Text>
              )
            ) : (
              <Text style={styles.infoText}>
                Select a date first
              </Text>
            )}
          </View>
        </ScrollView>

        {/* 🔥 FIXED BUTTON (always visible) */}
        <View style={[styles.footer, { paddingBottom: insets.bottom + 10 }]}>
          <Pressable
            style={[
              styles.confirmBtn,
              !(selectedDate && selectedTime) && styles.disabledBtn,
            ]}
            disabled={!(selectedDate && selectedTime)}
            onPress={() => {
              addBooking({
                id: Date.now().toString(),
                salonName: "Tony Salon",
                serviceName: "Hair Cut",
                date: selectedDate!,
                time: String(selectedTime),
              });

              router.replace("/success");
            }}
          >
            <Text style={styles.confirmText}>Confirm Booking</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },

  content: {
    padding: 16,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  text: {
    color: "#fff",
    marginBottom: 6,
  },

  sectionTitle: {
    color: "#E91E63",
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
  },

  option: {
    backgroundColor: "#1A1A1A",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },

  selectedOption: {
    backgroundColor: "#E91E63",
  },

  optionText: {
    color: "#fff",
    fontSize: 15,
  },

  infoText: {
    color: "#aaa",
  },

  footer: {
    paddingHorizontal: 16,
  },

  confirmBtn: {
    backgroundColor: "#E91E63",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  disabledBtn: {
    opacity: 0.5,
  },

  confirmText: {
    color: "#fff",
    fontWeight: "bold",
  },
});