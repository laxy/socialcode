#!/usr/bin/env python
import re
import string
import pdb
import subprocess as sp
import os

def FindUniqueFuncs ():
    ret=[]
    path = os.path.dirname(os.path.realpath(__file__))
    fh=open(path+'/e2cGraph', 'r')
    line=fh.readline()
    while line != '':
        pattern='(-{1,})(.*):(.*)\n'
        res=re.search(pattern,line)
        if res == None:
            print 'Error: Couldn\'t find function on \n' + line + '\n'
            return []
            try:
                res=res.group(2)
            except Exception, ex:
                print 'Error: Coudn\'t match desired patter on' + line + '\n'
                return
        try:
            ret.index(res.group(2))
        except Exception, ex:
            ret.append(res.group(2))
        line=fh.readline()
    fh.close()
    fh=open('functions.txt', 'w+')
    fh.write('[')
    fh.write('\n')
    for item in ret:
        fh.write('\"')
        fh.write(item)
        fh.write('\",')
        fh.write('\n')
    fh.write(']')
    fh.close()
    return (ret)

#print 'This prog expects the call graph info in a file named e2cGraph\n'
#print 'This prog expects the call graph info in a file named e2cGraph\n'+\
#       'Use: cflow --format=posix --level-indent=\'0=-\' --level-indent=\'1=-\''+\
#             ' --level-indent=start=\'-\' cfiles > e2cGraph\nThe output will be'+\
#       ' written to functions.txt'

#print FindUniqueFuncs()
