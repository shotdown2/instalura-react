import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

export default class PrivateRoute extends Component{

  constructor(){
    super();
    this.state={component:{}};
  }

componentWillMount(){
    this.checaLogin();
}


 //= ({component: Component, ...rest})=>{

  checaLogin(){
      console.log("checa");
      if(localStorage.getItem('auth-token')!==null){
      console.log("auth !== null")
      console.log(this.props.component);

      this.setState({component:this.props.component});


    }else{
      console.log("auth === null")
      return( null
      //  <Redirect to={{
      //    pathname:'/',
      //    state: {from: props.location, msg: 'você precisa estar logado para acessar o endereço', isAuthenticated:false }
//
      //  }}/>
      );
    }
  }

   render(){
     return(

       <Router render={this.checaLogin.bind(this)} />

     );
   }


}
