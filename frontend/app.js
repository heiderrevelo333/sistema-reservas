const API = "http://localhost:8000";

async function getJson(path){
  const res = await fetch(API+path);
  if(!res.ok) throw new Error(await res.text());
  return res.json();
}

// CANCHAS
document.getElementById("loadCanchas").onclick = async ()=>{
  try{
    const canchas = await getJson("/canchas/");
    const ul = document.getElementById("canchasList");
    ul.innerHTML = "";
    canchas.forEach(c => {
      const li = document.createElement("li");
      li.textContent = `#${c.id} - ${c.nombre} (${c.tipo}) - ${c.ubicacion || ""}`;
      ul.appendChild(li);
    });
  }catch(e){ alert(e) }
};

document.getElementById("formCancha").onsubmit = async (ev)=>{
  ev.preventDefault();
  const f = ev.target;
  const data = {
    nombre: f.nombre.value,
    tipo: f.tipo.value,
    ubicacion: f.ubicacion.value
  };
  const res = await fetch(API+"/canchas/", {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(data)});
  if(!res.ok){ alert(await res.text()); return; }
  alert("Cancha creada");
  document.getElementById("loadCanchas").click();
  f.reset();
};

// USUARIOS
document.getElementById("loadUsuarios").onclick = async ()=>{
  try{
    const usuarios = await getJson("/usuarios/");
    const ul = document.getElementById("usuariosList");
    ul.innerHTML = "";
    usuarios.forEach(u => {
      const li = document.createElement("li");
      li.textContent = `#${u.id} - ${u.nombre} - ${u.telefono} (${u.rol})`;
      ul.appendChild(li);
    });
  }catch(e){ alert(e) }
};

document.getElementById("formUsuario").onsubmit = async (ev)=>{
  ev.preventDefault();
  const f = ev.target;
  const data = { nombre: f.nombre.value, telefono: f.telefono.value, rol: f.rol.value };
  const res = await fetch(API+"/usuarios/", {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(data)});
  if(!res.ok){ alert(await res.text()); return; }
  alert("Usuario creado");
  document.getElementById("loadUsuarios").click();
  f.reset();
};

// RESERVAS
document.getElementById("loadReservas").onclick = async ()=>{
  try{
    const reservas = await getJson("/reservas/");
    const ul = document.getElementById("reservasList");
    ul.innerHTML = "";
    reservas.forEach(r => {
      const li = document.createElement("li");
      li.textContent = `#${r.id} - ${r.fecha} ${r.hora_inicio}-${r.hora_fin} usuario:${r.usuario_id} cancha:${r.cancha_id} (${r.estado})`;
      ul.appendChild(li);
    });
  }catch(e){ alert(e) }
};

document.getElementById("formReserva").onsubmit = async (ev)=>{
  ev.preventDefault();
  const f = ev.target;
  const data = {
    fecha: f.fecha.value,
    hora_inicio: f.hora_inicio.value,
    hora_fin: f.hora_fin.value,
    usuario_id: Number(f.usuario_id.value),
    cancha_id: Number(f.cancha_id.value)
  };
  const res = await fetch(API+"/reservas/", {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(data)});
  if(!res.ok){ alert(await res.text()); return; }
  alert("Reserva creada");
  document.getElementById("loadReservas").click();
  f.reset();
};
