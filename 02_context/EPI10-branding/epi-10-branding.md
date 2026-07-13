---
project: EPI10 Salud
artifact_type: branding_proxy
status: working_draft
purpose: Configuración visual del backoffice y portal cliente en Healthie
---

# Proxy de Branding Guidelines — EPI10 Salud

> Este documento no constituye un manual de marca oficial.  
> Es una aproximación operativa elaborada a partir de la identidad visual pública de EPI10 para mantener coherencia de marca durante la configuración de Healthie y otros entornos digitales.

## 1. Dirección visual

La identidad de EPI10 Salud combina cuatro territorios principales:

- Salud personalizada.
- Ciencia y genética.
- Innovación.
- Tecnología aplicada.

La interfaz debe transmitir una imagen:

> Científica, tecnológica, limpia, cercana y premium.

Debe evitarse tanto una estética excesivamente hospitalaria como una apariencia demasiado futurista o experimental.

---

## 2. Paleta de colores

### Colores principales

| Token | Color HEX aproximado | Uso recomendado |
|---|---:|---|
| Azul principal | `#0752B5` | Botones principales, navegación activa, enlaces y acciones clave |
| Azul medio | `#62ADDA` | Elementos secundarios, iconos, indicadores y fondos destacados |
| Azul claro | `#97C6E2` | Fondos suaves, tarjetas informativas y elementos auxiliares |
| Verde lima EPI10 | `#D5DF00` | Acentos, progreso, estados positivos y pequeños destacados |
| Grafito | `#2D2D2D` | Texto principal |
| Gris secundario | `#6B7280` | Texto auxiliar, descripciones y metadatos |
| Fondo suave | `#F4F8FB` | Fondos de secciones, formularios y tarjetas |
| Blanco | `#FFFFFF` | Fondo principal |

### Tokens recomendados

```css
:root {
  --epi10-primary: #0752B5;
  --epi10-secondary: #62ADDA;
  --epi10-light-blue: #97C6E2;
  --epi10-accent: #D5DF00;

  --epi10-text-primary: #2D2D2D;
  --epi10-text-secondary: #6B7280;

  --epi10-background: #FFFFFF;
  --epi10-surface: #F4F8FB;
}