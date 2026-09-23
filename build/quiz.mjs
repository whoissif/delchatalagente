// Datos del cuestionario interactivo del curso.
// Transcritos de `06_evaluacion.md`. Las claves están verificadas contra ese documento.

export const diagnostico = [
  {
    id: 'I1',
    pregunta: 'Cuando hablamos del «modelo» y del «harness», ¿cómo lo describirías?',
    opciones: [
      'Son lo mismo: el programa que instalas y la inteligencia que responde.',
      'El modelo piensa y escribe; el harness es el programa que lo rodea y le da herramientas.',
      'El modelo es la interfaz web; el harness es el servidor donde se ejecuta.',
      'El modelo es de pago y el harness es gratis.',
    ],
    correcta: 1,
    porque: 'El modelo es el motor; el harness es el coche completo: volante, frenos y salpicadero.',
  },
  {
    id: 'I2',
    pregunta: '¿Qué crees que puede hacer un agente que un chat normal no hace?',
    opciones: [
      'Escribir textos más largos y con mejor estilo.',
      'Actuar sobre tu ordenador: leer y modificar archivos, ejecutar comandos, y tú revisas.',
      'Contestarte sin conexión a internet.',
      'Saber ya todo lo que hay en tu ordenador sin que se lo indiques.',
    ],
    correcta: 1,
    porque: 'La diferencia de fondo no es la calidad del texto, sino que actúa sobre tus archivos. La opción D confunde la memoria del modelo con leer archivos: el agente solo ve lo que lee con herramientas y con permisos.',
  },
  {
    id: 'I3',
    pregunta: 'Cuando el agente te pide un permiso, ¿qué crees que está pasando?',
    opciones: [
      'Va a hacer algo fuera de la zona delimitada y te pregunta antes de tocarlo.',
      'Se ha quedado sin saldo en tu cuenta.',
      'Ha encontrado un problema de seguridad en tu ordenador.',
      'Te está pidiendo que escribas tú el comando en la terminal.',
    ],
    correcta: 0,
    porque: 'Es el «¿seguro?» en la puerta: el agente quiere salir de su sala y te pide permiso antes de hacerlo.',
  },
  {
    id: 'I4',
    pregunta: 'Si el agente se equivoca y cambia algo que no querías, ¿qué crees que ocurre?',
    opciones: [
      'El harness lo revierte solo: no hay nada de lo que preocuparse.',
      'Los cambios pueden ser difíciles de recuperar; conviene trabajar con copias de seguridad y permisos limitados.',
      'Con la política de aprobaciones que viene por defecto es imposible que pase.',
      'El agente detecta el error y lo corrige sin avisarte.',
    ],
    correcta: 1,
    porque: 'No hay red de seguridad automática. De ahí las cuatro reglas: copia de seguridad, carpeta específica, nada confidencial y revisar siempre.',
  },
];

