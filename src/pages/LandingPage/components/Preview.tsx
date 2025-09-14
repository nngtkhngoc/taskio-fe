import { AlertCircle, Bell } from "lucide-react";

export const Preview = () => {
  const currentDeadline = [
    {
      task: "Web Development",
      description: "10:00 - 11:30 • Room A101",
      color: "blue",
    },
    {
      task: "Calculus I",
      description: "13:30 - 15:00 • Midterm exam",
      color: "green",
    },
  ];

  const categoryStats = [
    { label: "Tasks", count: 12, color: "blue" },
    { label: "Completed", count: 8, color: "green" },
    { label: "Upcoming", count: 3, color: "red" },
  ];

  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 border-blue-500 text-blue-600",
    green: "bg-green-50 border-green-500 text-green-600",
    red: "bg-red-50 border-red-500 text-red-600",
  };

  const renderCurrentDeadlines = (deadlines: typeof currentDeadline) => {
    return deadlines.map((d, idx) => (
      <div
        key={idx}
        className={`${colorMap[d.color]} rounded-xl p-4 border-l-4`}
      >
        <div className="font-medium text-gray-900">{d.task}</div>
        <div className="text-sm text-gray-500">{d.description}</div>
      </div>
    ));
  };

  const renderCategoryStats = (stats: typeof categoryStats) => {
    return stats.map((s, idx) => (
      <div
        key={idx}
        className={`${
          colorMap[s.color]
        } rounded-lg p-4 text-center border-2 border-black`}
      >
        <div className="text-2xl font-bold">{s.count}</div>
        <div className="text-sm text-gray-600">{s.label}</div>
      </div>
    ));
  };

  return (
    <div className="py-30 bg-gradient-to-br from-blue-50 to-blue-100 relative">
      {/* Top fade overlay */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div
            className="px-3 py-1 border-2 border-black rounded-sm shadow-secondary text-[10px] font-medium inline-block mb-3"
            data-aos="fade-down"
          >
            Sneak peek
          </div>
          <h5 className="text-3xl font-bold" data-aos="zoom-in">
            Preview
          </h5>
          <p
            className="text-[14px] text-gray-700 max-w-lg mx-auto"
            data-aos="fade-up"
          >
            An intuitive, clear, and user-friendly experience for both mobile
            and desktop.
          </p>
        </div>

        {/* Mockups */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mobile Mockup */}
          <div className="relative" data-aos="fade-right">
            <div className="bg-black rounded-[2.5rem] p-2 mx-auto max-w-sm border-2 border-black shadow-secondary-opposite">
              <div className="bg-white rounded-[2rem] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <div className="text-sm opacity-80">Good morning</div>
                      <div className="font-semibold">Your Name</div>
                    </div>
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Bell className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-gray-900">
                      Today's Deadline
                    </div>
                    <div className="text-sm text-blue-600 cursor-pointer">
                      View all
                    </div>
                  </div>
                  <div className="space-y-3">
                    {renderCurrentDeadlines(currentDeadline)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Mockup */}
          <div
            className="bg-white rounded-2xl border-2 border-black shadow-secondary-opposite overflow-hidden"
            data-aos="fade-left"
          >
            {/* Top bar */}
            <div className="bg-gray-100 px-6 py-3 border-b-2 border-black flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500 border border-black"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 border border-black"></div>
            </div>

            {/* Dashboard content */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Dashboard</h3>
                <div className="w-8 h-8 bg-blue-600 rounded-full border border-black"></div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {renderCategoryStats(categoryStats)}
              </div>

              <div className="space-y-3">
                <div className="bg-yellow-50 border-2 border-black rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <div className="font-medium text-gray-900">
                        Deadline Warning
                      </div>
                      <div className="text-sm text-gray-600">
                        You have 2 tasks due tomorrow!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade overlay */}
      <div className="absolute inset-x-0 -bottom-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
};
