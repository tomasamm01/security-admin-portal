# Security Admin Portal

Portal de administración de seguridad construido con Angular 14 y Bootstrap 5 para la gestión centralizada de políticas de seguridad, usuarios y accesos.

## 🚀 Características

- **Gestión de Usuarios**: Creación, edición y eliminación de usuarios con roles y permisos
- **Control de Accesos**: Administración de políticas de acceso y autenticación
- **Panel de Administración**: Interfaz intuitiva para la gestión de seguridad
- **Exportación de Datos**: Generación de reportes en PDF y Excel
- **Autenticación JWT**: Integración con Auth0 para gestión segura de tokens
- **Interfaz Responsiva**: Diseño adaptativo para escritorio y móviles

## 🛠️ Stack Tecnológico

- **Frontend**: Angular 14.2.0
- **UI Framework**: Bootstrap 5.2.0 + Bootstrap Icons
- **Lenguaje**: TypeScript 4.8.4
- **Estilos**: SCSS
- **Testing**: Jasmine + Karma
- **Build**: Angular CLI

## 📦 Dependencias Principales

- `@auth0/angular-jwt` - Manejo de tokens JWT
- `@ng-bootstrap/ng-bootstrap` - Componentes Bootstrap para Angular
- `angularx-qrcode` - Generación de códigos QR
- `file-saver` - Descarga de archivos
- `html2canvas` + `jspdf` - Generación de PDFs
- `jszip` - Compresión de archivos
- `xlsx` - Manipulación de archivos Excel
- `quill` - Editor de texto enriquecido
- `moment` - Manejo de fechas

## 📋 Prerrequisitos

- Node.js 16.x o superior
- npm 8.x o yarn 1.22.x

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd security-admin-portal

# Instalar dependencias
npm install
```

## 🔧 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run start

# Abrir http://localhost:4200
```

## 🏗️ Build

```bash
# Build para producción
npm run build

# Build para desarrollo con watch
npm run watch
```

## 🧪 Testing

```bash
# Ejecutar tests unitarios
npm run test

# Ejecutar tests con coverage
npm run test -- --code-coverage
```

## 📁 Estructura del Proyecto

```
src/
├── app/                 # Componentes y módulos principales
│   ├── components/      # Componentes reutilizables
│   ├── pages/          # Páginas de la aplicación
│   ├── services/       # Servicios y API calls
│   ├── models/         # Modelos de datos
│   └── utils/          # Utilidades y helpers
├── assets/             # Recursos estáticos
├── environments/       # Configuración de entornos
└── styles.scss         # Estilos globales
```

## ⚙️ Configuración de Entornos

- `environment.ts` - Configuración de desarrollo
- `environment.prod.ts` - Configuración de producción

## 🔐 Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
API_BASE_URL=http://localhost:3000/api
AUTH0_DOMAIN=your-auth0-domain
AUTH0_CLIENT_ID=your-auth0-client-id
```

## 🎨 Personalización

### Tema Bootstrap
Los estilos principales se encuentran en `src/styles.scss`. Puedes personalizar variables de Bootstrap:

```scss
// Variables personalizadas
$primary: #007bff;
$secondary: #6c757d;

// Importar Bootstrap
@import "~bootstrap/scss/bootstrap";
```

### Componentes
Los componentes siguen la estructura estándar de Angular:
- `.component.ts` - Lógica del componente
- `.component.html` - Template
- `.component.scss` - Estilos específicos

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
```

Los archivos compilados se generan en `dist/security-admin-portal/`

### Configuración de Servidor
Asegúrate de configurar el servidor para servir archivos estáticos y manejar rutas SPA (Single Page Application).

## 🤝 Contribución

1. Fork del proyecto
2. Crear feature branch (`git checkout -b feature/amazing-feature`)
3. Commit cambios (`git commit -m 'Add amazing feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🐛 Issues

Si encuentras algún bug o tienes sugerencias, por favor abre un issue en el repositorio.

## 📞 Soporte

Para consultas técnicas, contacta al equipo de desarrollo o revisa la documentación del proyecto.

---

**Desarrollado con ❤️ usando Angular 14**
