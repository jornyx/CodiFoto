'use strict';

const vscode = require('vscode');
const path = require('path');
const { homedir } = require('os');
const { readHtml, writeFile, getSettings } = require('./util');

const getConfig = () => {
  const editorSettings = getSettings('editor', ['fontLigatures', 'tabSize']);
  const editor = vscode.window.activeTextEditor;
  if (editor) editorSettings.tabSize = editor.options.tabSize;

  const extensionSettings = getSettings('codiFoto', [
    'colorDeFondo',
    'sombraCSS',
    'margenDeContenedor',
    'esquinasRedondeadas',
    'mostrarControlesDeVentana',
    'mostrarTituloDeVentana',
    'mostrarNumerosDeLinea',
    'usarNumeroDeLineaReal',
    'fondoTransparente',
    'destino',
    'accionDelBoton'
  ]);

  const selection = editor && editor.selection;
  const startLine = extensionSettings.usarNumeroDeLineaReal ? (selection ? selection.start.line : 0) : 0;

  let windowTitle = '';
  if (editor && extensionSettings.mostrarTituloDeVentana) {
    const activeFileName = editor.document.uri.path.split('/').pop();
    // windowTitle = `${vscode.workspace.name} - ${activeFileName}`;
    windowTitle = `${activeFileName}`;
  }

  return {
    ...editorSettings,
    ...extensionSettings,
    startLine,
    windowTitle
  };
};

const createPanel = async (context) => {
  const panel = vscode.window.createWebviewPanel(
    'codifoto',
    'CodiFoto',
    { viewColumn: vscode.ViewColumn.Beside, preserveFocus: true },
    {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.file(context.extensionPath)]
    }
  );
  panel.webview.html = await readHtml(
    path.resolve(context.extensionPath, 'webview/index.html'),
    panel
  );

  return panel;
};

let lastUsedImageUri = vscode.Uri.file(path.resolve(homedir(), 'Desktop/code.png'));
const saveImage = async (data) => {
  const uri = await vscode.window.showSaveDialog({
    filters: { Images: ['png'] },
    defaultUri: lastUsedImageUri
  });
  lastUsedImageUri = uri;
  uri && writeFile(uri.fsPath, Buffer.from(data, 'base64'));
};

const hasOneSelection = (selections) =>
  selections && selections.length === 1 && !selections[0].isEmpty;

const runCommand = async (context) => {
  const panel = await createPanel(context);

  const update = async () => {
    await vscode.commands.executeCommand('editor.action.clipboardCopyWithSyntaxHighlightingAction');
    panel.webview.postMessage({ type: 'update', ...getConfig() });
  };

  const flash = () => panel.webview.postMessage({ type: 'flash' });

  panel.webview.onDidReceiveMessage(async ({ type, data }) => {
    if (type === 'Guardar') {
      flash();
      await saveImage(data);
    } else {
      vscode.window.showErrorMessage(`CodiFoto: Acción desconocida "${type}"`);
    }
  });

  const selectionHandler = vscode.window.onDidChangeTextEditorSelection(
    (e) => hasOneSelection(e.selections) && update()
  );
  panel.onDidDispose(() => selectionHandler.dispose());

  const editor = vscode.window.activeTextEditor;
  if (editor && hasOneSelection(editor.selections)) update();
};

module.exports.activate = (context) =>
  context.subscriptions.push(
    vscode.commands.registerCommand('codiFoto.start', () => runCommand(context))
  );
