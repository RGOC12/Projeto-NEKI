import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Welcome from "../pages/Welcome";
import Signin from "../pages/signin";

const stack = createNativeStackNavigator();
export default function Routes() {
     return(
         <stack.Navigator>
            <stack.Screen
            name = "Welcome"
            component={Welcome}
            options={{headerShown : false}}
            />
            <stack.Screen
                name = "Signin"
                component={Signin}
                options={{headerShown : false}}
            />
         </stack.Navigator>
     )
 }