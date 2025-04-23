import React from 'react'

export default function Profile() {
    const user = JSON.parse(sessionStorage.getItem('user')); // Or get from auth context
    
  return (
    <div>
         <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
      <div className="space-y-3">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Phone:</strong> {user?.EmployeeId}</p>
        <p><strong>Gender:</strong> {user?.JobTitle}</p>
        <p><strong>Date of Birth:</strong> {user?.Department}</p>
        <p><strong>Date of Birth:</strong> {user?.PhoneNumber}</p>
        
      </div>
    </div>
    </div>
  )
}
