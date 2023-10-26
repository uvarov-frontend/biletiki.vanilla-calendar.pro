import { getTranslator } from 'next-intl/server';

import { Locale } from '@/types';

import GitHub from './Header/GitHub';
import Language from './Header/Language';

export default async function Header({ locale }: { locale: Locale }) {
  const header = await getTranslator(locale, 'Header');
  const github = await getTranslator(locale, 'Github');

  return (
    <header className="container mx-auto py-2">
      <div className="flex items-center">
        <a className="flex items-center" href="/">
          <svg fill="white" height={20} viewBox="0 0 28 20" width={28}>
            <path d="M28 17.1c-.2 1.1-.8 2-1.9 2.4-.6.3-.9.5-1.7.5-.6 0-5.4-.1-6.1-.1-.4 0-.4 0-.4-1.1s0-1.1-.1-1.4c-.1-.2-.2-.3-.3-.4-.1-.1-.2-.1-.4-.1s-.3 0-.4.1c-.2.2-.4.5-.4.8V19c0 .9 0 .9-6.7.9s-6.7 0-7.1-.1c-.7-.3-1.3-.6-1.8-1.2-.6-.5-.8-1.2-.9-1.8 0-.4 0-1.6.1-2.9.1-1.1.2-1.5.4-1.7.2-.2.5-.9.6-1.2.4-1 .1-2.2-.5-3.3-.2-.3-.2-.3-.2-1 0-.4 0-1.4-.1-2.2C.1 3 .1 3 .2 2.7.6 1.6 1.4.7 2.5.4c.4-.1.4-.1 7.2-.1s6.8 0 6.8 1c0 1.2 0 1.5.2 1.7.2.3.7.4.9.2.4-.3.4-.4.5-1.5V.6c0-.3 0-.3.2-.3.2-.1.9-.1 2-.2 1-.1 4.2-.1 4.6-.1.8.1 1.6.5 2.1 1 .6.6.8 1.2.9 2.1.1.5 0 3.7-.1 4.1 0 .1-.1.3-.3.5-.5.7-.7 1.3-.7 2.1s.2 1.4.7 2.2c.3.4.3.5.3 1.8.2 1.7.2 3 .2 3.3zM24.3 5.8c-.2-.3-.3-.4-.7-.4h-1.3c-.9 0-.9 0-1.1.1-.3.2-.5.5-.5.7 0 .5.2.7.5.9.2.1 1.2.1 2.1 0 .7 0 .7 0 .9-.2.2-.3.3-.7.1-1.1zm-.1 3.7c-.2-.2-.2-.2-1.6-.3h-1.4c-.3.1-.7.5-.7.8 0 .1 0 .3.1.4.1.3.2.5.4.5.2.1 1.1.1 2.1 0 .7 0 .7-.1.8-.1.3-.2.4-.5.4-.8 0-.3 0-.4-.1-.5zm0 3.9c-.1-.2-.2-.3-.4-.4-.1 0-.6-.1-1.4-.1-1.3 0-1.3 0-1.5.1-.3.2-.4.5-.4.8s.1.7.4.8c.2.1 1.3.2 2.1.1.7 0 .7 0 .8-.2.2-.2.4-.5.4-.8.1-.1.1-.1 0-.3zM18 12.2c0-.6-.1-.7-.3-.9-.2-.2-.3-.2-.5-.2s-.4.1-.6.2c-.2.2-.2.4-.3 1.3-.1 1.1 0 1.5.2 1.8.2.3.6.5.9.3.4-.2.5-.5.6-1.5.1-.2.1-.7 0-1zm0-5.9c-.1-.7-.3-.9-.7-.9-.3 0-.4.1-.6.3-.2.3-.2.4-.2 1.6 0 .9 0 1.1.1 1.3.3.7 1.1.7 1.4 0 0-.3.1-1.9 0-2.3zm-9.4-1c-2.8 0-5 2.2-5 5 0 2.7 2.2 5 5 5s5-2.2 5-5c-.1-2.7-2.3-5-5-5zm3.9 5.9c-.2 1-.7 1.8-1.6 2.1-.2.1-.3.1-.6.1-.4 0-.4 0-.5-.1-.3-.2-.3-.5-.2-.7.1-.2.3-.3.6-.3.5 0 .9-.3 1.2-.8.1-.3.2-.7.2-.9 0-.3 0-.3.1-.5.2-.2.3-.2.5-.1.4.2.5.6.3 1.2z" />
          </svg>
          <b className="ml-2 text-xl font-medium text-white">{header('logo')}</b>
        </a>
        <menu className="ml-auto grid grid-flow-col items-center gap-[6px]">
          <li>
            <GitHub title={github('title')} url={github('url')} />
          </li>
          <li>
            <Language locale={locale} />
          </li>
        </menu>
      </div>
    </header>
  );
}
