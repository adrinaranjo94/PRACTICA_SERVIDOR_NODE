from flask import Flask,render_template, current_app, g, request, make_response, redirect, abort
import random

app = Flask(__name__)

@app.route('/')
def index():
    return "Hola mundo - Flasky"

# RECOGIDA DE PARAMETROS POR URL
@app.route('/nombre/<name>')
def nombre(name):
    return 'Hola '+name


# REDIRECCIONAMIENTO
@app.route('/redirect')
def redireccion():
    return redirect("https://google.es")


# CREACIÓN COOKIE
@app.route('/setcookie')
def setcookie():
    respuesta = make_response('<h1>Este documento contiene cookie</h1>')
    respuesta.set_cookie('id_usuario', str(int(random.random()*5000)))
    return respuesta

# RENDER HTML
@app.route('/html')
def html(name):
    return ("""
    <html>
        <head>
            <meta charset="utf-8">
            <title> Prog. Web Servidor </title>
        </head>
        <body>
            <h1> Curso de Programación Web Servidor  </h1>	
            
        </body>
    </html>
    """)

    # RENDER HTML
@app.route('/html/<name>')
def html_name(name):
    return ("""
    <html>
        <head>
            <meta charset="utf-8">
            <title> Prog. Web Servidor </title>
        </head>
        <body>
            <h1> Curso de Programación Web Servidor  </h1>	
            <p>Mi nombre es {}</p>
        </body>
    </html>
    """).format(name)

if __name__ == '__main__':
    app.run(debug=True,port=int('7000'))