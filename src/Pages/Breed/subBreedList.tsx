/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, useEffect, useState } from "react";
import LoadImg from "./SubBreedListImg";
import { FetchData } from "../../Helpers";
interface SubBreedListProps {
  main: string;
  handleSubBreedSelection: Function;
}

const SubBreedList: FunctionComponent<SubBreedListProps> = ({
  main,
  handleSubBreedSelection
}: SubBreedListProps) => {
  let [subBreeds, setSubBreeds] = useState<string[]>([]);

  useEffect(() => {
    FetchData("breed/" + main + "/list")
      .then(data => setSubBreeds(data))
      .catch(err => console.log(["ERROR", err]));
  }, [main]);

  return subBreeds.length > 0 ? (
    <>
      <h2 className="subBreeds">Sub Breeds for {main}</h2>
      {subBreeds.map((subBreed, index) => (
        <figure
          key={index}
          onClick={() => handleSubBreedSelection([main, subBreed])}
          className="subBreedListItem"
        >
          <figcaption className="caption">{subBreed}</figcaption>
          <LoadImg key={"subBreed-" + index} name={subBreed} breedName={main} />
        </figure>
      ))}
    </>
  ) : null;
};

export default SubBreedList;
