__author__ = 'MikroMan'

import requests
from bs4 import BeautifulSoup
import json
import sys
from fri_scrapers import color_out as c_out

koledar = "https://ucilnica.fri.uni-lj.si/my/index.php"

site = "https://ucilnica.fri.uni-lj.si/login/index.php"
file_name = './public/data/naloge.json'


def oddano(param):
    if "Oddano" in param:
        return "da"
    else:
        return "ne"


def parse_due_date(param):
    t = param.split(" ")
    t.pop(0)
    t[1] += ","
    t.pop(2)
    t = " ".join(t).strip()
    return t


def parse_assignment_data(span, cookie):
    data = {"link": span}
    html = requests.get(span, cookies=cookie)
    soup = BeautifulSoup(html.text)
    course = soup.find_all('div', 'homelink')[0].contents[0].contents[0]
    course = course.upper()

    if len(course) > 3:
        course = course[0:4]

    data["name"] = course
    table = soup.find_all('table', 'generaltable')[0]
    table = table.find_all('td', 'cell')

    data["oddano"] = oddano(table[1].contents[0])
    data["rok"] = parse_due_date(table[5].contents[0])

    return data


def parse_quiz_data(span, cookie):
    data = {"link": span}
    html = requests.get(span, cookies=cookie)
    soup = BeautifulSoup(html.text)
    course = soup.find_all('div', 'homelink')[0].contents[0].contents[0]
    course = course.upper()
    if len(course) > 3:
        course = course[0:4]

    data["name"] = course
    time = soup.find_all('div', 'quizinfo')[0].contents[2].contents[0].strip().split(" ")
    time = time[len(time) - 4:len(time)]
    time.pop(2)
    time[1] += ","
    data["rok"] = " ".join(time)

    return data


def get_event_data(cookie):
    html = requests.get(koledar, cookies=cookie)

    soup = BeautifulSoup(html.text)
    d = soup.find_all('aside')[2]

    d = d.find_all('div', 'content')[0].find_all('div', 'event')
    events = {"naloge": [], "kvizi": []}
    for event in d:
        span = event.find_all('img')[0]
        if span['title'] == "Naloga":
            span = event.find_all('a')[0]['href']
            events['naloge'].append(parse_assignment_data(span, cookie))

        elif span["title"] == "Kviz":
            span = event.find_all('a')[0]['href']
            events["kvizi"].append(parse_quiz_data(span, cookie))

    return events


def main(user, password):
    print("Scraping assignemtns...", end='')
    payload = {"username": user, "password": password}

    with requests.Session() as v:
        p = v.post(site, data=payload)  # saying our credentials to the site
        pk = v.cookies  # saving cookies as "pk"

    data = get_event_data(pk)

    file = open(file_name, "w", encoding="utf-8")
    json.dump(data, file, ensure_ascii=False)
    file.close()
    c_out.print_color(c_out.OKGREEN, '[OK]')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
