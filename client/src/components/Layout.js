import '../styles/Layout.css'
import skull from '../assets/bg3.gif'
import {Link} from "react-router-dom"
import {Outlet} from "react-router-dom"


function Layout() {

    const title_header = "True Crime Story"
    return(
        <div>
            <div className="content">
                <div class="main-title">
                    <h1>{title_header}</h1>
                </div>
                <ul className="side-bar">
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/login">Connexion</Link></li>
                    <li><Link to="#">Articles</Link></li>
                    <li><Link to="#">Infos</Link></li>
                </ul>
            </div>
            <div className="body">
                <div className="modal">
                    <div className="modal-content">
                        <Outlet/>
                    </div>
                </div>        
            </div>
            <img src={skull} className="image-skull"/>
        </div>
)
}

export default Layout