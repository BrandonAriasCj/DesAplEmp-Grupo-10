import { NavLink } from "react-router-dom";

function SerieComponent({ codigo, nombre, categoria, imagen, onDelete }) {
    return (
        <div className="card">
            <img 
                className="card-img-top" 
                src={`/images/${imagen}`} 
                alt={nombre}
            />

            <div className="card-body">
                <h5 className="card-title">{nombre}</h5>
                <p className="card-text">{categoria}</p>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-secondary">
                        <NavLink to={`/serie/edit/${codigo}`} className="btn btn-secondary text-white text-decoration-none">
                            Editar
                        </NavLink>
                    </button> 
                    <button className="btn btn-danger" onClick={() => onDelete(codigo)}>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}


export default SerieComponent;