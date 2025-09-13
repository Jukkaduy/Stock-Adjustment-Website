import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../stores/hooks';
import LayoutGuest from '../layouts/Guest';
import WebSiteHeader from '../components/WebPageComponents/Header';
import WebSiteFooter from '../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  FeaturesDesigns,
  PricingDesigns,
  FaqDesigns,
} from '../components/WebPageComponents/designs';

import HeroSection from '../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../components/WebPageComponents/FeaturesComponent';

import PricingSection from '../components/WebPageComponents/PricingComponent';

import FaqSection from '../components/WebPageComponents/FaqComponent';

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
  const pages = [
    {
      href: '/products',
      label: 'products',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },
  ];

  const features_points = [
    {
      name: 'Real-Time Inventory Updates',
      description:
        'Stay informed with instant updates on product quantities and stock levels. Ensure accuracy and prevent overstocking or shortages.',
      icon: 'mdiUpdate',
    },
    {
      name: 'Expiry Date Notifications',
      description:
        'Receive timely alerts for upcoming product expiries. Plan ahead and reduce waste by managing stock efficiently.',
      icon: 'mdiAlertCircle',
    },
    {
      name: 'Seamless Sales Tracking',
      description:
        'Monitor sales activities with ease. Gain insights into best-selling products and make informed restocking decisions.',
      icon: 'mdiChartLine',
    },
  ];

  const pricing_features = {
    standard: {
      features: ['Real-Time Inventory Updates', 'Basic Sales Tracking'],
      limited_features: ['Limited Expiry Notifications', 'Basic Support'],
    },
    premium: {
      features: [
        'Real-Time Inventory Updates',
        'Advanced Sales Tracking',
        'Expiry Notifications',
      ],
      also_included: ['Priority Support', 'Customizable Dashboards'],
    },
    business: {
      features: [
        'Comprehensive Inventory Management',
        'Full Sales Analytics',
        'Priority Expiry Alerts',
        'Dedicated Account Manager',
      ],
    },
  };

  const description = {
    standard:
      'Ideal for individuals or small businesses looking to manage their inventory with essential features and basic support.',
    premium:
      'Perfect for small startups or agencies needing advanced tracking, notifications, and priority support to enhance their operations.',
    business:
      'Designed for enterprises requiring comprehensive management, full analytics, and dedicated support for large-scale operations.',
  };

  const faqs = [
    {
      question: 'How does ${projectName} handle product expiries?',
      answer:
        "${projectName} sends timely email alerts one week before a product's expiry date, allowing you to take necessary actions to prevent waste.",
    },
    {
      question: 'Can I track sales with ${projectName}?',
      answer:
        'Yes, ${projectName} offers seamless sales tracking, providing insights into best-selling products and helping you make informed restocking decisions.',
    },
    {
      question: 'What support options are available?',
      answer:
        'Our Standard plan includes basic support, while Premium and Business plans offer priority support and a dedicated account manager, respectively.',
    },
    {
      question: 'Is there a limit to the number of products I can manage?',
      answer:
        'No, ${projectName} allows you to manage an unlimited number of products, ensuring scalability as your business grows.',
    },
    {
      question: 'How do I import products into ${projectName}?',
      answer:
        'You can import products via a CSV file. Simply upload the file, map the columns to product fields, and confirm the import.',
    },
    {
      question:
        'What is the difference between the Standard and Premium plans?',
      answer:
        'The Standard plan offers essential features with basic support, while the Premium plan includes advanced tracking, notifications, and priority support.',
    },
    {
      question: 'Can I customize the dashboard in ${projectName}?',
      answer:
        'Yes, the Premium and Business plans offer customizable dashboards, allowing you to tailor the interface to your specific needs.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Product Inventory Management`}</title>
        <meta
          name='description'
          content={`Explore our comprehensive product inventory management system, featuring real-time updates, expiry notifications, and seamless sales tracking.`}
        />
      </Head>
      <WebSiteHeader projectName={'Stock Adjustment Website'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Stock Adjustment Website'}
          image={['Organized product inventory display']}
          mainText={`Streamline Your Inventory with ${projectName}`}
          subTitle={`Effortlessly manage your products with real-time updates, expiry alerts, and seamless sales tracking. Enhance efficiency and accuracy with ${projectName}.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Get Started Now`}
        />

        <FeaturesSection
          projectName={'Stock Adjustment Website'}
          image={['Dashboard showcasing product features']}
          withBg={1}
          features={features_points}
          mainText={`Discover Key Features of ${projectName}`}
          subTitle={`Unlock the full potential of your inventory management with ${projectName}. Streamline operations and enhance productivity effortlessly.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <PricingSection
          projectName={'Stock Adjustment Website'}
          withBg={1}
          features={pricing_features}
          description={description}
        />

        <FaqSection
          projectName={'Stock Adjustment Website'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />
      </main>
      <WebSiteFooter projectName={'Stock Adjustment Website'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
