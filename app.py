from flask import Flask, render_template, request, redirect, url_for, flash
from flask_bootstrap import Bootstrap

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SelectField
from wtforms.validators import Length, InputRequired, Email, NoneOf, Regexp
from flask_sqlalchemy import SQLAlchemy

from datetime import datetime

from flask_moment import Moment

app = Flask(__name__)
app.config['SECRET_KEY'] = "EstoDeFlask_wtfEsLaPolla!"
Bootstrap(app)
moment = Moment(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./database/data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class User(db.Model):
   id = db.Column(db.Integer, primary_key=True)
   username = db.Column(db.String(15), unique=True)
   email = db.Column(db.String(50), unique=True)
   password = db.Column(db.String(80))


class LoginForm(FlaskForm):
    username = StringField('User Name', validators=[InputRequired(), Length(min=4, max=15)])
    password = PasswordField('Password', validators=[InputRequired(), Length(min=8, max=80)])
    remember = BooleanField('Remember me')


class RegisterForm(FlaskForm):
    username = StringField('User Name', validators=[InputRequired(), Length(min=4, max=15),
                                                    NoneOf(['pepito', 'juanito'], message='Usuario ya existe')])
    email = StringField('Email', validators=[InputRequired(), Email(message='Invalid email'), Length(max=80)])
    password = PasswordField('Password', validators=[InputRequired(),  Length(min=8, max=80), Regexp("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$")])
    language = SelectField('Lenguaje de programación', choices=[('cpp', 'c++'), ('py', 'Python 3')])


@app.route("/")
def index():
    return render_template("index.html", page="index", current_time=datetime.utcnow())


@app.route("/login", methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if request.method == "POST":
        if form.validate_on_submit():
            return redirect(url_for('dashboard'))
        else:
            flash("Usuario o contraseña incorrecta")
            pass
    else:
        pass
    return render_template("login.html", page="login", form=form)


@app.route("/sign-up", methods=['GET', 'POST'])
def signup():
    form = RegisterForm()
    if request.method == "POST":
        if form.validate_on_submit():
            return redirect(url_for('dashboard'))
        else:
            pass
    else:
        pass
    return render_template("signup.html", page="sign-up", form=form)


if __name__ == '__main__':
    app.run(debug=True)