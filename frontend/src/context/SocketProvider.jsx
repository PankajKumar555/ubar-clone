import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import SocketContext from "./SocketContext"; // Import context

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (socket) return; // Prevent re-initialization

    const newSocket = io("http://localhost:4000", {
      transports: ["websocket"],
      withCredentials: true,
      reconnection: true, // Ensure auto-reconnect
      reconnectionAttempts: 5, // Number of attempts before giving up
      reconnectionDelay: 2000,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server frontend:", newSocket.id);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("❌ Disconnected from server:", reason);
      if (reason === "io server disconnect") {
        newSocket.connect(); // Manually reconnect if the server forcefully disconnects
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
