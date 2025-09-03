# main.py
import sys
from lookup import lookup_number

def handle_command(command: str):
    if command.startswith("!number"):
        parts = command.split()
        if len(parts) < 2:
            print("❌ Usage: !number <phone_number>")
            return
        
        number = parts[1]
        details = lookup_number(number)

        if "error" in details:
            print("❌ Error:", details["error"])
        else:
            country = details.get("country_name", "Unknown")
            carrier = details.get("carrier", "Unknown")
            valid = details.get("valid", False)
            print(f"📞 Number: {number}\n✅ Valid: {valid}\n🌍 Country: {country}\n📡 Carrier: {carrier}")

if name == "__main__":
    if len(sys.argv) < 2:
        print("❌ Please provide a command, e.g.: !number +14155552671")
    else:
        handle_command(" ".join(sys.argv[1:]))
