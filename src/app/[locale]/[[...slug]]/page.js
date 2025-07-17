import React from "react";
import { i18n } from "../../../../i18n-config";
import Routes from "@/utils/Routes";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import getAPIData from "@/utils/API";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
export const dynamic = "error";
const getAllData = async ({ locale, slug }) => {
  const { isEnabled } = draftMode();
  const { defaultLocale } = i18n;

  let pageData, xmlData, menuItems;
  let paramSlug;
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
  if (isEnabled) {
    // draftMode().disable();
    pageData = await getAPIData(
      `${locale === defaultLocale ? "" : `${locale}/`}${
        paramSlug ? paramSlug : ""
      }`
    );
  }

  if (paramSlug === "sitemap") {
    pageData = await getAPIData("/");
    xmlData = await getAPIData("sitemap.xml");
    menuItems = await getAPIData("?type=834");
  } else {
    pageData = await getAPIData(
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
    xmlData,
    menuItems,
  };
};

export async function generateStaticParams() {
  let paths = [];
  const { defaultLocale, locales } = i18n;
  await Promise.all(
    locales.map(async (locale) => {
      const localPaths = await Routes({
        locale,
        defaultLocale,
      });
      paths = [...paths, ...localPaths];
    })
  );
  locales.map((locale) => {
    paths = [
      ...paths,
      {
        params: { slug: [""] },
        locale,
      },
      {
        params: { slug: ["search"] },
        locale,
      },
    ];
  });

  const filteredPaths = paths.filter((path) => {
    if (path.params.slug[0] == "404") {
      return false;
    } else if (path.params.slug[0] == "sitemap") {
      return false;
    } else {
      return true;
    }
  });
  return filteredPaths;
}

export default async function Page({ params }) {
  const { pageData, xmlData, menuItems } = await getAllData(params);
  return (
    <PageWrapper
      headerConfig={{
        theme: "light",
        align: "right",
        isFluid: false,
      }}
      pageData={pageData}
      xmlData={xmlData}
      menuItems={menuItems}
    />
  );
}
