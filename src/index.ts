import { app, BrowserWindow, ipcMain } from "electron";
import Store from "electron-store";
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  const store = new Store();

  const size: { height: number; width: number; x: number; y: number } =
    store.get("windowSize") || {
      width: 800,
      height: 600,
      x: 200,
      y: 200,
    };
  // Create the browser window.

  const mainWindow = new BrowserWindow({
    height: size.height,
    width: size.width,
    x: size.x,
    y: size.y,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Event listeners
  mainWindow.on("resize", () => {
    const { width, height, x, y } = mainWindow.getBounds();
    const size = { width, height, x, y };
    store.set("windowSize", size);
  });
  mainWindow.on("move", () => {
    const { width, height, x, y } = mainWindow.getBounds();
    const size = { width, height, x, y };
    store.set("windowSize", size);
  });

  ipcMain.on("getName", () => {
    const name = store.get("name");
    mainWindow.webContents.send("sendName", name);
  });

  ipcMain.on("name", (_, name) => {
    store.set("name", { name });
    mainWindow.webContents.send("sendName", { name });
  });

  ipcMain.on("newTask", (_, task) => { //send array with the task and task descripoton
    store.set(`task.${task.title}`, task.des);
    const getTask = store.get("task");
    mainWindow.webContents.send("sendTask", getTask);
  });

  ipcMain.on("getTask", () => {
    const task = store.get("task");
    mainWindow.webContents.send("sendTask", task);
  });

  ipcMain.on("delTask", (_, task) => {
    store.delete(`task.${task}`);
    const getTask = store.get("task");
    mainWindow.webContents.send("sendTask", getTask);
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
