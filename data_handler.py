from typing import List, Dict

from psycopg2 import sql
from psycopg2._psycopg import cursor
from psycopg2.extras import RealDictCursor
from settings import *

from datetime import date, datetime
import bcrypt

import connection

import persistence_postgres

def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    statuses = persistence_postgres.get_statuses()
    return next((status['title'] for status in statuses if status['id'] == str(status_id)), 'Unknown')


def get_boards():
    """
    Gather all boards
    :return:
    """
    return persistence_postgres.get_boards(force=True)

#Boards
def get_board(board_id):
    return persistence_postgres.get_board(board_id, force=True)[0]

def create_board(board):
    board_id = persistence_postgres.create_board(board)

    persistence_postgres.create_column(board_id, 1, 'New')
    persistence_postgres.create_column(board_id, 2, 'In Progress')
    persistence_postgres.create_column(board_id, 3, 'Testing')
    persistence_postgres.create_column(board_id, 4, 'Done')

    return board_id

def delete_board(parameters):
    return persistence_postgres.delete_board(parameters)

def edit_board(parameters):
    return persistence_postgres.edit_board(parameters)

#Cards


def get_cards_for_board(board_id):
    persistence_postgres.clear_cache()
    all_cards = persistence_postgres.get_cards()
    matching_cards = []
    for card in all_cards:
        if card['board_id'] == str(board_id):
            card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
            matching_cards.append(card)
    return matching_cards

def check_if_login_doesnt_exist(loginame):
    count_login =  persistence_postgres.check_login_exist(loginame)
    return True if count_login['count'] == 0 else False

def register_new_user(loginname, password):
    if check_if_login_doesnt_exist(loginname):
        persistence_postgres.register_new_user(loginname, password)
        return True;
    else:
        return False;

def check_user_login_data(loginname, password_encoded_utf8):
    if not check_if_login_doesnt_exist(loginname):
        db_hash_password = persistence_postgres.get_user_password(loginname).get('password')
        db_hash_bytes_password_encoded_utf8 = db_hash_password.encode("UTF-8")
        return bcrypt.checkpw(password_encoded_utf8,db_hash_bytes_password_encoded_utf8)
    else:
        return False

