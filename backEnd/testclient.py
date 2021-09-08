import requests
url = "http://127.0.0.1:8000/user/register"
data = requests.post(url, json={"name": "kp", "passwd": "pass"})
print(data.reason)
