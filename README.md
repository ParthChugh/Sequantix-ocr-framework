## Sequantix OCR framework

Two main files 

Port used 4000 and 5000


ssh username@ip
PASSWORD: password
sudo su
cd FLASK
source bin/activate
cd OCR_DEC
python server.py

CLUSTERING port : 4000
CONTOURING port : 5000

ssh username@ip
PASSWORD: password

--- CLUSTERING BASED ---
sudo su
cd FLASK
source bin/activate
cd APPLICATION
python ocr.py

http://<ip>:4000


--- CONTOURING BASED ---
sudo su
cd FLASK
source bin/activate
cd OCR_DEC
python server.py

http://<ip>:5000