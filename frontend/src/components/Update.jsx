import React from "react"
import { useNavigate, useParams } from "react-router-dom";

export default function Update(){
    const navigate = useNavigate();
    const {id} = useParams();

    console.log("ID FROM UPDATE COMPO IS ", id);
    const [user, setUser] = React.useState({
        name:"",
        email:""
    })
    const [error, setError] = React.useState("")
    function handleChange(e){
        console.log(user)
        setUser(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    async function getSingleUser(){
        const res = await fetch(`http://localhost:8000/${id}`)
        const data =await res.json();
        
        if(res.status == 201 && data.msg){
            setUser(data.msg);
        }
        else{
            console.log("Cannot write data to old fields")
            setError("Cannot write data to old fields");
        }
        
    }
    async function onSubmit(e){
        e.preventDefault();
        const {name, email} = user
        try{
            const res = await fetch(`http://localhost:8000/edit/${id}`,{
                method: "PATCH",
                headers:{
                    'Content-type':"application/json"
                },
                body: JSON.stringify({name, email})
            })
            const data =await res.json();
            if(res.status == 201){
            console.log(data.msg);
            navigate('/read');
            }
            else{
                console.log("Could not be updates");
                setError("Not updated")
            }
        }
        catch(err){
            console.log("ERROR OCCURED WHILE UPDATING")
            setError("ERROR OCCURED WHILE UPDATING");

        }
    }

    React.useEffect(()=>{
        getSingleUser();
    },[])
  
    return(
        <>
         <div className="create">

        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form method="POST">
            <div className="form-group">
                <label htmlFor="exampleInputName1">Name</label>
                <input onChange = {(e)=> handleChange(e)}value={user.name} name = "name" type="text" className="for-control" id="exampleInputName1" placeholder="Password"/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input onChange = {(e)=> handleChange(e)}value={user.email} name = "email" type="email" className="for-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" className="for-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <button type="submit" onClick ={((e)=>onSubmit(e))} className="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
    )
}