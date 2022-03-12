import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface SearchResultsProps {
    data:string[];
}
 
const SearchResults: FunctionComponent<SearchResultsProps> = (props: SearchResultsProps) => {
    return props.data.length > 0 
    ? ( <div className="barContainer">
            <div className="searchResults">
                {props.data.map( (breed,index)=> <Link key={index} className="searchItem" to={"breeds/"+breed}> {breed} </Link>)}
            </div>
        </div>)
    : ( <div className="barContainer">
            <div className="searchResults"> No results </div>
        </div>
    );
}
 
export default SearchResults;