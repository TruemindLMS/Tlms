const Every = () => {
    return (
        <div className="bg-gradient-to-b from-white to-gray-50 relative  ">
            <div className=' max-w-7xl mx-auto px-1 md:px-6 lg:px-5 py-10 md:py-20 flex flex-col item-center justify-center  '>
                <div className="text-center mb-5">
                    <h1 className="text-3xl md:text-6xl font-bold text-gray-900 mb-4">
                        Everything You Need to Succeed
                    </h1>
                </div>

                <div className='grid grid-cols-3 gap-1 md:gap-3  w-full '>
                    <div className="col-span-2 relative rounded-xl overflow-hidden">
                        <img src="./img/pinn.jpg" alt="learn." className=" w-full h-[250px]  object-cover rounded-xl" />
                    </div>

                    <div className="relative rounded-xl overflow-hidden">
                        <img src="./img/workk.jpg" alt="learn." className="w-full h-[250px]  object-cover rounded-xl" />
                    </div>

                    <div className="relative rounded-xl overflow-hidden">
                        <img src="./img/workk.jpg" alt="learn." className="w-full h-[250px]  object-cover rounded-xl" />
                    </div>

                    <div className="col-span-2 relative rounded-xl overflow-hidden" >
                        <img src="./img/pinn.jpg" alt="learn." className="w-full h-[250px] object-cover rounded-xl" />
                    </div>

                </div>


            </div>
        </div>
    );
};

export default Every;