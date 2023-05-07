import Article from "../Article"
import '../../styles/IndexPage.css'

function IndexPage() {
    return (
        <div>
            <h3 className='latest'>Latest on the blog :</h3>                  
            <div className="container">
                <Article />
                <Article />
                <Article />
                <Article />
            </div>
        </div>
    )
}

export default IndexPage