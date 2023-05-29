const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
app.use(bodyParser.json());

let rooms = [];
let bookings = [];
let customers = [
  {
    id: '1',
    name: 'sivabalan',
    bookings: []
  },
  {
    id: '2',
    name: 'vinotha',
    bookings: []
  },
  {
    id: '3',
    name: 'gopal',
    bookings: []
  },
  {
    id: '4',
    name: 'sanjai',
    bookings: []
  },
  {
    id: '5',
    name: 'vasumitha',
    bookings: []
  },
  {
    id: '6',
    name: 'deva',
    bookings: []
  },
  {
    id: '7',
    name: 'soumiya',
    bookings: []
  }
];

// Create a room
app.post('/rooms', (req, res) => {
  const { name, seats, amenities, price } = req.body;
  const room = {
    id: rooms.length + 1,
    name,
    seats,
    amenities,
    price
  };
  rooms.push(room);
  res.status(201).json(room);
});

// Book a room
app.post('/bookings', (req, res) => {
  const { customerName, roomId, date, startTime, endTime } = req.body;

  // Check if the room is available
  const isRoomAvailable = bookings.some(booking =>
    booking.roomId === roomId &&
    booking.date === date &&
    (
      (booking.startTime <= startTime && booking.endTime >= startTime) ||
      (booking.startTime <= endTime && booking.endTime >= endTime)
    )
  );

  if (isRoomAvailable) {
    res.status(409).json({ error: 'The room is already booked at the given date and time.' });
  } else {
    const booking = {
      id: bookings.length + 1,
      customerId: customers.find(customer => customer.name === customerName).id,
      roomId,
      date,
      startTime,
      endTime,
      bookingDate: new Date(),
      status: 'booked'
    };
    bookings.push(booking);

    const customer = customers.find(customer => customer.name === customerName);
    if (customer) {
      customer.bookings.push(booking);
    }

    res.status(201).json(booking);
  }
});

// List all rooms with booked data
app.get('/rooms/bookings', (req, res) => {
  const roomBookings = rooms.map(room => {
    const bookedData = bookings.filter(booking => booking.roomId === room.id);
    return {
      roomName: room.name,
      bookedStatus: bookedData.length > 0 ? 'booked' : 'available',
      bookings: bookedData
    };
  });
  res.json(roomBookings);
});

// List all customers with booked data
app.get('/customers/bookings', (req, res) => {
  const customerBookings = customers.map(customer => {
    const customerData = {
      customerName: customer.name,
      bookings: customer.bookings.map(booking => {
        const room = rooms.find(room => room.id === booking.roomId);
        return {
          roomName: room.name,
          customerName: customer.name,
          date: booking.date,
          startTime: booking.startTime,
          endTime: booking.endTime,
          bookingId: booking.id,
          bookingDate: booking.bookingDate,
          bookingStatus: booking.status
        };
    })
  };
  return customerData;
  });
  res.json(customerBookings);
  });
  
  // List booking history of a customer
  app.get('/customers/:customerId/bookings', (req, res) => {
  const customerId = req.params.customerId;
  const customer = customers.find(customer => customer.id === customerId);
  
  if (!customer) {
  res.status(404).json({ error: 'Customer not found' });
  } else {
  const customerBookings = customer.bookings.map(booking => {
  const room = rooms.find(room => room.id === booking.roomId);
  return {
  roomName: room.name,
  customerName: customer.name,
  date: booking.date,
  startTime: booking.startTime,
  endTime: booking.endTime,
  bookingId: booking.id,
  bookingDate: booking.bookingDate,
  bookingStatus: booking.status
  };
  });
  res.json(customerBookings);
  }
  });
  
  
  app.listen(process.env.PORT || 9000, () => console.log("Server started on localhost:9000"));
  

  // List all rooms with booked data:
  // http://localhost:9000/rooms/bookings

  // List all customers with booked data:
  // curl http://localhost:9000/customers/bookings

  // List booking history of a customer id:
  // http://localhost:9000/customers/<customerId>/bookings