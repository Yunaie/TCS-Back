import {useContext, useState} from "react"
import {Navigate} from "react-router-dom"
import {UserContext} from "../UserContext"
import "../../styles/LoginPage.css"

function RegisterPage() {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [redirect,setRedirect] = useState(false)
    const {setUserInfo} = useContext(UserContext)
  
    async function register(ev) {
      ev.preventDefault();
      const response = await fetch('http://localhost:3000/register', {
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
      return <Navigate to={'/'} />
    }
    return (
      <form onSubmit={register}>
        <h1 className="login-title">Register</h1>
        <input type="text"
               placeholder="username"
               value={username}
               onChange={ev => setUsername(ev.target.value)}/>
          <input type="email"
              placeholder="email"
              value={email}
              onChange={ev => setEmail(ev.target.value)}/>
        <input type="password"
               placeholder="password"
               value={password}
               onChange={ev => setPassword(ev.target.value)}/>
              <button className="my-button">Register</button>
      </form>
    );
}

export default RegisterPage