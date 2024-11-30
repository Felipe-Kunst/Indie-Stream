import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import BoxProjetos from "../BoxProjetos/BoxProjetos";
import styles from "./ProjetosDestaqueLogado.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProjetosDestaqueLogado.global.css"; // Importa o CSS global

const ProjetoDestaqueLogado = () => {
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/projetos")
      .then((response) => response.json())
      .then((data) => setProjetos(data))
      .catch((error) => console.error("Erro ao buscar projetos:", error));
  }, []);

  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          color: "#ffd700",
          fontSize: "40px",
        }}
        onClick={onClick}
      />
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: "#ffd700" }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerPadding: "0", // Remove o padding lateral
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Projetos em Destaque</h2>
      <Slider {...settings} className={`${styles.slider} slick-slider`}>
        {projetos.map((projeto) => (
          <div key={projeto.id} className={`${styles.slide} slick-slide`}>
            <BoxProjetos projeto={projeto} />
          </div>
        ))}
      </Slider>
      <a href="/projetos" className={styles.link}>
        Ver todos os resultados em projetos
      </a>
    </div>
  );
};

export default ProjetoDestaqueLogado;
