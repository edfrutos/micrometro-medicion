# Micrómetro - Medición de Tornillo

Aplicación web interactiva para aprender a usar un micrómetro en la medición de tornillos métricos.

## 🎯 Descripción

Tutorial interactivo paso a paso que enseña cómo utilizar correctamente un micrómetro para medir tornillos. Incluye visualizaciones dinámicas, ejemplos prácticos y una guía de referencia completa.

## ✨ Características

### 📚 Tutorial Paso a Paso (10 pasos)
1. Preparación y limpieza
2. Calibración a cero
3. Apertura del micrómetro
4. Colocación del tornillo
5. Ajuste inicial
6. Ajuste fino con trinquete
7. Lectura de escala principal
8. Lectura del tambor
9. Cálculo de medida total
10. Retirada de la pieza

### 🎨 Elementos Visuales
- Micrómetro completo con todas sus partes
- Tornillo que aparece/desaparece según el paso
- Resaltado dinámico de las partes relevantes
- Animaciones de pulso para enfatizar
- Colores que cambian según el elemento enfocado

### 🎮 Controles Interactivos
- Botones de navegación (Anterior/Siguiente/Reiniciar)
- Barra de progreso visual
- Control deslizante manual para experimentar
- Ejemplos rápidos de diferentes tornillos (M4, M6, M8, M10)

### 📊 Panel de Lectura
- Muestra en tiempo real las tres lecturas
- Resalta la lectura correspondiente a cada paso
- Calcula automáticamente la medida total
- Identifica el tipo de tornillo

### 📖 Guía de Referencia
- Puntos clave para recordar
- Cómo leer correctamente
- Tabla de tornillos métricos comunes
- Consejos importantes

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js (v14 o superior)
- npm (v6 o superior)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/edfrutos/micrometro-medicion.git

# Navegar al directorio del proyecto
cd micrometro-medicion

# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo (puerto 3001)
npm run dev

# O usar el comando estándar
npm start
```

La aplicación se abrirá automáticamente en [http://localhost:3001](http://localhost:3001)

### Producción

```bash
# Crear build de producción
npm run build

# El build estará en la carpeta /build
```

## 🛠️ Tecnologías

- **React** 19.2.3 - Framework principal
- **Tailwind CSS** 3.4.19 - Estilos
- **Lucide React** 0.562.0 - Iconos
- **Create React App** 5.0.1 - Configuración base

## 📁 Estructura del Proyecto

```
micrometro-medicion/
├── public/              # Archivos públicos
├── src/
│   ├── App.js          # Componente principal
│   ├── App.css         # Estilos de la aplicación
│   ├── index.js        # Punto de entrada
│   ├── index.css       # Estilos globales con Tailwind
│   └── micrometro-interactivo.jsx  # Componente del micrómetro
├── .env                # Variables de entorno (puerto)
├── .gitignore          # Archivos ignorados por Git
├── package.json        # Dependencias y scripts
├── tailwind.config.js  # Configuración de Tailwind
└── README.md           # Este archivo
```

## 🔧 Configuración

### Puerto del Servidor
El servidor de desarrollo está configurado para ejecutarse en el puerto 3001. Puedes cambiar esto editando el archivo `.env`:

```env
PORT=3001
```

## 📝 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run dev` - Alias para npm start
- `npm run build` - Crea build de producción
- `npm test` - Ejecuta los tests
- `npm run eject` - Expone la configuración de Create React App

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

**Eduardo de Frutos**
- GitHub: [@edfrutos](https://github.com/edfrutos)

## 🔗 Enlaces

- Repositorio: [https://github.com/edfrutos/micrometro-medicion](https://github.com/edfrutos/micrometro-medicion)
- Documentación adicional: Ver `Micrómetro-Medición de tornillo.md`

## 📚 Recursos Adicionales

Para más información sobre el uso del micrómetro y medición de tornillos, consulta el archivo `Micrómetro-Medición de tornillo.md` incluido en el proyecto.
