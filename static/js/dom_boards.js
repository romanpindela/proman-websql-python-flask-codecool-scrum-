// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";
import { dom } from "./dom.js";
import { domBoard } from "./dom_board.js";

export let domBoards = {
    init: function () {
        // This function should run once, when the page is loaded.
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
        newBoardButton.setAttribute('data-target', '#myModal');

        //newBoardButton.addEventListener('click', ()=>{
        //    //TODO: Show modal window "Create new board"
        //})
        //newBoardButton.className = "btn btn-primary"
        newBoardButton.innerText = "Create new board"

        let divMyModal = document.createElement('div')
        divMyModal.setAttribute('id', 'myModal');
        divMyModal.setAttribute('role', 'dialog');
        divMyModal.className="modal fade"

        boardsContainer.insertAdjacentElement('beforeend', divMyModal)

        let divModalDialog = document.createElement('div');
        divModalDialog.className = "modal-dialog";

        divMyModal.insertAdjacentElement('beforeend', divModalDialog);

        let divModalContent = document.createElement('div')
        divModalContent.className = "modal-content"
        divModalDialog.insertAdjacentElement('beforeend', divModalContent)

        let divModalHeader = document.createElement('div')
        divModalHeader.className = "modal-header"

        let buttonClose = document.createElement('button')
        buttonClose.className = "close"
        buttonClose.setAttribute('data-dismiss', 'modal')
        buttonClose.innerText='&times;'
        divModalHeader.insertAdjacentElement('beforeend', buttonClose);

        let modalTitle = document.createElement('h4')
        modalTitle.className="modal-title"
        modalTitle.innerText = "Modal header"
        divModalHeader.insertAdjacentElement('beforeend', modalTitle)

        divModalContent.insertAdjacentElement('beforeend', divModalHeader)

        let modalBody = document.createElement('div')
        modalBody.className = "modal-body"
        modalBody.innerText = "Some body"

        divModalContent.insertAdjacentElement('beforeend', modalBody)

        let modalFooter = document.createElement('div')
        modalFooter.className = "modal-footer"

        buttonClose = document.createElement('button')
        buttonClose.className = "btn btn-default"
        buttonClose.setAttribute('data-dismiss', 'modal')
        buttonClose.innerText='Close'
        modalFooter.insertAdjacentElement('beforeend', buttonClose);

         divModalContent.insertAdjacentElement('beforeend', modalFooter)
        /*
        <!-- Modal --
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Modal Header</h4>
        </div>
        <div class="modal-body">
          <p>Some text in the modal.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>

    </div>
  </div>
         */

        boardsContainer.insertAdjacentElement('beforeend', newBoardButton)
        boardsContainer.insertAdjacentElement("beforeend", boardList);
    },
    hide: function (){
        dom.hide("#boards");
    }
}