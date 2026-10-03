# Create a Checkout Session

## Prerequisites

Before you can run the following code snippet, you need to call these APIs with the provided parameters to set up the prerequisite API object(s).

1. createPrice
POST /v1/prices {"currency":"usd","unit_amount":1000,"recurring":{"interval":"month"},"product_data":{"name":"Gold Plan"}}

## Request

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>" \
  --data-urlencode "success_url=https://example.com/success" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=2" \
  -d mode=payment
```

### Response

```json
{
  "id": "cs_test_a11YYufWQzNY63zpQ6QSNRQhkUpVph4WRmzW0zWJO2znZKdVujZ0N0S22u",
  "object": "checkout.session",
  "after_expiration": null,
  "allow_promotion_codes": null,
  "amount_subtotal": 2198,
  "amount_total": 2198,
  "automatic_tax": {
    "enabled": false,
    "liability": null,
    "status": null
  },
  "billing_address_collection": null,
  "cancel_url": null,
  "client_reference_id": null,
  "consent": null,
  "consent_collection": null,
  "created": 1679600215,
  "currency": "usd",
  "custom_fields": [],
  "custom_text": {
    "shipping_address": null,
    "submit": null
  },
  "customer": null,
  "customer_creation": "if_required",
  "customer_details": null,
  "customer_email": null,
  "expires_at": 1679686615,
  "invoice": null,
  "invoice_creation": {
    "enabled": false,
    "invoice_data": {
      "account_tax_ids": null,
      "custom_fields": null,
      "description": null,
      "footer": null,
      "issuer": null,
      "metadata": {},
      "rendering_options": null
    }
  },
  "livemode": false,
  "locale": null,
  "metadata": {},
  "mode": "payment",
  "payment_intent": null,
  "payment_link": null,
  "payment_method_collection": "always",
  "payment_method_options": {},
  "payment_method_types": [
    "card"
  ],
  "payment_status": "unpaid",
  "phone_number_collection": {
    "enabled": false
  },
  "recovered_from": null,
  "setup_intent": null,
  "shipping_address_collection": null,
  "shipping_cost": null,
  "shipping_details": null,
  "shipping_options": [],
  "status": "open",
  "submit_type": null,
  "subscription": null,
  "success_url": "https://example.com/success",
  "total_details": {
    "amount_discount": 0,
    "amount_shipping": 0,
    "amount_tax": 0
  },
  "return_url": null,
  "ui_mode": "hosted_page",
  "url": "https://checkout.stripe.com/c/pay/cs_test_a11YYufWQzNY63zpQ6QSNRQhkUpVph4WRmzW0zWJO2znZKdVujZ0N0S22u#fidkdWxOYHwnPyd1blpxYHZxWjA0SDdPUW5JbmFMck1wMmx9N2BLZjFEfGRUNWhqTmJ%2FM2F8bUA2SDRySkFdUV81T1BSV0YxcWJcTUJcYW5rSzN3dzBLPUE0TzRKTTxzNFBjPWZEX1NKSkxpNTVjRjN8VHE0YicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl"
}
```

- `branding_settings` (object, optional)
  The branding settings for the Checkout Session. This parameter is not allowed if ui_mode is `elements`.

  - `branding_settings.background_color` (string, optional)
    A hex color value starting with `#` representing the background color for the Checkout Session.

  - `branding_settings.border_style` (enum, optional)
    The border style for the Checkout Session.
Possible enum values:
    - `pill`
      Uses pill-shaped corners on the Checkout Session.

    - `rectangular`
      Uses rectangular corners on the Checkout Session.

    - `rounded`
      Uses rounded corners on the Checkout Session.

  - `branding_settings.button_color` (string, optional)
    A hex color value starting with `#` representing the button color for the Checkout Session.

  - `branding_settings.display_name` (string, optional)
    A string to override the business name shown on the Checkout Session. This only shows at the top of the Checkout page, and your business name still appears in terms, receipts, and other places.

  - `branding_settings.font_family` (enum, optional)
    The font family for the Checkout Session corresponding to one of the [supported font families](https://docs.stripe.com/payments/checkout/customization/appearance.md?payment-ui=stripe-hosted#font-compatibility).
Possible enum values:
    - `be_vietnam_pro`
      The `Be Vietnam Pro` font family.

    - `bitter`
      The `Bitter` font family.

    - `chakra_petch`
      The `Chakra Petch` font family.

    - `default`
      The `default` font family.

    - `hahmlet`
      The `Hahmlet` font family.

    - `inconsolata`
      The `Inconsolata` font family.

    - `inter`
      The `Inter` font family.

    - `lato`
      The `Lato` font family.

    - `lora`
      The `Lora` font family.

    - `m_plus_1_code`
      The `M PLUS 1 Code` font family.

    - `montserrat`
      The `Montserrat` font family.

    - `noto_sans`
      The `Noto Sans` font family.

    - `noto_sans_jp`
      The `Noto Sans JP` font family.

    - `noto_serif`
      The `Noto Serif` font family.

    - `nunito`
      The `Nunito` font family.

    - `open_sans`
      The `Open Sans` font family.

    - `pridi`
      The `Pridi` font family.

    - `pt_sans`
      The `PT Sans` font family.

    - `pt_serif`
      The `PT Serif` font family.

    - `raleway`
      The `Raleway` font family.

    - `roboto`
      The `Roboto` font family.

    - `roboto_slab`
      The `Roboto Slab` font family.

    - `source_sans_pro`
      The `Source Sans Pro` font family.

    - `titillium_web`
      The `Titillium Web` font family.

    - `ubuntu_mono`
      The `Ubuntu Mono` font family.

    - `zen_maru_gothic`
      The `Zen Maru Gothic` font family.

  - `branding_settings.icon` (object, optional)
    The icon for the Checkout Session. For best results, use a square image.

    - `branding_settings.icon.type` (enum, required)
      The type of image for the icon. Must be one of `file` or `url`.

    - `branding_settings.icon.file` (string, optional)
      The ID of a [File upload](https://docs.stripe.com/api/files.md) representing the icon. Purpose must be `business_icon`. Required if `type` is `file` and disallowed otherwise.

    - `branding_settings.icon.url` (string, optional)
      The URL of the image. Required if `type` is `url` and disallowed otherwise.

  - `branding_settings.logo` (object, optional)
    The logo for the Checkout Session.

    - `branding_settings.logo.type` (enum, required)
      The type of image for the logo. Must be one of `file` or `url`.

    - `branding_settings.logo.file` (string, optional)
      The ID of a [File upload](https://docs.stripe.com/api/files.md) representing the logo. Purpose must be `business_logo`. Required if `type` is `file` and disallowed otherwise.

    - `branding_settings.logo.url` (string, optional)
      The URL of the image. Required if `type` is `url` and disallowed otherwise.
