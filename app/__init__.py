# HMart: Michelle Lo, Annabel Zhang, Rachel Xiao, Tina Nguyen (PHK, Mang, Mooana, Lola)
# SoftDev
# P02: Four Toppings Boba Shop
# 2022-03-06

from flask import Flask, request, render_template, redirect, session, jsonify
import db, order_db
import json

app = Flask(__name__)
app.secret_key = "boba"

saved_drink = {"tea":"null", "topp1":"null", "topp2":"null"}
type = ""

def logged_in():
	"""
	Returns True if the user is in session.
	"""
	return "user" in session


@app.route("/", methods=['GET', 'POST'])
def welcome():
	return redirect("/login")


@app.route("/login", methods=['GET', 'POST'])
def login():
	"""
	Retrieves user login inputs and checks it against the "users" database table.
	Brings user to home page after successful login.
	"""
	if logged_in():
	    return redirect("/counter")

	if request.method == "GET": #just getting to the page with no inputs
		return render_template("login.html")

	username = request.form["username"]
	password = request.form["password"]

	if username.strip() == "" or password.strip() == "":
		return render_template("login.html", explain="Username or Password cannot be blank")

	# Verify this user and password exists
	user_id = db.fetch_user_id(username, password)
	if user_id is None:
		return render_template("login.html", explain="Username or Password is incorrect or username doesn't exit")

	# Adds user and user id to session if all is well
	session["user"] = db.fetch_username(user_id)
	session["user_id"] = user_id
	#create order table --> originally in /login
	#order_db.create_table() #create or recreate orders table for users
	create_order = order_db.create_order() #create the first order
	return redirect("/profile")


@app.route("/logout")
def logout():
	"""
	Removes user from session.
	"""
	if logged_in():
		success = order_db.reset_data() #resets orders table everytime user logs out
		session.pop("user")
		session.pop("user_id")
	return redirect("/login")


@app.route("/signup", methods=['GET', 'POST'])
def signup():
	"""
	Retrieves user inputs from signup page.
	Checks it against the database to make sure the information is unique.
	Adds information to the "users" database table.
	"""
	if logged_in():
		return redirect("/counter")

	# Default page
	if request.method == "GET":
		return render_template("register.html")

	# Check sign up
	user = request.form["newusername"]
	pwd = request.form["newpassword"]
	if user.strip() == "" or pwd.strip == "":
		return render_template("register.html", explain="Username or Password cannot be blank")

	# Add user information if passwords match
	if (request.form["newpassword"] != request.form["newpassword1"]):
		return render_template("register.html", explain="The passwords do not match")

	register_success = db.register_user(user, pwd) #checks if not successful in the database file
	if not register_success:
		return render_template("register.html", explain="Username already exists")
	else:
		return redirect("/login")


@app.route("/profile")
def profile():
	if not logged_in():
		return redirect("/login")
	username = db.fetch_username(session["user_id"])
	balance = db.fetch_balance(session["user_id"])
	drinks = db.fetch_drinks(session["user_id"])
	return render_template("profile.html", username=username, drinks=drinks, balance=balance)


@app.route("/about")
def about():
	if not logged_in():
		return redirect("/login")
	return render_template("about.html")


@app.route("/game", methods=['GET', 'POST'])
def game(): #redirects user to the chosen area
	if request.method == "POST":
		if request.form["stage"] == "Counter":
			print("Switching to Counter stage...")
			return redirect("/counter")
		elif request.form["stage"] == "Kitchen":
			print("Switching to Kitchen stage...")
			return redirect("/kitchen")
		elif request.form["stage"] == "Shop":
			print("Switching to Shop stage...")
			return redirect("/shop")
	else:
		return redirect("/counter")


@app.route("/counter", methods=['GET', 'POST'])
def counter():
	if not logged_in():
		return redirect("/login")
	order_print = order_db.print_orders() #for debugging

	latest_order = order_db.latest_order()
	current_balance = db.fetch_balance(session["user_id"])
	return render_template("counter.html", current_balance=current_balance, current_order=latest_order) #loads counter page


@app.route("/counter_load", methods=['GET', 'POST'])
def display_order():
	latest_order = order_db.latest_order()
	new_customer = order_db.fetch_customer()
	print(saved_drink["tea"])
	print(saved_drink["topp1"])
	print(saved_drink["topp2"])
	json = jsonify({
		"order" : latest_order,
		"customer" : new_customer,
		"savedTea" : saved_drink["tea"],
		"savedTopp1" : saved_drink["topp1"],
		"savedTopp2" : saved_drink["topp2"]
	})
	return json


