const TemplateCard = ({ title, description, active, onClick }) => (
    <div
      className={`p-4 rounded-lg cursor-pointer ${active ? 'bg-[#3D007F] border border-purple-500' : 'bg-[#1E1E1E] border border-transparent hover:border-purple-500'}`}
      onClick={onClick}
    >
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
    </div>
);

export default TemplateCard;