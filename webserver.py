#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask, Response 
import re
import flask
import json
import simplejson
import requests
from requests_oauthlib import OAuth1
import config
import logger
import logging

LOG = logging.getLogger(__name__)
app = Flask(__name__)
params = config.params
stop = False
opts = { 
         "boldify_keyword": True,
         "show_author": True,
         "show_date": True
       }
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

app.config['PICTURES'] = 'pictures'
app.config['SCRIPT'] = 'script'
app.config['CSS'] = 'css'

@app.route('/pictures/<path:filename>')
def pictures(filename):
    return flask.send_from_directory(app.config['PICTURES'],filename)

@app.route('/script/<path:filename>')
def script(filename):
    return flask.send_from_directory(app.config['SCRIPT'],filename)

@app.route('/css/<path:filename>')
def style(filename):
    return flask.send_from_directory(app.config['CSS'],filename)

@app.route('/tick_opts',methods=['GET'])
def tick_opts():
    if flask.request.method == 'GET':
      LOG.warn(opts)
      return json.dumps(opts)

@app.route('/settings.html',methods=['POST','GET'])
def settings():
    if flask.request.method == 'GET':
      return flask.render_template('settings.html')
    if flask.request.method == 'POST':
      form = flask.request.form
      LOG.warn(json.loads(form['tick_opts']))
      post_opts = json.loads(form['tick_opts'])
      for i in post_opts:
        opts[i] = post_opts[i]
      for i in opts:
        LOG.warn(i,opts[i])
      return ('Ok redirecting...')
      

@app.route('/', methods=['POST','GET'])
def index():
    if flask.request.method == 'POST':
        form = flask.request.form
        LOG.warn(type(form),form)
        if form['track']:
            params['track'] = form['track']
    return flask.render_template('index.html')


@app.route('/stream', methods=['GET','POST'])
def stream():
    if flask.request.headers.get('accept') == 'text/event-stream':
        return flask.Response(streamer(), mimetype='text/event-stream')

def streamer():
    '''
    Live tweeter stream filtered from the list of a keyword
    List of keyword defined in config file
    '''
    
    req = requests.post(url=config.API_STREAMING, stream=True, headers={
                        'content-type': 'application/json'}, params=params, auth=get_oauth())
    if req.status_code == requests.codes.ok:
        # Default chunk of 512b
        p = compile_params(params)
        count = 0
        while not stop:
            #for mytweet in req.iter_lines(decode_unicode=True):
            for mytweet in req.iter_lines():
                try:
                    #tweet = json.loads(mytweet.decode('utf-8'))
                    tweet = json.loads(mytweet.decode('utf-8'))
                except json.decoder.JSONDecodeError as e:
                    LOG.warn('%s Decode ERORR %s\n' %(mytweet,e))
                    LOG.debug('%s\n' %(mytweet))
                else:
                    msg = ''
                    LOG.debug('%s\n' %(tweet))
                    # dont bother for lost tweet msg
                    if 'limit' not in tweet:

                      if opts['show_date']: 
                          if msg != '': msg += ' '
                          msg += '<span class="date"><strong>(</strong>'+" ".join(tweet['created_at'].split()[
                                      1:4] + tweet['created_at'].split()[-1:])+'<strong>)</strong></span>'
                      if opts['show_author']:
                          if msg != '': msg += ' '
                          msg += '<span class="author">'+tweet['user']['name']+'</span>'

                      if msg != '': msg += ' : '
                      content = '<span class="content">'+tweet['text']+'</span>'

                      if opts['boldify_keyword']:
                          content = boldify(p, content)

                      msg += content
                      count += 1
                      yield('data: %s\n\n' %(msg))
    else:
        # handle non 200 OK response
        LOG.warn('HTTP %i\n' % req.status_code)


def compile_params(params):
    p = {}
    for elt in params['track'].split(','):
        p[elt] = re.compile(elt, re.I)
    return p

def boldify(p,content):

    for elt in p:    
        x = ''
        x = p[elt].findall(content)
        if x:
            for occ in x:
                content = content.replace(occ,"<strong>"+ occ +"</strong>")
    return content

if __name__ == "__main__":
    app.run(debug = False, host='0.0.0.0')

