import axios from "axios";
import Dog from "./Common/Dog";

/**
 *  Promise that makes API requests,
 *  Returns string[]
 */
export const FetchData = async (url: string) => {
  let data: string[] = [];
  await axios
    .get(url)
    .then(res => (data = res.data.message))
    .catch(err => (data = ["ERROR", err]));
  return data;
};

/* Uses the FetchData Hook to assign values to stateVar
 * by using the setFunction parameter
 */
export const retrieveData = async (
  url: string,
  stateVar: string[],
  setFunction: React.Dispatch<React.SetStateAction<string[]>>
) => {
  return await FetchData(url)
    .then(data => setFunction(stateVar.concat(data)))
    .catch(err => setFunction(["ERROR", err]));
};

/**
 *  Hook to make API requests
 *  Returns string
 */
export const FetchString = async (url: string) => {
  let data: string = "";
  await axios
    .get(url)
    .then(res => (data = res.data.message))
    .catch(err => (data = "ERROR" + err));
  return data;
};

export const createUrl = (
  url: string = "",
  breed: string | undefined = undefined,
  subBreed: string | undefined = undefined
): string => {
  return breed && subBreed
    ? url + "/" + breed + "/" + subBreed
    : breed
    ? url + "/" + breed
    : url;
};

/* Uses the FetchString Hook to assign values to a state variable
 * by using the setFunction parameter
 */
export const retrieveString = async (
  url: string,
  setFunction: React.Dispatch<React.SetStateAction<string>>
) => {
  return await FetchString(url)
    .then(data => setFunction(data))
    .catch(err => setFunction("ERROR" + err));
};

/*
 * Takes a string[] as a parameter
 * Splits the array in subarrays by first letter and stores the array in an array
 * Returns the array that contains the string arrays.
 */
export const splitArrayToNameArrays = (arr: string[]): Array<string[]> => {
  let breedsByLetter: Array<string[]> = [];
  let sortedBreedNames = arr.sort();
  let currentLetter: string = "";
  let i = 0;
  do {
    currentLetter = sortedBreedNames[i].charAt(0);
    breedsByLetter.push([
      ...sortedBreedNames.filter((el: string) => el[0] === currentLetter)
    ]);
    i = i + breedsByLetter[breedsByLetter.length - 1].length;
  } while (i < sortedBreedNames.length);
  return breedsByLetter;
};

/*
 * Accepts an array that contains string arrays and a number as arguments.
 * Returns the first letter that is found in the nth string array
 */
export const findLetter = (arr: Array<string[]>, n: number): string => {
  return arr[n - 1][0].charAt(0).toUpperCase();
};

/**
 * Accepts a string[] with urls of dogs
 * Returns an array that consists of Dog Components
 */
export const showDogs = (urls: string[], preF: string) =>
  urls.map((dog, index) => (
    <Dog
      key={index.toString()}
      index={index.toString()}
      imgUrl={dog}
      prefix={preF}
      urls={urls}
    />
  ));
