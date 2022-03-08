# HMart (Michelle Lo, Annabel Zhang, Rachel Xiao, Tina Nguyen)
# SoftDev
# P02: Four Toppings Boba Shop
# 2022-03-06


from flask import Flask
from flask import request, render_template

app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def welcome():
    return "Boba"

if __name__ == "__main__": #false if this file imported as module
    #enable debugging, auto-restarting of server when this file is modified
    app.debug = True
    app.run()
