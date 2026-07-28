# Guía de trabajo del repositorio PWPE

## Propósito

Este repositorio debe funcionar como fuente de verdad técnica y operativa de PWPE — Páginas Web Para Emprendedores. Antes de implementar cualquier cambio, leer:

- `docs/PWPE-CONTEXTO.md`: identidad, oferta, mercados y antecedentes comerciales.
- `docs/ARQUITECTURA.md`: arquitectura comprobada en el repositorio.
- `docs/ESTADO-ACTUAL.md`: estado verificable, riesgos y deuda.
- `docs/DECISIONES-PENDIENTES.md`: decisiones que no deben asumirse.

La documentación distingue entre hechos confirmados por el repositorio, información comercial proporcionada por los responsables y propuestas todavía no implementadas.

## Estado técnico y comandos

Al 28 de julio de 2026, la aplicación utiliza Node.js, npm, Next.js, React, TypeScript, Tailwind CSS y Supabase. Los comandos confirmados son:

| Acción | Comando confirmado |
|---|---|
| Instalación reproducible | `npm ci` |
| Desarrollo local | `npm run dev` |
| Compilación | `npm run build` |
| Producción local | `npm run start` después de compilar |
| Lint | `npm run lint` |
| Pruebas automatizadas | No disponibles |

La compilación necesita las variables declaradas en `docs/ARQUITECTURA.md`. No registrar valores reales. El repositorio no define una versión de Node mediante `.nvmrc` o `engines`; confirmar una versión soportada antes de estandarizar entornos.

## Reglas permanentes

1. Inspeccionar el código y la documentación antes de cambiar comportamiento.
2. No presentar una capacidad como existente sin evidencia en el repositorio.
3. Mantener separadas las capacidades generales de PWPE y el vertical de reservas para hospedajes.
4. Preservar programación propia y componentes reutilizables. No introducir WordPress, Framer ni Astro sin una decisión documentada y aprobada.
5. Reutilizar identidad visual, logotipos y recursos oficiales cuando sean incorporados. No rediseñar la marca sin autorización.
6. Usar español para la ruta principal y portugués brasileño natural para `/pt/` solo después de confirmar la arquitectura de rutas.
7. No codificar precios sin mercado, moneda, alcance, vigencia y aprobación de Daniel.
8. No prometer posicionamiento SEO, “cero gastos”, un CRM completo ni funcionalidades no verificadas.
9. No modificar datos reales durante análisis o pruebas.
10. Actualizar la documentación junto con cada cambio que altere arquitectura, operación, alcance o decisiones.

## Git y colaboración

- El repositorio de trabajo confirmado es `cristianbarriospwpe/pwpe-reservas-app`.
- GitHub es la fuente de verdad del código.
- Cada integrante debe usar su propia cuenta y credenciales.
- No compartir contraseñas personales ni una contraseña administrativa de producción.
- Trabajar mediante ramas breves, commits con alcance claro, issues y pull requests.
- Revisar el diff y ejecutar las verificaciones disponibles antes de solicitar revisión.
- No hacer push, deployment, transferencias ni cambios de plan sin autorización explícita.
- No confundir este proyecto con el repositorio histórico `PWPE-Reservas-v1`.
- La rama principal confirmada es `master`.

## Seguridad y privacidad

- Nunca mostrar, registrar ni versionar contraseñas, tokens, claves privadas o credenciales.
- Mantener secretos exclusivamente en variables de entorno del entorno correspondiente.
- Al incorporar configuración, crear `.env.example` solo con nombres y valores ficticios.
- Incorporar reglas de `.gitignore` que excluyan `.env` y variantes sensibles antes de usar variables de entorno.
- Si aparece un secreto versionado, no reproducirlo: informar su ubicación de forma segura, rotarlo y retirarlo del historial mediante un procedimiento aprobado.
- Implementar autenticación y autorización por usuario; no usar una credencial administrativa compartida en producción.
- Diseñar aislamiento verificable entre clientes y alojamientos para impedir cruces de reservas o datos.
- Tratar leads y datos personales conforme a la LGPD y las normas aplicables. Limitar el uso a preparar la DEMO, contactar al interesado y gestionar una posible contratación, salvo consentimiento adicional.
- No exponer credenciales ni operaciones privilegiadas en el frontend.

## Criterio de confirmación

- **Confirmado:** demostrable mediante archivos, historial o configuración local del repositorio.
- **Contexto aportado:** información operativa o comercial proporcionada por los responsables, no demostrada por código.
- **Pendiente:** requiere una decisión, acceso externo o evidencia adicional.
- **Proyectado:** ofrecido o deseado, pero todavía no encontrado como implementación.
