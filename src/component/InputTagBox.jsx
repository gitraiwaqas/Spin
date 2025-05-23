import React, { useState } from "react";
import { Plus, Image as ImageIcon, Check, X, Copy } from "lucide-react";

export default function InputTagBox({ tags, setTags }) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.some((tag) => tag.text === trimmed)) {
      setTags([...tags, { text: trimmed, checked: true }]);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const toggleTag = (index) => {
    const updated = [...tags];
    updated[index].checked = !updated[index].checked;
    setTags(updated);
  };

  const duplicateTag = (index) => {
    const newTag = { ...tags[index] };
    setTags([...tags, newTag]);
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full md:w-[90%] p-4 border rounded-xl shadow bg-white">
      <div className="font-semibold mb-2">INPUTS</div>

      {/* Input */}
      <div className="flex items-center border bg-gray-100 px-2 py-1 rounded mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-transparent focus:outline-none px-1"
          placeholder="Input text here..."
        />
        <button
          onClick={addTag}
          className="p-1 hover:text-blue-500"
          title="Add"
        >
          <Plus size={16} />
        </button>
        <button className="p-1 hover:text-blue-500" title="Attach image">
          <ImageIcon size={16} />
        </button>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-100 px-2 py-1 rounded"
          >
            <span>{tag.text}</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleTag(index)}
                title="Toggle"
                className="w-5 h-5 border border-gray-400 rounded flex items-center justify-center hover:border-green-600"
              >
                {tag.checked && <Check size={14} className="text-green-600" />}
              </button>
              <button
                onClick={() => duplicateTag(index)}
                title="Duplicate"
                className="text-blue-600 hover:text-blue-800"
              >
                <Copy size={16} />
              </button>
              <button
                onClick={() => removeTag(index)}
                title="Remove"
                className="text-red-600 hover:text-red-800"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
