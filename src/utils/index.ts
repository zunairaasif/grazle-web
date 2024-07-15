export function timeAgo(date: Date) {
  const now = new Date();
  const secondsPast = (now.getTime() - date.getTime()) / 1000;

  if (secondsPast < 60) {
    return `${Math.floor(secondsPast)} seconds ago`;
  }
  if (secondsPast < 3600) {
    return `${Math.floor(secondsPast / 60)} minutes ago`;
  }
  if (secondsPast <= 86400) {
    return `${Math.floor(secondsPast / 3600)} hours ago`;
  }
  if (secondsPast <= 2592000) {
    return `${Math.floor(secondsPast / 86400)} days ago`;
  }
  if (secondsPast <= 31104000) {
    return `${Math.floor(secondsPast / 2592000)} months ago`;
  }
  return `${Math.floor(secondsPast / 31104000)} years ago`;
}

export function calculateDiscountPercentage(
  basePrice: number,
  discountedPrice: number
) {
  if (basePrice <= 0) {
    throw new Error("Base price must be greater than zero");
  }

  const discountAmount = basePrice - discountedPrice;
  const discountPercentage = (discountAmount / basePrice) * 100;

  return discountPercentage.toFixed(2); // Returns the percentage rounded to 2 decimal places
}

// <>
//   <div
//     style={{ boxShadow: "0px 4px 29px 0px #0000000A" }}
//     className="w-100 rounded-3xl p-6 mt-6 hover:border-[1px] border-[#F70000]"
//   >
//     <div className="flex items-center justify-between">
//       <div className="border-[1px] border-[#777777] rounded-full w-[230px] px-4 py-2 flex items-center">
//         <IoLockClosed className="w-[14px] h-[14px] mr-2" />
//         <p className="text-[14px] font-normal text-[#777777]">
//           Yesterday, 12 jan, 2024
//         </p>
//       </div>
//     </div>
//     <div className=" items-center flex flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap justify-between mt-5">
//       <div className="flex items-center">
//         <div className="h-[100px] bg-[#F700000D] flex items-center justify-center w-[100px] rounded-2xl mr-5">
//           <Image src={Chair} alt="" className="w-[60px] h-[60px]" />
//         </div>
//         <div>
//           <p className="text-[18px] font-medium">Wear Saka Store </p>
//           <p className="text-[16px] mt-2 text-[#777777] font-medium">
//             Color: Grey
//           </p>
//           <p className="text-[16px] text-[#777777] mt-3 font-medium">
//             Size 10.5 UK
//           </p>
//         </div>
//       </div>
//       <p className="lg:text-[24px] text-[16px] sm:text-[16px] md:text-[18px] lg:mt-0 mt-3 sm:mt-3 md:mt-3 text-[#777777]  font-medium">
//         Quantity 4
//       </p>
//       <p className="lg:text-[24px] text-[16px] sm:text-[16px] md:text-[18px] lg:mt-0 mt-3 sm:mt-3 md:mt-3 text-[#777777]  font-medium">
//         Price: $567.00
//       </p>
//       <div className="lg:mt-0 mt-3 sm:mt-3 md:mt-3">
//         <button className=" mr-4 bg-[#F700001A] rounded-2xl h-[50px] outline-[2px] outline-[#F70000] outline-dashed  lg:w-[181px] w-[300px] sm:w-[300px] text-[18px] font-medium text-[#F70000]">
//           Completed
//         </button>
//       </div>
//     </div>
//   </div>
//   <div
//     style={{ boxShadow: "0px 4px 29px 0px #0000000A" }}
//     className="w-100 rounded-3xl p-6 mt-6 hover:border-[1px] border-[#F70000]"
//   >
//     <div className="flex items-center justify-between">
//       <div className="border-[1px] border-[#777777] rounded-full w-[230px] px-4 py-2 flex items-center">
//         <IoLockClosed className="w-[14px] h-[14px] mr-2" />
//         <p className="text-[14px] font-normal text-[#777777]">
//           Yesterday, 12 jan, 2024
//         </p>
//       </div>
//     </div>
//     <div className=" items-center flex flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap justify-between mt-5">
//       <div className="flex items-center">
//         <div className="h-[100px] bg-[#F700000D] flex items-center justify-center w-[100px] rounded-2xl mr-5">
//           <Image src={Chair} alt="" className="w-[60px] h-[60px]" />
//         </div>
//         <div>
//           <p className="text-[18px] font-medium">Wear Saka Store </p>
//           <p className="text-[16px] mt-2 text-[#777777] font-medium">
//             Color: Grey
//           </p>
//           <p className="text-[16px] text-[#777777] mt-3 font-medium">
//             Size 10.5 UK
//           </p>
//         </div>
//       </div>
//       <p className="lg:text-[24px] text-[16px] sm:text-[16px] md:text-[18px] lg:mt-0 mt-3 sm:mt-3 md:mt-3 text-[#777777]  font-medium">
//         Quantity 4
//       </p>
//       <p className="lg:text-[24px] text-[16px] sm:text-[16px] md:text-[18px] lg:mt-0 mt-3 sm:mt-3 md:mt-3 text-[#777777]  font-medium">
//         Price: $567.00
//       </p>
//       <div className="lg:mt-0 mt-3 sm:mt-3 md:mt-3">
//         <button className=" mr-4 bg-[#F700001A] rounded-2xl h-[50px] outline-[2px] outline-[#F70000] outline-dashed  lg:w-[181px] w-[300px] sm:w-[300px] text-[18px] font-medium text-[#F70000]">
//           Completed
//         </button>
//       </div>
//     </div>
//   </div>{" "}
//   <div
//     style={{ boxShadow: "0px 4px 29px 0px #0000000A" }}
//     className="w-100 rounded-3xl p-6 mt-6 hover:border-[1px] border-[#F70000]"
//   >
//     <div className="flex items-center justify-between">
//       <div className="border-[1px] border-[#777777] rounded-full w-[230px] px-4 py-2 flex items-center">
//         <IoLockClosed className="w-[14px] h-[14px] mr-2" />
//         <p className="text-[14px] font-normal text-[#777777]">
//           Yesterday, 12 jan, 2024
//         </p>
//       </div>
//     </div>
//     <div className=" items-center flex flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap justify-between mt-5">
//       <div className="flex items-center">
//         <div className="h-[100px] bg-[#F700000D] flex items-center justify-center w-[100px] rounded-2xl mr-5">
//           <Image src={Chair} alt="" className="w-[60px] h-[60px]" />
//         </div>
//         <div>
//           <p className="text-[18px] font-medium">Wear Saka Store </p>
//           <p className="text-[16px] mt-2 text-[#777777] font-medium">
//             Color: Grey
//           </p>
//           <p className="text-[16px] text-[#777777] mt-3 font-medium">
//             Size 10.5 UK
//           </p>
//         </div>
//       </div>
//       <p className="lg:text-[24px] text-[16px] sm:text-[16px] md:text-[18px] lg:mt-0 mt-3 sm:mt-3 md:mt-3 text-[#777777]  font-medium">
//         Quantity 4
//       </p>
//       <p className="lg:text-[24px] text-[16px] sm:text-[16px] md:text-[18px] lg:mt-0 mt-3 sm:mt-3 md:mt-3 text-[#777777]  font-medium">
//         Price: $567.00
//       </p>
//       <div className="lg:mt-0 mt-3 sm:mt-3 md:mt-3">
//         <button className=" mr-4 bg-[#F700001A] rounded-2xl h-[50px] outline-[2px] outline-[#F70000] outline-dashed  lg:w-[181px] w-[300px] sm:w-[300px] text-[18px] font-medium text-[#F70000]">
//           Completed
//         </button>
//       </div>
//     </div>
//   </div>
// </>
