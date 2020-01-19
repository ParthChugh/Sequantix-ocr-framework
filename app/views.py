from flask import render_template, request, send_file
import fitz
import cv2 
import pytesseract
import time
import os
import csv
factor=5
base_path=os.getcwd()+'/static/'
from app import app


def Get_Text(img):
  return pytesseract.image_to_string(img).replace("\n",' ').upper()

def Convert(docpath,pages,docname):
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

def Clustering_Bounding_Boxes_OMNI_FORMAT_1_HORIZONTAL(img):
      grey = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
      ret,thresh = cv2.threshold(grey,180,255,cv2.THRESH_BINARY_INV)
      rect_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (factor*12*10, 1))
      dilation = cv2.dilate(thresh, rect_kernel, iterations = 1)    
      cnts,h = cv2.findContours(dilation, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
      #cnts = sorted(cnts,key=cv.contourArea, reverse=True)
      #if(len(cnts)>50):
      #    cnts=cnts[:50]
      myarr=[]
      for i in cnts:
          x,y,w,h = cv2.boundingRect(i)
          if(cv2.contourArea(i)>2000 and w>2000):
              myarr.append([x,y,w,h])
              #cv2.rectangle(img,(x,y),(x+w,y+h),(0,255,0),2)
      return myarr

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/success', methods = ['POST'])  
def success(): 
  if request.method == 'POST':
    base_path=os.getcwd()+'/static/'
    name=str(round(time.time()))
    f = request.files['file']
    f.save(base_path+name+f.filename)
    total=Convert(base_path+name+f.filename,-1,name)
    print(name,total)
    return {"name":  name, "total_pages": total};

@app.route('/fetch_image', methods = ['GET'])  
def get_file(): 
  file_name=base_path+request.args['file_name']+".png"
  return send_file(file_name, mimetype='image/gif')

@app.route('/getboundingbox_and_text', methods = ['GET'])
def getboundingbox_and_text(): 
  total_pages=int(request.args['total_pages'])
  file_name=request.args['file_name']
  data = []
  headers = ["Room", "Name", "Arrival","Departure","Room","Room Tax","Destination Charge","F&B","Parking","Misc","Banquets","Catering","AV","Grand Total","Payments"];
  data.append(headers);
  with open(base_path+file_name+'.csv', 'w', newline='') as file:
      writer = csv.writer(file)
      writer.writerow(headers)   

      for current_page in range(0,total_pages):
          img = cv2.imread(base_path+file_name+"_"+str(current_page)+".png")
          myarr=Clustering_Bounding_Boxes_OMNI_FORMAT_1_HORIZONTAL(img)
          texts=[]

          for i in  myarr[::-1]:
              x,y,w,h=i
              text=Get_Text(img[y-5:y+h+5,x:x+w+10]).replace("=","").replace(",","")
              text=" ".join(text.split())
              if("ROOM" in text or "HOTEL" in text or text==""):
                  continue
              texts.append(text)

          for myarr_vals in texts:
              try:
                  j=myarr_vals.split(" ")
                  payments=j.pop(-1)
                  grand_total=j.pop(-1)
                  av_value=j.pop(-1)
                  catering=j.pop(-1)
                  banquets=j.pop(-1)
                  misc=j.pop(-1)
                  parking=j.pop(-1)
                  f_b=j.pop(-1)
                  destination=j.pop(-1)
                  room_tax=j.pop(-1)
                  room=j.pop(-1)
                  departure=j.pop(-1)
                  arrival=j.pop(-1)
                  room=j.pop(0)
                  name=" ".join(j)
                  writer.writerow([room, name, arrival,departure,room,room_tax,destination,f_b,parking,misc,banquets,catering,av_value,grand_total,payments])
                  data.append([room, name, arrival,departure,room,room_tax,destination,f_b,parking,misc,banquets,catering,av_value,grand_total,payments])
              except :
                   print("")  
  return {"lists": data}


# def showimage(image):
#       #cv2.imshow('image',cv2.resize(image, (950, 40)))
#   cv2.imshow('image',cv2.resize(image, (950, 740)))
#   cv2.waitKey(0)
#   cv2.destroyAllWindows()

