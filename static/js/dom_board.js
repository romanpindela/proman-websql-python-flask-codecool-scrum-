// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";
import { dom } from "./dom.js";
import { domBoards } from "./dom_boards.js";

export let domBoard = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    getBoard: function(boardId){
         dataHandler.getBoard(boardId, function(board){
            domBoard.showBoard(board);
        });
    },
    showBoard: function(board){
        if(board === undefined) return;

        domBoards.hide();

        //put here logic responsible for display board
        let boardDiv = document.querySelector("#display-board");
        let backButton = document.createElement('button')
        backButton.innerText = "Back to boards"
        backButton.classList.add("btn")
        backButton.classList.add("btn-primary")
        backButton.addEventListener('click', ()=>{
            dom.loadBoards()
            dom.hide("#display-board")
        })
        boardDiv.insertAdjacentElement('beforeend', backButton)

        console.log(board)
        let table = document.createElement("table")
        let tr1 = '<tr>' + '<th>Title</th>' + '<td>' + board.title + '</td>' +'</tr>'
        table.insertAdjacentHTML('beforeend', tr1)

        tr1 = '<tr>' + '<th>Created by </th>' + '<td>' + board.user_id + '</td>' +'</tr>'
        table.insertAdjacentHTML('beforeend', tr1)

        tr1 = '<tr>' + '<th>Is private </th>' + '<td>' + board.private + '</td>' +'</tr>'
        table.insertAdjacentHTML('beforeend', tr1)

        boardDiv.insertAdjacentElement('beforeend', table);
    }
}