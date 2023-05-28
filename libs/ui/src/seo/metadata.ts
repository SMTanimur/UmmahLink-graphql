import { metaKeywords } from './keywords';
import type { Metadata } from 'next';

const baseURL = 'https:fkdfsdk';

export const defaultMetadata = {
  metadataBase: new URL(baseURL),
  title: {
    default: 'UmmahLink  - Islamic Social Media Platform',
    template: '%s | Aafiyah',
  },
  description:
    'UmmahLink is a social media platform for Muslims to connect with other Muslims, share Islamic knowledge, and find Islamic resources.',
  keywords: metaKeywords.join(', '),
  creator: 'SM Tanimur Rahman',
  publisher: 'SM Tanimur Rahman',
  applicationName: 'UmmahLink ',
  viewport: 'width=device-width, initial-scale=1.0',
  colorScheme: 'light',
  category: 'Islamic Social Media Platform',
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [
    {
      name: 'SM Tanimur Rahman',
      url: 'https://smtanimur.vercel.app/',
    },
  ],
  themeColor: '#ffffff',
  appLinks: {
    web: {
      url: baseURL,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseURL,
    siteName: 'UmmahLink',
    title: 'UmmahLink - Islamic Social Media Platform',
    description:
      'UmmahLink is a social media platform for Muslims to connect with other Muslims, share Islamic knowledge, and find Islamic resources.',
    images: [
      {
        url: `${baseURL}/images/seo_image.png`,
        width: 800,
        height: 600,
        alt: 'UmmahLink - Islamic Social Media Platform',
      },
    ],
    emails: ['mushfiqurtanim@gmail.com'],
    phoneNumbers: ['+880 1648138404'],
    countryName: 'Bangladesh',
  },
  // icons: {
  //   // TODO: Add icons
  //   icon: {},
  // },
  twitter: {
    creator: '@smtanimur',
    site: '@ummahlink',
    card: 'summary_large_image',
    title: 'UmmahLink - Islamic Social Media Platform',
    description:
      'UmmahLink is a social media platform for Muslims to connect with other Muslims, share Islamic knowledge, and find Islamic resources.',
    images: [
      {
        url: `${baseURL}/images/seo_image.png`,
        width: 800,
        height: 600,
        alt: 'UmmahLink - Islamic Social Media Platform',
      },
    ],
  },
} as Metadata;