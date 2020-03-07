# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
homepages = ["entertainment", "work", "social"].map{ |name| Homepage.create(name: name) }

p = homepages[0].page_modules.build(name: 'streaming')
p.content = BookmarkContainer.new
p.content.bookmarks.build(name: 'reddit', url: 'https://reddit.com')
p = homepages[0].page_modules.build(name: 'blogs')
p.content = BookmarkContainer.new
homepages[0].save
#homepages[1].page_module.build(name: 'docs').save;
#homepages[1].page_module.build(name: 'wikis').save;

#homepages[2].page_module.build(name: 'forums').save;
#homepages[2].page_module.build(name: 'email').save;
