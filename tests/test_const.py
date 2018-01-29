#!/usr/bin/env python3
# -*- coding: utf-8 -

import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(__file__)))
import webserver as web

def test_web_constants():
  assert (isinstance(web.params,dict))
  assert (isinstance(web.stop,bool))
  assert (isinstance(web.opts,dict))

def test_web_dir():
  appdir = os.path.dirname(web.app.instance_path)
  assert (os.path.exists(appdir+'/'+web.app.config['PICTURES']))
  assert (os.path.exists(appdir+'/'+web.app.config['SCRIPT']))
  assert (os.path.exists(appdir+'/'+web.app.config['CSS']))
  assert (os.path.exists(appdir+'/'+web.app.template_folder))

