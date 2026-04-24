import { MapContainer, GeoJSON } from 'react-leaflet';
import { feature } from 'topojson-client';
import { useEffect, useState } from 'react';
import './App.css';

// 🔁 ROTACIÓN
function rotateFeature(feature, angle, center) {
  const rad = angle * Math.PI / 180;

  function rotateCoords(coords) {
    return coords.map(coord => {
      const [x, y] = coord;
      const dx = x - center[0];
      const dy = y - center[1];
      const newX = dx * Math.cos(rad) - dy * Math.sin(rad) + center[0];
      const newY = dx * Math.sin(rad) + dy * Math.cos(rad) + center[1];
      return [newX, newY];
    });
  }

  function processGeometry(geometry) {
    if (geometry.type === "Polygon") {
      return {
        ...geometry,
        coordinates: geometry.coordinates.map(ring => rotateCoords(ring))
      };
    }
    if (geometry.type === "MultiPolygon") {
      return {
        ...geometry,
        coordinates: geometry.coordinates.map(polygon =>
          polygon.map(ring => rotateCoords(ring))
        )
      };
    }
    return geometry;
  }

  return {
    ...feature,
    geometry: processGeometry(feature.geometry)
  };
}

export default function Map() {

  const [geoData, setGeoData] = useState(null);
  const [activeLocalidad, setActiveLocalidad] = useState(null);

  const infoLocalidades = {
    "suba": {
      titulo: "Suba",
      texto: "Suba es una localidad marcada por la historia de los pueblos indígenas que le dieron nombre y sentido. Su identidad está profundamente ligada al agua: humedales, quebradas y lagunas que han sido fuente de vida y memoria para generaciones.\n \n La Silla de la Memoria de Suba busca honrar esa raíz ancestral y ecológica. Diseñada como un punto de encuentro, combina elementos gráficos inspirados en símbolos indígenas con materiales que evocan la relación con el agua. \n \n Este proyecto se alinea con el POT Bogotá Reverdece 2022–2035, que plantea la creación de “Ciudades de 15 minutos”. La silla ofrece confort y vitalidad urbana en el mismo territorio, sin necesidad de desplazarse al centro. Además, responde a la Estructura Ecológica Principal, fortaleciendo la conexión entre habitantes y naturaleza, y visibilizando la importancia de los humedales como patrimonio ambiental y cultural. \n \n Más que un objeto, la silla es un símbolo: un espacio para descansar, recordar y reconocerse en la diversidad de Bogotá. Con ella, Suba se convierte en el primer capítulo de una red de mobiliario urbano que activa la memoria y el sentido de pertenencia en cada localidad.",
      imagen1: "/lamemoriasehabita/suba.jpeg",
  imagen2: `${import.meta.env.BASE_URL}subaFigura.jpeg`,
    },
    "candelaria": {
      titulo: "La Candelaria",
      texto: "La Candelaria es el corazón histórico de Bogotá, un lugar donde la arquitectura colonial y los relatos de la ciudad conviven con la vida diaria de sus habitantes. Según el Estudio de Percepción y Satisfacción del IDT (2025), mientras el 90% de los turistas se declaran satisfechos con su visita, los residentes locales expresan una pérdida de identidad y reclaman mobiliario que no sea únicamente escenográfico, sino funcional y pensado para su cotidianidad. \n \n La Silla de la Memoria de La Candelaria responde a esa necesidad: un mobiliario urbano que ofrece descanso y encuentro, pero también activa la memoria de quienes han marcado la historia del barrio. Inspirada en la tradición de los esmeralderos, que durante décadas hicieron de La Candelaria un epicentro de comercio, resistencia y cultura popular, la silla incorpora símbolos gráficos alusivos a la piedra verde y a la fuerza de quienes la trabajaron. A través de códigos QR, los visitantes pueden acceder a relatos digitales que narran la vida de los esmeralderos, las dinámicas de las plazas y las historias de quienes han habitado este territorio. \n \n Más que un objeto decorativo, la silla es un puente entre turismo y vida local: un espacio que permite al visitante conocer la riqueza cultural de La Candelaria y al residente recuperar un sentido de pertenencia. Así, el mobiliario urbano se convierte en un símbolo de memoria viva, donde la historia de los esmeralderos y la voz de la comunidad se integran en la experiencia diaria de la ciudad.",
      imagen1: `${import.meta.env.BASE_URL}candelaria.jpeg`,
      imagen2: ""
    },
    "kennedy": {
      titulo: "Kennedy",
      texto: "Kennedy es una de las localidades más pobladas y dinámicas de Bogotá, pero también una de las que enfrenta mayores retos en materia de espacio público. Según el Reporte de Indicadores de Espacio Público (RIEP), cada habitante cuenta con apenas 4.1 m² efectivos, muy por debajo de los 15 m² recomendados por la OMS. \n \n En 2025, la Alcaldía de Kennedy logró recuperar más de 290,000 m² de espacio público, un esfuerzo enorme para devolverle a la comunidad lugares de encuentro y convivencia. Sin embargo, estos espacios necesitan ser amoblados y dotados de propósito para evitar que vuelvan a ser invadidos o permanezcan vacíos. \n \n La Silla de la Memoria de Kennedy responde a ese desafío: un mobiliario urbano que no solo ofrece descanso, sino que activa el espacio con identidad y relatos comunitarios. Inspirada en la historia de la localidad —desde su origen como proyecto urbanístico moderno en los años 60 hasta su papel como epicentro de movimientos sociales y culturales— la silla incorpora placas conmemorativas que conectan al visitante con historias de transformación, resistencia y vida cotidiana en Kennedy. \n \n Más que un objeto, la silla es un símbolo de recuperación y pertenencia: un recordatorio de que el espacio público no es solo metros cuadrados, sino memoria viva y comunidad en acción.",
      imagen: "https://via.placeholder.com/300"
    },
    "teusaquillo": {
      titulo: "Teusaquillo",
      texto: "Ayúdanos a construir un mejor Teusaquillo.\n \n Comparte tus ideas y participa votando por: \n \n Una figura representativa del barrio - https://forms.gle/kJpY3naLNe1mKktU9; Una temática para la intervención del mobiliario urbano - https://forms.gle/VoCx735Engzmjg2p8 \n \n En esta primera fase queremos reunir ideas y pensar un Teusaquillo que viva de su memoria. Para lograrlo, te invitamos a reflexionar: ¿Qué te gustaría ver más en tu barrio? ¿Qué nos representa? ¿Qué no debemos olvidar como habitantes de Teusaquillo? \n \n Cuando tengamos las propuestas más destacadas, podrás sumarte y colaborar en las rondas de participación e innovación, que se llevarán a cabo los días XX y XX de junio.\n \n Contáctanos si quieres saber más y ser parte de una Bogotá que vive de su memoria.",
      imagen: "https://via.placeholder.com/300"
    }
  };

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}bta_localidades.json`)
      .then(res => res.json())
      .then(data => {
        const geojson = feature(data, data.objects.bta_localidades);
        const center = [-74.07, 4.71];
        const rotated = {
          ...geojson,
          features: geojson.features.map(f =>
            rotateFeature(f, -270, center)
          )
        };
        setGeoData(rotated);
      });
  }, []);

  const style = (feature) => {
    let nombre = feature.properties.NOMBRE.trim().toLowerCase();
    const colores = {
      "suba": "#60A5FA",
      "candelaria": "#4ADE80",
      "kennedy": "#FACC15",
      "teusaquillo": "#C084FC"
    };
    return {
      fillColor: colores[nombre] || "#D1D5DB",
      weight: 2.5,
      color: "#ffffff",
      fillOpacity: 1
    };
  };

  const onEachFeature = (feature, layer) => {
    const nombre = feature.properties.NOMBRE.trim().toLowerCase();
    if (infoLocalidades[nombre]) {
      layer.on('click', () => {
        setActiveLocalidad(nombre);
      });
    }
  };

  return (
    
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <MapContainer
        center={[4.71, -74.07]}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        {geoData && (
          <GeoJSON
            data={geoData}
            style={style}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>

      {activeLocalidad && (
        <div
          onClick={() => setActiveLocalidad(null)}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.45)',
            zIndex: 9998,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            className="ventana"
            onClick={e => e.stopPropagation()}
            style={{
              width: '80%',
              maxWidth: '700px',
              maxHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >

            <div className="barra">
              <span>{infoLocalidades[activeLocalidad].titulo}</span>
              <button onClick={() => setActiveLocalidad(null)}>✖</button>
            </div>
            <div
              className="contenido"
              style={{
                overflowY: 'auto',
                flex: 1,
              }}
            >
              {activeLocalidad && infoLocalidades[activeLocalidad] && (
  <div style={{ display: 'flex', gap: '8px' }}>
    
    {infoLocalidades[activeLocalidad].imagen1 && (
      <img 
        src={infoLocalidades[activeLocalidad].imagen1} 
        style={{ width: '50%', objectFit: 'cover' }} 
      />
    )}

    {infoLocalidades[activeLocalidad].imagen2 && (
      <img 
        src={infoLocalidades[activeLocalidad].imagen2} 
        style={{ width: '50%', objectFit: 'cover' }} 
      />
    )}

  </div>
)}
              <p>{infoLocalidades[activeLocalidad].texto}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
