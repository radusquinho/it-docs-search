// Fictional documentation for a small IT help desk. Source IDs remain stable across languages.
export const guides = [
  {
    id: 'password',
    terms: ['password', 'passphrase', 'clave de acceso', 'contrasena', 'credenciales olvidadas', 'forgotten credentials'],
    en: { title: 'Reset a work password', group: 'Accounts', steps: [
      'From the sign-in page, select Forgot password and enter your work email.',
      'Confirm your identity with the recovery method you registered. The recovery link expires after 15 minutes.',
      'Set a unique passphrase of at least 14 characters. Contact the help desk if you cannot use any recovery method.',
    ] },
    es: { title: 'Restablecer la contraseña de trabajo', group: 'Cuentas', steps: [
      'En la página de acceso, selecciona He olvidado mi contraseña e introduce tu correo de trabajo.',
      'Confirma tu identidad con tu método de recuperación registrado. El enlace caduca a los 15 minutos.',
      'Elige una frase de acceso única de al menos 14 caracteres. Si no tienes un método de recuperación disponible, contacta con soporte.',
    ] },
  },
  {
    id: 'mfa',
    terms: ['mfa', 'authenticator', 'autenticador', 'multifactor', 'second factor', 'segundo factor', 'two-step', 'dos pasos', 'verification code', 'codigo de verificacion'],
    en: { title: 'Move your authenticator to a new phone', group: 'Accounts', steps: [
      'While you still have the old phone, open Account settings → Security → Add sign-in method.',
      'Scan the QR code on the new phone and confirm its six-digit code.',
      'Test sign-in before removing the old phone. If it is already unavailable, use a recovery code or contact the help desk.',
    ] },
    es: { title: 'Mover el autenticador a un móvil nuevo', group: 'Cuentas', steps: [
      'Mientras tengas el móvil anterior, abre Ajustes de cuenta → Seguridad → Añadir método de inicio de sesión.',
      'Escanea el código QR con el móvil nuevo y confirma el código de seis dígitos.',
      'Prueba el acceso antes de quitar el móvil anterior. Si ya no lo tienes, usa un código de recuperación o contacta con soporte.',
    ] },
  },
  {
    id: 'vpn',
    terms: ['vpn', 'tunel remoto', 'remote tunnel', 'private network', 'red privada', 'internal portal', 'portal interno'],
    en: { title: 'Connect to the work VPN', group: 'Connectivity', steps: [
      'Open the managed VPN client and select the Office Remote profile.',
      'Sign in with your work account and complete the second-factor prompt.',
      'Wait for Connected, then open the internal portal. If it fails, record the error code and send it to support.',
    ] },
    es: { title: 'Conectarse a la VPN de trabajo', group: 'Conectividad', steps: [
      'Abre el cliente VPN gestionado y selecciona el perfil Office Remote.',
      'Inicia sesión con tu cuenta de trabajo y completa la solicitud de segundo factor.',
      'Espera a que aparezca Conectado y abre el portal interno. Si falla, anota el código de error y envíalo a soporte.',
    ] },
  },
  {
    id: 'wifi',
    terms: ['wi-fi', 'wifi', 'wireless network', 'red inalambrica', 'office secure', 'guest network', 'red de invitados'],
    en: { title: 'Join the office Wi-Fi', group: 'Connectivity', steps: [
      'On a managed laptop, choose Office Secure and accept only the certificate issued by the fictitious Contoso IT CA.',
      'If you changed your password and cannot reconnect, forget the network and join it again.',
      'For visitors, select Office Guest and get a one-day access code from reception.',
    ] },
    es: { title: 'Conectarse a la Wi-Fi de la oficina', group: 'Conectividad', steps: [
      'En un portátil gestionado, elige Office Secure y acepta solo el certificado emitido por la entidad ficticia Contoso IT CA.',
      'Si cambiaste la contraseña y no puedes volver a conectarte, olvida la red y conéctate de nuevo.',
      'Para visitas, selecciona Office Guest y pide en recepción un código válido durante un día.',
    ] },
  },
  {
    id: 'backup',
    terms: ['backup', 'restore', 'deleted file', 'deleted folder', 'copia de seguridad', 'recuperar archivo', 'restaurar', 'archivo borrado', 'version history', 'historial de versiones'],
    en: { title: 'Restore a file from backup', group: 'Files & devices', steps: [
      'For a deleted file, open the team drive recycle bin and select Restore. Deleted items are kept for 30 days.',
      'To recover an older version, open the file menu → Version history and restore the chosen version.',
      'Check the restored file before editing or deleting another copy.',
    ] },
    es: { title: 'Restaurar archivos desde una copia', group: 'Archivos y dispositivos', steps: [
      'Para un archivo borrado, abre la papelera de la unidad de equipo y selecciona Restaurar. Los elementos se conservan 30 días.',
      'Para recuperar una versión antigua, abre Menú del archivo → Historial de versiones y restaura la versión que necesites.',
      'Comprueba el archivo restaurado antes de editar o eliminar otra copia.',
    ] },
  },
  {
    id: 'storage',
    terms: ['disk space', 'storage', 'disk full', 'free up', 'low disk', 'disco lleno', 'almacenamiento', 'liberar espacio', 'archivos temporales', 'temporary files'],
    en: { title: 'Free up disk space', group: 'Files & devices', steps: [
      'Open Settings → System → Storage and review what takes up space.',
      'Clear Temporary files, leaving Downloads unchecked unless you have reviewed those files.',
      'Move verified copies of large work files to the team drive and keep at least 10 GB free.',
    ] },
    es: { title: 'Liberar espacio en disco', group: 'Archivos y dispositivos', steps: [
      'Abre Configuración → Sistema → Almacenamiento y revisa qué ocupa espacio.',
      'Elimina los archivos temporales. Deja Descargas sin marcar hasta que hayas revisado esos archivos.',
      'Mueve copias verificadas de archivos grandes a la unidad de equipo y conserva al menos 10 GB libres.',
    ] },
  },
  {
    id: 'printing',
    terms: ['print', 'printer', 'printing', 'print queue', 'impresora', 'impresion', 'imprimir', 'cola de impresion'],
    en: { title: 'Clear a stuck print job', group: 'Files & devices', steps: [
      'Open Printers & scanners, choose the office printer and open its queue.',
      'Cancel only your own stuck job and retry with a one-page test.',
      'If the queue stays paused, send support the printer name and the time of the failed job.',
    ] },
    es: { title: 'Desbloquear un trabajo de impresión', group: 'Archivos y dispositivos', steps: [
      'Abre Impresoras y escáneres, elige la impresora de oficina y abre su cola.',
      'Cancela solo tu propio trabajo atascado y reintenta con una página de prueba.',
      'Si la cola sigue en pausa, envía a soporte el nombre de la impresora y la hora del fallo.',
    ] },
  },
  {
    id: 'updates',
    terms: ['updates', 'patches', 'patch', 'maintenance window', 'actualizaciones', 'actualizacion', 'parches', 'parche', 'reinicio programado'],
    en: { title: 'Install Windows updates', group: 'Files & devices', steps: [
      'Connect the laptop to power and open Settings → Windows Update → Check for updates.',
      'Save your work and schedule a restart outside your active hours.',
      'After restarting, confirm that Update history shows the update as installed.',
    ] },
    es: { title: 'Instalar actualizaciones de Windows', group: 'Archivos y dispositivos', steps: [
      'Conecta el portátil a la corriente y abre Configuración → Windows Update → Buscar actualizaciones.',
      'Guarda tu trabajo y programa el reinicio fuera de las horas activas.',
      'Tras reiniciar, confirma que el historial muestra la actualización como instalada.',
    ] },
  },
  {
    id: 'meetings',
    terms: ['video call', 'videollamada', 'camera', 'webcam', 'camara', 'microphone', 'mic', 'microfono', 'meeting audio'],
    en: { title: 'Check audio and video before a meeting', group: 'Collaboration', steps: [
      'Open the meeting app settings and select the microphone, speaker and camera you want to use.',
      'Make a test call and check the input level and camera preview.',
      'If the camera is missing, close other video apps and check that Windows allows camera access for the meeting app.',
    ] },
    es: { title: 'Comprobar audio y vídeo antes de una reunión', group: 'Colaboración', steps: [
      'Abre los ajustes de la aplicación de reuniones y selecciona el micrófono, el altavoz y la cámara que quieres usar.',
      'Haz una llamada de prueba y comprueba el nivel de entrada y la vista previa de la cámara.',
      'Si la cámara no aparece, cierra otras aplicaciones de vídeo y comprueba que Windows permite el acceso a la aplicación de reuniones.',
    ] },
  },
  {
    id: 'handover',
    terms: ['offboarding', 'leaver', 'leaving the company', 'return equipment', 'devolver equipo', 'baja de empleado', 'salida de un empleado', 'handover', 'transferir archivos'],
    en: { title: 'Hand over files and return equipment', group: 'Collaboration', steps: [
      'Transfer ownership of shared work files to your manager before your last day.',
      'Return the laptop, charger and access badge to IT. Keep the receipt they provide.',
      'The help desk closes the work account at the agreed time and records the equipment return.',
    ] },
    es: { title: 'Traspasar archivos y devolver el equipo', group: 'Colaboración', steps: [
      'Transfiere la propiedad de los archivos compartidos a tu responsable antes de tu último día.',
      'Devuelve el portátil, el cargador y la tarjeta de acceso a informática. Conserva el recibo.',
      'Soporte cierra la cuenta de trabajo a la hora acordada y registra la devolución del equipo.',
    ] },
  },
];
