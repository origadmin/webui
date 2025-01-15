import React from 'react';

export type FooterProps = {
  links?: {
    key?: string;
    title: React.ReactNode;
    href: string;
    blankTarget?: boolean;
  }[];
  copyright?: string;
};

export function Footer(props?: FooterProps) {
  return (
    <footer className='border-grid border-t flex flex-col items-center justify-center px-4 py-6 md:px-8 md:py-0'>
      <div className='flex w-full flex-col items-center justify-center px-1 pb-8 pt-3 xl:flex-row'>
        <div>
          <ul className='flex flex-wrap items-center gap-3 sm:flex-nowrap md:gap-10'>
            <li>
              <a
                target='blank'
                href='#'
                className='text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400'
              >
                FAQs
              </a>
            </li>
            <li>
              <a
                target='blank'
                href='#'
                className='text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400'
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                target='blank'
                href='#'
                className='text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400'
              >
                Terms & Conditions
              </a>
            </li>
            <li>
              <a
                target='blank'
                href='#'
                className='text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400'
              >
                Refund Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='w-full text-center text-sm text-zinc-500 dark:text-zinc-400 md:text-sm'>
        ©{new Date().getFullYear()} OrigAdmin. All Rights Reserved.
      </div>
    </footer>
  );
}
