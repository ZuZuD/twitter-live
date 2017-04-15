#!/usr/bin/python

import html
import json
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

def main():
 '''
 Live twitter stream filtered from the list of a keyword
 List of keyword defined in config file
 '''
 req = requests.post(url=config.API_STREAMING, stream=True, headers={ 'content-type': 'application/json' }, params = config.params, auth=get_oauth())

 if req.status_code == requests.codes.ok:
   # Default chunk of 512B
   for mytwitt in req.iter_lines(decode_unicode=True):
     try :
       twitt = json.loads(html.unescape(mytwitt.decode('utf-8')))
       date = " ".join(twitt['created_at'].split()[1:4]+twitt['created_at'].split()[-1:]) 
       author = twitt['user']['name']
       content = twitt['text']

       print('From %s (%s) : %s' %(author,date,content))
     except json.decoder.JSONDecodeError:
       print('Decode ERORR')

 else:
   # handle non 200 OK response
   print(req.status_code)

if __name__ == '__main__':
  main()
