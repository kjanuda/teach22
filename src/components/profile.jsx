import React, { useState } from 'react';

// Generate time ranges like "7:30 AM - 8:10 AM"
const timeRanges = () => {
  const ranges = [];
  let hour = 7;
  let minute = 30;

  while (hour < 13 || (hour === 13 && minute <= 30)) {
    let startHour = hour;
    let startMinute = minute;

    minute += 40;
    if (minute >= 60) {
      hour += 1;
      minute -= 60;
    }

    let endHour = hour;
    let endMinute = minute;

    const formatTime = (h, m) => {
      const suffix = h >= 12 ? 'PM' : 'AM';
      const formattedHour = h > 12 ? h - 12 : h;
      return `${formattedHour}:${m.toString().padStart(2, '0')} ${suffix}`;
    };

    ranges.push(`${formatTime(startHour, startMinute)} - ${formatTime(endHour, endMinute)}`);
  }

  return ranges;
};

const Profile = () => {
  const [formData, setFormData] = useState({
    nic: '',
    name: '',
    gender: '',
    subject: '',
    time: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
    },
    robot: false,
  });

  const [errors, setErrors] = useState({});
  const times = timeRanges();
  const subjects = ['ICT', 'SINHALA', 'MATHEMATICS', 'HISTORY', 'ENGLISH', 'BUDDA DHARMAYA', 'ART', 'COMMERCE', 'SCIENCE'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in formData.time) {
      setFormData((prev) => ({
        ...prev,
        time: { ...prev.time, [name]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nic) newErrors.nic = 'NIC is required.';
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.gender) newErrors.gender = 'Please select a gender.';
    if (!formData.subject) newErrors.subject = 'Please select a subject.';
    if (!formData.robot) newErrors.robot = 'Please confirm you are not a robot.';
    for (const day in formData.time) {
      if (!formData.time[day]) newErrors[day] = `Please select time for ${day}`;
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert('Profile updated successfully!');
      // submit the data to backend here
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold">NIC Number</label>
          <input
            type="text"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.nic && <p className="text-red-500 text-sm mt-1">{errors.nic}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Select Subject</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(formData.time).map((day) => (
            <div key={day}>
              <label className="block text-gray-700 font-semibold capitalize">{day}</label>
              <select
                name={day}
                value={formData.time[day]}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Time</option>
                {times.map((timeRange) => (
                  <option key={timeRange} value={timeRange}>
                    {timeRange}
                  </option>
                ))}
              </select>
              {errors[day] && <p className="text-red-500 text-sm mt-1">{errors[day]}</p>}
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="robot"
            checked={formData.robot}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label className="text-gray-700">I'm not a robot</label>
        </div>
        {errors.robot && <p className="text-red-500 text-sm">{errors.robot}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
