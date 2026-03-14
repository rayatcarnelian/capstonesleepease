import firebase_admin
from firebase_admin import credentials, firestore
import os
import json

# Check if the app is initialized to avoid errors on reload
if not firebase_admin._apps:
    try:
        firebase_creds = os.getenv("FIREBASE_CREDENTIALS")
        if firebase_creds:
            print("--- Initializing Firebase from Environment Variable ---")
            creds_data = json.loads(firebase_creds)
            cred = credentials.Certificate(creds_data)
            firebase_admin.initialize_app(cred)
        elif os.path.exists("serviceAccountKey.json"):
            print("--- Initializing Firebase from Local File ---")
            cred = credentials.Certificate("serviceAccountKey.json")
            firebase_admin.initialize_app(cred)
        else:
            print("--- WARNING: No Firebase Credentials Found. Attempting Application Default ---")
            try:
                firebase_admin.initialize_app()
            except Exception:
                print("--- WARNING: Application Default Auth Failed. ---")
    except Exception as e:
        print(f"--- ERROR: Firebase Setup Failed: {e} ---")

# Global DB Client
try:
    db = firestore.client()
    print("--- Firebase Firestore Client Ready ---")
except Exception as e:
    print(f"--- CRITICAL: Firestore client could not be created: {e} ---")
    db = None