@app.route("/shop", methods=['GET', 'POST'])
def shop():
	#print(db.fetch_inventory(session["user"]))
	current_balance = round(db.fetch_balance(session["user_id"]), 2)
	print("tapioca inven: " + str(db.fetch_itemInventory(session["user"], "tapioca")))
	if request.method == "GET":
		return render_template("shop.html", milkTeaInven=db.fetch_itemInventory(session["user"], "milk"), greenTeaInven=db.fetch_itemInventory(session["user"], "green"), taroTeaInven=db.fetch_itemInventory(session["user"], "taro"), oolongTeaInven=db.fetch_itemInventory(session["user"], "oolong"), tapiocaInven=db.fetch_itemInventory(session["user"], "tapioca"), grassJellyInven=db.fetch_itemInventory(session["user"], "grass jelly"), lycheeJellyInven =db.fetch_itemInventory(session["user"], "lychee jelly"), redBeanInven=db.fetch_itemInventory(session["user"], "red bean"), milkFoamInven=db.fetch_itemInventory(session["user"], "milk foam"), balance=current_balance)
	elif request.method == "POST":
		return render_template("shop.html", milkTeaInven=db.fetch_itemInventory(session["user"], "milk"), greenTeaInven=db.fetch_itemInventory(session["user"], "green"), taroTeaInven=db.fetch_itemInventory(session["user"], "taro"), oolongTeaInven=db.fetch_itemInventory(session["user"], "oolong"), tapiocaInven=db.fetch_itemInventory(session["user"], "tapioca"), grassJellyInven=db.fetch_itemInventory(session["user"], "grass jelly"), lycheeJellyInven =db.fetch_itemInventory(session["user"], "lychee jelly"),  balance=current_balance)


@app.route("/shop_process", methods=['POST'])
def process():
	# print(db.fetch_itemInventory(session["user"], "green"))
	tea_list = ["milkTea", "greenTea", "taro", "oolongTea"]
	topping_list = ["tapioca", "grassJelly", "lycheeJelly", "redBean", "milkFoam"]

	# tea_list = ["milk tea", "green tea", "taro", "oolong tea"]
	# topping_list = ["tapioca", "grass jelly", "lychee jelly", "red bean", "milk foam"]

	if request.method == "POST":
		item = request.get_json(force=True)["item"]
		print(item)
		if (item == "milkTea"):
			success = db.add_inventory(session["user"], "milk")
			print(str(item) + " inventory: " + str(db.fetch_itemInventory(session["user"], "milk")))
		elif (item == "greenTea"):
			success = db.add_inventory(session["user"], "green")
			print(str(item) + " inventory: " + str(db.fetch_itemInventory(session["user"], "green")))
		elif (item == "taro"):
			success = db.add_inventory(session["user"], "taro")
			print(str(item) + " inventory: " + str(db.fetch_itemInventory(session["user"], "taro")))
		elif (item == "oolongTea"):
			success = db.add_inventory(session["user"], "oolong")
			print(str(item) + " inventory: " + str(db.fetch_itemInventory(session["user"], "oolong")))
		elif (item == "tapioca"):
			success = db.add_inventory(session["user"], "tapioca")
			print(str(item) + " inventory: " + str(db.fetch_itemInventory(session["user"], "tapioca")))
		elif (item == "grassJelly"):
			success = db.add_inventory(session["user"], "grass jelly")
			print(str(item) + " inventory: " + str(db.fetch_itemInventory(session["user"], "grass jelly")))
		elif (item == "lycheeJelly"):
			success = db.add_inventory(session["user"], "lychee jelly")
			print(str(item) + " inventory: " + str(db.fetch_itemInventory(session["user"], "lychee jelly")))
		elif (item == "redBean"):
			success = db.add_inventory(session["user"], "red bean")
			print(str(item) + " inventory: " + str(db.fetch_itemInventory(session["user"], "red bean")))
		elif (item == "milkFoam"):
			success = db.add_inventory(session["user"], "milk foam")
			print(str(item) + " inventory: " + str(db.fetch_itemInventory(session["user"], "milk foam")))

		for tea in tea_list:
			if (item == tea):
				# type = "tea"
				balance_updated = db.update_balance(session["user_id"], -1.00)
				print("balance: " + str(db.fetch_balance(session["user_id"])))

		for topping in topping_list:
			if (item == topping):
				# type = "topping"
				balance_updated = db.update_balance(session["user_id"], -0.20)
				print("balance: " + str(db.fetch_balance(session["user_id"])))

	return "hello"

