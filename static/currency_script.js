// =========================
// ✅ Currency Conversion
// =========================

async function fetchRates(base) {
  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${base}`);
    if (!res.ok) throw new Error("Network response was not ok");
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

let ratesData = {};

async function updateRatesAndConvert() {
  const amount = parseFloat(document.getElementById("amount").value) || 0;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const errorMessage = document.getElementById("error-message");
  const updatedAt = document.getElementById("updated-at");

  errorMessage.textContent = "";
  updatedAt.textContent = "";

  if (ratesData.base !== from || !ratesData.rates) {
    try {
      const data = await fetchRates(from);
      if (data.result === "success") {
        ratesData = { base: from, rates: data.rates, time_last_update_utc: data.time_last_update_utc };
      } else {
        errorMessage.textContent = "Failed to fetch exchange rate. Please try again later.";
        return;
      }
    } catch {
      errorMessage.textContent = "Failed to fetch exchange rate. Please check your internet and try again.";
      return;
    }
  }

  const rate = ratesData.rates[to];
  if (rate) {
    document.getElementById("conversion-result").textContent = `${amount} ${from} equals`;
    document.getElementById("converted-amount").textContent = (amount * rate).toLocaleString(undefined, {
      style: "currency", currency: to, minimumFractionDigits: 2, maximumFractionDigits: 2
    });
    document.getElementById("exchange-rate").textContent = `1 ${from} = ${rate} ${to}`;

    if (ratesData.time_last_update_utc) {
      updatedAt.textContent = `Updated at: ${ratesData.time_last_update_utc}`;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("amount").addEventListener("input", updateRatesAndConvert);
  document.getElementById("from").addEventListener("change", updateRatesAndConvert);
  document.getElementById("to").addEventListener("change", updateRatesAndConvert);

  document.getElementById("switch").addEventListener("click", () => {
    const fromE = document.getElementById("from");
    const toE = document.getElementById("to");
    [fromE.value, toE.value] = [toE.value, fromE.value];
    updateRatesAndConvert();
  });

  updateRatesAndConvert();
});

// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-theme');
  if (!toggleBtn) return;

  function applyTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
      toggleBtn.textContent = '☀️'; // Sun icon
    } else {
      document.documentElement.classList.remove('dark-theme');
      toggleBtn.textContent = '🌙'; // Moon icon
    }
  }

  applyTheme();

  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    applyTheme();
  });
});
