import { useState,useEffect } from "react";
import Form from "./Form.jsx";
function Search(){
    let [state,setstate]=useState("");
    let [searched,setsearch]=useState(false);
    let [animedata,setdata]=useState("");
    let data;
    useEffect( () =>{
        async function Animesearch() {
            try {
                const res = await fetch(`https://api.jikan.moe/v4/anime?q=${state}`);
                data = await res.json();
                console.log(data.data[0].title);
              setdata(data.data[0]);
                setsearch(true)
              } catch (err) {
                console.error("Error fetching anime:", err);
              }
        }
        Animesearch()
    },[state])
    function anime(text){
     setstate( text);
    }
return<>
  <Form anime={anime}/>
  {
   searched && animedata && (
    <>
      <h1>{animedata.title}</h1>
      <img src={animedata.images.jpg.image_url} alt={animedata.title} />
      <h2>{animedata.status}</h2>
      <a href={animedata.trailer.url}>Watch Trailer</a>
    </>
  )
  }
</>



}
export default Search;