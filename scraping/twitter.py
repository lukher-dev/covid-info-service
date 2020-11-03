#!/usr/bin/env python
# encoding: utf-8

import tweepy
import json
import re
from datetime import datetime

consumer_key = ""
consumer_secret = ""
access_key = ""
access_secret = ""

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
        'per_voivodeship': {}}

data = {
        'today': today,
        'yesterday': yesterday
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
                if match:
                        curent_data['bed_count'] = match.groups()[0].replace(" ", "")

                match = re.search(
                        'liczba ...ek zaj.tych: ([ \\d]+)', text)
                if match:
                        curent_data['occupied_bed_count'] = match.groups()[0].replace(" ", "")

                match = re.search(
                        'liczba respirator.w dla pacjent.w z COVID-19: ([ \\d]+)', text)
                if match:
                        curent_data['respirator_count'] = match.groups()[0].replace(" ", "")

                match = re.search(
                        'liczba zaj.tych respirator.w: ([ \\d]+)', text)
                if match:
                        curent_data['occupied_respirator_count'] = match.groups()[0].replace(" ", "")

                match = re.search(
                        'liczba os.b, kt.re wyzdrowia.y: ([ \\d]+)', text)
                if match:
                        curent_data['healed_count'] = match.groups()[0].replace(" ", "")
        except:
                pass

        text = tweet.full_text

        match = re.search(
                'Z powodu COVID.19 zmar.o (\\d+) os.b, .+ innymi .+ (\\d+) os.b', text)
        if match:
                curent_data['dead_covid_today'] = match.groups()[0].replace(" ", "")
                curent_data['dead_intercurrent_today'] = match.groups()[1].replace(" ", "")

        match = re.search(
                'Mamy ([ \\d]+) now', text)
        if match:
                curent_data['new_cases_today'] = match.groups()[0].replace(" ", "")

        match = re.search(
                '.iczba zaka.onych koronawirusem.([ \\d]+).([ \\d]+).wszystkie', text)
        if match:
                curent_data['cases_global'] = match.groups()[
                        0].replace(" ", "")
                curent_data['dead_global'] = match.groups()[1].replace(" ", "")

        match = re.search(
                'ci.gu doby wykonano ponad (.+) test.w', text)
        if match:
                curent_data['tests_done_today'] = match.groups()[0]

        match = re.findall(
                '(\\S+ie)go .([ \\d]+).', text)
        if match:
                for m in match:
                        woj = m[0].replace("ą", "a").replace("ś", "s").replace("ń", "n").replace("ł",
                                                                                                 "l").replace(
                                "ó",
                                "o").replace(
                                "ę",
                                "e")
                        curent_data['per_voivodeship'][woj] = m[1].replace(" ", "")

def get_all_tweets(screen_name):
        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_key, access_secret)
        api = tweepy.API(auth)


        alltweets = api.user_timeline(screen_name = screen_name,count=50, include_ext_alt_text  = True, tweet_mode='extended')

        alltweets = alltweets[::-1]

        for tweet in alltweets:
                extract_info_from_tweet(tweet)



if __name__ == '__main__':
        get_all_tweets("MZ_GOV_PL")

        print(json.dumps(data, sort_keys=True, indent=4))