// ===== LÓGICA: CALCULADORA (semana 7) =====
function validar(textoA, textoB) {
  const tA = textoA.trim();
  const tB = textoB.trim();
  if (tA === "" || tB === "") return { ok: false, mensaje: "Complete las dos entradas." };
  const a = Number(tA);
  const b = Number(tB);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return { ok: false, mensaje: "Escriba números válidos." };
  return { ok: true, a: a, b: b };
}

function calcular(operacion, textoA, textoB) {
  const v = validar(textoA, textoB);
  if (!v.ok) return v.mensaje;
  if (operacion === "sumar") return "Suma: " + (v.a + v.b);
  if (operacion === "dividir") {
    if (v.b === 0) return "No se puede dividir entre cero.";
    return "División: " + (v.a / v.b);
  }
  return "Operación desconocida.";
}

// ===== LÓGICA: CONVERSOR (semana 9) =====
// Datos (lista de objetos, formato JSON): cada conversión tiene un factor.
const CONVERSIONES = [
  { id: "m-cm",  etiqueta: "Metros a centímetros",   desde: "m",  hasta: "cm", factor: 100 },
  { id: "cm-m",  etiqueta: "Centímetros a metros",   desde: "cm", hasta: "m",  factor: 0.01 },
  { id: "kg-g",  etiqueta: "Kilogramos a gramos",    desde: "kg", hasta: "g",  factor: 1000 },
  { id: "g-kg",  etiqueta: "Gramos a kilogramos",    desde: "g",  hasta: "kg", factor: 0.001 }
];

// Validación: vacío ANTES de convertir; luego no finito; luego negativo.
function validarConversion(texto) {
  const t = texto.trim();
  if (t === "") return { ok: false, mensaje: "Escriba un valor." };
  const n = Number(t);
  if (!Number.isFinite(n)) return { ok: false, mensaje: "Escriba un número válido." };
  if (n < 0) return { ok: false, mensaje: "El valor no puede ser negativo." };
  return { ok: true, valor: n };
}

// Cálculo: busca el objeto por id y multiplica por su factor.
function convertir(idConversion, texto) {
  const v = validarConversion(texto);
  if (!v.ok) return v.mensaje;
  const c = CONVERSIONES.find(function (x) { return x.id === idConversion; });
  if (!c) return "Conversión desconocida.";
  const resultado = Number((v.valor * c.factor).toFixed(6)); // evita 0.1*100=10.000000000000002
  return v.valor + " " + c.desde + " = " + resultado + " " + c.hasta;
}
// ===== FIN DE LA LÓGICA =====

// ===== INTERFAZ =====
if (typeof document !== "undefined") {
  const entradaA = document.getElementById("entradaA");
  const entradaB = document.getElementById("entradaB");
  const salida = document.getElementById("salida");
  document.getElementById("btnSumar").addEventListener("click", function () {
    salida.textContent = calcular("sumar", entradaA.value, entradaB.value);
  });
  document.getElementById("btnDividir").addEventListener("click", function () {
    salida.textContent = calcular("dividir", entradaA.value, entradaB.value);
  });

  const tipoConv = document.getElementById("tipoConv");
  CONVERSIONES.forEach(function (c) {
    const op = document.createElement("option");
    op.value = c.id;
    op.textContent = c.etiqueta;
    tipoConv.appendChild(op);
  });
  document.getElementById("btnConvertir").addEventListener("click", function () {
    document.getElementById("salidaConv").textContent =
      convertir(tipoConv.value, document.getElementById("valorConv").value);
  });
}
if (typeof module !== "undefined") module.exports = { validar, calcular, convertir, CONVERSIONES };
