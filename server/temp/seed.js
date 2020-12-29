print('START++++++==============================')

db.createCollection('users')

db.users.insertOne({
  "username": "admin",
  "password": "$2y$10$PW4LHqyYIk3MgG6DS8Ww6.ai4nLCNJziWN2.ROB/RpbXh4Vtq08Ey",
})

db.courses.insert([
  {
    name: 'Finance',
    totalSeats: 100,
    status: 'active',
  },
  {
    name: 'Accounting',
    totalSeats: 150,
    status: 'active',
  },
  {
    name: 'Cost Accounting',
    totalSeats: 100,
    status: 'active',
  },
])