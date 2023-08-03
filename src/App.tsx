import { ChakraProvider } from '@chakra-ui/react';
import { customTheme } from './theme';

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <h1>Hello World</h1>
    </ChakraProvider>
  );
}

export default App;
