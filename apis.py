import json
from verifyx509 import verifyX509
import requests
from flask import Flask, jsonify, request
from createcacert import createX509

# creating a Flask app
app = Flask(__name__)
  
@app.route('/')
def home():
    return "Welcome to Inteligent Edge!!!"
  
@app.route('/api/v1/gateway/provision', methods=['POST'])
def provisiondevice():
    try:
        req_data = json.loads(request.data)
        devprovmethod = req_data ['device']['authmethod']
        if devprovmethod == 'X509':
            response = requests.post("http://localhost:5000/api/v1/gateway/provision/x509cert",json = req_data)
            return "", response.status_code
    except Exception as e:
        return e

@app.route('/api/v1/gateway/provision/x509cert', methods=['POST'])
def provisiongatewaycertx509():
    try:
        device_data = json.loads(request.data)
        devhost = ''
        devname = device_data['device']['name']
        devprotocol = device_data['device']['protocols']
        for k,v in devprotocol.items():
            devhost = v['Address']
        print(devhost)
        devprovpath = device_data['device']['path']
        createX509(devname,devhost, devprovpath)
        if not verifyX509(devname,devhost,devprovpath):
            return "Device certificate is not valid and not trusted",500
        else:
            dsname = device_data['device']['serviceName']
            dsresp = requests.get('http://localhost:59881/api/v2/deviceservice/name/'+dsname)
            dsaddr = dsresp.json()['service']['baseAddress']
            dsport = dsaddr.split(':')[-1]
            secret = json.dumps({
               
            })
            device_json = json.dumps({
                "apiVersion": device_data['apiVersion'],
                "device": {
                    "name": device_data['device']['name'],
                    "description": device_data['device']['description'],
                    "adminState": device_data['device']['adminState'],
                    "operatingState": device_data['device']['operatingState'],
                    "labels": device_data['device']['labels'],
                    "location": device_data['device']['location'],
                    "serviceName": device_data['device']['serviceName'],
                    "profileName": device_data['device']['profileName'],
                    "autoEvents": device_data['device']['autoEvents'],
                    "protocols": device_data['device']['protocols'],
                    "notify": device_data['device']['notify']
                }
            })
            resp = requests.post('http://localhost:59881/api/v2/device',json = device_json)
            if resp.status_code == 200 or resp.status_code == 201:
                return 'Device provisioned',resp.status_code
            return 'Error in device provisioning',resp.status_code
    except Exception as e:
        return e
  
if __name__ == '__main__':
    app.run('0.0.0.0',5000,debug = True)
