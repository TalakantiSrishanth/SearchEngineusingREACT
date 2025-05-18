import { useState } from "react";


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
    <form onSubmit={submit}>
    <input type="text" value={text} onChange={change} name="text" placeholder="Search your anime"/>
<button>submit</button></form>
</>}
export default Form;
