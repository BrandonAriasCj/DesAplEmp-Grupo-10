import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";

function SerieFormPage() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState(null); 
  const [preview, setPreview] = useState("https://dummyimage.com/400x250/000/fff");

 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagen(null);
      setPreview("https://dummyimage.com/400x250/000/fff");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !categoria || !imagen) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Leer las series guardadas
    const savedSeries = localStorage.getItem("series");
    const series = savedSeries ? JSON.parse(savedSeries) : [];

    // Crear nueva serie
    const newSerie = {
      cod: series.length > 0 ? Math.max(...series.map((s) => s.cod)) + 1 : 1,
      nom: nombre,
      cat: categoria,
      // Como no hay backend para guardar imagen, guardamos la preview base64 en img
      img: preview,
    };

    // Guardar la nueva lista en localStorage
    const updatedSeries = [...series, newSerie];
    localStorage.setItem("series", JSON.stringify(updatedSeries));

    // Volver a la lista de series
    navigate("/series");
  };

  return (
    <>
      <HeaderComponent />
      <div className="container mt-3">
        <div className="border-bottom pb-3 mb-3 d-flex justify-content-between align-items-center">
          <h3>Nuevo - Serie</h3>
          <button className="btn btn-secondary" onClick={() => navigate("/series")}>
            Regresar
          </button>
        </div>
        <form className="row" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <img id="fileImg" className="card-img-top" src={preview} alt="img" />
          </div>
          <div className="col-md-8">
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputCategory" className="form-label">
                Categoria
              </label>
              <select
                className="form-select"
                id="inputCategory"
                required
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Seleccione una opción</option>
                <option value="Horror">Horror</option>
                <option value="Comedy">Comedy</option>
                <option value="Action">Action</option>
                <option value="Drama">Drama</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="inputImage" className="form-label">
                Imagen
              </label>
              <input
                type="file"
                className="form-control"
                id="inputImage"
                accept="image/*"
                required
                onChange={handleImageChange}
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => navigate("/series")}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SerieFormPage;
