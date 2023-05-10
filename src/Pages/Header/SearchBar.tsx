import { FunctionComponent, useEffect, useState } from "react";
import { FetchData } from "../../Helpers";
import { Select } from "antd";
import Breed from "../Breed/BreedPage";

interface SearchBarProps {
  placeholder: string;
  urlForAPICall: string; // Option to make a get request
  idOfSearchBar: string;
}

const SearchBar: FunctionComponent<SearchBarProps> = (
  props: SearchBarProps
) => {
  const [results, setResults] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<object[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  console.log(selectedBreed);

  useEffect(() => {
    FetchData(props.urlForAPICall).then(data => {
      let breedNames = Object.keys(data);
      setResults(breedNames);
    });
  }, [props.urlForAPICall]);
  function findBreeds(searchTerm: string, results: string[]) {
    searchTerm.length > 0
      ? setFilteredData(
          (results || [])
            .filter(el => el.startsWith(searchTerm))
            .map(el => ({ label: el, value: el }))
        )
      : setFilteredData([]);
  }
  return (
    <section className={"searchContainer"}>
      <Select
        allowClear
        onClear={() => {
          setFilteredData([]);
          setSelectedBreed(null);
        }}
        onSelect={breedName => {
          setSelectedBreed(breedName);
        }}
        // onChange={() => {
        //   setSelectedBreed(null);
        // }}
        showArrow={false}
        open={filteredData.length > 0}
        showSearch
        options={filteredData}
        placeholder="Search Breeds"
        onSearch={e => findBreeds(e, results)}
        style={{ width: 200 }}
      />
    </section>
  );
};

export default SearchBar;
