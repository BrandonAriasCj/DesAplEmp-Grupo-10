import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import HeaderComponent from "../../components/HeaderComponent";

// Objeto inicial con los nombres de campo de la API.
const initData = {
  cod: "",
  nom: "",
};

function CategoryFormPage() {
  const urlApi = "http://localhost:8000/series/api/v1/categories/";
  const navigate = useNavigate();
  const [data, setData] = useState(initData);

  // Actualiza el campo "cod" si es necesario que el usuario lo ingrese.
  const onChangeCod = (e) => {
    setData({ ...data, cod: e.target.value });
  };

  // Actualiza el campo "nom" para el nombre de la categoría.
  const onChangeNombre = (e) => {
    setData({ ...data, nom: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(urlApi, data);
    navigate("/categories");
  };

  return (
    <>
      <HeaderComponent />
      <div className="container mt-3">
        <div className="border-bottom pb-3 mb-3">
          <h3>Nueva - Categoría</h3>
        </div>
        <form onSubmit={handleSubmit} className="row">
          {/* Input para el campo "cod" si es requerido */}
          <div className="mb-3">
            <label htmlFor="inputCod" className="form-label">
              Código
            </label>
            <input
              type="text"
              onChange={onChangeCod}
              className="form-control"
              value={data.cod}
              required
            />
          </div>
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

export default CategoryFormPage;
