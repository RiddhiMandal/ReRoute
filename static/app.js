let allCities = [];
let map = null;
let markersLayer = null;
let selectedCityId = null;
let healthcareMap = null;
let safetyMap = null;

const TIER_COLOR = { affordable: "#1b8e5a", moderate: "#e0a530", expensive: "#c0392b" };
const CITY_SELECT_IDS = ["housing-city-select", "healthcare-city-select", "safety-city-select", "employment-city-select", "community-city-select"];

// ---------- Login gate ----------

function showLoginForm(type) {
  document.getElementById("login-choice").classList.toggle("hidden", !!type);
  document.getElementById("signup-form").classList.toggle("hidden", type !== "signup");
  document.getElementById("signin-form").classList.toggle("hidden", type !== "signin");
}

function skipLogin() {
  enterApp(null);
}

function submitSignup() {
  const name = document.getElementById("su-name").value.trim();
  if (!name) { alert("Please enter your name"); return; }
  localStorage.setItem("reroute_name", name);
  enterApp(name);
}

function submitSignin() {
  const email = document.getElementById("si-email").value.trim();
  if (!email) { alert("Please enter your email"); return; }
  const name = localStorage.getItem("reroute_name") || email.split("@")[0];
  enterApp(name);
}

function enterApp(name) {
  document.getElementById("login-gate").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  document.getElementById("welcome-msg").textContent = name ? `Welcome, ${name}` : "";
  initApp();
}

// ---------- Tabs ----------

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(`${tab.dataset.tab}-panel`).classList.add("active");
    if (tab.dataset.tab === "map" && map) setTimeout(() => map.invalidateSize(), 50);
    if (tab.dataset.tab === "healthcare" && healthcareMap) setTimeout(() => healthcareMap.invalidateSize(), 50);
    if (tab.dataset.tab === "safety" && safetyMap) setTimeout(() => safetyMap.invalidateSize(), 50);
  });
});

function goToTab(tabId) {
  document.querySelector(`.tab[data-tab="${tabId}"]`).click();
}

// ---------- App init ----------

async function initApp() {
  const res = await fetch("/api/cities");
  const data = await res.json();
  allCities = data.cities;

  initMap();
  applyFilters();
  populateCitySelects();
  initChatbot();
}

function initMap() {
  map = L.map("leaflet-map").setView([43.75, -79.55], 9);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 18,
  }).addTo(map);
  markersLayer = L.layerGroup().addTo(map);
}

// ---------- Filters + Map markers ----------

function onBudgetInput() {
  document.getElementById("f-budget-val").textContent = "$" + document.getElementById("f-budget").value;
}
function onDistanceInput() {
  document.getElementById("f-distance-val").textContent = document.getElementById("f-distance").value + " km";
}

function resetFilters() {
  document.getElementById("f-budget").value = 3000;
  document.getElementById("f-distance").value = 80;
  document.getElementById("f-bedroom").value = "1br";
  onBudgetInput();
  onDistanceInput();
  applyFilters();
}

async function applyFilters() {
  const budget = document.getElementById("f-budget").value;
  const distance = document.getElementById("f-distance").value;
  const bedroom = document.getElementById("f-bedroom").value;

  const res = await fetch(`/api/cities?max_budget=${budget}&max_distance=${distance}&bedroom=${bedroom}`);
  const data = await res.json();
  renderMarkers(data.cities);
  document.getElementById("filter-count").textContent = `Showing ${data.count} of ${allCities.length} cities`;
}

function renderMarkers(cities) {
  markersLayer.clearLayers();
  cities.forEach(city => {
    const marker = L.circleMarker([city.lat, city.lng], {
      radius: 9,
      fillColor: TIER_COLOR[city.housing.affordability_tier] || "#5a6572",
      color: "white",
      weight: 2,
      fillOpacity: 0.9,
    }).addTo(markersLayer);
    marker.bindTooltip(city.name);
    marker.on("click", () => selectCity(city.id));
  });
}

