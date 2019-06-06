from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/info")
def hello():
    print(request.args)
    return jsonify(lat=g.user.latitude,
            lng=g.user.longitude)


app.run()

# http://localhost:5000/info/?lat=g.user.latitude&lng=g.user.longitude
