import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent";
import { createSerieService } from "../../services/SerieServices";

const initData = {
    cod: '',
    nom: '',
    cat: '',
    img: ''
};

function SerieFormPage() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState(initData);

    const loadCategories = async () => {
        const resp = await getAllCategoryService();
        setCategories(resp.data);
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createSerieService(data);
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
                    <h3>Nueva - Serie</h3>
                </div>
                <form onSubmit={handleSubmit} className="row">
                    <div className="col-md-4">
                        <img
                            id="fileImg"
                            className="card-img-top"
                            src={data.img || "https://dummyimage.com/400x250/000/fff&text=imagen"}
                            alt="img"
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="inputCod" className="form-label">Código</label>
                            <input type="number" name="cod" onChange={onChangeInput} className="form-control" id="inputCod" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputNom" className="form-label">Nombre</label>
                            <input type="text" name="nom" onChange={onChangeInput} className="form-control" id="inputNom" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputCat" className="form-label">Categoría</label>
                            <select name="cat" onChange={onChangeInput} className="form-select" id="inputCat" required>
                                <option value="">Seleccione una opción</option>
                                {categories.map((item) => (
                                    <option key={item.id} value={item.id}>{item.description}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputImg" className="form-label">Imagen (URL o nombre archivo)</label>
                            <input type="text" name="img" onChange={onChangeInput} className="form-control" id="inputImg" />
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

export default SerieFormPage;

