import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

// Need AuthContext
import { useAuth } from "../auth-flow/auth-contexts";

// Custom tab bar
import CustomTabBar from "../components/custom-tab-bar";

// Screens
import SignupScreen from "../screens/signup-screen";
import SigninScreen from "../screens/signin-screen";
import ProductsScreen from "../screens/products-screen";
import FavoritesScreen from "../screens/favorites-screen";
import ProductScreen from "../screens/product-screen";
import CameraScreen from "../screens/camera-screen";
import MyAccountScreen from "../screens/my-account-screen";
import SplashScreen from "../screens/splash-screen";
import Favorite from "../components/favorite";

// Style global
import { COLORS } from "../styles/global";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

/*
Navigation structure:
StackNav:
(
- signin
- signup
)
or (
- TabNav (MainTab):
  - Products
  - Favorites
- Camera
- Product
- MyAccount
) 
*/

// Main Tab Navigator
// Is a child / screen of mainnav
function MainTab() {
  return (
    <Tab.Navigator
      initialLayout={{
        // recommended optimisation
        width: Dimensions.get("window").width,
      }}
      screenOptions={{
        // debug:
        //tabBarStyle: { backgroundColor: "blue" },
        tabBarStyle: { backgroundColor: "transparent" },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "lightgrey",
        tabBarIndicatorStyle: { backgroundColor: "white" },
        tabBarShowLabel: false,
        tabBarItemStyle: { width: 70 },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return <FontAwesome5 name="carrot" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return <MaterialIcons name="favorite" size={24} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

// Main Navigation
export default function MainNavigation() {
  // Get AuthContext
  const auth = useAuth();
  // console.log(auth);

  // Get rid of that situation where we haven't checked SecuredStore yet
  if (auth.isLoading) {
    return <SplashScreen />;
  }

  // We're on
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.green },
          // headerTitleStyle: { color: "white" },
          headerTintColor: "white",
          // TODO: BETTER WAY?
          headerTitle: "",
          // TODO: NOT WORKING IN PRODUCTS :/
          headerBackTitleVisible: false,
        }}
      >
        {!auth.userToken ? (
          // Overwrite to experiment variation
          <Stack.Group
            screenOptions={{
              headerStyle: { backgroundColor: "white" },
              headerTintColor: "black",
              headerTitleStyle: { color: "black" },
            }}
          >
            <Stack.Screen
              name="Signin"
              component={SigninScreen}
              options={{
                // TODO: title option doesn't work... because of parent navigator setup?
                headerTitle: "Se connecter",
              }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ headerTitle: "S'inscrire" }}
            />
          </Stack.Group>
        ) : (
          <>
            <Stack.Screen
              name="MainTab"
              component={MainTab}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen
              name="Product"
              component={ProductScreen}
              options={({ route }) => ({
                // Fav could useRoute()
                // But this would make the component unusable in lists and so on...
                headerRight: () => <Favorite id={route.params.id} />,
              })}
            />
            <Stack.Screen name="Favorites" component={FavoritesScreen} />
            <Stack.Screen name="MyAccount" component={MyAccountScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
