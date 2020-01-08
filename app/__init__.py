from flask import Flask, render_template

app = Flask(__name__)
from app import views

def create_app(env='local'):
    app.config.from_object('config-%s' % env)

    if app.debug:
        print('debug mode')
    else:
        print('NOT debug mode')
    return app
