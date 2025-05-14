// components/PromoBanner.jsx
import React from 'react';

const PromoBanner = ({ promo }) => {
  return (
    <section className="promo-banner section--promo">
      <div className="container d-flex a-items-center j-content-between f-wrap g-4">
        <div className="promo-banner__content">
          <h3 className="promo-banner__title c-primary">{promo.title}</h3>
          <p className="promo-banner__description c-secondary">{promo.description}</p>
          <span className="promo-banner__code btn btn--secondary">{promo.code}</span>
        </div>
        <img 
          src={promo.image} 
          alt={promo.title}
          className="promo-banner__image"
        />
      </div>
    </section>
  );
};

export default PromoBanner;
