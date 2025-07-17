import React from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import dynamic from "next/dynamic";

const Brand = dynamic(() => import("../sections/Brand"), {
  ssr: false,
});
const Contact = dynamic(() => import("../sections/Contact"), {
  ssr: false,
});
const ContactForm = dynamic(() => import("../sections/ContactForm"), {
  ssr: false,
});
const CustomTab = dynamic(() => import("../sections/CustomTab"), {
  ssr: false,
});
const CustomTable = dynamic(() => import("../components/Core/Table"), {
  ssr: false,
});
const CTA = dynamic(() => import("../sections/CTA"), {
  ssr: false,
});
const Fact = dynamic(() => import("../sections/Fact"), {
  ssr: false,
});
const FAQ = dynamic(() => import("../sections/CustomAccordion"), {
  ssr: false,
});
const Gallery = dynamic(() => import("../sections/Gallery"), {
  ssr: false,
});
const Hero = dynamic(() => import("../sections/Hero"), {
  ssr: false,
});
const HeaderOnly = dynamic(() => import("../sections/HeaderOnly"), {
  ssr: false,
});
const Image = dynamic(() => import("../components/Core/Image"), {
  ssr: false,
});
const IndexedSearch = dynamic(() => import("../sections/IndexedSearch"), {
  ssr: false,
});
const List = dynamic(() => import("../components/Core/List"), {
  ssr: false,
});
const Map = dynamic(() => import("../sections/Map"), {
  ssr: false,
});
const News = dynamic(() => import("../sections/News"), {
  ssr: false,
});
const Pricing = dynamic(() => import("../sections/Pricing"), {
  ssr: false,
});
const Process = dynamic(() => import("../sections/Process"), {
  ssr: false,
});
const Parallax = dynamic(() => import("../sections/Parallax"), {
  ssr: false,
});
const Slider = dynamic(() => import("../sections/Slider"), {
  ssr: false,
});
const Testimonials = dynamic(() => import("../sections/Testimonials"), {
  ssr: false,
});
const Text = dynamic(() => import("../sections/Text"), {
  ssr: false,
});
const TextImage = dynamic(() => import("../components/TextImages/TextImage"), {
  ssr: false,
});
const Team = dynamic(() => import("../sections/Team"), {
  ssr: false,
});
const Teaser = dynamic(() => import("../sections/Teaser"), {
  ssr: false,
});
const TextPic = dynamic(() => import("../components/Core/TextPic"), {
  ssr: false,
});
const TwoColumnText = dynamic(() => import("../sections/TwoColumnText"), {
  ssr: false,
});
const Upload = dynamic(() => import("../sections/Upload"), {
  ssr: false,
});
const Video = dynamic(() => import("../sections/Video"), {
  ssr: false,
});
const CaseStudies = dynamic(() => import("../sections/CaseStudies"), {
  ssr: false,
});
const ContentSection = dynamic(() => import("../sections/ContentSection"), {
  ssr: false,
});
const NewsDetail = dynamic(() => import("../components/News/NewsDetail"), {
  ssr: false,
});

