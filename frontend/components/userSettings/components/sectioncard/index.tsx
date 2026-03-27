function SectionCard({
  children,
  title,
  icon: ICon
}: {
  children: React.ReactNode;
  title?: string;
  icon?: React.ElementType;
}) {
  // const Icon = icon;
  // if (!Icon) return null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-slate-800  p-6">
      <div className=" flex items-center gap-2 mb-4">
        <span className=" font-bold">
          {ICon && <ICon />}
        </span>
        <h3 className="text-lg font-semibold  ">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}
export default SectionCard;
