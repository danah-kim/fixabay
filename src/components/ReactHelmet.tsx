import { Helmet } from 'react-helmet';

interface ReactHelmetProps {
  title: string;
  description: string;
  canonical?: string;
}

function ReactHelmet({ title, description, canonical = '' }: ReactHelmetProps) {
  const url = `https://sweetmilkys.github.io/fixabay$${canonical}`;
  const _title = `Fixabay / ${title}`;

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{_title}</title>
      <link rel="canonical" href={url} />
      <meta property="og:title" content={_title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ko" />
      <meta property="og:site_name" content="fixabay" />
      <meta name="twitter:title" content={_title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}

export default ReactHelmet;
