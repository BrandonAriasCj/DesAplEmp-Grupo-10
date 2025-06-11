import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderComponent from "../components/HeaderComponent";

function CategoryPage() {
  const urlApi = "http://127.0.0.1:8000/series/api/v1/categories/";
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para redirigir a la edición, usando el valor de "cod"
  const handleEdit = async (cod) => {
    navigate(`/categories/edit/${cod}`);
  };

  // Función para eliminar usando "cod"
  const handleDelete = async (cod) => {
    if (window.confirm("¿Está seguro de eliminar este registro?")) {
      await axios.delete(`${urlApi}${cod}/`);
      const nLista = categories.filter((item) => item.cod !== cod);
      setCategories(nLista);
    }
  };


  const loadData = async () => {
    try {
      const resp = await axios.get(urlApi);
      console.log(resp.data);
      setCategories(resp.data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <HeaderComponent />
      <div className="container mt-3">
        <div className="border-bottom pb-3 mb-3 d-flex justify-content-between align-items-center">
          <h3>Categorías</h3>
          <div>
            <Link className="btn btn-primary" to="/categories/new">
              Nuevo
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th className="text-center">Código</th>
                <th className="text-center" style={{ width: "100px" }}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item) => (
                <tr key={item.cod}>
                  <td>{item.nom}</td>
                  <td className="text-center">{item.cod}</td>
                  <td className="text-center">
                    <button onClick={() => handleEdit(item.cod)} className="btn btn-secondary me-2 btn-sm">
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button onClick={() => handleDelete(item.cod)} className="btn btn-danger btn-sm">
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default CategoryPage;
