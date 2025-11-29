from flask import Flask, jsonify
from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv()  # loads SUPABASE_URL, SUPABASE_KEY from .env

app = Flask(__name__)

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(url, key)


@app.get("/api/hello")
def hello():
    """Return a friendly greeting for the frontend demo."""
    return jsonify({"message": "Hello from Flask!"})


@app.get("/api/users")
def list_users():
    """
    Example: read rows from a 'users' table in Supabase.
    """
    resp = supabase.table("users").select("*").execute()
    # resp.data is a list of dicts
    return jsonify(resp.data), 200


@app.post("/api/users/seed")
def seed_user():
    """
    Example: insert a fixed user row to test writes.
    """
    data = {"name": "Test User", "email": "test@example.com"}
    resp = supabase.table("users").insert(data).execute()
    return jsonify(resp.data), 201

@app.get("/api/ping-db")
def ping_db():
    # This is a database test, it tries to read one row from messages table (will delete later)
    resp = supabase.table("messages").select("*").limit(1).execute()
    return jsonify({"ok":True, "row_count": len(resp.data), "rows":resp.data,}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5010, debug=True)
