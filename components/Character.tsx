'use client';

type CharacterProps = {
  happy: boolean;
  onClick: () => void;
  bounce: boolean;
};

export function Character({ happy, onClick, bounce }: CharacterProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute bottom-3 right-3 z-20 rounded-3xl border-2 border-white/80 bg-white/70 p-3 shadow-candy backdrop-blur ${
        bounce ? 'animate-pop' : ''
      }`}
      aria-label="Cute mascot"
    >
      <div className="relative h-24 w-24">
        <div className="absolute left-1/2 top-4 h-16 w-16 -translate-x-1/2 rounded-full bg-white shadow" />
        <div className="absolute left-2 top-6 h-10 w-4 rotate-12 rounded-full bg-white" />
        <div className="absolute right-2 top-6 h-10 w-4 -rotate-12 rounded-full bg-white" />
        <div className="absolute left-[36px] top-[40px] h-2 w-2 rounded-full bg-sky-400" />
        <div className="absolute left-[50px] top-[40px] h-2 w-2 rounded-full bg-sky-400" />
        <div className="absolute left-[44px] top-[47px] h-1.5 w-2 rounded-full bg-sky-300" />
        <div
          className={`absolute left-[39px] top-[52px] h-2 w-10 rounded-full border-b-2 border-sky-400 ${
            happy ? 'scale-100' : 'scale-75'
          } origin-center transition-transform`}
        />
        <div className="absolute left-1/2 top-16 h-3 w-4 -translate-x-1/2 rounded-full bg-sky-100" />
      </div>
    </button>
  );
}
