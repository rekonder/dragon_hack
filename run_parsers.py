__author__ = 'MikroMan'

import sys
from fri_scrapers import urnik, studis, naloge, parse_ucilnica
import argparse


def main(user, password):
    result = urnik.main()
    result = studis.main()
    result = naloge.main(user, password)

    #parse_ucilnica not used due to currently not providing implemented info
    #result = parse_ucilnica.main(user,password)


def get_args():
    data = {}

    parser = argparse.ArgumentParser()

    parser.add_argument('--password', '-p', help='Specify user password')
    parser.add_argument('--user', '-u', help='Specify username')
    args = parser.parse_args()

    data['user'] = args.user
    data['password'] = args.password
    return data


if __name__ == '__main__':
    params = get_args()

    main(params['user'], params['pass'])
