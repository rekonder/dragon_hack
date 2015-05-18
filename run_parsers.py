__author__ = 'MikroMan'

import sys
from fri_scrapers import urnik

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

    def printColor(color,msg,end_line='\n'):
        print(color + msg + bcolors.ENDC, end=end_line)

def main(user, password):
    print("Running timetable scraping... ", end='')
    result = urnik.main()


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
