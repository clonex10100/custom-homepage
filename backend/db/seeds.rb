# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
homepages = ["entertainment", "work", "social"].map{ |name| Homepage.create(name: name) }

homepages[0].bookmark_modules.build(name: 'streaming');
homepages[0].bookmark_modules.build(name: 'blogs');

homepages[1].bookmark_modules.build(name: 'docs');
homepages[1].bookmark_modules.build(name: 'wikis');

homepages[2].bookmark_modules.build(name: 'forums');
homepages[2].bookmark_modules.build(name: 'email');
