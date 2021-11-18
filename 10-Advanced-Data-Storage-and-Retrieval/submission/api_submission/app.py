from flask import Flask, jsonify
import pandas as pd 
import numpy as np 
from sqlalchemy import create_engine
import json 

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/hawaii.sqlite")

#################################################
# Flask Routes
#################################################

@app.route("/")
def home():
    return (
        f"Climate API!<br/>"
        f"<Available Routes:<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/tobs<br>"
        f"/api/v1.0/START_DATE<br/>"
        f"/api/v1.0/START_DATE/END_DATE<br/>"
    )

@app.route("/api/v1.0/stations")
def station():

    conn = engine.connect()
    query= select * from station
    df = pd.read_sql(query,con=conn)
    conn.close()

    data = df.to_json(orient="records")
    data = json.loads(data) 

    return jsonify({"ok": True, "data": data})


@app.route("/api/v1.0/precipitation")
def precipitations():

    conn = engine.connect()
    query= select 
    df = pd.read_sql(query,con=conn)
    conn.close()

    data = df.to_json(orient="records")
    data = json.loads(data)

    return jsonify({"ok": True, "data": data})


# return the dataframe 
data = df.to_json(orient="records") # creates JSON string
data = json.loads(data) # turns the string back into list of dicts

    return jsonify({"ok": True, "data": data})


# run the web app 
if __name__ == "__main__":
    app.run(debug=True)