const ContentType = ({ pageContentProps }) => {
  if (!pageContentProps) {
    return false;
  }
  return (
    <>
      {pageContentProps.data &&
        pageContentProps.data.content &&
        pageContentProps.data.content.colPos0 &&
        pageContentProps.data.content.colPos0.map((items, index) => {
          if (items) {
            let contentType = items.type;
            let contentData = findValuesObject(
              items.content,
              "pi_flexform_content"
            );
            let contentList = findValuesObject(items.content, "data");
            const marBottom = items.appearance.spaceAfter;
            const marTop = items.appearance.spaceBefore;
            return (
              <div
                className={`${
                  marBottom ? "frame-space-after-" + marBottom : ""
                } ${marTop ? "frame-space-before-" + marTop : ""}`}
                key={index}
              >
                {(() => {
                  switch (contentType) {
                    case "ns_brand":
                      return (
                        <LazyLoadComponent>
                          <Brand data={contentData[0]} />
                        </LazyLoadComponent>
                      );

                    case "bullets":
                      return <List data={items.content} />;

                    case "ns_cta":
                      return (
                        <LazyLoadComponent>
                          <CTA data={contentData[0]} />
                        </LazyLoadComponent>
                      );

                    case "ns_contact":
                      return <Contact data={contentData[0]} />;

                    case "ns_counter":
                      return <Fact type={1} data={contentData[0]} />;

                    case "form_formframework":
                      return (
                        <div className="contact-form-wrapper">
                          <ContactForm data={items.content} />
                        </div>
                      );

                    case "ns_accordion":
                      return <FAQ data={contentData[0]} />;

                    case "header":
                      return <HeaderOnly data={items.content} />;

                    case "ns_hero":
                      return (
                        <div style={{ minHeight: "75vh" }}>
                          <Hero data={contentData[0]} />
                        </div>
                      );

                    case "image":
                      return <Image data={items.content} />;

                    case "ke_search_pi2":
                      return <IndexedSearch data={contentList} />;

                    case "ns_gallery":
                      return <Gallery data={contentData[0]} />;
                    // return <GalleryFancyBox data={contentData[0]} />;

                    case "news_pi1":
                      return (
                        <LazyLoadComponent>
                          <News
                            data={contentList[0]}
                            dataHeader={items.content}
                          />
                        </LazyLoadComponent>
                      );

                    case "news_newsdetail":
                      return <NewsDetail data={contentList[0]} />;
                    case "ns_map":
                      return <Map data={contentData[0]} />;

                    case "ns_pricing":
                      return <Pricing data={contentData[0]} />;

                    case "ns_parallax":
                      return <Parallax data={contentData[0]} />;

                    case "ns_process":
                      return (
                        <LazyLoadComponent>
                          <Process data={contentData[0]} />
                        </LazyLoadComponent>
                      );

                    case "ns_slider":
                      return <Slider data={items.content} />;

                    case "ns_teasers":
                      return (
                        <LazyLoadComponent>
                          <Teaser data={contentData[0]} />
                        </LazyLoadComponent>
                      );

                    case "ns_testimonials":
                      return (
                        <LazyLoadComponent>
                          <Testimonials data={contentData[0]} />
                        </LazyLoadComponent>
                      );

                    case "text":
                    case "html":
                      return <Text data={items.content} />;

                    case "ns_textImage":
                      return <TextImage data={contentData[0]} />;

                    case "textpic":
                      return <TextPic data={items.content} />;

                    case "table":
                      return <CustomTable data={items.content} />;

                    case "ns_twocolumntext":
                      return <TwoColumnText data={contentData[0]} />;

                    case "ns_team":
                      return <Team data={contentData[0]} />;

                    case "ns_tab":
                      return <CustomTab data={contentData[0]} />;

                    case "uploads":
                      return <Upload data={items.content} />;

                    case "ns_video":
                      return (
                        <LazyLoadComponent>
                          <Video data={contentData[0]} />
                        </LazyLoadComponent>
                      );

                    case "ns_casestudies":
                      return <CaseStudies data={contentData[0]} />;

                    case "ns_contentimage":
                      return <ContentSection data={contentData[0]} />;

                    default:
                      return <></>;
                  }
                })()}
              </div>
            );
          }
        })}
    </>
  );
};

export default ContentType;

function findValuesObject(obj, key) {
  return findValuesObjectHelper(obj, key, []);
}

function findValuesObjectHelper(obj, key, list) {
  if (!obj) return list;
  if (obj instanceof Array) {
    for (var i in obj) {
      list = list.concat(findValuesObjectHelper(obj[i], key, []));
    }
    return list;
  }
  if (obj[key]) list.push(obj[key]);

  if (typeof obj == "object" && obj !== null) {
    var children = Object.keys(obj);
    if (children.length > 0) {
      for (i = 0; i < children.length; i++) {
        list = list.concat(findValuesObjectHelper(obj[children[i]], key, []));
      }
    }
  }
  return list;
}
