export default function TornadoLoader() {
    return (
      <div className="flex justify-center items-center mt-10">
        <div className="flex flex-col items-center space-y-2">
          <img
            src="/tornado-placeholder.svg"
            alt="Loading..."
            className="h-12 w-12 animate-spin-slow"
          />
          <p className="text-sm text-gray-500">Loading... please wait</p>
        </div>
      </div>
    );
  }
  