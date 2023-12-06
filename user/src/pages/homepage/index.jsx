import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { BsClipboardData } from "react-icons/bs";
import { FaPhone } from "react-icons/fa6";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../firebase";
import { useState } from "react";

function Home() {
  const [notices, setNotices] = useState([]);
  //get real time snapshot from firebase and update notices

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "notices", "13"), (doc) => {
      console.log("Current data: ", doc.data());
      setNotices((prev) => [...prev, doc.data().messages1]);
    });

    return () => {
      unsub();
    };
  }, []);

  // const unsub = onSnapshot(doc(db, "notices", "13"), (doc) => {
  //   console.log("Current data: ", doc.data());
  // });

  // useEffect(() => {
  //   return () => {
  //     unsub();

  //   };
  // }, []);
  return (
    <div>
      <div
        className="w-full h-[500px] bg-cover bg-no-repeat text-white pl-[100px] pt-[80px]"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dnoobzfxo/image/upload/v1701410129/pexels-l%C3%AA-minh-977237_jo0kom.png)",
          boxShadow: "0px -81.387px 33.512px 0.798px rgba(0, 0, 0, 0.30) inset",
        }}
      >
        <div className="font-roboto_slab  text-[57px]  font-bold leading-[92.88%]">
          <p>Welcome to General </p>
          <p>Sir John Kotelawala </p>
          <p>Defence University </p>
          <p>Transport Management System </p>
        </div>
        <p className="font-crimsonPro italic font-semibold text-[50px] mt-[67px]">
          “Journey towards a successful future ”
        </p>
      </div>

      <div className="w-full  px-[70px] mt-[20px]">
        <div className="font-barlows ">
          <p className="text-main_blue text-[37px] font-semibold">
            Read this carefully
          </p>

          <div
            className="text-justify text-[18px] "
            style={{ lineHeight: "normal" }}
          >
            <p>
              Welcome to the services we offer to ensure a brighter future for
              you. You are the future of our country and the upcoming
              generation, so it's crucial to utilize these resources wisely and
              responsibly. Remember, you hold the key to your success.
              Currently, we operate 15 buses that serve our three universities.
              You have the option to use any of these buses for your
              convenience. To travel on our buses, you must possess a valid
              single ticket or a season ticket.
            </p>
            <p>
              Please be aware that any violations or improper behavior may
              result in a penalty of Rs. 2500. We are committed to providing you
              with a safe and efficient transportation service to support your
              journey towards a successful future." If you need any more
              information or have specific questions, please feel free to ask
            </p>
          </div>
        </div>

        <div className="flex gap-[80px] mt-[20px] mb-[60px]">
          <div className="w-[63%] ">
            <div className="images">
              <p className="text-main_blue text-[37px] font-semibold font-barlows">
                KTS Services
              </p>
              <div className="mt-[7px]">
                <div className="flex justify-between">
                  <div className="w-[220px] flex flex-col items-center">
                    <p className="font-roboto text-xl font-bold text-[#1C1C1C] ">
                      Track your bus online
                    </p>
                    <img
                      src="https://res.cloudinary.com/dnoobzfxo/image/upload/v1701412032/download-removebg-preview_1_1_tbgppc.png"
                      alt=""
                    />
                    <p
                      className="font-barlows text-xl leading-[100%] text-center "
                      style={{ lineHeight: "normal" }}
                    >
                      Bus locations are trackable though apps
                    </p>
                  </div>
                  <div className="w-[220px] flex flex-col items-center">
                    <p className="font-roboto text-xl font-bold text-[#1C1C1C] ">
                      Book your seat early
                    </p>
                    <img
                      src="https://res.cloudinary.com/dnoobzfxo/image/upload/v1701412031/download-removebg-preview_3_1_nu19r9.png"
                      alt=""
                    />
                    <p
                      className="font-barlows text-xl leading-[100%] text-center "
                      style={{ lineHeight: "normal" }}
                    >
                      Buy your seat even two or three days before
                    </p>
                  </div>
                  <div className="w-[220px] flex flex-col items-center">
                    <p className="font-roboto text-xl font-bold text-[#1C1C1C] ">
                      Buy ticket for friends
                    </p>
                    <img
                      src="https://res.cloudinary.com/dnoobzfxo/image/upload/v1701412031/hq720-removebg-preview_1_wrnknx.png"
                      alt=""
                    />
                    <p
                      className="font-barlows text-xl leading-[100%] text-center "
                      style={{ lineHeight: "normal" }}
                    >
                      Ability to buy distance tickets to your friend
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mt-[30px]">
                  <div className="w-[220px] flex flex-col items-center">
                    <p className="font-roboto text-xl font-bold text-[#1C1C1C] ">
                      E-Ticket with QR
                    </p>
                    <img
                      src="https://res.cloudinary.com/dnoobzfxo/image/upload/v1701412032/download-removebg-preview_2_1_zi9sku.png"
                      alt=""
                    />
                    <p
                      className="font-barlows text-xl leading-[100%] text-center "
                      style={{ lineHeight: "normal" }}
                    >
                      Do not have to carry a physical ticket
                    </p>
                  </div>
                  <div className="w-[220px] flex flex-col items-center">
                    <p className="font-roboto text-xl font-bold text-[#1C1C1C] ">
                      Seasons for low prices
                    </p>
                    <img
                      src="https://res.cloudinary.com/dnoobzfxo/image/upload/v1701412032/images-removebg-preview_1_1_uavnqe.png"
                      alt=""
                    />
                    <p
                      className="font-barlows text-xl leading-[100%] text-center "
                      style={{ lineHeight: "normal" }}
                    >
                      More season tickets are lower in prices
                    </p>
                  </div>
                  <div className="w-[220px] flex flex-col items-center">
                    <p className="font-roboto text-xl font-bold text-[#1C1C1C] ">
                      Daily solid service
                    </p>
                    <img
                      src="https://res.cloudinary.com/dnoobzfxo/image/upload/v1701412031/4-Ways_To_Track_The_School_Bus_Of_Your_Children-1-removebg-preview_1_fvzfns.png"
                      alt=""
                    />
                    <p
                      className="font-barlows text-xl leading-[100%] text-center "
                      style={{ lineHeight: "normal" }}
                    >
                      Solid and daily services by out drivers
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="prices mt-[17px]">
              <p className="text-main_blue text-[37px] font-semibold font-barlows">
                Prices
              </p>
              <div className="flex gap-6 items-center mt-[10px]">
                <div className="h-[27px] w-[27px] flex justify-center items-center bg-main_blue rounded-full ">
                  <LocalActivityIcon fontSize="14px" sx={{ color: "white" }} />
                </div>
                <p className="font-barlows text-[23px]">
                  For normal tickets only get charge according to the distance
                </p>
              </div>
              <div className="tickets flex justify-between mt-[15px]">
                <div className="w-[245px]">
                  <img
                    src="https://res.cloudinary.com/dnoobzfxo/image/upload/v1701414396/Frame_1000001446_o0dnnm.png"
                    alt=""
                  />
                </div>
                <div className="w-[245px]">
                  <img
                    src="https://res.cloudinary.com/dnoobzfxo/image/upload/v1701414396/Frame_1000001447_lcewsy.png"
                    alt=""
                  />
                </div>
                <div className="w-[245px]">
                  <img
                    src="https://res.cloudinary.com/dnoobzfxo/image/upload/v1701414397/Frame_1000001448_oy5ccm.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="flex gap-6 items-center mt-[20px]">
                <div className="h-[27px] w-[27px] flex justify-center items-center bg-main_blue rounded-full ">
                  <LocalActivityIcon fontSize="14px" sx={{ color: "white" }} />
                </div>
                <p className="font-barlows text-[23px]">
                  If you want season ticket you can buy from here
                </p>
              </div>
              <div className="mt-[20px]">
                <img
                  src="https://res.cloudinary.com/dnoobzfxo/image/upload/v1701414661/Frame_1000001542_hqkzqy.png"
                  alt=""
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 ">
            <div className="flex flex-col gap-7">
              <div className="top bg-[#F8F8F8]">
                <div className="font-roboto text-[19px] font-medium text-center py-[7px] bg-main_red text-white">
                  For Better Experience and Ease
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <img
                      src="https://res.cloudinary.com/dnoobzfxo/image/upload/v1701415495/mybus_bxybtq.jpg"
                      alt=""
                      className="w-[180px]"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-barlows text-[24px] leading-5">
                      KTS-Mobile
                    </p>
                    <p className="text-[#087506] text-[12px] font-semibold">
                      Student and staff only - with seasons
                    </p>
                    <div className="flex items-center gap-1 mb-1">
                      <p
                        className="font-rowdies text-[14px]"
                        style={{ transform: "rotate(-24.216deg)" }}
                      >
                        E
                      </p>
                      <p className="font-roboto text-[11px] font-semibold">
                        Everyone
                      </p>
                    </div>
                    <p
                      className="font-roboto text-[11px] pr-7 text-justify"
                      style={{ lineHeight: "normal" }}
                    >
                      Only can be access through university emails Be careful
                      when you save your payment methods in the app
                    </p>
                    <p
                      className="font-roboto text-[11px] "
                      style={{ lineHeight: "normal" }}
                    >
                      Make sure to enable location features
                    </p>
                  </div>
                </div>
                <div className="px-8 flex justify-between mt-2 mb-4">
                  <div className="flex border-[1px] border-black rounded-[7px] font-roboto items-center gap-1 pr-2 h-[46px] w-[155px]">
                    <div>
                      <img
                        src="https://res.cloudinary.com/dnoobzfxo/image/upload/v1701422022/google-play-icon-2048x2048-487quz63-removebg-preview_x8k77l.png"
                        alt=""
                        className="w-[46px]"
                      />
                    </div>
                    <div className="">
                      <p className="font-medium text-[11px]">GET IT ON</p>
                      <p className="font-bold text-[17px] leading-none">
                        Google Play
                      </p>
                    </div>
                  </div>
                  <div className="flex border-[1px] border-black rounded-[7px] font-roboto items-center gap-1 pr-2 h-[46px] w-[155px]">
                    <div>
                      <img
                        src="https://res.cloudinary.com/dnoobzfxo/image/upload/v1701422090/2560px-Apple_Pay_logo.svg-removebg-preview_qe2h9a.png"
                        alt=""
                        className="w-[34px] ml-3"
                      />
                    </div>
                    <div className="">
                      <p className="font-medium text-[11px]">GET IT ON</p>
                      <p className="font-bold text-[17px] leading-none">
                        Google Play
                      </p>
                    </div>
                  </div>
                </div>
                <div className="font-roboto text-[15px] font-normal text-center py-[6px] bg-main_red text-white">
                  Click here to view the manual
                </div>
              </div>
              <div className="middle bg-[#F8F8F8]">
                <div className="font-roboto text-[19px] font-medium text-center py-[7px] bg-main_red text-white">
                  Notice Board
                </div>
                <div className="notices">
                  {notices.map((notice) => (
                    <div
                      className="pt-[15px] pb-[10px] px-6  border-[1px]"
                      key={notice}
                    >
                      <div className="flex gap-5 items-center">
                        <div className="text-[20px] text-main_red">
                          <BsClipboardData />
                        </div>
                        <p
                          className="font-roboto text-[14px]"
                          style={{ lineHeight: "normal" }}
                        >
                          {notice}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-[4px]">
                        <p className="text-[9px] font-barlows font-light">
                          8 hours 16 mins ago
                        </p>
                        <p className="font-roboto_slab text-[10px] text-main_red">
                          View Full Notification
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="font-roboto text-[15px]  text-center py-[6px]  text-main_red font-semibold ">
                  Open Notice Page
                </div>
              </div>
              <div className="bottom">
                <div className="font-roboto text-[19px] font-medium text-center py-[7px] bg-main_red text-white">
                  Quick access
                </div>
                <div>
                  <div className="flex pl-7 pt-4  pb-3 gap-7 items-center border-[1px] ">
                    <div className="text-[33px] text-white bg-main_red flex items-center justify-center rounded-md h-[47px] w-[47px]">
                      <FaPhone />
                    </div>

                    <div className="flex flex-col font-roboto">
                      <p
                        className="text-[19px]"
                        style={{ lineHeight: "normal" }}
                      >
                        Head Transport Manager
                      </p>
                      <p
                        className="text-[13px] text-[#545454]"
                        style={{ lineHeight: "normal" }}
                      >
                        S.Malinda Gamage Disanayake
                      </p>
                      <p className="font-barlows font-medium text-[18px]">
                        0112386480
                      </p>
                    </div>
                  </div>
                  <div className="flex pl-7 pt-4  pb-3 gap-7 items-center border-[1px] ">
                    <div className="text-[33px] text-white bg-main_red flex items-center justify-center rounded-md h-[47px] w-[47px]">
                      <FaPhone />
                    </div>

                    <div className="flex flex-col font-roboto">
                      <p
                        className="text-[19px]"
                        style={{ lineHeight: "normal" }}
                      >
                        Defence University - Dehiwala
                      </p>
                      <p
                        className="text-[13px] text-[#545454]"
                        style={{ lineHeight: "normal" }}
                      >
                        p.Muthuhetti Rajakaruana
                      </p>
                      <p className="font-barlows font-medium text-[18px]">
                        0114334564
                      </p>
                    </div>
                  </div>
                  <div className="flex pl-7 pt-4  pb-3 gap-7 items-center border-[1px] ">
                    <div className="text-[33px] text-white bg-main_red flex items-center justify-center rounded-md h-[47px] w-[47px]">
                      <FaPhone />
                    </div>

                    <div className="flex flex-col font-roboto">
                      <p
                        className="text-[19px]"
                        style={{ lineHeight: "normal" }}
                      >
                        Defence University - Hambanthta
                      </p>
                      <p
                        className="text-[13px] text-[#545454]"
                        style={{ lineHeight: "normal" }}
                      >
                        K.P.Priyantha Gamage
                      </p>
                      <p className="font-barlows font-medium text-[18px]">
                        0113456789
                      </p>
                    </div>
                  </div>
                </div>

                <div className="font-roboto text-[15px] font-normal text-center py-[6px] bg-main_red text-white">
                  Open Contact to more information
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
