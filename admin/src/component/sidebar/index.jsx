import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaRoad } from "react-icons/fa";
import { FaRoadBridge } from "react-icons/fa6";
import { IoMdAnalytics } from "react-icons/io";
import { GiJourney } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { MdOutlineBusAlert } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaHospitalUser } from "react-icons/fa6";
import { FaBusAlt } from "react-icons/fa";
import { RiBusWifiLine } from "react-icons/ri";
import { GrUserWorker } from "react-icons/gr";
import { FaUserCog } from "react-icons/fa";

const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "KTS-Dashboard",
        icon: <MdDashboard />,
        nav: "",
      },
    ],
  },

  {
    title: "Routes",
    links: [
      {
        name: "Current Routes",
        icon: <FaRoad />,
        nav: "routes",
      },
      {
        name: "Add Routes",
        icon: <FaRoadBridge />,
        nav: "add-routes",
      },
      {
        name: "Route Analytics",
        icon: <IoMdAnalytics />,
        nav: "route-analytics",
      },
      {
        name: "Journey",
        icon: <GiJourney />,
        nav: "journey",
      },
    ],
  },
  {
    title: "Analytics",
    links: [
      {
        name: "Users",
        icon: <FaUsers />,
        nav: "users",
      },
      {
        name: "Tickets",
        icon: <BsFillTicketPerforatedFill />,
        nav: "tickets",
      },
      {
        name: "Cost Report",
        icon: <FaMoneyCheckDollar />,
        nav: "cost-report",
      },
    ],
  },
  {
    title: "Notices",
    links: [
      {
        name: "Bus Notices",
        icon: <MdOutlineBusAlert />,
        nav: "bus-notices",
      },
      {
        name: "Add Notices",
        icon: <MdOutlinePostAdd />,
        nav: "add-notices",
      },
      {
        name: "User Inquiries",
        icon: <FaHospitalUser />,
        nav: "user-inquiries",
      },
    ],
  },
  {
    title: "Management",
    links: [
      {
        name: "Buses",
        icon: <FaBusAlt />,
        nav: "buses",
      },
      {
        name: "Insert Buses",
        icon: <RiBusWifiLine />,
        nav: "insert-buses",
      },
      {
        name: "Employees",
        icon: <GrUserWorker />,
        nav: "employees",
      },
      {
        name: "Insert Employees",
        icon: <FaUserCog />,
        nav: "insert-employees",
      },
    ],
  },
];

const activeLink =
  "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg   text-white  text-md m-2";
const normalLink =
  "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-md text-gray-400  hover:text-white  hover:text-lg  m-2 ";

function Sidebar() {
  return (
    <div className="bg-main_blue h-full overflow-y-scroll">
      <div className="pr-[10px] pt-[10px]">
        <img
          src="https://kdu.ac.lk/wp-content/uploads/2023/06/kdu-logo2.png.webp"
          alt=""
          className="w-[294px]"
        />
      </div>
      <div className="w-full h-[1px] bg-[#5879ad] mt-1" />
      {links.map((item) => (
        <div key={item.title}>
          <p className="text-gray-400 ml-3 mt-4 uppercase">{item.title}</p>
          {item.links.map((link) => (
            <NavLink
              key={link.name}
              to={`${link.nav}`}
              style={({ isActive }) => ({
                backgroundColor: isActive ? "rgba(255, 255, 255, 0.25) " : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              {link.icon}
              <span className="capitalize"> {link.name}</span>
            </NavLink>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
