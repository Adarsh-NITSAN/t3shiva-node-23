import { i18n } from "../../i18n-config";
import getAPIData from "@/utils/API";

const getRoutes = (menuData) => {
  let mainMenu = [];

  const mainNavMenu = menuData?.data?.navigation[0]?.children.map((article) => {
    return {
      params: {
        link: article.link,
      },
    };
  });

  let menuChildren = [];
  let subMenuChildren = [];

  menuData?.data?.navigation[0]?.children.map((menus) => {
    if (!menus.children || !menus.children.length) {
      return;
    }
    let spreadMenuChildren = menus.children.map((child) => {
      let tempSubMenuChildren = [];
      if (child.children && child.children.length) {
        tempSubMenuChildren = child.children.map((subChildren) => {
          return {
            params: {
              link: subChildren.link,
            },
          };
        });
      }
      subMenuChildren = [...subMenuChildren, ...tempSubMenuChildren];
      return {
        params: {
          link: child.link,
        },
      };
    });
    menuChildren = [...menuChildren, ...subMenuChildren, ...spreadMenuChildren];
  });

  if (
    (mainNavMenu && mainNavMenu.length) ||
    (menuChildren && menuChildren.length)
  ) {
    mainMenu = [...mainNavMenu, ...menuChildren];
    return mainMenu;
  }
};

const Routes = async ({ locale, defaultLocale }) => {
  let menuData = await getAPIData(
    `${locale === defaultLocale ? "?type=834" : locale + "?type=834"}`
  );

  let pages = [];

  let getLNRoutes = [];
  getLNRoutes = getRoutes(menuData, locale, defaultLocale);

  if (getLNRoutes && getLNRoutes.length !== 0) {
    pages = [...pages, ...getLNRoutes];
  }

  let paths = pages;

  return paths;
};

export default async function Sitemap() {
  const { defaultLocale, locales } = i18n;
  let pageRoutes = [];
  await Promise.all(
    locales.map(async (locale) => {
      const localPaths = await Routes({
        locale,
        defaultLocale,
      });
      pageRoutes = [...pageRoutes, ...localPaths];
    })
  );

  const posts = pageRoutes.map(({ params }) => {
    return {
      url: `${params.link}`,
      priority: 0.5,
    };
  });
  return posts;
}
