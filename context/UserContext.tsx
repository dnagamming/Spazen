import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

type Booking = {
  id: string;
  salonName: string;
  serviceName: string;
  date: string;
  time: string;
};

type User = {
  name: string;
  phone: string;
  email: string;
};

type UserContextType = {
  user: User | null;

  bookings: Booking[];

  loading: boolean;

  login: (userData: User) => Promise<void>;

  logout: () => Promise<void>;

  addBooking: (booking: Booking) => void;
};

const UserContext =
  createContext<UserContextType | null>(null);

export const UserProvider = ({
  children,
}: any) => {
  const [user, setUser] =
    useState<User | null>(null);

  const [bookings, setBookings] = useState<
    Booking[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  // 🔥 CHECK SAVED SESSION
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser =
          await AsyncStorage.getItem("user");

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // 🔥 LOGIN
  const login = async (userData: User) => {
    setUser(userData);

    await AsyncStorage.setItem(
      "user",
      JSON.stringify(userData)
    );
  };

  // 🔥 LOGOUT
  const logout = async () => {
    setUser(null);

    await AsyncStorage.removeItem("user");
  };

  // 🔥 BOOKINGS
  const addBooking = (booking: Booking) => {
    setBookings((prev) => [
      booking,
      ...prev,
    ]);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        bookings,
        loading,
        login,
        logout,
        addBooking,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUser must be used inside UserProvider"
    );
  }

  return context;
};