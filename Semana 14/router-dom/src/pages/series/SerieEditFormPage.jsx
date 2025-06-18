import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent";
import { getAllCategoryService } from "../../services/CategoryService";
import { showSerieService, updateSerieService } from "../../services/SerieService";

const initData = {
    id: '',
    cod: '',
    nom: '',
    cat: '',
    img: ''
};

function SerieEditFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState(initData);

    const loadCategories = async () => {
        const resp = await getAllCategoryService();
        setCategories(resp.data);
    };

    const setDataForm = async () => {
        const resp = await showSerieService(id);
        setData(resp.data);
    };

    useEffect(() => {
        loadCategories();
        setDataForm();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateSerieService(data.id, data);
            console.log('Enviando', data);
            navigate('/series');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <HeaderComponent />
            <div className="container mt-3">
                <div className="border-bottom pb-3 mb-3">
                    <h3>Editar Serie</h3>
                </div>
                <form onSubmit={handleSubmit} className="row">
                    <div className="col-md-4">
                        <img
                            id="fileImg"
                            className="card-img-top"
                            src={data.img || "https://dummyimage.com/400x250/000/fff"}
                            alt="img"
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="inputCod" className="form-label">Código</label>
                            <input type="number" name="cod" onChange={handleChange} className="form-control" id="inputCod" value={data.cod} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputNom" className="form-label">Nombre</label>
                            <input type="text" name="nom" onChange={handleChange} className="form-control" id="inputNom" value={data.nom} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputCat" className="form-label">Categoría</label>
                            <select name="cat" onChange={handleChange} className="form-select" id="inputCat" value={data.cat} required >
                                <option value="">Seleccione una opción</option>
                                {categories.map((item) => (
                                    <option key={item.id} value={item.id}>{item.nom}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputImg" className="form-label">URL de Imagen</label>
                            <input type="text" name="img" onChange={handleChange} className="form-control" id="inputImg" value={data.img} required />
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary me-2">Guardar</button>
                            <Link className="btn btn-secondary" to="/series">Cancelar</Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SerieEditFormPage;
