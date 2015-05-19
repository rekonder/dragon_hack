__author__ = 'MikroMan'

import sys
from fri_scrapers import urnik, studis, naloge


def main(user, password):
    result = urnik.main()
    result = studis.main()
    result = naloge.main(user, password)


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
