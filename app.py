#----------------------------------------
# imports
#----------------------------------------
import os
from flask import Flask, redirect, render_template,request
from lib.helper import mail, minify

#----------------------------------------
# initialization
#----------------------------------------

app = Flask(__name__)

#----------------------------------------
# routes
#----------------------------------------

@app.route('/')
def index():
  return minify(render_template('layouts/default.pyhtml'))

@app.errorhandler(404)
def error_404(e):
  return error(404)

@app.errorhandler(Exception)
def error_500(e=None):
  return error(500)

@app.route('/nginxerror.html')
def nginx_error():
  code = int(request.args.get('c'))
  return error(code)

def error(code):
  return redirect('/')

#----------------------------------------
# launch
#----------------------------------------

if __name__ == '__main__':
  app.config.update(DEBUG = True)
  port = int(os.environ.get('PORT', 5000))
  app.run(host='0.0.0.0', port=port)
