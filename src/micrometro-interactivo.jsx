import React, { useState } from 'react';
import { Info, Move, Eye, PlayCircle } from 'lucide-react';

const MicrometroInteractivo = () => {
  const [husillo, setHusillo] = useState(0);
  const [mostrarAyuda, setMostrarAyuda] = useState(false);
  const [ejemplo, setEjemplo] = useState(0);
  const [pasoActual, setPasoActual] = useState(0);
  const [mostrarTutorial, setMostrarTutorial] = useState(true);
  const [tornilloColocado, setTornilloColocado] = useState(false);
  const [micrometroCerrado, setMicrometroCerrado] = useState(false);

  const pasosTutorial = [
    {
      titulo: "Paso 1: Preparación - Limpieza",
      descripcion: "Antes de medir, limpia cuidadosamente el micrómetro y el tornillo. Elimina cualquier suciedad, aceite o virutas metálicas con un paño suave y limpio.",
      accion: "Observa el micrómetro limpio y listo",
      husilloPos: 0,
      destacar: ["yunque", "husillo"]
    },
    {
      titulo: "Paso 2: Calibración - Puesta a cero",
      descripcion: "Gira el trinquete hasta cerrar completamente el micrómetro (sin nada entre las caras). Verifica que marque exactamente 0.00 mm. El trinquete hará 'clic-clic' cuando esté en posición.",
      accion: "Cierra el micrómetro completamente",
      husilloPos: 0,
      destacar: ["trinquete", "escala"]
    },
    {
      titulo: "Paso 3: Apertura - Preparar para medir",
      descripcion: "Gira el trinquete en sentido contrario para abrir el micrómetro. Abre más de lo necesario, dejando espacio suficiente para introducir el tornillo sin forzar.",
      accion: "Abre el micrómetro (aproximadamente 10mm)",
      husilloPos: 500,
      destacar: ["husillo", "apertura"]
    },
    {
      titulo: "Paso 4: Colocar el tornillo - Posicionamiento",
      descripcion: "Coloca el tornillo entre el yunque (parte fija) y el husillo (parte móvil). Asegúrate de que el tornillo esté perpendicular al eje del micrómetro para una medición precisa.",
      accion: "Inserta el tornillo en posición",
      husilloPos: 500,
      destacar: ["yunque", "husillo", "tornillo"],
      requiereTornillo: true
    },
    {
      titulo: "Paso 5: Ajuste inicial - Acercamiento",
      descripcion: "Gira el tambor con los dedos para acercar el husillo al tornillo. Hazlo hasta que casi toque la pieza. NO uses el trinquete todavía en esta fase.",
      accion: "Acerca el husillo (aproximadamente 6mm)",
      husilloPos: 300,
      destacar: ["tambor", "husillo"]
    },
    {
      titulo: "Paso 6: Ajuste fino - Uso del trinquete",
      descripcion: "Ahora usa SOLO el trinquete (la perilla al final). Gíralo suavemente hasta que escuches 3-4 'clics'. Estos clics indican que la presión es correcta y evitan dañar el tornillo o el micrómetro.",
      accion: "Ajusta con el trinquete (escucha los clics)",
      husilloPos: 238,
      destacar: ["trinquete"],
      medidaFinal: true
    },
    {
      titulo: "Paso 7: Lectura - Escala principal",
      descripcion: "Lee la escala principal (en el cilindro). La marca roja indica los milímetros enteros. En este caso, observa que marca entre 4 y 5, lo que significa 4 mm completos.",
      accion: "Observa la marca roja: 4 mm",
      husilloPos: 238,
      destacar: ["escala"],
      mostrarCalculo: "principal"
    },
    {
      titulo: "Paso 8: Lectura - Escala del tambor",
      descripcion: "Ahora lee la graduación del tambor que coincide con la línea de referencia horizontal. Cada división vale 0.01 mm. En este ejemplo: 38 divisiones = 0.38 mm",
      accion: "Lee el tambor: 0.38 mm",
      husilloPos: 238,
      destacar: ["tambor"],
      mostrarCalculo: "tambor"
    },
    {
      titulo: "Paso 9: Cálculo - Medida total",
      descripcion: "Suma ambas lecturas: Escala principal (4 mm) + Escala del tambor (0.38 mm) = 4.38 mm. Este es el diámetro del tornillo métrico M4.",
      accion: "Resultado: 4.38 mm → Tornillo M4",
      husilloPos: 238,
      destacar: ["resultado"],
      mostrarCalculo: "total"
    },
    {
      titulo: "Paso 10: Retirar la pieza",
      descripcion: "Gira el trinquete en sentido contrario para abrir el micrómetro. Retira cuidadosamente el tornillo. Limpia nuevamente el micrómetro y guárdalo en su estuche con el husillo ligeramente abierto.",
      accion: "Abre y retira el tornillo",
      husilloPos: 400,
      destacar: ["husillo"]
    }
  ];

  const ejemplos = [
    { mm: 4, centesimas: 38, descripcion: "4.38 mm", tornillo: "M4" },
    { mm: 6, centesimas: 12, descripcion: "6.12 mm", tornillo: "M6" },
    { mm: 8, centesimas: 5, descripcion: "8.05 mm", tornillo: "M8" },
    { mm: 10, centesimas: 0, descripcion: "10.00 mm", tornillo: "M10" }
  ];

  const aplicarEjemplo = (idx) => {
    setEjemplo(idx);
    const ej = ejemplos[idx];
    setHusillo(ej.mm * 50 + ej.centesimas);
    setTornilloColocado(true);
    setMicrometroCerrado(true);
  };

  const avanzarPaso = () => {
    if (pasoActual < pasosTutorial.length - 1) {
      const nuevoPaso = pasoActual + 1;
      setPasoActual(nuevoPaso);
      const paso = pasosTutorial[nuevoPaso];
      setHusillo(paso.husilloPos);
      
      if (paso.requiereTornillo) {
        setTornilloColocado(true);
      }
      if (paso.medidaFinal) {
        setMicrometroCerrado(true);
      }
      if (nuevoPaso === pasosTutorial.length - 1) {
        setTornilloColocado(false);
        setMicrometroCerrado(false);
      }
    }
  };

  const retrocederPaso = () => {
    if (pasoActual > 0) {
      const nuevoPaso = pasoActual - 1;
      setPasoActual(nuevoPaso);
      const paso = pasosTutorial[nuevoPaso];
      setHusillo(paso.husilloPos);
      
      if (!paso.requiereTornillo) {
        setTornilloColocado(false);
      }
      if (!paso.medidaFinal) {
        setMicrometroCerrado(false);
      }
    }
  };

  const reiniciarTutorial = () => {
    setPasoActual(0);
    setHusillo(0);
    setTornilloColocado(false);
    setMicrometroCerrado(false);
  };

  const mmEnteros = Math.floor(husillo / 50);
  const centesimas = husillo % 50;
  const medidaTotal = (mmEnteros + centesimas / 100).toFixed(2);

  const pasoActualData = pasosTutorial[pasoActual];
  const destacarElementos = pasoActualData.destacar || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Micrómetro: Medición de Tornillo Métrico
          </h1>
          <p className="text-slate-300">Tutorial paso a paso con seguimiento visual</p>
        </div>

        {mostrarTutorial && (
          <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur rounded-2xl p-6 mb-6 border border-blue-700/50 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <PlayCircle className="text-blue-400" size={32} />
                <div>
                  <h2 className="text-2xl font-bold text-blue-300">Tutorial Guiado</h2>
                  <p className="text-sm text-slate-400">Paso {pasoActual + 1} de {pasosTutorial.length}</p>
                </div>
              </div>
              <button
                onClick={() => setMostrarTutorial(false)}
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                Ocultar ✕
              </button>
            </div>

            <div className="mb-6">
              <div className="flex gap-1 mb-2">
                {pasosTutorial.map((_, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 h-2 rounded-full transition-all ${
                      idx <= pasoActual ? 'bg-blue-500' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-slate-800/70 rounded-xl p-6 mb-4 border border-slate-600">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                  {pasoActual + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-blue-300 mb-2">{pasoActualData.titulo}</h3>
                  <p className="text-slate-300 leading-relaxed mb-3">{pasoActualData.descripcion}</p>
                  <div className="bg-blue-900/50 rounded-lg p-3 border border-blue-700 inline-block">
                    <p className="text-blue-200 font-semibold">▶ {pasoActualData.accion}</p>
                  </div>
                </div>
              </div>

              {destacarElementos.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-xs text-slate-400">Enfoque en:</span>
                  {destacarElementos.map((elem, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-amber-600/30 border border-amber-500 rounded-full text-xs text-amber-200 font-semibold"
                    >
                      {elem === 'yunque' && '📍 Yunque'}
                      {elem === 'husillo' && '🔧 Husillo'}
                      {elem === 'trinquete' && '⚙️ Trinquete'}
                      {elem === 'escala' && '📏 Escala Principal'}
                      {elem === 'tambor' && '🎯 Tambor'}
                      {elem === 'tornillo' && '🔩 Tornillo'}
                      {elem === 'apertura' && '↔️ Apertura'}
                      {elem === 'resultado' && '✅ Resultado'}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 justify-between">
              <button
                onClick={retrocederPaso}
                disabled={pasoActual === 0}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  pasoActual === 0
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                ← Anterior
              </button>

              <button
                onClick={reiniciarTutorial}
                className="px-6 py-3 rounded-lg font-semibold bg-slate-700 hover:bg-slate-600 text-white transition-all"
              >
                ↻ Reiniciar
              </button>

              <button
                onClick={avanzarPaso}
                disabled={pasoActual === pasosTutorial.length - 1}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  pasoActual === pasosTutorial.length - 1
                    ? 'bg-green-700 text-green-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                {pasoActual === pasosTutorial.length - 1 ? (
                  <>Completado ✓</>
                ) : (
                  <>Siguiente →</>
                )}
              </button>
            </div>
          </div>
        )}

        {!mostrarTutorial && (
          <button
            onClick={() => setMostrarTutorial(true)}
            className="mb-6 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-all"
          >
            📚 Mostrar Tutorial Paso a Paso
          </button>
        )}

        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 mb-6 border border-slate-700 shadow-2xl">
          <div className="relative">
            <svg viewBox="0 0 800 300" className="w-full">
              <path
                d="M 100 150 Q 100 50 200 50 L 500 50 L 500 250 L 200 250 Q 100 250 100 150"
                fill="#1e293b"
                stroke={destacarElementos.includes('yunque') ? "#f59e0b" : "#475569"}
                strokeWidth={destacarElementos.includes('yunque') ? "4" : "3"}
              />
              
              <g className={destacarElementos.includes('yunque') ? 'animate-pulse' : ''}>
                <rect 
                  x="180" 
                  y="130" 
                  width="30" 
                  height="40" 
                  fill={destacarElementos.includes('yunque') ? "#f59e0b" : "#64748b"}
                  stroke="#94a3b8" 
                  strokeWidth="2"
                />
                <rect 
                  x="210" 
                  y="135" 
                  width="15" 
                  height="30" 
                  fill={destacarElementos.includes('yunque') ? "#fbbf24" : "#94a3b8"}
                />
              </g>
              
              {tornilloColocado && (
                <g className={destacarElementos.includes('tornillo') ? 'animate-pulse' : ''}>
                  <rect 
                    x={230 + (husillo / 2)} 
                    y="138" 
                    width="50" 
                    height="24" 
                    fill={destacarElementos.includes('tornillo') ? "#fb923c" : "#71717a"}
                    stroke="#52525b" 
                    strokeWidth="2"
                  />
                  <polygon
                    points={`${280 + (husillo / 2)},138 ${295 + (husillo / 2)},145 ${295 + (husillo / 2)},155 ${280 + (husillo / 2)},162`}
                    fill={destacarElementos.includes('tornillo') ? "#fb923c" : "#71717a"}
                    stroke="#52525b"
                    strokeWidth="2"
                  />
                  <line
                    x1={287 + (husillo / 2)}
                    y1="145"
                    x2={287 + (husillo / 2)}
                    y2="155"
                    stroke="#3f3f46"
                    strokeWidth="3"
                  />
                  {[...Array(8)].map((_, i) => (
                    <line
                      key={i}
                      x1={235 + i * 6 + (husillo / 2)}
                      y1="138"
                      x2={235 + i * 6 + (husillo / 2)}
                      y2="162"
                      stroke="#52525b"
                      strokeWidth="1"
                    />
                  ))}
                </g>
              )}
              
              <rect 
                x="500" 
                y="80" 
                width="180" 
                height="140" 
                fill="#334155" 
                stroke={destacarElementos.includes('escala') ? "#f59e0b" : "#475569"}
                strokeWidth={destacarElementos.includes('escala') ? "4" : "2"}
                rx="5"
              />
              
              {[...Array(21)].map((_, i) => (
                <g key={i}>
                  <line
                    x1="510"
                    y1={90 + i * 6}
                    x2={i % 2 === 0 ? "530" : "520"}
                    y2={90 + i * 6}
                    stroke={destacarElementos.includes('escala') ? "#fbbf24" : "#94a3b8"}
                    strokeWidth={i % 2 === 0 ? "2" : "1"}
                  />
                  {i % 2 === 0 && (
                    <text 
                      x="535" 
                      y={95 + i * 6} 
                      fill={destacarElementos.includes('escala') ? "#fbbf24" : "#e2e8f0"}
                      fontSize="12" 
                      fontWeight="bold"
                    >
                      {i / 2}
                    </text>
                  )}
                </g>
              ))}
              
              <line
                x1="500"
                y1={90 + mmEnteros * 12}
                x2="510"
                y2={90 + mmEnteros * 12}
                stroke={destacarElementos.includes('escala') ? "#fbbf24" : "#ef4444"}
                strokeWidth="3"
                className={destacarElementos.includes('escala') ? 'animate-pulse' : ''}
              />
              
              <polygon
                points={`500,${90 + mmEnteros * 12} 490,${85 + mmEnteros * 12} 490,${95 + mmEnteros * 12}`}
                fill={destacarElementos.includes('escala') ? "#fbbf24" : "#ef4444"}
                className={destacarElementos.includes('escala') ? 'animate-pulse' : ''}
              />
              
              <g transform={`rotate(${husillo * 7.2}, 680, 150)`}>
                <ellipse 
                  cx="680" 
                  cy="150" 
                  rx="60" 
                  ry="70" 
                  fill="#1e40af" 
                  stroke={destacarElementos.includes('tambor') ? "#f59e0b" : "#3b82f6"}
                  strokeWidth={destacarElementos.includes('tambor') ? "4" : "3"}
                />
                
                {[...Array(50)].map((_, i) => {
                  const angle = (i * 360) / 50;
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 680 + 55 * Math.cos(rad);
                  const y1 = 150 + 65 * Math.sin(rad);
                  const x2 = 680 + (i % 5 === 0 ? 40 : 48) * Math.cos(rad);
                  const y2 = 150 + (i % 5 === 0 ? 50 : 58) * Math.sin(rad);
                  
                  return (
                    <g key={i}>
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={destacarElementos.includes('tambor') ? "#fbbf24" : "#60a5fa"}
                        strokeWidth={i % 5 === 0 ? "2" : "1"}
                      />
                      {i % 5 === 0 && (
                        <text
                          x={680 + 30 * Math.cos(rad)}
                          y={150 + 40 * Math.sin(rad)}
                          fill={destacarElementos.includes('tambor') ? "#fef3c7" : "#e0f2fe"}
                          fontSize="11"
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {50 - i}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
              
              <g className={destacarElementos.includes('husillo') || destacarElementos.includes('apertura') ? 'animate-pulse' : ''}>
                <rect 
                  x={225 + (husillo / 2)} 
                  y="135" 
                  width={275 - (husillo / 2)} 
                  height="30" 
                  fill={destacarElementos.includes('husillo') ? "#f59e0b" : "#475569"}
                  stroke="#64748b"
                  strokeWidth="2"
                />
                <rect 
                  x={225 + (husillo / 2)} 
                  y="140" 
                  width="20" 
                  height="20" 
                  fill={destacarElementos.includes('husillo') ? "#fbbf24" : "#94a3b8"}
                />
              </g>
              
              <g className={destacarElementos.includes('trinquete') ? 'animate-pulse' : ''}>
                <circle 
                  cx="750" 
                  cy="150" 
                  r="25" 
                  fill="#1e3a8a" 
                  stroke={destacarElementos.includes('trinquete') ? "#f59e0b" : "#3b82f6"}
                  strokeWidth={destacarElementos.includes('trinquete') ? "4" : "2"}
                />
                <circle cx="750" cy="150" r="15" fill="#1e40af"/>
                {[...Array(8)].map((_, i) => {
                  const angle = (i * 360) / 8;
                  const rad = (angle * Math.PI) / 180;
                  return (
                    <line
                      key={i}
                      x1="750"
                      y1="150"
                      x2={750 + 20 * Math.cos(rad)}
                      y2={150 + 20 * Math.sin(rad)}
                      stroke={destacarElementos.includes('trinquete') ? "#fbbf24" : "#60a5fa"}
                      strokeWidth="2"
                    />
                  );
                })}
              </g>
              
              <text x="150" y="180" fill="#cbd5e1" fontSize="14" fontWeight="bold">Yunque</text>
              <text x="300" y="180" fill="#cbd5e1" fontSize="14" fontWeight="bold">Husillo</text>
              <text x="510" y="240" fill="#cbd5e1" fontSize="14" fontWeight="bold">Escala Principal</text>
              <text x="660" y="240" fill="#cbd5e1" fontSize="14" fontWeight="bold">Tambor</text>
              <text x="740" y="200" fill="#cbd5e1" fontSize="14" fontWeight="bold">Trinquete</text>
            </svg>
          </div>
          
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-4">
              <Move className="text-blue-400" size={24} />
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-2 text-slate-300">
                  Control manual (para experimentar):
                </label>
                <input
                  type="range"
                  min="0"
                  max="700"
                  value={husillo}
                  onChange={(e) => setHusillo(parseInt(e.target.value))}
                  className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`backdrop-blur rounded-2xl p-6 mb-6 border shadow-xl ${
          destacarElementos.includes('resultado') 
            ? 'bg-gradient-to-br from-green-900/60 to-emerald-900/60 border-green-500 animate-pulse' 
            : 'bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-700/50'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <Eye className="text-green-400" size={28} />
            <h2 className="text-2xl font-bold text-green-300">Lectura Actual</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className={`rounded-xl p-4 border ${
              pasoActualData.mostrarCalculo === 'principal'
                ? 'bg-amber-900/50 border-amber-500 animate-pulse'
                : 'bg-slate-800/50 border-slate-600'
            }`}>
              <div className="text-slate-400 text-sm mb-1">Escala Principal</div>
              <div className="text-3xl font-bold text-cyan-400">{mmEnteros} mm</div>
              {pasoActualData.mostrarCalculo === 'principal' && (
                <div className="text-xs text-amber-300 mt-2">← Lee aquí primero</div>
              )}
            </div>
            
            <div className={`rounded-xl p-4 border ${
              pasoActualData.mostrarCalculo === 'tambor'
                ? 'bg-amber-900/50 border-amber-500 animate-pulse'
                : 'bg-slate-800/50 border-slate-600'
            }`}>
              <div className="text-slate-400 text-sm mb-1">Escala del Tambor</div>
              <div className="text-3xl font-bold text-blue-400">0.{centesimas.toString().padStart(2, '0')} mm</div>
              {pasoActualData.mostrarCalculo === 'tambor' && (
                <div className="text-xs text-amber-300 mt-2">← Luego aquí</div>
              )}
            </div>
            
            <div className={`rounded-xl p-4 border shadow-lg ${
              pasoActualData.mostrarCalculo === 'total' || destacarElementos.includes('resultado')
                ? 'bg-gradient-to-br from-green-600 to-emerald-600 border-green-400 animate-pulse'
                : 'bg-gradient-to-br from-green-700 to-emerald-700 border-green-500'
            }`}>
              <div className="text-green-100 text-sm mb-1 font-semibold">Medida Total</div>
              <div className="text-4xl font-bold text-white">{medidaTotal} mm</div>
              {micrometroCerrado && parseFloat(medidaTotal) >= 4.35 && parseFloat(medidaTotal) <= 4.45 && (
                <div className="text-sm text-green-100 mt-2 font-semibold">🔩 Tornillo M4</div>
              )}
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-slate-800/70 rounded-lg border border-slate-600">
            <p className="text-slate-300 text-sm">
              <span className="font-semibold text-cyan-400">Cálculo:</span> {mmEnteros} mm + 0.{centesimas.toString().padStart(2, '0')} mm = {medidaTotal} mm
            </p>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 mb-6 border border-slate-700">
          <h3 className="text-xl font-bold mb-4 text-blue-300">⚡ Otros Tornillos Métricos</h3>
          <p className="text-slate-400 text-sm mb-4">Prueba medir estos tornillos comunes:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ejemplos.map((ej, idx) => (
              <button
                key={idx}
                onClick={() => aplicarEjemplo(idx)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  ejemplo === idx
                    ? 'bg-blue-600 border-blue-400 shadow-lg scale-105'
                    : 'bg-slate-700 border-slate-600 hover:border-blue-500'
                }`}
              >
                <div className="text-2xl font-bold text-white mb-1">{ej.descripcion}</div>
                <div className="text-xs text-slate-300">{ej.tornillo}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
          <button
            onClick={() => setMostrarAyuda(!mostrarAyuda)}
            className="flex items-center gap-2 text-xl font-bold mb-4 text-amber-400 hover:text-amber-300 transition-colors w-full"
          >
            <Info size={24} />
            Guía de Referencia Rápida
            <span className="text-sm ml-2">{mostrarAyuda ? '▼' : '▶'}</span>
          </button>
          
          {mostrarAyuda && (
            <div className="space-y-4 text-slate-300">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-blue-500">
                  <h4 className="font-bold text-blue-300 mb-2">🎯 Puntos Clave</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Siempre limpia antes de medir</li>
                    <li>Calibra a cero sin pieza</li>
                    <li>Usa el trinquete para el ajuste final</li>
                    <li>Escucha los clics (3-4 es ideal)</li>
                    <li>No fuerces el cierre</li>
                  </ul>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-green-500">
                  <h4 className="font-bold text-green-300 mb-2">📏 Lectura</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Escala principal: mm enteros</li>
                    <li>Tambor: centésimas (0.01 mm)</li>
                    <li>Suma ambas lecturas</li>
                    <li>Precisión: ±0.01 mm</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-purple-500">
                <h4 className="font-bold text-purple-300 mb-2">🔩 Tornillos Métricos Comunes</h4>
                <div className="text-sm grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div>M3: ~3.0 mm</div>
                  <div>M4: ~4.0 mm</div>
                  <div>M5: ~5.0 mm</div>
                  <div>M6: ~6.0 mm</div>
                  <div>M8: ~8.0 mm</div>
                  <div>M10: ~10.0 mm</div>
                  <div>M12: ~12.0 mm</div>
                  <div>M16: ~16.0 mm</div>
                </div>
              </div>
              
              <div className="bg-amber-900/30 rounded-lg p-4 border border-amber-700">
                <p className="text-sm text-amber-200">
                  <strong>⚠️ Importante:</strong> Cada vuelta completa del tambor avanza el husillo 0.50 mm. 
                  El tambor tiene 50 divisiones, por lo que cada división = 0.01 mm. Para medir la longitud 
                  del tornillo necesitarías un calibre o pie de rey.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MicrometroInteractivo;