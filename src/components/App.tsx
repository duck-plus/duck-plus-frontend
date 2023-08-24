import React, { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import LoadingPage from './pages/LoadingPage';
import { HorizontalRatioBoundary } from '../hooks/useHorizontalRatio';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ga from '@/utils/ga';
import UAParser from 'ua-parser-js';

const deviceType = new UAParser(navigator.userAgent).getDevice().type;
const isNotMobile =
  deviceType !== UAParser.DEVICE.WEARABLE && deviceType !== UAParser.DEVICE.MOBILE;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const App = () => {
  const location = useLocation();

  useEffect(() => {}, []);

  useEffect(() => {
    ga.send('page_view', { path: location.pathname });
  }, [location.pathname]);

  return (
    <HorizontalRatioBoundary
      style={
        isNotMobile
          ? {
              maxWidth: '410px',
              margin: '0 auto',
            }
          : {}
      }
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<LoadingPage />}>
            <Outlet />
            <div id="ModalRoot" />
          </Suspense>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} position="top-right" />
      </QueryClientProvider>
    </HorizontalRatioBoundary>
  );
};

export default App;
