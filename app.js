//!wrt
const { Theme, MenuBar } = w96.ui;

class GUIApplication extends WApplication {
    /**
     * Application constructor.
     */
    constructor() {
        super();
    }
    
    /**
     * Main entry point.
     * @param {String[]} argv The program arguments.
     */
    async main(argv) {
        // Create the window
        const mainwnd = this.createWindow({
            title: "HeckerSoft",
            body: `
            <div class="appbar"></div>
            <iframe></iframe>
            <style>
                .swfs-app-demo>iframe {
                    border: none;
                    height: 100%;
                    width: 100%;
                }
            </style>`,
            bodyClass: "swfs-app-demo",
            taskbar: true,
            resizable: true,
            initialHeight: 480,
            initialWidth: 640,
            icon: await Theme.getIconUrl("mime/executable", '16x16')
        }, true);

        // Create wnd body ref
        const wndBody = mainwnd.getBodyContainer();
        /** @type {HTMLIFrameElement} */
        const iframe = wndBody.querySelector("iframe");
        const modPath = `/_/${current.scriptDir.replace(":", "")}`;

        // Create an appbar and set it up
        const menu = new MenuBar();
        
        menu.addRoot("File", [
            {
                type: "normal",
                label: "Exit",
                onclick: ()=>this.terminate()
            }
        ]);

        menu.addRoot("Help", [
            {
                type: "normal",
                label: "About",
                onclick: ()=>iframe.src = `https://heckersoft.serv00.net/about.html`
            }
        ]);

        wndBody.querySelector(".appbar").replaceWith(menu.getMenuDiv());

        // Add JS bindings to iframe app
        iframe.onload = ()=>{
            iframe.contentWindow.myAPIFunc = ()=> {
                alert("Hello world!");
            }

            iframe.contentWindow.myAPIFunc2 = ()=> {
                this.terminate();
            }
        }

        // Set iframe src
        iframe.src = `https://heckersoft.serv00.net`;

        // Show the window
        mainwnd.show();
    }
}

return await WApplication.execAsync(new GUIApplication(), this.boxedEnv.args);
