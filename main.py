from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
@app.route("/index")
def home():
    return render_template("index.html")


@app.route("/particles")
def particles():
    return render_template("particles.html")


@app.route("/drawing")
def drawing():
    return render_template("drawing.html")


@app.route("/spinning")
def spinning():
    return render_template("spinning.html")


# Starts the web server. No need for terminal commands!
if __name__ == "__main__":
    app.run()
