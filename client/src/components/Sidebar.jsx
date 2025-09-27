import { Code, Trophy, Wrench, Book, PlaySquare, LayoutGrid } from "lucide-react";

const templates = [
  { id: 'storage', title: 'Storage Example', icon: <PlaySquare size={20} /> },
  { id: 'da', title: 'Data Availability', icon: <LayoutGrid size={20} /> },
  { id: 'smart-contract', title: 'Smart Contract', icon: <Code size={20} /> },
  { id: 'data-serving', title: 'Data Serving', icon: <Wrench size={20} /> },
];

const NavItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full space-x-3 px-3 py-2 rounded-lg text-left ${
      active ? "bg-[#3D007F] text-white" : "hover:bg-gray-700"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const Sidebar = ({ activeTemplate, onTemplateChange }) => {
  return (
    <aside className="w-64 bg-[#111111] text-gray-300 flex flex-col p-4">
      <div className="text-2xl font-bold mb-10 p-2">&lt;0/G&gt;</div>
      <nav className="flex flex-col space-y-2">
        {/* Static Nav Items */}
        <NavItem icon={<Trophy size={20} />} label="Hackathons" />
        <NavItem icon={<Book size={20} />} label="Documentation" />
        <hr className="border-gray-700 my-2" />
        <p className="px-3 py-2 text-xs text-gray-500 uppercase">Templates</p>
        {/* Dynamic Template Items */}
        {templates.map(template => (
          <NavItem
            key={template.id}
            icon={template.icon}
            label={template.title}
            active={activeTemplate === template.id}
            onClick={() => onTemplateChange(template.id)}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;