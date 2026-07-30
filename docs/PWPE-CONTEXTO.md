# Contexto de PWPE

## Alcance y fuentes

Este documento incorpora el contexto operativo y comercial aportado el 28 de julio de 2026. Ese contexto no constituye evidencia de implementación técnica. La única realidad técnica confirmada se documenta en `ARQUITECTURA.md` y `ESTADO-ACTUAL.md`.

## Identidad

PWPE significa **Páginas Web Para Emprendedores**. En Brasil también se presenta como **PWPE Brasil**, **Sites para Empreendedores** y **Soluções Digitais**.

PWPE es un estudio de soluciones digitales, no solamente una empresa de sistemas de reservas. El sistema de reservas para hospedajes es un vertical prioritario dentro de una oferta más amplia.

## Servicios declarados

- Landing pages.
- Sitios web profesionales.
- Tiendas online autoadministrables.
- Sistemas de reservas.
- Integraciones de pagos y WhatsApp.
- Formularios avanzados.
- Paneles internos y aplicaciones web.
- Automatizaciones, sistemas personalizados y soluciones a medida.

Este repositorio implementa específicamente un MVP de reservas: páginas públicas, recursos, solicitudes, bloqueos, panel administrativo y contacto mediante enlaces de WhatsApp. No demuestra por sí mismo que los demás servicios comerciales generales estén implementados en esta aplicación.

## Propuesta de valor y comunicación

PWPE busca ayudar a pequeños negocios y emprendedores a tener presencia digital propia, presentarse profesionalmente, generar contactos, recibir solicitudes, obtener reservas directas, vender online y reducir la dependencia de intermediarios.

Para hospedajes, la propuesta es un sitio propio con reservas, pagos y contacto directo. La comunicación debe respetar estas precisiones:

- PWPE no cobra comisión por cada reserva directa realizada desde el sitio del cliente.
- Plataformas como Booking o Airbnb mantienen sus propias condiciones y comisiones.
- Los proveedores de pago pueden cobrar tasas de procesamiento.
- No usar “cero gastos” como afirmación absoluta.
- No confundir un gestor de reservas con un CRM completo.
- No afirmar que una función existe sin confirmación en el código.
- Diferenciar indexación/configuración para Google de una garantía de posicionamiento SEO.

En portugués brasileño, utilizar lenguaje natural y profesional. Conceptos recurrentes:

- `Site próprio`
- `Reservas diretas`
- `Sem comissão por reserva direta`
- `Contato direto com seus hóspedes`
- `DEMO gratuita e sem compromisso`
- `Soluções digitais sob medida`

## Mercados e idiomas

Los mercados principales declarados son Argentina, en español, y Brasil, en portugués brasileño. La estructura deseada es español en la ruta principal y portugués en `/pt/`, pero no existe implementación que confirme rutas.

El dominio informado es `www.paginaswebparaemprendedores.com`. Su propiedad, DNS, contenido y estado activo no están verificados desde este repositorio. La aplicación inspeccionada no implementa una ruta `/pt/`; su contenido actual está principalmente en portugués.

En Brasil, hospedajes fue el primer vertical validado comercialmente. La actividad comenzó en Região dos Lagos y luego la publicidad se amplió a todo Brasil.

## Públicos objetivo

- Pousadas, hoteles, alojamientos y alquileres temporales.
- Turismo y experiencias.
- Gastronomía.
- Profesionales y prestadores de servicios.
- Barberías y negocios con turnos.
- Alquiler de vehículos.
- Comercios y tiendas online.
- Servicios relacionados con mascotas.
- Emprendedores y negocios que necesiten formularios, reservas, pagos o sistemas personalizados.

## Flujo comercial de DEMO para hospedajes

Flujo operativo aportado:

