__author__ = 'Tine'

import requests
from bs4 import BeautifulSoup
import json

aps2_link = "https://ucilnica.fri.uni-lj.si/course/view.php?id=309"

site = "https://ucilnica.fri.uni-lj.si/login/index.php"
payload = {"username": "ts7328@student.uni-lj.si", "password":"Speedwolf8"}

def getApsData(pk):
        html = requests.get("https://ucilnica.fri.uni-lj.si/mod/page/view.php?id=32848", cookies=pk)
        aps2 = {}
        aps2["link"] = aps2_link

        soup = BeautifulSoup(html.text.encode("utf-8"))
        data = soup.find_all('div')
        print(data)



        return aps2


with requests.Session() as v:
        p = v.post(site, data=payload) ## saying our credentials to the site
        pk=v.cookies  ## saving cookies as "pk"

file = open("../pyresources/ucilnica_data.txt","w")


aps_data = getApsData(pk)

json.dump(aps_data,file)

file.close()

