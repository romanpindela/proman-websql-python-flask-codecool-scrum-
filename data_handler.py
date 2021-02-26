from typing import List, Dict

from psycopg2 import sql
from psycopg2._psycopg import cursor
from psycopg2.extras import RealDictCursor
from settings import *

from datetime import date, datetime

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

def get_board(board_id):
    return persistence_postgres.get_board(board_id, force=True)[0]

def get_cards_for_board(board_id):
    persistence_postgres.clear_cache()
    all_cards = persistence_postgres.get_cards()
    matching_cards = []
    for card in all_cards:
        if card['board_id'] == str(board_id):
            card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
            matching_cards.append(card)
    return matching_cards