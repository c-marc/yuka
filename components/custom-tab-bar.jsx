import { Pressable, View, Text, SafeAreaView } from "react-native";
import { MaterialTopTabBar } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";

export default function CustomTabBar(props) {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "red",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ width: 200 }}>
        {/* <Text>MTB?</Text> */}
        <MaterialTopTabBar
          {...props}
          style={{
            backgroundColor: "transparent",
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: "blue",
          paddingVertical: 5,
        }}
      >
        <Pressable
          style={{ backgroundColor: "green" }}
          onPress={() => props.navigation.navigate("MyAccount")}
        >
          <Text>Test</Text>
        </Pressable>
      </View>
    </View>
  );
}
