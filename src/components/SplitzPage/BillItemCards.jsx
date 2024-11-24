import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, ChevronLeft, ChevronRight, Users, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Simulated data structure for a bill item
const sampleItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 18.99,
    quantity: 2,
    total: 37.98
  },
  {
    id: 2,
    name: "Greek Salad",
    price: 12.99,
    quantity: 1,
    total: 12.99
  },
  {
    id: 3,
    name: "Garlic Bread",
    price: 6.99,
    quantity: 3,
    total: 20.97
  }
];

// Simulated group members
const groupMembers = [
  { id: 1, name: "Alex" },
  { id: 2, name: "Taylor" },
  { id: 3, name: "Jordan" },
  { id: 4, name: "Sam" }
];

const BillItemCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState({});
  const [dragStart, setDragStart] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    // Reset mic when card changes
    setIsMicEnabled(true);
  }, [currentIndex]);

  const handleDragStart = (e) => {
    setDragStart(e.clientX);
  };

  const handleDragEnd = (e) => {
    const dragDistance = dragStart - e.clientX;
    const threshold = 100;

    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0 && currentIndex < sampleItems.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else if (dragDistance < 0 && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    }
  };

  const toggleMember = (itemId, memberId) => {
    setSelectedMembers(prev => {
      const currentMembers = prev[itemId] || [];
      const updatedMembers = currentMembers.includes(memberId)
        ? currentMembers.filter(id => id !== memberId)
        : [...currentMembers, memberId];
      
      return {
        ...prev,
        [itemId]: updatedMembers
      };
    });
  };

  const currentItem = sampleItems[currentIndex];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Navigation indicators */}
        <div className="flex justify-center mb-4 gap-2">
          {sampleItems.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-blue-500' : 'w-4 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            ref={cardRef}
            className="bg-white rounded-xl shadow-lg p-6 mb-4"
            draggable="true"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {/* Item Details */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{currentItem.name}</h2>
                <p className="text-gray-500">
                  Quantity: {currentItem.quantity} × ${currentItem.price.toFixed(2)}
                </p>
              </div>
              <div className="text-xl font-bold text-blue-600">
                ${currentItem.total.toFixed(2)}
              </div>
            </div>

            {/* Microphone Toggle */}
            <button
              onClick={() => setIsMicEnabled(!isMicEnabled)}
              className={`mb-6 p-3 rounded-full transition-all duration-300 ${
                isMicEnabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
              }`}
            >
              {isMicEnabled ? (
                <Mic className="w-6 h-6" />
              ) : (
                <MicOff className="w-6 h-6" />
              )}
            </button>

            {/* Split With Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-gray-600" />
                <h3 className="font-medium text-gray-700">Split with</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {groupMembers.map(member => (
                  <button
                    key={member.id}
                    onClick={() => toggleMember(currentItem.id, member.id)}
                    className={`px-4 py-2 rounded-full transition-all duration-200 ${
                      (selectedMembers[currentItem.id] || []).includes(member.id)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {member.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between px-4">
          <button
            onClick={() => currentIndex > 0 && setCurrentIndex(prev => prev - 1)}
            className={`p-2 rounded-full ${
              currentIndex > 0 ? 'text-blue-500 hover:bg-blue-50' : 'text-gray-300'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => 
              currentIndex < sampleItems.length - 1 && setCurrentIndex(prev => prev + 1)
            }
            className={`p-2 rounded-full ${
              currentIndex < sampleItems.length - 1 
                ? 'text-blue-500 hover:bg-blue-50' 
                : 'text-gray-300'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillItemCards;