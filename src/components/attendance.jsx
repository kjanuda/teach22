import { motion } from 'framer-motion';
import React, { useState } from 'react';

// Sample teacher timetable and attendance
const teacherData = [
  {
    name: 'Mr. Silva',
    schedule: {
      monday: '7:30-8:10',
      tuesday: '8:50-9:30',
      wednesday: '10:10-10:50',
      thursday: '9:30-10:10',
      friday: '7:30-8:10',
    },
    attendance: {
      monday: 'Present',
      tuesday: 'Present',
      wednesday: 'Absent',
      thursday: 'Present',
      friday: 'Present',
    },
  },
  {
    name: 'Ms. Perera',
    schedule: {
      monday: '8:50-9:30',
      tuesday: '7:30-8:10',
      wednesday: '9:30-10:10',
      thursday: '7:30-8:10',
      friday: '8:50-9:30',
    },
    attendance: {
      monday: 'Absent',
      tuesday: 'Present',
      wednesday: 'Present',
      thursday: 'Present',
      friday: 'Absent',
    },
  },
];

// Helper functions
const getTodayName = () => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[new Date().getDay()];
};

const isTeacherAvailableNow = (timeSlot) => {
  if (!timeSlot) return false;
  const [start, end] = timeSlot.split('-');
  const now = new Date();

  const toMinutes = (t) => {
    const [hour, min] = t.split(':');
    return parseInt(hour) * 60 + parseInt(min);
  };

  const currentMins = now.getHours() * 60 + now.getMinutes();
  return currentMins >= toMinutes(start) && currentMins <= toMinutes(end);
};

const Attendance = () => {
  const today = getTodayName();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredTeachers = teacherData
    .filter((teacher) => teacher.name.toLowerCase().includes(search.toLowerCase()))
    .filter((teacher) => {
      const todayStatus = teacher.attendance[today];
      const availableNow = isTeacherAvailableNow(teacher.schedule[today]);

      if (filter === 'present') return todayStatus === 'Present';
      if (filter === 'absent') return todayStatus === 'Absent';
      if (filter === 'available') return todayStatus === 'Present' && availableNow;
      return true;
    });

  return (
    <motion.div
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10"
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Teacher Attendance</h1>

      {/* Search + Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          className="px-4 py-2 border rounded-md shadow-sm w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {['all', 'present', 'absent', 'available'].map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filter === key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-blue-100 text-gray-800'
            }`}
          >
            {key === 'all'
              ? 'All'
              : key === 'present'
              ? 'Present Today'
              : key === 'absent'
              ? 'Absent Today'
              : 'Available Now'}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-3 border">Teacher</th>
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
                <th key={day} className="p-3 border capitalize">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map((teacher, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-3 border font-medium text-blue-800">{teacher.name}</td>
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => {
                  const isToday = day === today;
                  const status = teacher.attendance[day];
                  const time = teacher.schedule[day] || 'N/A';

                  const statusColor =
                    status === 'Present'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700';

                  const statusDot =
                    status === 'Present' ? (
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-ping mr-2" />
                    ) : (
                      <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2" />
                    );

                  return (
                    <td
                      key={day}
                      className={`p-3 border text-sm ${
                        isToday ? 'bg-blue-50 font-semibold' : ''
                      }`}
                    >
                      <div className="flex items-center gap-1 mb-1">
                        {statusDot}
                        <span className={`px-2 py-1 rounded-md ${statusColor}`}>{status}</span>
                      </div>
                      <div className="text-gray-600">{time}</div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Attendance;