function selectCity(cityId) {
  selectedCityId = cityId;
  const city = allCities.find(c => c.id === cityId);
  if (!city) return;

  CITY_SELECT_IDS.forEach(id => { document.getElementById(id).value = cityId; });
  renderHousingTab();
  renderHealthcareTab();
  renderSafetyTab();
  renderEmploymentTab();
  renderCommunityTab();

  const tier = city.housing.affordability_tier;
  document.getElementById("city-panel").innerHTML = `
    <h3>${city.name} <span class="tier-badge ${tier}">${tier}</span></h3>
    <div class="stat-row"><span class="label">Distance from Toronto</span><span class="value">${city.distance_from_toronto_km} km</span></div>
    <div class="stat-row"><span class="label">Avg 1BR rent</span><span class="value">$${city.housing.avg_rent["1br"]}</span></div>
    <div class="stat-row"><span class="label">Vacancy rate</span><span class="value">${city.housing.vacancy_rate}%</span></div>
    <div class="stat-row"><span class="label">Crime Severity Index</span><span class="value">${city.safety.crime_severity_index} (${city.safety.trend})</span></div>
    <div class="stat-row"><span class="label">Open jobs</span><span class="value">${city.employment.job_count}</span></div>
    <div class="stat-row"><span class="label">Family doctors accepting</span><span class="value">${city.healthcare.family_doctors_accepting}</span></div>
    <p style="margin-top:14px; font-weight:600; font-size:13px; color:#5a6572;">Full profile:</p>
    <div style="display:flex; flex-wrap:wrap; gap:8px;">
      <button onclick="goToTab('housing')">Housing</button>
      <button onclick="goToTab('healthcare')">Healthcare</button>
      <button onclick="goToTab('safety')">Safety</button>
      <button onclick="goToTab('employment')">Employment</button>
      <button onclick="goToTab('community')">Community</button>
    </div>
  `;
}

// ---------- City selects (shared across content tabs) ----------

function populateCitySelects() {
  const sorted = [...allCities].sort((a, b) => a.name.localeCompare(b.name));
  const optionsHtml = '<option value="">Select a city…</option>' + sorted.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
  CITY_SELECT_IDS.forEach(id => { document.getElementById(id).innerHTML = optionsHtml; });
}

function cityFromSelect(selectId) {
  const id = document.getElementById(selectId).value;
  return allCities.find(c => c.id === id) || null;
}

// ---------- Housing tab ----------

