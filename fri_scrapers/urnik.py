__author__ = 'MikroMan'
from bs4 import BeautifulSoup
import requests
import json

urnik_link = "https://urnik.fri.uni-lj.si/timetable/2014_2015_letni/allocations?group=15775"

html = requests.get(urnik_link)
soup = BeautifulSoup(html.text)


mapDays =  {"MON": 0, "TUE": 1, "WED": 2, "THU": 3, "FRI": 5}

hours = soup.find_all("tr", "timetable")
hours.pop(0)
predavanja = {"APS2": [], "PPJ": [], "TIS": [], "ORS": []}
vaje = {"APS2": [], "PPJ": [], "TIS": [], "ORS": []}


def parseSpan(span):
    data = {}
    data["termin"] = span[0].strip()
    data["ucilnica"] = span[2].strip()
    data["asistent"] = span[6].strip().lower()
    tmp = data["asistent"].split()
    k = ""
    for t in tmp:
        k += t.capitalize() + " "
    data["asistent"] = k.strip()
    return data


def parseSpanPredavanja(span):
    data = {}
    data["termin"] = span[0].strip()
    data["ucilnica"] = span[2].strip()
    data["predavatelj"] = span[6].strip()
    return data


for hour in hours:
    time = hour.find_all("td","hour")[0].contents[0]
    activities = hour.find_all("td")
    activities.pop(0)

    for activity in activities:
        tag = activity["class"]
        if len(tag) > 1:
            tag.pop(1)
            tagNum = mapDays[tag[0]]
            if tag[1] == 'LV':

                course = activity.find_all('a','activity')[0].contents[0]
                if course.startswith("TIS") or course.startswith("PPJ") or course.startswith("APS2") or course.startswith("ORS"):
                    span = activity.find_all('span')[0].contents

                    idx = course.find("_")

                    course = course[:idx]

                    vaje[course].append(parseSpan(span))

            elif tag[1] == 'P':
                course = activity.find_all('a','activity')[0].contents[0]
                if course.startswith("TIS") or course.startswith("PPJ") or course.startswith("APS2") or course.startswith("ORS"):
                    span = activity.find_all('span')[0].contents
                    idx = course.find("_")
                    course = course[:idx]
                    predavanja[course].append(parseSpanPredavanja(span))


print(predavanja)

file = open("../pyresources/urnik.json","w",encoding="utf-8")
json.dump({"vaje": vaje, "predavanja": predavanja},file, ensure_ascii=False)

file.close()
