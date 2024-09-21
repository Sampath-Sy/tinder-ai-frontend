import "./App.css";
import { User, MessageCircle, X, Heart } from "lucide-react";

const ProfileSelector = () => {
  return (
    <div className="rounded-lg overflow-hidden bg-white shadow-lg">
      <div className="relative">
        <img src="http://192.168.1.93:8081/017e4530-49b4-4937-8adf-985a82595d53.jpg" />
        <div className="absolute bottom-0 left-0 right-0 text-white">
          <h2 className="text-3xl font-bold p-4 bg-gradient-to-t from-black">
            Roja,24
          </h2>
        </div>
      </div>
      <div className="p-4">
        <p className="">
          I am heroine working in telugu film industry,looking for a opportunity
          in hollywood.
        </p>
      </div>
      <div className="p-4 flex justify-center space-x-6">
        <button
          className="bg-red-500 rounded-full p-4 text-white hover:bg-red-700"
          onClick={() => console.log("swipe left")}
        >
          <X size={24} />
        </button>
        <button
          className="bg-green-500 rounded-full p-4 text-white hover:bg-green-700"
          onClick={() => console.log("swipe right")}
        >
          <Heart size={24} />
        </button>
      </div>
    </div>
  );
};

const MatchesList = () => {
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
              <button className="w-full hover:bg-gray-100 rounded flex items-center">
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

function App() {
  return (
    <>
      <div className="max-w-md mx-auto p-4">
        <nav className="flex justify-between mb-4">
          <User />
          <MessageCircle />
        </nav>
        {/* <ProfileSelector /> */}
        <MatchesList />
      </div>
    </>
  );
}

export default App;
