import { Montserrat } from 'next/font/google';
import { notFound } from 'next/navigation';
import { createTranslator, NextIntlClientProvider } from 'next-intl';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { locales } from '@/locales';
import { getMessages } from '@/navigation';
import { IParams, IProps } from '@/types';

const montserrat = Montserrat({ subsets: ['cyrillic', 'latin'] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale: locale.code }));
}

export async function generateMetadata({ params: { locale } }: IProps) {
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages });

  return {
    description: t('HomePage.head.description'),
    title: t('HomePage.head.title'),
  };
}

export default async function LocaleLayout({ children, params: { locale } }: { children: React.ReactNode; params: IParams }) {
  const isValidLocale = locales.some((cur) => cur.code === locale);
  if (!isValidLocale) notFound();
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body className={`${montserrat.className} flex h-screen min-h-[500px] w-full min-w-[1240px] flex-col bg-[#1874fe] tracking-tighter text-[#0c131d]`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header locale={locale} />
          {children}
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
