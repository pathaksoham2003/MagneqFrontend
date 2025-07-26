import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useNotification from "../../services/useNotification";
import { FiBell } from "react-icons/fi";


const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
    const {getAllNotifications} = useNotification();
  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: getAllNotifications,
    refetchInterval: 10000 , 
  });
  const notifications = data?.notifications || [];
  const unread = notifications.some((n) => n.status === "PENDING");


  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative text-xl p-2 rounded-full hover:bg-gray-100 focus:outline-none"
      >
        <FiBell className="text-2xl text-text" />
        {unread && (
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-600 rounded-full"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-border shadow-lg rounded-md z-50">
          <div className="p-4 border-b">
            <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
          </div>

          <div className="max-h-72 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-sm text-gray-500">Loading...</div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-sm text-gray-500">No notifications</div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {notifications.map((n) => (
                  <li key={n._id} className="p-4 hover:bg-gray-50">
                    <p className="text-sm font-medium text-gray-800">
                      {n.type.toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-600">
                      {n.payload?.message || "No message"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Status: {n.status}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
