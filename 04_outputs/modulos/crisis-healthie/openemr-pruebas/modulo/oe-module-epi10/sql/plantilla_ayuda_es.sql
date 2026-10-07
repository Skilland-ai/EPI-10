-- Sustituye la plantilla «Help» del portal (dato, no código) por instrucciones EPI10 en español.
UPDATE document_templates SET template_content = '<html><body><p>{ParseAsHTML}</p>
<div class="epi10-ayuda">
<h3>Hola, {PatientName}</h3>
<p class="epi10-ayuda__intro">Aquí tienes los documentos que necesitamos para preparar tu informe NutriWell. Te llevará unos diez minutos.</p>
<ol class="epi10-ayuda__pasos">
<li><strong>Elige un documento</strong> en el botón «Elegir documento». Empieza por el consentimiento.</li>
<li><strong>Consentimiento:</strong> léelo con calma, marca las casillas y pulsa la X para firmar con el dedo o el ratón.</li>
<li><strong>Cuestionario de hábitos:</strong> responde a todas las preguntas marcadas con asterisco.</li>
<li>Cuando termines cada uno, pulsa <strong>«Enviar a EPI10»</strong>. Puedes guardar un borrador y seguir más tarde.</li>
</ol>
<p class="epi10-ayuda__nota">¿Dudas? Escríbenos desde <strong>Mensajes</strong> y te respondemos en tu espacio.</p>
</div></body></html>', size = 900, modified_date = NOW()
WHERE template_name = 'Help' AND pid IN (0, -1);
