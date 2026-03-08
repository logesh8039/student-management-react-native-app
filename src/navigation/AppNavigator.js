import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Dashboard/HomeScreen';
import AddStudentScreen from '../screens/Students/AddStudentScreen';
import StudentDetailsScreen from '../screens/Students/StudentDetailsScreen';
import ViewStudentScreen from '../screens/Students/ViewStudentScreen';
import ViewStudentMap from '../screens/Students/ViewStudentMap';
import SelectLocationScreen from '../screens/Students/SelectLocationScreen';

const Stack = createStackNavigator();

export default function AppNavigator({ setIsLoggedIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home">
        {props => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="AddStudent" component={AddStudentScreen} />
      <Stack.Screen name="ViewStudentScreen" component={ViewStudentScreen} />
      <Stack.Screen name="MapView" component={ViewStudentMap} />
      <Stack.Screen name="StudentDetails" component={StudentDetailsScreen} />
      <Stack.Screen
        name="SelectLocationScreen"
        component={SelectLocationScreen}
      />
    </Stack.Navigator>
  );
}
