import { FunctionComponent, useEffect, useState } from "react";
import {FetchData} from '../../Helpers';
import SearchResults from "./SearchResults";

interface SearchBarProps {
    placeholder: string;
    urlForAPICall:string; // Option to make a get request
    idOfSearchBar:string;
}
 
const SearchBar: FunctionComponent<SearchBarProps> = (props: SearchBarProps) => {
    let [results, setResults] = useState<string[]>([])
    let [filteredData,setFilteredData] = useState<string[]>([]);
    useEffect(() =>{
        FetchData(props.urlForAPICall).then(data => {
            let breedNames = Object.keys(data);
            setResults(breedNames);
        });
    },[props.urlForAPICall]);
    function findBreeds(event:any,results:string[]) {
        const searchTerm = event.target.value;
        console.table(results);
        searchTerm.length > 0
        ? setFilteredData( results.filter(el => el.startsWith(searchTerm)) )
        : setFilteredData( []);
    }
    return (
        <section className={"searchContainer"}>
        <div id={props.idOfSearchBar}>
            <input onChange={(e)=>findBreeds(e,results)} className="searchBar" type="text" placeholder={props.placeholder}/>
            <SearchResults data={filteredData} />
        </div>
        </section> );
}
 
export default SearchBar;
