# Arquitectura

## Resumen verificable

Fecha de inspección: 28 de julio de 2026. Repositorio: `cristianbarriospwpe/pwpe-reservas-app`. Rama predeterminada: `master`.

PWPE Reservas es una aplicación web full-stack construida con Next.js App Router. Renderiza páginas públicas y administrativas, y utiliza Supabase como API de datos mediante el cliente JavaScript. El navegador también realiza consultas e inserciones directas en Supabase desde el formulario público.

## Tecnologías

| Área | Implementación confirmada |
|---|---|
| Framework | Next.js 16.2.10, App Router y Turbopack |
| UI | React 19.2.4 |
| Lenguaje | TypeScript con modo `strict` |
| Estilos | Tailwind CSS 4 mediante PostCSS |
| Datos | Supabase JS 2.110 |
| Calendario | `react-day-picker` 10 |
| Calidad | ESLint 9 y configuración de Next.js |
| Gestor | npm con `package-lock.json` |
| Hosting | Compatible con Vercel; no hay configuración de proyecto versionada |

## Estructura

- `src/app/`: rutas de Next.js, layouts y endpoints de login/logout.
- `src/components/public/`: formulario público, selector de fechas y galería.
- `src/components/admin/`: formularios y componentes del panel.
- `src/services/`: operaciones Supabase de negocios, recursos, reservas y bloqueos.
- `src/mappers/`: conversión de filas de base de datos al modelo de aplicación.
- `src/types/`: contratos TypeScript.
- `src/data/`: datos mock conservados en el repositorio.
- `public/demo/`: imágenes de las demos personalizadas.

## Rutas

### Públicas

| Ruta | Función |
|---|---|
| `/` | Landing de PWPE Reservas |
| `/login` | Formulario de acceso administrativo |
| `/[slug]` | Página pública dinámica de un negocio |
| `/apartamentos-mobiliados-ipatinga/[unit]` | Detalle estático de unidades de Ipatinga |
| `/admin-demo/[slug]` | Panel demostrativo por negocio; actualmente no protegido |

### Administrativas

- `/admin`
- `/admin/bookings` y `/admin/bookings/new`
- `/admin/resources`, alta y edición
- `/admin/availability` y alta de bloqueos
- `/admin/settings`
- `/admin/supabase-test`
- `/admin/business-test`

El middleware protege solamente `/admin/:path*`.

### API

- `POST /api/admin-login`
- `POST /api/admin-logout`

No existe API propia para las reservas, recursos o negocios; esas operaciones usan el cliente de Supabase.

## Modelo y flujo de datos

Las tablas inferidas del código son:

- `businesses`
- `resources`
- `bookings`
- `availability_blocks`

No existen migraciones, esquema SQL, seeds ni políticas Row Level Security (RLS) versionadas. Los campos `business_id` y `resource_id` permiten asociar registros, pero el aislamiento efectivo depende de políticas externas que no pueden verificarse.

Flujo público confirmado:

1. `/[slug]` busca un negocio activo por slug.
2. Consulta sus recursos activos.
3. El visitante selecciona recurso, fecha o período, personas y datos de contacto.
4. El navegador consulta reservas y bloqueos para detectar conflictos.
5. El navegador inserta la solicitud en `bookings`.
6. Abre una URL `wa.me` con un mensaje precargado.

La verificación y la inserción son operaciones separadas; no hay garantía atómica contra solicitudes simultáneas.

## Autenticación y autorización

El acceso administrativo usa:

- `ADMIN_PASSWORD`: contraseña única compartida.
- `ADMIN_SESSION_TOKEN`: token estático comparado por el middleware.
- Cookie HTTP-only `pwpe_admin_session`, `SameSite=Lax`, segura en producción y con vigencia de siete días.

No existen usuarios, roles, sesiones individuales, MFA, recuperación, revocación selectiva ni rate limiting. El panel general consulta datos de todos los negocios. Este mecanismo debe considerarse provisional para DEMO, no autenticación comercial multi-cliente.

## Integraciones

### Supabase

Variables declaradas:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Ambas son públicas por diseño. La seguridad depende de RLS. No existe `.env.example`.

### WhatsApp

Se generan enlaces `https://wa.me/...` con mensajes precargados. No existe integración con WhatsApp Business Platform, envío automático desde servidor ni webhooks.

### Pagos

El modelo de negocio contiene una clave Pix y la interfaz menciona Pix futuro. No existe procesamiento de pagos, pasarela ni conciliación.

### Mapas e Instagram

Las demos incluyen enlaces y `iframe` de Google Maps, además de enlaces de Instagram configurados en el código.

## Demos y contenido

Hay recursos visuales y configuración específica para:

- Tá em Casa Park Hotel.
- Hotel Nacional Palace.
- Apartamentos Mobiliados Ipatinga y sus unidades.

Parte del contenido, teléfonos, mapas, enlaces, colores y galerías está codificada en componentes de ruta de gran tamaño, mientras los datos operativos se consultan en Supabase.

## Deployments

El proyecto es compatible con Vercel y el README genérico lo menciona. No hay `vercel.json`, `.github/workflows`, archivos de DNS ni metadatos de un proyecto Vercel dentro del repositorio. La URL histórica y la relación con planes o cuentas deben comprobarse en el proveedor.

## Limitaciones técnicas

1. RLS y esquema de base de datos no versionados.
2. Autenticación administrativa compartida.
3. `/admin-demo/[slug]` fuera del middleware.
4. Conflictos de reserva comprobados sin transacción atómica.
5. El formulario ignora el valor booleano devuelto cuando falla `createBooking`.
6. Sin pruebas automatizadas, CI/CD ni observabilidad.
7. Sin ruta `/pt/`; la aplicación está escrita principalmente en portugués.
8. README sin adaptar desde `create-next-app`.
9. Componentes de página de cientos de líneas con configuración específica incrustada.
10. Dependencias con alertas de seguridad documentadas en `ESTADO-ACTUAL.md`.
