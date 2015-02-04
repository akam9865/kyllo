# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


guest = User.create({email: "example@gmail.com", firstname: "guest", lastname: "user", password: "password", initials: "GU"})

board = guest.boards.create({title: "Welcome Board"})

list1 = board.lists.create({title: "Basics"})
list2 = board.lists.create({title: "Intermediate"})
list3 = board.lists.create({title: "Coming Soon!"})

card1 = list1.cards.create({title: "Welcome to Kyllo!"})
card2 = list1.cards.create({title: "This is a card"})
card3 = list1.cards.create({title: "Click on a card to see what's behind it"})

card4 = list2.cards.create({title: "Edit descriptions", description: "Enter and save a description below to change me."})
card5 = list2.cards.create({title: "Make as many lists as you need", description: "Click \"Add List\" to access the new list form"})

card6 = list3.cards.create({title: "Checklists", description: "Add items to your lists, and check them off as you work through your project"})
card6 = list3.cards.create({title: "Use as many boards as you want", description: "Click the logo at the top center of the page to return to your boards page. Click \"Add Board\" to create more boards!"})
