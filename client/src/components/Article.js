import image from '../assets/article-image.jpg'
import '../styles/Article.css'
import {Link} from "react-router-dom"

function Article() {
    const titre = "Une etrange disparition"
    const description = "par une nuit d'hiver, la jeune emilie disparait sans laisser de trace"
    return (
       <div className="article">
            <Link to="#"><img src={image} alt="article image"/></Link>
            <h2><Link to="#">{titre}</Link></h2>
            <h4>{description}</h4>
       </div>
    )
}

export default Article