import image from '../assets/article-image.jpg'
import {Link} from "react-router-dom"

function Article() {
    const titre = "Une etrange disparition"
    const description = "par une nuit d'hiver, la jeune emilie disparait sans laisser de trace"
    const text = "Cum haec taliaque sollicitas eius aures everberarent expositas semper eius modi rumoribus et patentes, varia animo tum miscente consilia, tandem id ut optimum factu elegit: et Vrsicinum primum ad se venire summo cum honore mandavit ea specie ut pro rerum tunc urgentium captu disponeretur concordi consilio, quibus virium incrementis Parthicarum gentium a arma minantium impetus frangerentur. Iamque non umbratis fallaciis res agebatur, sed qua palatium est extra muros, armatis omne circumdedit. ingressusque obscuro iam die, ablatis regiis indumentis Caesarem tunica texit et paludamento communi, eum post haec nihil passurum velut mandato principis iurandi crebritate confirmans et statim inquit exsurge et inopinum carpento privato inpositum ad Histriam duxit prope oppidum Polam, ubi quondam peremptum Constantini filium accepimus Crispum.  Sin autem ad adulescentiam perduxissent, dirimi tamen interdum contentione vel uxoriae condicionis vel commodi alicuius, quod idem adipisci uterque non posset. Quod si qui longius in amicitia provecti essent, tamen saepe labefactari, si in honoris contentionem incidissent, pestem enim nullam maiorem esse amicitiis quam in plerisque pecuniae cupiditatem, in optimis quibusque honoris certamen et gloriae, ex quo inimicitias maximas saepe inter amicissimos exstitisse."
    return (
        <div className="article">
            <Link to="/article"><img src={image}
                    alt="article image"/></Link>
            <div id="sirine❤️">
                <h2>
                    <Link to="/article">
                        {titre}</Link>
                </h2>
                <h4>{description}</h4>
                <pre className='text'>
                    <p>{text}</p>
                </pre>
            </div>
        </div>
    )
}

export default Article