@app.route("/shop_balance", methods=['GET', 'POST'])
def update_balance():
	balance = round(db.fetch_balance(session["user_id"]), 2)
	# print("shop balance from /shop balance: " + str(balance))
	inventory = db.fetch_inventory(session["user"])
	# print(inventory)
	print("tapioca: " + str(inventory[4].get("inventory")))
	# [{'item': 'milk', 'inventory': 180},
	# {'item': 'green', 'inventory': 62},
	# {'item': 'taro', 'inventory': 27},
	# {'item': 'oolong', 'inventory': 17},
	# {'item': 'milk foam', 'inventory': 18},
	# {'item': 'tapioca', 'inventory': 27},
	# {'item': 'grass jelly', 'inventory': 10},
	# {'item': 'lychee jelly', 'inventory': 11},
	# {'item': 'red bean', 'inventory': 12}]

	json = jsonify({
		"balance" : balance,
		"milkTea" : inventory[0].get("inventory"),
		"greenTea" : inventory[1].get("inventory"),
		"taroTea" : inventory[2].get("inventory"),
		"oolongTea" : inventory[3].get("inventory"),
		"milkFoam" : inventory[4].get("inventory"),
		"tapioca" : inventory[5].get("inventory"),
		"grassJelly" : inventory[6].get("inventory"),
		"lycheeJelly" : inventory[7].get("inventory"),
		"redBean" : inventory[8].get("inventory")
	})
	return json

@app.route("/kitchen", methods=['GET', 'POST'])
def kitchen():
	return render_template("kitchen.html")

@app.route("/save_drink", methods=['POST'])
def save_drink():
	if request.method == "POST":
		drink_order = request.get_json(force=True)
		print(drink_order["tea"])
		saved_drink["tea"] = drink_order["tea"]
		saved_drink["topp1"] = drink_order["topp1"]
		saved_drink["topp2"] = drink_order["topp2"]
		# print(drink_order)
		# print("tea: " + saved_drink["tea"])
		# print("topp1: " + saved_drink["topp1"])
		# print("topp2: " + saved_drink["topp2"])
		return "hello"

@app.route("/load_kit_save", methods=['GET', 'POST'])
def load_save():

	json = jsonify({
		"tea" : saved_drink["tea"],
		"topp1" : saved_drink["topp1"],
		"topp2" : saved_drink["topp2"],
	})
	print("load kit save: " + saved_drink["tea"])
	print("load kit save: " + saved_drink["topp1"])
	print("load kit save: " + saved_drink["topp2"])
	return json

@app.route("/process", methods=['GET', 'POST'])
def process_sale():
	#checking if the order is correct
	order = order_db.latest_order_v2()
	if saved_drink["topp1"] == None:
		saved_drink["topp1"] == "null"
	if saved_drink["topp2"] == None:
		saved_drink["topp2"] == "null"
	print(order)
	print(saved_drink)
	if saved_drink["tea"] in order[0]:
		if (saved_drink["topp1"] in order[1] or saved_drink["topp1"] in order[2]) and (saved_drink["topp2"] in order[1] or saved_drink["topp2"] in order[2]):
			#updating balance
			new_amount = order_db.fetch_price() #fetches price of latest drink (if not already closed)
			balance_updated = db.update_balance(session["user_id"], new_amount)
			print("balance: " + str(db.fetch_balance(session["user_id"])))

			#updating sales database and creates new order
			success = order_db.update_status()
			drinks_update = db.update_drinks(session["user_id"])
			if (order_db.latest_order()[6] == 1):
				create_order = order_db.create_order()

			#sending data to counter.js
			new_balance = db.fetch_balance(session["user_id"])
			latest_order = order_db.latest_order()
			new_customer = order_db.fetch_customer()
			json = jsonify({
				"balance" : new_balance,
				"order" : latest_order,
				"customer" : new_customer
			})
			order_print = order_db.print_orders()
			return json
	return ""


if __name__ == "__main__": #false if this file imported as module
	#enable debugging, auto-restarting of server when this file is modified
	app.debug = True
	app.run()
