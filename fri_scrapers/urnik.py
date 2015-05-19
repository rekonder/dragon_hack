__author__ = 'MikroMan'
from bs4 import BeautifulSoup
import requests
import json
from fri_scrapers import color_out

urnik_link = "https://urnik.fri.uni-lj.si/timetable/2014_2015_letni/allocations?group=15775"
file_path = "./public/data/urnik.json"

mapDays = {"MON": 0, "TUE": 1, "WED": 2, "THU": 3, "FRI": 5}
predavanja = {"APS2": [], "PPJ": [], "TIS": [], "ORS": []}
vaje = {"APS2": [], "PPJ": [], "TIS": [], "ORS": []}


def parse_span_vaje(span):
    data = {"termin": span[0].strip(), "ucilnica": span[2].strip(), "asistent": span[6].strip().lower()}
    tmp = data["asistent"].split()
    k = ""
    for t in tmp:
        k += t.capitalize() + " "
    data["asistent"] = k.strip()
    return data


def parse_span_sredavanja(span):
    data = {"termin": span[0].strip(), "ucilnica": span[2].strip(), "predavatelj": span[6].strip()}
    return data


def main():
    print("Scraping timetables... ", end='')
    try:
        html = requests.get(urnik_link)
    except:
        return print_fail()

    soup = BeautifulSoup(html.text)

    hours = soup.find_all("tr", "timetable")
    if len(hours) < 1:
        return print_fail()
    hours.pop(0)

    for hour in hours:
        activities = hour.find_all("td")
        activities.pop(0)

        for activity in activities:
            tag = activity["class"]
            if len(tag) > 1:
                tag.pop(1)
                if tag[1] == 'LV':

                    course = activity.find_all('a', 'activity')[0].contents[0]
                    if course.startswith("TIS") or course.startswith("PPJ") or course.startswith(
                            "APS2") or course.startswith("ORS"):
                        span = activity.find_all('span')[0].contents
                        course = course[:course.find("_")]
                        vaje[course].append(parse_span_vaje(span))

                elif tag[1] == 'P':
                    course = activity.find_all('a', 'activity')[0].contents[0]
                    if course.startswith("TIS") or course.startswith("PPJ") or course.startswith(
                            "APS2") or course.startswith("ORS"):
                        span = activity.find_all('span')[0].contents
                        idx = course.find("_")
                        course = course[:idx]
                        predavanja[course].append(parse_span_sredavanja(span))

    file = open(file_path, "w", encoding="utf-8")
    json.dump({"vaje": vaje, "predavanja": predavanja}, file, ensure_ascii=False)
    file.close()
    color_out.print_color(color_out.OKGREEN, '[OK]')
    return 1


def print_fail():
    color_out.print_color(color_out.FAIL, '[FAIL]')
    return 0


if __name__ == '__main__':
    main()
