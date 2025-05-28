import { useState, useEffect } from "react";
import HeaderComponent from "../components/HeaderComponent";
import SerieComponent from "../components/SerieComponent";
import { Link } from "react-router-dom";

function SeriePage() {
  // Estado para series, inicializado con lo que hay en localStorage o el listado por defecto
  const [series, setSeries] = useState(() => {
    const saved = localStorage.getItem("series");
    if (saved) {
      return JSON.parse(saved);
    } else {
      // listado inicial
      return [
        { cod: 1, nom: "Friends", cat: "Comedy", img: "friends.jpg" },
        { cod: 2, nom: "Law & Order", cat: "Drama", img: "law-and-order.jpg" },
        { cod: 3, nom: "The Big Bang Theory", cat: "Comedy", img: "tbbt" },
        { cod: 4, nom: "Stranger Things", cat: "Horror", img: "st.jpg" },
        { cod: 5, nom: "Dr. House", cat: "Drama", img: "dr-house.jpg" },
        { cod: 6, nom: "The X-Files", cat: "Drama", img: "the-x-files.jpg" },
      ];
    }
  });

  // Guarda cambios en localStorage cada vez que cambian las series
  useEffect(() => {
    localStorage.setItem("series", JSON.stringify(series));
  }, [series]);

  return (
    <>
      <HeaderComponent />
      <div className="container mt-3">
        <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
          <h3>Series</h3>
          <div>
            <Link className="btn btn-primary" to="/series/new">
              Nuevo
            </Link>
          </div>
        </div>
        <div className="row">
          {series.map((serie) => (
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
    </>
  );
}

export default SeriePage;