function renderHousingTab() {
  const city = cityFromSelect("housing-city-select");
  const el = document.getElementById("housing-content");
  if (!city) { el.innerHTML = '<p class="note">Pick a city above (or click a pin on the Map tab) to see housing details.</p>'; return; }

  const r = city.housing.avg_rent;
  el.innerHTML = `
    <div class="card">
      <h2>Average Rent by Bedroom Size — ${city.name}</h2>
      <div class="metric-grid">
        <div class="metric"><div class="num">$${r.studio}</div><div class="lbl">Studio</div></div>
        <div class="metric"><div class="num">$${r["1br"]}</div><div class="lbl">1 Bedroom</div></div>
        <div class="metric"><div class="num">$${r["2br"]}</div><div class="lbl">2 Bedroom</div></div>
        <div class="metric"><div class="num">$${r["3br"]}</div><div class="lbl">3 Bedroom</div></div>
      </div>
      <p class="note">Vacancy rate: ${city.housing.vacancy_rate}% &middot; Affordability tier: <strong>${city.housing.affordability_tier}</strong></p>
    </div>
    <div class="card">
      <h2>Active Rental Listings</h2>
      <table>
        <thead><tr><th>Listing</th><th>Bedrooms</th><th>Rent</th><th></th></tr></thead>
        <tbody>
          ${city.housing.listings.map(l => `
            <tr>
              <td>${l.title}</td>
              <td>${l.bedrooms}</td>
              <td>$${l.rent}</td>
              <td><a class="listing-link" href="${l.link}" target="_blank" rel="noopener">View &rarr;</a></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

// ---------- Healthcare tab ----------

function renderHealthcareTab() {
  const city = cityFromSelect("healthcare-city-select");
  const el = document.getElementById("healthcare-content");
  if (!city) { el.innerHTML = '<p class="note">Pick a city above to see healthcare access details.</p>'; return; }

  const facilities = city.healthcare.facilities || [];
  el.innerHTML = `
    <div class="card">
      <h2>Healthcare Access — ${city.name}</h2>
      <div class="metric-grid">
        <div class="metric"><div class="num">${city.healthcare.family_doctors_accepting}</div><div class="lbl">Family doctors accepting patients</div></div>
        <div class="metric"><div class="num">${city.healthcare.walk_in_clinics}</div><div class="lbl">Walk-in clinics</div></div>
        <div class="metric"><div class="num">${city.healthcare.hospitals.length}</div><div class="lbl">Hospitals nearby</div></div>
      </div>
    </div>
    <div class="card">
      <h2>Nearby Hospitals &amp; Clinics</h2>
      <div id="healthcare-mini-map"></div>
      <div class="legend" style="flex-direction:row; gap:18px; margin-top:10px;">
        <div><span class="dot" style="background:#c0392b;"></span> Hospital</div>
        <div><span class="dot" style="background:#2a7fb8;"></span> Walk-in clinic</div>
      </div>
      <p class="note">Showing hospitals plus a sample of nearby walk-in clinics (exact locations are illustrative — swap in Google Places API results for the real thing).</p>
    </div>
    <div class="card">
      <h2>Hospitals</h2>
      <ul>${city.healthcare.hospitals.map(h => `<li>${h}</li>`).join("")}</ul>
    </div>
    <div class="card">
      <h2>OHIP Enrollment Guide</h2>
      <p>New to Ontario? You can apply for an OHIP health card at any ServiceOntario location. You'll need proof of identity, citizenship/immigration status, and residency in Ontario. Coverage typically starts after a 3-month waiting period for most newcomers — consider private interim health insurance to bridge that gap.</p>
      <p class="note">Static guidance for MVP — see ontario.ca for the current official process.</p>
    </div>
  `;

  if (healthcareMap) { healthcareMap.remove(); healthcareMap = null; }
  healthcareMap = L.map("healthcare-mini-map").setView([city.lat, city.lng], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 18,
  }).addTo(healthcareMap);
  facilities.forEach(f => {
    const color = f.type === "hospital" ? "#c0392b" : "#2a7fb8";
    L.circleMarker([f.lat, f.lng], { radius: 8, fillColor: color, color: "white", weight: 2, fillOpacity: 0.9 })
      .addTo(healthcareMap)
      .bindTooltip(f.name);
  });
}

// ---------- Safety tab ----------

function safetyColor(severity) {
  if (severity <= 40) return "#1b8e5a";
  if (severity <= 60) return "#e0a530";
  return "#c0392b";
}

