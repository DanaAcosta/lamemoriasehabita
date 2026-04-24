# La Memoria Se Habita — B.I.T.
**Bogotá, Interacción y Territorio**  
John Lozada · Dana Acosta

Mapa interactivo de las localidades de Bogotá construido con React y Leaflet. Al hacer clic en una localidad resaltada, aparece una ventana estilo retro con información, imágenes y texto sobre cada lugar.

---

## Estructura del proyecto

```
LAMEMORIASEHABITA/
├── public/
│   ├── bta_localidades.json   # TopoJSON con las localidades de Bogotá
│   ├── candelaria.jpeg        # Imagen de La Candelaria
│   ├── suba.jpeg              # Imagen principal de Suba
│   ├── subaFigura.jpeg        # Imagen secundaria de Suba
│   ├── favicon.svg            # Ícono de la pestaña del navegador
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── App.css                # Estilos globales y de la ventana emergente
│   ├── App.jsx                # Layout general (Header + Map)
│   ├── Header.jsx             # Encabezado con el título del proyecto
│   ├── index.css              # Estilos base
│   ├── main.jsx               # Punto de entrada de React
│   └── map.jsx                # Componente principal del mapa
├── index.html                 # HTML raíz (aquí va el favicon)
├── vite.config.js
├── package.json
└── README.md
```

---

## Dependencias principales

```bash
npm install react-leaflet leaflet topojson-client
```

---

## Cómo funciona

### Mapa (`src/map.jsx`)

- Carga `public/bta_localidades.json` (TopoJSON) y lo convierte a GeoJSON con `topojson-client`.
- Aplica una rotación de `-270°` sobre el centro `[-74.07, 4.71]` para orientar correctamente el mapa.
- Colorea las localidades configuradas con un color distinto; el resto aparece en gris.
- Al hacer clic en una localidad configurada, muestra una ventana emergente con título, imágenes y texto.

### Localidades configuradas

| Localidad     | Color    | Imágenes                          |
|---------------|----------|-----------------------------------|
| Suba          | Azul     | `suba.jpeg`, `subaFigura.jpeg`    |
| La Candelaria | Verde    | `candelaria.jpeg`                 |
| Kennedy       | Amarillo | —                                 |
| Teusaquillo   | Morado   | —                                 |

Para agregar más localidades, edita el objeto `infoLocalidades` y el objeto `colores` dentro de `map.jsx`.

---

## Ventana emergente

La ventana aparece donde el usuario hace clic. Tiene estilo retro (inspirado en Windows 95), definido en `App.css`.

### Estructura de cada localidad en `map.jsx`

```js
"nombre_en_minusculas": {
  titulo: "Nombre visible",
  texto: "Párrafo 1.\n\nPárrafo 2.\n\nPárrafo 3.",
  imagen1: "/suba.jpeg",
  imagen2: "/subaFigura.jpeg"  // opcional — omitir si solo hay una imagen
}
```

> Las imágenes están en `public/`, por eso la ruta empieza con `/` directamente.

- Los párrafos se separan con `\n\n` y el CSS usa `white-space: pre-line` para renderizarlos.
- `imagen2` es opcional: si no se define, `imagen1` ocupa el ancho completo.

### JSX de las imágenes (en `map.jsx`)

```jsx
<div style={{ display: 'flex', gap: '8px' }}>
  <img
    src={infoLocalidades[activeLocalidad].imagen1}
    style={{
      width: infoLocalidades[activeLocalidad].imagen2 ? '50%' : '100%',
      objectFit: 'cover'
    }}
  />
  {infoLocalidades[activeLocalidad].imagen2 && (
    <img
      src={infoLocalidades[activeLocalidad].imagen2}
      style={{ width: '50%', objectFit: 'cover' }}
    />
  )}
</div>
```

---

## Estilos (`src/App.css`)

```css
/* Fondo general de la app */
body {
  background-color: #f0ece4;
  margin: 0;
}

/* Color de letra y párrafos en la ventana */
.contenido p {
  color: #1a1a1a;
  white-space: pre-line;   /* respeta los \n\n como saltos de párrafo */
  margin-bottom: 12px;
}

/* Ventana emergente */
.ventana   { width: 320px; background: #c0c0c0; border: 2px solid black; box-shadow: 4px 4px 0 black; }
.barra     { background: navy; color: white; padding: 5px; display: flex; justify-content: space-between; }
.contenido { padding: 10px; }
```

---

## Layout general (`src/App.jsx`)

```jsx
import Header from './Header';
import Map from './map';
import './App.css';

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div style={{ flex: 1 }}>
        <Map />
      </div>
    </div>
  );
}
```

> El `MapContainer` en `map.jsx` debe tener `height: "100%"` (no `100vh`) para respetar el espacio que le deja el header.

---

## Encabezado (`src/Header.jsx`)

Muestra el título a la izquierda y los créditos a la derecha. Los estilos viven en `App.css`.

```
┌─────────────────────────────────────────────────────┐
│  LA MEMORIA                         B.I.T            │
│  SE HABITA          (BOGOTÁ, INTERACCIÓN Y TERRITORIO)│
│                     JOHN LOZADA     DANA ACOSTA       │
└─────────────────────────────────────────────────────┘
```

---

## Ícono de la pestaña (favicon)

El favicon actual es `public/favicon.svg`. Para cambiarlo, edita `index.html`:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

Para usar un `.png` o `.ico`, reemplaza el archivo en `public/` y actualiza la línea anterior. Puedes convertir imágenes en [favicon.io](https://favicon.io).

---

## Agregar una nueva localidad

1. Copia la imagen a `public/`.
2. En `map.jsx`, agrega el color en el objeto `colores`:
```js
"usaquén": "#F97316"
```
3. Agrega la info en `infoLocalidades`:
```js
"usaquén": {
  titulo: "Usaquén",
  texto: "Descripción de la localidad.\n\nSegundo párrafo.",
  imagen1: "/usaquen.jpeg"
}
```

---

## Posibles mejoras

- Agregar más localidades con información, imágenes y colores propios.
- Hacer la ventana emergente arrastrable.
- Agregar animación de entrada a la ventana.
- Hacer el diseño responsive para móvil.
