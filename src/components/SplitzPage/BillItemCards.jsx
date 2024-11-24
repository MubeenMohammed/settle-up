import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, ChevronRight, Users, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { addSplit } from "../../backendFunctions/backendFunctions";

const BillItemCards = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState({});
  const [groupMembers, setGroupMembers] = useState([]);
  const [sampleItems, setSampleItems] = useState(null); // State to store sample items
  const [loading, setLoading] = useState(true); // Loading state
  const [dragStart, setDragStart] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Fetch group members from sessionStorage
        const groupDetails = sessionStorage.getItem("groupDetails");
        const members = groupDetails ? JSON.parse(groupDetails).members : [];
        setGroupMembers(members);

        // Fetch sample items from sessionStorage
        const rawBillItems = sessionStorage.getItem("billItems");
        if (rawBillItems) {
          const parsedItems = JSON.parse(rawBillItems).items;
          if (Array.isArray(parsedItems)) {
            const items = parsedItems.map((item) => ({
              id: item.item_id,
              name: item.item_name,
              quantity: item.quantity,
              price: item.price_per_unit,
              total: item.total_price,
            }));
            setSampleItems(items);
          }
        }
      } catch (error) {
        console.error("Error initializing data:", error);
      } finally {
        setLoading(false); // Mark loading as complete
      }
    };

    initializeData();
  }, []);

  // Derived array of active user_ids for the current item
  const activeUserIds = selectedMembers[sampleItems?.[currentIndex]?.id] || [];

  const handleDragStart = (e) => {
    setDragStart(e.clientX);
  };

  const handleDragEnd = (e) => {
    const dragDistance = dragStart - e.clientX;
    const threshold = 100;

    if (Math.abs(dragDistance) > threshold && activeUserIds.length > 0) {
      if (dragDistance > 0 && currentIndex < sampleItems.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    }
  };

  const toggleMember = (itemId, memberId) => {
    setSelectedMembers((prev) => {
      const currentMembers = prev[itemId] || [];
      const updatedMembers = currentMembers.includes(memberId)
        ? currentMembers.filter((id) => id !== memberId)
        : [...currentMembers, memberId];

      return {
        ...prev,
        [itemId]: updatedMembers,
      };
    });
  };

  const handlenextClick = async () => {
    try {
      const billItems = JSON.parse(sessionStorage.getItem("billItems"));
      const billId = billItems?.bill_id;

      if (!billId || !sampleItems?.[currentIndex]) {
        alert("Data is not ready. Please try again.");
        return;
      }

      const response = await addSplit(
        `${billId}`,
        `${sampleItems[currentIndex].id}`,
        sessionStorage.getItem("billPaidBy"),
        activeUserIds,
        sampleItems[currentIndex].total
      );

      if (response.status === "success") {
        activeUserIds.length > 0 &&
          currentIndex < sampleItems.length - 1 &&
          setCurrentIndex((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error handling next click:", error);
      alert("An error occurred while processing. Please try again.");
    }
  };

  const handleClose = () => {
    sessionStorage.removeItem("billItems");
    sessionStorage.removeItem("groupDetails");
    sessionStorage.removeItem("billPaidBy");
    navigate("/home");
  };

  // Show loader if still loading
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-[#BCF4F5] via-[#B4EBCA] to-[#D9F2B4]">
        <div className="text-xl font-bold text-[#234F3D]">Loading...</div>
      </div>
    );
  }

  // If no sample items are available
  if (!sampleItems || sampleItems.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-[#BCF4F5] via-[#B4EBCA] to-[#D9F2B4]">
        <div className="text-xl font-bold text-[#234F3D]">
          No items to display. Please try again.
        </div>
      </div>
    );
  }

  const currentItem = sampleItems[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#BCF4F5] via-[#B4EBCA] to-[#D9F2B4] flex items-center justify-center p-6 relative">
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 left-4 p-2 rounded-full bg-[#f1f1f1] text-black hover:bg-[#234F3D] transition-all duration-200 shadow-md"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-center mb-4 gap-2">
          {sampleItems.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-8 bg-[#234F3D]" : "w-4 bg-[#A5D6A7]"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            ref={cardRef}
            className="bg-white rounded-xl shadow-lg p-6 mb-4 border border-[#B4EBCA]"
            draggable="true"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold text-[#234F3D]">
                  {currentItem.name}
                </h2>
                <p className="text-gray-600">
                  Quantity: {currentItem.quantity} × ${currentItem.price.toFixed(2)}
                </p>
              </div>
              <div className="text-xl font-bold text-[#1B5E20]">
                ${currentItem.total.toFixed(2)}
              </div>
            </div>

            <button
              onClick={() => setIsMicEnabled(!isMicEnabled)}
              className={`mb-6 p-3 rounded-full transition-all duration-300 shadow ${
                isMicEnabled
                  ? "bg-[#BCF4F5] text-[#234F3D] shadow-md"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {isMicEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </button>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-[#234F3D]" />
                <h3 className="font-medium text-[#234F3D]">Split with</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {groupMembers.map((member) => (
                  <button
                    key={member.user_id}
                    onClick={() => toggleMember(currentItem.id, member.user_id)}
                    className={`px-4 py-2 rounded-full transition-all duration-200 shadow ${
                      activeUserIds.includes(member.user_id)
                        ? "bg-[#B4EBCA] text-white"
                        : "bg-gray-100 text-[#234F3D] hover:bg-[#D9F2B4]"
                    }`}
                  >
                    {member.User_info.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-end px-4">
          <button
            onClick={handlenextClick}
            className={`p-2 rounded-full shadow ${
              activeUserIds.length > 0 && currentIndex < sampleItems.length - 1
                ? "text-[#234F3D] bg-[#BCF4F5] hover:bg-[#B4EBCA]"
                : "text-gray-400 cursor-not-allowed"
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
