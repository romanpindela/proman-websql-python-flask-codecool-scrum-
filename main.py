from flask import Flask, render_template, url_for, redirect, request, \
    session, \
    jsonify, json
from settings import server_state
import data_handler
from util import json_response


import data_handler
from os import urandom
import bcrypt


app = Flask(__name__)
app.secret_key = urandom(5) # for session
SESSION_KEY = "login"
gensalt_size = 10

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

@app.route("/logout")
def logout():
    if SESSION_KEY in session:
        session.pop(SESSION_KEY)
        redirect(url_for("index"))

@app.route("/login", methods=["POST"])
@json_response
def login_post():
    if request.is_json:
        login_data = request.get_json()
        login = login_data['login']
        password = login_data['password'].encode("UTF-8")
        hashpassword = bcrypt.hashpw(password, \
                                     bcrypt.gensalt(gensalt_size))
        login_success_status = data_handler.check_user_login_data(login, password)
        if login_success_status:
            session[SESSION_KEY] = login
            return {'login_success_status': 'login success'}
        else:
            return {'login_success_status': 'login error'}



@app.route("/register", methods=["GET"])
def register():
    """
        This is register page
    """
    return render_template('register.html', \
                           server_state = server_state,\
                           session=session)

@app.route("/register", methods=["POST"])
@json_response
def register_post():
    if request.is_json:
        registration_data = request.get_json()
        login = registration_data['login']
        password = registration_data['password']
        hashpassword  = bcrypt.hashpw(password.encode('utf-8'), \
                                     bcrypt.gensalt(gensalt_size))

        registration_success_status = data_handler.register_new_user(login, hashpassword.decode("utf-8"))

        if registration_success_status:
            return {'registration_success_status': "success"}
        else:
            return {'registration_success_status': "login exist"}


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

@app.route("/board/create",  methods=['POST'])
@json_response
def create_board():
    content = request.json

    # TODO: Get user name from session
    content["user_id"] = "test"
    data_handler.create_board(content)

    return ""

@app.route("/board/delete",  methods=['POST'])
@json_response
def delete_board():
    content = request.json

    # TODO: Get user name from session
    content["user_id"] = "test"
    data_handler.delete_board(content)

    return ""

@app.route("/board/edit",  methods=['POST'])
@json_response
def edit_board():
    content = request.json

    # TODO: Get user name from session
    content["user_id"] = "test"
    data_handler.edit_board(content)

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
