# CodiFoto
Extensión traducida completamente al español
**(Fork de CodeSnap-plus)**

¡Toma capturas con estilo de tu código en VS Code! 
¡puedes resaltar la línea haciendo clic en el número de línea!.

![UI](https://github.com/jornyx/CodiFoto/raw/main/examples/ui.png)

## Funciones

- Puedes resaltar la línea si haces clic en el número de línea
- El resaltado tiene 3 estilos:
  - Enfoque
  - git-añadir
  - git-eliminar

(Para el uso, consulta las **Instrucciones de uso de resaltado**)

- **Características originales de CodeSnap**
  - Guarda rápidamente capturas de pantalla de tu código
  - Copia capturas de pantalla en tu portapapeles
  - Muestra números de línea
  - Muchas otras opciones de configuración


## Instrucciones básicas de uso

1. Selecciona el código que deseas capturar.
2. Haz clic derecho y haz clic en  `Iniciar CodiFoto`.
3. Ajusta el ancho de la captura de pantalla si lo deseas.
4. Haz clic en el botón de la cámara para capturar, o haz clic en la imagen y presiona (Ctrl+C en Windows y Linux, Cmd+C en OS X).

**Tips**:

- También puedes iniciar `CodifFoto` a través la paleta de comandos (Ctrl+Shift+P en Windows y Linux, Cmd+Shift+P en OS X) 
- Si deseas asignar un acceso directo a `CodifFoto`, abre la configuración de tus accesos directos de teclado y asigna codiFoto.start a una combinación personalizada.
- Se deseas guardar la captura, cambia `codiFoto.accionDelBoton` a `Guardar` en su configuración


## Instrucciones de uso de resaltado
Si quieres resaltar la línea simplemente haz clic en el número de línea, y la línea será resaltada.

- Un clic: Estilo **Enfoque**
- Dos clic: Estilo **git-añadir**
- Tres clic: Estilo **git-eliminar**
- Cuatro clic: Sin resaltado

## Ejemplos

Resaltado estilo: **Enfoque**

![Hightlight-Style:Focus](https://github.com/jornyx/CodiFoto/raw/main/examples/hightlight-focus.png)

Resaltado estilo: **Git-Añadir**

![Hightlight-Style:Focus](https://github.com/jornyx/CodiFoto/raw/main/examples/hightlight-add.png)

Resaltado estilo: **Git-Eliminar**

![Hightlight-Style:Focus](https://github.com/jornyx/CodiFoto/raw/main/examples/hightlight-remove.png)

[Material Theme](https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme) + [Operator Mono](https://www.typography.com/fonts/operator/styles/operatormono)

![Example 1](https://github.com/jornyx/CodiFoto/raw/main/examples/material_operator-mono.png)

[Nord](https://github.com/arcticicestudio/nord-visual-studio-code) + [Cascadia Code](https://github.com/microsoft/cascadia-code)

![Example 2](https://github.com/jornyx/CodiFoto/raw/main/examples/nord_cascadia-code.png)

Monokai + [Fira Code](https://github.com/tonsky/FiraCode)

![Example 3](https://github.com/jornyx/CodiFoto/raw/main/examples/monokai_fira-code.png)

## Configuración

CodiFoto es altamente configurable. Aquí hay una lista de ajustes que puedes cambiar para ajustar la apariencia de tus capturas de pantalla:

**`codiFoto.colorDeFondo`:** El color de fondo del contenedor del fragmento de código. Puede ser cualquier color válido en CSS.

**`codiFoto.sombraCSS`:** El efecto box-shadow CSS para el fragmento de código. Puede ser cualquier sombra de caja válida en CSS.

**`codiFoto.margenDeContenedor`:** Margen interno para el contenedor del fragmento de código. Puede ser cualquier relleno válido en CSS.

**`codiFoto.esquinasRedondeadas`:** Valor booleano para usar esquinas redondeadas o esquinas cuadradas para la ventana.

**`codiFoto.mostrarControlesDeVentana`:** Valor booleano para mostrar u ocultar los botones de ventana estilo OS X.

**`codiFoto.mostrarTituloDeVentana`:** Valor booleano para mostrar u ocultar el título de la ventana `file_name`.

**`codiFoto.mostrarNumerosDeLinea`:** Valor booleano para mostrar u ocultar los números de línea.

**`codiFoto.usarNumeroDeLineaReal`:** Valor booleano para comenzar desde el número de línea real del archivo en lugar de 1.

**`codiFoto.fondoTransparente`:** Valor booleano para usar un fondo transparente al tomar la captura de pantalla.

**`codiFoto.destino`:** Utilice `Contenedor` para tomar la captura de pantalla con el contenedor, o `Ventana` para tomar solo la ventana.

**`codiFoto.accionDelBoton`:** Utilice `Guardar` para guardar la captura de pantalla en un archivo, o `Capturar` para copiar la captura de pantalla en el portapapeles.

## Agradecimientos

A [Carbon](https://carbon.now.sh/) por algunas ideas de diseño.

A [CodeSnap Plus](https://github.com/huibizhang/CodeSnap-plus) por servir de base para este proyecto.
