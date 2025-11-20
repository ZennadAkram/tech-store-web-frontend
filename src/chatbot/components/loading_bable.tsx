export function LoadingBubble() {
  return (
    <div className="bg-[#EEEEEE] flex flex-row gap-2 py-[10px] px-[16px] rounded-tr-[12px] rounded-tl-[12px] rounded-br-[12px] w-[80px] h-[24px] items-center justify-center">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-fade" style={{ animationDelay: '0s' }}></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-fade" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-fade" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );
}
