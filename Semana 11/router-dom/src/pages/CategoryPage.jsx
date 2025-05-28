import { useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import SerieComponent from "../components/SerieComponent";

function SeriePage() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const categorias = [
    { cod: 1, nom: "Horror" },
    { cod: 2, nom: "Comedy" },
    { cod: 3, nom: "Action" },
    { cod: 4, nom: "Drama" },
  ];

  const series = [
    { cod: 1, nom: "Friends", cat: "Comedy", img: "friends.jpg" },
    { cod: 2, nom: "Law & Order", cat: "Drama", img: "law-and-order.jpg" },
    { cod: 3, nom: "The Big Bang Theory", cat: "Comedy", img: "tbbt.jpg" },
    { cod: 4, nom: "Stranger Things", cat: "Horror", img: "st.jpg" },
    { cod: 5, nom: "Dr. House", cat: "Drama", img: "dr-house.jpg" },
    { cod: 6, nom: "The X-Files", cat: "Drama", img: "the-x-files.jpg" },
  ];

  const seriesFiltradas = categoriaSeleccionada
    ? series.filter((serie) => serie.cat === categoriaSeleccionada)
    : series;

  return (
    <>
      <HeaderComponent />
      <div className="container mt-3">
        <div className="border-bottom pb-3 mb-3">
          <h3>Series por Categorías</h3>
        </div>

        <div className="card p-3">
          <h4 className="text-center">Selecciona una Categoría</h4>
          <div className="d-flex justify-content-around flex-wrap">
            <span
              key="all"
              className={`fw-bold text-dark px-3 py-2 ${categoriaSeleccionada === null ? "bg-light rounded" : ""}`}
              onClick={() => setCategoriaSeleccionada(null)}
              style={{ cursor: "pointer" }}
            >
              Todas
            </span>
            {categorias.map((cat) => (
              <span
                key={cat.cod}
                className={`fw-bold text-primary px-3 py-2 ${categoriaSeleccionada === cat.nom ? "bg-light rounded" : ""}`}
                onClick={() => setCategoriaSeleccionada(cat.nom)}
                style={{ cursor: "pointer" }}
              >
                {cat.nom}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-center">
            {categoriaSeleccionada ? `Series en ${categoriaSeleccionada}` : "Todas las Series"}
          </h4>
          <div className="row">
            {seriesFiltradas.map((serie) => (
              <div key={serie.cod} className="col-md-3 mb-3">
                <SerieComponent
                  codigo={serie.cod}
                  nombre={serie.nom}
                  categoria={serie.cat}
                  imagen={serie.img}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SeriePage;
