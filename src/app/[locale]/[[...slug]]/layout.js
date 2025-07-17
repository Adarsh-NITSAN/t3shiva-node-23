import { notFound } from "next/navigation";
import React from "react";
import { i18n } from "../../../../i18n-config";
import getAPIData from "@/utils/API";
import { draftMode } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { GlobalProvider } from "@/context/GlobalContext";
import { unstable_setRequestLocale } from "next-intl/server";
import Layout from "@/components/Layout";
import localFont from "next/font/local";
const { locales, defaultLocale } = i18n;
// import "../../../assets/fonts/icon-font/css/style.css";

import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/aos/dist/aos.css";
import "../../../../node_modules/react-lazy-load-image-component/src/effects/blur.css";

// import "../../../scss/bootstrap.scss";
// import "../../../scss/main.scss";
import "../../../scss/main.scss";
import Maintenance from "@/components/Maintenance";
export const dynamic = "error";

const circular_std = localFont({
  src: [
    {
      path: "../../../assets/fonts/typography-font/CircularStd-Medium.woff2",
      weight: "500",
      style: "normal",
      display: "swap",
      preload: false,
    },
    {
      path: "../../../assets/fonts/typography-font/CircularStd-Book.woff2",
      weight: "400",
      style: "normal",
      display: "swap",
      preload: false,
    },
    {
      path: "../../../assets/fonts/typography-font/CircularStd-BookItalic.woff2",
      weight: "400",
      style: "normal",
      display: "swap",
      preload: false,
    },
    {
      path: "../../../assets/fonts/typography-font/CircularStd-BoldItalic.woff2",
      weight: "700",
      style: "normal",
      display: "swap",
      preload: false,
    },
    {
      path: "../../../assets/fonts/typography-font/CircularStd-Bold.woff2",
      weight: "700",
      style: "normal",
      display: "swap",
      preload: false,
    },
  ],
  fallback: ["Circular Std"],
  variable: "--circular-std",
  display: "swap",
  preload: false,
});

export const generateMetadata = async ({ params }) => {
  const { pageData } = await getAllData(params);
  let pageTitle,
    generalTitlePrefix,
    generalTitleSufix,
    generalMetaDescription,
    generalMetaKeywords,
    favicon,
    ogImage,
    ogTitle,
    ogDescription;

  if (pageData && pageData.data) {
    pageTitle = pageData.data.meta.title;
    generalTitlePrefix =
      pageData.data.page.constants.ns_seo.seo_title_prefix.value;
    generalTitleSufix =
      pageData.data.page.constants.ns_seo.seo_title_sufix.value;
    generalMetaDescription =
      pageData.data.page.constants.ns_seo.seo_meta_description.value;
    generalMetaKeywords =
      pageData.data.page.constants.ns_seo.seo_meta_keywords.value;
    favicon = pageData.data.page.constants.ns_basetheme?.favicon?.value;
    ogImage = pageData?.data?.meta?.ogImage?.publicUrl;
    ogTitle = pageData?.data?.meta?.ogTitle;
    ogDescription = pageData?.data?.meta?.ogDescription;
  }

  return {
    title: `${generalTitlePrefix && generalTitlePrefix + " | "} ${pageTitle} ${
      generalTitleSufix && " | " + generalTitleSufix
    }`,
    description: `${generalMetaDescription && generalMetaDescription}`,
    keywords: `${generalMetaKeywords && generalMetaKeywords}`,
    icons: {
      icon: `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TYPO3_MEDIA}${favicon}`,
    },
    openGraph: {
      title: `${ogTitle && ogTitle}`,
      description: `${ogDescription && ogDescription}`,
      images: [
        {
          url: `${ogImage && ogImage}`,
          width: 800,
          height: 600,
        },
      ],
      type: "website",
    },
    manifest: "/manifest.json",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: `${generalTitlePrefix}`,
      // startUpImage: [],
    },
  };
};

export const viewport = {
  themeColor: "black",
};

const getAllData = async ({ locale, slug }) => {
  const { isEnabled } = draftMode();
  const { defaultLocale } = i18n;

  let newsData = await getAPIData(
    `${locale === defaultLocale ? "" : `${locale}/`}news/detail/${slug}`
  );

  if (!newsData.error) {
    var pageData = newsData;
  } else {
    var paramSlug;
    if (slug && slug.length > 2) {
      paramSlug = slug.toString().replaceAll(",", "/");
    } else if (slug && slug.length > 1) {
      paramSlug = slug.toString().replaceAll(",", "/");
    } else if (slug) {
      if (slug[0] === "page") {
        paramSlug = "";
      } else {
        paramSlug = slug[0];
      }
    }
    var pageData = await getAPIData(
      `${locale === defaultLocale ? "" : `${locale}/`}${
        paramSlug ? paramSlug : ""
      }`
    );
  }

  const menuItems = await getAPIData(
    `${locale === defaultLocale ? "" : `${locale}`}?type=834`
  );
  if (isEnabled) {
    // draftMode().disable();
    var pageData = await getAPIData(
      `${locale === defaultLocale ? "" : `${locale}/`}${
        paramSlug ? paramSlug : ""
      }`
    );
  }

  if (!pageData.error && pageData.data === 404) {
    notFound();
  }
  return {
    pageData,
    menuItems,
  };
};

export default async function RootLayout({ children, params }) {
  let messages;
  try {
    messages = (await import(`@/assets/localization/${params.locale}.json`))
      .default;
  } catch (error) {
    notFound();
  }

  const { pageData, menuItems } = await getAllData(params);
  unstable_setRequestLocale(params.locale);
  let maintenance = pageData?.data?.page?.constants?.ns_basetheme;
  return (
    <html lang={defaultLocale} className={`${circular_std}`}>
      <body>
        <GlobalProvider>
          <NextIntlClientProvider locale={locales} messages={messages}>
            {maintenance?.maintenance_mode?.value === "1" ? (
              <Maintenance
                headline={maintenance?.maintenance_headline?.value}
                message={maintenance?.maintenance_message?.value}
              />
            ) : (
              <Layout
                pageContext={{}}
                pageData={pageData}
                menuItems={menuItems}
              >
                {children}
              </Layout>
            )}
          </NextIntlClientProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
