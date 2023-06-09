import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Game from '../screens/Game';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Registro" component={Register} options={{ headerShown: false }}/>
        <Stack.Screen name="Juego" component={Game} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}

export default function StackNavigator () {
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}