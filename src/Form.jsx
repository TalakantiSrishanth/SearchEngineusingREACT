import { useState } from "react";
import Button from '@mui/material/Button';
function Form({anime}){
    let [text,settext]=useState("");

    function change(e){
        settext(e.target.value);
    }
    function submit(e){
        e.preventDefault();
        anime(text);
    }
    return <>
  <form 
  onSubmit={(e) => { e.preventDefault(); anime(e.target.search.value); }} 
  className="d-flex justify-content-center my-4"
>
  <input 
    type="text" 
    name="search" 
    className="form-control w-50 me-2" 
    placeholder="Search anime..." 
  />
  <button className="btn btn-primary">Search</button>
</form>

</>}
export default Form;
