import React, { useState } from 'react';

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
    educationQualification: '',
    professionalQualification: '',
    firstAppointmentDate: '',
    schoolAppointmentDate: '',
    grade: '',
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
  const grades = [
    '3I(A)',
    '3I(B)',
    '3I(C)',
    '2II ',
    '2II ',
    '1',
    'Other'
  ];

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
    if (!formData.educationQualification) newErrors.educationQualification = 'Required.';
    if (!formData.professionalQualification) newErrors.professionalQualification = 'Required.';
    if (!formData.firstAppointmentDate) newErrors.firstAppointmentDate = 'Select date.';
    if (!formData.schoolAppointmentDate) newErrors.schoolAppointmentDate = 'Select date.';
    if (!formData.grade) newErrors.grade = 'Select teacher grade.';
    if (!formData.robot) newErrors.robot = 'Confirm you are not a robot.';
    for (const day in formData.time) {
      if (!formData.time[day]) newErrors[day] = `Select time for ${day}`;
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert('Profile updated successfully!');
      // You can submit the data here
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Update Teacher Profile</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Details */}
        {[
          { label: 'NIC Number', name: 'nic', type: 'text' },
          { label: 'Name', name: 'name', type: 'text' },
          { label: 'Education Qualification', name: 'educationQualification', type: 'text' },
          { label: 'Professional Qualification', name: 'professionalQualification', type: 'text' },
          { label: 'First Appointment Date', name: 'firstAppointmentDate', type: 'date' },
          { label: 'School Appointment Date', name: 'schoolAppointmentDate', type: 'date' },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-gray-700 font-semibold">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
          </div>
        ))}

        {/* Dropdowns */}
        <div>
          <label className="block text-gray-700 font-semibold">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Subject</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Subject</option>
            {subjects.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
          {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Teacher Grade</label>
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Grade</option>
            {grades.map((grade) => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
          {errors.grade && <p className="text-red-500 text-sm">{errors.grade}</p>}
        </div>

        {/* Timetable */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Weekly Time Schedule</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(formData.time).map((day) => (
              <div key={day}>
                <label className="block text-gray-700 font-medium capitalize">{day}</label>
                <select
                  name={day}
                  value={formData.time[day]}
                  onChange={handleChange}
                  className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Time</option>
                  {times.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors[day] && <p className="text-red-500 text-sm">{errors[day]}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Robot checkbox */}
        <div className="flex items-center space-x-3 md:col-span-2">
          <input
            type="checkbox"
            name="robot"
            checked={formData.robot}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label className="text-gray-700">I'm not a robot</label>
          {errors.robot && <p className="text-red-500 text-sm">{errors.robot}</p>}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
