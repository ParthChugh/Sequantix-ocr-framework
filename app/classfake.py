import cv2
import pytesseract
import os
base_path=os.getcwd()+"/static/"

def showimage(image):
    #cv2.imshow('image',cv2.resize(image, (950, 40)))
    cv2.imshow('image',cv2.resize(image, (950, 740)))
    cv2.waitKey(0)
    cv2.destroyAllWindows()

def fun(file_name,total_pages):
    img = cv2.imread(base_path + file_name+"_"+str(total_pages)+ ".png")
    #img = cv2.imread(base_path + file_name + "_" + total_pages + ".png")
    _, w, _ = img.shape
    grey = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    grey=grey[0:600,0:w]
    t=pytesseract.image_to_string(grey).replace("\n", " ").replace(",", "")
    if "hdfc" in t.lower():
        return("hdfc")
    if "federal" in t.lower():
        return("federal")
    if "omni" in t.lower():
        if "american" in t.lower():
            return("omni1")
        else:
            return("omni2")
    if "intercontinental" in t.lower():
        if "account" in t.lower():
            return("inter2")
        else:
            return ("inter1")
    if "marriott" in t.lower():
        if "group" in t.lower() :
            return("marriott2")
        else:
            return("marriott1")