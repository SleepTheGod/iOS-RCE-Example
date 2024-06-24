from flask import Flask, request
import json

app = Flask(__name__)

@app.route('/log_device_info', methods=['POST'])
def log_device_info():
    device_info = request.json
    print(device_info)  # Log to console (or save to a file or database)
    with open('device_info.log', 'a') as log_file:
        log_file.write(json.dumps(device_info) + "\n")
    return '', 204

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
