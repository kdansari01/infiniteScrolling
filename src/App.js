import "./styles.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import Button from "./Button";
import Loader from "./Loader";
// import axios from "axios";
export default function App() {
  const style = {
    MinHeight: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
  };

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loding, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, [data, page]);

  const fetchData = () => {
    setLoading(true);

    fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=10`
    )
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setData((prevComments) => [...prevComments, ...data]);
          setPage((prevPage) => prevPage + 1);
        }, 5000);
        if (data.length < 10) {
          setHasMore(false);
        }
        setLoading(false);
      });
  };
  // console.log("data", data);
  return (
    <>
      <InfiniteScroll
        // inverse={true}
        dataLength={data.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {data?.map((post) => (
          <div style={style} key={Math.random() * 1000}>
            <div>
              <h3>
                {post?.id} {post?.name}
              </h3>
              <p>{post?.body}</p>
            </div>
          </div>
        ))}
        <Button />
      </InfiniteScroll>
    </>
  );
}
