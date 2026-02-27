import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 transition hover:shadow-2xl">
        
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center text-white text-3xl font-semibold shadow-md">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {user?.name}
          </h2>

          <p className="text-gray-500 text-sm">
            {user?.email}
          </p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t"></div>

        {/* Info Section */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Full Name:</span>
            <span className="text-gray-800">{user?.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Email:</span>
            <span className="text-gray-800">{user?.email}</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile