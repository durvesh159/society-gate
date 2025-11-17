// import { Link } from "react-router-dom";

// export default function App() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//       <h1 className="text-3xl font-bold mb-4">Welcome to Society Gate</h1>
//       <Link
//         to="/login"
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Go to Login
//       </Link>
//     </div>
//   );
// }



import { Link } from "react-router-dom";

export default function App() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-4 relative"
      style={{
        backgroundImage: `url('/society-gate.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay to reduce opacity */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-500 to-purple-300 opacity-60"></div>

      <div className="relative backdrop-blur-xl bg-white/70 shadow-2xl rounded-2xl p-10 flex flex-col items-center gap-6 border border-purple-300 z-10">
        <h1 className="text-4xl font-extrabold text-purple-900 text-center">
          Welcome to Society Gate
        </h1>
        <Link
          to="/login"
          className="bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-purple-800 transition"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}


