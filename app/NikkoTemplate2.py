import os
import cv2
import imutils
from converter import Convert
import pytesseract
factor=5
base_path=os.getcwd()+'/static/'


def get_horizontal_lines(img):
    grey = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    ret, thresh = cv2.threshold(grey, 180, 255, cv2.THRESH_BINARY_INV)
    rect_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (factor * 5, 5))
    dilation = cv2.dilate(thresh, rect_kernel, iterations=1)
    cnts, h = cv2.findContours(dilation, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    arr=[]
    for i in cnts[::-1]:
        x,y,w,h=cv2.boundingRect(i)
        cv2.rectangle(img, (x+20, y-5), (x + w-20, y + h+5), (255, 0, 255), 2)
        arr.append([x + 20, y-5, w - 20, h +10])    
    return arr

img = cv2.imread(base_path+"sample_1.PNG")
grey = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
co_ord=get_horizontal_lines(img)
'''
for i in range(0,len(co_ord)):
    x,y,w,h=co_ord[i]
    cv2.rectangle(img,(x,y), (x+w,y+h), (255, 0, 255), 2)
    rect_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (4, 4))
    dilation = ~cv2.dilate(~grey[y:y + h, x:x + w], rect_kernel, iterations=1)
    t = pytesseract.image_to_string(grey[y:y+h,x:x+w]).replace("\n"," ")
    t=" ".join(t.split())
    if "Description" in t:
        i+=1
        break
''''''
for i in co_ord[i:]:
    x,y,w,h=i
    cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 255), 2)
    rect_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (4, 4))
    dilation = ~cv2.dilate(~grey[y:y + h, x:x + w], rect_kernel, iterations=1)
    t = pytesseract.image_to_string(grey[y:y + h, x:x + w]).replace("\n", " ")
    t = " ".join(t.split())
    if "www.okura-nikko.com" in t.lower():
        break
    if "-" in t.split(" ")[0]:
        print(t.split(" ")[0]," ".join(t.split(" ")[1:-1]) ,t.split(" ")[-1])
    if "Total" in t:
        print(" ".join(t.split(" ")[:-2]),t.split(" ")[-2],t.split(" ")[-1])
    if (not ("-" in t.split(" ")[0])) and (not("Total" in t)) and (t!=""):
        print(t)
'''