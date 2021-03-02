import { dom } from "./dom.js";
import { initRegisterButton,
        registerButton
} from "./register.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();
    initRegisterButton();

}

init();
