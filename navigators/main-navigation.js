import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";

// import screens
import SignupScreen from "../screens/signup-screen";
import SigninScreen from "../screens/signin-screen";
import ProductsScreen from "../screens/products-screen";
import FavoritesScreen from "../screens/favorites-screen";
import ProductScreen from "../screens/product-screen";
import CameraScreen from "../screens/camera-screen";
import MyAccountScreen from "../screens/my-account-screen";
import CustomTabBar from "../components/custom-tab-bar";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

// Main Tab Navigator
function MainTab() {
  return (
    <Tab.Navigator
      initialLayout={{
        // recommanded optimisation
        width: Dimensions.get("window").width,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}

// Main Navigation
export default function MainNavigation() {
  //temporary
  const signedIn = true;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!signedIn ? (
          <>
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Signin" component={SigninScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTab" component={MainTab} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="Product" component={ProductScreen} />
            <Stack.Screen name="Favorites" component={FavoritesScreen} />
            <Stack.Screen name="MyAccount" component={MyAccountScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
