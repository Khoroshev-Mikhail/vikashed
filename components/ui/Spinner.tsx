export default function Spinner({white}:{white?: boolean}){
    return(
        <div className="w-full h-full flex justify-center items-center">
            <div className={`animate-spin text-[2px] rounded-full h-6 w-6 border-t-1 border-b-2 border-r-3 shadow-inner ${white ? 'border-white' : 'border-black'}`}>
                {/* Логика психолога */}
            </div>
        </div>
    )
}