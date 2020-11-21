import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native'
import {MainStack} from "./navigations/mainStack";
import {StoreProvider} from "./store/useStore";

import { LogBox } from 'react-native';
  LogBox.ignoreLogs(['Warning']);

export default function App() {
  return (
    <PaperProvider>
      <StoreProvider>
        <MainStack/>
      </StoreProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
