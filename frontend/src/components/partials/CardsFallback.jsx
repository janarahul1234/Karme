const CardsFallback = ({ icon: Icon, title = "", desc = "", action }) => {
  return (
    <div className="flex flex-col items-center py-12">
      <Icon size={64} className="text-muted-foreground/30 mb-2" />
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="max-w-[300px] text-sm text-muted-foreground text-center mb-6">
        {desc}
      </p>
      {action}
    </div>
  );
};

export default CardsFallback;
