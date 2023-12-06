const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const axios = require("axios");
const sendEmail = require("../util/sendEmail");

const addTicket = asyncHandler(async (req, res) => {
  const id = req.person._id;
  const name = req.person.fullName;
  const email = req.person.email;

  const { station, total, seatCount, roadRouteId } = req.body;

  //get the last ticketId
  const lastTicket = await Ticket.find().sort({ ticketId: -1 }).limit(1);

  let ticketId = "";

  if (lastTicket.length === 0) {
    ticketId = "TK#kts1";
  } else {
    const lastTicketId = lastTicket[0].ticketId;
    const lastTicketIdNumber = parseInt(lastTicketId.split("TK#kts")[1]);
    ticketId = `TK#kts${lastTicketIdNumber + 1}`;
  }

  const config = {
    headers: { Authorization: "Bearer 46acc2d0-78f2-11ee-bc93-85031cf98e54" },
  };

  const bodyParameters = {
    colorDark: "#000",
    qrCategory: "url",
    text: `
    ticketId -: ${ticketId}
    station -: ${station}
    total -: ${total}
    seatCount -: ${seatCount}
    roadRouteId -: ${roadRouteId}
    `,
  };

  let qrCode = "";
  try {
    const qrRes = await axios.post(
      "https://qrtiger.com/api/qr/static",
      bodyParameters,
      config
    );
    qrCode = qrRes.data.url;
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }

  const ticket = new Ticket({
    ticketId,
    userId: id,
    date: Date.now(),
    station,
    total,
    seatCount,
    roadRouteId,
    qrCode,
  });

  try {
    const createdTicket = await ticket.save();

    //
    const message = `
    <h2>Hello ${name}</h2>
    <p>You have purchase a QR code from KTS</p>
    <p>Ticket is only valid for 2 days</p>
     <img src=${qrCode} width="300" height="300"/>
     <p>Regards KTS</p>
    
    `;

    const subject = "Ticket Purchase";
    const sent_to = email;
    const sent_from = process.env.EMAIL_USER;

    try {
      await sendEmail(subject, message, sent_to, sent_from);
    } catch (err) {
      res.status(500);
      throw new Error("Email didn't not sent,Please try again");
    }

    ///
    res.status(201).json(createdTicket);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const getAllTickets = asyncHandler(async (req, res) => {
  try {
    const tickets = await Ticket.find({});
    res.json(tickets);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

module.exports = { addTicket, getAllTickets };
