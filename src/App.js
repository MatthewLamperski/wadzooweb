import './App.css';
import ConstructionView from "./Views/ConstructionView";
import { NativeBaseProvider, extendTheme } from "native-base";

const theme = extendTheme({
  fontConfig: {
    Avenir: {
      100: {
        normal: 'Avenir',
        italic: 'Avenir'
      },
      200: {
        normal: 'Avenir-Heavy',
        italic: 'Avenir-Heavy'
      },
      300: {
        normal: 'Avenir-Black',
        italic: 'Avenir-Black'
      }
    }
  },
  fonts: {
    heading: 'Avenir',
    body: 'Avenir',
    mono: 'Avenir'
  }
})

function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <ConstructionView />
    </NativeBaseProvider>
  );
}

export default App;
