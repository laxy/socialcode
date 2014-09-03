import os
import sys
import string
import re 
import ast, json
import pymongo
import logging
import subprocess as sp
from symbol import or_test
from subprocess import Popen, PIPE
from pymongo import MongoClient
from socialcode.functions import functionSubmitDataToDB
from django.template import RequestContext, loader
from django.shortcuts import render, render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from django.core.context_processors import csrf
logger = logging.getLogger(__name__)
 
# Create your views here.
def home(request):
	logger.debug("/socialcode/home")
	if request.method == 'GET':
		return render_to_response('sc_home.html')
	elif request.method == 'POST':
		return render_to_response('sc_main.html')

def main(request):
	return render_to_response('sc_main.html')

def autocomplete(request):	
	logger.info("/socialcode/autocomplete")
	with open(os.getcwd()+'/files/socialcode/data/autocomplete.txt', 'r') as f:
		response = f.read()
	return HttpResponse(response)

def new_response(request):
	return HttpResponse("<html><body>New Response</body></html>")

def search_response(request):
	logger.info("/socialcode/search")
	output = sp.Popen('~/public_html/files/socialcode/script/parse_cflow.py '+request.POST.get('function_name'), shell=True, stdout=PIPE)
	out, err = output.communicate()	
	return HttpResponse(out)

def function_from_db(request):	
	client = MongoClient('*****.com',*****)
	db = client['*****']
	db.authenticate('*****','*****')
	collection = db.function_table	
	result = collection.find_one({"fname":request.POST.get('function_name')},{"_id":0})
	res_str = str(ast.literal_eval(json.dumps(result)))
	res_str2 = re.sub('\'','\"',res_str)
	return HttpResponse(str(res_str2))

def function_to_db(request):
	client = MongoClient('*****.com',*****)
	db = client['*****']
	db.authenticate('*****','*****')
	collection = db.function_table
	fname = request.POST.get('fname')
	filename = request.POST.get('filename')
	tag_type = request.POST.get('tag')
	data0 = request.POST.get('data0')
	data1 = request.POST.get('data1')	
	out = functionSubmitDataToDB(db, fname, filename, tag_type, data0, data1)	
	return HttpResponse(out)

def load_file(request):
	with open(os.getcwd()+str(request.POST.get('filesubpath')), 'r') as f:
		response = f.read()
	return HttpResponse(response)
	

