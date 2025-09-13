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
  ContactFormDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

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
      question: 'How can I contact support?',
      answer:
        'You can reach our support team via the contact form on this page. We are available 24/7 to assist you with any inquiries.',
    },
    {
      question: 'What is the response time for queries?',
      answer:
        'Our team strives to respond to all queries within 24 hours. For urgent matters, please indicate the priority in your message.',
    },
    {
      question: 'Can I schedule a demo of ${projectName}?',
      answer:
        'Yes, you can request a demo by filling out the contact form. Our team will get in touch to schedule a convenient time.',
    },
    {
      question: 'How do I report a bug or issue?',
      answer:
        'Please use the contact form to report any bugs or issues. Provide as much detail as possible to help us resolve it quickly.',
    },
    {
      question: 'Is there a user guide available?',
      answer:
        "Yes, a comprehensive user guide is available upon request. Simply contact us, and we'll send you the necessary documentation.",
    },
    {
      question: 'Can I upgrade my plan through support?',
      answer:
        'Yes, our support team can assist you with upgrading your plan. Contact us with your current plan details and desired upgrade.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Contact Us - Get in Touch`}</title>
        <meta
          name='description'
          content={`Reach out to us for any inquiries, support, or feedback. Our team is here to assist you with all your needs.`}
        />
      </Head>
      <WebSiteHeader projectName={'Stock Adjustment Website'} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Stock Adjustment Website'}
          image={['Customer service representative smiling']}
          mainText={`Connect with ${projectName} Today`}
          subTitle={`We're here to help with any questions or support you need. Reach out to our team and experience exceptional service with ${projectName}.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Contact Us Now`}
        />

        <FaqSection
          projectName={'Stock Adjustment Website'}
          design={FaqDesigns.TWO_COLUMN || ''}
          faqs={faqs}
          mainText={`Common Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'Stock Adjustment Website'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on a laptop']}
          mainText={`Reach Out to ${projectName} Support `}
          subTitle={`We're available 24/7 to assist you. Send us a message and our team will respond promptly to address your needs.`}
        />
      </main>
      <WebSiteFooter projectName={'Stock Adjustment Website'} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
