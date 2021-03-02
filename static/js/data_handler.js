// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
export let dataHandler = {
    _data: {}, // it is a "cache for all data received: boards, cards and statuses. It is not accessed from outside.
    _api_get: function (url, callback) {
        // it is not called from outside
        // loads data from API, parses it and calls the callback with it

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
        .then(response => response.json())  // parse the response as JSON
        .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },
    _api_post: function (url, data, callback) {
        // it is not called from outside
        // sends the data to the API, and calls callback function
        //complete example:
        // Default options are marked with *
        // const response = await fetch(url, {
        //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //   mode: 'cors', // no-cors, *cors, same-origin
        //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //   credentials: 'same-origin', // include, *same-origin, omit
        //   headers: {
        //     'Content-Type': 'application/json'
        //     // 'Content-Type': 'application/x-www-form-urlencoded',
        //   },
        //   redirect: 'follow', // manual, *follow, error
        //   referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //   body: JSON.stringify(data) // body data type must match "Content-Type" header
        // });
        // return response.json(); // parses JSON response into native JavaScript objects

        console.log(url)
        console.log(data)

        fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(function (response)
        {
            if (!response.ok)
                throw new Error('Network response was not ok');
            return response.json()
        }).then(
            json_response => callback(json_response)
        )
    },
    init: function () {
    },
    getBoards: function (callback) {
        // the boards are retrieved and then the callback function is called with the boards

        // Here we use an arrow function to keep the value of 'this' on dataHandler.
        //    if we would use function(){...} here, the value of 'this' would change.
        this._api_get('/boards', (response) => {
            this._data['boards'] = response;
            callback(response);
        });
    },
    getBoard: function (boardId, callback) {

        this._api_get('/board/'+boardId, (response) => {
            this._data['board'] = response;
            callback(response);
        });
    },
    getStatuses: function (callback) {
        // the statuses are retrieved and then the callback function is called with the statuses
    },
    getStatus: function (statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: function (boardId, callback) {
        // the cards are retrieved and then the callback function is called with the cards
    },
    getCard: function (cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: function (boardTitle, is_private, callback) {
        // creates new board, saves it and calls the callback function with its data
        let data = {
            title: boardTitle,
            private: is_private
        }

        console.log(data)

        this._api_post("/board/create", data, callback)
    },
    deleteBoard: function(board_id, callback){
        let data = {
            board_id: board_id
        }
      this._api_post("/board/delete", data, callback)
    },
    createNewCard: function (cardTitle, boardId, statusId, callback) {
        // creates new card, saves it and calls the callback function with its data
    },
    // here comes more features
    editBoard(id, title, callback) {
        let data = {
            id : id,
            title: title
        }

        console.log(data)

        this._api_post("/board/edit", data, callback)
    }
};
