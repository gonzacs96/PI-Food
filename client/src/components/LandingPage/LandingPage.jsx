import React from "react";
import {Link} from 'react-router-dom'

export const LandingPage= ()=>{
    return (
      <Link to={'/home'}><div>Ingresar</div></Link> 
    );
}