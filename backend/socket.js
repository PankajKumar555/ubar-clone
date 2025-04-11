const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/caption.model");

let io;

function initializeSocket(server) {
  if (io) {
    console.log("⚠️ Socket.io is already initialized! Skipping...");
    return io;
  }
  io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000", // Adjust this based on your frontend URL
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected backend: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log("------>>>>>>datauser", userId, userType);
      try {
        if (userType === "user") {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if (userType === "captain") {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        }
        // Send confirmation back to client
        socket.emit("joined", {
          message: "Successfully joined",
          userId,
          userType,
          socketId: socket.id,
        });
        console.log(
          `✅ ${userType} ${userId} is connected with Socket ID: ${socket.id}`
        );
      } catch (error) {
        console.error("Error updating user:", error);
        socket.emit("error", { message: "Failed to join socket." });
      }
    });

    socket.on("request-ride", async (data) => {
      const { userId, pickupLocation, destination } = data;
      console.log(
        "🚕 Ride request from User",
        userId,
        pickupLocation,
        destination
      );

      try {
        const availableCaptains = await captainModel.find({
          socketId: { $exists: true, $ne: null },
        });

        if (availableCaptains.length === 0) {
          console.log("🚫 No available captains.");
          socket.emit("no-captains", {
            message: "No available captains at the moment.",
          });
          return;
        }

        availableCaptains.forEach((captain) => {
          io.to(captain.socketId).emit("ride-request", {
            userId,
            pickupLocation,
            destination,
          });
        });

        console.log(
          `📡 Ride request sent to ${availableCaptains?.length} captains.`
        );
      } catch (error) {
        console.error("❌ Error processing ride request:", error);
        socket.emit("error", { message: "Error processing ride request." });
      }

      // console.log(
      //   `📡 Sent ride request to ${availableCaptains.length} captains`
      // );
    });

    // Handle captain location update
    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      console.log("🚕 Location update from Captain--------", userId, location);

      if (!location || !location.ltd || !location.lng) {
        // Fix key `ltd` to `lat`
        console.log("❌ Invalid location data received");
        return socket.emit("error", { message: "Invalid location data" });
      }

      try {
        const updatedCaptain = await captainModel.findByIdAndUpdate(
          userId,
          {
            location: {
              ltd: location.ltd,
              lng: location.lng,
            },
          },
          { new: true }
        );

        if (updatedCaptain) {
          console.log(
            `✅ Location updated for Captain ${userId}:`,
            updatedCaptain.location
            // updatedCaptain
          );
        } else {
          console.log(`❌ No Captain found with ID ${userId}`);
        }
      } catch (error) {
        console.error("❌ Error updating location:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

const sendMessageToSocketId = (socketId, messageObject) => {
  console.log("socket--------------", messageObject);

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
};

module.exports = { initializeSocket, sendMessageToSocketId };
