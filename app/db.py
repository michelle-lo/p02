# HMart: Michelle Lo, Annabel Zhang, Rachel Xiao, Tina Nguyen (PHK, Mang, Mooana, Lola)
# SoftDev
# P02: Four Toppings Boba Shop
# 2022-03-06

import sqlite3

DB_FILE = "database.db"
db = sqlite3.connect(DB_FILE)
cur = db.cursor()

cur.execute("""
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY,
        username TEXT,
        password TEXT,
        balance FLOAT,
        total INTEGER)""") #total drinks

db.commit()
db.close()

#####################
#                   #
# Utility Functions #
#                   #
#####################

def fetch_user_id(username, password):
    db = sqlite3.connect(DB_FILE)

    # Turns the tuple into a single value (sqlite3 commands always return a tuple, even when it is one value)
    db.row_factory = lambda curr, row: row[0]
    c = db.cursor()

    c.execute("""
        SELECT id
        FROM   users
        WHERE  LOWER(username) = LOWER(?)
        AND    password = ?
    """, (username, password))

    user_id = c.fetchone() #user_id will be None if no matches were found

    db.close()

    return user_id


def fetch_username(user_id):
    db = sqlite3.connect(DB_FILE)
    db.row_factory = lambda curr, row: row[0]
    c = db.cursor()

    c.execute("SELECT username FROM users WHERE id = ?", (user_id,))
    username = c.fetchone()

    db.close()
    return username


def fetch_balance(user_id):
    db = sqlite3.connect(DB_FILE)
    db.row_factory = lambda curr, row: row[0]
    c = db.cursor()

    c.execute("SELECT balance FROM users WHERE id = ?", (user_id,))
    balance = c.fetchone()

    db.close()
    return balance


def fetch_drinks(user_id):
    db = sqlite3.connect(DB_FILE)
    db.row_factory = lambda curr, row: row[0]
    c = db.cursor()

    c.execute("SELECT total FROM users WHERE id = ?", (user_id,))
    drinks = c.fetchone()

    db.close()
    return drinks


def register_user(username, password):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    c.execute("SELECT * FROM users WHERE LOWER(username) = LOWER(?)", (username,))
    row = c.fetchone()

    if row is not None:
        return False

    c.execute("""INSERT INTO users(username, password, balance, total) VALUES(?, ?, ?, ?)""",(username, password, 0.0, 0))
    createInventory(username, c)
    db.commit()
    db.close()

    return True

def update_balance(user_id, amount):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    new_balance = fetch_balance(user_id) + amount
    c.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id,))

    db.commit()
    db.close()
    return True

tea_list = ["milk", "green", "taro", "oolong"]
topping_list = ["milk foam", "tapioca", "grass jelly", "lychee jelly", "red bean"]

def createShop():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS shop(item TEXT, price FLOAT)")
    tea_price = 3.00
    topp_price = 0.50
    #tea
    # tea_list = ["milk", "green", "taro", "oolong"]
    # topping_list = ["milk foam", "tapioca", "grass jelly", "lychee jelly", "red bean"]
    for i in range(4):
        c.execute("INSERT INTO shop (item TEXT, price FLOAT) VALUES(?, ?)", (tea_list[i], tea_price))
    for i in range(5):
        c.execute("INSERT INTO shop (item TEXT, price FLOAT) VALUES(?, ?)", (topping_list[i], topping_price))

def createInventory(username, c):
    # db = sqlite3.connect(DB_FILE)
    # c = db.cursor()
    # if 'username' in session:
    uName = username + "inv"
    starter_amt = 5
    #teas
    c.execute("CREATE TABLE IF NOT EXISTS " + uName
                + " (item TEXT, inventory INTEGER)")
    for i in range(4):
        c.execute("INSERT INTO " + uName + " (item, inventory) VALUES(?, ?)", (tea_list[i], starter_amt))
    for i in range(5):
        c.execute("INSERT INTO " + uName + " (item, inventory) VALUES(?, ?)", (topping_list[i], starter_amt))

# createInventory()
