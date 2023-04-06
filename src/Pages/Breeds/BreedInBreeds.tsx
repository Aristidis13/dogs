import { FunctionComponent, useEffect, useState } from "react";
import Dog from "../../Common/Dog";
import { retrieveString } from "../../Helpers";

export interface BreedProps {
  name: string;
}

const Breed: FunctionComponent<BreedProps> = (props: BreedProps) => {
  const [imgUrl, setImgUrl] = useState<string>("");
  useEffect(() => {
    retrieveString("breed/" + props.name + "/images/random", setImgUrl);
  }, [props.name]);
  return (
    <Dog
      key={props.name}
      index={props.name}
      imgUrl={imgUrl}
      prefix={"breed"}
      caption={props.name}
      alt={"Image of " + props.name}
    />
  );
};

export default Breed;
