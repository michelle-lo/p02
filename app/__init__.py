# HMart: Michelle Lo, Annabel Zhang, Rachel Xiao, Tina Nguyen (PHK, Mang, Mooana, Lola)
# SoftDev
# P02: Four Toppings Boba Shop
# 2022-03-06

from flask import Flask, request, render_template, redirect, session
import db

app = Flask(__name__)
app.secret_key = "boba"

def logged_in():
    return "user" in session

@app.route("/", methods=['GET', 'POST'])
def welcome():
    return "Boba"


@app.route("/login", methods=['GET', 'POST'])
def login():
    if logged_in():
        return redirect("/")

    if request.method == "GET": #just getting to the page with no inputs
        return render_template("login.html")

    username = request.form["username"]
    password = request.form["password"]

    if username.strip() == "" or password.strip() == "":
        return render_template("login.html", explain = "Username or Password cannot be blank")

    # Verify this user and password exists
    user_id = database.fetch_user_id(username, password)
    if user_id is None:
        return render_template("login.html", explain = "Username or Password is incorrect")

    # Adds user and user id to session if all is well
    session["user"] = database.fetch_username(user_id)
    session["user_id"] = user_id
    return redirect("/")


if __name__ == "__main__": #false if this file imported as module
    #enable debugging, auto-restarting of server when this file is modified
    app.debug = True
    app.run()
