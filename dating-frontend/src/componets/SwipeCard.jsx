import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function SwipeCard({ profile, handleSwipe }) {
  const [exitX, setExitX] = useState(0);
  const x = useMotionValue(0);

  // Modern CSS magic: Rotate and opacity based on drag
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  // Color overlays for Like (Green) and Pass (Red)
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [0, -100], [0, 1]);

  const onDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      setExitX(200); // Swipe Right
      setTimeout(() => handleSwipe(profile._id, "right"), 200);
    } else if (info.offset.x < -100) {
      setExitX(-200); // Swipe Left
      setTimeout(() => handleSwipe(profile._id, "left"), 200);
    }
  };

  return (
    <motion.div
      className="absolute w-80 h-[28rem] rounded-3xl shadow-2xl bg-white overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={onDragEnd}
      animate={{ x: exitX }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <img
        src={profile.image}
        alt={profile.name}
        className="w-full h-full object-cover pointer-events-none"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      {/* Swipe Indicators */}
      <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 right-8 border-4 border-red-500 rounded-lg px-4 py-1 z-10">
        <span className="text-red-500 font-bold text-3xl tracking-wider">NOPE</span>
      </motion.div>
      <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-8 border-4 border-green-500 rounded-lg px-4 py-1 z-10">
        <span className="text-green-500 font-bold text-3xl tracking-wider">LIKE</span>
      </motion.div>

      {/* Profile Info */}
      <div className="absolute bottom-0 w-full p-6 text-white pointer-events-none">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          {profile.name}, {profile.age}
        </h2>
        <p className="text-sm opacity-80 mt-1">{profile.bio}</p>
      </div>
    </motion.div>
  );
}