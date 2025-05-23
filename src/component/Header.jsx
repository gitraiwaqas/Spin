import { Share2, Settings, File, Hammer, Clock, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 cursor-pointer bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
            P
          </div>
          <span className="text-lg font-semibold text-gray-800">
            Picker Wheel
          </span>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex gap-4 items-center text-sm text-gray-700">
          <button className="flex items-center gap-1 hover:text-black">
            <Clock size={16} /> Switch Wheel
          </button>
          <button className="flex items-center gap-1 hover:text-black">
            <File size={16} /> File
          </button>
          <button className="flex items-center gap-1 hover:text-black">
            <Settings size={16} /> Settings
          </button>
          <button className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded hover:bg-green-200">
            <Share2 size={16} /> Share
          </button>
          <button className="flex items-center gap-1 hover:text-black">
            <Hammer size={16} /> Tools
          </button>
        </nav>

        {/* Right: Hamburger for mobile */}
        <button className="md:hidden">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}
