// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";
import { domBoards } from "./dom_boards.js";
import { domBoard } from "./dom_board.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
        domBoards.init();
        domBoard.init();
    },
    loadBoards: function () {
        domBoards.loadBoards();
    },
    hide: function(selector){
        let boards = document.querySelector(selector)
        while (boards.hasChildNodes())
            boards.removeChild(boards.lastChild)
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    // here comes more features
};
