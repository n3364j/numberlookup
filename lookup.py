# lookup.py
import requests
from config import API_KEY, BASE_URL

def lookup_number(number: str) -> dict:
    """Lookup phone number details using API."""
    headers = {"apikey": API_KEY}
    response = requests.get(f"{BASE_URL}?number={number}", headers=headers)
    
    if response.status_code != 200:
        return {"error": f"API request failed with status {response.status_code}"}
    
    return response.json()
