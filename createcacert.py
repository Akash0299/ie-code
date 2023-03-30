import os
import json
import requests
import datetime
from cryptography import x509
import paramiko

def createX509(devicename,host, path):
    root_token = 's.up6ofuB4XGe5tPQUyzultZjz'
    rolename = 'my-role' 
    payload=json.dumps({
    "common_name": "edgex.com",
    "ttl":"3154000"
    })
    if host == 'localhost' or host == '127.0.0.1':
        resp1 = requests.post('http://localhost:8200/v1/pki/issue/'+rolename,headers = "X-Vault-Token:"+root_token, data = payload)
        device_cert_pem = resp1.json()['data']['certificate']
        device_key_pem = resp1.json()['data']['private_key']
        DEVICE_CERT = path +"/"+devicename+"_cert.pem"
        DEVICE_KEY = path +"/"+devicename+"_key.pem"
        with open(DEVICE_CERT, "wt") as f:
            f.write(device_cert_pem)
        with open(DEVICE_KEY, "wt") as f:
            f.write(device_key_pem)
    else:
        resp1 = requests.post('http://localhost:8200/v1/pki/issue/'+rolename,headers = "X-Vault-Token:"+root_token, data = payload)
        device_cert_pem = resp1.json()['data']['certificate']
        device_key_pem = resp1.json()['data']['private_key']
        DEVICE_CERT = devicename+"_cert.pem"
        DEVICE_KEY = devicename+"_key.pem"
        with open(DEVICE_CERT, "wt") as f:
            f.write(device_cert_pem)
        with open(DEVICE_KEY, "wt") as f:
            f.write(device_key_pem)
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(hostname= host)
        
        # set up SFTP connection
        sftp = ssh.open_sftp()
        
        # copy file
        local_file_path = DEVICE_CERT 
        remote_file_path = path +"/"+devicename+"_cert.pem"
        sftp.put(local_file_path, remote_file_path)

        local_file_path = DEVICE_KEY
        remote_file_path = path +"/"+devicename+"_key.pem"
        sftp.put(local_file_path, remote_file_path)
        
        # close connections
        sftp.close()
<<<<<<< HEAD
        ssh.close() 

                
=======
        ssh.close()                
>>>>>>> 7b45d5472e498bef9138fcafcd7c4d012a74c35d
