import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { BsSearch } from "react-icons/bs";
import { Button } from "react-bootstrap";
import InputGroup from "../Core/InputGroup";
import GlobalContext from "../../context/GlobalContext";


const SearchForm = ({ setShowSearchForm }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const gContext = useContext(GlobalContext);
  const router = useRouter();

  const handleChange = (e) => setSearchTerm(e.target.value);
  const stopPropagation = (e) => e.stopPropagation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm && !searchTerm.trim()) return;
    if (gContext.visibleOffCanvas) {
      gContext.toggleOffCanvas();
    }

    setShowSearchForm(false);
    router.push(`/search?search_query=${searchTerm}`);
  };

  return (
    <div className="search-box py-5" onClick={stopPropagation}>
      <form onSubmit={handleSubmit} className="search-form__inner">
        <InputGroup
          label="search"
          placeholder="Search"
          name="search"
          type="text"
          handleChange={handleChange}
          value={searchTerm}
          isFocused={true}
        />
        <Button type="submit" className="search-form__submit-btn">
          <span className="sr-only">submit</span>
          <BsSearch></BsSearch>
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;
