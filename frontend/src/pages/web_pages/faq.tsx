import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'Stock Adjustment Website';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);

  const faqs = [
    {
      question: 'What is ${projectName} used for?',
      answer:
        '${projectName} is designed to streamline inventory management, providing real-time updates, expiry notifications, and sales tracking to enhance operational efficiency.',
    },
    {
      question: 'How do I set up expiry notifications?',
      answer:
        'You can configure expiry notifications in the settings. Simply set the alert period, and ${projectName} will notify you before products expire.',
    },
    {
      question: 'Can I customize the dashboard layout?',
      answer:
        'Yes, ${projectName} allows you to customize the dashboard layout to suit your preferences, ensuring a personalized user experience.',
    },
    {
      question: 'Is there a mobile version of ${projectName}?',
      answer:
        'Yes, ${projectName} is mobile-responsive, allowing you to manage your inventory on-the-go from any device with internet access.',
    },
    {
      question: 'How secure is my data with ${projectName}?',
      answer:
        '${projectName} employs advanced security measures, including encryption and regular backups, to ensure your data is protected at all times.',
    },
    {
      question: 'What payment methods are accepted?',
      answer:
        'We accept various payment methods, including credit cards, PayPal, and bank transfers, to provide flexibility for our users.',
    },
    {
      question: 'Can I integrate ${projectName} with other tools?',
      answer:
        'Yes, ${projectName} supports integrations with popular tools and platforms, allowing seamless data exchange and enhanced functionality.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about ${projectName}. Learn more about features, pricing, and support options.`}
        />
      </Head>
      <WebSiteHeader projectName={'Stock Adjustment Website'} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Stock Adjustment Website'}
          image={['Open book with question marks']}
          mainText={`Your Questions Answered with ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to your most pressing questions about ${projectName}. Get the information you need quickly and easily.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Explore FAQs`}
        />

        <FaqSection
          projectName={'Stock Adjustment Website'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Explore ${projectName} FAQs `}
        />
      </main>
      <WebSiteFooter projectName={'Stock Adjustment Website'} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
