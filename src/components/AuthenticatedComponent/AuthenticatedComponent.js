import React, { Component } from 'react';
import {getJwt} from '../../helpers/jwt';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class AuthenticatedComponent extends Component {
    state = {
        user: undefined
    }

    componentDidMount(){
        const jwt = getJwt();
        if(!jwt){
            this.props.history.push('/login');
        }

        axios.get('http://localhost:3001/api/v1/users/me',  {
            headers:{
              'Content-Type': 'application/json',
              'x-auth': jwt
            }
          }).then((res)=>{
            this.setState({user: res.data.email});
        }).catch((err)=>{
            localStorage.removeItem('x-auth');
            this.props.history.push('/login');
        })
    }


    render(){
        if(this.state.user === undefined){
            return(
                <div><p>Loading...</p></div>
            )
        }
        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(AuthenticatedComponent);