import subprocess
import time
import os
import sys

def main():
    # Kill any process listening on 8080 or http.server 8080
    subprocess.run(["pkill", "-f", "http.server 8080"], stderr=subprocess.DEVNULL)
    time.sleep(0.5)

    log_file = open("/tmp/server8080.log", "w")
    cmd = [sys.executable, "-m", "http.server", "8080", "--bind", "0.0.0.0", "--directory", "/config/.gemini/antigravity/scratch/dialogue-app"]
    
    proc = subprocess.Popen(
        cmd,
        stdout=log_file,
        stderr=log_file,
        stdin=subprocess.DEVNULL,
        start_new_session=True # Detach process group so it persists after parent shell exits
    )
    
    print(f"Server daemon started with PID {proc.pid}")

if __name__ == "__main__":
    main()
