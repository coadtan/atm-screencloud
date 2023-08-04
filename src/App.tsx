import '@fontsource/chakra-petch';
import './styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from '@tanstack/router';
import { customTheme } from './theme';
import { router } from './router';
import { useEffect } from 'react';
import { initialNote } from './localStorage/atmStorage';

function App() {
  useEffect(() => {
    initialNote();
  }, []);

  return (
    <ChakraProvider theme={customTheme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
