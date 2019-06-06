from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/get_recommendation/")
def hello():
    print(request.args)
    return jsonify({'lat': 'position.coords.latitude', 'long': 'position.coords.longitude', 'lbl': 'EST'})
   #return jsonify({'lat: g.user.latitude, long: g.user.longitute' })

app.run()

# http://localhost:5000/get_recommendation/?lat=-3.53454&long=-60.4343&year=1997&sex=0&vehicle=2
