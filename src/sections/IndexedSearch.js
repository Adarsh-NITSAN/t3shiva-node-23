"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Container, Button, Spinner } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import InputGroup from "../components/Core/InputGroup";
import DOMPurify from "dompurify";
import { useSearchParams, useRouter } from "next/navigation";
import getAPIData from "@/utils/API";

const IndexedSearch = () => {
  const [searchData, setSearchData] = useState([]);
  const [resultSearchTerm, setResultSearchTerm] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const params = useSearchParams();
  let initialSearchTerm = params.get(`search_query`);

  const [searchTerm, setSearchTerm] = useState();

  if (initialSearchTerm) {
    initialSearchTerm = initialSearchTerm.replaceAll("+", " ");
  }

  const searchResults = async () => {
    try {
      setLoading(true);

      // const { data } = await axios.get(
      //   `https://t3shiva.thebetaspace.com/search/score/desc/0/1/${initialSearchTerm}`
      // );
      const { data } = await getAPIData(
        `search/score/desc/0/1/${initialSearchTerm}`
      );
      if (
        data &&
        data.content &&
        data.content.colPos0 &&
        data.content.colPos0.length &&
        data.content.colPos0[1].content &&
        data.content.colPos0[1].content.data
      ) {
        setLoading(false);
        setResultSearchTerm(initialSearchTerm);
        setSearchData(data.content.colPos0[1].content.data.resultrows);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    searchResults();
  }, [initialSearchTerm]);

  const handleChange = (e) => setSearchTerm(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm && !searchTerm.trim()) {
      setResultSearchTerm(searchTerm);
      return;
    }
    // searchResults();
    router.push(`/search?search_query=${searchTerm}`);
  };

  const renderMarkdown = (str) => {
    const withoutRNT = str
      .replaceAll("\r", "")
      .replaceAll("\n", "")
      .replaceAll("\t", "");
    return (
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(withoutRNT) }}
        className="heading-text-9 gr-text-color-opacity"
      />
    );
  };
  return (
    <>
      <div className="pt-24 pb-20 bg-default-2 index-search">
        <Container>
          <h3 className="title text-center heading-text-3 mb-7">Search</h3>
          <form
            className="search-form index-search__form"
            onSubmit={handleSubmit}
            data-aos="fade-up"
          >
            <InputGroup
              label=""
              placeholder="Search"
              defaultValue={initialSearchTerm}
              name="indexSearch"
              type="text"
              handleChange={handleChange}
              value={searchTerm}
            />
            <Button type="submit" className="form__submit-btn">
              <BsSearch />
            </Button>
          </form>
        </Container>
      </div>
      {!loading ? (
        <div className="search-results-wrapper pt-15 pb-20">
          <Container>
            {resultSearchTerm ? (
              <h3 className="title heading-text-7 mb-14">
                {searchData.length} results for {resultSearchTerm}
              </h3>
            ) : (
              <h3 className="title heading-text-7 mb-14">
                Please search for something!
              </h3>
            )}
            <div className="search-results">
              {searchData && searchData.length ? (
                <>
                  {searchData.map((s, id) => (
                    <div
                      className="search-result-box mb-10 mb-lg-12"
                      key={s.title_text + id}
                      data-aos="fade-up"
                    >
                      {s.title_text && (
                        <h3 className="title heading-text-7 mb-5">
                          {s.title_text}
                        </h3>
                      )}
                      {s.teaser && renderMarkdown(s.teaser)}
                      <Link
                        href={`${s.url}`}
                        className="heading-text-9 btn-link with-icon mt-auto"
                      >
                        <>
                          Read More{" "}
                          <i className="icon icon-tail-right font-weight-bold"></i>
                        </>
                      </Link>
                    </div>
                  ))}
                </>
              ) : (
                ""
              )}
            </div>
          </Container>
        </div>
      ) : (
        <div className="spinner-wrapper pt-25 pb-25 d-flex align-items-center justify-content-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
    </>
  );
};

export default IndexedSearch;
