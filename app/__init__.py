# HMart: Michelle Lo, Annabel Zhang, Rachel Xiao, Tina Nguyen (PHK, Mang, Mooana, Lola)
# SoftDev
# P02: Four Toppings Boba Shop
# 2022-03-06

from flask import Flask, request, render_template, redirect, session
import db, order_db

app = Flask(__name__)
app.secret_key = "boba"

def logged_in():
    return "user" in session

@app.route("/", methods=['GET', 'POST'])
def welcome():
    return "Boba"


@app.route("/login", methods=['GET', 'POST'])
def login():
    """
	Retrieves user login inputs and checks it against the "users" database table.
	Brings user to home page after successful login.
	"""
    # if logged_in():
    #     return redirect("/")

    if request.method == "GET": #just getting to the page with no inputs
        return render_template("login.html")

    username = request.form["username"]
    password = request.form["password"]

    if username.strip() == "" or password.strip() == "":
        return render_template("login.html", explain = "Username or Password cannot be blank")

    # Verify this user and password exists
    user_id = db.fetch_user_id(username, password)
    if user_id is None:
        return render_template("login.html", explain = "Username or Password is incorrect")

    # Adds user and user id to session if all is well
    session["user"] = db.fetch_username(user_id)
    session["user_id"] = user_id
    return redirect("/")


@app.route("/signup", methods=['GET', 'POST'])
def signup():
	"""
	Retrieves user inputs from signup page.
	Checks it against the database to make sure the information is unique.
	Adds information to the "users" database table.
	"""
	# if logged_in():
	# 	return redirect("/")

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

@app.route("/game", methods=['GET', 'POST'])
def game(): #redirects user to the chosen area
    if not logged_in():
        redirect("/login")
    if request.method == "POST":
        if request.form["stage"] == "Counter":
            print("Switching to Counter stage...")
            return redirect("/counter")
        elif request.form["stage"] == "Shop":
            print("Switching to Shop stage...")
            return redirect("/shop")
    else:
        return redirect("/counter")

@app.route("/counter", methods=['GET', 'POST'])
def counter():
    if (order_db.order_count() == 0 or order_db.latest_order()[4] == 1): #will create new order if orders is empty OR if last entry is closed
        success = order_db.create_order()
    order_print = order_db.print_orders()
    latest_order = order_db.latest_order()
    return render_template("counter.html", order=latest_order) #loads counter page

@app.route("/shop", methods=['GET', 'POST'])
def shop():
    success = order_db.update_status()
    order_print = order_db.print_orders()
    return render_template("shop.html") #loads shop page

if __name__ == "__main__": #false if this file imported as module
    #enable debugging, auto-restarting of server when this file is modified
    app.debug = True
    app.run()
