"use client";
import styles from "../app/page.module.scss";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { TbUmbrellaFilled } from "react-icons/tb";
import { FaCloudMoonRain } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { FaMap } from "react-icons/fa6";
import { RiListSettingsFill } from "react-icons/ri";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
    {
        id: 1,
        title: "Weather",
        path: "/",
        icon: FaCloudMoonRain
    },
    {
        id: 2,
        title: "Cities",
        path: "/cities",
        icon: IoMenu
    },
    {
        id: 3,
        title: "Map",
        // path: "/cities",
        icon: FaMap,
        disabled: true
    },
    {
        id: 4,
        title: "Settings",
        // path: "/cities",
        icon: RiListSettingsFill,
        disabled: true
    },

]

export default function Sidemenu() {

const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const city = searchParams.get("city");

  function changeRoute(route: string) {
    if (!city) return router.push(route);
    router.push(route + "?city=" + city);
  }


  return (
    <aside className={`${styles.sidemenu}`}>
      <ul>
        <li>
          {/* <TbUmbrellaFilled size={32} /> */}
          <Image  src="/umbrella-logo.png" width={32} height={32} alt="umbrella logo" />
        </li>

        {
            navItems && navItems.map(item => (
                <li key={item.id} onClick={() => item?.path && changeRoute(item.path)} className={`${ (!item.path || path !== item.path ) && styles.inactive }  text-center d-flex flex-column align-items-center ${item.disabled && styles['cursor-default'] } `}>
                    <item.icon size={20} style={{marginBottom: "6px"}} />
                    {item.title}
                </li>
            ))
        }

        {/* <li onClick={() => changeRoute("/")} className="text-center d-flex flex-column align-items-center">
          <FaCloudMoonRain size={20} style={{marginBottom: "6px"}} />
          Weather
        </li>
        <li onClick={() => changeRoute("/cities")} className="text-center d-flex flex-column align-items-center">
          <IoMenu size={20} style={{marginBottom: "6px"}} /> 
          Cities
        </li>
        <li className="text-center d-flex flex-column align-items-center">
          <FaMap size={20} style={{marginBottom: "6px"}} /> 
          Map
        </li>
        <li className="text-center d-flex flex-column align-items-center">
          <RiListSettingsFill  size={20} style={{marginBottom: "6px"}} /> 
          Settings
        </li> */}
      </ul>
    </aside>
  );
}
