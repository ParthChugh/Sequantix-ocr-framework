from flask import Flask, render_template
import os
import fitz
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


def convert(docpath,pages,docname,base_path,factor):
    doc = fitz.open(docpath)
    print("Pages : ",doc.pageCount)
    mat = fitz.Matrix(factor,factor)
    for i in range(0,doc.pageCount):
        page = doc.loadPage(i)
        pix = page.getPixmap(matrix = mat)
        pix.writePNG(base_path+docname+"_"+str(i)+".png")
        if((i+1)==pages):
            break
    return doc.pageCount