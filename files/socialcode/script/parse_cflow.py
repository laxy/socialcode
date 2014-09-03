#!/usr/bin/env python
import string
import re
import subprocess as sp
import pdb
import FindAllUniqFuncs as funq
import sys
import os

class Parser():
    #Init
    level_indicator='-'
    top_level={}
    stack=[]
    dict_stack=[]
    dash=0
    curr_level=top_level
    curr_label=''
    offset_dash=0
    pattern=level_indicator+'{'+str(dash + 1)+'}(.*):(.*)\n'
    uniqFuncs={}
    tree={}

    def __init__ (self):
        self.create_uniq_func_dict()
        #pdb.set_trace()

    def push_label_on_stack (self,label):
        if self.dash <= len(self.stack):
            self.stack[self.dash-1]=label
            self.dict_stack[self.dash-1]=self.curr_level
        else:
            self.stack.append(label)
            self.dict_stack.append(self.curr_level)

    def create_uniq_func_dict (self):
        func_list=funq.FindUniqueFuncs()
        for func in func_list:
            self.uniqFuncs[func]=[]

    def change_level (self,level='+',line=''):
        if level == '+':
            #expect the next level
            self.dash+=1
        else:
            #reset current dictionary
            self.curr_level=self.top_level
            #Get the current level
            self.dash=level
            #set current level to correct level based on
            #label stack
            #for i in range(0, self.dash-1):
            #    self.curr_level=self.curr_level[self.stack[i]]
            if self.dash-self.offset_dash > 1:
                self.curr_level=self.dict_stack[self.dash-self.offset_dash-2]
            else:
                self.curr_level=self.top_level
            #update pattern to account for new dash count
            self.pattern=self.level_indicator+'{'+str(self.dash)+'}(.*):(.*)\n'
            #search the current line to obtain the new function name
            # (or label)
            res=re.search(self.pattern,line)
            self.curr_label=res.group(1)
        self.curr_level[self.curr_label]={}
        self.curr_level=self.curr_level[self.curr_label]

    def get_current_level (self,line):
        pattern_d_cnt='(-{1,})'
        d_match=re.search(pattern_d_cnt,line)
        d_cnt=len(d_match.group(1))
        return (d_cnt)

    def record_func_sub_tree (self,label):
        if self.dash > 1 and self.dash <= len(self.stack)+1:
            lbl=self.stack[self.dash-2]
            self.uniqFuncs[lbl].append(label)

    def parse_cflow (self):
    	path = os.path.dirname(os.path.realpath(__file__))
        gp=open(path+'/e2cGraph', 'r')
        line=gp.readline()
        while line != '':
            #pdb.set_trace()
            #update pattern to account for new dash count
            self.pattern=self.level_indicator+\
                         '{'+str(self.dash + 1)+'}(.*):(.*)\n'
            res=re.search(self.pattern,line)
            if res != None:
                self.curr_label=res.group(1)
                self.change_level()
                #add a new label
            else:
                new_dash=self.get_current_level(line)
                #pdb.set_trace()
                self.change_level(new_dash,line) 
                #replace an existing label
            #pdb.set_trace()
            self.record_func_sub_tree(self.curr_label)
            self.push_label_on_stack(self.curr_label)
            #pdb.set_trace()
            line=gp.readline()

    def parse_cflow_func (self, for_func_name):
    	path = os.path.dirname(os.path.realpath(__file__))
        gp=open(path+'/e2cGraph', 'r')
        line=gp.readline()
        while line != '':
            pattern='(-{1,})(.*):.*\n'
            res=re.search(pattern,line)
            if res != None and res.group(2) == for_func_name:
                self.dash=self.get_current_level(line)-1
                break
            line=gp.readline()
        self.offset_dash=self.dash
        while line != '':
            #pdb.set_trace()
            #update pattern to account for new dash count
            self.pattern=self.level_indicator+\
                         '{'+str(self.dash + 1)+'}(.*):(.*)\n'
            res=re.search(self.pattern,line)
            if res != None:
                self.curr_label=res.group(1)
                self.change_level()
                #add a new label
            else:
                prev_dash=self.dash
                new_dash=self.get_current_level(line)
                #pdb.set_trace()
                if prev_dash != new_dash:
                    break
                self.change_level(new_dash,line) 
                #replace an existing label
            #pdb.set_trace()
            #self.record_func_sub_tree(self.curr_label)
            self.push_label_on_stack(self.curr_label)
            #pdb.set_trace()
            line=gp.readline()
    
    def create_call_tree_from_uniqFuncs (self,funcName):
        #pdb.set_trace()
        stk_lvl=[]
        stk_brd=[]
        might_rec=[]
        self.tree[funcName]={}
        func_tree=self.tree[funcName]
        for item in self.uniqFuncs[funcName]:
            stk_brd.append(item)
            func_tree[item]={}
        while len(stk_brd) > 0:
            top_l=len(stk_lvl)
            top_b=len(stk_brd)
            if top_l >= 1 and top_b >= 1:
                if stk_lvl[top_l-1] == stk_brd[top_b-1]:
                    stk_lvl.remove(stk_lvl[top_l-1])
                    stk_brd.remove(stk_brd[top_b-1])
                    continue
            top=len(stk_brd)-1
            top_e=stk_brd[top]
            stk_lvl.append(top_e)
#            top=len(stk_lvl)-1
#            top_e=stk_lvl[top]
            if len(self.uniqFuncs[top_e]) == 0 or len(stk_lvl) > 4:
                stk_brd.remove(top_e)
                stk_lvl.remove(top_e)
                continue
            func_tree=self.tree[funcName]
            for i in range(0, len(stk_lvl)):
                try:
                    func_tree=func_tree[stk_lvl[i]]
                except Exception, ex:
                    pdb.set_trace()
            for item in self.uniqFuncs[top_e]:
                try:
                    already_present=stk_lvl.index(item)
                except Exception, ex:
                    already_present=None
                if already_present == None:
                    stk_brd.append(item)
                    func_tree[item]={}

#def dump_call_tree_for_fn (self, fn_name):

pI=Parser()
#pdb.set_trace()
pI.parse_cflow()
#for item in pI.uniqFuncs.keys():
#    print str(item) + ' ' + str(pI.uniqFuncs[item])
#print pI.uniqFuncs
#pI.parse_cflow_func('qsortx')
#pdb.set_trace()
pI.create_call_tree_from_uniqFuncs(sys.argv[1])
#print pI.top_level
#pI.parse_cflow()
#print 'Creating specific tree for ' + sys.argv[1]
tree_str=str(pI.tree)
print re.sub('\'','\"',tree_str)
