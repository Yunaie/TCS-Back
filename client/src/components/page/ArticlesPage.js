import Article from '../Article'
import "../../styles/ArticlesPage.css"

function ArticlesPage() {
    return (
        <div className='articlesPages'>
            <h3 className='latest'>Tous les articles :</h3>                  
            <div className="container">
                <Article />
                <Article />
                <Article />
                <Article />
            </div>
        </div>
    )
}

export default ArticlesPage