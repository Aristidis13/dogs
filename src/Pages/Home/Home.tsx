/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, useEffect, useState, useRef } from "react"; //prettier-ignore
import { showDogs, FetchData } from "../../Helpers";
import { Spin } from "antd";
/**
 * Props for Dogs appearing in the start of the website
 */
interface IDogsProps {
  urlForAPICall: string;
}

const HomePage: FunctionComponent<IDogsProps> = ({
  urlForAPICall
}: IDogsProps) => {
  const [dogs, setDogs] = useState<string[]>([]);
  const [loadMore, setLoadMore] = useState(false);
  const loadRef = useRef(null);

  //Initial fill
  useEffect(() => {
    FetchData(urlForAPICall)
      .then(data => setDogs(dogs.concat(data)))
      .catch(err => setDogs(["ERROR", err]));
  }, []);

  //Fill every time user scrolls to the end
  useEffect(() => {
    if (loadMore) {
      FetchData(urlForAPICall)
        .then(data => setDogs(dogs.concat(data)))
        .catch(err => setDogs(["ERROR", err]));
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
      <section id="randomDogsImgs" ref={loadRef}>
        {showDogs(dogs, "random")}
      </section>
      <div className="loadContainer">{loadMore && <Spin size="large" />}</div>
      <div ref={loadRef}></div>
    </article>
  );
};

export default HomePage;
