from flask import Flask, render_template, url_for, redirect, request, session
from settings import server_state
import data_handler
from util import json_response


import data_handler
from os import urandom
import bcrypt


import register, login


app = Flask(__name__)
app.secret_key = urandom(16)

"""
            HOME PAGE /  
"""
@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html', \
                           server_state = server_state,\
                           session=session )


"""
            LOGIN AND REGISTRATION  
"""
@app.route("/login", methods=["GET"])
def login():
    """
        This is login page
    """
    return render_template('login.html', \
                           server_state = server_state,\
                           session=session)

@app.route("/login", methods=["POST"])
def login_post():
    """
        This is loging in...
    """


@app.route("/register", methods=["GET"])
def register():
    """
        This is register page
    """
    return render_template('register.html', \
                           server_state = server_state,\
                           session=session)

@app.route("/register", methods=["POST"])
def register_post():
    """
        This registering ...
    """

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

@app.route("/board/create",  methods=['GET', 'POST'])
@json_response
def create_board():
    content = request.json

    # TODO: Get user name from session
    content["user_id"] = "test"
    data_handler.create_board(content)

    return ""

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
