__author__ = 'MikroMan'

import requests
from bs4 import BeautifulSoup
import json
aps2_link = "https://ucilnica.fri.uni-lj.si/course/view.php?id=309"

site = "https://ucilnica.fri.uni-lj.si/login/index.php"
payload = {"username": "ts7328@student.uni-lj.si", "password":"Speedwolf8"}


def cleanText(text):
       alpha = "čČšŠćĆđĐžŽ"
       repl = "cCsScCdDzZ"
       for i in range(0,len(alpha)):
               text = text.replace(alpha[i],repl[i],100)
       return text


def getApsData(pk):
        html = requests.get("https://ucilnica.fri.uni-lj.si/mod/page/view.php?id=32848", cookies=pk)
        aps2 = {"link": aps2_link}

        txt = cleanText(html.text)

        soup = BeautifulSoup(txt)
        data = soup.find_all('a',"urlextern")

        aps2["predavateljLink"] = data[1]["href"]
        aps2["predavatelj"] = data[1].contents[0]

        data = soup.find_all('a', href=True)
        mails = []
        for d in data:
            if "mailto" in d["href"]:
                mails.append(d["href"][7:])
        aps2["predavateljMail"] = mails.pop(0)

        aps2["asistenti"] = ",".join(mails)

        return aps2


with requests.Session() as v:
        p = v.post(site, data=payload) ## saying our credentials to the site
        pk=v.cookies  ## saving cookies as "pk"




aps_data = getApsData(pk)
file = open("../pyresources/ucilnica.json","w",encoding="utf-8")
json.dump(aps_data,file)

file.close()

