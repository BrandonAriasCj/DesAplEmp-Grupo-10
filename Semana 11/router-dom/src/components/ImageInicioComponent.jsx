function ImageCardComponent({ src, alt, title }) {
  return (
    <div className="col-12 col-sm-6 col-md-4">
      <div className="card shadow-sm h-100">
        <img src={src} alt={alt} className="card-img-top" />
        {title && (
          <div className="card-body">
            <h5 className="card-title text-center">{title}</h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageCardComponent;
