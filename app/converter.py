import fitz
import os

def Convert(docpath,pages,docname,base_path,factor):
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


