export default function Marquee({ items }: { items: string[] }) {
  return (
    <div className="relative flex w-full overflow-x-hidden border-b-2 border-t-2 border-black bg-white text-foreground font-base">
      <div className="animate-marquee whitespace-nowrap py-5">
        {items.map((item) => {
          return (
            <span key={item} className="mx-5 text-xl">
              {item}
            </span>
          );
        })}
      </div>

      <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-5">
        {items.map((item) => {
          return (
            <span key={item} className="mx-5 text-xl">
              {item}
            </span>
          );
        })}
      </div>

      {/* must have both of these in order to work */}
    </div>
  );
}
