from flask import render_template
import os
import cv2
import cv2 as cv
import pytesseract
import numpy as np
import numpy as np
import fitz
import time
factor=3

from app import app

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/getRandomData')
def getRandomData():
    return {
        "a": 1,"b": 2,"c": 3
    }

@app.route('/success', methods = ['POST'])  
def success():  
    if request.method == 'POST':  
        breakpoint()
        f = request.files['file']
        filename=os.getcwd()+"/"+f.filename
        f.save(filename)
        doc = fitz.open(filename)
        mat = fitz.Matrix(factor,factor)
        time_id = round(time.time())
        for i in range(0,doc.pageCount):
             page = doc.loadPage(i)
             pix = page.getPixmap(matrix = mat)
             pix.writePNG(os.getcwd()+"/static/"+str(time_id)+str(i)+".png")             
        return {"count": doc.pageCount,"id": time_id}

@app.route('/getboundingbox', methods=["GET","POST"])  
def getboundingbox():
    file_name = request.args.get('filename')
    img = cv2.imread(os.getcwd()+'/static/'+file_name+".png")
    grey = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    ret,thresh = cv.threshold(grey,180,255,cv2.THRESH_BINARY_INV)
    rect_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (factor*12, 20))
    dilation = cv2.dilate(thresh, rect_kernel, iterations = 1)
    cnts,h = cv2.findContours(dilation, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    #cnts = sorted(cnts,key=cv.contourArea, reverse=True)
    #if(len(cnts)>50):
    #    cnts=cnts[:50]
    myarr=[]
    for i in cnts:    
        x,y,w,h = cv.boundingRect(i)    
        if(cv.contourArea(i)>2000):
            myarr.append([x,y,w,h])
            cv.rectangle(img,(x,y),(x+w,y+h),(0,255,0),2)         
    cv2.imwrite(os.getcwd()+"/static/"+file_name+"_contour.png",img)
    # NOW TESSERACT
    myarr = sorted(myarr,key=lambda x:x[0],reverse=False)
    myarr = sorted(myarr,key=lambda x:(x[1]-(x[1]%10)),reverse=False)
    text=""    
    for i in myarr:
        img = cv2.imread(os.getcwd()+'/static/'+file_name+".png")
        x,y,w,h = i
        for j in myarr:
            x1,y1,w1,h1 = j
            if(x1==x and y1==y and w1==w and h1==h):
                continue
            if((x1>=x) and ((x1+w1)<=(x+w)) and (y1>=y) and ((y1+h1)<=(y+h))): #full inner
                continue
            if((x1<=x) and ((x1+w1)>=(x+w)) and (y1<=y) and ((y1+h1)>=(y+h))): #full outer
                continue
            cv.rectangle(grey,(x1,y1),(x1+w1,y1+h1),(255,255,255),-1)
        try:
            k=pytesseract.image_to_string(img[y:y+h, x:x+w]).replace("\n"," ")+"&#13;"
        except:
            k="__"
        #print(k)
        text+=k+'&#13;'
    #print("\n\n\n\n",text)    
    return jsonify('{"filename" : "'+str(file_name+"_contour")+'", "text" : "'+str(text.replace("\"","'"))+'"}')
