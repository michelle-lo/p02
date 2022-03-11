# HMart: Michelle Lo, Annabel Zhang, Rachel Xiao, Tina Nguyen (PHK, Mang, Mooana, Lola)
# SoftDev
# P02: Four Toppings Boba Shop
# 2022-03-06

import sqlite3

DB_FILE = "orders.db"
db = sqlite3.connect(DB_FILE)
cur = db.cursor()

cur.execute("""
    CREATE TABLE IF NOT EXISTS orders(
        id INTEGER PRIMARY KEY,
        tea TEXT,
        topping1 TEXT,
        topping2 TEXT,
        status INTEGER)""") #0 for open, 1 for closed

db.commit()
db.close()

#add reset table function?

#returns the number of orders in database
def order_count():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    c.execute("SELECT * FROM orders")
    count = (len(c.fetchall()))
    return count

#returns and prints orders onto terminal
def print_orders():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    orders = c.execute("SELECT * FROM orders")
    result = ""
    for row in orders:
        result += str(row)
        result += "\n"
    print(result)
    return result

#creates order!
def create_order():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    id = order_count() + 1 #first order = 1
    tea = "green"
    topping1 = "boba"
    topping2 = "jelly" #later: test to see if null works
    status = 0 #will be open when created
    c.execute("""INSERT INTO orders(id, tea, topping1, topping2, status) VALUES(?, ?, ?, ?, ?)""",(id, tea, topping1, topping2, status))
    print("order #" + str(id) + " added")
    db.commit()
    db.close()

    return True

#fetches the latest entry
def latest_order(): #use fetch_...
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    #account for when there is no latest order, maybe make a is table empty method
    c.execute("""
        SELECT *
        FROM orders
        ORDER BY id DESC
        LIMIT 1
    """)
    latest_order = c.fetchone()
    return latest_order

#updates the latest entry (which is )
def update_status():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    #don't update if table empty
    latest = latest_order()
    latest_id = latest[0]
    query = ("""
        UPDATE orders
        SET status = 1
        WHERE id = ?
    """)
    #status should also be open
    c.execute(query, (latest_id,))
    db.commit()
    db.close()

    return True
