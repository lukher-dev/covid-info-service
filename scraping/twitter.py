#!/usr/bin/env python
# encoding: utf-8

import tweepy
import json
import re

consumer_key = ""
consumer_secret = ""
access_key = ""
access_secret = ""

dead_covid_today = None
dead_intercurrent_today = None
new_cases_today = None
cases_global = None
dead_global = None
tests_done_today = None
bed_count = None
occupied_bed_count = None
respirator_count = None
occupied_respirator_count = None
healed_count = None
per_voivodeship = {}

def extract_info_from_tweet(tweet):
        global dead_covid_today, dead_intercurrent_today, new_cases_today, cases_global, dead_global, tests_done_today, per_voivodeship
        global bed_count,occupied_bed_count, respirator_count, occupied_respirator_count, healed_count
        try:
                text = tweet.extended_entities['media'][0]['ext_alt_text']

                match = re.search(
                        'liczba ł..ek dla pacjent.w z COVID-19: ([ \\d]+)', text)
                if match and not bed_count:
                        bed_count = match.groups()[0].replace(" ", "")

                match = re.search(
                        'liczba ...ek zaj.tych: ([ \\d]+)', text)
                if match and not occupied_bed_count:
                        occupied_bed_count = match.groups()[0].replace(" ", "")

                match = re.search(
                        'liczba respirator.w dla pacjent.w z COVID-19: ([ \\d]+)', text)
                if match and not respirator_count:
                        respirator_count = match.groups()[0].replace(" ", "")

                match = re.search(
                        'liczba zaj.tych respirator.w: ([ \\d]+)', text)
                if match and not occupied_respirator_count:
                        occupied_respirator_count = match.groups()[0].replace(" ", "")

                match = re.search(
                        'liczba os.b, kt.re wyzdrowia.y: ([ \\d]+)', text)
                if match and not healed_count:
                        healed_count = match.groups()[0].replace(" ", "")
        except:
                pass

        text = tweet.text

        match = re.search(
                'Z powodu COVID.19 zmar.o (\\d+) os.b, .+ innymi .+ (\\d+) os.b', text)
        if match:
                dead_covid_today = match.groups()[0].replace(" ", "")
                dead_intercurrent_today = match.groups()[1].replace(" ", "")

        match = re.search(
                'Mamy ([ \\d]+) now', text)
        if match:
                new_cases_today = match.groups()[0].replace(" ", "")

        match = re.search(
                '.iczba zaka.onych koronawirusem.([ \\d]+).([ \\d]+).wszystkie', text)
        if match:
                cases_global = match.groups()[
                        0].replace(" ", "")
                dead_global = match.groups()[1].replace(" ", "")

        match = re.search(
                'ci.gu doby wykonano ponad (.+) test.w', text)
        if match:
                tests_done_today = match.groups()[0]

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
                        per_voivodeship[woj] = m[1].replace(" ", "")

def get_all_tweets(screen_name):
        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_key, access_secret)
        api = tweepy.API(auth)


        alltweets = api.user_timeline(screen_name = screen_name,count=30, include_ext_alt_text  = True)

        alltweets = alltweets[::-1]

        for tweet in alltweets:
                extract_info_from_tweet(tweet)



if __name__ == '__main__':
        get_all_tweets("MZ_GOV_PL")

        print(json.dumps({
                'dead_covid_today': dead_covid_today,
                'dead_intercurrent_today': dead_intercurrent_today,
                'new_cases_today': new_cases_today,
                'cases_global': cases_global,
                'dead_global': dead_global,
                'tests_done_today': tests_done_today,
                'per_voivodeship': per_voivodeship,
                'bed_count': bed_count,
                'occupied_bed_count': occupied_bed_count,
                'respirator_count': respirator_count,
                'occupied_respirator_count': occupied_respirator_count,
                'healed_count': healed_count
        }, sort_keys=True, indent=4))