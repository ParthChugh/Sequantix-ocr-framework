import os
import cv2
import pytesseract
from flask import request
import datetime
import requests
import json
factor=5
base_path=os.getcwd()+"/static/"

def get_horizontal_lines(img, fileName):
    grey = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    ret, thresh = cv2.threshold(grey, 0, 255, cv2.THRESH_BINARY_INV)
    cnts = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = cnts[0] if len(cnts) == 2 else cnts[1]
    areaArray = []
    count = 1
    arr = []
    for i, c in enumerate(cnts):
        area = cv2.contourArea(c)
        areaArray.append(area)
    sorteddata = sorted(zip(areaArray, cnts), key=lambda x: x[0], reverse=True)
    try:
        secondlargestcontour = sorteddata[1][1] 
        x,y,w,h=cv2.boundingRect(secondlargestcontour)
        ocr([x,y,w,h], grey, fileName)
    except: 
        print("secondlargestcontour doesn't exist")
    x,y,w,h=cv2.boundingRect(sorteddata[0][1])
    crop_img = grey[y:y+h, x:x+w]
    cnts = cv2.findContours(crop_img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = cnts[0] if len(cnts) == 2 else cnts[1]
    array = []
    temp_y = -1
    for i in cnts[::-1]:
        x,y,w,h=cv2.boundingRect(i)
        if temp_y == y:
            array.append([x,y,w,h])
        else:
            ocr(array,crop_img,fileName, True)
            array=[]
            array.append([x,y,w,h])
            temp_y = y;

def ocr(co_ord,grey,f, isArray = False):
    if isArray:
        data = ""
        for i in range(0,len(co_ord)):
            x,y,w,h=co_ord[i]
            rect_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2))
            dilation = ~cv2.dilate(~grey[y:y + h, x:x + w], rect_kernel, iterations=1)
            t = pytesseract.image_to_string(dilation).replace(",", "").replace("\n", " ")
            data = data  + t + ","
        if data != "":
            expense_file(data)
    else:
        x,y,w,h=co_ord
        start_row, start_col = x, y
        # Let's get the ending pixel coordinates (bottom right of cropped top)
        end_row, end_col = h, int(w* .5)
        
        d = pytesseract.image_to_string(grey[start_col:start_col+ end_row , start_row:start_row+ end_col], config='--psm 6').replace(":", ",")
        
        start_row, start_col = x + int(w* .5), y
        # Let's get the ending pixel coordinates (bottom right of cropped top)
        end_row, end_col = h, int(w* .5)
        
        t = pytesseract.image_to_string(grey[start_col:start_col+ end_row , start_row:start_row+ end_col], config='--psm 6').replace(":", ",")
        data = d +"\n"+ t;
    f.write(data+'\n')
    print(data)

def fun(name,total_pages):
    f = open(base_path+name+'.csv','w')
    for i in range(0,total_pages):
        img = cv2.imread(base_path+name+"_"+str(i)+".png")
        grey = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        l,w,h = img.shape
        co_ord = get_horizontal_lines(img, f)
    f.close()


def expense_file(t):
    t_list = t.split(',');
    url = "https://expense.zoho.in/api/v1/expenses";
    if (t_list[5].replace(',','').replace('.','').isdigit()) or t_list[6].replace(',','').replace('.','').isdigit():
        payload = {
            "JSONString": {
                "currency_id": "267711000000000064",
                "date": datetime.datetime.strptime(t_list[0], '%d/%m/%Y').strftime('%Y-%m-%d'),
                "is_reimbursable": False,
                "distance": 0,
                "merchant_name": "Federal Bank",
                "report_id": "267711000000008003",
                "payment_mode": "Check",
                "customer_name": "Parth Chugh",
                "project_name": "Federal Bank",
                "is_billable": False,
                "is_inclusive_tax": False,
                "attendees": [
                    {
                        "user_id": "267711000000007001"
                    }
                ],
                "line_items": [
                    {
                        "category_name": "Bank",
                        "amount": float(t_list[5].replace(',','')) if t_list[5] else float(t_list[6].replace(',','')),
                        "description": t_list[2]
                    }
                ]
            }
        }
        payload['JSONString'] = json.dumps(payload['JSONString'])
        headers = {
            'X-com-zoho-expense-organizationid': '60003854769',
            'Authorization': 'Zoho-oauthtoken'+" "+ request.headers['token'] ,
        }
        response = requests.post(url, headers=headers, data=payload)
        print(response)
    
    return {"message": "added"}
