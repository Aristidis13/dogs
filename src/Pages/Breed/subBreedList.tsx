import { FunctionComponent, useCallback, useEffect, useState } from "react";
import LoadImg from "./SubBreedListImg";
import { retrieveData } from "../../Helpers";

interface SubBreedListProps {
  main: string;
  handleSubBreedSelection: Function;
}

const SubBreedList: FunctionComponent<SubBreedListProps> = ({
  main,
  handleSubBreedSelection
}: SubBreedListProps) => {
  let [subBreeds, setSubBreeds] = useState<string[]>([]);
  let [compIsMounted, setCompIsMounted] = useState<boolean>(false);
  const fetchDogs = useCallback(
    () =>
      retrieveData(
        "https://dog.ceo/api/breed/" + main + "/list",
        subBreeds,
        setSubBreeds
      ),
    [main, subBreeds]
  );

  useEffect(() => {
    if (!compIsMounted) {
      setCompIsMounted(true);
      fetchDogs();
    }
  }, [compIsMounted, fetchDogs]);

  return subBreeds.length > 0 ? (
    <>
      <h2 className="subBreeds">Sub Breeds for {main}</h2>
      {subBreeds.map((subBreed, index) => (
        <div
          key={index}
          onClick={() => {
            handleSubBreedSelection([main, subBreed]);
            fetchDogs();
          }}
        >
          <figure className={"subBreed-" + index}>
            <figcaption className="caption">{subBreed}</figcaption>
            <LoadImg
              key={"subBreed-" + index}
              name={subBreed}
              breedName={main}
            />
          </figure>
        </div>
      ))}
    </>
  ) : null;
};

export default SubBreedList;
