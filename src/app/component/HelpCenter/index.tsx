import React from "react";
import { RiQuestionFill } from 'react-icons/ri';
import Link from "next/link";
const HelpCenter = () => {
    return (
        <div className="mb-4 mx-auto w-[234px] ">
            <div className="rounded-lg shadow-md relative w-full">
                <div className="bg-white flex items-center 
                    justify-center rounded-full w-[50px] h-[50px] 
                    absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="">
                        <RiQuestionFill className="h-5 w-5 text-appColor1" />
                    </div>
                </div>
                <div className="pt-8 pb-2 px-4 bg-appColor1 rounded-xl">
                    <h2 className="text-2xl font-semibold mb-2 text-white text-center">Help Center</h2>
                    <p className="text-white text-sm">Having trouble in Enefti?
                        Please contact us for more question
                    </p>
                    <div className="flex justify-center mt-2">
                        <Link href="#">
                            <button className="bg-white rounded-xl py-2 px-4">
                                <span className="text-appColor1 text-center">Go to Help Center</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpCenter;
