const total = document.querySelector("#total");
const selecMoneda = document.querySelector("#select");
const inputMoneda = document.querySelector("#input");
const Calcular = document.querySelector("#calcular");

const getApi = async url => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    renderDom(data);
  } catch (error) {
    console.error("Error:", error);
    total.innerHTML = "Error al cargar los datos.";
  }
};

const renderDom = data => {
  const valorDolar = Math.trunc(data.dolar.valor);
  const valorEuro = Math.trunc(data.euro.valor);

  const monedaDif = selecMoneda.value;
  const montoIngresado = parseFloat(inputMoneda.value);

  if (isNaN(montoIngresado) || montoIngresado <= 0) {
    total.innerHTML = "Ingresa un monto válido.";
    return;
  }

  const calcularDolar = montoIngresado / valorDolar;
  const calcularEuro = montoIngresado / valorEuro;

  const formatoDolar = calcularDolar.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  const formatoEuro = calcularEuro.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });

  if (monedaDif === "dolar") {
    total.innerHTML = `<p>Monto: ${formatoDolar} ${data.dolar.codigo}</p>`;
  } else if (monedaDif === "euro") {
    total.innerHTML = `<p>Monto: ${formatoEuro} ${data.euro.codigo}</p>`;
  } else {
    total.innerHTML = `<p>Selecciona una moneda</p>`;
  }
};

const llamarApi = () => {
  getApi("https://mindicador.cl/api/");
};

Calcular.addEventListener("click", llamarApi);