1. El interesado completa un formulario o solicita una DEMO.
2. Se recopilan nombre; nombre y tipo de hospedaje; ciudad y estado; cantidad aproximada de habitaciones o unidades; enlaces de Instagram, sitio, Google Maps, Booking o Airbnb; WhatsApp con DDD; y fotografías si faltan referencias.
3. PWPE prepara una vista previa personalizada.
4. La DEMO es gratuita y sin compromiso.
5. El plazo comercial utilizado fue de hasta 72 horas.
6. El cliente revisa la propuesta.
7. Si continúa, se definen desarrollo definitivo, dominio, contenido, funcionalidades y mantenimiento.

La vigencia de 24 horas usada en el primer caso es un antecedente, no una política permanente. El formulario de leads de Meta reemplazó parcialmente el contacto basado solo en comentarios, Messenger, Instagram Direct o WhatsApp, para reducir pérdida de oportunidades.

Los datos deben usarse únicamente para preparar la DEMO, contactar al interesado y gestionar la posible contratación, salvo consentimiento adicional, y deben tratarse conforme a la LGPD.

## Precios históricos

Todos los importes siguientes son antecedentes; no son una lista vigente. No deben publicarse ni incorporarse al software sin confirmación de Daniel.

### Sitio institucional general

| Oferta histórica | Precio de referencia |
|---|---:|
| Landing Starter | Desde USD 150 |
| Sitio Profesional | Desde USD 300 |
| Tienda Online | A cotizar |
| Solución personalizada | A cotizar |

### Brasil

| Oferta histórica | Precio de referencia |
|---|---:|
| Landing page informativa | R$ 750 |
| Sitio de tres secciones | R$ 1.250 |
| Sitio profesional con reservas, pagos y WhatsApp | Desde R$ 2.500 |
| Hosting y dominio | Cotizados aparte |

### Primer proyecto DEMO de hospedaje

| Concepto excepcional/histórico | Importe comunicado |
|---|---:|
| Dominio `.br` anual | Aproximadamente R$ 40 |
| Diseño y desarrollo, precio normal | R$ 1.300 |
| Diseño y desarrollo, precio especial | R$ 900 una vez |
| Mantenimiento mensual | R$ 150 |
| Doce meses anticipados | R$ 900 |
| Total anual comunicado | R$ 1.840 |

Las promociones del 50 % con vencimiento el 25 o 27 de julio de 2026 están vencidas y no deben mostrarse como actuales.

## Entregables comerciales mencionados

Se ofrecieron históricamente: sitio personalizado; imágenes de habitaciones y espacios; sección “Conheça-nos”; gestor propio de reservas; contacto por WhatsApp; posible integración de pagos; configuración de dominio; envío para indexación en Google; hasta tres rondas de cambios; y entrega final en hasta 72 horas cuando estuviera disponible el contenido.

Estos son antecedentes de propuestas. El repositorio confirma páginas personalizadas, imágenes, un gestor básico de solicitudes, contacto por WhatsApp y campos preparatorios para Pix. No confirma una integración de pagos, configuración de dominio, indexación, rondas contractuales o plazos de entrega.

## Identidad visual aportada

Colores principales: azul oscuro, azul intenso, blanco y naranja como acento. No hay logotipos, recursos ni estilos dentro del repositorio para confirmar valores, tipografías o aplicaciones específicas.

## Decisiones y antecedentes aportados

- Desarrollo mediante programación propia.
- No usar WordPress, Framer ni Astro como base decidida.
- Priorizar componentes reutilizables y código mantenible.
- Daniel y Cristian trabajan conjuntamente mediante cuentas y credenciales propias.
- GitHub, ramas, commits, issues y pull requests forman parte del flujo deseado.
- ChatGPT/Codex, VS Code y Git Bash forman parte del flujo local declarado.
- Existió una referencia a `PWPE-Reservas-v1`, repositorio público de Cristian con rama `master`, `index.html`, `css/`, `js/`, `readme.md` y `changelog.md`. El repositorio vigente inspeccionado es `cristianbarriospwpe/pwpe-reservas-app`, también con rama predeterminada `master`, y utiliza una arquitectura distinta basada en Next.js y Supabase.
