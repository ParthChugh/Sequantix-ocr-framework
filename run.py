from app import create_app
import os

port = int(os.environ.get('PORT', 3555))
app = create_app(env='local') #Or pass 'prod' to NOT be in debug mode

app.run(host='0.0.0.0', port=port)
