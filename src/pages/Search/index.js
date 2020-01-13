import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as githubActions from '../../store/actions/github'

import axios from 'axios';
import './Search.css';

class Index extends Component {
  state = {
    user: '',
    error: null
  }

searchUserGitHub = () => {
  axios.get(`https://api.github.com/users/${this.state.user}`)
    .then((response) =>{
      // atualizar no reducer
      this.props.actions.setUserInfo(response.data);
      this.props.history.push("/userInfo");
      }).catch((e) =>{
        console.log(e);
          console.log(this.props);
        this.setState( { error: true } )
      })
}

  render() {
    return (
      <div className="Search">
        <header className="Search-header">
          <h1>Github Search</h1>
          <input
            onChange={(e) => {
              this.setState({ 
                user: e.target.value 
               })
              }
            }
            onKeyPress={(e) => {  
              console.log(e.key);
              if(e.key === "Enter"){
                this.searchUserGitHub()
              }
            }}
          />
          { this.state.error ? (
            <p className="Search-msg-err">Usuário não encontrado</p>
          ) : null }        
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
     actions: bindActionCreators(githubActions , dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Index);
