import React, { useRef, useState } from "react";
import { Copy, Eye, EyeOff, Trash } from "lucide-react";
import Popup from "./Popup"; // Ensure Popup component exists

const WheelSpinner = () => {
  const wheelRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);
  const [input, setInput] = useState("");
  const [options, setOptions] = useState([
    { text: "Yes", visible: true },
    { text: "No", visible: true },
    { text: "Yes", visible: true },
    { text: "No", visible: true },
    { text: "Yes", visible: true },
    { text: "No", visible: true },
    { text: "Yes", visible: true },
    { text: "No", visible: true },
  ]);

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter" && input.trim()) {
      const isDefault = options.every((opt) => ["Yes", "No"].includes(opt.text));
      const newOption = { text: input.trim(), visible: true };
      setOptions((prev) => (isDefault ? [newOption] : [...prev, newOption]));
      setInput("");
    }
  };

  const duplicateOption = (index) => {
    setOptions((prev) => [...prev, { ...prev[index] }]);
  };

  const toggleVisibility = (index) => {
    setOptions((prev) =>
      prev.map((opt, i) =>
        i === index ? { ...opt, visible: !opt.visible } : opt
      )
    );
  };

  const removeOption = (index) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const spinWheel = () => {
    const visibleOptions = options.filter((opt) => opt.visible);
    if (spinning || visibleOptions.length === 0) return;

    const extraSpins = 360 * 8;
    const randomDeg = Math.floor(Math.random() * 360);
    const newRotation = rotation + extraSpins + randomDeg;

    setSpinning(true);
    setRotation(newRotation);

    wheelRef.current.style.transition = "transform 6s ease-out";
    wheelRef.current.style.transform = `rotate(${newRotation}deg)`;

    setTimeout(() => {
      const finalDeg = ((newRotation % 360) + 360) % 360;
      const index = Math.floor(
        ((360 - finalDeg) % 360) / (360 / visibleOptions.length)
      );
      const chosenOption = visibleOptions[index].text;
      setResult(chosenOption);
      setSpinning(false);
    }, 6000);
  };

  const visibleOptions = options.filter((opt) => opt.visible);
  const angle = 360 / visibleOptions.length;

  const renderSectors = () =>
    visibleOptions.map((opt, i) => {
      const rotate = i * angle;
      const color = i % 2 === 0 ? "#A0E7E5" : "#FFAEBC";

      return (
        <g key={i} transform={`rotate(${rotate}, 100, 100)`}>
          <path
            d={`M100,100 L100,0 A100,100 0 0,1 ${
              100 + 100 * Math.sin((angle * Math.PI) / 180)
            },${100 - 100 * Math.cos((angle * Math.PI) / 180)} Z`}
            fill={color}
            stroke="#ffffff"
            strokeWidth="1"
          />
          <text
            x="100"
            y="20"
            textAnchor="middle"
            transform={`rotate(${angle / 2}, 100, 100)`}
            fill="#333"
            fontSize="10"
            fontWeight="bold"
          >
            {opt.text}
          </text>
        </g>
      );
    });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white w-[90%] p-4 rounded-xl shadow-xl flex flex-col lg:flex-row gap-4">
        {/* Wheel Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
            <svg
              ref={wheelRef}
              viewBox="0 0 200 200"
              className="w-full h-full rounded-full"
            >
              {renderSectors()}
            </svg>
            <button
              onClick={spinWheel}
              disabled={spinning}
              className="absolute top-1/2 left-1/2 z-30 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 hover:opacity-80 active:opacity-60 transition"
            >
              <div
                className="absolute inset-0 w-16 h-16 transform -rotate-45 z-10"
                style={{
                  borderRadius: "50% 0px 50% 50%",
                  background: "rgb(34, 34, 34)",
                }}
              />
              <span className="relative z-20 text-white font-bold text-xs tracking-wide flex items-center justify-center w-full h-full">
                SPIN
              </span>
            </button>
          </div>
        </div>

        {/* Input Section */}
        <div className="w-full border-[2px] p-5 rounded-2xl lg:w-1/2">
          <div className="border-b-2 border-dashed mb-2">
            <div className="flex items-center border rounded mb-4 px-2 py-1 bg-white">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyPress}
                placeholder="Enter option and press Enter"
                className="w-full p-2 focus:outline-none"
              />
              <div className="flex items-center space-x-2 pl-2">
                <button
                  onClick={() => {
                    if (input.trim()) {
                      const isDefault = options.every((opt) =>
                        ["Yes", "No"].includes(opt.text)
                      );
                      const newOption = { text: input.trim(), visible: true };
                      setOptions((prev) =>
                        isDefault ? [newOption] : [...prev, newOption]
                      );
                      setInput("");
                    }
                  }}
                  className="text-green-600 hover:text-green-800 transition"
                  title="Add Option"
                >
                  ➕
                </button>
              </div>
            </div>
          </div>

          {/* Header for Input History */}
          <div className="flex items-center mb-1">
            <span className="text-sm font-semibold mr-2 bg-yellow-200 px-2 py-0.5 rounded">
              INPUTS
            </span>
          </div>

          <ul className="space-y-2 mt-2 max-h-fit pr-2">
            {options
              .map((opt, idx) => ({ ...opt, index: idx }))
              .filter((opt) => !["Yes", "No"].includes(opt.text))
              .map((opt) => (
                <li
                  key={opt.index}
                  className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded border"
                >
                  <span
                    className={`${
                      opt.visible ? "text-black" : "text-gray-400 line-through"
                    }`}
                  >
                    {opt.text}
                  </span>
                  <div className="flex gap-2">
                    <Copy
                      size={18}
                      className="cursor-pointer text-blue-500"
                      onClick={() => duplicateOption(opt.index)}
                    />
                    {opt.visible ? (
                      <EyeOff
                        size={18}
                        className="cursor-pointer text-yellow-500"
                        onClick={() => toggleVisibility(opt.index)}
                      />
                    ) : (
                      <Eye
                        size={18}
                        className="cursor-pointer text-green-500"
                        onClick={() => toggleVisibility(opt.index)}
                      />
                    )}
                    <Trash
                      size={18}
                      className="cursor-pointer text-red-500"
                      onClick={() => removeOption(opt.index)}
                    />
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Result Popup */}
      {result && <Popup result={result} onClose={() => setResult(null)} />}
    </div>
  );
};

export default WheelSpinner;
