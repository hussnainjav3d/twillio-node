import React, { useState, useCallback, useEffect } from "react";
import Video from "twilio-video";
import Lobby from "./Lobby";
import Room from "./Room";

const VideoChat = () => {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [token, setToken] = useState(null);

  const [connecting, setConnecting] = useState(false);

  const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback((event) => {
    setRoomName(event.target.value);
  }, []);

  // const handleSubmit = useCallback(
  //   async (event) => {
  //     event.preventDefault();
  //     setConnecting(true);
  //     const data = await fetch("/video/token", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         identity: username,
  //         room: roomName,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }).then((res) => res.json());
  //     Video.connect(data.token, {
  //       name: roomName,
  //     })
  //       .then((room) => {
  //         setConnecting(false);
  //         setRoom(room);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //         setConnecting(false);
  //       });
  //   },
  //   [roomName, username]
  // );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const data = await fetch("/video/token", {
        method: "POST",
        body: JSON.stringify({
          identity: username,
          room: roomName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      setToken(data.token);
    },
    [username, roomName]
  );

  const handleLogout = useCallback((event) => {
    setToken(null);
  }, []);

  // useEffect(() => {
  //   if (room) {
  //     const tidyUp = (event) => {
  //       if (event.persisted) {
  //         return;
  //       }
  //       if (room) {
  //         handleLogout();
  //       }
  //     };
  //     window.addEventListener("pagehide", tidyUp);
  //     window.addEventListener("beforeunload", tidyUp);
  //     return () => {
  //       window.removeEventListener("pagehide", tidyUp);
  //       window.removeEventListener("beforeunload", tidyUp);
  //     };
  //   }
  // }, [room, handleLogout]);

  let render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Lobby
        username={username}
        roomName={roomName}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
      />
    );
  }
  return render;
};

export default VideoChat;
