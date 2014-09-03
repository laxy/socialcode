Social Code
==========
SocialCode is an integrated toolbase which brings social aspects to coding, development and testing software. Thank you for checking it out. 

###What is Social Code?       
http://bit.ly/1nwAagD

###Whats changed?
Social Code is now implemented as a Django application, with a remote mongo database. Earlier, it was a Apache/PHP application. 

###Social Code Live demo:
http://lakshmanswaroop.com/socialcode/

###Applications, Tools and Libraries:
  - #####jQuery Apps  
      - SyntaxHighlighter               http://alexgorbatchev.com/SyntaxHighlighter/
      - McTabs                          http://www.menucool.com/jquery-tabs
      - Typeahead                       https://twitter.github.io/typeahead.js/
      - CollapsibleLists                http://code.stephenmorley.org/javascript/collapsible-lists/
      - localStorage & sessionStorage   http://www.w3schools.com/html/html5_webstorage.asp

  - #####MongoDB Support
      - Mongolab  https://mongolab.com
      - Pymongo   http://api.mongodb.org/python/current/

  - #####GNU cflow http://www.gnu.org/software/cflow/


###Model and Architecture:

  * Select the code repository. 
  * Run GNU cflow on the code repo, which generates a call flow for the repository.
  * Run scripts on the call flow output file:
      - files/socialcode/script/**FindAllUniqFuncs.py** : Generates a list of unique functions in the repo and stores it in functions.txt.
      - files/socialcode/script/**GetSigFileLine.py** : Generates a collection of functions and associated data which will the stored in the repository. 
      - file/socialcode/script/**populateDB.py**  : Populates (initializes) mongoDB and adds all the functions to the database. Note that mongodb connection information will need to be filled into the files.
    
  * Move folders to appropriate positions:
      **<files>** - contains css, js, imgs and scripts - needs to be located on the public directory of the server from where files are served. 
      **<socialcode>** - Django App (added as an app to an existing Django deployment)
      **<git-master>** - Code repository also placed on the public directory of the server
    
  * Ajax requests along with CSRF cookie headers are sent back to the server to retrieve, update and store information on the db and server dynamically.
  
