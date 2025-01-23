import React from "react";
import { about1, about2, about3 } from '../../assets/assets'

function All() {
  return (
    <div className="mx-auto px-4" style={{backgroundColor: "#f5f5f5", paddingTop: "4rem", paddingBottom: "4rem"}}>
      <div className="mx-auto" style={{maxWidth: "80rem"}}>
      <div className="flex justify-between py-8">
      <h1 className="text-xl md:text-4xl lg:text-4xl xl:text-4xl font-bold" style={{minWidth:"7rem"}}>All in one Solution</h1>
        <div className="max-w-lg">
          <p className="text-gray-600 text-xs">TEN All Engine is an all-in-one platform offering engines for healthcare, business, books, and more. It generates personalized PDF analyses based on user responses to targeted, domain-specific questions.</p>

        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div><img src={about1} alt="" /></div>
        <div><img src={about2} alt="" /></div>
        <div><img src={about3} alt="" /></div>
      </div>
      </div>
    </div>
  );
}

export default All;
