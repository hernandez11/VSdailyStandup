
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
            <head></head>

            <body>
                <section class="wrapper">
                    <img src="https://media.tenor.com/FTlGYXuNPvMAAAAM/pug-dog.gif" alt="" >
                    <form id="reminderForm">
                        <label for="reminder">Reminder Settings:</label><br>
                        <input type="number" id="reminderFrequency" name="reminderFrequency"><br>
                        <input type="submit" value="Submit">
                    </form> 
                </section>

                <script>
                    const form = document.getElementById('reminderForm');
                    form.addEventListener('submit', (event) => {
                        event.preventDefault();
                        const reminderValue = document.getElementById('reminderFrequency').value;
                        // Handle the selected number (reminderFrequency value) as needed
                        vscode.postMessage(reminderValue);
                    });
                </script>
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