function renderSafetyTab() {
  const city = cityFromSelect("safety-city-select");
  const el = document.getElementById("safety-content");
  if (!city) { el.innerHTML = '<p class="note">Pick a city above to see safety details.</p>'; return; }

  const trendIcon = { up: "📈 rising", down: "📉 falling", stable: "➡️ stable" }[city.safety.trend] || city.safety.trend;
  const zones = city.safety.crime_zones || [];
  el.innerHTML = `
    <div class="card">
      <h2>Safety — ${city.name}</h2>
      <div class="metric-grid">
        <div class="metric"><div class="num">${city.safety.crime_severity_index}</div><div class="lbl">Crime Severity Index (city-wide)</div></div>
        <div class="metric"><div class="num">${trendIcon}</div><div class="lbl">Trend</div></div>
      </div>
    </div>
    <div class="card">
      <h2>Crime Severity by Area</h2>
      <div id="safety-mini-map"></div>
      <div class="legend" style="flex-direction:row; gap:18px; margin-top:10px;">
        <div><span class="dot affordable"></span> Lower</div>
        <div><span class="dot moderate"></span> Moderate</div>
        <div><span class="dot expensive"></span> Higher</div>
      </div>
      <table style="margin-top:14px;">
        <thead><tr><th>Area</th><th>Crime Severity Index</th></tr></thead>
        <tbody>${zones.map(z => `<tr><td>${z.name}</td><td>${z.severity}</td></tr>`).join("")}</tbody>
      </table>
      <p class="note">Neighbourhood-level breakdown is illustrative for the prototype — swap in real StatsCan Table 35-10-0026-01 data down to the local police service's reporting zones for production.</p>
    </div>
    <div class="card">
      <h2>Nearest Emergency Services</h2>
      <div class="stat-row"><span class="label">Police</span><span class="value">${city.safety.nearest_police_station}</span></div>
      <div class="stat-row"><span class="label">Fire</span><span class="value">${city.safety.nearest_fire_station}</span></div>
      <div class="stat-row"><span class="label">Emergency</span><span class="value">911</span></div>
      <div class="stat-row"><span class="label">Non-emergency police line</span><span class="value">Check local police service website</span></div>
    </div>
  `;

  if (safetyMap) { safetyMap.remove(); safetyMap = null; }
  safetyMap = L.map("safety-mini-map").setView([city.lat, city.lng], 11);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 18,
  }).addTo(safetyMap);
  zones.forEach(z => {
    L.circleMarker([z.lat, z.lng], {
      radius: 10 + (z.severity / 10),
      fillColor: safetyColor(z.severity),
      color: "white",
      weight: 2,
      fillOpacity: 0.65,
    }).addTo(safetyMap).bindTooltip(`${z.name}: ${z.severity}`);
  });
}

// ---------- Employment tab ----------

