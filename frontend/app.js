const API = "http://127.0.0.1:8000"; 

// ======================= CARGAR CANCHAS =======================
document.getElementById("loadCanchas").addEventListener("click", async () => {
  const res = await fetch(`${API}/canchas`);
  const data = await res.json();

  const list = document.getElementById("canchasList");
  list.innerHTML = "";

  data.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `ID: ${c.id} | ${c.nombre} - ${c.tipo} - ${c.ubicacion}`;
    list.appendChild(li);
  });
});

// ======================= CREAR CANCHA =======================
document.getElementById("formCancha").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const data = Object.fromEntries(formData);

  await fetch(`${API}/canchas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  alert("Cancha creada");
  e.target.reset();
});

// ======================= ACTUALIZAR CANCHA =======================
document.getElementById("formUpdateCancha").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  const id = data.id;
  delete data.id; // No enviar el ID en el cuerpo

  await fetch(`${API}/canchas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  alert("Cancha actualizada");
  e.target.reset();
});

// ======================= ELIMINAR CANCHA =======================
document.getElementById("formDeleteCancha").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = new FormData(e.target).get("id");

  await fetch(`${API}/canchas/${id}`, {
    method: "DELETE"
  });

  alert("Cancha eliminada");
  e.target.reset();
});

// =============================================================
// ======================== USUARIOS ============================
// =============================================================

document.getElementById("loadUsuarios").addEventListener("click", async () => {
  const res = await fetch(`${API}/usuarios`);
  const data = await res.json();

  const list = document.getElementById("usuariosList");
  list.innerHTML = "";

  data.forEach(u => {
    const li = document.createElement("li");
    li.textContent = `ID: ${u.id} | ${u.nombre} - ${u.telefono} - ${u.rol}`;
    list.appendChild(li);
  });
});

// Crear Usuario
document.getElementById("formUsuario").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));

  await fetch(`${API}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  alert("Usuario creado");
  e.target.reset();
});

// Actualizar Usuario
document.getElementById("formUpdateUsuario").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  const id = data.id;
  delete data.id;

  await fetch(`${API}/usuarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  alert("Usuario actualizado");
  e.target.reset();
});

// Eliminar Usuario
document.getElementById("formDeleteUsuario").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = new FormData(e.target).get("id");

  await fetch(`${API}/usuarios/${id}`, {
    method: "DELETE"
  });

  alert("Usuario eliminado");
  e.target.reset();
});

// =============================================================
// ======================== RESERVAS ===========================
// =============================================================

document.getElementById("loadReservas").addEventListener("click", async () => {
  const res = await fetch(`${API}/reservas`);
  const data = await res.json();

  const list = document.getElementById("reservasList");
  list.innerHTML = "";

  data.forEach(r => {
    const li = document.createElement("li");
    li.textContent = 
      `ID: ${r.id} | Usuario: ${r.usuario_id} | Cancha: ${r.cancha_id} | ${r.fecha} ${r.hora_inicio}-${r.hora_fin}`;
    list.appendChild(li);
  });
});

// Crear Reserva
document.getElementById("formReserva").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));

  await fetch(`${API}/reservas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  alert("Reserva creada");
  e.target.reset();
});
