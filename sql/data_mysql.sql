USE sistema_reservas;
INSERT INTO usuario (nombre, telefono, rol) VALUES
('Carlos Pérez','3114567890','jugador'),
('María Gómez','3009876543','jugador'),
('Ana Torres','3205558899','administrador');

INSERT INTO cancha (nombre, tipo, ubicacion, estado) VALUES
('Cancha Sintética 1','futbol','Barrio Centro','activa'),
('Coliseo Municipal','baloncesto','Parque Principal','activa');

INSERT INTO reserva (fecha, hora_inicio, hora_fin, estado, usuario_id, cancha_id) VALUES
('2025-11-20','10:00:00','11:00:00','pendiente',1,1),
('2025-11-21','15:00:00','16:00:00','aprobada',2,2);
