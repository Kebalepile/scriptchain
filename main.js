const path = require('path'),
	url = require('url'),
	{ app, BrowserWindow, globalShortcut, session } = require('electron'),
	os = require("os"),
	scriptChain = require("./blockchain/init")

let mainWindow,
	isDev = false,
	isWin = process.platform === 'win32'

if (
	process.env.NODE_ENV !== undefined &&
	process.env.NODE_ENV === 'development'
) {
	isDev = true
}

function createMainWindow() {

	mainWindow = new BrowserWindow({
		x: 2,
		y: 1,
		title: "ScriptChain",
		width: 1000,
		height: 800,
		minWidth: 600,
		icon: `${__dirname}/assets/icons/icon.png`,
		autoHideMenuBar: true,
		backgroundColor: '#222',
		webPreferences: {
			nodeIntegration: true,
		},
	})

	let indexPath

	if (isDev && process.argv.indexOf('--noDevServer') === -1) {
		indexPath = url.format({
			protocol: 'http:',
			host: 'localhost:8080',
			pathname: '/',
			slashes: true,
		})
	} else {
		indexPath = url.format({
			protocol: 'file:',
			pathname: path.join(__dirname, 'dist', 'index.html'),
			slashes: true,
		})
	}

	mainWindow.loadURL(indexPath)

	// Don't show until we are ready and loaded
	mainWindow.once('ready-to-show', () => {
		mainWindow.show()

		// Open devtools if dev
		if (isDev) {
			
					//   add React to developer tools.
		// session.defaultSession.loadExtension(
		// 	// AppData\Local\Google\Chrome\User Data\Default\Extensions\fmkadmapgofadopljbjfkapdkoienihi\4.7.0_0
		// 	path.join(os.homedir(), '/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.7.0_0')
		// )

			mainWindow.webContents.openDevTools()
			// global shortcuts outside menu
			globalShortcut.register(
				isWin ? 'Ctrl+Shift+I' : 'Command+Alt+I',
				() => mainWindow.toggleDevTools())

			globalShortcut.register('CmdOrCtrl+R', () => mainWindow.reload())
		}
	})

	mainWindow.on('closed', () => (mainWindow = null))
}

function init_application() {
	// initiates scriptchain network & nodes.
	scriptChain()
	// creates main  electron window instance.
	createMainWindow()
}
// comment on production.
// const { default : installExtension, REACT_DEVELOPER_TOOLS} = require("electron-devtools-installer")
// installExtension(REACT_DEVELOPER_TOOLS)
// .then(name =>  console.log(`Added ${name} Extension.`))
// .catch(err => console.error(err))
app.whenReady().then(() => {
	if (isDev) {
		//   add React to developer tools.
		session.defaultSession.loadExtension(
			// AppData\Local\Google\Chrome\User Data\Default\Extensions\fmkadmapgofadopljbjfkapdkoienihi\4.7.0_0
			path.join(os.homedir(), '/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.7.0_0')
		)
	}
}).catch((err) => console.log('An error occurred: ', err))

app.on('ready', init_application)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createMainWindow()
	}
})

// Stop error
app.allowRendererProcessReuse = true
