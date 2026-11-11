# OpenEMR 8.4.1 (imagen fijada por digest: la misma que la instancia de hermes-node) con los dos
# módulos de EPI10 tal como están instalados allí (epi10-oe-module main da8ff4d, SKI2-275).
# `modules/` lo prepara preparar.sh; no se versiona aquí, la fuente es el repo epi10-oe-module.
FROM openemr/openemr@sha256:a2205ccbe3cbed02cccd4f4e9a32338dd1c68c26cd87ef8046802b5f65187803
COPY --chown=apache:apache modules/oe-module-epi10 /var/www/localhost/htdocs/openemr/interface/modules/custom_modules/oe-module-epi10
COPY --chown=apache:apache modules/oe-module-epi10-ui /var/www/localhost/htdocs/openemr/interface/modules/custom_modules/oe-module-epi10-ui
