let unitMode = 'metric';

document.querySelectorAll('.unit-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    unitMode = btn.dataset.unit;
    document.getElementById('metricInputs').classList.toggle('hidden', unitMode !== 'metric');
    document.getElementById('imperialInputs').classList.toggle('hidden', unitMode !== 'imperial');
    document.getElementById('result').classList.add('hidden');
  });
});

document.getElementById('calcBtn').addEventListener('click', calculate);

function calculate() {
  let heightM, weightKg;

  if (unitMode === 'metric') {
    const cm = parseFloat(document.getElementById('heightCm').value);
    const kg = parseFloat(document.getElementById('weightKg').value);
    if (!cm || !kg) return alert('Please enter height and weight.');
    heightM = cm / 100;
    weightKg = kg;
  } else {
    const ft = parseFloat(document.getElementById('heightFt').value) || 0;
    const inches = parseFloat(document.getElementById('heightIn').value) || 0;
    const lb = parseFloat(document.getElementById('weightLb').value);
    if ((!ft && !inches) || !lb) return alert('Please enter height and weight.');
    heightM = (ft * 12 + inches) * 0.0254;
    weightKg = lb * 0.453592;
  }

  const bmi = weightKg / (heightM * heightM);
  showResult(bmi, weightKg, heightM);
}

function showResult(bmi, weightKg, heightM) {
  const { label, color } = getCategory(bmi);
  const idealMin = (18.5 * heightM * heightM).toFixed(1);
  const idealMax = (24.9 * heightM * heightM).toFixed(1);

  document.getElementById('bmiValue').textContent = bmi.toFixed(1);

  const labelEl = document.getElementById('bmiLabel');
  labelEl.textContent = label;
  labelEl.style.background = color + '22';
  labelEl.style.color = color;

  // Scale marker: BMI 10–40 maps to 0–100%
  const pct = Math.min(100, Math.max(0, ((bmi - 10) / 30) * 100));
  document.getElementById('scaleMarker').style.left = `${pct}%`;

  document.getElementById('idealWeight').textContent =
    `Ideal weight for your height: ${idealMin} – ${idealMax} kg`;

  document.getElementById('result').classList.remove('hidden');
}

function getCategory(bmi) {
  if (bmi < 18.5) return { label: 'Underweight', color: '#38bdf8' };
  if (bmi < 25)   return { label: 'Normal Weight', color: '#22c55e' };
  if (bmi < 30)   return { label: 'Overweight', color: '#facc15' };
  return               { label: 'Obese', color: '#ef4444' };
}
