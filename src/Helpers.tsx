import axios from "axios";
import Dog from "./Component/Dog";

// Hook to make API requests
const FetchData = async (url: string) => {
    let data:never[] = [];
    await axios
    .get(url)
    .then(res => data = res.data.message)
    .catch(err =>data = ['ERROR',err] as never[])
    return data;
}

/*Function that uses the FetchData Hook to assign values to a stateVar
 * by using the setFunction parameter
 */
export const retrieveData = async (url: string,
                                stateVar:string[],
                                setFunction:React.Dispatch<React.SetStateAction<string[]>>) => {
    return await FetchData(url)
                 .then((data) => setFunction(stateVar.concat(data)))
                 .catch(err => setFunction(['ERROR',err] as never[]))
};

/*
 * Function that splits an array of strings in subarrays by first letter
and returns the new array that contains the arrays. The array given does not change
 */
export const splitArrayToNameArrays = (arr: string[]): Array<string[]> => {
    let breeds:Array<string[]> = [];
    let sortedBreedNames = arr.sort();
    let currentLetter:string = "";
    let i=0;
    do {
        currentLetter = sortedBreedNames[i].charAt(0);
        breeds.push([ ...sortedBreedNames.filter(el => el.charAt(0) === currentLetter)]);
        i= i+ breeds[breeds.length-1].length;
    } while(i<sortedBreedNames.length);
    return breeds;   
}

/*
 * Accepts an array that contains string arrays and a number as arguments.
 * Returns the first letter that is found in the nth string array 
 */
export const findLetter = (arr:Array<string[]>,n:number) :string => {
    return arr[n-1][0].charAt(0).toUpperCase();
}

/**
 * Accepts a string[] with urls of dogs and returns an array that consists of Dog Components
 */
 export const showDogs = (urls:string[],preF:string) => {
    return urls.map( (dog,index) => 
        <Dog key={index.toString()}
             index={index.toString()}
             imgUrl={dog}
             prefix={preF}
        />
    )
}