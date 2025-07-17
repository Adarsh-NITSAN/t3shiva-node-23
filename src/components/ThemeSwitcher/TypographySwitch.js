import { useTranslations } from "next-intl";
import React, { Fragment } from "react";

const TypographySwitch = ({ typography, handleTypographyChange }) => {
  let t = useTranslations();
  
  return (
    <Fragment>
      <div
        className="mb-12 header-switcher__typography-switcher"
        style={{ fontFamily: "Circular Std, sans-serif" }}
      >
        <h3 className="title heading-text-7 mb-6">{t("body_typography")}</h3>
        <div className="typography-wrapper">
          <div className="mb-4">
            <label
              htmlFor="fontSize"
              className="name heading-text-9 mb-2 fw-light"
            >
              {t("font_size")}
            </label>
            <input
              id="fontSize"
              name="fontSize"
              type="number"
              value={typography.fontSize}
              className="border px-4 py-4 number-wrapper"
              onChange={handleTypographyChange}
            />
          </div>
          <div>
            <label
              htmlFor="lineHeight"
              className="name heading-text-9 mb-2 fw-light"
            >
              {t("line_height")}
            </label>
            <input
              id="lineHeight"
              name="lineHeight"
              type="number"
              value={typography.lineHeight}
              className="border px-4 py-4 number-wrapper"
              onChange={handleTypographyChange}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TypographySwitch;
