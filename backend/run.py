import os
import sys

# Ensure both current directory and parent directory are in python path
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.abspath(os.path.join(current_dir, ".."))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

try:
    from backend.app import create_app
except ImportError:
    from app import create_app

app = create_app(os.getenv("FLASK_ENV", "production"))

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5001))
    print(f"\n=======================================================")
    print(f"  VOID ESSENTIALS API Engine")
    print(f"  Running on: http://0.0.0.0:{port}")
    print(f"=======================================================\n")
    app.run(host="0.0.0.0", port=port)
