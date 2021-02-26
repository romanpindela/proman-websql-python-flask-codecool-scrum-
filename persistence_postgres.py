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
