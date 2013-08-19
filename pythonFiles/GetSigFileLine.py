#!/usr/bin/env python
import re
import string
import pdb
import subprocess as sp

def FindUniqueFuncs ():
    ret=[]
    sig=[]
    l=[]
    fl=[]
    fh=open('e2cGraph', 'r')
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
            rest=res.group(3)
            rest=rest.split('<')
            if rest[0] == '<>':
                sig[len(ret)-1]='NA'
                line[len(ret)-1]='NA'
                fl[len(ret)-1]='NA'
            else:
                sig.append(rest[0].strip(','))
                laf=rest[1].split(' ')
                if len(laf) > 1:
                    l.append(laf[1].strip('>'))
                    fl.append(laf[0].strip())
                else:
                    l.append('NA')
                    fl.append('NA')
        line=fh.readline()
    fh.close()
    fh=open('sigFileLine.txt', 'w+')
    fh.write('[')
    fh.write('\n')
    for i in range(0, len(ret)):
        fh.write('\"')
        fh.write(ret[i])
        fh.write(',')
        fh.write(fl[i])
        fh.write(',')
        fh.write(l[i])
        fh.write(',')
        sig[i]=sig[i].strip()
        if sig[i] != '':
            fh.write(sig[i].strip(','))
        else:
            fh.write('NA')
        fh.write('\",')
        fh.write('\n')
    fh.write(']')
    fh.close()
    print l
    print fl
    return (ret)

print 'This prog expects the call graph info in a file named e2cGraph\n'+\
       'Use: cflow --format=posix --level-indent=\'0=-\' --level-indent=\'1=-\''+\
             ' --level-indent=start=\'-\' cfiles > e2cGraph\nThe output will be'+\
       ' written to functions.txt'

print FindUniqueFuncs()
