import { useState, useEffect } from "react";
import Form from "./Form.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import 'bootstrap/dist/css/bootstrap.min.css';
function Search() {
  let [state, setstate] = useState("");
  let [searched, setsearch] = useState(false);
  let [animeList, setAnimeList] = useState([]);
  let [page, setPage] = useState(1);
  let [hasMore, setHasMore] = useState(true);
  let data;
  useEffect(() => {
    if (state.trim() !== "") {
      setAnimeList([]);
      setPage(1);
      setHasMore(true);
    }
  }, [state]);
  useEffect(() => {
    async function Animesearch() {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime?q=${state}&page=${page}`);
        data = await res.json();
        if (data.data.length > 0) {
          setAnimeList((prev) => [...prev, ...data.data]);
        } else {
          setHasMore(false);
        }
        setsearch(true);
      } catch (err) {
        console.error("Error fetching anime:", err);
      }
    }
    Animesearch()
  }, [state, page])
  function anime(text) {
    setstate(text);
  }

  function fetchMoreData() {
    setPage((prevPage) => prevPage + 1);
  }
  return <>
    <Form anime={anime} />

    <InfiniteScroll
      dataLength={animeList.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      {
        searched && animeList.map((anime) => (
          <div className="container mt-4">
            <div className="row g-2">
              {searched && animeList.map((anime) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={anime.mal_id}>
                  <div className="card h-100">
                    <img
                      className="card-img-top"
                      src={anime.images.jpg.image_url}
                      alt={anime.title}
                      loading="lazy"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{anime.title}</h5>
                      <p className="card-text text-danger">
                        {anime.score && `Rating: ${anime.score}`}
                      </p>
                      {anime.genres.length > 0 && (
                        <p className="card-text text-primary">
                          Genres: {anime.genres.map(g => g.name).join(", ")}
                        </p>
                      )}
                      {anime.trailer?.url && (
                        <a
                          href={anime.trailer.url}
                          className="btn btn-primary btn-sm"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Watch Trailer
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        ))

      }

    </InfiniteScroll>
  </>



}
export default Search;