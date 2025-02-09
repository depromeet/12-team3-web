import { PropsWithChildren, ReactElement, ReactNode, useState } from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import { domMax, LazyMotion } from 'framer-motion';
import { RecoilRoot } from 'recoil';

import 'dayjs/locale/ko';

import ErrorBoundary from '@/components/error-boundary/ErrorBoundary';
import ToastWrapper from '@/components/portal/ToastWrapper';
import FcmTokenHandler from '@/components/push-notification/FcmTokenHandler';
import RouteGuard from '@/components/route-guard/RouteGuard';
import useTrackPageView from '@/hooks/analytics/useTrackPageView';
import GlobalStyles from '@/styles/GlobalStyles';
import lightTheme from '@/styles/theme';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component: AppComponent, pageProps }: AppPropsWithLayout) => {
  const getLayout = AppComponent.getLayout ?? ((page) => page);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  useTrackPageView();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <ThemeProvider theme={lightTheme}>
            <LazyMotion features={domMax}>
              <GlobalStyles />
              <ErrorBoundary>
                <FcmTokenHandler>
                  <DefaultLayout>
                    <Head />
                    <RouteGuard>{getLayout(<AppComponent {...pageProps} />)}</RouteGuard>
                    <ToastWrapper />
                  </DefaultLayout>
                </FcmTokenHandler>
              </ErrorBoundary>
            </LazyMotion>
          </ThemeProvider>
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};

const LayoutWrapper = styled.div`
  max-width: ${({ theme }) => theme.size.maxWidth};
  width: 100%;
  min-height: 100vh;
  padding: ${({ theme }) => theme.size.layoutPadding};
  margin: 0 auto;
`;

const Head = () => {
  return (
    <NextHead>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0 viewport-fit=cover"
      />
      <title>아맞다</title>
    </NextHead>
  );
};

dayjs.extend(weekday);
dayjs.locale('ko');
