import sys

__author__ = 'MikroMan'

import requests
from bs4 import BeautifulSoup
import json
from fri_scrapers import color_out as c_out

aps2_link = "https://ucilnica.fri.uni-lj.si/course/view.php?id=309"
site = "https://ucilnica.fri.uni-lj.si/login/index.php"
aps_link_subpage = "https://ucilnica.fri.uni-lj.si/mod/page/view.php?id=32848"


def clean_text(text):
    alpha = "čČšŠćĆđĐžŽ"
    repl = "cCsScCdDzZ"
    for i in range(0, len(alpha)):
        text = text.replace(alpha[i], repl[i], 100)
    return text


def get_aps_data(pk):
    html = requests.get(aps_link_subpage, cookies=pk)
    aps2 = {"link": aps2_link}

    txt = clean_text(html.text)

    soup = BeautifulSoup(txt)
    data = soup.find_all('a', "urlextern")

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


def main(user, passwd):
    print("Scraping course data from Ucilnica... ", end='')
    with requests.Session() as v:
        response = v.post(site, data={'username': user, 'password': passwd})  # saying our credentials to the site
        cookie = v.cookies  # saving cookies as "pk"
    aps_data = get_aps_data(cookie)
    file = open("./public/data/ucilnica.json", "w", encoding="utf-8")
    json.dump(aps_data, file)

    file.close()
    c_out.print_color(c_out.OKGREEN, '[OK]')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
