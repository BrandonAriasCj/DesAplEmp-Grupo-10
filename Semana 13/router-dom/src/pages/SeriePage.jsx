import { useState, useEffect } from "react";
import HeaderComponent from "../components/HeaderComponent";
import SerieComponent from "../components/SerieComponent";

function SeriePage(){
    const [series, setSeries] = useState([
        { codigo: 1, nombre: "Friends", categoria: "Comedy", imagen: "friends.jpg" },
        { codigo: 2, nombre: "Law & Order", categoria: "Drama", imagen: "law-and-order.jpg" },
        { codigo: 3, nombre: "The Big Bang Theory", categoria: "Comedy", imagen: "tbbt" },
        { codigo: 4, nombre: "Stranger Things", categoria: "Horror", imagen: "st.jpg" },
        { codigo: 5, nombre: "Dr. House", categoria: "Drama", imagen: "dr-house.jpg" },
        { codigo: 6, nombre: "The X-Files", categoria: "Drama", imagen: "the-x-files.jpg" },
    ]);
    useEffect(() => {
        const storedData = localStorage.getItem("serieData");
        if (storedData) {
            const newSerie = JSON.parse(storedData);
            setSeries(prevSeries => {
                const updatedSeries = prevSeries.map(serie =>
                    serie.codigo === newSerie.codigo ? newSerie : serie
                );
                return updatedSeries;
            });
        }
    }, []);
    
        const handleDelete = (codigo) => {
        const updatedSeries = series.filter(serie => serie.codigo !== codigo);
        setSeries(updatedSeries);
        localStorage.setItem("serieData", JSON.stringify(updatedSeries));
    };

    return (
        <>
            <HeaderComponent />
            <div className="container mt-3">
                <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                    <h3>Series</h3>
                    <div>
                        <a className="btn btn-primary" href="#">Nuevo</a>
                    </div>
                </div>
                <div className="row">
                    {series.map((serie) => (
                    <div key={serie.codigo} className="col-md-3 mb-3">
                        <SerieComponent
                            codigo={serie.codigo}
                            nombre={serie.nombre}
                            categoria={serie.categoria}
                            imagen={serie.imagen}
                            onDelete={handleDelete}
                        />
                    </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default SeriePage;
