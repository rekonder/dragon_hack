__author__ = 'MikroMan'

import sys
from fri_scrapers import urnik, studis, naloge, parse_ucilnica


def main(user, password):
    result = urnik.main()
    result = studis.main()
    result = naloge.main(user, password)

    #parse_ucilnica not used due to currently not providing implemented info
    #result = parse_ucilnica.main(user,password)


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
