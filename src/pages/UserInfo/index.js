import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';  
import './UserInfo.css';
import { bindActionCreators } from 'redux';
import * as githubActions from '../../store/actions/github'

class Index extends Component {
    state = {
      user: '',
      error: null
    }

    componentDidMount() {
        if(this.user != ''){
            this.request();
        }
    }

    componentDidUpdate(){
        if(this.user != ''){
            this.request();
        }
    }

    request() {
        if(this.props.user === null){
            this.props.history.push("/")
        }else{
            axios.get(`https://api.github.com/users/${this.props.user.login}/repos`)
            .then((response) =>{
                let repos = response.data.map((repo) => {                
                    return { name: repo.name, star: repo.stargazers_count }
                })
                this.props.actions.setUserInfoRepos(repos);
            })
        }
    }
  
  searchUserGitHub = () => {
      this.setState( { error: null } )
    axios.get(`https://api.github.com/users/${this.state.user}`)
      .then((response) =>{
        this.props.actions.setUserInfo(response.data);
        this.props.history.push("/userInfo");
        
        console.log(response);
        }).catch((e) =>{
          this.setState( { error: true } )
          this.setState( { user:  '' } )
        })
  }

    render() {
        console.log("This.props.repos: ",this.props.repos);
        console.log("This.props.user: ", this.props.user);  
        console.log("This.error: ", this.error);  
        return (
            <div className="UserInfo">
                <div className="UserInfo-header">
                <div className="Nav-bar">
                <h1>Github Search</h1>
                    <input className="Input-css" 
                    placeholder={this.props.user.login}
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
                </div>
          { this.state.error ? (
            <p className="UserInfo-msg-err">Usuário não encontrado</p>
          ) : null }        
          <div className="Container">
            <div className="ColunaUserInfo">
                { 
                    this.props.user ? 
                    (
                        <div className="UserDetail">
                            <img className="ImgStyle" src={ this.props.user.avatar_url } alt="User image" />
                            <p>@{ this.props.user.login }</p>
                            <p>{ this.props.user.location }</p>
                            <p>Repositórios: { this.props.user.public_repos }</p>
                            <p>Seguidores: { this.props.user.followers }</p>
                        </div>
                    ) : null
                 }

            </div>
           <div className="RepoContainer">
           {
                this.props.repos ? (
                    this.props.repos.map(repo => (
                        <div className="Repo">
                            <p>{repo.name}</p>
                            <p>* {repo.star}</p>
                        </div>
                    ))
                ) : null
            }
           </div>
        </div>

        </div>

      </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        user: state.github.user,
        repos: state.github.repos
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        actions: bindActionCreators(githubActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);

