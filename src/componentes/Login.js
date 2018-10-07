import React, { Component } from 'react';

export default class Login extends Component{

    constructor(props){
        super(props);
        this.state = {msg:''};

    }


    envia(event){
        event.preventDefault();

        const requestInfo ={
            method:'Post',
            body:JSON.stringify({login:this.login.value,senha:this.senha.value}),
            headers:new Headers({
                'Content-type':'application/json'
            })
        };

        fetch('http://localhost:8080/api/public/login', requestInfo)
        .then(response =>{
            if(response.ok){
                return response.text();
            }else{
                throw new Error('não foi possível fazer o login');
            }
        })
        .then(token =>{

            localStorage.setItem('auth-token',token);
            this.state.isNotAuthenticated=true;

            this.props.history.push('/timeline');
          })
        .catch(error =>{
            this.setState({msg:error.message});
        });
    }

    componentDidMount(){

        if(this.props.location.state){
            if(!this.props.location.state.isAuthenticated){
                this.setState({msg:this.props.location.state.msg});

            }
        }

    }

    render(){


        return(
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.envia.bind(this)}>
                    <input type="text" ref={(input)=>this.login =input}/>
                    <input type="password" ref={(input)=>this.senha =input}/>
                    <input type="submit" value="login" />
                </form>

            </div>
        );
    }
}
