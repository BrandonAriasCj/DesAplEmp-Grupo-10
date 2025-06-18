import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import HeaderComponent from "../../components/HeaderComponent";

const initData = {
  cod: "",
  nom: "",
};

function CategoryEditFormPage() {
  const urlApi = "http://localhost:8000/series/api/v1/categories/";
  const navigate = useNavigate();
  // Extraemos "cod" del parámetro de la URL (antes se usaba id)
  const { cod } = useParams();
  const [data, setData] = useState(initData);

  const setDataForm = async () => {
    const resp = await axios.get(`${urlApi}${cod}/`);
    setData(resp.data);
  };

  const onChangeNombre = (e) => {
    setData({ ...data, nom: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${urlApi}${cod}/`, data);
    navigate("/categories");
  };

  useEffect(() => {
    setDataForm();
  }, []);

  return (
    <>
      <HeaderComponent />
      <div className="container mt-3">
        <div className="border-bottom pb-3 mb-3">
          <h3>Editar - Categoría</h3>
        </div>
        <form onSubmit={handleSubmit} className="row">
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              onChange={onChangeNombre}
              className="form-control"
              value={data.nom}
              required
            />
          </div>
          <div className="mb-3">
            <button className="btn btn-primary me-2">Guardar</button>
            <Link className="btn btn-secondary" to="/categories">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default CategoryEditFormPage;
