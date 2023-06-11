import { useState, FunctionComponent } from "react";
import ImageViewer from "react-images-viewer";

export interface DogProps {
  index: string;
  imgUrl: string;
  key: string;
  alt?: string;
  caption?: string;
  prefix: string;
  urls?: string[];
}

const Dog: FunctionComponent<DogProps> = (props: DogProps) => {
  const [imageIsClicked, setImageIsClicked] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const urls = (props.urls ?? []).map(url => ({ src: url }));

  return (
    <figure className={`dogFigure ${props.prefix}Figure-${props.index} isLink`}>
      <img
        src={props.imgUrl}
        className={"dogImage " + props.prefix + "Img" + props.index}
        alt={props.alt || "A cute dog"}
        onClick={() => {
          setCurrentImage(Number(props.index));
          setImageIsClicked(true);
        }}
      />
      <ImageViewer
        backdropCloseable
        currImg={currentImage}
        isOpen={imageIsClicked}
        imgs={urls}
        imgCountSeparator=" of "
        onClose={() => setImageIsClicked(false)}
        onClickNext={() => setCurrentImage(currentImage + 1)}
        onClickPrev={() => setCurrentImage(currentImage - 1)}
      />
      {props.caption && (
        <figcaption className={props.prefix + "Caption" + props.index}>
          {props.caption}
        </figcaption>
      )}
    </figure>
  );
};
export default Dog;
