from flask import Flask, Response, stream_with_context, render_template, current_app, url_for
import time
import flask
import twitter_live
import html
import json
import requests
from requests_oauthlib import OAuth1
import config

app = Flask(__name__)
app.config['SERVER_NAME'] = '127.0.0.1:5000'
app.config['DEBUG'] = True


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


def stream_template(template_name, **context):
    app.update_template_context(context)
    t = app.jinja_env.get_template(template_name)
    rv = t.stream(context)
    rv.enable_buffering(5)
    return rv


@app.route('/myscript.js')
def script():
    return flask.send_file('myscript.js')


@app.route('/')
def index():
    return flask.send_file('page.html')


@app.route('/stream')
def stream():
    if flask.request.headers.get('accept') == 'text/event-stream':
        def streamer():
            '''
            Live twitter stream filtered from the list of a keyword
            List of keyword defined in config file
            '''

            req = requests.post(url=config.API_STREAMING, stream=True, headers={
                                'content-type': 'application/json'}, params=config.params, auth=get_oauth())

            if req.status_code == requests.codes.ok:
                # Default chunk of 512b
                for mytwitt in req.iter_lines(decode_unicode=True):
                    try:
                        twitt = json.loads(mytwitt.decode('utf-8'))
                        date = " ".join(twitt['created_at'].split()[
                                        1:4] + twitt['created_at'].split()[-1:])
                        author = twitt['user']['name']
                        content = twitt['text']

                        yield('data: From %s (%s) : %s\n\n' % (author, date, content))
                    except json.decoder.JSONDecodeError:
                        yield('data: Decode ERORR\n\n')
            else:
                # handle non 200 OK response
                yield('data: ' + req.status_code + '\n\n')
        return flask.Response(streamer(), mimetype='text/event-stream')

if __name__ == "__main__":
    app.run()

