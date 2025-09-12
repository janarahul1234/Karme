const SectionHeader = ({ title = "", desc = "", action }) => {
  return (
    <div className="flex items-center justify-between gap-2 my-6">
      <div>
        <h2 className="text-2xl text-pretty font-semibold mb-1">{title}</h2>
        <p className="text-muted-foreground text-sm text-pretty">{desc}</p>
      </div>
      {action}
    </div>
  );
};

export default SectionHeader;
