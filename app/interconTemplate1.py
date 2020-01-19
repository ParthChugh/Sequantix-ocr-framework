import os
import cv2
import pytesseract
base_path=os.getcwd()+"/static/"
factor=5

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
        arr.append([x + 20, y-5, w - 20, h +10])
    return arr

def ocr(co_ord,grey,f):
    for i in range(0,len(co_ord)):
        x,y,w,h=co_ord[i]
        #cv2.rectangle(img,(x,y), (x+w,y+h), (255, 0, 255), 2)
        t = pytesseract.image_to_string(grey[y:y + h, x:x + w]).replace("\n"," ")
        t=" ".join(t.split())
        if "description" in t.lower():
            i+=1
            break

    for i in co_ord[i:]:
        x, y, w, h = i
        t = pytesseract.image_to_string(grey[y:y + h, x:x + w]).replace("\n", " ")
        t = " ".join(t.split())
        print(t)
        if "intercontinental" in t.lower():
            break
        if "-" in t.split(" ")[0]:
            f.write(t.split(" ")[0]+','+" ".join(t.split(" ")[1:-1]) +',,'+ t.split(" ")[-1]+'\n')
        if "total" in t.lower():
            f.write(',,'+" ".join(t.split(" ")[:-2])+','+t.split(" ")[-2]+','+t.split(" ")[-1]+'\n')
        if (not("-" in t.split(" ")[0])) and (not("total" in t.lower())) and (t!=""):
            f.write(',,'+t+'\n')

def fun(name,total_pages):
    f = open(base_path+name+'.csv','w')
    f.write("DATE,DESCRIPTION,,CHARGES,CREDITS\n")
    for i in range(0,total_pages):
        img = cv2.imread(base_path+name+"_"+str(i)+".png")
        l,w,h = img.shape
        img = img[0:l,0:w-100]
        grey = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        co_ord=get_horizontal_lines(img)
        ocr(co_ord,grey,f)
    f.close()
