import React, { useEffect, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { useTranslations } from "next-intl";
import Link from "next/link";


const FontFamilySwitch = () => {
  const gContext = useContext(GlobalContext);
  let t = useTranslations();

  useEffect(() => {
    if (
      gContext.themeSwitcher.fontFamilyLink &&
      gContext.themeSwitcher.fontFamilyName
    ) {
      document.body.style.fontFamily = `${gContext.themeSwitcher.fontFamilyName.replace(
        ";",
        ""
      )}`;
    } else {
      document.body.style.removeProperty("font-family");
    }
  }, [gContext.themeSwitcher.fontFamilyName]);

  return (
    <div className="mb-12" style={{ fontFamily: "Circular Std, sans-serif" }}>
      <h3 className="title heading-text-7 mb-6">{t("theme_fonts")}</h3>
      <div className="header-switcher__font-switcher">
        <label htmlFor="theme" className="name mb-4 text-break fw-light">
          Google Font ({t("without")} https://fonts.googleapis.com/css2)
        </label>
        <div className="text-area-wrapper">
          <textarea
            id="theme"
            name="fonts link"
            className="border px-4 py-4"
            value={gContext.themeSwitcher.fontFamilyLink}
            placeholder="?family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            onChange={(e) =>
              gContext.setThemeSwitcher({
                ...gContext.themeSwitcher,
                fontFamilyLink: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group mb-7 input-wrapper">
          <label
            htmlFor="fontsLink"
            className="heading-text-11 fw-bold text-blackish-blue"
          >
            {/* CSS rules to specify families (Without "font-family:" ) */}
            {t("rules")}
          </label>
          <input
            id="fontsLink"
            type="text"
            className="border px-4 py-4"
            name="fonts-link"
            value={gContext.themeSwitcher.fontFamilyName}
            placeholder="'Work Sans', sans-serif"
            onChange={(e) =>
              gContext.setThemeSwitcher({
                ...gContext.themeSwitcher,
                fontFamilyName: e.target.value
                  ? e.target.value.replace(";", "")
                  : e.target.value,
              })
            }
          />
        </div>
        <Link
          target="_blank"
          className="heading-text-9 btn-link with-icon text-blue mt-auto search-link "
          href="https://fonts.google.com/"
        >
          {t("select_from")} Google Fonts{" "}
          <i className="icon icon-tail-right fw-bold"></i>
        </Link>
      </div>
    </div>
  );
};

export default FontFamilySwitch;
