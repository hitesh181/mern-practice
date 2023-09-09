import React from "react"
import {useNavigate} from "react-router-dom"

export default function Navbar(){
    const navigate = useNavigate();
    const [user, setUser] = React.useState({
        name:"",
        email:"",
        password:""
    })
    const [error, setError] = React.useState("")
    function handleChange(e){
        console.log(user)
        setUser(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const onSubmit = async (e)=>{
        console.log("EK BARR CHALL GAYA ")
        e.preventDefault()
        const {name, email, password} = user
        console.log("Submitted ")
        try{
           
            const res = await fetch("http://localhost:8000/register",{
                method:"POST",
                headers:{
                    'Content-type':"application/json"
                },
                body: JSON.stringify({name, email,password})
               
            })
            
            const data =await res.json();
            if(res.status == 201){
                console.log("data send succesfully ")
                setUser({name:"",
                email:"",
                password:""})
                setError("")
                navigate('/read');
            }
            if(res.status == 401 ){
                console.log(data.msg)
                setError(data.msg)
            }
        }
        catch(err){
            console.log("Error while sedning data to backend")
        }
    }

    return(
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
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input onChange = {(e)=> handleChange(e)}value={user.password} name = "password" type="password" className="for-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                
                <button type="submit" onClick ={((e)=>onSubmit(e))} className="btn btn-primary">Submit</button>
                </form>
        </div>
    )
}