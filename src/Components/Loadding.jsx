import './Loadding.css';

const Loadding = () => {
    return (
        <div className="loading">
            <p>Carregando produtos<span className="dots"></span></p>

            <div className="loading-bar">
                <span></span>
            </div>
        </div>
    )
}

export default Loadding