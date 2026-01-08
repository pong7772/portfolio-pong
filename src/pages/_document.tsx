import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en' translate='no'>
      <Head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon/favicon-16x16.png'
        />
        <link rel='manifest' href='/favicon/site.webmanifest' />
        <link
          rel='mask-icon'
          href='/favicon/safari-pinned-tab.svg'
          color='#121212'
        />
        <meta name='theme-color' content='#121212' />
        <meta
          name='description'
          content='Roth Samnangvisothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស) - Full-Stack Developer & EdTech Innovator. Led development of GEIP EdTech App serving 400,000+ students. Expert in PHP Laravel, Flutter, React Native, Next.js, and Firebase.'
        />
        <meta
          name='keywords'
          content='Roth Samnangvisothipong, រ័ត្ន សំណាងវិសុទ្ធិពង្ស, Roth Visothipong, Visothipong, Full-Stack Developer, EdTech, Web Developer, Mobile Developer, PHP Laravel, Flutter, React Native, Next.js, Firebase, Portfolio, Cambodia, Belgium, Software Engineer, Cambodian Developer, EdTech Innovator'
        />
        <meta
          name='author'
          content='Roth Samnangvisothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស)'
        />
        <meta name='robots' content='index, follow' />
        <meta name='language' content='English, Khmer' />
        <meta httpEquiv='content-language' content='en, km' />
        <meta name='revisit-after' content='7 days' />
        <meta name='distribution' content='global' />
        <meta name='rating' content='general' />
        <meta name='geo.region' content='BE' />
        <meta name='geo.placename' content='Hasselt, Belgium' />
        <meta name='geo.region' content='KH' />
        <meta name='geo.placename' content='Cambodia' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
