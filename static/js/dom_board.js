// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";
import { dom } from "./dom.js";
import { domBoards } from "./dom_boards.js";

export let domBoard = {
    init: function () {
        // This function should run once, when the page is loaded.
        let url = "board_templates.html"
        let divId = "templates_board"
        dom.loadTemplates(divId, url)
    },
    getBoard: function(boardId){
         dataHandler.getBoard(boardId, function(board){
            domBoard.showBoard(board);
        });
         domBoard.loadColumns(boardId);
    },
    showBoard: function(board){
        if(board === undefined) return;

        domBoards.hide();

        //put here logic responsible for display board
        let boardDiv = document.querySelector("#boards");
        let backButton = document.createElement('button')
        backButton.innerText = "Back to boards"
        backButton.classList.add("btn")
        backButton.classList.add("btn-primary")
        backButton.addEventListener('click', ()=>{
            dom.hide("#boards")
            dom.loadBoards()
        })
        boardDiv.insertAdjacentElement('beforeend', backButton)

        let element = dom.getElementFromTemplate("board")
        let board_title = element.querySelector("#board_title")
        board_title.innerText = board.title
        if(board.private){
            board_title.className = "fa fa-lock"
        }else{
             board_title.className = "fa fa-unlock"
        }

        let board_user_id = element.querySelector("#board_user_id")
        board_user_id.innerText = "Board created by " + board.user_id

        var el = document.getElementById('columns');
        new Sortable(el, {
            group: 'shared', // set both lists to same group
            animation: 150
        });


        boardDiv.appendChild(element)

    },
    loadColumns: function (board_id){
        dataHandler.get_columns(board_id, (columns)=>{
            this.showColumns(columns)
        });
    },
    showColumns: function(columns){
        console.log(columns)
    }
}