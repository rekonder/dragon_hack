__author__ = 'MikroMan'

from bs4 import BeautifulSoup
import json
from fri_scrapers import color_out as cout

file_source = "./public/data/studis.html"
file_path = "./public/data/studis.json"
map_courses = ["TIS", "PPJ", "APS2", "ORS"]


def get_student_data(soup):
    student = {"number": soup.find_all("li", "dropdown")[0].find_all("a")[0].contents[0].split(" ")[2][1:9]}
    tmp = soup.title.contents[0].split(" ")

    student["name"] = tmp[0]
    student["surname"] = tmp[1]
    program = soup.find_all("div", "izbraniVpis")[0]
    txt = program.find_all("p")[0].contents[0].strip()
    t = txt.find("/ ")
    student["program"] = txt[0:10] + " " + txt[t + 2:t + 18]
    return student


def get_course_data(soup):
    predmeti = {'TIS': {"dates": ""}, "APS2": {"dates": ""}, "ORS": {"dates": ""}, "PPJ": {"dates": ""}}
    vsi_roki = soup.find_all("tr", "izpitnirok")

    def input_data(course, full_course_name, full_prof_name, next_exam_date):
        predmeti[course]["name"] = full_course_name
        predmeti[course]["prof"] = full_prof_name
        predmeti[course]["dates"] += next_exam_date + ","

    for izpitniRok in vsi_roki:

        rok = izpitniRok.find_all("td")
        current_course_name = rok[1].contents[0]
        current_pfor_name = rok[2].contents[0]
        current_exam_date = rok[3].contents[2].strip()

        if current_course_name == "Teorija informacij in sistemov":
            input_data(map_courses[0], current_course_name, current_pfor_name, current_exam_date)
        elif current_course_name == "Principi programskih jezikov":
            input_data(map_courses[1], current_course_name, current_pfor_name, current_exam_date)
        elif current_course_name == "Algoritmi in podatkovne strukture 2":
            input_data(map_courses[2], current_course_name, current_pfor_name, current_exam_date)
        elif current_course_name == "Organizacija racunalniskih sistemov":
            input_data(map_courses[3], current_course_name, current_pfor_name, current_exam_date)
    return predmeti


def main():
    cout.print_color(cout.WARNING, 'STUDIS: Currently scraping static data only!')
    print('Scraping STUDIS data... ', end='')
    myfile = open(file_source, encoding="utf-8")
    unicode_html = myfile.read()
    soup = BeautifulSoup(unicode_html)

    student = get_student_data(soup)
    predmeti = get_course_data(soup)
    file = open(file_path, "w", encoding="utf-8")
    json.dump({"student": student, "predmeti": predmeti}, file, ensure_ascii=False)
    file.close()
    cout.print_color(cout.OKGREEN, '[OK]')


if __name__ == '__main__':
    main()
