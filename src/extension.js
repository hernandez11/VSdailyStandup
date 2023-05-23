
const vscode = require('vscode');


function activate(context) {
    const viewType = 'standupView.openview';

    function provideCustomSidebarView(webviewView) {
        webviewView.webview.html = getHtml();
    }

    function getHtml() {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
				<link rel="stylesheet" href="./styles.css">
			</head>

            <body>
                <div>
                    <img src="https://media.tenor.com/FTlGYXuNPvMAAAAM/pug-dog.gif" alt="" >
					<h1>Settings</h1>
					<p>Configure reminder settings to fit your schedule.</p>
                </div>
		// divider line here...
				<div>

					<h2>Recurrence</h2>
					<span>
						<form id="reminderForm">
							<label>Reminder Settings:</label>
							<input type="number" id="reminderFrequency" name="reminderFrequency">
						</form> 
					</span>

					<h2>Reminder</h2>
					<span>
						<form id="reminderForm">
							<label>Reminder Settings:</label>
							<input type="number" id="reminderFrequency" name="reminderFrequency">
						</form> 
					</span>

					<h2>Sync with calendar</h2>
					<span>
						<form id="reminderForm">
							<label>Reminder Settings:</label>
							<input type="number" id="reminderFrequency" name="reminderFrequency">
						</form> 
					</span>
				</div>
				<div>
					// information icon here ...
					<p>Give feedback about this extention</p>
				</div>
            </body>
            </html>
        `;
    }


    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(viewType, {
            resolveWebviewView: provideCustomSidebarView
        })
    );

    let errorLensEnabled = true;
    let disposableEnableErrorLens = vscode.commands.registerCommand('ErrorLens.enable', () => {
        errorLensEnabled = true;
    });

    context.subscriptions.push(disposableEnableErrorLens);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
