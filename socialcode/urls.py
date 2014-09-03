from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
	url(r'^$', 'socialcode.views.home'),
	url(r'^main/$', 'socialcode.views.main'),
	#url(r'^(.*/)?autocomplete/$','socialcode.views.autocomplete'),
	url(r'^autocomplete/$','socialcode.views.autocomplete'),
	url(r'^main/autocomplete/$','socialcode.views.autocomplete'),
	url(r'^search/$','socialcode.views.search_response'),
	url(r'^get_func_data/$','socialcode.views.function_from_db'),
	url(r'^upload_func_data/$','socialcode.views.function_to_db'),
	url(r'^load_file/$','socialcode.views.load_file'),
	url(r'^request/$','socialcode.views.new_response'),
)
