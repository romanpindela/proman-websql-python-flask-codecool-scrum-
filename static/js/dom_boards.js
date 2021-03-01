// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";
import {dom} from "./dom.js";
import {domBoard} from "./dom_board.js";

export let domBoards = {
    init: function () {
        // This function should run once, when the page is loaded.
        let url = "boards_templates.html"
        let divId = "templates_boards"
        dom.loadTemplates(divId, url)
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        this.hide()
        dataHandler.getBoards(function (boards) {
            domBoards.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        let boardsContainer = document.querySelector('#boards');

        //create new board button
        // <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>
        let newBoardButton = document.createElement('button');
        newBoardButton.className = 'btn btn-info btn-lg'
        newBoardButton.setAttribute('data-toggle', 'modal');
        newBoardButton.setAttribute('data-target', '#createBoardModal');

        //newBoardButton.addEventListener('click', ()=>{
        //    //TODO: Show modal window "Create new board"
        //})
        //newBoardButton.className = "btn btn-primary"
        newBoardButton.innerText = "Create new board"
        boardsContainer.insertAdjacentElement('beforeend', newBoardButton)

        let modalTemplate = document.getElementById("createBoard");
        let modal = modalTemplate.content.cloneNode(true)

        let createBoardModalButton = modal.querySelector ("#createBoardBtn")
        createBoardModalButton.addEventListener('click', (event) => {
            let title = document.getElementById("board_title").value
            let isPrivate = document.getElementById("board_private").checked
            dataHandler.createNewBoard(title, isPrivate, (response) => {
                console.log(response)
                $("#createBoardModal").modal('hide');
                this.loadBoards()
            })

        })

        boardsContainer.appendChild(modal);

        let tableBoardRowTemplate = document.getElementById("tableBoardsRow");
        let tableBoardTemplate = document.getElementById("tableBoards");
        let tables = tableBoardTemplate.content.cloneNode(true);
        let table = tables.querySelector("#boards")

        for (let board of boards) {
            let row = tableBoardRowTemplate.content.cloneNode(true);
            console.log(row)
            let title = row.querySelector('#title')
            title.innerText = board.title;
            title.setAttribute('titleId', board.id)
            title.addEventListener('click', (event) => {
                let id = event.target.getAttribute("titleId")
                domBoard.getBoard(id)
            })
            row.querySelector('#private').innerText = board.private;
            let deleteBtn = row.querySelector("#delete")
            deleteBtn.setAttribute('titleId', board.id)
            deleteBtn.addEventListener('click', (event)=>{
                let id = event.target.getAttribute("titleId")
                dataHandler.deleteBoard(id, ()=>
                {
                     $("#createBoardModal").modal('hide');
                    this.loadBoards()
                })
            })

            table.appendChild(row);

        }
        boardsContainer.appendChild(tables)
    },
    hide: function () {
        dom.hide("#boards");
    }
}