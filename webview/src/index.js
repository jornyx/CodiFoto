import { $, $$, setVar } from './util.js';
import { pasteCode } from './code.js';
import { takeSnap, cameraFlashAnimation } from './snap.js';

const navbarNode = $('#navbar');
const windowControlsNode = $('#window-controls');
const windowTitleNode = $('#window-title');
const btnSave = $('#save');
const btnCopy = $('#secondMainBtn');

const showLineNumBtn = $('#showLineNumBtn');
const showWindowControls = $('#showWindowControls');
const modeChangeBtn = $("#modeChangeBtn")


let config;

// btnSave.addEventListener('click', () => takeSnap(config));

document.addEventListener('copy', () => takeSnap({ ...config, accionDelBoton: 'Capturar' }));

document.addEventListener('paste', (e) => pasteCode(config, e.clipboardData));

window.addEventListener('message', ({ data: { type, ...cfg } }) => {
  if (type === 'update') {
    config = cfg;

    const {
      fontLigatures,
      tabSize,
      colorDeFondo,
      sombraCSS,
      margenDeContenedor,
      esquinasRedondeadas,
      mostrarControlesDeVentana,
      mostrarTituloDeVentana,
      windowTitle,
      accionDelBoton,
      mostrarNumerosDeLinea
    } = config;

    
    setVar('ligatures', fontLigatures ? 'normal' : 'none');
    if (typeof fontLigatures === 'string') setVar('font-features', fontLigatures);
    setVar('tab-size', tabSize);
    setVar('container-background-color', colorDeFondo);
    setVar('box-shadow', sombraCSS);
    setVar('container-padding', margenDeContenedor);
    setVar('window-border-radius', esquinasRedondeadas ? '4px' : 0);

    navbarNode.hidden = !mostrarControlesDeVentana && !mostrarTituloDeVentana;
    windowControlsNode.hidden = !mostrarControlesDeVentana;
    windowTitleNode.hidden = !mostrarTituloDeVentana;

    windowTitleNode.textContent = windowTitle;

    document.execCommand('paste');

    let actions = []
    if(accionDelBoton == "Guardar") {
      actions = [
        () => takeSnap(config), 
        () => takeSnap({ ...config, accionDelBoton: 'Capturar' }),
      ]
      btnCopy.textContent = "Capturar"
    } else {
      actions = [
        () => takeSnap(config),
        () => takeSnap({ ...config, accionDelBoton: 'Guardar' }), 
      ]
      btnCopy.textContent = "Guardar como..."
    }

    btnSave.addEventListener('click', actions[0])
    btnCopy.addEventListener('click', actions[1])

    if(!mostrarNumerosDeLinea) {
      document.getElementById('showLineNumBtn').children[0].children[0].classList.toggle('opacity-0');
    }

    showLineNumBtn.addEventListener('click', () => {

      document.getElementById('showLineNumBtn').children[0].children[0].classList.toggle('opacity-0');

      // showLineNumBtn.firstChild.classList.toggle('opacity-100');

      const lineNums = $$('.line-number');
    
      lineNums.forEach(lineNum => {
        lineNum.classList.toggle("hidden")
      })
    })

    if(!mostrarControlesDeVentana){
      document.getElementById('showWindowControlsBtn').children[0].children[0].classList.toggle('opacity-0');
    }
    showWindowControlsBtn.addEventListener('click', () => {
      document.getElementById('showWindowControlsBtn').children[0].children[0].classList.toggle('opacity-0');
      windowControlsNode.hidden = !windowControlsNode.hidden
      navbarNode.hidden = windowControlsNode.hidden && !mostrarTituloDeVentana;
    })

    if(!mostrarTituloDeVentana){
      document.getElementById('modeChangeBtn').children[0].children[0].classList.toggle('opacity-0');
    }
    modeChangeBtn.addEventListener('click', () => {
        document.getElementById('modeChangeBtn').children[0].children[0].classList.toggle('opacity-0');
        windowTitleNode.hidden = !windowTitleNode.hidden
        navbarNode.hidden = windowControlsNode.hidden && !mostrarTituloDeVentana;
    })
    // toolModeToggled()

    /* modeChangeBtn.addEventListener('click', () => {
      // _toolMode = _toolMode==='advanced' ? 'simple': 'advanced'
      _toolMode = _toolMode==='yes_file' ? 'no_file': 'yes_file'
      toolModeToggled()
    })*/

  } else if (type === 'flash') {
    cameraFlashAnimation();
  }
});

/* const toolModeToggled = () => {
  if(_toolMode=='yes_file') {
    windowTitleNode.lassList.remove("hidden")
    // btnCopy.classList.remove("hidden")
    // $('#showLineNumBtn').classList.remove("hidden")
    // $('#showWindowControlsBtn').classList.remove("hidden")
    // $("#rightPanel").classList.remove("justify-end")
    // modeChangeBtn.textContent = "Simple Mode"
  } else {
    windowTitleNode.lassList.add("hidden")
    // btnCopy.classList.add("hidden")
    // $('#showLineNumBtn').classList.add("hidden")
    // $('#showWindowControlsBtn').classList.add("hidden")
    // $("#rightPanel").classList.add("justify-end")
    // modeChangeBtn.textContent = "Advanced Mode"
  }
}*/