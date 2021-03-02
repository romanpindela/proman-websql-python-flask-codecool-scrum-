from datetime import datetime

from psycopg2._psycopg import cursor

from connection import *
import time
import os
import util
from typing import List, Dict

from psycopg2 import sql
from psycopg2.extras import RealDictCursor, RealDictRow, DictCursor
from psycopg2.extensions import AsIs

import connection

@connection.connection_handler
def get_boards(cursor: RealDictCursor, force=False):
    query = """
            SELECT *
            FROM boards """
    cursor.execute(query)
    return cursor.fetchall()

    #return _get_data('boards', BOARDS_FILE, force)

@connection.connection_handler
def get_board(cursor: RealDictCursor, board_id, force=False):
    query = """
        SELECT id, title, user_id, private
        FROM boards
        WHERE id = %(board_id)s"""
    param = {'board_id': board_id}
    cursor.execute(query, param)
    return cursor.fetchall()

@connection_handler
def create_board(cursor: RealDictCursor, board):
    command = """
        INSERT INTO boards (id, title, private , user_id)
        VALUES (NULLIF((select max(id) from boards),0)+1,  %(title)s, %(private)s, %(user_id)s);
        """
    param = {
        'title': board['title'],
        'private': board['private'],
        'user_id': board['user_id']
    }
    cursor.execute(command, param)
    return 0

@connection_handler
def delete_board(cursor: RealDictCursor, parameters):
    command = """
        DELETE FROM boards
        where id = %(board_id)s and (private = false or (private = true and user_id = %(user_id)s))
    """
    param = {
        'board_id': parameters['board_id'],
        'user_id': parameters['user_id']
    }
    cursor.execute(command, param)

@connection_handler
def edit_board(cursor: RealDictCursor, parameters):
    command = """
        UPDATE boards
        SET title = %(board_title)s
        where id = %(board_id)s and (private = false or (private = true and user_id = %(user_id)s))
    """
    param = {
        'board_id': parameters['id'],
        'user_id': parameters['user_id'],
        'board_title': parameters['title']
    }
    cursor.execute(command, param)

@connection_handler
def check_login_exist(cursor: RealDictCursor, loginame):
    command = """
        SELECT count(*)
        FROM users
        WHERE login = %(login)s
    """
    param = {
        "login": loginame
    }
    cursor.execute(command, param)
    return cursor.fetchone()

@connection_handler
def register_new_user(cursor: RealDictCursor, loginname, password):
    command = """
        INSERT INTO users(login, password)
        VALUES (%(loginname)s, %(password)s)
        RETURNING *
    """
    param = {
        "loginname": loginname,
        "password": password
        }
    cursor.execute(command, param)
