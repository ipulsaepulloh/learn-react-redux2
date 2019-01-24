import React, { Component,Fragment } from 'react';
import Axios from 'axios'
import Cookies from 'js-cookie'

class Userlist extends Component {
    state = { users:[] };
    signOut = e => {
        Cookies.remove('token')
        this.props.logout()
    }

    async componentDidMount(){
      const token = Cookies.get("token")
      const response = await Axios.get("http://localhost:8000/api/users", {
          headers: {
              Authorization: `bearer ${token}`
          }
      })
       
      this.setState({ users: response.data.users });
    }

    render() { 
        return ( 
            <Fragment>
                <ul>
                    {this.state.users.map((user,i) => (
                        <li key={i}>
                            {user.name} {user.email}
                        </li>
                    ))}
                </ul>
                <button onClick={this.signout}>Sign Out</button>
            </Fragment>
         );
    }
}
 
export default Userlist;