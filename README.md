Proyecto 10: Sistema de Gestión de Eventos (Full Stack)
Este proyecto es una aplicación Full Stack que permite a los usuarios autenticarse, gestionar eventos y confirmar asistencia. Incluye:

Backend
Tecnologías: Express, JWT, Bcrypt, Mongoose, CORS y Nodemon.
Modelos:
Usuarios: almacenan nombre, correo y contraseña (hashed).
Eventos: contienen título, fecha, ubicación, descripción y asistentes (array de IDs de usuarios).
Características:
Middleware para validar tokens en rutas protegidas.
Subida de archivos (avatares o carteles de eventos).
Controladores que ordenan datos y vinculan elementos entre colecciones.
Frontend
Autenticación: Formulario de inicio de sesión y registro (este último realiza login automáticamente tras registrarse).
Gestión de eventos:
Lista de eventos disponibles con opciones adicionales para usuarios autenticados (crear eventos, confirmar asistencia).
Vista detallada de eventos, incluyendo asistentes.
UX/UI:
Control de errores en formularios y procesos asíncronos con mensajes informativos.
Indicadores de carga para mejorar la experiencia del usuario.
Código limpio, componentización efectiva y fetch reutilizable mediante una función centralizada.
