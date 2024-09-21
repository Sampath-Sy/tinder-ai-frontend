import "./App.css";
import { User, MessageCircle, X, Heart } from "lucide-react";
import React, { useEffect, useState } from "react";

const fetchRandomProfile = async () => {
  const respone = await fetch("http://localhost:8080/profiles/random");
  if (!respone.ok) {
    throw new console.error("there is problem");
  }
  return respone.json();
};

const ProfileSelector = ({ profile, onSwipe }) => {
  return profile ? (
    <div className="rounded-lg overflow-hidden bg-white shadow-lg">
      <div className="relative">
        <img src={`http://192.168.1.93:8081/${profile.imageUrl}`} />
        <div className="absolute bottom-0 left-0 right-0 text-white">
          <h2 className="text-3xl font-bold p-4 bg-gradient-to-t from-black">
            {profile.firstName} {profile.lastName},{profile.age}
          </h2>
        </div>
      </div>
      <div className="p-4">
        <p className="">{profile.bio}</p>
      </div>
      <div className="p-4 flex justify-center space-x-6">
        <button
          className="bg-red-500 rounded-full p-4 text-white hover:bg-red-700"
          onClick={() => onSwipe("left")}
        >
          <X size={24} />
        </button>
        <button
          className="bg-green-500 rounded-full p-4 text-white hover:bg-green-700"
          onClick={() => onSwipe("right")}
        >
          <Heart size={24} />
        </button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

const MatchesList = ({ onSelectMatch }) => {
  return (
    <div className="rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Matches</h2>
      <ul>
        {[
          {
            id: 1,
            firstName: "roja",
            lastName: "rose",
            imageUrl:
              "http://192.168.1.93:8081/017e4530-49b4-4937-8adf-985a82595d53.jpg",
          },
          {
            id: 2,
            firstName: "daisy",
            lastName: "dash",
            imageUrl:
              "http://192.168.1.93:8081/017e4530-49b4-4937-8adf-985a82595d53.jpg",
          },
        ].map((match) => {
          return (
            <li key={match.id} className="mb-2">
              <button
                onClick={onSelectMatch}
                className="w-full hover:bg-gray-100 rounded flex items-center"
              >
                <img
                  className="w-16 h-16 rounded-full mr-3"
                  src={match.imageUrl}
                />
                <span>
                  <h3 className="font-bold">
                    {match.firstName} {match.lastName}
                  </h3>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const ChatScreen = () => {
  const [input, setInput] = useState("");
  const handleSend = () => {
    if (input.trim()) {
      console.log(input);
      setInput("");
    }
  };
  return (
    <div className="rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Chat with roja</h2>
      <div className="h-[50vh] border rounded overflow-y-auto mb-4 p-2">
        {[
          "hi",
          "how are you",
          "how are you",
          "how are you",
          "how are you",
          "how are you",
          "how are you",
          "how are you",
          "how are you",
        ].map((message, index) => {
          return (
            <div key={index}>
              <div className="mb-4 p-2 rounded bg-gray-100">{message}</div>
            </div>
          );
        })}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="border flex-1 rounded p-2 mr-2"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white rounded p-2"
        >
          send
        </button>
      </div>
    </div>
  );
};

function App() {
  const [currentScreen, setCurrentScreen] = useState("profile");
  const [currentProfile, setCurrentProfile] = useState(null);

  const loadRandomProfile = async () => {
    try {
      const profile = await fetchRandomProfile();
      setCurrentProfile(profile);
    } catch (error) {
      console.error(error);
    }
  };
  const onSwipe = (direction) => {
    if (direction === "right") {
      console.log("liked");
    }
    loadRandomProfile();
  };
  useEffect(() => {
    loadRandomProfile();
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case "profile":
        return <ProfileSelector profile={currentProfile} onSwipe={onSwipe} />;
      case "matches":
        return <MatchesList onSelectMatch={() => setCurrentScreen("chat")} />;
      case "chat":
        return <ChatScreen />;
    }
  };
  return (
    <>
      <div className="max-w-md mx-auto p-4">
        <nav className="flex justify-between mb-4">
          <User onClick={() => setCurrentScreen("profile")} />
          <MessageCircle onClick={() => setCurrentScreen("matches")} />
        </nav>
        {renderScreen()}
      </div>
    </>
  );
}

export default App;
