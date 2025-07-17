"use client";

import React, { useEffect, useState } from "react";

const GlobalContext = React.createContext();

const initThemeSwitcher = {
  sideBarVisible: false,
  primary: "#473bf0",
  fontFamilyLink: "none",
  fontFamilyName: "none",
};

const GlobalProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(null);
  const [themeDark, setThemeDark] = useState(false);
  const [menuItems, setMenuItems] = useState(null);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [videoModalURL, setVideoModalURL] = useState(null);
  const [visibleOffCanvas, setVisibleOffCanvas] = useState(false);
  const [languages, setLanguages] = useState(null);
  const [themeSwitcher, setThemeSwitcher] = useState(initThemeSwitcher);
  const [boxedLayout, setBoxedLayout] = useState(false);
  const [cookie, setCookie] = useState(null);
  const [headerLogo, setHeaderLogo] = useState(null);
  const [headerLogoDark, setHeaderLogoDark] = useState(null);
  const [footerLogo, setFooterLogo] = useState(null);
  const [footerLogoLight, setFooterLogoLight] = useState(null);
  const [header, setHeader] = useState({
    theme: "light",
    align: "right",
    isFluid: false,
    variant: "primary",
    height: null,
    button: null,
    buttonText: "Get In Touch",
  });
  const [footer, setFooter] = useState({
    theme: "dark",
    height: null,
    style: "Footer_default",
  });

  useEffect(() => {
    if (typeof window !== undefined) {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const updateWidth = () => {
    if (typeof window !== undefined) {
      setWindowWidth(window.innerWidth);
    }
  };

  const toggleTheme = () => {
    setThemeDark(!themeDark);
  };

  const toggleVideoModal = () => {
    setVideoModalVisible(!videoModalVisible);
  };

  const toggleOffCanvas = () => {
    setVisibleOffCanvas(!visibleOffCanvas);
  };

  return (
    <GlobalContext.Provider
      value={{
        windowWidth,
        themeDark,
        toggleTheme,
        videoModalVisible,
        setVideoModalURL,
        videoModalURL,
        toggleVideoModal,
        visibleOffCanvas,
        toggleOffCanvas,
        header,
        setHeader,
        headerLogo,
        setHeaderLogo,
        headerLogoDark,
        setHeaderLogoDark,
        footerLogo,
        setFooterLogo,
        footerLogoLight,
        setFooterLogoLight,
        footer,
        setFooter,
        menuItems,
        setMenuItems,
        boxedLayout,
        setBoxedLayout,
        themeSwitcher,
        setThemeSwitcher,
        languages,
        setLanguages,
        cookie,
        setCookie,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalProvider };
