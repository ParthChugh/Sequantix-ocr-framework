from flask import render_template, request, Response, redirect
import time
import os 
import json
from app import converter, interconTemplate1, interconTemplate2, marriotTemplate1, marriotTemplate2, nikkoTemplate1, omniTemplate1, omniTemplate2, classfake, hdfc, federal
factor=5
import random
base_path=os.getcwd()+'/static/'
from app import app
import requests

@app.route('/')
def index():  
    if (len(request.args) >0 and request.args['code']):
        return render_template("index.html", code=request.args['code'])
    else:
        return redirect("https://accounts.zoho.in/oauth/v2/auth?scope=ZohoExpense.fullaccess.ALL&client_id=1000.QG6M2A0EEQC3P47F79GK60J14O0E1V&response_type=code&access_type=offline&redirect_uri=http://13.65.252.202");


@app.route('/success', methods = ["POST"])
def success():
    if request.method == 'POST':
        array = []
        for i in range(0,len(request.files)):
            file_name = str(round(time.time()))
            f = request.files['file'+ str(i)]
            doc_path=base_path+file_name+".pdf"
            f.save(doc_path)
            total_pages=converter.Convert(doc_path,-1,file_name,base_path,factor)
            array.append({"name":  file_name, "total_pages": total_pages});
            time.sleep(5)
        return {"response": array}
    

@app.route('/update_bounding_box')
def update_bounding_box():
    f = open(base_path+request.args['name_0']+'.csv','w')
    report = create_expense_report()
    for data in range(0,int(request.args['total_pages'])):
        total_pages = int(request.args['total_pages_'+str(data)])
        file_name = request.args['name_'+str(data)]
        fake=classfake.fun(file_name,0)
        print(fake)
        fff=0
        if fake == "omni1":
            omniTemplate1.fun(f,file_name,total_pages, report)
            fff=1
        if fake == "omni2":
            omniTemplate2.fun(f,file_name,total_pages, report)
            fff=1
        if fake == "inter1":
            interconTemplate1.fun(f,file_name,total_pages)
            fff=1
        if fake == "inter2":
            interconTemplate2.fun(f, file_name,total_pages)
            fff=1
        if fake == "marriott1":
            marriotTemplate1.fun(f, file_name,total_pages, report)
            fff=1
        if fake == "hdfc":
            hdfc.fun(f, file_name,total_pages)
            fff=1
        if fake == "federal":
            federal.fun(f, file_name, total_pages, report)
            fff=1
        if fff==0:
            marriotTemplate2.fun(f, file_name, total_pages, report)
    
    f.close()
    return { "message": "Updated", "file_name": request.args['name_0']+'.csv' }

@app.route('/getcsv')
def get_csv_file(): 
    file_name = request.args['file_name']
    csv = base_path+file_name
    return Response(
        open(csv),
        mimetype="text/csv",
        headers={"Content-disposition":
                 "attachment; filename=myplot.csv"})


@app.route('/get_token')
def get_token(): 
    params =  {
        "code": request.args['code'],
        "redirect_uri": "http://13.65.252.202",
        "client_id": "1000.QG6M2A0EEQC3P47F79GK60J14O0E1V",
        "client_secret": "939fd4f0010a75a4cc5b781f0b3cfb7c7e26ee1823",
        "grant_type": "authorization_code"
    }
    data = requests.post("https://accounts.zoho.in/oauth/v2/token", data = params)
    if data.text == '{"error":"invalid_code"}':
        return { "message": "Error", "status_code": 400, "data": data.text }
    else:
        return { "message": "Updated", "data": json.loads(data.text) }


def create_expense_report():
    url = "https://expense.zoho.in/api/v1/expensereports"
    payload = {
        "JSONString": { 
            "report_name": "Receipt "+str(random.randrange(0, 101000, 2)),
            "start_date": "2011-02-07",
            "end_date": "2025-02-18"
         }     
    }
    payload['JSONString'] = json.dumps(payload['JSONString'])
    headers = {
        'X-com-zoho-expense-organizationid': '60003854769',
        'Authorization': 'Zoho-oauthtoken'+" "+ request.headers['token'],
    }
    response = requests.post(url, headers=headers, data=payload)
    return response.json()
