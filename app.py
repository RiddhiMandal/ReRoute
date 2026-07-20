import json
import math
import os

from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "cities.json")
TORONTO = (43.6532, -79.3832)


def load_cities():
    with open(DATA_PATH) as f:
        return json.load(f)["cities"]


def haversine_km(lat1, lng1, lat2, lng2):
    R = 6371
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lng2 - lng1)
    a = math.sin(dphi / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dlambda / 2) ** 2
    return round(R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a)), 1)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/cities")
def api_cities():
    """List cities, optionally filtered by max 1BR budget and/or max distance from Toronto."""
    cities = load_cities()

    max_budget = request.args.get("max_budget", type=float)
    max_distance = request.args.get("max_distance", type=float)
    bedroom = request.args.get("bedroom", default="1br")

    def rent_for(city):
        return city["housing"]["avg_rent"].get(bedroom, city["housing"]["avg_rent"]["1br"])

    out = []
    for c in cities:
        if max_budget is not None and rent_for(c) > max_budget:
            continue
        if max_distance is not None and c["distance_from_toronto_km"] > max_distance:
            continue
        out.append(c)

    return jsonify({"cities": out, "count": len(out)})


@app.route("/api/cities/<city_id>")
def api_city_detail(city_id):
    cities = load_cities()
    city = next((c for c in cities if c["id"] == city_id), None)
    if not city:
        return jsonify({"error": "City not found"}), 404
    return jsonify(city)


if __name__ == "__main__":
    app.run(debug=True, port=5050)
