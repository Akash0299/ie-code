import json
from verifyx509 import verifyX509
import requests
from flask import Flask, jsonify, request
from createcacert import createX509
from getcert import getX509
from createkey import createSymkey
from getkey import getSymkey
from verifysymkey import verifySymkey
from renewcert import renewX509
from renewkey import renewSymkey

# creating a Flask app
app = Flask(__name__)
  
@app.route('/')
def home():
    return "Welcome to Inteligent Edge!!!"

@app.route('/test/<username>')
def test(username):
    return "Welcome to Inteligent Edge:"+str(username)

@app.route('/api/v1/gateway/create',methods=['POST'])
def createsecret():
    try:
        req_data = json.loads(request.data)
        devcreatemethod = req_data ['device']['authMethod']
        if devcreatemethod == 'X509':
            response = requests.post("http://localhost:5000/api/v1/gateway/create/x509cert",json = req_data)
            return response.text, response.status_code
        elif devcreatemethod == 'Symmetric Key':
            response = requests.post("http://localhost:5000/api/v1/gateway/create/symkey",json = req_data)
            return response.text, response.status_code
    except Exception as e:
        return e

@app.route('/api/v1/gateway/create/x509cert', methods=['POST'])
def createX509():
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
    except Exception as e:
        return e

@app.route('/api/v1/gateway/create/symkey', methods=['POST'])
def createSymkey():
    try:
        device_data = json.loads(request.data)
        devhost = ''
        devname = device_data['device']['name']
        devprotocol = device_data['device']['protocols']
        for k,v in devprotocol.items():
            devhost = v['Address']
        print(devhost)

        dsname = device_data['device']['serviceName']
        dsresp = requests.get('http://localhost:59881/api/v2/deviceservice/name/'+dsname)
        devprovpath = dsresp.json()['device']['path']
        dsaddr = device_data['service']['baseAddress']
        dsport = dsaddr.split(':')[-1]

        createSymkey(devname,devhost, devprovpath, dsport)
    except Exception as e:
        return e
  
@app.route('/api/v1/gateway/provision', methods=['POST'])
def provisiondevice():
    try:
        req_data = json.loads(request.data)
        devprovmethod = req_data ['device']['authMethod']
        if devprovmethod == 'X509':
            response = requests.post("http://localhost:5000/api/v1/gateway/provision/x509cert",json = req_data)
            return response.text, response.status_code
        elif devprovmethod == 'Symmetric Key':
            response = requests.post("http://localhost:5000/api/v1/gateway/provision/symkey",json = req_data)
            return response.text, response.status_code
    except Exception as e:
        return e

@app.route('/api/v1/gateway/provision/x509cert', methods=['POST'])
def provisiongatewaycertx509():
    try:
        device_data = request.form
        devhost = ''
        devname = device_data['device']['name']
        devprotocol = device_data['device']['protocols']
        for k,v in devprotocol.items():
            devhost = v['Address']
        print(devhost)
        devprovpath = device_data['device']['path']
        print(devprovpath)
        #createX509(devname,devhost, devprovpath)
        if not verifyX509(devname,devhost,devprovpath):
            print("Device certificate is not valid and not trusted")
            return "Device certificate is not valid and not trusted"
        else:
            dsname = device_data['device']['serviceName']
            #print(dsname)
            dsresp = requests.get('http://localhost:59881/api/v2/deviceservice/name/'+dsname)
            #print('Device service:',dsresp)
            dsaddr = dsresp.json()['service']['baseAddress']
            dsport = dsaddr.split(':')[-1]
            #print(dsaddr,dsport)
            secret = json.dumps({
                "apiVersion": "v2",
                "path": "credentials/"+devname,
                "secretData": [
                    {
                        "key": device_data['device']['authMethod'] + "@" + devprovpath,
                        "value": getX509(devname,devhost,devprovpath)
                    }
                ]
            })
            try:
               secretresp = requests.post('http://localhost:'+str(dsport)+'/api/v2/secret', data=secret)
            except Exception as e:
               print(e) 
            #print(secretresp)
            device_json = json.dumps([
               {
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
            }
            ])
            #print(device_json)
            try:
                resp = requests.post('http://localhost:59881/api/v2/device',data = device_json)
                return 'Device provisioned'
            except Exception as e:
                print(e)
            #print('Device provisioning:',resp)
            return 'Error in device provisioning'
    except Exception as e:
        return e

@app.route('/api/v1/gateway/provision/symkey', methods=['POST'])
def provisiongatewaysymkey():
    try:
        device_data = json.loads(request.data)
        devhost = ''
        devname = device_data['device']['name']
        devprotocol = device_data['device']['protocols']
        for k,v in devprotocol.items():
            devhost = v['Address']
        print(devhost)
        devprovpath = device_data['device']['path']
        print(devprovpath)

        dsname = device_data['device']['serviceName']

        if not verifySymkey(devname,devhost,devprovpath,dsname):
            print("Device symmetric key is not valid and not trusted")
            return "Device symmetric key is not valid and not trusted"
        else:
            dsname = device_data['device']['serviceName']
            #print(dsname)
            dsresp = requests.get('http://localhost:59881/api/v2/deviceservice/name/'+dsname)
            #print('Device service:',dsresp)
            dsaddr = dsresp.json()['service']['baseAddress']
            dsport = dsaddr.split(':')[-1]
            #print(dsaddr,dsport)
            secret = json.dumps({
                "apiVersion": "v2",
                "path": "credentials/"+devname,
                "secretData": [
                    {
                        "key": device_data['device']['authMethod'] + "@" + devprovpath ,
                        "value": getSymkey(devname,devhost,devprovpath)
                    }
                ]
            })
            try:
               secretresp = requests.post('http://localhost:'+str(dsport)+'/api/v2/secret', data=secret)
            except Exception as e:
               print(e) 
            #print(secretresp)
            device_json = json.dumps([
               {
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
            }
            ])
            #print(device_json)
            try:
                resp = requests.post('http://localhost:59881/api/v2/device',data = device_json)
                return 'Device provisioned'
            except Exception as e:
                print(e)
            #print('Device provisioning:',resp)
            return 'Error in device provisioning'
    except Exception as e:
        return e


