module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://46.202.144.6:3001', 'https://susurrosenpapel.com.ar'], // Agrega tus dominios
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Métodos permitidos
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Encabezados permitidos
      exposedHeaders: ['Content-Length', 'X-Content-Type-Options'], // Encabezados expuestos
      credentials: true, // Permitir credenciales (si es necesario)
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
