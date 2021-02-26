from flask import Flask, render_template, url_for

import data_handler
from util import json_response

# import data_handler

app = Flask(__name__)


"""
            HOME PAGE /  
"""
@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


"""
            LOGIN AND REGISTRATION  
"""
@app.route("/login", methods=["GET"])
def login():
    """
        This is login page
    """
    return render_template('login.html')

@app.route("/register", methods=["GET"])
def register():
    """
        This is register page
    """
    return render_template('register.html')


"""
            BOARDS
"""
@app.route("/boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()

@app.route("/board/<int:board_id>")
@json_response
def get_board(board_id: int):
    """
    All the boards
    """
    return data_handler.get_board(board_id)

@app.route("/cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards_for_board(board_id)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
