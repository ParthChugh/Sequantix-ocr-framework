from flask import render_template, request, Response
import time
import os 
from app import converter, interconTemplate1, interconTemplate2, marriotTemplate1, marriotTemplate2, nikkoTemplate1, omniTemplate1, omniTemplate2, classfake
factor=5
base_path=os.getcwd()+'/static/'
from app import app

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/success', methods = ["POST"])
def success():
    if request.method == 'POST':
        file_name = str(round(time.time()))
        f = request.files['file']
        doc_path=base_path+file_name+".pdf"
        f.save(doc_path)
        total_pages=converter.Convert(doc_path,-1,file_name,base_path,factor)
    return {"name":  file_name, "total_pages": total_pages};

@app.route('/update_bounding_box')
def update_bounding_box():
    total_pages = int(request.args['total_pages'])
    file_name = request.args['file_name']
    fake=classfake.fun(file_name,0)
    fff=0
    if fake == "omni1":
        omniTemplate1.fun(file_name,total_pages)
        fff=1
    if fake == "omni2":
        omniTemplate2.fun(file_name,total_pages)
        fff=1
    if fake == "inter1":
        interconTemplate1.fun(file_name,total_pages)
        fff=1
    if fake == "inter2":
        interconTemplate2.fun(file_name,total_pages)
        fff=1
    if fake == "marriott1":
        marriotTemplate1.fun(file_name,total_pages)
        fff=1
    if fff==0:
        marriotTemplate2.fun(file_name, total_pages)

    #classfake.fun(file_name,total_pages)
    file_name+=".csv"
    return { "message": "Updated", "file_name": file_name }


@app.route('/getcsv')
def get_csv_file(): 
    file_name = request.args['file_name']
    csv = base_path+file_name
    return Response(
        open(csv),
        mimetype="text/csv",
        headers={"Content-disposition":
                 "attachment; filename=myplot.csv"})
