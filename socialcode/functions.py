#!/usr/bin/env python
import sys
import re
import string
import pdb
import ast, json
import subprocess as sp
from pymongo import MongoClient

def functionSubmitDataToDB(db, functionname,filename,tag_id,data0,data1):
		collection = db.function_table
		if tag_id == "comments":
			maindata = db.function_table.find_one({'fname':functionname})
			if len(maindata["comments"])==0:
				collection.update({'fname':functionname},{"$set": {'comments': [data0,data1]}})
			else:
				collection.update({'fname':functionname}, {"$push": {'comments': {'$each': [data0,data1]}}})

			maindata1 = db.function_table.find_one({'fname':functionname})
			result =  maindata1["comments"]
			res_str = str(ast.literal_eval(json.dumps(result)))
			res_str2 = re.sub('\'','\"',res_str)
			return "{\"comments\": "+ res_str2+"}"


		elif tag_id == "signature":
			maindata = db.function_table.find_one({'fname':functionname})
			if len(maindata["signature"])==0:
				collection.update({'fname':functionname},{"$set": {'signature': [data0,data1]}})
			else:
				collection.update({'fname':functionname}, {"$push": {'signature': {'$each': [data0,data1]}}})
			
			maindata1 = db.function_table.find_one({'fname':functionname})
			result = maindata1["signature"]
			res_str = str(ast.literal_eval(json.dumps(result)))
			res_str2 = re.sub('\'','\"',res_str)
			return "{\"signature\": "+ res_str2+"}"


		elif tag_id == "desc":
			maindata = db.function_table.find_one({'fname':functionname})
			if len(maindata["desc"])==0:
				collection.update({'fname':functionname},{"$set": {'desc': [data0,data1]}})
			else:
				collection.update({'fname':functionname}, {"$push": {'desc': {'$each': [data0,data1]}}})
			
			maindata1 = db.function_table.find_one({'fname':functionname})
			result = maindata1["desc"]
			res_str = str(ast.literal_eval(json.dumps(result)))
			res_str2 = re.sub('\'','\"',res_str)
			return "{\"desc\": "+ res_str2+"}"


		elif tag_id == "bugfix":
			maindata = db.function_table.find_one({'fname':functionname})
			if len(maindata["bugfix"])==0:
				collection.update({'fname':functionname},{"$set": {'bugfix': [data0,data1]}})
			else:
				collection.update({'fname':functionname}, {"$push": {'bugfix': {'$each': [data0,data1]}}})
			
			maindata1 = db.function_table.find_one({'fname':functionname})
			result = maindata1["bugfix"]
			res_str = str(ast.literal_eval(json.dumps(result)))
			res_str2 = re.sub('\'','\"',res_str)
			return "{\"bugfix\": "+ res_str2+"}"

		elif tag_id == "author":
			maindata = db.function_table.find_one({'fname':functionname})
			if len(maindata["author"])==0:
				collection.update({'fname':functionname},{"$set": {'author': [data0,data1]}})
			else:
				collection.update({'fname':functionname}, {"$push": {'author': {'$each': [data0,data1]}}})
		
			maindata1 = db.function_table.find_one({'fname':functionname})
			result = maindata1["author"]
			res_str = str(ast.literal_eval(json.dumps(result)))
			res_str2 = re.sub('\'','\"',res_str)
			return "{\"author\": "+ res_str2+"}"

		elif tag_id == "edcs":
			maindata = db.function_table.find_one({'fname':functionname})
			if len(maindata["edcs"])==0:
				collection.update({'fname':functionname},{"$set":{'edcs': [data0,data1]}})
			else:
				collection.update({'fname':functionname}, {"$push": {'edcs': {'$each': [data0,data1]}}})
		
			maindata1 = db.function_table.find_one({'fname':functionname})
			result = maindata1["edcs"]
			res_str = str(ast.literal_eval(json.dumps(result)))
			res_str2 = re.sub('\'','\"',res_str)
			return "{\"edcs\": "+ res_str2+"}"

		elif tag_id == "filename":
			maindata = db.function_table.find_one({'fname':functionname})
			if len(maindata["filename"])==0:
				collection.update({'fname':functionname},{"$set": {'filename': [data0,data1]}})
			else:
				collection.update({'fname':functionname}, {"$push": {'filename': {'$each': [data0,data1]}}})
		
			maindata1 = db.function_table.find_one({'fname':functionname})
			result = maindata1["filename"]
			res_str = str(ast.literal_eval(json.dumps(result)))
			res_str2 = re.sub('\'','\"',res_str)
			return "{\"filename\": "+ res_str2+"}"

		elif tag_id == "linenumber":
			maindata = db.function_table.find_one({'fname':functionname})
			if len(maindata["linenumber"])==0:
				collection.update({'fname':functionname},{"$set": {'linenumber': [data0,data1]}})
			else:
				collection.update({'fname':functionname}, {"$push": {'linenumber': {'$each': [data0,data1]}}})
		
			maindata1 = db.function_table.find_one({'fname':functionname})
			result = maindata1["linenumber"]
			res_str = str(ast.literal_eval(json.dumps(result)))
			res_str2 = re.sub('\'','\"',res_str)
			return "{\"linenumber\": "+ res_str2+"}"

		else:
			return 


