function HeaderComponent() {


    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">SeriesApp</span>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/home">Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/categories">Categorías</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/series">Series</a>
                        </li>
                    </ul>
                    <div>
                        Bienvenido Jhon Due 
                        <div className="text-end">
                            <a href="/">Salir</a>
                        </div> 
                    </div>
                </div>
            </div>
        </nav>
    )
}
  
export default HeaderComponent
