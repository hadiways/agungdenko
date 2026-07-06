import AdminSidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-brand-lightBg flex">
      {/* Sidebar Navigation */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 pt-16 lg:pt-0">
        <main className="p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
