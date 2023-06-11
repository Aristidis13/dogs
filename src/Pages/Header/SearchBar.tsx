import { FunctionComponent, useEffect, useState } from "react";
import { FetchData } from "../../Helpers";
import { Select } from "antd";
interface SearchBarProps {
  urlForAPICall: string; // Option to make a get request
  handleBreedSelection: Function;
}

const SearchBar: FunctionComponent<SearchBarProps> = ({
  urlForAPICall,
  handleBreedSelection
}: SearchBarProps) => {
  const [results, setResults] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<object[]>([]);

  useEffect(() => {
    FetchData(urlForAPICall).then(breedNames =>
      setResults(Object.keys(breedNames))
    );
  }, [urlForAPICall]);

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
    <section className="searchContainer">
      <Select
        allowClear
        onClear={() => setFilteredData([])}
        onSelect={breedName => {
          handleBreedSelection([breedName]);
          setFilteredData([]);
        }}
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
