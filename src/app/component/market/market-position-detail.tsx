"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import etheriumIcon from "../../../../public/icons/etherium.svg";

export const MarketPositionDetail = () => {
  const router = useRouter();

  return (
    <section className="">
      <div>
        <button onClick={() => router.push("/market")}>
          <IoMdArrowBack className="hover:text-appColor1 h-5 w-5" />
        </button>
      </div>
      <div className="direction  ">
        <button className="bg-gray-100 rounded-md py-1 px-4">
          <span className="text-textGray font-medium text-[14px]">{`Marketplace > `}</span>
          <span className="text-appColor1 font-medium text-[14px]">
            {"Open Bid"}
          </span>
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 mt-4 ">
        <div className="flex-1">
          <Image
            src={
              "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&q=80&w=3404&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            height={100}
            width={100}
            alt="market-position details"
            className="w-full h-full rounded-2xl"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-[28px] text-black222 font-semibold leading-[36.4px] not-italic ">
            Position Name
          </h2>
          <p className="text-textGray text-base leading-[180%] tracking-[0.14px]">{`The borrower is seeking a loan of [Insert Requested Tokens] tokens, showcasing a [Insert Risk Factor] risk factor while leveraging a robust [Insert Collateralization Ratio] collateralization ratio. This demonstrates the borrower's intention to secure the loan by offering a substantial collateral base, ensuring a lower risk profile within the lending ecosystem.`}</p>
          <hr className="my-4" />
          <div className="flex flex-col lg:flex-row lg:justify-between">
            <div>
              <p className="text-textGray text-[16px] leading-[20.8px] tracking-[0.16px] not-italic ">
                Auction End In
              </p>
              <div>
                <button className="text-[16px] mr-1 not-italic font-semibold leading-[26px] tracking-[0.2px] bg-gray-200 px-1 rounded-md">
                  03
                </button>
                {":"}
                <button className="text-[16px] mx-1 not-italic font-semibold leading-[26px] tracking-[0.2px] bg-gray-200 px-1 rounded-md">
                  12
                </button>
                {":"}
                <button className="text-[16px] ml-1 not-italic font-semibold leading-[26px] tracking-[0.2px] bg-gray-200 px-1 rounded-md">
                  42
                </button>
              </div>
            </div>
            <div>
              <p className="text-textGray text-[16px] leading-[20.8px] tracking-[0.16px] not-italic">
                Required Amount
              </p>
              <div className="flex items-center">
                <Image
                  src={etheriumIcon}
                  height={100}
                  width={100}
                  className="h-5 w-5"
                  alt="etherium icon"
                />
                <p className="text-[16px] not-italic font-semibold leading-[26px] tracking-[0.2px]">
                  3,89 ETH
                </p>
              </div>
            </div>
            <div>
              <p className="text-textGray text-[16px] leading-[20.8px] tracking-[0.16px] not-italic">
                APR
              </p>
              <div>
                <p className="text-[16px] not-italic font-semibold leading-[26px] tracking-[0.2px]">
                  {"8.9 %"}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p>Health factor</p>
            <button className="bg-textGreen1 my-4 rounded-2xl pb-[2px] px-4 text-whiteFFF  text-[12px]">
              High
            </button>
            <div>
              <button className="bg-appColor1 px-8 py-1 mt-6 rounded-md text-whiteFFF">
                Supply
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
