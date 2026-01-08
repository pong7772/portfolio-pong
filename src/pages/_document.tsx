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
          content='Visothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស, វិសុទ្ធិពង្ស) - Full-Stack Developer & EdTech Innovator from Cambodia. Led development of GEIP EdTech App and MoEYS EdTech projects serving 400,000+ students. Expert in PHP Laravel, Flutter, React Native, Next.js, and Firebase.'
        />
        <meta
          name='keywords'
          content='Visothipong, រ័ត្ន សំណាងវិសុទ្ធិពង្ស, វិសុទ្ធិពង្ស, Roth Samnangvisothipong, Roth Visothipong, GEIP EdTech, MoEYS EdTech, GEIP, MoEYS, Cambodia EdTech, Cambodian Developer, Full-Stack Developer, EdTech, Web Developer, Mobile Developer, PHP Laravel, Flutter, React Native, Next.js, Firebase, Portfolio, Cambodia, Phnom Penh, Belgium, Hasselt, Software Engineer, EdTech Innovator, GEIP Developer, MoEYS Developer'
        />
        <meta
          name='author'
          content='Visothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស, វិសុទ្ធិពង្ស)'
        />
        <meta name='robots' content='index, follow' />
        <meta name='language' content='English, Khmer, ភាសាខ្មែរ' />
        <meta httpEquiv='content-language' content='en, km' />
        <meta name='revisit-after' content='7 days' />
        <meta name='distribution' content='global' />
        <meta name='rating' content='general' />
        <meta name='geo.region' content='KH' />
        <meta name='geo.placename' content='Cambodia, Phnom Penh' />
        <meta name='geo.position' content='11.5564;104.9282' />
        <meta name='ICBM' content='11.5564, 104.9282' />
        <meta name='geo.region' content='BE' />
        <meta name='geo.placename' content='Belgium, Hasselt' />
        <meta name='geo.position' content='50.9306;5.3378' />
        <meta
          name='DC.title'
          content='Visothipong Portfolio - Full-Stack Developer & EdTech Innovator'
        />
        <meta
          name='DC.creator'
          content='Visothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស)'
        />
        <meta
          name='DC.subject'
          content='GEIP EdTech, MoEYS EdTech, Cambodia EdTech, Full-Stack Development'
        />
        <meta
          name='DC.coverage'
          content='Cambodia, Phnom Penh, Belgium, Hasselt'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
