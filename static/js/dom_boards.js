// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";
import { dom } from "./dom.js";
import { domBoard } from "./dom_board.js";

let templates;

export let domBoards = {
    init: function () {
        // This function should run once, when the page is loaded.
        let templates = document.getElementById("templates")
        let templates_boards = document.createElement("div")
        templates_boards.id = "templates_boards"

        fetch("static/html_templates/boards_templates.html")
            .then(function(response){
                return response.text()
            })
            .then(function(html){
            templates_boards.innerHTML = html
        })
        templates.appendChild(templates_boards)
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            domBoards.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        let boardList = document.createElement("ul");
        for(let board of boards){
            let li = document.createElement("li");
            li.innerText = board.title
            li.setAttribute('id', board.id)
            li.className = "btn btn-link"
            li.addEventListener('click', (event) => {
                let id = event.target.getAttribute("id")
                domBoard.getBoard(id)
            })
            boardList.append(li)
        }

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

        let modalTemplate = document.getElementById("createBoard");
        let modal = modalTemplate.content.cloneNode(true)
        boardsContainer.appendChild(modal);

        let createBoardModalButton = document.getElementById("createBoardBtn")
        createBoardModalButton.addEventListener('click', (event) =>{
            let title = document.getElementById("board_title").value
            let isPrivate = document.getElementById("board_private").checked
            dataHandler.createNewBoard(title, isPrivate, (response)=> {
                console.log(response)
            })
        });

        boardsContainer.insertAdjacentElement('beforeend', newBoardButton)
        boardsContainer.insertAdjacentElement("beforeend", boardList);
    },
    hide: function (){
        dom.hide("#boards");
    }
}