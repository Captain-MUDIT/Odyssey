import React from "react";
import {
  BarChart3,
  Package,
  Receipt,
  FileText,
  Users,
  Settings,
  Home,
  PieChart,
  UserPlus,
  AlertCircle,
  Plus,
  ChevronRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  // Sample data for charts
  const salesData = [
    { name: "Mon", value: 4000 },
    { name: "Tue", value: 3000 },
    { name: "Wed", value: 2000 },
    { name: "Thu", value: 2780 },
    { name: "Fri", value: 1890 },
    { name: "Sat", value: 2390 },
    { name: "Sun", value: 3490 },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm">
        <div className="p-4">
          <h1 className="text-xl font-bold text-blue-600">BusinessPro</h1>
        </div>
        <nav className="mt-4">
          <SidebarItem icon={<Home />} text="Dashboard" active />
          <SidebarItem icon={<Package />} text="Inventory Management" />
          <SidebarItem icon={<Receipt />} text="Billing System" />
          <SidebarItem icon={<FileText />} text="Invoices" />
          <SidebarItem icon={<BarChart3 />} text="Sales & Purchase Reports" />
          <SidebarItem icon={<PieChart />} text="Graphs & Analytics" />
          <SidebarItem icon={<Users />} text="Employee Management" />
          <SidebarItem icon={<Settings />} text="Company Settings" />
          <SidebarItem icon={<UserPlus />} text="Collaborator Access" />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <QuickStatCard
              title="Total Sales"
              value="$24,780"
              change="+12.5%"
              period="vs last week"
            />
            <QuickStatCard
              title="Total Purchases"
              value="$18,230"
              change="-4.3%"
              period="vs last week"
            />
            <QuickStatCard
              title="Stock Value"
              value="$142,350"
              change="+8.1%"
              period="vs last month"
            />
            <QuickStatCard
              title="Employee Count"
              value="24"
              change="+2"
              period="this month"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="text-lg font-semibold mb-4">
                Weekly Sales Overview
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Low Stock Alerts</h3>
                <AlertCircle className="text-red-500 w-5 h-5" />
              </div>
              <div className="space-y-4">
                <LowStockItem
                  name="Printer Paper A4"
                  stock={12}
                  threshold={20}
                />
                <LowStockItem name="Ink Cartridges" stock={5} threshold={10} />
                <LowStockItem name="USB Cables" stock={8} threshold={15} />
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="text-lg font-semibold mb-4">Recent Sales</h3>
              <div className="space-y-4">
                <TransactionItem
                  title="Office Supplies Ltd."
                  amount="$1,234"
                  date="Today, 2:30 PM"
                />
                <TransactionItem
                  title="Tech Solutions Inc."
                  amount="$2,786"
                  date="Today, 11:30 AM"
                />
                <TransactionItem
                  title="Global Services Co."
                  amount="$876"
                  date="Yesterday, 4:45 PM"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="text-lg font-semibold mb-4">Recent Purchases</h3>
              <div className="space-y-4">
                <TransactionItem
                  title="Wholesale Supplies"
                  amount="$4,321"
                  date="Today, 1:15 PM"
                />
                <TransactionItem
                  title="Equipment Pro"
                  amount="$1,543"
                  date="Today, 10:30 AM"
                />
                <TransactionItem
                  title="Office Mart"
                  amount="$987"
                  date="Yesterday, 3:20 PM"
                />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <QuickActionCard
              icon={<Plus />}
              title="Add New Product"
              description="Create a new inventory item"
            />
            <QuickActionCard
              icon={<FileText />}
              title="Create Invoice"
              description="Generate a new invoice"
            />
            <QuickActionCard
              icon={<Users />}
              title="Add Employee"
              description="Register new staff member"
            />
            <QuickActionCard
              icon={<UserPlus />}
              title="Invite Collaborator"
              description="Add system collaborator"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, active }) => (
  <div
    className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 ${
      active ? "bg-blue-50 text-blue-600" : "text-gray-700"
    }`}
  >
    <span className="w-5 h-5 mr-3">{icon}</span>
    <span>{text}</span>
  </div>
);

const QuickStatCard = ({ title, value, change, period }) => (
  <div className="bg-white rounded-lg p-6 shadow">
    <div className="text-sm font-medium text-gray-500">{title}</div>
    <div className="flex items-baseline mt-2">
      <div className="text-2xl font-semibold">{value}</div>
      <div
        className={`ml-2 text-sm ${
          change.startsWith("+") ? "text-green-600" : "text-red-600"
        }`}
      >
        {change}
      </div>
    </div>
    <div className="text-xs text-gray-500 mt-1">{period}</div>
  </div>
);

const LowStockItem = ({ name, stock, threshold }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
    <div>
      <div className="font-medium">{name}</div>
      <div className="text-sm text-gray-500">Threshold: {threshold}</div>
    </div>
    <div className="text-red-500 font-medium">{stock} left</div>
  </div>
);

const TransactionItem = ({ title, amount, date }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
    <div>
      <div className="font-medium">{title}</div>
      <div className="text-sm text-gray-500">{date}</div>
    </div>
    <div className="font-medium">{amount}</div>
  </div>
);

const QuickActionCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg p-6 shadow cursor-pointer hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-2">
      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </div>
    <div className="font-medium mt-2">{title}</div>
    <div className="text-sm text-gray-500">{description}</div>
  </div>
);

export default Dashboard;
