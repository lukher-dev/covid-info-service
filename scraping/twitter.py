#!/usr/bin/env python
# encoding: utf-8

import tweepy
import json
import re
from datetime import datetime
import sys

consumer_key = sys.argv[1]
consumer_secret = sys.argv[2]
access_key = sys.argv[3]
access_secret = sys.argv[4]

history_len = 8

today = {
        'dead_covid_today': None,
        'dead_intercurrent_today': None,
        'new_cases_today': None,
        'cases_global': None,
        'dead_global': None,
        'tests_done_today': None,
        'bed_count': None,
        'occupied_bed_count': None,
        'respirator_count': None,
        'occupied_respirator_count': None,
        'healed_count': None,
        'percent_positive' : None,
        'percent_positive_value' : None,
        'per_voivodeship': {}}

yesterday = {
        'dead_covid_today': None,
        'dead_intercurrent_today': None,
        'new_cases_today': None,
        'cases_global': None,
        'dead_global': None,
        'tests_done_today': None,
        'bed_count': None,
        'occupied_bed_count': None,
        'respirator_count': None,
        'occupied_respirator_count': None,
        'healed_count': None,
        'percent_positive' : None,
        'percent_positive_value' : None,
        'per_voivodeship': {}}

cases_history = []

data = {
        'today': today,
        'yesterday': yesterday,
        'casesHistory': cases_history
}


def extract_info_from_tweet(tweet):
        global data

        if tweet.created_at.date() == datetime.today().date():
                curent_data = data['today']
        else:
                curent_data = data['yesterday']

        try:
                text = tweet.extended_entities['media'][0]['ext_alt_text']

                match = re.search(
                        'liczba ł..ek dla pacjent.w z COVID-19: ([ \\d]+)', text)
                if match and not curent_data['bed_count']:
                        curent_data['bed_count'] = match.groups()[0].replace(" ", "")

                match = re.search(
                        'liczba ...ek zaj.tych: ([ \\d]+)', text)
                if match and not curent_data['occupied_bed_count']:
                        curent_data['occupied_bed_count'] = match.groups()[0].replace(" ", "")

                match = re.search(
                        'liczba respirator.w dla pacjent.w z COVID-19: ([ \\d]+)', text)
                if match and not curent_data['respirator_count']:
                        curent_data['respirator_count'] = match.groups()[0].replace(" ", "")

                match = re.search(
                        'liczba zaj.tych respirator.w: ([ \\d]+)', text)
                if match and not curent_data['occupied_respirator_count']:
                        curent_data['occupied_respirator_count'] = match.groups()[0].replace(" ", "")

                match = re.search(
                        'liczba os.b, kt.re wyzdrowia.y: ([ \\d]+)', text)
                if match and not curent_data['healed_count']:
                        curent_data['healed_count'] = match.groups()[0].replace(" ", "")
        except:
                pass

        try:
                text = tweet.full_text

                match = re.search(
                        'Z powodu COVID.19 zmar.o (\\d+) os.b, .+ innymi .+ (\\d+) os.b', text)
                if match and (not curent_data['dead_covid_today'] and not curent_data['dead_intercurrent_today']):
                        curent_data['dead_covid_today'] = match.groups()[0].replace(" ", "")
                        curent_data['dead_intercurrent_today'] = match.groups()[1].replace(" ", "")

                match = re.search(
                        'Mamy ([ \\d]+) now', text)
                if match:
                        if not curent_data['new_cases_today']:
                                curent_data['new_cases_today'] = match.groups()[0].replace(" ", "")
                        cases_history.append(match.groups()[0].replace(" ", ""))

                match = re.search(
                        '.iczba zaka.onych koronawirusem.([ \\d]+).([ \\d]+).wszystkie', text)
                if match and (not curent_data['cases_global'] and not curent_data['dead_global']):
                        curent_data['cases_global'] = match.groups()[
                                0].replace(" ", "")
                        curent_data['dead_global'] = match.groups()[1].replace(" ", "")

                match = re.search(
                        'ci.gu doby wykonano ponad (.+) test.w', text)
                if match and not curent_data['tests_done_today']:
                        curent_data['tests_done_today'] = match.groups()[0]

                # match = re.findall(
                #         '(\\S+ie)go .([ \\d]+).', text)
                # if match:
                #         for m in match:
                #                 woj = m[0].replace("ą", "a").replace("ś", "s").replace("ń", "n").replace("ł",
                #                                                                                          "l").replace(
                #                         "ó",
                #                         "o").replace(
                #                         "ę",
                #                         "e")
                #                 curent_data['per_voivodeship'][woj] = m[1].replace(" ", "")
        except:
                pass

def get_all_tweets(screen_name):
        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_key, access_secret)
        api = tweepy.API(auth)


        alltweets = api.user_timeline(screen_name = screen_name,count=200, include_ext_alt_text  = True, tweet_mode='extended')
        oldest = alltweets[-1].id - 1

        while len(cases_history)<history_len:
                for tweet in alltweets:
                        extract_info_from_tweet(tweet)

                alltweets = api.user_timeline(screen_name=screen_name, count=200, include_ext_alt_text  = True, tweet_mode='extended', min_id=oldest)
                oldest = alltweets[-1].id - 1


def parse_test_number(tests):
        return float(tests.replace("tys.", "").replace(",", ".")) * 1000

def calculate_the_average(history):
        sum = 0
        for i in history:
                sum += int(i)
        avg = (sum / 7) / 37832148 * 100000
        return avg

if __name__ == '__main__':
        get_all_tweets("MZ_GOV_PL")

        try:
                data['today']['dead_all_today'] = str(int(data['today']['dead_intercurrent_today']) + int(data['today']['dead_covid_today']))
        except:
                pass

        try:
                data['yesterday']['dead_all_today'] = str(int(data['yesterday']['dead_intercurrent_today']) + int(data['yesterday']['dead_covid_today']))
        except:
                pass

        try:
                data['today']['active_cases'] = str(int(data['today']['cases_global']) - int(data['today']['healed_count']) - int(data['today']['dead_global']))
        except:
                pass

        try:
                data['yesterday']['active_cases'] = str(int(data['yesterday']['cases_global']) - int(data['yesterday']['healed_count']) - int(data['yesterday']['dead_global']))
        except:
                pass

        try:
                data['today']['percent_positive'] = '{0:.2f} %'.format(float(data['today']['new_cases_today']) / parse_test_number(data['today']['tests_done_today']) * 100)
        except:
                pass

        try:
                data['yesterday']['percent_positive'] = '{0:.2f} %'.format(float(data['yesterday']['new_cases_today']) / parse_test_number(data['yesterday']['tests_done_today']) * 100)
        except:
                pass

        try:
                data['today']['percent_positive_value'] = float(data['today']['new_cases_today']) / parse_test_number(data['today']['tests_done_today']) * 100
        except:
                pass

        try:
                data['yesterday']['percent_positive_value'] = float(data['yesterday']['new_cases_today']) / parse_test_number(data['yesterday']['tests_done_today']) * 100
        except:
                pass

        try:
                data['casesHistory'] = data['casesHistory'][:history_len]
        except:
                pass

        try:
                if data['today']['new_cases_today']:
                        data['today']['the_average'] = calculate_the_average(data['casesHistory'][:7])
        except:
                pass
        try:
                data['yesterday']['the_average'] = calculate_the_average(data['casesHistory'][1:8])
        except:
                pass

        print(json.dumps(data, sort_keys=True, indent=4))