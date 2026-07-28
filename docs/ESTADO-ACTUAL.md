# Estado actual

## Corte de auditoría

Estado del repositorio `cristianbarriospwpe/pwpe-reservas-app`, rama `master`, inspeccionado el 28 de julio de 2026.

## Qué funciona según el código

- Landing comercial de PWPE Reservas.
- Páginas públicas dinámicas por slug.
- Demos personalizadas y galerías.
- Recursos con capacidad, precio y estado.
- Solicitudes por período o por horario.
- Consulta básica de conflictos con reservas y bloqueos.
- Inserción de reservas en Supabase.
- Apertura de WhatsApp con mensaje precargado.
- Panel administrativo de negocios, reservas, recursos y disponibilidad.
- Creación manual de reservas.
- Cambios de estado de reservas.
- Alta y edición de recursos.
- Configuración de negocios.
- Paneles demostrativos por cliente.
- Enlaces a Google Maps e Instagram.

“Funciona según el código” no equivale a validación en producción ni confirma que la configuración externa, RLS y datos sean correctos.

## Qué está incompleto o proyectado

- Pagos: Pix figura como futuro y no hay pasarela.
- WhatsApp: solo enlaces `wa.me`, no API ni automatización del lado servidor.
- Bilingüismo: no existe `/pt/` ni estructura equivalente; predomina portugués.
- Autenticación: una contraseña y token compartidos, sin usuarios ni roles.
- Multi-tenancy seguro: existe `business_id`, pero no hay RLS versionada.
- Privacidad/LGPD: no se encontró aviso, consentimiento, retención o eliminación.
- SEO: no hay proceso documentado de indexación ni estrategia verificable.
- Deploy: no hay configuración o pipeline versionados.

## Qué está simulado

- `src/data/mock-*` contiene negocios, recursos, reservas y bloqueos de muestra.
- La landing presenta estadísticas fijas.
- `/admin-demo/[slug]` se identifica visualmente como panel demostrativo, aunque consulta datos mediante los servicios.
- Algunas demos y páginas de unidades tienen contenido, precios, teléfonos y recursos visuales incrustados en el código.

## Verificaciones realizadas

| Verificación | Resultado |
|---|---|
| `npm ci` | Correcto |
| `npm run lint` | Correcto |
| `npm run build` | Compila y supera TypeScript; falla al recopilar páginas sin variables Supabase |
| Pruebas automatizadas | No existe script ni suite |
| `npm audit` | Cuatro vulnerabilidades altas al momento de la auditoría |

Next.js también advierte que la convención `middleware.ts` está deprecada a favor de `proxy`.

## Deuda técnica

- README genérico de `create-next-app`.
- Sin changelog, `.env.example`, migraciones ni política RLS versionada.
- Sin tests, CI/CD, monitoreo o proceso de backup/restauración.
- Sin versión de Node estandarizada.
- Componentes extensos con datos específicos incrustados.
- Servicios devuelven arreglos vacíos o booleanos ante errores, lo que puede ocultar fallos.
- No hay validación compartida del lado servidor para entradas públicas.
- No hay documentación operativa de Supabase o Vercel.

## Riesgos de seguridad y privacidad

### Alta prioridad

1. **Exposición potencial de datos:** `/admin-demo/[slug]` no está cubierto por el matcher `/admin/:path*` y presenta reservas, nombres, teléfonos, observaciones e ingresos estimados.
2. **Autorización dependiente de configuración externa:** el navegador consulta e inserta directamente mediante la clave anónima de Supabase. Sin las políticas RLS no puede confirmarse qué puede leer o modificar un visitante.
3. **Autenticación compartida:** una contraseña y un token estático dan acceso a todos los negocios. No hay identidad ni revocación individual.
4. **Dependencias:** `npm audit` detectó alertas altas en Next.js 16.2.10 y dependencias transitivas. La auditoría indicó una actualización compatible de Next.js, pero debe validarse antes de modificar dependencias.

### Integridad de reservas

1. Comprobar conflicto y crear reserva no es atómico; existe condición de carrera.
2. El formulario público no comprueba si `createBooking()` devolvió `false` y puede anunciar éxito aunque la inserción falle.
3. No se encontró restricción de base de datos versionada contra solapamientos.

### LGPD

Se procesan nombre, WhatsApp, observaciones y detalles de estadía. Faltan evidencia de consentimiento, finalidad visible, retención, eliminación, controles de acceso, auditoría y procedimiento ante incidentes.

## Estado de afirmaciones

| Afirmación | Estado |
|---|---|
| Existe un MVP de reservas multi-negocio | Confirmado |
| Las solicitudes pueden persistirse en Supabase | Confirmado por código; depende de configuración |
| Hay contacto directo por WhatsApp | Confirmado mediante enlaces `wa.me` |
| WhatsApp está automatizado mediante API | No implementado |
| Hay pagos o Pix funcional | No implementado |
| El panel administrativo está protegido | Parcial: `/admin` sí, `/admin-demo` no |
| Los datos están aislados de forma segura | No verificable sin RLS |
| Existe un CRM completo | No |
| Hay sitio bilingüe con `/pt/` | No implementado |
| Los precios históricos siguen vigentes | No; requieren confirmación |
