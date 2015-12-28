rake db:migrate RAILS_ENV=production
rake assets:precompile

unicorn -E production -c config/unicorn.rb -D 
