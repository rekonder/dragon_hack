__author__ = 'Tine'

from bs4 import BeautifulSoup
import json

filename = "..\pyresources\studis.html"
myfile = open(filename,encoding="utf-8")
unicode_html = myfile.read()

soup = BeautifulSoup(unicode_html)
OUT = open("../pyresources/out.txt","w")
student = {}
tmp = soup.title.contents[0].split(" ")

student["name"] = tmp[0]
student["surname"] = tmp[1]

json.dump(student,OUT)

program = soup.find_all("div", "izbraniVpis")[0]
txt = program.find_all("p")[0].contents[0].strip()
student["program"] = txt[0:10] + " "
print(student)
OUT.close()











