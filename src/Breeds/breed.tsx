import React,{ FunctionComponent } from 'react';
interface BreedPageProps {
    name:string,
    img:string,
    hasSubBreeds:boolean
    subBreeds: string[]
}
 
const BreedPage: FunctionComponent<BreedPageProps> = () => {
    return ( <h1>
        Breed is:
    </h1> );
}
 
export default BreedPage;