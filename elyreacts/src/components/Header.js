import React from 'react'
import { useHistory } from "react-router-dom";

export const Header = () => {
    const history = useHistory();

    const routeHome = () =>{ 
        let path = `/`; 
        history.push(path);
      }

    const routeLogin = () =>{ 
      let path = `/login`; 
      history.push(path);
    }
  
    const routeRu = () =>{ 
      let path = `/register`; 
      history.push(path);
    }
    const routeRa = () =>{ 
      let path = `/register-artist`; 
      history.push(path);
    }
    return (
        
        <div>
            <div onClick={routeHome}>Elywalls</div>
            <br/>
            <button onClick={routeLogin}>Login</button>
            <button onClick={routeRu}>Register</button>
            <button onClick={routeRa}>Register as artist</button>
        </div>
    )
}
