import { FunctionComponent, useEffect, useState, useRef } from "react"; //prettier-ignore
import { showDogs, retrieveData } from "../../Helpers";
import { Spin } from "antd";
import Title from "../../Common/Title";
import Text from "../../Common/Text";

/**
 * Props for Dogs appearing in the start of the website
 */
interface IDogsProps {
  urlForAPICall: string;
}

const HomePage: FunctionComponent<IDogsProps> = (props: IDogsProps) => {
  const [dogs, setDogs] = useState<string[]>([]);
  const [loadMore, setLoadMore] = useState(false);
  const loadRef = useRef(null); //prettier-ignore

  useEffect(() => {
    if (loadMore) {
      retrieveData(props.urlForAPICall, dogs, setDogs);
      setLoadMore(false);
    }
  }, [loadMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadMore) setLoadMore(true);
      },
      {
        threshold: 1
      }
    );
    if (loadRef.current) observer.observe(loadRef.current);

    return () => {
      if (loadRef.current) observer.unobserve(loadRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <article className="randomDogsPage">
      <Title name="Dog Lovers" />
      <Text
        textClass="text randomIntro"
        text={
          <>
            See as many <span className="emoji">&#128054;</span> as you want!{" "}
          </>
        }
      />
      <section id="randomDogsImgs" ref={loadRef}>
        {showDogs(dogs, "random")}
      </section>
      <div className="loadContainer">{loadMore && <Spin size="large" />}</div>
      <div ref={loadRef}></div>
    </article>
  );
};

export default HomePage;
