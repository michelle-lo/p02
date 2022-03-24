# HMart: Michelle Lo, Annabel Zhang, Rachel Xiao, Tina Nguyen (PHK, Mang, Mooana, Lola)
# SoftDev
# P02: Four Toppings Boba Shop
# 2022-03-06

import sqlite3, random

DB_FILE = "orders.db"

def create_table():
    db = sqlite3.connect(DB_FILE)
    cur = db.cursor()
    #creates new tables for each new user

    cur.execute("""
        CREATE TABLE IF NOT EXISTS orders(
            id INTEGER PRIMARY KEY,
            tea TEXT,
            topping1 TEXT,
            topping2 TEXT,
            price FLOAT,
            customer TEXT,
            status INTEGER)""") #status: 0 for open, 1 for closed
    db.commit()
    db.close()
    return True
create_table()

#returns the number of orders in database
def order_count():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    c.execute("SELECT * FROM orders")
    count = (len(c.fetchall()))
    return count

def table_exists():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    c.execute("SELECT count(id) FROM orders WHERE id='1'")
    if (c.fetchone()[0] == 1):
        print("table exists")
        return True
    else:
        print("table does NOT exist")
        return False

#returns orders dictionary and prints orders onto terminal
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

#3 dollars
#50 cents per topping
#creates order!
def create_order():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    create_table() #create table if it doesn't already exist

    id = order_count() + 1 #first order = 1

    teas = ["green tea", "milk tea", "taro", "oolong tea"]
    toppings = ["milk foam", "boba", "grass jelly", "lychee jelly", "red bean", 'null']
    customers = ["customer0", "customer1", "customer2"]

    tea = teas[random.randint(0, len(teas) - 1)]
    topping_list = random.sample(toppings, 2)
    topping1 = topping_list[0]
    topping2 = topping_list[1] #later: test to see if null works
    r1 = random.randint(0, len(customers) - 1)
    customer = customers[r1]
    status = 0 #will be open when created

    add_on = 0
    if (topping1 == 'null' or topping2 == 'null'): #minimum of 1 topping
        add_on += 0.50
    else:
        add_on += 1.00

    price = (3 + add_on)


    c.execute("""INSERT INTO orders(id, tea, topping1, topping2, price, customer, status) VALUES(?, ?, ?, ?, ?, ?, ?)""",(id, tea, topping1, topping2, price, customer, status))
    print("order #" + str(id) + " added")
    db.commit()
    db.close()

    return True

#fetches the latest entry
def latest_order():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute("""
        SELECT *
        FROM orders
        ORDER BY id DESC
        LIMIT 1
    """)
    latest_order = c.fetchone()
    return latest_order

#[tea, topping1, topping2]
def latest_order_v2():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute("""
        SELECT tea, topping1, topping2
        FROM orders
        ORDER BY id DESC
        LIMIT 1
    """)
    order = c.fetchone()
    return order
print(latest_order_v2())

#updates the latest entry
def update_status():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    if (table_exists()):
        latest = latest_order()
        if (latest[6] == 0): #latest order is open
            latest_id = latest[0]
            query = ("""
                UPDATE orders
                SET status = 1
                WHERE id = ?
            """)
            c.execute(query, (latest_id,))
            print("updated latest order")
            db.commit()
            db.close()
            return True
        else:
            print("latest order is already closed.")
            return False
    else:
        print("table does not exist. cannot update status")
        return False

def fetch_price():
    if (not table_exists or latest_order()[6] == 1):
        return 0
    else:
        latest = latest_order()
        return latest[4]

def fetch_customer():
    if (not table_exists or latest_order()[6] == 1):
        return ""
    else:
        latest = latest_order()
        return latest[5]

#after a user logs out, the table is reset. a new table is created when a user logs in/signs up
#future notes: save button to save balance before logging out
def reset_data():
    #stuff that game must save before logging out
    open("orders.db", "w").close()
    create_table()
    return True

'''
future additions:
[] sell button in counter to sell drink
[] price column
[] balance updates with each sale
'''
