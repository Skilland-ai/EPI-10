#!/usr/bin/env python3
"""Create/reuse and verify the EPI10 demo Payment Link in the authorized sandbox."""
import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path

MODULE = Path(__file__).resolve().parents[1]
CONFIG = json.loads((MODULE / 'config/catalogo_demo.json').read_text())
ACCOUNT = 'acct_1UFzBqRrJS0VSqzs'
assert CONFIG['account_id'] == ACCOUNT and CONFIG['livemode'] is False


def api(method, path, params=None, idempotency=None):
    args = ['npx', '--yes', '@stripe/cli@1.50.11', method, path,
            '--stripe-context', ACCOUNT]
    if method == 'post':
        args += ['--confirm', '--idempotency', idempotency]
    for key, value in (params or {}).items():
        args += ['-d', f'{key}={value}']
    response = subprocess.run(args, capture_output=True, text=True, timeout=45)
    try:
        value = json.loads(response.stdout)
    except json.JSONDecodeError:
        raise SystemExit('Stripe CLI did not return JSON; credentials were not logged.')
    if response.returncode or 'error' in value:
        error = value.get('error', {})
        raise SystemExit(json.dumps({key: error.get(key) for key in ('type', 'param', 'code')}))
    return value


def main():
    account = api('get', '/v1/account')
    assert account['id'] == ACCOUNT
    brand = account['settings']['branding']
    assert brand['logo'] == CONFIG['branding_file_id']
    assert brand['primary_color'] == '#F8F5EF'
    assert brand['secondary_color'] == '#044799'
    price = api('get', '/v1/prices/' + CONFIG['price_id'])
    assert price['livemode'] is False and price['unit_amount'] == 10000
    assert price['currency'] == 'eur' and price['type'] == 'one_time'

    links = api('get', '/v1/payment_links', {'limit': 100})
    assert not links['has_more'], 'Review pagination before changing a larger catalog.'
    matches = [link for link in links['data']
               if link['metadata'].get('linear_issue') == 'SKI-49']
    assert len(matches) <= 1, 'Multiple demo links; review before proceeding.'
    params = {
        'line_items[0][price]': CONFIG['price_id'],
        'line_items[0][quantity]': '1',
        'line_items[0][adjustable_quantity][enabled]': 'false',
        'payment_method_types[0]': 'card',
        'automatic_tax[enabled]': 'false',
        'invoice_creation[enabled]': 'false',
        'allow_promotion_codes': 'false',
        'phone_number_collection[enabled]': 'false',
        'tax_id_collection[enabled]': 'false',
        'billing_address_collection': 'auto',
        'customer_creation': 'if_required',
        'after_completion[type]': 'hosted_confirmation',
        'after_completion[hosted_confirmation][custom_message]':
            'Pago de prueba completado. Has completado la compra de demostración '
            'de NutriWell. No se ha realizado ningún cobro real ni contratado el servicio.',
        'custom_text[submit][message]':
            'Demostración de EPI10 Salud. Usa únicamente datos de prueba. '
            'No se realiza ningún cobro real ni se contrata el servicio.',
        'submit_type': 'pay',
        'metadata[demo]': 'true',
        'metadata[project]': 'epi10',
        'metadata[linear_issue]': 'SKI-49',
        'payment_intent_data[metadata][demo]': 'true',
        'payment_intent_data[metadata][product]': 'nutriwell',
        'payment_intent_data[description]': 'NutriWell · DEMO — 100 EUR ficticios, pago único',
    }
    link = matches[0] if matches else api(
        'post', '/v1/payment_links', params, 'epi10-nutriwell-demo-payment-link-v2')
    link = api('get', '/v1/payment_links/' + link['id'])
    items = api('get', '/v1/payment_links/' + link['id'] + '/line_items', {'limit': 100})
    assert len(items['data']) == 1 and not items['has_more']
    item = items['data'][0]
    checks = {
        'sandbox': link['livemode'] is False,
        'active': link['active'] is True,
        'card': link['payment_method_types'] == ['card'],
        'currency': link['currency'] == 'eur',
        'quantity': item['quantity'] == 1,
        'price': item['price']['id'] == CONFIG['price_id'],
        'total': item['amount_total'] == 10000,
        'one_time': item['price']['type'] == 'one_time',
        'no_tax': link['automatic_tax']['enabled'] is False,
        'no_invoice': link['invoice_creation']['enabled'] is False,
        'no_promotion': link['allow_promotion_codes'] is False,
        'no_phone': link['phone_number_collection']['enabled'] is False,
        'no_shipping': link['shipping_address_collection'] is None and not link['shipping_options'],
        'no_custom_fields': not link['custom_fields'],
        'confirmation': link['after_completion']['type'] == 'hosted_confirmation',
        'demo_notice': 'ningún cobro real' in link['custom_text']['submit']['message'],
        'branding': brand['logo'] == CONFIG['branding_file_id'] and brand['secondary_color'] == '#044799',
    }
    assert all(checks.values()), checks
    stamp = datetime.now(timezone.utc).isoformat()
    output = {
        'verified_at': stamp, 'account_id': ACCOUNT,
        'integration': 'payment_link', 'payment_link_id': link['id'],
        'url': link['url'] + '?locale=es', 'livemode': False,
        'quantity': 1, 'adjustable_quantity': False,
        'payment_method_types': ['card'], 'automatic_tax': False, 'invoice_creation': False,
        'after_completion': link['after_completion'],
        'branding': brand, 'api_checks': checks,
        'browser_verified': False, 'payment_tested': False,
    }
    (MODULE / 'config/checkout_demo.json').write_text(json.dumps(output, ensure_ascii=False, indent=2) + '\n')
    (MODULE / 'evidencias/2026-09-15_checkout_api.json').write_text(json.dumps({
        'verified_at': stamp, 'account_id': ACCOUNT, 'branding': brand,
        'request_params': params, 'payment_link': link, 'line_items': items,
        'checks': checks, 'payment_tested': False,
    }, ensure_ascii=False, indent=2) + '\n')
    CONFIG['checkout_settings_applied'] = True
    CONFIG['payment_link_id'] = link['id']
    CONFIG['checkout_url'] = output['url']
    (MODULE / 'config/catalogo_demo.json').write_text(json.dumps(CONFIG, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({'result': 'PASS', 'id': link['id'], 'url': output['url'],
                      'checks': checks, 'payment_tested': False}, ensure_ascii=False))


if __name__ == '__main__':
    main()
