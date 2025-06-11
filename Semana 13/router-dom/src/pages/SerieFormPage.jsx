import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";

function SerieFormPage() {
const navigate = useNavigate();
    const series = [
        { codigo: 1, nombre: "Friends", categoria: "comedy", imagen: "friends.png" },
        { codigo: 2, nombre: "Law & order", categoria: "Drama", imagen: "law-and-order.png" },
        { codigo: 3, nombre: "The big bang theory", categoria: "comedy", imagen: "the-big-bang-theory.png" },
        { codigo: 4, nombre: "Stranger Things", categoria: "Horror", imagen: "stranger-things.png" },
        { codigo: 5, nombre: "Sr. House", categoria: "Drama", imagen: "dr-house.png" },
        { codigo: 6, nombre: "The X-Files", categoria: "Drama", imagen: "the-x-files.png" },
    ];

    const { idserie } = useParams();
    const [data, setData] = useState({
        codigo: '',
        nombre: '',
        categoria: '',
        imagen: ''
    });

    const onChangeNombre = (e) => {
        setData(prevData => ({
            ...prevData,
            nombre: e.target.value
        }));
    };

    const onChangeCategoria = (e) => {
        setData(prevData => ({
            ...prevData,
            categoria: e.target.value
        }));
    };

    const setDataForm = (codigo) => {
        for (const item of series) {
            if (item.codigo == codigo) {
                console.log(item);
                setData({
                    codigo: item.codigo,
                    nombre: item.nombre,
                    categoria: item.categoria,
                    imagen: ''
                });
                document.getElementById('fileImg').src = "https://dummyimage.com/400x250/000/fff&text=" + item.imagen;
                break;
            }
        }
    };

    useEffect(() => {
        setDataForm(idserie);
    }, [idserie]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Enviando', data);
        localStorage.setItem('serieData', JSON.stringify(data));
        navigate("/series");
    };

    

    return (
        <>
            <HeaderComponent />
            <div className="container mt-3">
                <div className="border-bottom pb-3 mb-3">
                    <h3>Nuevo - Serie</h3>
                </div>
                <form onSubmit={handleSubmit} className="row">
                    <div className="col-md-4">
                        <img
                            id="fileImg"
                            className="card-img-top"
                            src={"https://dummyimage.com/400x250/000/fff"}
                            alt="img" />
                    </div>
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="inputName" className="form-label">Nombre</label>
                            <input type="text" onChange={onChangeNombre} className="form-control" id="inputName" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputCategory" className="form-label">Categoria</label>
                            <select onChange={onChangeCategoria} className="form-select" id="inputCategory" required>
                                <option value="">Seleccione una opción</option>
                                <option value="Horror">Horror</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Action">Action</option>
                                <option value="Drama">Drama</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputImage" className="form-label">Imagen</label>
                            <input type="file" className="form-control" id="inputImage" />
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary">Guardar</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SerieFormPage;
