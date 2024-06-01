from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
@app.route("/index")
def home():
    return render_template("index.html")


@app.route("/particles")
def particles():
    return render_template("particles.html")


@app.route("/spinning")
def spinning():
    return render_template("spinning.html")


if __name__ == "__main__":
    app.run()
