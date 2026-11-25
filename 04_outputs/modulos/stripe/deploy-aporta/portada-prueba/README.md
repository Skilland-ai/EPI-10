# Pila de pruebas de la portada

Sirve `../portada/` con Caddy real y el mismo `../portada.caddy` del despliegue (solo cambia la dirección a `:80`). La puerta es simulada (`puerta-simulada.mjs`): responde `/__verificar`, `/__puerta/yo` y `/__puerta/salir`.

En hermes-node:

```bash
hn push <repo>/04_outputs/modulos/stripe/deploy-aporta epi10-portada
hn sh 'cd ~/Projects/epi10-portada/portada-prueba && ./levantar.sh 4131 && BASE=http://127.0.0.1:4131 node --test portada.test.mjs'
hn open 4131        # http://localhost:4131 en el navegador del ASUS
hn sh 'cd ~/Projects/epi10-portada/portada-prueba && docker compose down'
```

Para ver la portada cuando la puerta no da nombre (puerta antigua), pon la cookie `sinyo=1`.
