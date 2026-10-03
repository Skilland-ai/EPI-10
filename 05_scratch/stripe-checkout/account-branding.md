# Update an account

## Request

```curl
curl https://api.stripe.com/v1/accounts/{{ACCOUNT_ID}} \
  -u "<<YOUR_SECRET_KEY>>" \
  -d "metadata[order_id]=6735"
```

### Response

```json
{
  "id": "acct_1Nv0FGQ9RKHgCVdK",
  "object": "account",
  "business_profile": {
    "annual_revenue": null,
    "estimated_worker_count": null,
    "mcc": null,
    "name": null,
    "product_description": null,
    "support_address": null,
    "support_email": null,
    "support_phone": null,
    "support_url": null,
    "url": null
  },
  "business_type": null,
  "capabilities": {},
  "charges_enabled": false,
  "controller": {
    "fees": {
      "payer": "application"
    },
    "is_controller": true,
    "losses": {
      "payments": "application"
    },
    "requirement_collection": "stripe",
    "stripe_dashboard": {
      "type": "express"
    },
    "type": "application"
  },
  "country": "US",
  "created": 1695830751,
  "default_currency": "usd",
  "details_submitted": false,
  "email": "jenny.rosen@example.com",
  "external_accounts": {
    "object": "list",
    "data": [],
    "has_more": false,
    "total_count": 0,
    "url": "/v1/accounts/acct_1Nv0FGQ9RKHgCVdK/external_accounts"
  },
  "future_requirements": {
    "alternatives": [],
    "current_deadline": null,
    "currently_due": [],
    "disabled_reason": null,
    "errors": [],
    "eventually_due": [],
    "past_due": [],
    "pending_verification": []
  },
  "login_links": {
    "object": "list",
    "total_count": 0,
    "has_more": false,
    "url": "/v1/accounts/acct_1Nv0FGQ9RKHgCVdK/login_links",
    "data": []
  },
  "metadata": {
    "order_id": "6735"
  },
  "payouts_enabled": false,
  "requirements": {
    "alternatives": [],
    "current_deadline": null,
    "currently_due": [
      "business_profile.mcc",
      "business_profile.url",
      "business_type",
      "external_account",
      "representative.first_name",
      "representative.last_name",
      "tos_acceptance.date",
      "tos_acceptance.ip"
    ],
    "disabled_reason": "requirements.past_due",
    "errors": [],
    "eventually_due": [
      "business_profile.mcc",
      "business_profile.url",
      "business_type",
      "external_account",
      "representative.first_name",
      "representative.last_name",
      "tos_acceptance.date",
      "tos_acceptance.ip"
    ],
    "past_due": [
      "business_profile.mcc",
      "business_profile.url",
      "business_type",
      "external_account",
      "representative.first_name",
      "representative.last_name",
      "tos_acceptance.date",
      "tos_acceptance.ip"
    ],
    "pending_verification": []
  },
  "settings": {
    "bacs_debit_payments": {
      "display_name": null,
      "service_user_number": null
    },
    "branding": {
      "icon": null,
      "logo": null,
      "primary_color": null,
      "secondary_color": null
    },
    "card_issuing": {
      "tos_acceptance": {
        "date": null,
        "ip": null
      }
    },
    "card_payments": {
      "decline_on": {
        "avs_failure": false,
        "cvc_failure": false
      },
      "statement_descriptor_prefix": null,
      "statement_descriptor_prefix_kanji": null,
      "statement_descriptor_prefix_kana": null
    },
    "dashboard": {
      "display_name": null,
      "timezone": "Etc/UTC"
    },
    "invoices": {
      "default_account_tax_ids": null
    },
    "payments": {
      "statement_descriptor": null,
      "statement_descriptor_kana": null,
      "statement_descriptor_kanji": null
    },
    "payouts": {
      "debit_negative_balances": true,
      "schedule": {
        "delay_days": 2,
        "interval": "daily"
      },
      "statement_descriptor": null
    },
    "sepa_debit_payments": {}
  },
  "tos_acceptance": {
    "date": null,
    "ip": null,
    "user_agent": null
  },
  "type": "none"
}
```

