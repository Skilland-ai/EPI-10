# Personaliza la apariencia

Personaliza los colores, las fuentes, las formas y mucho más de tu página de compra.

# Página alojada completa


## Aplicar imagen de marca

#### Dashboard

Puedes aplicar la imagen de marca personalizada a Checkout. Ve a [Configuración de imagen de marca](https://dashboard.stripe.com/settings/branding/checkout) para:

- Cargar un logotipo o icono
- Personaliza el color de fondo, el color del botón, la fuente y las formas de la página de Checkout

### Imagen de marca con Connect

El proceso de compra utiliza la configuración de marca de los cargos indirectos de las cuentas conectadas con `on_behalf_of` y para las plataformas que realizan cargos directos. Para las cuentas conectadas que no tienen acceso al Dashboard completo de Stripe (incluidas las cuentas Express y Custom), las plataformas pueden configurar los ajustes de marca con la API [Accounts](https://docs.stripe.com/api/accounts/object.md#account_object-settings-branding).

#### API

Puedes aplicar imágenes de marca personalizada a una Sesión de Checkout utilizando el parámetro [branding_settings](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-branding_settings) para:

- Establecer un logotipo o icono
- Personaliza el color de fondo, el color del botón, la fuente y las formas de la página de Checkout
- Cambia el nombre de tu marca

De forma predeterminada, aplicamos la imagen de marca personalizada establecida en el Dashboard a tus Sessions de Checkout. Si omites un campo en `branding_settings`, Checkout aplica el valor predeterminado desde el Dashboard.

Si especificas el [logotipo](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-branding_settings-logo) y el [icono](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-branding_settings-icon), la página proceso de Checkout mostrará el logotipo y usará el icono como icono. Si solo especificas el `logo`, la página de Checkout mostrará el logotipo y Checkout usará el icono de la [configuración de imagen](https://dashboard.stripe.com/settings/branding/checkout) de marca como icono. Si solo especificas el `icon`, la página de Checkout mostrará el icono y también lo usará como icono.

> Las facturas de una Checkout Session siguen utilizando la [configuración de imagen de marca](https://dashboard.stripe.com/settings/branding) establecida en el Dashboard. Asegúrate de utilizar una configuración de marca coherente y reconocible para tus clientes, a fin de reducir la confusión y el riesgo de contracargos.

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=1" \
  -d mode=payment \
  -d "branding_settings[icon][type]=file" \
  -d "branding_settings[icon][file]={{FILE_ID}}" \
  -d "branding_settings[logo][type]=file" \
  -d "branding_settings[logo][file]={{FILE_ID}}" \
  -d "branding_settings[display_name]=Powdur" \
  -d "branding_settings[font_family]=roboto" \
  -d "branding_settings[border_style]=rectangular" \
  --data-urlencode "branding_settings[background_color]=#7D8CC4" \
  --data-urlencode "branding_settings[button_color]=#A0D2DB" \
  --data-urlencode "success_url=https://example.com/success"
```

### Imagen de marca con Connect

Proceso de compra utiliza la configuración de marca de la cuenta conectada para cargos indirectos con `on_behalf_of` y para plataformas que realizan cargos directos. Para cuentas conectadas sin acceso al Dashboard completo de Stripe (incluye cuentas Express y Custom), las plataformas pueden configurar los ajustes de marca con la API [Accounts](https://docs.stripe.com/api/accounts/object.md#account_object-settings-branding). Para anularla configuración de marca de la cuenta conectada, establece [branding_settings](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-branding_settings) cuando crees la Sesión de Checkout.

## Cambia el nombre de tu marca

Puedes cambiar el nombre de una página de pago modificando el campo **Nombre de la empresa** en [Business details settings](https://dashboard.stripe.com/settings/business-details) o configurando [branding_settings.display_name](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-branding_settings-display_name).

También puedes [personalizar el nombre de dominio](https://docs.stripe.com/payments/checkout/custom-domains.md) de una página de Checkout alojada en Stripe.

> Asegúrate de usar un nombre de empresa que sea coherente y reconocible por tus clientes para reducir la confusión y el riesgo de contracargos. Las reglas de la red también suelen exigir que uses nombre de empresa y logotipo precisos y coherentes.

## Compatibilidad de fuentes

Cada fuente personalizada es compatible con un [subconjunto de configuraciones regionales](https://docs.stripe.com/js/appendix/supported_locales). Puedes establecer explícitamente la configuración regional de una sesión de Checkout transmitiendo el campo de configuración regional al crear la sesión, o bien usar la configuración predeterminada `auto` en la que Checkout elige una configuración regional en función de la configuración del navegador del cliente.

En la tabla siguiente se enumeran las configuraciones regionales no admitidas para cada fuente. Es posible que los idiomas de estas configuraciones regionales queden fuera del intervalo de caracteres admitidos para una fuente determinada. En esos casos, Stripe presenta la página de Checkout con una fuente alternativa del sistema adecuada. Si eliges una fuente Serif, pero no es compatible con ninguna configuración regional, Stripe recurre a una fuente basada en Serif.

| Familia tipográfica | Configuraciones regionales no aceptadas                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------------------- |
| Be Vietnam Pro      | `bg`, `el`, `ja`, `ko`, `ru`, `th`, `zh`, `zh-HK`, `zh-TW`                                                 |
| Bitter              | `el`, `ja`, `ko`, `th`, `zh`, `zh-HK`, `zh-TW`                                                             |
| Chakra Petch        | `bg`, `el`, `ja`, `ko`, `ru`, `zh`, `zh-HK`, `zh-TW`                                                       |
| Hahmlet             | `bg`, `el`, `ja`, `ko`, `ru`, `th`, `zh`, `zh-HK`, `zh-TW`                                                 |
| Inconsolata         | `bg`, `el`, `ja`, `ko`, `ru`, `th`, `zh`, `zh-HK`, `zh-TW`                                                 |
| Inter               | `ja`, `ko`, `th`, `zh`, `zh-HK`, `zh-TW`                                                                   |
| Lato                | `bg`, `cs`, `el`, `hr`, `ja`, `ko`, `lt`, `lv`, `mt`, `ro`, `ru`, `sl`, `th`, `vi`, `zh`, `zh-HK`, `zh-TW` |
| Lora                | `el`, `ja`, `ko`, `th`, `zh`, `zh-HK`, `zh-TW`                                                             |
| M PLUS 1 Code       | `bg`, `el`, `ko`, `lt`, `lv`, `ru`, `sk`, `sl`, `th`, `tr`                                                 |
| Montserrat          | `el`, `hr`, `ja`, `ko`, `ru`, `th`, `zh`, `zh-HK`, `zh-TW`                                                 |
| Nunito              | `el`, `ja`, `ko`, `th`, `zh`, `zh-HK`, `zh-TW`                                                             |
| Noto Sans           | `ja`, `ko`, `th`                                                                                           |
| Noto Serif          | `th`                                                                                                       |
| Open Sans           | `ja`, `ko`, `th`, `zh`, `zh-HK`, `zh-TW`                                                                   |
| PT Sans             | `el`, `ja`, `ko`, `th`, `vi`, `zh`, `zh-HK`, `zh-TW`                                                       |
| PT Serif            | `el`, `ja`, `ko`, `th`, `vi`, `zh`, `zh-HK`, `zh-TW`                                                       |
| Pridi               | `bg`, `el`, `ja`, `ko`, `ru`, `zh`, `zh-HK`, `zh-TW`                                                       |
| Raleway             | `el`, `ja`, `ko`, `th`, `zh`, `zh-HK`, `zh-TW`                                                             |
| Roboto              | `ja`, `ko`, `zh`, `zh-HK`, `zh-TW`                                                                         |
| Roboto Slab         | `ja`, `ko`, `th`, `zh`, `zh-HK`, `zh-TW`                                                                   |
| Source Sans Pro     | `bg`, `el`, `ja`, `ko`, `ru`, `th`, `zh`, `zh-HK`, `zh-TW`                                                 |
| Titillium Web       | `bg`, `el`, `ja`, `ko`, `th`, `vi`, `zh`, `zh-HK`, `zh-TW`                                                 |
| Ubuntu Mono         | `ja`, `ko`, `th`, `zh`, `zh-HK`, `zh-TW`                                                                   |
| Zen Maru Gothic     | `bg`, `cs`, `el`, `hr`, `ko`, `lt`, `lv`, `pl`, `ro`, `ru`, `sk`, `th`, `vi`                               |

