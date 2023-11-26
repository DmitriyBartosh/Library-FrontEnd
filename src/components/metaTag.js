import React from "react";
import { useEffectOnce } from "react-use";
import { useStaticQuery, graphql } from "gatsby";

const MetaTag = ({ data }) => {
  const { site } = useStaticQuery(query);
  const { siteUrl } = site?.siteMetadata;
  const { title, description, slug, preview } = data;

  useEffectOnce(() => {
    const html = document.querySelector("html");

    html.setAttribute("lang", "ru");
  });

  return (
    <>
      <title>{title}</title>

      <meta name="yandex-verification" content="3c993e723f9784a0" />

      <meta name="description" content={description} />
      <meta name="image" content={`${siteUrl}${preview}`} />
      <meta
        name="keywords"
        content="Онлайн практикум, онлайн курсы, онлайн обучение, онлайн курсы, курсы графический дизайн"
      />
      <meta name="theme-color" content="#f3eee1" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${siteUrl}${slug}`} />
      <meta property="og:site_name" content={title} />
      <meta content="ru" property="og:locale" />

      <meta property="og:image" content={`${siteUrl}${preview}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={`${siteUrl}${slug}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${preview}`} />

      <script type="text/javascript" id="gtag-init" strategy="afterInteractive">
        {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(95545306, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });`}
      </script>

      <noscript>{`<div><img src="https://mc.yandex.ru/watch/95545306" style="position:absolute; left:-9999px;" alt="" /></div>`}</noscript>
    </>
  );
};

export default MetaTag;

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
