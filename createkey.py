import paramiko
from cryptography.fernet import Fernet
import base64

def createSymkey(devicename,host, path):
    if host == 'localhost' or host == '127.0.0.1':
        # Generate a 256-bit symmetric key
        key = Fernet.generate_key()
        
        # Convert the key to a base64-encoded string
        device_symkey = base64.b64encode(key).decode('utf-8')
        
        DEVICE_SYMKEY = path +"/"+devicename+"_sym.key"
        with open(DEVICE_SYMKEY, "wt") as f:
            f.write(device_symkey)
    else:
       # Generate a 256-bit symmetric key
        key = Fernet.generate_key()
        
        # Convert the key to a base64-encoded string
        device_symkey = base64.b64encode(key).decode('utf-8')
        DEVICE_SYMKEY = devicename+"_sym.key"
        with open(DEVICE_SYMKEY, "wt") as f:
            f.write(device_symkey)

        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(hostname= host)
        
        # set up SFTP connection
        sftp = ssh.open_sftp()
        
        # copy file
        local_file_path = DEVICE_SYMKEY
        remote_file_path = path +"/"+devicename+"_sym.key"
        sftp.put(local_file_path, remote_file_path)
        
        # close connections
        sftp.close()
        ssh.close()