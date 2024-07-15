"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/assets/Grazle Logo.png";
import Instagram from "@/assets/Instagram.png";
import Dribbble from "@/assets/Dribbble.png";
import Twitter from "@/assets/Twitter.png";
import Youtube from "@/assets/Youtube.png";
import Email from "@/assets/email-icon.png";
import Location from "@/assets/location-icon.png";
import Phone from "@/assets/phone-icon.png";
import { GrInstagram } from "react-icons/gr";
import { FaFacebook, FaPinterest, FaTwitter } from "react-icons/fa";
import { SiLinkedin } from "react-icons/si";
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

export default function Footer() {
  const accordionData: FAQData[] = [
    {
      header: "Product",
    },
    {
      header: "Company",
    },
    {
      header: "Support",
    },
    {
      header: "Legal",
    },
  ];

  const [expanded, setExpanded] = useState<number | null>(null);

  const handleAccordionChange =
    (panelIndex: number) =>
    (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panelIndex : null);
    };

  return (
    <>
      <div className="lg:px-[150px] md:px-[60px] px-[16px] py-[63px] bg-[#F8F8F8]  lg:flex sm:hidden hidden  items-start lg:items-start justify-between">
        <div className="w-full lg:w-[196px] mb-[32px] lg:mb-0 text-center lg:text-left">
          <Image
            src={logo}
            alt=""
            className="w-[120px] h-[70px] mx-auto lg:mx-0"
          />
          <div className="flex items-center gap-2 justify-center lg:justify-start mt-[40px]">
            <Image
              src={Instagram}
              alt=""
              className="w-[32px] h-[32px] mx-2 lg:mx-0"
            />
            <Image
              src={Dribbble}
              alt=""
              className="w-[32px] h-[32px] mx-2 lg:mx-0"
            />
            <Image
              src={Twitter}
              alt=""
              className="w-[32px] h-[32px] mx-2 lg:mx-0"
            />
            <Image
              src={Youtube}
              alt=""
              className="w-[32px] h-[32px] mx-2 lg:mx-0"
            />
          </div>
        </div>
        <div className="w-full lg:w-[130px] text-[#393A44] mb-[32px] lg:mb-0 text-center lg:text-left">
          <p className="text-[20px] font-bold">Product</p>
          <p className="text-[14px] font-normal mt-[16px]">Overview</p>
          <div className="flex items-center justify-center lg:justify-start mt-[12px]">
            <p className="text-[14px] font-normal">Features</p>
            <p className="text-[14px] font-bold ml-[12px] text-[#2EC5CE]">
              New
            </p>
          </div>
          <p className="text-[14px] font-normal mt-[12px]">Tutorials</p>
          <p className="text-[14px] font-normal mt-[12px]">Pricing</p>
          <p className="text-[14px] font-normal mt-[12px]">Releases</p>
        </div>
        <div className="w-full lg:w-[130px] text-[#393A44] mb-[32px] lg:mb-0 text-center lg:text-left">
          <p className="text-[20px] font-bold">Company</p>
          <p className="text-[14px] font-normal mt-[16px]">About</p>
          <p className="text-[14px] font-normal mt-[12px]">Press</p>
          <p className="text-[14px] font-normal mt-[12px]">Careers</p>
          <p className="text-[14px] font-normal mt-[12px]">Contact</p>
          <p className="text-[14px] font-normal mt-[12px]">Partners</p>
        </div>
        <div className="w-full lg:w-[130px] text-[#393A44] mb-[32px] lg:mb-0 text-center lg:text-left">
          <p className="text-[20px] font-bold">Support</p>
          <p className="text-[14px] font-normal mt-[16px]">Help Center</p>
          <p className="text-[14px] font-normal mt-[12px]">Safety Center</p>
          <p className="text-[14px] font-normal mt-[12px]">Legal</p>
          <p className="text-[14px] font-normal mt-[12px]">Privacy policy</p>
          <p className="text-[14px] font-normal mt-[12px]">Status</p>
        </div>
        <div className="w-full lg:w-[130px] text-[#393A44] mb-[32px] lg:mb-0 text-center lg:text-left">
          <p className="text-[20px] font-bold">Legal</p>
          <p className="text-[14px] font-normal mt-[16px]">Cookies Policy</p>
          <p className="text-[14px] font-normal mt-[12px]">Privacy Policy</p>
          <p className="text-[14px] font-normal mt-[12px]">Terms of Service</p>
          <p className="text-[14px] font-normal mt-[12px]">Law Enforcement</p>
          <p className="text-[14px] font-normal mt-[12px]">Status</p>
        </div>
        <div className="w-full lg:w-[130px] text-[#393A44] mb-[32px] lg:mb-0 text-center lg:text-left">
          <p className="text-[20px] font-bold">Follow us</p>
          <p className="text-[14px] font-normal mt-[16px]">Facebook</p>
          <p className="text-[14px] font-normal mt-[12px]">Twitter</p>
          <p className="text-[14px] font-normal mt-[12px]">Dribbble</p>
          <p className="text-[14px] font-normal mt-[12px]">Instagram</p>
          <p className="text-[14px] font-normal mt-[12px]">LinkedIn</p>
        </div>
        <div className="w-full lg:w-[161px] text-[#393A44] text-center lg:text-left">
          <p className="text-[20px] font-bold">Reach us</p>
          <div className="flex items-center justify-center lg:justify-start mt-[26px]">
            <Image src={Email} alt="" className="w-[32px] h-[32px] mr-[8px]" />
            <p className="text-[14px] font-normal">hello@landify.co</p>
          </div>
          <div className="flex items-center justify-center lg:justify-start mt-[26px]">
            <Image src={Phone} alt="" className="w-[32px] h-[32px] mr-[8px]" />
            <p className="text-[14px] font-normal">hello@landify.co</p>
          </div>
          <div className="flex items-center justify-center lg:justify-start mt-[26px]">
            <Image
              src={Location}
              alt=""
              className="w-[32px] h-[32px] mr-[8px]"
            />
            <p className="text-[14px] font-normal">hello@landify.co</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-col lg:hidden mx-[20px]">
        <Image src={logo} alt="" className="w-[120px] h-[70px] " />
        <p className="mt-3 text-[14px] font-normal text-[#4E4E4E]">
          Lorem ipsum dolor sit amet cons ectet ur. Nunc sed erat tristique sed
          magna. Eget condimentum.
        </p>
        <p className="mt-3 text-[16px] font-semibold text-[#4E4E4E]">
          Follow Us
        </p>
        <div className="flex items-center gap-6  mt-4">
          <FaTwitter className="text-[24px] text-[#434343]" />
          <FaFacebook className="text-[24px] text-[#434343]" />
          <SiLinkedin className="text-[24px] text-[#434343]" />
          <FaPinterest className="text-[24px] text-[#434343]" />
          <GrInstagram className="text-[24px] text-[#434343]" />
        </div>
        <div>
          {accordionData.map((data, index) => (
            <div key={index}>
              <Accordion
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  boxShadow: "none",
                  borderBottom: "1px solid #0000001A",
                }}
                expanded={expanded === index}
                onChange={handleAccordionChange(index)}
              >
                <AccordionSummary
                  style={{
                    padding: "10px 0px",
                    borderRadius: "0px",
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
                          color: "#434343",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        {data.header}
                      </p>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    padding: "0px 0px 16px 0px",
                    textAlign: "start",
                    textJustify: "none",
                  }}
                >
                  <Typography
                    style={{
                      backgroundColor: "transparent",
                      paddingTop: "0px",
                    }}
                  >
                    {index === 0 && (
                      <>
                        <p className="text-[14px] font-medium mt-[0px]">
                          Overview
                        </p>
                        <div className="flex items-center justify-start mt-[8px]">
                          <p className="text-[14px] font-medium">Features</p>
                          <p className="text-[14px] font-bold ml-[12px] text-[#2EC5CE]">
                            New
                          </p>
                        </div>
                        <p className="text-[14px] font-medium mt-[8px]">
                          Tutorials
                        </p>
                        <p className="text-[14px] font-medium mt-[8px]">
                          Pricing
                        </p>
                        <p className="text-[14px] font-medium mt-[8px]">
                          Releases
                        </p>
                      </>
                    )}
                    {index === 1 && (
                      <div>
                        <p className="text-[14px] font-medium ">About</p>
                        <p className="text-[14px] font-medium mt-[8px]">
                          Press
                        </p>
                        <p className="text-[14px] font-medium mt-[8px]">
                          Careers
                        </p>
                        <p className="text-[14px] font-medium mt-[8px]">
                          Contact
                        </p>
                        <p className="text-[14px] font-medium mt-[8px]">
                          Partners
                        </p>
                      </div>
                    )}
                    {index === 2 && (
                      <>
                        <p className="text-[14px] font-medium mt-[0px]">
                          Help Center
                        </p>
                        <p className="text-[14px] font-medium mt-[8px]">
                          Safety Center
                        </p>
                        <p className="text-[14px] font-medium mt-[8px]">
                          Legal
                        </p>
                        <p className="text-[14px] font-medium mt-[8px]">
                          Privacy policy
                        </p>
                        <p className="text-[14px] font-medium mt-[8px]">
                          Status
                        </p>
                      </>
                    )}
                    {index === 3 && (
                      <>
                        <p className="text-[14px] font-medium mt-[0px]">
                          Cookies Policy
                        </p>
                        <p className="text-[14px] font-medium mt-[8px]">
                          Privacy Policy
                        </p>
                        <p className="text-[14px] font-medium mt-[8px]">
                          Terms of Service
                        </p>
                        <p className="text-[14px] font-medium mt-[8px]">
                          Law Enforcement
                        </p>
                        <p className="text-[14px] font-medium mt-[8px]">
                          Status
                        </p>
                      </>
                    )}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
          <p className="mt-5 mb-9 text-[12px] font-normal flex justify-center text-cneter text-[#949494] ">
            © 2020 Landify UI Kit. All rights reserved
          </p>
        </div>
      </div>
    </>
  );
}
