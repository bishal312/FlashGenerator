import { requireAdmin } from "@/helpers/requireAdmin";
import React from "react";
import Link from "next/link";
import { User2Icon, PenIcon, BookAIcon, ShoppingBasket } from "lucide-react";

const Page = async () => {
  await requireAdmin();

  const navLinks = [
    {
      title: "Manage Users",
      url: "/admin/manage-users",
      icon: User2Icon,
      description: "View and manage user accounts",
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
    },
    {
      title: "Update Deposit Info",
      url: "/admin/update-deposit-info",
      icon: PenIcon,
      description: "Edit deposit information and settings",
      color: "from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700",
    },
    {
      title: "Create FAQ",
      url: "/admin/create-faq",
      icon: BookAIcon,
      description: "Add and edit frequently asked questions",
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700",
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: ShoppingBasket,
      description: "View and manage customer orders",
      color: "from-orange-500 to-orange-600",
      hoverColor: "hover:from-orange-600 hover:to-orange-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Welcome back! Manage your platform from here.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={index}
                href={link.url}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div className="relative p-6 sm:p-8">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${link.color} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-white transition-colors duration-300">
                    {link.title}
                  </h3>

                  <p className="text-gray-600 text-sm sm:text-base group-hover:text-white/90 transition-colors duration-300">
                    {link.description}
                  </p>

                  <div className="mt-4 flex items-center text-gray-400 group-hover:text-white transition-colors duration-300">
                    <span className="text-sm font-medium mr-2">Go to page</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              </Link>
            );
          })}
        </div>

        {/* <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow p-4 sm:p-6">
            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">
              Total Users
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">--</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 sm:p-6">
            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">
              Pending Orders
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-orange-600">--</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 sm:p-6">
            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">
              Total FAQs
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">--</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 sm:p-6">
            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">
              Completed Orders
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">--</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Page;
