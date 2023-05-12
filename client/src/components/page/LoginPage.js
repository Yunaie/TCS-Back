import {useContext, useState} from "react"
import {Navigate} from "react-router-dom"
import {UserContext} from "../UserContext"
import "../../styles/LoginPage.css"
import {Link} from "react-router-dom"

function LoginPage() {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [redirect,setRedirect] = useState(false)
    const {setUserInfo} = useContext(UserContext)
  
    async function login(ev) {
      ev.preventDefault();
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        body: JSON.stringify({username,email,password}),
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
      });
      if (response.ok) {
        response.json().then(userInfo => {
          setUserInfo(userInfo);
          setRedirect(true);
        });
      } else {
        alert('wrong credentials');
      }
    }
  
    if (redirect) {
      return <Navigate to={'/login'} />
    }
    return (
      <form onSubmit={login}>
          <h1 className="login-title">Login</h1>
          <input type="text"
                placeholder="username"
                value={username}
                onChange={ev => setUsername(ev.target.value)}/>
          <input type="password"
                placeholder="password"
                value={password}
                onChange={ev => setPassword(ev.target.value)}/>
                <button className="my-button">Login</button>
                <Link to="/register"><button className="my-button">Pas de compte?</button></Link>
        </form>
    );
}

export default LoginPage