import HeaderComponent from "../components/HeaderComponent";

function HomePage() {
  return (
    <>
      <HeaderComponent />

      {/* Imagen de banner */}
      <div className="container-fluid px-0">
        <img
          src="/images/banner.jpg"
          alt="Banner principal"
          className="img-fluid w-100"
          style={{ objectFit: "cover", maxHeight: "500px" }}
        />
      </div>

      {/* Contenido textual */}
      <div className="container my-5 text-dark">
        {/* Título principal */}
        <h1 className="display-4 text-center mb-4 fw-bold">Bienvenido a Nuestra Plataforma</h1>

        {/* Texto descriptivo */}
        <p className="lead text-center mb-5">
          Todo en un solo lugar
        </p>

        {/* Sección con 3 columnas */}
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold">Mejores series</h4>
            <p>Descubre herramientas poderosas para mejorar tu productividad en segundos.</p>
          </div>
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold">Mejores cotegorias</h4>
            <p>Interfaz amigable que se adapta a tus necesidades diarias con facilidad.</p>
          </div>
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold">Mejores </h4>
            <p>Soporte técnico eficiente y disponible para ayudarte en todo momento.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;