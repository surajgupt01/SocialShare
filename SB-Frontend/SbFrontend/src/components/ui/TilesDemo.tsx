import { motion } from 'framer-motion';
import { Upload, BarChart3, Settings, Bell, Smile } from 'lucide-react';

const Tile = ({ icon: Icon, label, children, animation }) => (
  <motion.div
    className="bg-white rounded-2xl shadow-md p-4 w-48 h-48 flex flex-col justify-center items-center text-center cursor-pointer"
    whileHover={animation}
    transition={{ duration: 0.5 }}
    style={{ perspective: 1000 }}
  >
    <Icon className="w-8 h-8 text-gray-700 mb-2" />
    <p className="font-semibold text-sm">{label}</p>
    {children && <div className="text-xs mt-2 text-gray-500">{children}</div>}
  </motion.div>
);

export default function TilesDemo() {
  return (
    <div className="flex gap-6 flex-wrap justify-center p-10 bg-gray-50 min-h-screen">
      {/* Upload Tile */}
      <Tile 
        icon={Upload} 
        label="Upload File"
        animation={{ rotateY: 10, scale: 1.05 }}
      />

      {/* Stats Tile */}
      <Tile
        icon={BarChart3}
        label="Storage Usage"
        animation={{ scale: [1, 1.1, 1], rotateX: 5 }}
      >
        85% Used
      </Tile>

      {/* Settings Flip Tile */}
      <motion.div
        className="w-48 h-48 relative"
        style={{ perspective: 1000 }}
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="absolute w-full h-full rounded-2xl bg-white shadow-md flex flex-col justify-center items-center backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Settings className="w-8 h-8 text-gray-700 mb-2" />
          <p className="font-semibold text-sm">Settings</p>
        </motion.div>

        <motion.div
          className="absolute w-full h-full rounded-2xl bg-blue-600 text-white flex flex-col justify-center items-center"
          style={{ rotateY: 180, backfaceVisibility: 'hidden' }}
        >
          <p className="font-semibold">Manage Library</p>
          <p className="text-sm mt-1">Privacy Controls</p>
        </motion.div>
      </motion.div>

      {/* Notification */}
      <Tile 
        icon={Bell} 
        label="Notifications"
        animation={{ y: [-5, 5, -5], transition: { repeat: Infinity, duration: 2 } }}
      >
        3 New Alerts
      </Tile>

      {/* Fun Tile */}
      <Tile
        icon={Smile}
        label="Surprise Me"
        animation={{ rotate: [0, 10, -10, 0], transition: { duration: 0.6 } }}
      >
        🎉 Daily Quote
      </Tile>
    </div>
  );
}
