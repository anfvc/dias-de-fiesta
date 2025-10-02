import Event from "../Models/Event.js";

export const createEvent = (req, res) => {
  const {
    eventTitle,
    eventSubtitle,
    eventDescription,
    image,
    price,
    category,
  } = req.body;

  try {
    const newEvent = new Event({
      eventTitle,
      eventDescription,
      eventSubtitle,
      category,
      image,
      price,
    });

    newEvent.save();

    res
      .status(201)
      .json({ message: `${eventTitle} has been created successfully.` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again." });
  }
};

export const fetchAllEvents = async (req, res) => {
  try {
    const allEvents = await Event.find({});
    res.status(200).json(allEvents);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error, we couldn't fetch events." });
  }
};
