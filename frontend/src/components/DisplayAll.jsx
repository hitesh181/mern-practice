import React from "react"
import Card from "./Card"
import {useNavigate} from "react-router-dom"


export default function Navbar(){
  const navigate = useNavigate();

    const [users, setUsers] = React.useState([]);
    const [error, setError] = React.useState("");

    async function getData(){
        try{
            console.log("Sedning request")
            const res = await fetch("http://localhost:8000/read",{
                method:"GET",
                headers:{
                    'Content-Type':"application/json"
                }
            })
            
            const allUsers =await res.json()
            console.log([...allUsers.msg])

            if(res.status == 201 && allUsers.msg){
                console.log("Data Succesffuly Reciveed ")
                
                setUsers([...allUsers.msg])
                console.log("userss are ", users)
                setError("")
            }
            else if(res.status == 401){
                console.log("Data not Reciveed ")
                setUsers([])
                setError(allUsers.msg)
            }

        }
        catch(err){
            console.log("Error occired whiule getting ", err)
        }
    }


    function parentFunction(){
        console.log("child called parent" );
    }


    async function handleDelete(id){   
      try{
        console.log("Sedning delete request")
        const res = await fetch(`http://localhost:8000/${id}`,{
            method:"DELETE",
          
        })
        
        const allUsers =await res.json()
        console.log(allUsers)

        if(res.status == 201 && allUsers.msg){
            console.log("Users Succesffuly eradidicated ")
            setError("Users Succesffuly eradidicated")
            setTimeout(()=>{
              setError("");
              getData();
            },1000)
        }
        else if(res.status == 401){
            console.log("Data not Reciveed ")
            setError(allUsers.msg)
        }

    }
    catch(err){
        console.log("Error occired whiule getting ", err)
    }
}

      async function handleEdit(id){
        console.log(id)
      }


    React.useEffect(() => {
            getData(); 
      }, []);

      let userComponent=[]
    if(users.length > 0){
         userComponent = users.map((user)=>(
        <Card handleDelete={handleDelete} handleEdit={handleEdit} user={user}/>
    ))
    }
    
    return(
        <div className="container my-2">

        {error ? <div class="alert alert-danger"> {error} </div>: <div className="card-container">{userComponent}</div>}
       
      </div>
    );
  };