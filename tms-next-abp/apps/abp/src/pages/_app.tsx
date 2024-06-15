import '../styles/globals.css';
import '../styles/main.css';
import '@tms_next_abp/ui/styles.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { I18nProvider } from 'next-localization';
import { SessionProvider } from 'next-auth/react';
import { getCookie } from 'cookies-next';
import Layout from '../components/layout/layout';
import {
    ApplicationConfigurationDto,
    OpenAPI as ApiOptions,
    AbpApplicationConfigurationService
} from '@tms_next_abp/proxy';

import { Meta, Toaster } from '@tms_next_abp/ui';
import i18n from '../utils/i18n';
import App from 'next/app';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const appConfig = pageProps.appConfig as ApplicationConfigurationDto;
    i18n.set(
        appConfig?.localization?.currentCulture?.cultureName!,
        appConfig?.localization?.values
    );
    const router = useRouter();
    const queryClient = new QueryClient();
    ApiOptions.BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
    ApiOptions.HEADERS = {
        __tenant: getCookie('__tenant') as string
    } as Record<string, string>;
    ApiOptions.TOKEN = async () => {
        try {
            const currentSession = await fetch('/api/auth/session');
            const currentSessionJson = await currentSession.json();

            return currentSessionJson.accessToken || '';
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.debug(`Error caugth: ${err.message}`);
            }
        }
    };

    return (
        <SessionProvider session={session}>
            <I18nProvider i18nInstance={i18n} locale={router.locale!}>
                <QueryClientProvider client={queryClient}>
                    <Meta />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                    <Toaster />
                </QueryClientProvider>
            </I18nProvider>
        </SessionProvider>
    );
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext);
    ApiOptions.BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
    const appConfig =
        await AbpApplicationConfigurationService.abpApplicationConfigurationGet();
    return { ...appProps, pageProps: { ...appProps.pageProps, appConfig } };
};

export default MyApp;
