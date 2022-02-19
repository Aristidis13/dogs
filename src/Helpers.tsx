import axios from "axios";

// Hook to make API requests
const FetchData = async (url: string) => {
    let data:never[] = [];
    await axios
    .get(url)
    .then(res => data = res.data.message)
    .catch(err =>data = ['ERROR',err] as never[])
    return data;
}

//Function that uses the FetchData Hook to assign values to a stateVar
// by using the setFunction parameter
export const retrieveData = async (url: string,
                                stateVar:string[],
                                setFunction:React.Dispatch<React.SetStateAction<string[]>>) => {
    return await FetchData(url)
                 .then((data) => setFunction(stateVar.concat(data)))
                 .catch(err => setFunction(['ERROR',err] as never[]))
};