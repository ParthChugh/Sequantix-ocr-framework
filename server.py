from flask import Flask, render_template, request
import os
app = Flask(__name__)

@app.route('/upload')
def upload_file():
   return render_template('index.html')

@app.route('/uploader', methods = ['POST'])
def herei():
	f = request.files['file']
	filename=filename=os.getcwd()+"/"+f.filename
	f.save(filename)
	return "saved"

if __name__ == '__main__':
   app.run(host='0.0.0.0' , port=5000)