function renderEmploymentTab() {
  const city = cityFromSelect("employment-city-select");
  const el = document.getElementById("employment-content");
  if (!city) { el.innerHTML = '<p class="note">Pick a city above to see employment details.</p>'; return; }

  const listings = city.employment.job_listings || [];
  el.innerHTML = `
    <div class="card">
      <h2>Employment — ${city.name}</h2>
      <div class="metric-grid">
        <div class="metric"><div class="num">${city.employment.job_count.toLocaleString()}</div><div class="lbl">Open job listings</div></div>
        <div class="metric"><div class="num">$${city.employment.avg_salary.toLocaleString()}</div><div class="lbl">Avg salary</div></div>
        <div class="metric"><div class="num">${city.employment.labour_demand}</div><div class="lbl">Labour demand</div></div>
      </div>
      <p class="note">Live job counts would come from the Job Bank Canada API in production — these are illustrative figures for the prototype.</p>
    </div>
    <div class="card">
      <h2>Example Job Openings</h2>
      <table>
        <thead><tr><th>Role</th><th>Employer</th><th>Type</th><th>Est. Salary</th></tr></thead>
        <tbody>
          ${listings.map(j => `
            <tr>
              <td>${j.title}</td>
              <td>${j.employer}</td>
              <td>${j.type}</td>
              <td>$${j.salary.toLocaleString()}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      <p class="note">Example postings for the prototype — production would pull live listings from the Job Bank Canada API.</p>
    </div>
    <div class="card">
      <h2>Credential Recognition</h2>
      <p>Newcomers with foreign credentials or work experience can get them assessed through World Education Services (WES) or a regulated profession's licensing body. Many settlement agencies (see the Community tab) offer free credential-assessment guidance.</p>
    </div>
  `;
}

// ---------- Community tab ----------

function renderCommunityTab() {
  const city = cityFromSelect("community-city-select");
  const el = document.getElementById("community-content");
  if (!city) { el.innerHTML = '<p class="note">Pick a city above to see community resources.</p>'; return; }

  el.innerHTML = `
    <div class="card">
      <h2>Community — ${city.name}</h2>
      <div class="metric-grid">
        <div class="metric"><div class="num">${city.community.religious_places}</div><div class="lbl">Religious places</div></div>
        <div class="metric"><div class="num">${city.community.cultural_orgs}</div><div class="lbl">Cultural organisations</div></div>
        <div class="metric"><div class="num">${city.community.ethnic_grocery_stores}</div><div class="lbl">Ethnic grocery stores</div></div>
      </div>
    </div>
    <div class="card">
      <h2>Settlement Agencies</h2>
      <ul>${city.community.settlement_agencies.map(a => `<li>${a}</li>`).join("")}</ul>
    </div>
    <div class="card">
      <h2>Language & Culture</h2>
      <p>Free LINC (Language Instruction for Newcomers to Canada) and ESL classes are available through local settlement agencies — ask about locations near ${city.name} when you contact one of the agencies above.</p>
    </div>
  `;
}

// ---------- Chatbot (rule-based decision tree — no AI, per MVP spec) ----------

const chatTree = {
  start: {
    bot: "Hi! I'm the ReRoute Assistant 👋 What matters most to you right now?",
    options: [
      { label: "🏠 Finding housing", next: "housing_budget" },
      { label: "🩺 Healthcare access", next: "healthcare_intro" },
      { label: "🛡️ Safety", next: "safety_intro" },
      { label: "💼 Finding a job", next: "employment_intro" },
      { label: "🤝 Community & culture", next: "community_intro" },
    ],
  },
  housing_budget: {
    bot: "What's your monthly rent budget, roughly (for a 1-bedroom)?",
    options: [
      { label: "Under $1,800", action: () => goToMapFiltered(1800, 80) },
      { label: "$1,800–$2,200", action: () => goToMapFiltered(2200, 80) },
      { label: "$2,200+", action: () => goToMapFiltered(3000, 80) },
      { label: "⬅ Back", next: "start" },
    ],
  },
  healthcare_intro: {
    bot: "Once you pick a city, the Healthcare tab shows family doctors accepting patients, walk-in clinics, hospitals nearby, and an OHIP enrollment guide. Want me to take you there?",
    options: [
      { label: "Take me to the Map first", action: () => goToTab("map") },
      { label: "Take me to Healthcare", action: () => goToTab("healthcare") },
      { label: "⬅ Back", next: "start" },
    ],
  },
  safety_intro: {
    bot: "The Safety tab shows each city's Crime Severity Index, its recent trend, and the nearest police & fire stations.",
    options: [
      { label: "Take me to Safety", action: () => goToTab("safety") },
      { label: "⬅ Back", next: "start" },
    ],
  },
  employment_intro: {
    bot: "The Employment tab shows job counts, average salary, and labour demand by city, plus credential-recognition guidance for newcomers.",
    options: [
      { label: "Take me to Employment", action: () => goToTab("employment") },
      { label: "⬅ Back", next: "start" },
    ],
  },
  community_intro: {
    bot: "The Community tab covers religious places, cultural organisations, ethnic grocery stores, and settlement agencies (who can also help with free language classes) for each city.",
    options: [
      { label: "Take me to Community", action: () => goToTab("community") },
      { label: "⬅ Back", next: "start" },
    ],
  },
};

function goToMapFiltered(budget, distance) {
  document.getElementById("f-budget").value = budget;
  document.getElementById("f-distance").value = distance;
  onBudgetInput();
  onDistanceInput();
  applyFilters();
  goToTab("map");
}

function initChatbot() {
  document.getElementById("chat-messages").innerHTML = "";
  renderChatNode("start");
}

function renderChatNode(nodeId) {
  const node = chatTree[nodeId];
  const messages = document.getElementById("chat-messages");
  const bubble = document.createElement("div");
  bubble.className = "chat-bubble";
  bubble.textContent = node.bot;
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;

  const optionsEl = document.getElementById("chat-options");
  optionsEl.innerHTML = "";
  node.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.label;
    btn.onclick = () => {
      const userBubble = document.createElement("div");
      userBubble.className = "chat-bubble user";
      userBubble.textContent = opt.label;
      messages.appendChild(userBubble);
      messages.scrollTop = messages.scrollHeight;
      optionsEl.innerHTML = "";

      if (opt.action) {
        opt.action();
        setTimeout(() => renderChatNode("start"), 300);
      } else if (opt.next) {
        renderChatNode(opt.next);
      }
    };
    optionsEl.appendChild(btn);
  });
}
