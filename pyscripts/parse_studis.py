__author__ = 'Tine'

from bs4 import BeautifulSoup
import json

filename = "..\pyresources\studis.html"
myfile = open(filename,encoding="utf-8")
unicode_html = myfile.read()
soup = BeautifulSoup(unicode_html)

OUT = open("../pyresources/studis_data.txt","w")


def getStudentData(soup):
    student = {}
    student["number"] = soup.find_all("li","dropdown")[0].find_all("a")[0].contents[0].split(" ")[2][1:9]
    tmp = soup.title.contents[0].split(" ")

    student["name"] = tmp[0]
    student["surname"] = tmp[1]
    program = soup.find_all("div", "izbraniVpis")[0]
    txt = program.find_all("p")[0].contents[0].strip()
    t = txt.find("/ ")
    student["program"] = txt[0:10] + " " + txt[t+2:t+18]
    return student

def getCourseData(soup):
    predmeti = {'TIS': {"dates": ""}, "APS2": {"dates": ""}, "ORS": {"dates": ""},"PPJ": {"dates": ""}}
    vsi_roki = soup.find_all("tr", "izpitnirok")

    for izpitniRok in vsi_roki:

        rok = izpitniRok.find_all("td")
        courseName = rok[1].contents[0]
        profName = rok[2].contents[0]
        examDate = rok[3].contents[2].strip()

        if courseName == "Teorija informacij in sistemov":
            predmeti["TIS"]["name"] = courseName
            predmeti["TIS"]["prof"] = profName
            predmeti["TIS"]["dates"] += examDate + ","
        elif courseName == "Principi programskih jezikov":
            predmeti["PPJ"]["name"] = courseName
            predmeti["PPJ"]["prof"] = profName
            predmeti["PPJ"]["dates"] += examDate + ","
        elif courseName == "Algoritmi in podatkovne strukture 2":
            predmeti["APS2"]["name"] = courseName
            predmeti["APS2"]["prof"] = profName
            predmeti["APS2"]["dates"] += examDate + ","
        elif courseName == "Organizacija racunalniskih sistemov":
            predmeti["ORS"]["name"] = courseName
            predmeti["ORS"]["prof"] = profName
            predmeti["ORS"]["dates"] += examDate + ","
    return predmeti

student = getStudentData(soup)
predmeti = getCourseData(soup)
json.dump(student,OUT)
json.dump(predmeti,OUT)
OUT.close()











