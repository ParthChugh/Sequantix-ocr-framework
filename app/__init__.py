from flask import Flask, render_template
import os
ASSETS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../dist')

app = Flask(__name__, static_folder=ASSETS_DIR)
from app import views

def create_app(env='local'):
    app.config.from_object('config-%s' % env)

    if app.debug:
        print('debug mode')
    else:
        print('NOT debug mode')
    return app
