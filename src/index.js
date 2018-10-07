import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import Login from './componentes/Login';
import Logout from './componentes/Logout';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';



const PrivateRoute = ({component:Component,...rest})=>{
    return (<Route {...rest}
      render={(props)=>{
          if(localStorage.getItem('auth-token')!==null || props.match.params.login !== undefined){
            return(<Component {...props}/>);
          }else{
            return(
              <Route {...rest} render={(rest)=>(<Redirect {...rest} to={{
               pathname:'/',
               state: {from: rest.location, msg: 'você precisa estar logado para acessar o endereço', isAuthenticated:false }

             }}/>)}/>

            );

          }
        }
      }/>);
}

ReactDOM.render(

  <Router>
    <div>
        <Route exact path="/" component={Login}/>
        <Route exact path="/logout" component={Logout}/>
        <PrivateRoute exact path="/timeline/:login?" component={App} />
    </div>
  </Router>
, document.getElementById('root'));
registerServiceWorker();
