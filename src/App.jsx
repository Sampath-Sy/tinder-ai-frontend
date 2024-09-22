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

const saveSwipe = async (profileId) => {
  const response = await fetch("http://localhost:8080/matches", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ profileId }),
  });
  if (!response.ok) {
    throw new Error("Failed to save swipe");
  }
};
const fetchMatcehs = async () => {
  const respone = await fetch("http://localhost:8080/matches");
  if (!respone.ok) {
    throw new Error("failed to fetch the Matches");
  }
  return respone.json();
};

const fetchConversation = async (conversationId) => {
  const respone = await fetch(
    `http://localhost:8080/conversations/${conversationId}`
  );
  if (!respone.ok) {
    throw new Error("failed to fetch the conversation");
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
          onClick={() => onSwipe(profile.id, "left")}
        >
          <X size={24} />
        </button>
        <button
          className="bg-green-500 rounded-full p-4 text-white hover:bg-green-700"
          onClick={() => onSwipe(profile.id, "right")}
        >
          <Heart size={24} />
        </button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

const MatchesList = ({ matches, onSelectMatch }) => {
  return (
    <div className="rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Matches</h2>
      <ul>
        {matches.map((match) => {
          return (
            <li key={match.profile.id} className="mb-2">
              <button
                onClick={() =>
                  onSelectMatch(match.profile, match.conversationId)
                }
                className="w-full hover:bg-gray-100 rounded flex items-center"
              >
                <img
                  className="w-16 h-16 rounded-full mr-3"
                  src={`http://192.168.1.93:8081/${match.profile.imageUrl}`}
                />
                <span>
                  <h3 className="font-bold">
                    {match.profile.firstName} {match.profile.lastName}
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

const ChatScreen = ({ currentMatch, conversation }) => {
  const [input, setInput] = useState("");
  const handleSend = () => {
    if (input.trim()) {
      console.log(input);
      setInput("");
    }
  };
  return currentMatch ? (
    <div className="rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-4">
        Chat with {currentMatch.firstName} {currentMatch.lastName}
      </h2>
      <div className="h-[50vh] border rounded overflow-y-auto mb-4 p-2">
        {conversation.map((message, index) => {
          return (
            <div key={index}>
              <div className="mb-4 p-2 rounded bg-gray-100">
                {message.messageText}
              </div>
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
  ) : (
    <div>Loading...</div>
  );
};

function App() {
  const [currentScreen, setCurrentScreen] = useState("profile");
  const [currentProfile, setCurrentProfile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [currentMatchAndConversation, setCurrentMatchAndConversation] =
    useState({ match: {}, conversation: [] });

  const loadRandomProfile = async () => {
    try {
      const profile = await fetchRandomProfile();
      setCurrentProfile(profile);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMatches = async () => {
    try {
      const matches = await fetchMatcehs();
      setMatches(matches);
      console.log("matches", matches);
    } catch (error) {
      console.error(error);
    }
  };

  const onSwipe = async (profileId, direction) => {
    if (direction === "right") {
      await saveSwipe(profileId);
      await loadMatches();
    }
    loadRandomProfile();
  };
  const onSelectMatch = async (profile, conversationId) => {
    try {
      const conversation = await fetchConversation(conversationId);
      setCurrentMatchAndConversation({
        match: profile,
        conversation: conversation.messages,
      });
      setCurrentScreen("chat");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadRandomProfile();
    loadMatches();
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case "profile":
        return <ProfileSelector profile={currentProfile} onSwipe={onSwipe} />;
      case "matches":
        return <MatchesList matches={matches} onSelectMatch={onSelectMatch} />;
      case "chat":
        return (
          <ChatScreen
            currentMatch={currentMatchAndConversation.match}
            conversation={currentMatchAndConversation.conversation}
          />
        );
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
