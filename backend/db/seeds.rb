# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
homepages = ["entertainment", "work", "social"].map{ |name| Homepage.create(name: name) }

homepages[0].bookmark_modules.build(name: 'streaming').save;
homepages[0].bookmark_modules.build(name: 'blogs').save;

homepages[1].bookmark_modules.build(name: 'docs').save;
homepages[1].bookmark_modules.build(name: 'wikis').save;

homepages[2].bookmark_modules.build(name: 'forums').save;
homepages[2].bookmark_modules.build(name: 'email').save;
