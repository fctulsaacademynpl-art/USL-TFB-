
const matches = [
  { home: "Chivas", hs: 15, as: 14, away: "AC Milan" },
  { home: "Bayern", hs: 3, as: 0, away: "USA" },
  { home: "Los Jaguares", hs: 3, as: 0, away: "Rimberio FC" }
];

function calculate() {
  const teams = {};
  matches.forEach(m => {
    if (!teams[m.home]) teams[m.home] = { pts:0,w:0,d:0,l:0,gf:0,ga:0 };
    if (!teams[m.away]) teams[m.away] = { pts:0,w:0,d:0,l:0,gf:0,ga:0 };

    teams[m.home].gf += m.hs;
    teams[m.home].ga += m.as;
    teams[m.away].gf += m.as;
    teams[m.away].ga += m.hs;

    if (m.hs > m.as) {
      teams[m.home].w++; teams[m.home].pts+=3;
      teams[m.away].l++;
    } else if (m.hs < m.as) {
      teams[m.away].w++; teams[m.away].pts+=3;
      teams[m.home].l++;
    } else {
      teams[m.home].d++; teams[m.away].d++;
      teams[m.home].pts++; teams[m.away].pts++;
    }
  });

  return Object.entries(teams).sort((a,b)=>b[1].pts-a[1].pts);
}

function render() {
  const rankings = calculate();
  let html = "<table><tr><th>Pos</th><th>Team</th><th>PTS</th><th>W-D-L</th><th>GF</th><th>GA</th></tr>";
  rankings.forEach((t,i)=>{
    html += `<tr><td>${i+1}</td><td>${t[0]}</td><td>${t[1].pts}</td><td>${t[1].w}-${t[1].d}-${t[1].l}</td><td>${t[1].gf}</td><td>${t[1].ga}</td></tr>`;
  });
  html += "</table>";
  document.getElementById("rankings").innerHTML = html;

  let mhtml = "<h2>Matches</h2>";
  matches.forEach(m=>{
    mhtml += `<p>${m.home} ${m.hs}-${m.as} ${m.away}</p>`;
  });
  document.getElementById("matches").innerHTML = mhtml;
}

function showPage(p) {
  document.querySelectorAll('.page').forEach(s=>s.classList.add('hidden'));
  document.getElementById(p).classList.remove('hidden');
}

render();
