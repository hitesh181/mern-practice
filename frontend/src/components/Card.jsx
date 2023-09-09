import React from "react";
import {NavLink} from "react-router-dom"

const Card = (props) => {
 
  return (
    <div>
     
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{props.user.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{props.user.email}</h6>

              <NavLink to={`/${props.user._id}`} className="card-link">Edit</NavLink>
              {/* <a onClick ={()=>props.handleEdit(props.user._id)} href="#" className="card-link">
                Edit
              </a> */}
              <a onClick ={()=>props.handleDelete(props.user._id)}href="#" className="card-link">
                Delete
              </a>
            </div>
          </div>
    </div>
  );
};
export default Card;