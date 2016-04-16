yesil-harita
===============

Open map of recycling points in Rails



[yesil-harita](https://yesilharita.herokuapp.com/) is a map of recycling points to which anyone can contribute.



Based on Google Maps, it provides a simple interface that allows users to look for and add recycling points to a map. This will hopefully encourage more people to recycle by making it less of a pain in the a*s to find a place to take your excess plastic or paper to :)

### Getting your hands dirty ###

The app requires Ruby 1.9.3 on Rails 3.1.0.  


* cd to a comfy location
* git clone git@github.com:sancopanco/yesil-harita.git
* cd yesil-harita/
* cp config/database.yml.example config/database.yml
* bundle install
* rake db:migrate
* rake db:fixtures:load
* rails server

