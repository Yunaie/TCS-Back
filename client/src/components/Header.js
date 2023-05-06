import '../styles/Header.css'

function Header() {

    const title_header = "True Crime Story"
    return(
        <div className="content">
            <div class="main-title">
                <h1>{title_header}</h1>
            </div>
            <ul className="side-bar">
                <li><a href="#">Accueil</a></li>
                <li><a href="#">Connexion</a></li>
                <li><a href="#">Articles</a></li>
                <li><a href="#">Infos</a></li>
            </ul>
        </div>
)
}

export default Header