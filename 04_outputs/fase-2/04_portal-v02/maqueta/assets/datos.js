/* EPI10 · Portal v0.2 · DATOS DE EJEMPLO
   Marta Gil Prieto es una clienta FICTICIA (la de la demo de la fase 1). Nada de esto es un dato real.
   Las fórmulas son las seis que citan la estrategia (CON-577) y el informe (CON-582). El catálogo real
   (composición, dosis, precios, declaraciones y canal de venta) está pedido a EPI10: aquí todo lo que
   depende de él va marcado como «ejemplo».
   Forma de los datos: la misma que el JSON del informe visual (areas, prioridades, habitos, complementos),
   porque el plan sale del informe como datos. */
window.EPI = {
  hoy: "jueves 3 de diciembre",
  clienta: { nombre: "Marta", completo: "Marta Gil Prieto", iniciales: "MG", edad: 44, codigo: "EP-00412 (ficticio)",
             alta: "13 oct 2026", informe: "2 nov 2026", sesion: "5 nov 2026", planDesde: "6 nov 2026" },

  // Estados: verde «Vas bien» · ambar «Mejorable» · rojo «Prioridad» · gris «Sin datos todavía»
  estados: { verde: "Vas bien", ambar: "Mejorable", rojo: "Prioridad", gris: "Sin datos todavía" },

  // Las cinco áreas de la rueda (hipótesis de la estrategia, por validar en el workshop)
  areas: [
    { id: "nutricion", nombre: "Nutrición", estado: "verde", habitos: 4, genetica: 1.7,
      frase: "Comes variado. Mantén la verdura en la cena.",
      gen: "Tendencia media a colesterol LDL alto.", hab: "Dieta variada; fruta y verdura casi a diario." },
    { id: "movimiento", nombre: "Movimiento", estado: "ambar", habitos: 2, genetica: 1.4,
      frase: "Pasas muchas horas sentada. Caminar te ayuda también a dormir.",
      gen: "Sin señales genéticas destacables.", hab: "Más de 8 h sentada; actividad uno o dos días por semana." },
    { id: "descanso", nombre: "Descanso", estado: "rojo", habitos: 2, genetica: 2.6,
      frase: "Duermes unas 6 horas y te despiertas de madrugada.",
      gen: "Tendencia a sueño ligero y a eliminar la cafeína despacio.", hab: "6 horas; te despiertas de madrugada casi a diario." },
    { id: "estres", nombre: "Estrés y energía", estado: "ambar", habitos: 2, genetica: 2.1,
      frase: "Jornadas largas y te cuesta desconectar por la noche.",
      gen: "Respuesta al estrés algo más intensa (señal media).", hab: "Estrés frecuente; cansancio a media tarde." },
    { id: "complementacion", nombre: "Complementación", estado: "ambar", habitos: 3, genetica: 1.8,
      frase: "Tomas cuatro productos: uno sobra y dos hay que revisarlos.",
      gen: "Metabolismo lento de la cafeína.", hab: "Magnesio, omega-3, melatonina ocasional y un quemagrasas con cafeína." }
  ],

  prioridades: [
    { n: 1, area: "descanso", estado: "rojo", titulo: "Recupera el sueño profundo",
      frase: "Duermes unas 6 horas y te despiertas de madrugada. Tu genética apunta a un sueño ligero.",
      accion: "Sin pantallas 30 minutos antes de dormir y cafeína solo por la mañana.",
      ayuda: { tipo: "formula", nombre: "Nocticum" }, revisa: "Noches que duermes bien, de 7" },
    { n: 2, area: "estres", estado: "ambar", titulo: "Desconecta al acabar el día",
      frase: "Jornadas largas y cenas tarde. Cuesta bajar el ritmo antes de dormir.",
      accion: "Cena antes de las 21:00. Tras la revisión, cinco minutos de respiración al salir del trabajo.",
      ayuda: { tipo: "sin", nombre: "Sin producto: solo hábitos" }, revisa: "Días que desconectas antes de las 22:00" },
    { n: 3, area: "movimiento", estado: "ambar", titulo: "Camina 30 minutos al día",
      frase: "Pasas más de 8 horas sentada. Moverte de día también ayuda a dormir de noche.",
      accion: "Treinta minutos a paso ligero, mejor con luz de día.",
      ayuda: { tipo: "sin", nombre: "Sin producto: solo hábitos" }, revisa: "Días que caminas 30 minutos" }
  ],

  // Rejilla: 1 = sí, 0 = no, 2 = saltar, null = día por venir. Semana actual: L 30 nov a D 6 dic (hoy es jueves).
  habitos: [
    { id: "pantallas", nombre: "Sin pantallas 30′ antes de dormir", area: "descanso", estado: "ambar",
      semana: [1, 0, 1, null, null, null, null], historial: [[0,1,0,1,0,1,0],[1,1,0,1,0,1,1],[1,0,1,1,1,0,1]],
      indicador: "Noches que duermes bien, de 7", tira: ["r","a","a","a"] },
    { id: "cena", nombre: "Cenar antes de las 21:00", area: "estres", estado: "verde",
      semana: [1, 1, 1, null, null, null, null], historial: [[1,0,1,1,0,1,1],[1,1,1,0,1,1,1],[1,1,1,1,0,1,1]],
      indicador: "Días que desconectas antes de las 22:00", tira: ["a","a","v","v"] },
    { id: "caminar", nombre: "Caminar 30 minutos", area: "movimiento", estado: "ambar",
      semana: [1, 2, 1, null, null, null, null], historial: [[0,0,1,0,1,0,0],[1,0,1,0,1,0,1],[1,1,0,1,0,2,1]],
      indicador: "Días que caminas 30 minutos", tira: ["r","a","a","a"] }
  ],
  habitoSiguiente: { nombre: "Respirar 5 minutos al salir del trabajo", area: "estres",
                     nota: "Se suma tras tu revisión, si te ves con fuerzas. El primer mes, pocos hábitos." },

  // Suplementación: tomar (cian) · mantener (verde) · revisar (ámbar) · dejar (rojo). Lo decide el profesional.
  suplementos: [
    { id: "nocticum", estado: "tomar", nombre: "Nocticum", epi10: true, area: "descanso",
      queEs: "Fórmula de EPI10 para la rutina de descanso",
      porque: "Te despiertas de madrugada y tu perfil apunta a un sueño ligero.",
      orig: [["hab", "Te despiertas de madrugada casi a diario"], ["gen", "Tendencia a sueño ligero"]],
      como: "Por la noche, antes de dormir. La dosis exacta, la de la etiqueta.",
      evidencia: "Por confirmar con la ficha de EPI10",
      declaracion: "Declaración autorizada de la UE: la aporta EPI10 con la ficha del producto.",
      precio: "24,90 € · 30 días", quedan: 6, ejemplo: true },
    { id: "omega3", estado: "mantener", nombre: "Omega-3", epi10: false, area: "nutricion",
      queEs: "Ácidos grasos EPA y DHA",
      porque: "Comes pescado azul menos de una vez por semana.",
      orig: [["hab", "Pescado azul: menos de una vez por semana"]],
      como: "Con una comida. Elige uno que diga cuánto EPA + DHA lleva por cápsula, no solo el aceite total.",
      evidencia: "Sólida",
      declaracion: "El EPA y el DHA contribuyen al funcionamiento normal del corazón (con una ingesta diaria de 250 mg).",
      buscalo: "No lo vendemos. Búscalo así: EPA + DHA por cápsula en la etiqueta." },
    { id: "magnesio", estado: "revisar", nombre: "Magnesio", epi10: false, area: "complementacion",
      queEs: "Lo tomas por tu cuenta desde el verano",
      porque: "Puede solaparse con Nocticum. Lo miramos junto a su composición para no duplicar.",
      orig: [["hab", "Lo tomas cada noche"]],
      como: "Sigue como hasta ahora hasta tu sesión de revisión.",
      evidencia: "Depende de la dosis y de lo que ya tomas",
      buscalo: "No lo vendemos. Si lo mantienes, mira la dosis diaria en la etiqueta." },
    { id: "melatonina", estado: "revisar", nombre: "Melatonina", epi10: false, area: "descanso",
      queEs: "La tomas algunas noches",
      porque: "Con tu plan de descanso puede que no te haga falta. Lo vemos en la sesión.",
      orig: [["hab", "Algunas noches, cuando te desvelas"]],
      como: "No la combines con Nocticum sin hablarlo antes con tu profesional.",
      evidencia: "Depende de para qué la tomes",
      buscalo: "No lo vendemos." },
    { id: "termogenico", estado: "dejar", nombre: "Quemagrasas con cafeína", epi10: false, area: "descanso",
      queEs: "Lo tomas a media tarde",
      porque: "Eliminas la cafeína despacio: tomada por la tarde, puede restarte sueño.",
      orig: [["gen", "Metabolismo lento de la cafeína"], ["hab", "Lo tomas hacia las 17:00"]],
      como: "Déjalo. Si quieres café, mejor antes de las 12:00.",
      evidencia: "—" }
  ],

  // Las seis fórmulas de EPI10 (estrategia §2, cuestionario multifórmula). Catálogo de EJEMPLO: pendiente del real.
  formulas: [
    { id: "lesinot", nombre: "Lesinot", foco: "Músculos, tendones y tejidos de soporte", area: "movimiento", ojo: "Contiene pescado según el cuestionario: no es la primera opción con alergia al pescado." },
    { id: "inarticum", nombre: "Inarticum", foco: "Movilidad y confort articular diario", area: "movimiento" },
    { id: "forticum", nombre: "Forticum", foco: "Vitalidad y ritmo diario", area: "estres" },
    { id: "nocticum", nombre: "Nocticum", foco: "Rutina de descanso y desconexión", area: "descanso", ojo: "Con ansiolíticos, sedantes o medicación para dormir: consulta antes." },
    { id: "lipix", nombre: "Lipix", foco: "Metabolismo de las grasas dentro de hábitos saludables", area: "nutricion", ojo: "No se comunica como producto para adelgazar." },
    { id: "oxinot", nombre: "Oxinot", foco: "Protección celular frente al estrés oxidativo", area: "complementacion" }
  ],

  // Genética (escala neutra, nunca semáforo). Ficticio.
  genetica: [
    { rasgo: "Calidad del sueño", tend: 4, txt: "Tendencia a sueño ligero" },
    { rasgo: "Metabolismo de la cafeína", tend: 5, txt: "Lento" },
    { rasgo: "Cronotipo", tend: 3, txt: "Intermedio, algo vespertino" },
    { rasgo: "Colesterol LDL", tend: 3, txt: "Medio" },
    { rasgo: "Respuesta al estrés", tend: 3, txt: "Media" }
  ],
  cuerpo: [
    { zona: "cabeza", n: 1, t: "Sueño", d: "Tendencia a sueño ligero" },
    { zona: "higado", n: 2, t: "Cafeína", d: "La eliminas despacio" },
    { zona: "corazon", n: 3, t: "Grasas en sangre", d: "Tendencia media a LDL alto" },
    { zona: "espalda", n: 4, t: "Estrés", d: "Respuesta algo más intensa" }
  ],

  revisiones: [
    { fecha: "6 nov", nombre: "Punto de partida", fuente: "cuestionario" },
    { fecha: "3 dic", nombre: "1.ª revisión" }
  ]
};
