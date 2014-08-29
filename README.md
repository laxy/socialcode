socialcode
==========

This brief video explains what this project is about:
https://www.youtube.com/watch?v=ZO5CsPyUXrc&list=UU3IQdJMxlFtU3dodz8LaX6A

Steps:
  
  1. Use cflow to get function call graph as text output from the repository. 
  2. Use backend python functions to parse the function flow and store in as a dictionary. 
  3. Store this data into mongodb using python scripts.
  4. Using php and python scripts, we access the mongodb database for every http request to access the functions.
  5. Install the front-end code in the html/web interface directory.