@app.route('/api/v1/gateway/renew/<devicename>',methods=['PUT'])
def renewdevicesecret(devicename):
    try:
        query = request.args
        devcreatemethod = query.auth
        path = query.get('path')
        host = query.get('host')
        dsname = query.get('service')
        if devcreatemethod == 'X509':
            response = requests.put("http://localhost:5000/api/v1/gateway/renew/x509cert/"+devicename+"?path="+path+"&host="+host+"&service="+dsname)
            return response.text, response.status_code
        elif devcreatemethod == 'Symmetric Key':
            response = requests.put("http://localhost:5000/api/v1/gateway/renew/symkey"+devicename+"?path="+path+"&host="+host+"&service="+dsname)
            return response.text, response.status_code
    except Exception as e:
        return e

@app.route('/api/v1/gateway/renew/x509cert/<devicename>',methods=['PUT'])
def renewx509cert(devicename):
    query = request.args
    path = query.get('path')
    host = query.get('host')
    renewX509(devicename, host, path)
    dsname = query.get('service')
    dsresp = requests.get('http://localhost:59881/api/v2/deviceservice/name/'+dsname)
    dsaddr = dsresp.json()['service']['baseAddress']
    dsport = dsaddr.split(':')[-1]
    secret = json.dumps({
        "apiVersion": "v2",
        "path": "credentials/"+devicename,
        "secretData": [
            {
                "key": 'X509' + "@" + path ,
                "value": getX509(devicename,host,path)
            }
        ]
    })
    secretresp = requests.post('http://localhost:'+str(dsport)+'/api/v2/secret', data=secret)
    return 'Renewed Certificate'

@app.route('/api/v1/gateway/renew/symkey/<devicename>',methods=['PUT'])
def renewkey(devicename):
    query = request.args
    path = query.get('path')
    host = query.get('host')
    dsname = query.get('service')
    dsresp = requests.get('http://localhost:59881/api/v2/deviceservice/name/'+dsname)
    dsaddr = dsresp.json()['service']['baseAddress']
    dsport = dsaddr.split(':')[-1]
    renewSymkey(devicename, host, path, dsport)
    secret = json.dumps({
        "apiVersion": "v2",
        "path": "credentials/"+devicename,
        "secretData": [
            {
                "key": 'Symmetric Key' + "@" + path ,
                "value": getSymkey(devicename,host,path)
            }
        ]
    })
    secretresp = requests.post('http://localhost:'+str(dsport)+'/api/v2/secret', data=secret)
    return 'Renewed Symmetric Key'

@app.route('/api/v1/gateway/deprovision/<devicename>',methods=['DELETE'])
def deprovisiondevice(devicename):
    try:
        query = request.args
        devcreatemethod = query.auth
        serialnum = query.serialnum
        service = query.service
        if devcreatemethod == 'X509':
            response = requests.delete("http://localhost:5000/api/v1/gateway/deprovision/x509cert/"+devicename+"?serialnum="+serialnum+"&service="+service)
            return response.text, response.status_code
        elif devcreatemethod == 'Symmetric Key':
            response = requests.delete("http://localhost:5000/api/v1/gateway/deprovision/symkey"+devicename+"?service="+service)
            return response.text, response.status_code
    except Exception as e:
        return e

@app.route('/api/v1/gateway/deprovision/x509cert/<devicename>',methods=['DELETE'])
def deprovisionX509(devicename):
    try:
        snum = request.args.serialnum
        service = request.args.service
        root_token = 's.up6ofuB4XGe5tPQUyzultZjz' 
        headers = {
            'X-Vault-Token': root_token,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        data = json.dumps({
             "serial_number": snum
        })
        resp1=requests.post('http://127.0.0.1:8200/v1/pki/revoke', headers=headers, data= data)
        requests.delete("https://127.0.0.1:8200/v1/secret/edgex/"+service+"credentials/"+devicename, headers=headers)
        requests.delete("http://127.0.0.1:59881/api/v2/device/name/"+devicename)
        return "Successfully deprovisioned the device"
    except Exception as e:
        return e

@app.route('/api/v1/gateway/deprovision/symkey/<devicename>',methods=['DELETE'])
def deprovisionSymkey(devicename):
    try:
        service = request.args.service
        root_token = 's.up6ofuB4XGe5tPQUyzultZjz' 
        headers = {
            'X-Vault-Token': root_token,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        requests.delete("https://127.0.0.1:8200/v1/secret/edgex/"+service+"credentials/"+devicename, headers=headers)
        requests.delete("http://127.0.0.1:59881/api/v2/device/name/"+devicename)
        return "Successfully deprovisioned the device"
    except Exception as e:
        return e

if __name__ == '__main__':
    app.run('0.0.0.0',5000,debug = True)
