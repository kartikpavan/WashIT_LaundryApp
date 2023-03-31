import { View } from "react-native";
import { Provider } from "react-redux";
import store from "./redux/store";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
   return (
      <View>
         <Provider store={store}>
            <HomeScreen />
         </Provider>
      </View>
   );
}
