#!/usr/bin/python

import json
import time
import requests
from requests_oauthlib import OAuth1
import config

def get_oauth():
 '''
 Generates an OAuth object
 Returns:
 	OAuth1: Instance of OAuth1 with app keys in configruation
 '''
 
 oauth = OAuth1(config.CONSUMER_KEY,
 	client_secret=config.CONSUMER_SECRET,
 	resource_owner_key=config.ACCESS_TOKEN,
 	resource_owner_secret=config.ACCESS_TOKEN_SECRET) 
 return oauth

def main(from_time, to_time, next_cursor=None):
  
 params = {
	'from_time': from_time,
	'to_time': to_time,
	'count': config.EVENTS_PAGE_COUNT,
	'cursor': next_cursor
	}

 req = requests.get(url=config.API_URL, params=params, headers={ 'content-type': 'application/json' }, auth=get_oauth())
 print(req)
 if req.status_code == requests.codes.ok:
   response_body = json.loads(req.text)
   for twitt in response_body:
         date = " ".join(twitt['created_at'].split()[1:4]+twitt['created_at'].split()[-1:]) 
         author = twitt['user']['name']
         content = twitt['text']
         print('From %s (%s) : %s' %(author,date,content))
 else:
   # handle non 200 OK response
   print(req.status_code)

if __name__ == '__main__':
  main(from_time=config.START_TIME, to_time=config.END_TIME)