export const final = [
  {
    id: 'F1',
    pregunta: '¿Qué aporta el harness frente al modelo por sí solo?',
    opciones: [
      'Un modelo más potente y más rápido que el que usa el chat.',
      'Un programa que rodea al modelo y le da herramientas, permisos, memoria y control sobre lo que hace.',
      'Un traductor que pasa tus mensajes a un idioma que el modelo entiende.',
      'Un intermediario que responde por el modelo cuando no hay conexión.',
    ],
    correcta: 1,
    porque: 'El modelo es el motor; el harness es el coche completo. La opción A es tentadora porque el modelo es lo único que «se ve» en un chat, pero el modelo no tiene herramientas, permisos ni memoria de proyecto.',
  },
  {
    id: 'F2',
    pregunta: 'El agente trabaja en un bucle de pensar, actuar y observar. ¿Qué significa «observar»?',
    opciones: [
      'Que te pregunta a ti si el resultado le parece bien.',
      'Que lee el resultado de lo que acaba de hacer y decide el siguiente paso.',
      'Que guarda la conversación para que no se te olvide nada.',
      'Que comprueba si tiene permiso de administrador en tu ordenador.',
    ],
    correcta: 1,
    porque: 'El bucle es pensar, actuar y mirar el resultado para decidir el paso siguiente. La opción A es tentadora porque el agente a veces pregunta al usuario, pero eso es otra herramienta, no el paso de observar.',
  },
  {
    id: 'F3',
    pregunta: '¿Qué es una «herramienta» para el agente?',
    opciones: [
      'Un complemento que hay que comprar aparte.',
      'Una capacidad concreta que puede usar: leer archivos, escribir archivos, ejecutar comandos, buscar en internet.',
      'Un atajo de teclado de la interfaz web.',
      'El menú de Ajustes donde se configura la clave de API.',
    ],
    correcta: 1,
    porque: 'Las herramientas son capacidades concretas que el agente puede invocar. La opción D confunde «herramienta» con la configuración, y la A porque muchos complementos de otros programas se pagan aparte.',
  },
  {
    id: 'F4',
    pregunta: 'El contexto es la mesa de trabajo del agente. ¿Qué pasa cuando se llena de papeles?',
    opciones: [
      'Nada: el contexto no tiene límite.',
      'El agente se para y hay que reiniciar la aplicación.',
      'Pierde precisión y olvida detalles anteriores; conviene resumir, dividir la tarea o empezar de nuevo.',
      'Se borran los archivos que ya había creado en el espacio de trabajo.',
    ],
    correcta: 2,
    porque: 'Si la mesa se llena de papeles, hay que recoger: resumir, dividir o empezar una tarea nueva. La opción A es tentadora porque el chat parece recordar siempre, pero se le escapan los detalles.',
  },
  {
    id: 'F5',
    pregunta: 'Ante un aviso de aprobación eliges «Permitir una vez». ¿Qué implica?',
    opciones: [
      'Que autorizas esa acción concreta ahora; la próxima vez volverá a preguntar.',
      'Que autorizas esa acción para siempre en este proyecto.',
      'Que autorizas todas las acciones del agente durante el resto de la sesión.',
      'Que el agente ya no necesita permisos para nada.',
    ],
    correcta: 0,
    porque: 'Vale solo para esa vez: no concede permiso permanente, y esa incomodidad es intencionada. La opción B es el error más típico: creer que aprobar una vez vale para siempre.',
  },
  {
    id: 'F6',
    pregunta: 'Sobre el sandbox, ¿qué afirmación es correcta?',
    opciones: [
      'Garantiza un aislamiento total: nada de lo que haga el agente puede afectar a tu ordenador.',
      'Delimita dónde puede trabajar el agente y reduce el riesgo, pero no garantiza aislamiento.',
      'Es una copia de seguridad automática de tus archivos.',
      'Solo hace falta si trabajas con datos muy sensibles.',
    ],
    correcta: 1,
    porque: 'El sandbox delimita la zona de trabajo y las aprobaciones son el «¿seguro?» antes de salir de ella, pero eso reduce el riesgo, no garantiza aislamiento. La opción A es tentadora porque suena a «modo seguro» y no lo es.',
  },
  {
    id: 'F7',
    pregunta: '¿Qué es una skill y para qué sirve?',
    opciones: [
      'Un procedimiento guardado que el agente sigue cuando la tarea encaja, como una receta de cocina.',
      'Un permiso permanente que le das al agente.',
      'Un modelo más rápido y más barato que el habitual.',
      'Una carpeta donde el agente va dejando los resultados.',
    ],
    correcta: 0,
    porque: 'Las skills son procedimientos guardados, como recetas: se escriben una vez y se reutilizan. La opción B la confunde con los permisos y la D con la carpeta de resultados.',
  },
  {
    id: 'F8',
    pregunta: '¿Para qué sirve el archivo AGENTS.md?',
    opciones: [
      'Para guardar las conversaciones anteriores y poder volver a ellas.',
      'Para indicar qué modelo y qué clave de API debe usar el agente.',
      'Para dejarle por escrito lo que debe saber siempre: cómo trabajas, tus normas y las rutas importantes.',
      'Para declarar qué herramientas de terceros tiene permitidas.',
    ],
    correcta: 2,
    porque: 'AGENTS.md son las notas que dejas al becario antes de que empiece; hay uno global y otro por proyecto. La opción A lo confunde con el historial de sesiones y la B con los ajustes de modelo.',
  },
  {
    id: 'F9',
    pregunta: '¿Qué es MCP?',
    opciones: [
      'Un modelo de lenguaje especializado en programación.',
      'Un estándar que permite conectar herramientas que ya existen (GitHub, bases de datos, gestores de incidencias) para que aparezcan como herramientas nuevas del agente.',
      'Un modo de seguridad que bloquea la conexión a internet.',
      'El formato de los documentos que el agente puede leer.',
    ],
    correcta: 1,
    porque: 'MCP es un enchufe estándar, tipo USB, para conectar herramientas que ya existen sin escribir nada nuevo. La opción A lo confunde con un modelo y la D con un formato de archivo.',
  },
  {
    id: 'F10',
    pregunta: 'El agente se equivoca, lo corriges y empeora. ¿Qué es lo más sensato?',
    opciones: [
      'Insistir con la misma instrucción y subir el tono.',
      'Parar, revisar qué ha hecho, y si hace falta volver atrás o replantear la tarea en trozos más pequeños y con más contexto.',
      'Darle acceso total para que se arregle solo.',
      'Cerrar la aplicación: significa que el agente no sirve para esto.',
    ],
    correcta: 1,
    porque: 'Parar, revisar lo hecho y replantear la tarea en trozos pequeños suele resolverlo. La opción C es tentadora porque parece que más permisos dan más capacidad, pero normalmente agrandan el problema; la A solo repite el error.',
  },
  {
    id: 'F11',
    pregunta: 'Vas a instalar un plugin de terceros. ¿Cuál es el riesgo principal?',
    opciones: [
      'Que ocupe mucho espacio en el disco.',
      'Que cambie el idioma de la interfaz.',
      'Que ejecute código con los mismos permisos que el agente y llegue a tus datos o a tus credenciales.',
      'Que solo funcione con la versión de pago del modelo.',
    ],
    correcta: 2,
    porque: 'Un plugin corre con los permisos del agente, así que puede llegar a lo mismo que él. La opción A es tentadora porque es el riesgo fácil de imaginar, pero el daño real no es el espacio en disco.',
  },
  {
    id: 'F12',
    pregunta: 'El proyecto está en «developer preview». ¿Qué significa para ti?',
    opciones: [
      'Que es una versión en desarrollo: cambia rápido, puede romper compatibilidad y no hay auditoría de seguridad.',
      'Que es gratis, pero con publicidad.',
      'Que solo pueden usarlo programadores profesionales.',
      'Que ya está terminado y estable, solo le faltan detalles estéticos.',
    ],
    correcta: 0,
    porque: 'Es una versión en desarrollo: iteración rápida, cambios que rompen compatibilidad y sin auditoría de seguridad. La opción D es tentadora porque la herramienta funciona bien en la demo, pero «funciona» no es «estable».',
  },
];

export const bandas = [
  { min: 10, titulo: 'Conceptos sólidos', texto: 'Incluidos permisos y límites. Profundiza en MCP y skills, y prueba un encargo real esta semana.' },
  { min: 7, titulo: 'Base correcta', texto: 'Con algún punto flojo. Repasa los fallos concretos: suele ser el «permitir una vez», el sandbox o qué hacer cuando el agente empeora.' },
  { min: 4, titulo: 'Ideas generales captadas', texto: 'Faltan los detalles. Repite las prácticas 2 y 3 con calma y vuelve a la analogía del motor y el coche.' },
  { min: 0, titulo: 'Conviene repasar', texto: 'Empieza por un caso muy pequeño y guiado. El ritmo, no la persona, es lo que hay que ajustar.' },
];
