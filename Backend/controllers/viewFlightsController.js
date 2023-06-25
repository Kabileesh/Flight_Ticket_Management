const Trip = require("../model/tripModel");

const viewFlights = async (req, res) => {
  try {
    const { inputDate, selectedTime, source, destination } = req.query;
    const formattedDate = new Date(inputDate).getTime();
    const selectedDate = new Date(formattedDate).toISOString();
    const [selectedHour, selectedMinutes] = selectedTime.split(":");
    const flights = await Trip.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              {
                $lte: [{ $hour: "$depatureTime" }, selectedHour],
              },
              {
                $or: [
                  {
                    $eq: [{ $minute: "$depatureTime" }, 0],
                  },
                  {
                    $and: [
                      {
                        $gte: [{ $minute: "$depatureTime" }, 0],
                      },
                      {
                        $lte: [{ $minute: "$depatureTime" }, selectedMinutes],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          source: source,
          destination: destination,
          availableDays: { $in: [new Date(selectedDate).getDay()] },
        },
      },
      { $project: { _id: 0, __v: 0, availableDays: 0 } },
    ]);
    res.send(flights);
  } catch (err) {
    console.log(err);
  }
};

module.exports = viewFlights;
