"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { FaChevronDown } from "react-icons/fa6";

interface FAQData {
  header: string;
}

export default function FAQs() {
  const accordionData: FAQData[] = [
    {
      header: "onec mattis finibus elit ut tristique. Nullam tempus nunc eget?",
    },
    {
      header: "onec mattis finibus elit ut tristique. Nullam tempus nunc eget?",
    },
    {
      header: "onec mattis finibus elit ut tristique. Nullam tempus nunc eget?",
    },
  ];

  const [expanded, setExpanded] = useState<number | null>(null);

  const handleAccordionChange =
    (panelIndex: number) =>
    (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panelIndex : null);
    };

  return (
    <div className=" lg:my-[80px] my-[20px] sm:my-[20px] md:my-[30px] lg:mx-[150px] mx-[20px] sm:mx-[20px] md:mx-[30px]">
      <div className="flex flex-wrap lg:flex-nowrap sm:flex-wrap md:flex-wrap items-start gap-6">
        <div
          style={{ boxShadow: "0px 4px 29px 0px #0000000A" }}
          className="rounded-3xl p-[30px] lg:w-[23%] w-[100%] h-[554px] "
        >
          <div className="border-l-[4px] rounded-sm border-[#F70000]">
            <p className="ml-3 text-[18px] font-normal">Grocery</p>
          </div>
          <div className="mt-[40px]">
            <p className="ml-4 text-[#8B8B8B] text-[18px] font-normal">
              Account
            </p>
          </div>
          <div className="mt-[40px]">
            <p className="ml-4 text-[#8B8B8B] text-[18px] font-normal">
              Service
            </p>
          </div>
          <div className="mt-[40px]">
            <p className="ml-4 text-[#8B8B8B] text-[18px] font-normal">
              Profile
            </p>
          </div>
          <div className="mt-[40px]">
            <p className="ml-4 text-[#8B8B8B] text-[18px] font-normal">
              Profit
            </p>
          </div>
          <div className="mt-[40px]">
            <p className="ml-4 text-[#8B8B8B] text-[18px] font-normal">About</p>
          </div>
        </div>
        <div
          style={{ boxShadow: "0px 4px 29px 0px #0000000A" }}
          className="rounded-3xl p-[30px] lg:w-[77%] w-[100%] lg:h-[554px] h-auto"
        >
          <p className="text-[24px] font-medium">
            Below are frequently asked questions, you may find the answer for
            yourself
          </p>
          <p className="text-[16px] font-normal text-[#434343] mt-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id
            erat sagittis, faucibus metus malesuada, eleifend turpis. Mauris
            semper augue id nisl aliquet, a porta lectus mattis. Nulla at tortor
            augue. In eget enim diam. Donec gravida tortor sem, ac fermentum
            nibh rutrum sit amet. Nulla convallis mauris vitae congue consequat.
            Donec interdum nunc purus, vitae vulputate arcu fringilla quis.
            Vivamus iaculis euismod dui.
          </p>
          <div>
            {accordionData.map((data, index) => (
              <div key={index}>
                <Accordion
                  style={{
                    backgroundColor: "transparent",
                    marginTop: "20px",
                    border: "none",
                    boxShadow: "none",
                  }}
                  expanded={expanded === index}
                  onChange={handleAccordionChange(index)}
                >
                  <AccordionSummary
                    style={{
                      padding: "0px 16px",
                      backgroundColor: "rgba(247, 0, 0, 0.06)",
                      borderRadius: "8px",
                    }}
                    expandIcon={<FaChevronDown style={{ color: "#434343" }} />}
                    aria-controls={`panel${index + 1}-content`}
                    id={`panel${index + 1}-header`}
                  >
                    <Typography style={{ fontWeight: "500" }}>
                      <div>
                        <p
                          style={{
                            textAlign: "start",
                          }}
                        >
                          {data.header}
                        </p>
                      </div>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      padding: "0px 16px 16px 16px",
                      textAlign: "start",
                      textJustify: "none",
                    }}
                  >
                    <Typography
                      style={{
                        backgroundColor: "transparent",
                        paddingTop: "10px",
                      }}
                    >
                      {index === 0 && (
                        <p className="text-[16px] font-normal text-[#434343]">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Donec id erat sagittis, faucibus metus
                          malesuada, eleifend turpis. Mauris semper augue id
                          nisl aliquet, a porta lectus mattis. Nulla at tortor
                          augue. In eget enim diam. Donec gravida tortor sem, ac
                          fermentum nibh rutrum sit amet. Nulla convallis mauris
                          vitae congue consequat. Donec interdum nunc purus,
                          vitae vulputate arcu fringilla quis. Vivamus iaculis
                          euismod dui.
                        </p>
                      )}
                      {index === 1 && (
                        <p className="text-[16px] font-normal text-[#434343]">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Donec id erat sagittis, faucibus metus
                          malesuada, eleifend turpis. Mauris semper augue id
                          nisl aliquet, a porta lectus mattis. Nulla at tortor
                          augue. In eget enim diam. Donec gravida tortor sem, ac
                          fermentum nibh rutrum sit amet. Nulla convallis mauris
                          vitae congue consequat. Donec interdum nunc purus,
                          vitae vulputate arcu fringilla quis. Vivamus iaculis
                          euismod dui.
                        </p>
                      )}
                      {index === 2 && (
                        <p className="text-[16px] font-normal text-[#434343]">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Donec id erat sagittis, faucibus metus
                          malesuada, eleifend turpis. Mauris semper augue id
                          nisl aliquet, a porta lectus mattis. Nulla at tortor
                          augue. In eget enim diam. Donec gravida tortor sem, ac
                          fermentum nibh rutrum sit amet. Nulla convallis mauris
                          vitae congue consequat. Donec interdum nunc purus,
                          vitae vulputate arcu fringilla quis. Vivamus iaculis
                          euismod dui.
                        </p>
                      )}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
