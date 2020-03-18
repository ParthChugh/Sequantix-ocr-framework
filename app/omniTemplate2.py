import os
import cv2
import pytesseract
from flask import request
import datetime
import json
import requests
factor=5
base_path=os.getcwd()+"/static/"

def showimage(image):
    #cv2.imshow('image',cv2.resize(image, (950, 40)))
    cv2.imshow('image',cv2.resize(image, (950, 740)))
    cv2.waitKey(0)
    cv2.destroyAllWindows()

def get_horizontal_lines(img):
    grey = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    ret, thresh = cv2.threshold(grey, 180, 255, cv2.THRESH_BINARY_INV)
    rect_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (factor * 500, 1))
    dilation = cv2.dilate(thresh, rect_kernel, iterations=1)
    cnts, h = cv2.findContours(dilation, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    arr=[]
    for i in cnts[::-1]:
        x,y,w,h=cv2.boundingRect(i)
        cv2.rectangle(img, (x+20, y-5), (x + w-20, y + h+5), (255, 0, 255), 2)
        arr.append([x , y-10, w , h+10  ])
    #showimage(img)
    return arr

def ocr(co_ord,grey,f, id_expense_report):
    for i in range(0,len(co_ord)):
        x,y,w,h=co_ord[i]
        #cv2.rectangle(img,(x,y), (x+w,y+h), (255, 0, 255), 2)
        rect_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2))
        dilation = ~cv2.dilate(~grey[y:y + h, x:x + w], rect_kernel, iterations=1)
        t = pytesseract.image_to_string(dilation).replace("\n", " ")
        t = " ".join(t.split())
        if "parking" in t.lower():
            i+=3
            break;

    for i in co_ord[i:]:
        x, y, w, h = i
        rect_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2))
        dilation = ~cv2.dilate(~grey[y:y + h, x:x + w], rect_kernel, iterations=1)
        t = pytesseract.image_to_string(dilation).replace("\n", " ").replace(",","")
        t = ",".join(t.split())
        if "page" in t.lower():
            break
        expense_file(t.split(','), id_expense_report)
        f.write(t+'\n')
        print(t)


def fun(f, name,total_pages,report):
    for i in range(0,total_pages):
        img = cv2.imread(base_path+name+"_"+str(i)+".png")
        l,w,h = img.shape
        grey = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        co_ord=get_horizontal_lines(img)
        ocr(co_ord,grey,f, report['expense_report']['report_id'])

def expense_file(t_list,id_expense_report):
    url = "https://expense.zoho.in/api/v1/expenses"
    try:
        if (t_list[-2].replace(',','').replace('.','').isdigit()):
            payload = {
                "JSONString": {
                    "currency_id": "267711000000000061",
                    "date": datetime.datetime.strptime(t_list[3], '%m/%d/%y').strftime('%Y-%m-%d'),
                    "is_reimbursable": False,
                    "distance": 0,
                    "merchant_name": "OMNI HOTELS & RESORTS",
                    "report_id": id_expense_report,
                    "payment_mode": "Check",
                    "customer_name": "Room Number - 9124",
                    "project_name": "OMNI",
                    "is_billable": False,
                    "is_inclusive_tax": False,
                    "attendees": [
                        {
                            "user_id": "267711000000007001"
                        }
                    ],
                    "line_items": [
                        {
                            "category_name": "Hotel",
                            "amount": float(t_list[-2].replace(',','')),
                            "description": t_list[1]
                        }
                    ]
                }
            }
            payload['JSONString'] = json.dumps(payload['JSONString'])
            headers = {
                'X-com-zoho-expense-organizationid': '60003854769',
                'Authorization': 'Zoho-oauthtoken'+" "+ request.headers['token'],
            }
            response = requests.post(url, headers=headers, data=payload)
            print(response)
    except:
        print("error while uploading to zoho")


