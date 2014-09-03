#!/usr/bin/env python
import re
import sys
sys.path.append('/usr/lib64/python2.6/site-packages')
import string
import subprocess as sp
import pdb
from pymongo import MongoClient
client = MongoClient('*****.com',*****)
db = client['*****']
db.authenticate('*****','*****')
collection = db.function_table

def populateDBwithFunc():    
    f= open('sigFileLine.txt','r')
  
    for item in f:   

        result = item.rstrip()     
        result1= result.split('$:$')
        print result1
        print '============='   
        function_details = [{"fname":result1[0],"signature":result1[3],"desc":"","bugfix":"","author":"","comments":"","edcs":"","filename":result1[1],"linenumber":result1[2]}]
        
        update_ind = {'fname' : str(result1[0])}
        update_str = {'$set' : function_details}
        #print function_details
        try:
            collection.update(update_ind, update_str)
        except Exception, ex:
            collection.insert(function_details)           
    f.close()
populateDBwithFunc()
