__author__ = 'Tine'

import requests

site = "https://ucilnica.fri.uni-lj.si/login/index.php"
payload = {"username": "ts7328@student.uni-lj.si", "password":"Speedwolf8"}

with requests.Session() as v:
        p = v.post(site, data=payload) ## saying our credentials to the site
        pk=v.cookies  ## saving cookies as "pk"

k = requests.get('https://ucilnica.fri.uni-lj.si/my/', cookies=pk)


print(k.text)