- `settings` (object, optional)
  Options for customizing how the account functions within Stripe.

  - `settings.bacs_debit_payments` (object, optional)
    Settings specific to Bacs Direct Debit payments.

    - `settings.bacs_debit_payments.display_name` (string, optional)
      The Bacs Direct Debit Display Name for this account. For payments made with Bacs Direct Debit, this name appears on the mandate as the statement descriptor. Mobile banking apps display it as the name of the business. To use custom branding, set the Bacs Direct Debit Display Name during or right after creation. Custom branding incurs an additional monthly fee for the platform. If you don’t set the display name before requesting Bacs capability, it’s automatically set as “Stripe” and the account is onboarded to Stripe branding, which is free.

  - `settings.branding` (object, optional)
    Settings used to apply the account’s branding to email receipts, invoices, Checkout, and other products.

    - `settings.branding.icon` (string, optional)
      (ID of a [file upload](https://docs.stripe.com/guides/file-upload.md)) An icon for the account. Must be square and at least 128px x 128px.

    - `settings.branding.logo` (string, optional)
      (ID of a [file upload](https://docs.stripe.com/guides/file-upload.md)) A logo for the account that will be used in Checkout instead of the icon and without the account’s name next to it if provided. Must be at least 128px x 128px.

    - `settings.branding.primary_color` (string, optional)
      A CSS hex color value representing the primary branding color for this account.

    - `settings.branding.secondary_color` (string, optional)
      A CSS hex color value representing the secondary branding color for this account.

  - `settings.card_issuing` (object, optional)
    Settings specific to the account’s use of the Card Issuing product.

    - `settings.card_issuing.tos_acceptance` (object, optional)
      Details on the account’s acceptance of the [Stripe Issuing Terms and Disclosures](https://docs.stripe.com/issuing/connect/tos_acceptance.md).

      - `settings.card_issuing.tos_acceptance.date` (timestamp, required if IP or user_agent is provided)
        The Unix timestamp marking when the account representative accepted the service agreement.

      - `settings.card_issuing.tos_acceptance.ip` (string, required if date or user_agent is provided)
        The IP address from which the account representative accepted the service agreement.

      - `settings.card_issuing.tos_acceptance.user_agent` (string, optional)
        The user agent of the browser from which the account representative accepted the service agreement.

  - `settings.card_payments` (object, optional)
    Settings specific to card charging on the account.

    - `settings.card_payments.decline_on` (object, optional)
      Automatically declines certain charge types regardless of whether the card issuer accepted or declined the charge.

      - `settings.card_payments.decline_on.avs_failure` (boolean, optional)
        Whether Stripe automatically declines charges with an incorrect ZIP or postal code. This setting only applies when a ZIP or postal code is provided and they fail bank verification.

      - `settings.card_payments.decline_on.cvc_failure` (boolean, optional)
        Whether Stripe automatically declines charges with an incorrect CVC. This setting only applies when a CVC is provided and it fails bank verification.

  - `settings.invoices` (object, optional)
    Settings specific to the account’s use of Invoices.

    - `settings.invoices.default_account_tax_ids` (array of strings, optional)
      The list of default Account Tax IDs to automatically include on invoices. Account Tax IDs get added when an invoice is finalized.

    - `settings.invoices.hosted_payment_method_save` (enum, optional)
      Whether to save the payment method after a payment is completed for a one-time invoice or a subscription invoice when the customer already has a default payment method on the hosted invoice page.
Possible enum values:
      - `always`
        The payment method, if reusable, will be saved for one-time invoice payments.

      - `never`
        The payment method will not be saved for one-time invoice payments.

      - `offer`
        The payment method, if reusable, will be saved for one-time invoice payments if the customer chooses to save it.

  - `settings.payments` (object, optional)
    Settings that apply across payment methods for charging on the account.

    - `settings.payments.statement_descriptor` (string, optional)
      The default text that appears on statements for non-card charges outside of Japan. For card charges, if you don’t set a `statement_descriptor_prefix`, this text is also used as the statement descriptor prefix. In that case, if concatenating the statement descriptor suffix causes the combined statement descriptor to exceed 22 characters, we truncate the `statement_descriptor` text to limit the full descriptor to 22 characters. For more information about statement descriptors and their requirements, see the [account settings documentation](https://docs.stripe.com/get-started/account/statement-descriptors.md).

    - `settings.payments.statement_descriptor_kana` (string, optional)
      The Kana variation of `statement_descriptor` used for charges in Japan. Japanese statement descriptors have [special requirements](https://docs.stripe.com/get-started/account/statement-descriptors.md#set-japanese-statement-descriptors).

    - `settings.payments.statement_descriptor_kanji` (string, optional)
      The Kanji variation of `statement_descriptor` used for charges in Japan. Japanese statement descriptors have [special requirements](https://docs.stripe.com/get-started/account/statement-descriptors.md#set-japanese-statement-descriptors).

    - `settings.payments.statement_descriptor_prefix` (string, optional)
      Default text that appears on statements for card charges outside of Japan, prefixing any dynamic `statement_descriptor_suffix` specified on the charge. To maximize space for the dynamic part of the descriptor, keep this text short. If you don’t specify this value, `statement_descriptor` is used as the prefix. For more information about statement descriptors and their requirements, see the [account settings documentation](https://docs.stripe.com/get-started/account/statement-descriptors.md).

    - `settings.payments.statement_descriptor_prefix_kana` (string, optional)
      The Kana variation of `statement_descriptor_prefix` used for card charges in Japan. Japanese statement descriptors have [special requirements](https://docs.stripe.com/get-started/account/statement-descriptors.md#set-japanese-statement-descriptors).

    - `settings.payments.statement_descriptor_prefix_kanji` (string, optional)
      The Kanji variation of `statement_descriptor_prefix` used for card charges in Japan. Japanese statement descriptors have [special requirements](https://docs.stripe.com/get-started/account/statement-descriptors.md#set-japanese-statement-descriptors).

  - `settings.payouts` (object, optional)
    Settings specific to the account’s payouts.

    - `settings.payouts.debit_negative_balances` (boolean, optional)
      A Boolean indicating whether Stripe should try to reclaim negative balances from an attached bank account. For details, see [Understanding Connect Account Balances](https://docs.stripe.com/connect/account-balances.md).

    - `settings.payouts.schedule` (object, optional)
      Details on when funds from charges are available, and when they are paid out to an external account. For details, see our [Setting Bank and Debit Card Payouts](https://docs.stripe.com/connect/bank-transfers.md#payout-information) documentation.

      - `settings.payouts.schedule.delay_days` (string, value is "minimum" | integer, optional)
        The number of days charge funds are held before being paid out. May also be set to `minimum`, representing the lowest available value for the account country. Default is `minimum`. The `delay_days` parameter remains at the last configured value if `interval` is `manual`. [Learn more about controlling payout delay days](https://docs.stripe.com/connect/manage-payout-schedule.md).

      - `settings.payouts.schedule.interval` (string, optional)
        How frequently available funds are paid out. One of: `daily`, `manual`, `weekly`, or `monthly`. Default is `daily`.

      - `settings.payouts.schedule.monthly_anchor` (integer, optional)
        The day of the month when available funds are paid out, specified as a number between 1–31. Payouts nominally scheduled between the 29th and 31st of the month are instead sent on the last day of a shorter month. Required and applicable only if `interval` is `monthly`.

      - `settings.payouts.schedule.monthly_payout_days` (array of integers, optional)
        The days of the month when available funds are paid out, specified as an array of numbers between 1–31. Payouts nominally scheduled between the 29th and 31st of the month are instead sent on the last day of a shorter month. Required and applicable only if `interval` is `monthly` and `monthly_anchor` is not set.

      - `settings.payouts.schedule.weekly_anchor` (string, optional)
        The day of the week when available funds are paid out, specified as `monday`, `tuesday`, etc. Required and applicable only if `interval` is `weekly`.

      - `settings.payouts.schedule.weekly_payout_days` (array of enums, optional)
        The days of the week when available funds are paid out, specified as an array, e.g., [`monday`, `tuesday`]. Required and applicable only if `interval` is `weekly`.
Possible enum values:
        - `monday`
          Select Monday as one of the weekly payout days

        - `tuesday`
          Select Tuesday as one of the weekly payout days

        - `wednesday`
          Select Wednesday as one of the weekly payout days

        - `thursday`
          Select Thursday as one of the weekly payout days

        - `friday`
          Select Friday as one of the weekly payout days

    - `settings.payouts.statement_descriptor` (string, optional)
      The text that appears on the bank account statement for payouts. If not set, this defaults to the platform’s bank descriptor as set in the Dashboard.

  - `settings.sepa_debit_payments` (object, optional)
    Settings specific to SEPA Direct Debit payments.

    - `settings.sepa_debit_payments.creditor_id` (string, optional)
      The business creditor id for european payments.
