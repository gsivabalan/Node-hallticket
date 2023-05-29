# Node-hallticket
https://nodeja-hallticket.onrender.com

create a room:
POST : http://localhost:9000/rooms
 {"name": "Room 1", "seats": 10, "amenities": ["Projector", "Whiteboard"], "price": 50}
 
 book a room:
  GET :  http://localhost:9000/bookings
  {"customerName": "Sivabalan", "roomId": 1, "date": "2023-05-29", "startTime": "09:00", "endTime": "11:00"}

  // List all rooms with booked data:
  // http://localhost:9000/rooms/bookings

  // List all customers with booked data:
  // curl http://localhost:9000/customers/bookings

  // List booking history of a customer id:
  // http://localhost:9000/customers/<customerId>/bookings

