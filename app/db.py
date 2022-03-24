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

cur.execute("""
    CREATE TABLE IF NOT EXISTS shop(
        item TEXT,
        price FLOAT)""")
tea_list = ["milk tea", "green tea", "taro", "oolong tea"]
topping_list = ["tapioca", "grass jelly", "lychee jelly", "red bean", "milk foam"]
tea_price = 1.00
topping_price = 0.20
for i in range(4):
    cur.execute("INSERT INTO shop(item, price) VALUES(?, ?)", (tea_list[i], tea_price))
for i in range(5):
    cur.execute("INSERT INTO shop(item, price) VALUES(?, ?)", (topping_list[i], topping_price))

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


def update_drinks(user_id):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    new_drinks = fetch_drinks(user_id) + 1
    c.execute("UPDATE users SET total = ? WHERE id = ?", (new_drinks, user_id,))

    db.commit()
    db.close()
    return True


def fetch_shop():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    c.execute("SELECT * FROM shop")

    shop_data = c.fetchall()

    shop = []
    for item, price in shop_data:
        thing = {}
        thing["item"] = item
        thing["price"] = price
        shop.append(thing)

    db.close()
    return shop


def createInventory(username, c):
    uName = username + "inv"
    starter_amt = 5
    #teas
    c.execute("CREATE TABLE IF NOT EXISTS " + uName + "(item TEXT, inventory INTEGER)")
    for i in range(4):
        c.execute("INSERT INTO " + uName + "(item, inventory) VALUES(?, ?)", (tea_list[i], starter_amt))
    for i in range(5):
        c.execute("INSERT INTO " + uName + "(item, inventory) VALUES(?, ?)", (topping_list[i], starter_amt))


def fetch_itemInventory(username, item):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    item_inventory = 0
    total_inventory = fetch_inventory(username)
    for row in total_inventory:
        # print(row)
        if (row.get("item") == item):
            # print("item found: " + item)
            item_inventory = row.get("inventory")
            # print("item found: " + item)
            return item_inventory

    return 0


def add_inventory(username, item):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    uName = username + "inv"
    quantity = fetch_itemInventory(username, item)
    quantity += 1
    query = "UPDATE " + uName + " SET inventory = ? WHERE item = ?"
    c.execute(query, (quantity, item,))
    db.commit()
    db.close()
    return True


def fetch_inventory(username):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    user_inventory = username + "inv"
    c.execute("SELECT * FROM " + user_inventory)

    inventory_data = c.fetchall()

    inv = []
    for item, inventory in inventory_data:
        thing = {}
        thing["item"] = item
        thing["inventory"] = inventory
        inv.append(thing)

    db.close()
    return inv
#print(fetch_inventory("r"))


def game_over(user_id):
    """
    Game over when the user can't make any print_orders.
    This is when they can't afford anymore toppings or teas.
    """
    balance = fetch_balance(user_id)

    username = fetch_username(user_id)
    inventory = fetch_inventory(username)
    drinks = 0
    for i in range(4):
        drinks += tea_list[i]

    toppings = 0
    for i in range(5):
        toppings += topping_list[i]

    if (drinks == 0 and balance < 1) or (toppings == 0 and balance < 0.25):
        return True
    return False
